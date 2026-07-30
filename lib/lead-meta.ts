/**
 * Client-side lead attribution helper. Reads UTM params from the current URL
 * and the full page URL, to send alongside a /api/lead submission.
 */

const UTM_KEYS = [
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_term",
  "utm_content",
] as const;

export type LeadMeta = {
  utm: Record<string, string>;
  pageUrl: string;
};

export function readLeadMeta(): LeadMeta {
  if (typeof window === "undefined") return { utm: {}, pageUrl: "" };
  const params = new URLSearchParams(window.location.search);
  const utm: Record<string, string> = {};
  for (const key of UTM_KEYS) {
    const value = params.get(key);
    if (value) utm[key] = value;
  }
  return { utm, pageUrl: window.location.href };
}
