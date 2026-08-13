/**
 * Lead routing table for this site (Road Ready Insurance).
 *
 * One brand block + one form→destination map. The unified /api/lead route
 * reads this to decide who gets notified for each formId. Kept framework-free
 * (no next/react imports) so it can be imported from server routes safely.
 *
 * Multi-brand note: every CCC-holding site ships its own copy of this file
 * with its own BRAND block + FORM_ROUTES, but the /api/lead handler and the
 * email template are identical across sites — only this table changes.
 */

export const BRAND = {
  /** Short brand code, stored on every submission row. */
  brand: "rri",
  /** Holding-company code (groups all brands under one parent). */
  holding: "ccc",
  /** Human label used in email subjects/headers. */
  label: "Road Ready Insurance",
  /** Resend "from" — must be on a verified sending domain. */
  from: "RRI Forms <rri@notify.nationwidehaul.com>",
  /** Accent color for the email header (brand primary). */
  accentColor: "#225296",
} as const;

export type FormRoute = {
  /** Human label for the form (used in subject + email header). */
  label: string;
  /** Primary recipient inbox. */
  to: string;
  /** Optional CC recipients. */
  cc?: string[];
  /**
   * If set, this form ALSO forwards to the Road Ready CRM lead-intake webhook
   * (CRM_WEBHOOK_URL + CRM_WEBHOOK_SECRET). `formIdentifier` is the value the
   * CRM matches against its FormMapping table to decide brand, pipeline, lead
   * source, and round-robin producer assignment — all configured CRM-side.
   * Omit for forms that should notify by email only.
   */
  crm?: { formIdentifier: string };
};

/**
 * formId → destination. formIds match the values the client forms send.
 * Add a new form by adding a row here; no route code changes needed.
 */
export const FORM_ROUTES: Record<string, FormRoute> = {
  "get-a-quote": {
    label: "Get a quote",
    to: "agents@roadreadyinsurance.com",
    // Live CRM push (Aug 2026): forwards to the RRI CRM lead-intake webhook.
    // The CRM matches `formIdentifier` to its "Road Ready Insurance" mapping
    // (brand RRI, New Business → New Lead, source "Website", round-robin
    // producer assignment) — all handled CRM-side. We only send the flat
    // field contract; see app/api/lead/route.ts. Email + Supabase still fire
    // in parallel as a safety net.
    crm: { formIdentifier: "Road Ready Insurance" },
  },
  "renewal-review": {
    label: "Renewal review request",
    to: "agents@roadreadyinsurance.com",
    // Paid Meta landing page (/renewal-review). Pushes to the RRI CRM the same
    // way the main quote form does — same "Road Ready Insurance" mapping (brand
    // RRI, New Business, source "Website", round-robin producer). Email +
    // Supabase fire in parallel as the safety net.
    crm: { formIdentifier: "Road Ready Insurance" },
  },
  "report-a-claim": {
    label: "Report a claim",
    to: "claims@roadreadyinsurance.com",
  },
  "get-a-coi": {
    label: "Certificate of insurance",
    to: "coi@roadreadyinsurance.com",
  },
  "policy-change": {
    label: "Policy change",
    to: "csr@roadreadyinsurance.com",
    cc: ["info@roadreadyinsurance.com"],
  },
  "customer-service": {
    label: "Customer service",
    to: "csr@roadreadyinsurance.com",
    cc: ["info@roadreadyinsurance.com"],
  },
};

/** Fallback inbox for an unrecognized formId — never drop a lead. */
export const DEFAULT_TO = "csr@roadreadyinsurance.com";

/** Resolve a formId to its route, falling back to the default inbox. */
export function resolveRoute(formId: string): FormRoute {
  return (
    FORM_ROUTES[formId] ?? {
      label: formId ? `Form: ${formId}` : "Website form",
      to: DEFAULT_TO,
    }
  );
}
