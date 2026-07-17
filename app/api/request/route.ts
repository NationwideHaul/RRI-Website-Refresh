import { NextResponse } from "next/server";
import { NAP, SITE } from "@/lib/constants";

export const runtime = "nodejs";

/**
 * Generic request intake endpoint used by the transactional pages
 * (Report a Claim, Get a COI, Policy Change, Customer Service). Mirrors
 * the quote route: honeypot, light validation, forward via Resend +
 * optional CRM webhook, console fallback in dev. Extra fields are
 * whitelisted per request kind and rendered into the notification.
 */

const KIND_LABELS: Record<string, string> = {
  claim: "Report a Claim",
  coi: "Certificate of Insurance Request",
  "policy-change": "Policy Change Request",
  "customer-service": "Customer Service Request",
};

// Extra fields allowed per kind, in display order: [key, label].
const KIND_FIELDS: Record<string, [string, string][]> = {
  claim: [
    ["policyNumber", "Policy number"],
    ["dateOfLoss", "Date of loss"],
    ["details", "What happened"],
  ],
  coi: [
    ["certificateHolder", "Certificate holder"],
    ["holderEmail", "Where to send it"],
    ["details", "Requirements / details"],
  ],
  "policy-change": [
    ["changeType", "Type of change"],
    ["details", "Change requested"],
    ["signature", "Signature (typed)"],
  ],
  "customer-service": [
    ["topic", "Topic"],
    ["details", "How can we help"],
  ],
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

export async function POST(req: Request) {
  let body: Record<string, unknown>;
  try {
    body = (await req.json()) as Record<string, unknown>;
  } catch {
    return bad("Invalid request.");
  }

  const str = (k: string) => (typeof body[k] === "string" ? (body[k] as string).trim() : "");

  // Honeypot, silently accept bots without forwarding.
  if (str("companyWebsite").length > 0) return ok();

  const kind = str("kind");
  if (!KIND_LABELS[kind]) return bad("Invalid request type.");

  const fullName = str("fullName");
  const email = str("email");
  const phone = str("phone");
  const company = str("company");

  if (!fullName) return bad("Missing full name.");
  if (!email) return bad("Missing email.");
  if (!isValidEmail(email)) return bad("Invalid email.");
  if (!phone) return bad("Missing phone.");
  if (!isValidPhone(phone)) return bad("Invalid phone.");

  // Collect the fixed + kind-specific fields in display order.
  const rows: [string, string][] = [
    ["Name", fullName],
    ["Company", company],
    ["Email", email],
    ["Phone", phone],
  ];
  const dot = str("dot");
  if (dot) rows.push(["USDOT", dot]);
  for (const [key, label] of KIND_FIELDS[kind] ?? []) {
    const val = str(key);
    if (val) rows.push([label, val]);
  }
  rows.push(["Submitted", new Date().toISOString()]);

  const kindLabel = KIND_LABELS[kind];
  const failures: string[] = [];

  const resendKey = process.env.RESEND_API_KEY;
  // Route to the dedicated inbox per kind; everything else to leads.
  const defaultTo =
    kind === "claim"
      ? NAP.claimsEmail
      : kind === "coi"
        ? NAP.coiEmail
        : NAP.leadsEmail;
  const formTo = process.env.FORM_EMAIL_TO ?? defaultTo;
  const formFrom = process.env.FORM_EMAIL_FROM;

  if (resendKey && formTo && formFrom) {
    try {
      const html = renderEmail(kindLabel, rows);
      const text = rows.map(([l, v]) => `${l}: ${v}`).join("\n");
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
          subject: `${kindLabel} from ${fullName}${company ? ` (${company})` : ""}`,
          html,
          text,
        }),
      });
      if (!emailRes.ok) failures.push(`resend:${emailRes.status}`);
    } catch (err) {
      failures.push(`resend:${errMsg(err)}`);
    }
  }

  const crmUrl = process.env.CRM_WEBHOOK_URL;
  if (crmUrl) {
    try {
      const crmRes = await fetch(crmUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ kind, ...Object.fromEntries(rows) }),
      });
      if (!crmRes.ok) failures.push(`crm:${crmRes.status}`);
    } catch (err) {
      failures.push(`crm:${errMsg(err)}`);
    }
  }

  if (!resendKey && !crmUrl) {
    console.warn(
      `[request:${kind}] No RESEND_API_KEY or CRM_WEBHOOK_URL configured. Received but not forwarded:`,
      Object.fromEntries(rows),
    );
  } else if (failures.length > 0) {
    console.error(`[request:${kind}] Partial failure forwarding:`, { failures });
  } else {
    console.info(`[request:${kind}] Forwarded successfully:`, { email, company });
  }

  return ok();
}

function renderEmail(kindLabel: string, rows: [string, string][]) {
  const body = rows
    .map(
      ([label, value]) =>
        `<tr><td style="padding:8px 12px;font-weight:600;color:#225296;white-space:nowrap;vertical-align:top;">${escapeHtml(label)}</td><td style="padding:8px 12px;color:#333333;">${escapeHtml(value)}</td></tr>`,
    )
    .join("");

  return `<!doctype html><html><body style="font-family:Arial,Helvetica,sans-serif;background:#f3f4f6;padding:24px;">
  <table style="max-width:560px;margin:0 auto;background:#ffffff;border:1px solid #e5e7eb;border-radius:12px;overflow:hidden;">
    <tr><td style="background:#225296;color:#ffffff;padding:18px 24px;font-size:18px;font-weight:700;">${escapeHtml(kindLabel)}, ${NAP.shortName}</td></tr>
    <tr><td style="padding:16px 12px;">
      <table style="width:100%;border-collapse:collapse;">${body}</table>
    </td></tr>
    <tr><td style="padding:12px 24px;background:#f9fafb;color:#6b7280;font-size:12px;">Submitted via ${SITE.url}, reply directly to contact the sender.</td></tr>
  </table>
</body></html>`;
}
