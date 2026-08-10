/**
 * Newsletter signup — POST /api/newsletter (layered anti-spam + double opt-in).
 *
 * Order of defenses (cheapest / least-noisy first):
 *   1. Honeypot (`_hp`)         → silently accepted, never stored/forwarded.
 *   2. Time-trap (<3s)          → silently accepted, never stored/forwarded.
 *   3. Cloudflare Turnstile     → hard reject on a failed token (skipped until
 *                                 TURNSTILE_SECRET_KEY is configured).
 *   4. Email validation         → syntax → 400; spam signals (dot-trick, SMS
 *                                 gateway, disposable) silently accepted+dropped.
 *   5. Rate limit               → 3 signups per IP per hour (Supabase count).
 *   6. Double opt-in            → store as 'pending' + token, email a confirm
 *                                 link. The contact only reaches GoHighLevel
 *                                 once they click it (see confirm/route.ts).
 *
 * Silent drops return { ok:true } so bots can't tell they were caught, and no
 * real signup is ever surfaced as an error.
 *
 * Fallback: if Supabase isn't reachable (e.g. the table hasn't been created
 * yet), we skip double opt-in and forward straight to GoHighLevel so signups
 * are never lost during setup.
 */

import { NextResponse } from "next/server";
import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import { Resend } from "resend";
import { NAP, SITE } from "@/lib/constants";
import { BRAND } from "@/lib/form-config";
import { classifyEmail } from "@/lib/newsletter-validation";
import { verifyTurnstile } from "@/lib/turnstile";

export const runtime = "nodejs";

const MIN_FILL_MS = 3000; // time-trap threshold
const RATE_LIMIT_MAX = 3; // signups per IP...
const RATE_LIMIT_WINDOW_MS = 60 * 60 * 1000; // ...per hour

type Body = {
  email?: string;
  _hp?: string;
  companyWebsite?: string; // legacy honeypot name — still honored
  renderedAt?: number;
  turnstileToken?: string;
};

function ok() {
  return NextResponse.json({ ok: true });
}
function fail(error: string, status = 400) {
  return NextResponse.json({ ok: false, error }, { status });
}

function getSupabase(): SupabaseClient | null {
  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) return null;
  return createClient(url, key, { auth: { persistSession: false } });
}

/** Forward a confirmed (or fallback) signup to the GoHighLevel marketing list. */
async function forwardToGhl(email: string) {
  const ghlUrl = process.env.GHL_WEBHOOK_URL;
  if (!ghlUrl) return;
  try {
    await fetch(ghlUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email,
        type: "newsletter-signup",
        submittedAt: new Date().toISOString(),
        source: SITE.url,
      }),
    });
  } catch (err) {
    console.error("[newsletter] GHL forward failed:", err instanceof Error ? err.message : err);
  }
}

export async function POST(req: Request) {
  let body: Body;
  try {
    body = (await req.json()) as Body;
  } catch {
    return fail("Invalid request.");
  }

  // 1. Honeypot — bots fill it; humans never see it. Silent accept.
  const honeypot = (body._hp ?? body.companyWebsite ?? "").trim();
  if (honeypot.length > 0) return ok();

  // 2. Time-trap — reject near-instant submits. Silent accept.
  if (typeof body.renderedAt === "number" && Number.isFinite(body.renderedAt)) {
    const elapsed = Date.now() - body.renderedAt;
    if (elapsed >= 0 && elapsed < MIN_FILL_MS) return ok();
  }

  const email = (body.email ?? "").trim().toLowerCase();

  // 3. Turnstile — hard reject a failed token (skipped until keys configured).
  const ip =
    (req.headers.get("x-forwarded-for") ?? "").split(",")[0]?.trim() || null;
  const turnstile = await verifyTurnstile(body.turnstileToken, ip);
  if (turnstile === "failed") {
    return fail("Please complete the verification and try again.");
  }

  // 4. Email validation. Invalid syntax → tell the human; spam signals → drop.
  const verdict = classifyEmail(email);
  if (!verdict.ok) {
    if (verdict.reason === "invalid-syntax") {
      return fail("Please enter a valid email address.");
    }
    // dot-trick / sms-gateway / disposable — silent accept so bots learn nothing.
    console.warn(`[newsletter] dropped spam signup (${verdict.reason})`);
    return ok();
  }

  const supabase = getSupabase();

  // Fallback: no Supabase → can't do rate-limit or double opt-in. Forward
  // directly so the signup isn't lost, and flag it in the logs.
  if (!supabase) {
    console.warn("[newsletter] Supabase not configured — forwarding without double opt-in.");
    await forwardToGhl(email);
    return ok();
  }

  // 5. Rate limit — max N signups per IP per hour.
  if (ip) {
    const since = new Date(Date.now() - RATE_LIMIT_WINDOW_MS).toISOString();
    const { count, error } = await supabase
      .from("newsletter_signups")
      .select("id", { count: "exact", head: true })
      .eq("ip_address", ip)
      .gte("created_at", since);
    if (!error && typeof count === "number" && count >= RATE_LIMIT_MAX) {
      return fail("Too many signups from this network. Please try again later.", 429);
    }
  }

  // 6. Double opt-in — store as pending with a token, then email the link.
  const userAgent = req.headers.get("user-agent") || null;
  const { data: inserted, error: insertError } = await supabase
    .from("newsletter_signups")
    .insert({
      email,
      status: "pending",
      ip_address: ip,
      user_agent: userAgent,
      source: SITE.url,
    })
    .select("token")
    .single();

  if (insertError || !inserted?.token) {
    // Table missing or insert failed — don't lose the signup.
    console.error(
      "[newsletter] pending insert failed, forwarding directly:",
      insertError?.message,
    );
    await forwardToGhl(email);
    return ok();
  }

  const confirmUrl = `${SITE.url}/api/newsletter/confirm?token=${inserted.token}`;
  const resendKey = process.env.RESEND_API_KEY;
  const from = process.env.FORM_EMAIL_FROM || BRAND.from;

  if (resendKey) {
    try {
      const resend = new Resend(resendKey);
      await resend.emails.send({
        from,
        to: [email],
        subject: "Confirm your subscription to Road Ready Insurance",
        text: `Thanks for subscribing to Road Ready Insurance updates.\n\nPlease confirm your email by opening this link:\n${confirmUrl}\n\nIf you didn't request this, you can ignore this email.\n\n${NAP.legalName}`,
        html: confirmEmailHtml(confirmUrl),
      });
    } catch (err) {
      console.error("[newsletter] confirmation email failed:", err instanceof Error ? err.message : err);
      // The pending row exists; the person just didn't get the email. Surface a
      // soft error so they can retry rather than silently stranding them.
      return fail("We couldn't send the confirmation email. Please try again.", 502);
    }
  } else {
    console.warn("[newsletter] RESEND_API_KEY not set — confirmation email NOT sent.");
  }

  return ok();
}

/** Minimal branded confirmation email. */
function confirmEmailHtml(confirmUrl: string): string {
  return `<!doctype html><html><body style="margin:0;background:#f4f6f9;font-family:Arial,Helvetica,sans-serif;color:#1a1a1a">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#f4f6f9;padding:24px 0">
    <tr><td align="center">
      <table role="presentation" width="480" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:12px;overflow:hidden;max-width:480px">
        <tr><td style="background:${BRAND.accentColor};padding:20px 28px;color:#ffffff;font-size:18px;font-weight:bold">Road Ready Insurance</td></tr>
        <tr><td style="padding:28px">
          <p style="margin:0 0 16px;font-size:16px">Thanks for subscribing! Please confirm your email to start receiving trucking news and partner offers.</p>
          <p style="margin:0 0 24px">
            <a href="${confirmUrl}" style="display:inline-block;background:${BRAND.accentColor};color:#ffffff;text-decoration:none;padding:12px 24px;border-radius:8px;font-weight:bold;font-size:15px">Confirm my email</a>
          </p>
          <p style="margin:0 0 8px;font-size:13px;color:#666">Or paste this link into your browser:</p>
          <p style="margin:0 0 20px;font-size:13px;color:#666;word-break:break-all">${confirmUrl}</p>
          <p style="margin:0;font-size:12px;color:#999">If you didn't request this, you can safely ignore this email.</p>
        </td></tr>
      </table>
    </td></tr>
  </table></body></html>`;
}
