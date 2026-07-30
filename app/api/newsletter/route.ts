import { NextResponse } from "next/server";
import { NAP, SITE } from "@/lib/constants";

export const runtime = "nodejs";

/**
 * Newsletter signup. Newsletters are a MARKETING list, so they forward only
 * to GoHighLevel (GHL_WEBHOOK_URL) — separate from the sales CRM pipeline the
 * get-a-quote form uses (CRM_WEBHOOK_URL). Email via Resend when configured,
 * and always logged server-side so no signup is silently dropped.
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

  // Newsletter → GoHighLevel marketing CRM only.
  const ghlUrl = process.env.GHL_WEBHOOK_URL;
  if (ghlUrl) {
    try {
      const res = await fetch(ghlUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(signup),
      });
      if (!res.ok) failures.push(`ghl:${res.status}`);
    } catch (err) {
      failures.push(`ghl:${err instanceof Error ? err.message : "error"}`);
    }
  }

  if (!resendKey && !ghlUrl) {
    console.warn("[newsletter] No forwarding configured. Signup received:", signup);
  } else if (failures.length > 0) {
    console.error("[newsletter] Partial failure forwarding signup:", { signup, failures });
  }

  return NextResponse.json({ ok: true });
}
