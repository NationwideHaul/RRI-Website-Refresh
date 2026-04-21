import { NextResponse } from "next/server";
import { NAP, SITE } from "@/lib/constants";

export const runtime = "nodejs";

type QuoteLead = {
  name?: string;
  phone?: string;
  email?: string;
  company?: string;
  dot?: string;
  fleetSize?: string;
  message?: string;
  companyWebsite?: string; // honeypot
};

function isValidEmail(value: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

function isValidPhone(value: string): boolean {
  return value.replace(/\D/g, "").length >= 10;
}

function ok() {
  return NextResponse.json({ ok: true });
}

function bad(error: string, status = 400) {
  return NextResponse.json({ ok: false, error }, { status });
}

export async function POST(req: Request) {
  let body: QuoteLead;
  try {
    body = (await req.json()) as QuoteLead;
  } catch {
    return bad("Invalid request.");
  }

  // Honeypot — silently accept bot submissions without forwarding.
  if (body.companyWebsite && body.companyWebsite.trim().length > 0) {
    return ok();
  }

  const name = body.name?.trim() ?? "";
  const phone = body.phone?.trim() ?? "";
  const email = body.email?.trim() ?? "";
  const company = body.company?.trim() ?? "";
  const dot = body.dot?.trim() ?? "";
  const fleetSize = body.fleetSize?.trim() ?? "";
  const message = body.message?.trim() ?? "";

  if (!name) return bad("Missing name.");
  if (!phone) return bad("Missing phone.");
  if (!isValidPhone(phone)) return bad("Invalid phone.");
  if (!email) return bad("Missing email.");
  if (!isValidEmail(email)) return bad("Invalid email.");
  if (!company) return bad("Missing company.");
  if (!fleetSize) return bad("Missing fleet size.");

  const lead = {
    name,
    phone,
    email,
    company,
    dot: dot || null,
    fleetSize,
    message: message || null,
    submittedAt: new Date().toISOString(),
    source: SITE.url,
  };

  const failures: string[] = [];

  // 1. Email via Resend (if configured).
  const resendKey = process.env.RESEND_API_KEY;
  const formTo = process.env.FORM_EMAIL_TO;
  const formFrom = process.env.FORM_EMAIL_FROM;

  if (resendKey && formTo && formFrom) {
    try {
      const emailRes = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${resendKey}`,
        },
        body: JSON.stringify({
          from: formFrom,
          to: formTo.split(",").map((s) => s.trim()),
          reply_to: email,
          subject: `New quote request from ${name} (${company})`,
          html: renderLeadEmail(lead),
          text: renderLeadText(lead),
        }),
      });
      if (!emailRes.ok) failures.push(`resend:${emailRes.status}`);
    } catch (err) {
      failures.push(`resend:${errMsg(err)}`);
    }
  }

  // 2. CRM webhook (GoHighLevel etc.)
  const ghlUrl = process.env.GHL_WEBHOOK_URL;
  if (ghlUrl) {
    try {
      const ghlRes = await fetch(ghlUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(lead),
      });
      if (!ghlRes.ok) failures.push(`ghl:${ghlRes.status}`);
    } catch (err) {
      failures.push(`ghl:${errMsg(err)}`);
    }
  }

  // Always log server-side so leads are never silently lost during setup.
  if (!resendKey && !ghlUrl) {
    console.warn(
      "[quote] No RESEND_API_KEY or GHL_WEBHOOK_URL configured. Lead received but not forwarded:",
      lead,
    );
  } else if (failures.length > 0) {
    console.error("[quote] Partial failure forwarding lead:", {
      lead,
      failures,
    });
  } else {
    console.info("[quote] Lead forwarded successfully:", {
      email,
      company,
      fleetSize,
    });
  }

  // Succeed from the client's perspective even if a forwarder failed —
  // we logged the lead server-side and failing the user-facing request
  // just loses a good lead to a transient email outage.
  return ok();
}

function renderLeadEmail(lead: {
  name: string;
  phone: string;
  email: string;
  company: string;
  dot: string | null;
  fleetSize: string;
  message: string | null;
  submittedAt: string;
}) {
  const rows = [
    ["Name", lead.name],
    ["Phone", lead.phone],
    ["Email", lead.email],
    ["Company", lead.company],
    ["USDOT", lead.dot ?? "—"],
    ["Fleet size", lead.fleetSize],
    ["Message", lead.message ?? "—"],
    ["Submitted", lead.submittedAt],
  ]
    .map(
      ([label, value]) =>
        `<tr><td style="padding:8px 12px;font-weight:600;color:#225296;white-space:nowrap;">${label}</td><td style="padding:8px 12px;color:#333333;">${escapeHtml(String(value))}</td></tr>`,
    )
    .join("");

  return `<!doctype html><html><body style="font-family:Arial,Helvetica,sans-serif;background:#f3f4f6;padding:24px;">
  <table style="max-width:560px;margin:0 auto;background:#ffffff;border:1px solid #e5e7eb;border-radius:12px;overflow:hidden;">
    <tr><td style="background:#225296;color:#ffffff;padding:18px 24px;font-size:18px;font-weight:700;">New quote request — ${NAP.shortName}</td></tr>
    <tr><td style="padding:16px 12px;">
      <table style="width:100%;border-collapse:collapse;">${rows}</table>
    </td></tr>
    <tr><td style="padding:12px 24px;background:#f9fafb;color:#6b7280;font-size:12px;">Submitted via ${SITE.url} — reply directly to contact the lead.</td></tr>
  </table>
</body></html>`;
}

function renderLeadText(lead: {
  name: string;
  phone: string;
  email: string;
  company: string;
  dot: string | null;
  fleetSize: string;
  message: string | null;
  submittedAt: string;
}) {
  return `New quote request — ${NAP.shortName}

Name: ${lead.name}
Phone: ${lead.phone}
Email: ${lead.email}
Company: ${lead.company}
USDOT: ${lead.dot ?? "-"}
Fleet size: ${lead.fleetSize}
Message: ${lead.message ?? "-"}
Submitted: ${lead.submittedAt}

Submitted via ${SITE.url}`;
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function errMsg(err: unknown): string {
  return err instanceof Error ? err.message : String(err);
}
