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
   * If set, this form ALSO forwards to the sales CRM (CRM_WEBHOOK_URL) into
   * the named pipeline. Omit for forms that should notify by email only.
   * Currently only "get-a-quote" → New Business.
   */
  crm?: { pipeline: string };
};

/**
 * formId → destination. formIds match the values the client forms send.
 * Add a new form by adding a row here; no route code changes needed.
 */
export const FORM_ROUTES: Record<string, FormRoute> = {
  "get-a-quote": {
    label: "Get a quote",
    to: "agents@roadreadyinsurance.com",
    // CRM auto-push is DEFERRED (per Derek, Jul 2026): new quote leads are
    // worked from the agents@ email for now and added to the CRM manually.
    // Re-enabling is pending CRM-side work — the webhook rejects our payload
    // ("Unknown or inactive form mapping"); it needs a registered
    // `formIdentifier` plus firstName/lastName and a mapping to the New
    // Business pipeline (lead source "website", round-robin producer assign).
    // To turn back on: add `crm: { pipeline: "New Business" }` here and align
    // the payload in app/api/lead/route.ts to the CRM's field contract.
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
