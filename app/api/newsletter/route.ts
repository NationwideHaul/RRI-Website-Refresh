import { NextResponse } from "next/server";
import { NAP, SITE } from "@/lib/constants";

export const runtime = "nodejs";

/**
 * Newsletter signup, same forwarding strategy as /api/quote: email via
 * Resend when configured, CRM webhook when configured, always logged
 * server-side so no signup is silently dropped.
 */
export async function POST(req: Request) {
  let body: { email?: string; companyWebsite?: string };
  try {
    body = (await req.json()) as { email?: string; companyWebsite?: string };
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid request." }, { status: 400 });
  }

  // Honeypot, silently accept bot submissions without forwarding.
  if (body.companyWebsite && body.companyWebsite.trim().length > 0) {
    return NextResponse.json({ ok: true });
  }

  const email = body.email?.trim() ?? "";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ ok: false, error: "Invalid email." }, { status: 400 });
  }

  const signup = {
    email,
    type: "newsletter-signup",
    submittedAt: new Date().toISOString(),
    source: SITE.url,
  };

  const failures: string[] = [];

  const resendKey = process.env.RESEND_API_KEY;
  const formTo = process.env.FORM_EMAIL_TO ?? NAP.leadsEmail;
  const formFrom = process.env.FORM_EMAIL_FROM;

  if (resendKey && formTo && formFrom) {
    try {
      const res = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${resendKey}`,
        },
        body: JSON.stringify({
          from: formFrom,
          to: formTo.split(",").map((s) => s.trim()),
          subject: `New newsletter signup: ${email}`,
          text: `New newsletter signup from the website.\n\nEmail: ${email}\nSubmitted: ${signup.submittedAt}`,
        }),
      });
      if (!res.ok) failures.push(`resend:${res.status}`);
    } catch (err) {
      failures.push(`resend:${err instanceof Error ? err.message : "error"}`);
    }
  }

  const crmUrl = process.env.CRM_WEBHOOK_URL;
  if (crmUrl) {
    try {
      const res = await fetch(crmUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(signup),
      });
      if (!res.ok) failures.push(`crm:${res.status}`);
    } catch (err) {
      failures.push(`crm:${err instanceof Error ? err.message : "error"}`);
    }
  }

  if (!resendKey && !crmUrl) {
    console.warn("[newsletter] No forwarding configured. Signup received:", signup);
  } else if (failures.length > 0) {
    console.error("[newsletter] Partial failure forwarding signup:", { signup, failures });
  }

  return NextResponse.json({ ok: true });
}
