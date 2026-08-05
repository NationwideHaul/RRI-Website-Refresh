/**
 * Cookie-consent state. US opt-out model: third parties (GTM/analytics,
 * Intercom) load by default UNLESS the visitor explicitly declined. The
 * cookie banner writes this key; Intercom and GTM read it before loading.
 */
export const CONSENT_KEY = "rri-cookie-consent";

/** True only if the visitor explicitly clicked "Decline". */
export function hasDeclinedCookies(): boolean {
  if (typeof window === "undefined") return false;
  try {
    return localStorage.getItem(CONSENT_KEY) === "declined";
  } catch {
    return false;
  }
}
