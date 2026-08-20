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

import { randomUUID } from "node:crypto";
import { NextResponse } from "next/server";
import { z } from "zod";
import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import { Resend } from "resend";
import { BRAND, resolveRoute } from "@/lib/form-config";
import { buildSubject, renderLeadEmail } from "@/lib/email-template";
import { emailDomainHasMx, phoneLooksValid } from "@/lib/lead-verification";
import { sendCapiLead } from "@/lib/meta-capi";

export const runtime = "nodejs";

const LeadSchema = z.object({
  formId: z.string().min(1),
  name: z.string().min(1),
  // Optional split name — quote form sends these so the CRM (which requires
  // first/last separately) gets clean values without server-side guessing.
  firstName: z.string().default(""),
  lastName: z.string().default(""),
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

/** Quote-form "authority" dropdown value → human label for the CRM note. */
function humanizeAuthority(value: string): string {
  switch (value) {
    case "new-authority":
      return "New Authority";
    case "existing-authority":
      return "Existing Authority";
    case "pending-cancellation":
      return "Pending Cancellation";
    default:
      return value;
  }
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
  // An explicit per-form source (e.g. "Meta Ads" for the renewal-review landing)
  // wins over the utm-derived source; otherwise fall back to utm_source / website.
  const leadSource =
    route.source ||
    (typeof utm.utm_source === "string" && utm.utm_source) ||
    "website";
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

  // 4. Forward to the Road Ready CRM lead-intake webhook — ONLY for forms
  //    flagged with a formIdentifier (currently just "get-a-quote"). The CRM
  //    matches formIdentifier to its mapping and handles pipeline, lead source
  //    ("Website"), and round-robin producer assignment itself. We send only
  //    the flat field contract. Best-effort: a CRM failure never fails the
  //    request, since the lead is already in Supabase + emailed.
  if (route.crm) {
    // CRM_WEBHOOK_URL carries the endpoint. The shared secret can be supplied
    // either inside that URL as `?key=...` (Cognito-style) OR separately via
    // CRM_WEBHOOK_SECRET (sent as x-api-key). CRM_WEBHOOK_SECRET is optional —
    // if the key is already in the URL, we don't need it.
    const crmUrl = process.env.CRM_WEBHOOK_URL;
    const crmSecret = process.env.CRM_WEBHOOK_SECRET;
    if (crmUrl) {
      // First/last: prefer the explicit fields the form sends; fall back to
      // splitting the full name so we never send an empty required field.
      const nameParts = data.name.trim().split(/\s+/);
      const firstName = data.firstName.trim() || nameParts[0] || "";
      const lastName =
        data.lastName.trim() ||
        (nameParts.length > 1 ? nameParts.slice(1).join(" ") : "");

      // Fields the RRI form collects that have no dedicated CRM column go into
      // notes so nothing is lost. `str()` reads a string field or "".
      const str = (key: string) =>
        typeof data.fields[key] === "string" ? (data.fields[key] as string).trim() : "";
      const authority = str("authority");
      const usdot = str("usdot");
      // Renewal-review qualifying answers (paid Meta landing form).
      const state = str("state");
      const powerUnits = str("powerUnits");
      const runLength = str("runLength");
      const policyRenews = str("policyRenews");

      // Free, no-friction contact checks — advisory only. We flag the lead in
      // notes for the producer; we never reject over a typo.
      const [mxOk, phoneOk] = await Promise.all([
        emailDomainHasMx(data.email),
        Promise.resolve(data.phone ? phoneLooksValid(data.phone) : true),
      ]);

      const noteLines = [
        `Submitted via the ${route.label} form on roadreadyinsurance.com.`,
        route.source ? `Lead source: ${route.source}` : null,
        authority ? `Authority status: ${humanizeAuthority(authority)}` : null,
        state ? `State of operation: ${state}` : null,
        powerUnits ? `Number of power units: ${powerUnits}` : null,
        runLength ? `Most runs: ${runLength}` : null,
        policyRenews ? `Current policy renews: ${policyRenews}` : null,
        mxOk === false
          ? "⚠️ Email domain has no mail server — likely a typo or fake address; call the number instead."
          : null,
        !phoneOk
          ? "⚠️ Phone failed a basic validity check — double-check before dialing."
          : null,
        data.pageUrl ? `Page: ${data.pageUrl}` : null,
      ].filter(Boolean);

      try {
        const crmRes = await fetch(crmUrl, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            // Send the key as a header ONLY when it isn't already in the URL's
            // query (avoid presenting the same key twice). If CRM_WEBHOOK_URL
            // carries `?key=...`, that's used; otherwise fall back to the
            // separate secret as x-api-key.
            ...(crmSecret && !/[?&]key=/.test(crmUrl)
              ? { "x-api-key": crmSecret }
              : {}),
          },
          body: JSON.stringify({
            formIdentifier: route.crm.formIdentifier,
            firstName,
            lastName,
            email: data.email,
            ...(data.phone ? { phone: data.phone } : {}),
            ...(data.company ? { companyName: data.company } : {}),
            ...(usdot ? { dotNumber: usdot } : {}),
            // Explicit source override (e.g. "Meta Ads"). Sent under both keys
            // so the CRM picks up whichever field name it expects; the source is
            // also in the note above as a guaranteed-visible fallback. If the CRM
            // derives source only from formIdentifier, these are ignored and the
            // note still carries it.
            ...(route.source
              ? { source: route.source, leadSource: route.source }
              : {}),
            notes: noteLines.join("\n"),
          }),
        });
        if (!crmRes.ok) {
          const detail = await crmRes.text().catch(() => "");
          console.error(
            `[lead] CRM webhook returned ${crmRes.status}${detail ? `: ${detail}` : ""}`,
          );
        }
      } catch (err) {
        console.error(
          "[lead] CRM webhook threw:",
          err instanceof Error ? err.message : String(err),
        );
      }
    } else {
      console.warn(
        `[lead] "${data.formId}" is flagged for CRM (${route.crm.formIdentifier}) but CRM_WEBHOOK_URL / CRM_WEBHOOK_SECRET is not set.`,
      );
    }
  }

  // 5. Fire the customer autoresponder via GoHighLevel (best-effort). GHL sends
  //    the "we got your request" confirmation to the PERSON who submitted (not
  //    an internal inbox). One webhook, two branches keyed on confirmation_type:
  //      "quote"   -> get-a-quote     ("We got your quote request")
  //      "general" -> every other form ("We got your request")
  // Renewal-review can point at its OWN duplicated GHL workflow via a dedicated
  // inbound webhook (GHL_RENEWAL_AUTORESPONDER_WEBHOOK_URL). If that env var
  // isn't set it falls back to the shared webhook, so the visitor still gets the
  // generic confirmation — no regression until the new workflow is wired up.
  const autoresponderUrl =
    (data.formId === "renewal-review" &&
      process.env.GHL_RENEWAL_AUTORESPONDER_WEBHOOK_URL) ||
    process.env.GHL_AUTORESPONDER_WEBHOOK_URL;
  if (autoresponderUrl) {
    try {
      const nameParts = data.name.trim().split(/\s+/);
      const arRes = await fetch(autoresponderUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: data.email,
          first_name: nameParts[0] ?? data.name,
          last_name: nameParts.slice(1).join(" "),
          phone: data.phone || "",
          company: data.company || "",
          form_id: data.formId,
          form_name: route.label,
          confirmation_type:
            data.formId === "get-a-quote"
              ? "quote"
              : data.formId === "renewal-review"
                ? "renewal"
                : "general",
          // Renewal-review extras for its dedicated GHL workflow: the source and
          // the qualifying answers, so the confirmation can be personalized and
          // the data stored on the contact. Only sent for renewal-review so the
          // shared workflow's field matching stays unchanged for other forms.
          ...(data.formId === "renewal-review"
            ? {
                source: route.source || "",
                state:
                  typeof data.fields.state === "string" ? data.fields.state : "",
                power_units:
                  typeof data.fields.powerUnits === "string"
                    ? data.fields.powerUnits
                    : "",
                run_length:
                  typeof data.fields.runLength === "string"
                    ? data.fields.runLength
                    : "",
                policy_renews:
                  typeof data.fields.policyRenews === "string"
                    ? data.fields.policyRenews
                    : "",
              }
            : {}),
        }),
      });
      if (!arRes.ok) {
        console.error(`[lead] Autoresponder webhook returned ${arRes.status}`);
      }
    } catch (err) {
      console.error(
        "[lead] Autoresponder webhook threw:",
        err instanceof Error ? err.message : String(err),
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

  // 6. Meta Conversions API — server-side Lead, ONLY for renewal-review so it
  //    mirrors the browser pixel exactly (the pixel's Lead fires only from that
  //    form). Shares event_id with the browser fbq call (returned below) so
  //    Meta deduplicates the pair and counts one Lead. Best-effort and awaited
  //    (Vercel kills un-awaited work after the response); sendCapiLead never
  //    throws, so a Meta outage can't fail the request.
  let eventId: string | undefined;
  if (data.formId === "renewal-review") {
    // Prefer the durable Supabase row id as the dedup key; fall back to a UUID
    // if storage was unavailable (the email channel still carried the lead).
    eventId = submissionId !== null ? String(submissionId) : randomUUID();

    const nameParts = data.name.trim().split(/\s+/);
    const cookieHeader = req.headers.get("cookie") ?? "";
    const readCookie = (name: string) =>
      cookieHeader.match(new RegExp(`(?:^|;\\s*)${name}=([^;]+)`))?.[1] ?? null;

    await sendCapiLead({
      eventId,
      email: data.email,
      phone: data.phone || null,
      firstName: nameParts[0] ?? null,
      lastName: nameParts.length > 1 ? nameParts.slice(1).join(" ") : null,
      clientIpAddress: ipAddress,
      clientUserAgent: userAgent,
      fbc: readCookie("_fbc"),
      fbp: readCookie("_fbp"),
      sourceUrl:
        data.pageUrl ||
        req.headers.get("referer") ||
        "https://www.roadreadyinsurance.com/renewal-review/",
    });
  }

  // eventId (when present) lets the browser pass the same eventID to its fbq
  // Lead call so Meta dedups the browser/server pair.
  return json(eventId ? { ok: true, eventId } : { ok: true });
}
