/**
 * Lead-notification email builder.
 *
 * Table-based HTML (no flexbox / no grid) so it renders in Outlook, plus a
 * plain-text fallback. Header uses the brand accent color. Subject format:
 *   "[Road Ready Insurance] Get a quote — Jane Doe"
 */

import { BRAND } from "./form-config";

export type LeadEmailInput = {
  /** Human form label, e.g. "Get a quote". */
  formLabel: string;
  name: string;
  email: string;
  phone?: string;
  company?: string;
  /** Free-form per-form fields (the form's `fields` object). */
  fields?: Record<string, unknown>;
  /** UTM / attribution params captured client-side. */
  utm?: Record<string, unknown>;
  pageUrl?: string;
  /** ISO timestamp of submission. */
  submittedAt: string;
};

export function buildSubject(formLabel: string, name: string): string {
  const who = name.trim() || "New lead";
  return `[${BRAND.label}] ${formLabel} — ${who}`;
}

function escapeHtml(value: unknown): string {
  return String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

/** Turn "policyNumber" / "date_of_loss" into "Policy number" / "Date of loss". */
function humanizeKey(key: string): string {
  const spaced = key
    .replace(/[_-]+/g, " ")
    .replace(/([a-z0-9])([A-Z])/g, "$1 $2")
    .trim();
  return spaced.charAt(0).toUpperCase() + spaced.slice(1);
}

function stringifyValue(value: unknown): string {
  if (value === null || value === undefined) return "";
  if (typeof value === "boolean") return value ? "Yes" : "No";
  if (typeof value === "object") return JSON.stringify(value);
  return String(value);
}

/** Collect the visible rows in display order, skipping empties. */
function collectRows(input: LeadEmailInput): [string, string][] {
  const rows: [string, string][] = [];
  const push = (label: string, value: unknown) => {
    const v = stringifyValue(value).trim();
    if (v) rows.push([label, v]);
  };

  push("Name", input.name);
  push("Email", input.email);
  push("Phone", input.phone);
  push("Company", input.company);

  for (const [key, value] of Object.entries(input.fields ?? {})) {
    push(humanizeKey(key), value);
  }

  const utm = input.utm ?? {};
  for (const [key, value] of Object.entries(utm)) {
    push(humanizeKey(key), value);
  }

  push("Page", input.pageUrl);
  push("Submitted", input.submittedAt);
  return rows;
}

export function renderLeadEmail(input: LeadEmailInput): {
  html: string;
  text: string;
} {
  const rows = collectRows(input);
  const accent = BRAND.accentColor;

  const bodyRows = rows
    .map(([label, value], i) => {
      const bg = i % 2 === 0 ? "#ffffff" : "#f5f7fa";
      return `
              <tr>
                <td style="padding:10px 16px;background:${bg};border-bottom:1px solid #e5e9f0;font-size:13px;color:#5b6472;width:170px;vertical-align:top;font-family:Arial,Helvetica,sans-serif;">${escapeHtml(
                  label,
                )}</td>
                <td style="padding:10px 16px;background:${bg};border-bottom:1px solid #e5e9f0;font-size:14px;color:#1a1f2b;vertical-align:top;font-family:Arial,Helvetica,sans-serif;">${escapeHtml(
                  value,
                )}</td>
              </tr>`;
    })
    .join("");

  const html = `<!doctype html>
<html>
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>${escapeHtml(input.formLabel)}</title>
  </head>
  <body style="margin:0;padding:0;background:#eef1f5;">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#eef1f5;padding:24px 0;">
      <tr>
        <td align="center">
          <table role="presentation" width="600" cellpadding="0" cellspacing="0" style="width:600px;max-width:600px;background:#ffffff;border-radius:8px;overflow:hidden;border:1px solid #e0e4ea;">
            <tr>
              <td style="background:${accent};padding:20px 24px;font-family:Arial,Helvetica,sans-serif;">
                <div style="color:#ffffff;font-size:13px;font-weight:700;letter-spacing:0.5px;text-transform:uppercase;opacity:0.85;">${escapeHtml(
                  BRAND.label,
                )}</div>
                <div style="color:#ffffff;font-size:20px;font-weight:700;margin-top:4px;">${escapeHtml(
                  input.formLabel,
                )}</div>
              </td>
            </tr>
            <tr>
              <td style="padding:20px 24px 8px;font-family:Arial,Helvetica,sans-serif;font-size:14px;color:#5b6472;">
                New submission from the website. Reply to this email to respond to the lead directly.
              </td>
            </tr>
            <tr>
              <td style="padding:8px 24px 24px;">
                <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border:1px solid #e5e9f0;border-radius:6px;border-collapse:separate;overflow:hidden;">
                  ${bodyRows}
                </table>
              </td>
            </tr>
            <tr>
              <td style="padding:0 24px 24px;font-family:Arial,Helvetica,sans-serif;font-size:11px;color:#9aa3b2;">
                Sent automatically by the ${escapeHtml(
                  BRAND.label,
                )} website. Do not share this email — it may contain the lead's personal details.
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>`;

  const text =
    `${BRAND.label} — ${input.formLabel}\n` +
    `New website submission. Reply to respond to the lead directly.\n\n` +
    rows.map(([label, value]) => `${label}: ${value}`).join("\n") +
    `\n`;

  return { html, text };
}
