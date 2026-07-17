import { NextResponse } from "next/server";
import { NAP, SITE } from "@/lib/constants";

export const runtime = "nodejs";

type QuoteLead = {
  fullName?: string;
  company?: string;
  email?: string;
  phone?: string;
  dot?: string;
  authority?: string;
  consent?: boolean;
  companyWebsite?: string; // honeypot
  quickApp?: string;
  application?: Record<string, unknown>;
};

// Quick-quote application fields, in display order. Keys match the client's
// AppState; the redundant *Other keys are folded into their arrays client-side.
const APPLICATION_LABELS: [string, string][] = [
  ["statusOfAuthority", "Status of Authority"],
  ["knowEin", "Knows company EIN"],
  ["addr1", "Address Line 1"],
  ["addr2", "Address Line 2"],
  ["city", "City"],
  ["state", "State"],
  ["zip", "Zip"],
  ["numberOfTrucks", "Number of Trucks"],
  ["truckTypes", "Type of Trucks"],
  ["autoLiability", "Auto Liability Required"],
  ["cargoCoverage", "Cargo Coverage Amount"],
  ["generalLiability", "General Liability Required"],
  ["commodities", "Commodities to be Hauled"],
  ["numberOfDrivers", "Number of Drivers"],
  ["ownerIsDriver", "Is the Owner a Driver"],
  ["ownerFirst", "Owner First Name"],
  ["ownerLast", "Owner Last Name"],
  ["ownerDob", "Owner Date of Birth"],
  ["ownerDl", "Driver's License #"],
  ["cdl", "CDL"],
  ["homeSameAsBusiness", "Home address same as business"],
  ["truckInfoAvailable", "Truck Info Available"],
  ["submittedBy", "Information Submitted by"],
  ["hearAboutUs", "How did you hear about us"],
  ["comments", "Comments"],
  ["smsConsent", "SMS Terms agreed"],
];

/** Flatten an application value into a printable string. */
function appValue(value: unknown): string {
  if (Array.isArray(value)) return value.join(", ");
  if (typeof value === "boolean") return value ? "Yes" : "No";
  return String(value ?? "").trim();
}

/** [label, value] pairs for the application, skipping empties. */
function applicationRows(app: Record<string, unknown> | undefined): [string, string][] {
  if (!app) return [];
  const out: [string, string][] = [];
  for (const [key, label] of APPLICATION_LABELS) {
    const v = appValue(app[key]);
    if (v) out.push([label, v]);
  }
  return out;
}

const AUTHORITY_LABELS: Record<string, string> = {
  "new-authority": "New Authority",
  "existing-authority": "Existing Authority",
  "pending-cancellation": "Pending Cancellation",
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

  // Honeypot, silently accept bot submissions without forwarding.
  if (body.companyWebsite && body.companyWebsite.trim().length > 0) {
    return ok();
  }

  const fullName = body.fullName?.trim() ?? "";
  const company = body.company?.trim() ?? "";
  const email = body.email?.trim() ?? "";
  const phone = body.phone?.trim() ?? "";
  const dot = body.dot?.trim() ?? "";
  const authority = body.authority?.trim() ?? "";
  const consent = body.consent === true;

  if (!fullName) return bad("Missing full name.");
  if (!company) return bad("Missing company.");
  if (!email) return bad("Missing email.");
  if (!isValidEmail(email)) return bad("Invalid email.");
  if (!phone) return bad("Missing phone.");
  if (!isValidPhone(phone)) return bad("Invalid phone.");
  if (!dot) return bad("Missing USDOT number.");
  if (!authority) return bad("Missing authority.");
  if (!AUTHORITY_LABELS[authority]) return bad("Invalid authority value.");
  if (!consent) return bad("Consent required.");

  const hasApplication = body.quickApp === "yes" && !!body.application;

  const lead = {
    fullName,
    company,
    email,
    phone,
    dot,
    authority,
    authorityLabel: AUTHORITY_LABELS[authority],
    consent,
    application: hasApplication ? body.application : undefined,
    submittedAt: new Date().toISOString(),
    source: SITE.url,
  };

  const failures: string[] = [];

  // 1. Email via Resend (if configured).
  const resendKey = process.env.RESEND_API_KEY;
  const formTo = process.env.FORM_EMAIL_TO ?? NAP.leadsEmail;
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
          subject: `New quote request${hasApplication ? " + application" : ""} from ${fullName} (${company})`,
          html: renderLeadEmail(lead),
          text: renderLeadText(lead),
        }),
      });
      if (!emailRes.ok) failures.push(`resend:${emailRes.status}`);
    } catch (err) {
      failures.push(`resend:${errMsg(err)}`);
    }
  }

  // 2. Custom CRM webhook (Road Ready Insurance's own pipeline CRM).
  const crmUrl = process.env.CRM_WEBHOOK_URL;
  if (crmUrl) {
    try {
      const crmRes = await fetch(crmUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(lead),
      });
      if (!crmRes.ok) failures.push(`crm:${crmRes.status}`);
    } catch (err) {
      failures.push(`crm:${errMsg(err)}`);
    }
  }

  if (!resendKey && !crmUrl) {
    console.warn(
      "[quote] No RESEND_API_KEY or CRM_WEBHOOK_URL configured. Lead received but not forwarded:",
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
      authority,
    });
  }

  return ok();
}

type LeadForEmail = {
  fullName: string;
  company: string;
  email: string;
  phone: string;
  dot: string;
  authority: string;
  authorityLabel: string;
  consent: boolean;
  application?: Record<string, unknown>;
  submittedAt: string;
};

function renderLeadEmail(lead: LeadForEmail) {
  const row = ([label, value]: [string, string]) =>
    `<tr><td style="padding:8px 12px;font-weight:600;color:#225296;white-space:nowrap;vertical-align:top;">${escapeHtml(label)}</td><td style="padding:8px 12px;color:#333333;">${escapeHtml(value)}</td></tr>`;

  const contactRows = (
    [
      ["Name", lead.fullName],
      ["Company", lead.company],
      ["Email", lead.email],
      ["Phone", lead.phone],
      ["USDOT", lead.dot],
      ["Authority", lead.authorityLabel],
      ["Consent", lead.consent ? "Yes" : "No"],
      ["Submitted", lead.submittedAt],
    ] as [string, string][]
  )
    .map(row)
    .join("");

  const appPairs = applicationRows(lead.application);
  const applicationSection = appPairs.length
    ? `<tr><td colspan="2" style="padding:16px 12px 4px;font-size:13px;font-weight:700;color:#225296;text-transform:uppercase;letter-spacing:0.04em;">Quick quote application</td></tr>${appPairs
        .map(row)
        .join("")}`
    : "";
  const rows = contactRows + applicationSection;

  return `<!doctype html><html><body style="font-family:Arial,Helvetica,sans-serif;background:#f3f4f6;padding:24px;">
  <table style="max-width:560px;margin:0 auto;background:#ffffff;border:1px solid #e5e7eb;border-radius:12px;overflow:hidden;">
    <tr><td style="background:#225296;color:#ffffff;padding:18px 24px;font-size:18px;font-weight:700;">New quote request, ${NAP.shortName}</td></tr>
    <tr><td style="padding:16px 12px;">
      <table style="width:100%;border-collapse:collapse;">${rows}</table>
    </td></tr>
    <tr><td style="padding:12px 24px;background:#f9fafb;color:#6b7280;font-size:12px;">Submitted via ${SITE.url}, reply directly to contact the lead.</td></tr>
  </table>
</body></html>`;
}

function renderLeadText(lead: LeadForEmail) {
  const appPairs = applicationRows(lead.application);
  const applicationSection = appPairs.length
    ? `\n\nQuick quote application\n${appPairs.map(([l, v]) => `${l}: ${v}`).join("\n")}`
    : "";

  return `New quote request, ${NAP.shortName}

Name: ${lead.fullName}
Company: ${lead.company}
Email: ${lead.email}
Phone: ${lead.phone}
USDOT: ${lead.dot}
Authority: ${lead.authorityLabel}
Consent: ${lead.consent ? "Yes" : "No"}
Submitted: ${lead.submittedAt}${applicationSection}

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
