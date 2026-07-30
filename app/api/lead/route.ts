/**
 * Unified lead intake — POST /api/lead
 *
 * Flow (order matters):
 *   1. Validate body with zod. Silently accept + drop honeypot hits.
 *   2. Insert the lead into Supabase `form_submissions` FIRST (service_role
 *      key, server-only) so the lead is durably stored before anything else.
 *   3. Send the notification email via Resend to the formId's destination.
 *   4. Update the row's `email_status` to 'sent' | 'failed'.
 *
 * Email failure never fails the request — the lead is already stored. We only
 * return an error to the client if BOTH storage and email failed (so we never
 * tell the visitor "success" when the lead reached nobody).
 *
 * SECURITY: SUPABASE_SERVICE_ROLE_KEY is read from server env only and never
 * leaves this handler. Nothing here is imported by client components.
 */

import { NextResponse } from "next/server";
import { z } from "zod";
import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import { Resend } from "resend";
import { BRAND, resolveRoute } from "@/lib/form-config";
import { buildSubject, renderLeadEmail } from "@/lib/email-template";

export const runtime = "nodejs";

const LeadSchema = z.object({
  formId: z.string().min(1),
  name: z.string().min(1),
  email: z.email(),
  phone: z.string().default(""),
  company: z.string().default(""),
  fields: z.record(z.string(), z.unknown()).default({}),
  utm: z.record(z.string(), z.unknown()).default({}),
  pageUrl: z.string().default(""),
  // Honeypot — real users never fill this. Bots do.
  _hp: z.string().default(""),
});

function json(body: Record<string, unknown>, status = 200) {
  return NextResponse.json(body, { status });
}

function getSupabase(): SupabaseClient | null {
  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) return null;
  return createClient(url, key, { auth: { persistSession: false } });
}

export async function POST(req: Request) {
  let raw: unknown;
  try {
    raw = await req.json();
  } catch {
    return json({ ok: false, error: "Invalid request." }, 400);
  }

  const parsed = LeadSchema.safeParse(raw);
  if (!parsed.success) {
    return json({ ok: false, error: "Please check the form and try again." }, 400);
  }
  const data = parsed.data;

  // Honeypot — accept so the bot thinks it worked, but forward nothing.
  if (data._hp.trim().length > 0) {
    return json({ ok: true });
  }

  const route = resolveRoute(data.formId);
  const submittedAt = new Date().toISOString();

  // Request metadata (server-derived, not client-trusted).
  const ipAddress =
    (req.headers.get("x-forwarded-for") ?? "").split(",")[0]?.trim() || null;
  const userAgent = req.headers.get("user-agent") || null;

  const utm = data.utm ?? {};
  const leadSource =
    (typeof utm.utm_source === "string" && utm.utm_source) || "website";
  const medium =
    (typeof utm.utm_medium === "string" && utm.utm_medium) || null;

  // 1. Store in Supabase FIRST.
  const supabase = getSupabase();
  let submissionId: string | number | null = null;
  let stored = false;

  if (supabase) {
    const { data: inserted, error } = await supabase
      .from("form_submissions")
      .insert({
        holding: BRAND.holding,
        brand: BRAND.brand,
        form_id: data.formId,
        name: data.name,
        email: data.email,
        phone: data.phone || null,
        company: data.company || null,
        payload: data.fields ?? {},
        lead_source: leadSource,
        medium,
        utm,
        page_url: data.pageUrl || null,
        ip_address: ipAddress,
        user_agent: userAgent,
        email_status: "pending",
      })
      .select("id")
      .single();

    if (error) {
      console.error("[lead] Supabase insert failed:", error.message);
    } else {
      submissionId = (inserted?.id as string | number | undefined) ?? null;
      stored = true;
    }
  } else {
    console.warn(
      "[lead] SUPABASE_URL / SUPABASE_SERVICE_ROLE_KEY not set — lead NOT stored:",
      { formId: data.formId, email: data.email },
    );
  }

  // 2. Send the notification email via Resend.
  let emailStatus: "sent" | "failed" = "failed";
  let emailError: string | null = null;
  let resendId: string | null = null;
  const resendKey = process.env.RESEND_API_KEY;

  if (resendKey) {
    try {
      const resend = new Resend(resendKey);
      const { html, text } = renderLeadEmail({
        formLabel: route.label,
        name: data.name,
        email: data.email,
        phone: data.phone,
        company: data.company,
        fields: data.fields,
        utm,
        pageUrl: data.pageUrl,
        submittedAt,
      });

      const { data: sent, error } = await resend.emails.send({
        from: BRAND.from,
        to: [route.to],
        ...(route.cc && route.cc.length > 0 ? { cc: route.cc } : {}),
        replyTo: data.email,
        subject: buildSubject(route.label, data.name),
        html,
        text,
      });

      if (error) {
        emailError = error.message ?? JSON.stringify(error);
        console.error("[lead] Resend send failed:", error);
      } else {
        emailStatus = "sent";
        resendId = sent?.id ?? null;
      }
    } catch (err) {
      emailError = err instanceof Error ? err.message : String(err);
      console.error("[lead] Resend threw:", emailError);
    }
  } else {
    emailError = "RESEND_API_KEY not configured";
    console.warn("[lead] RESEND_API_KEY not set — notification email NOT sent.");
  }

  // 3. Record the email outcome on the stored row (best-effort).
  if (supabase && stored && submissionId !== null) {
    const { error } = await supabase
      .from("form_submissions")
      .update({
        email_status: emailStatus,
        email_error: emailError,
        resend_id: resendId,
      })
      .eq("id", submissionId);
    if (error) {
      console.error("[lead] Failed to update email outcome:", error.message);
    }
  }

  // 4. Forward to the sales CRM pipeline — ONLY for forms flagged with a
  //    pipeline (currently just "get-a-quote" → New Business). All other
  //    forms notify by email only. Best-effort: a CRM failure never fails
  //    the request, since the lead is already in Supabase + emailed.
  if (route.crm) {
    const crmUrl = process.env.CRM_WEBHOOK_URL;
    if (crmUrl) {
      try {
        const crmRes = await fetch(crmUrl, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            formType: data.formId,
            pipeline: route.crm.pipeline,
            leadSource,
            name: data.name,
            email: data.email,
            phone: data.phone || null,
            company: data.company || null,
            ...data.fields,
            utm,
            pageUrl: data.pageUrl || null,
            submittedAt,
          }),
        });
        if (!crmRes.ok) {
          console.error(`[lead] CRM webhook returned ${crmRes.status}`);
        }
      } catch (err) {
        console.error(
          "[lead] CRM webhook threw:",
          err instanceof Error ? err.message : String(err),
        );
      }
    } else {
      console.warn(
        `[lead] "${data.formId}" is flagged for CRM (${route.crm.pipeline}) but CRM_WEBHOOK_URL is not set.`,
      );
    }
  }

  // The lead is "handled" if it reached at least one channel.
  if (!stored && emailStatus !== "sent") {
    return json(
      { ok: false, error: "We couldn't process that. Please try again or call us." },
      500,
    );
  }

  return json({ ok: true });
}
