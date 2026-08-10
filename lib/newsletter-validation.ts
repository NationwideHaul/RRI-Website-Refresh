/**
 * Newsletter email validation + spam heuristics (server-side).
 *
 * Pure, dependency-free so it can be unit-tested and imported from the route
 * handler. `classifyEmail` returns a machine reason on rejection so the API
 * can log WHY something was dropped without leaking specifics to the client.
 */

/**
 * Carrier SMS-to-email gateways. Bots harvest these to spam via text; no real
 * newsletter subscriber signs up with one. Matched as a domain suffix so
 * regional subdomains (e.g. `foo.vtext.com`) are caught too.
 */
export const SMS_GATEWAY_DOMAINS = [
  "vtext.com",
  "txt.att.net",
  "mms.att.net",
  "tmomail.net",
  "vzwpix.com",
  "messaging.sprintpcs.com",
  "pm.sprint.com",
  "msg.fi.google.com",
  "mailmymobile.net",
  "sms.mycricket.com",
  "mymetropcs.com",
  "email.uscc.net",
  "vmobl.com",
  "mypixmessages.com",
  "text.republicwireless.com",
] as const;

/** Disposable / throwaway inbox providers. Suffix-matched. */
export const DISPOSABLE_DOMAINS = [
  "mailinator.com",
  "yopmail.com",
  "guerrillamail.com",
  "guerrillamail.info",
  "grr.la",
  "10minutemail.com",
  "tempmail.com",
  "temp-mail.org",
  "trashmail.com",
  "sharklasers.com",
  "getnada.com",
  "nada.email",
  "maildrop.cc",
  "mailnesia.com",
  "dispostable.com",
  "fakeinbox.com",
  "throwawaymail.com",
  "mailinator.net",
  "spam4.me",
  "mohmal.com",
] as const;

export type EmailVerdict = { ok: true } | { ok: false; reason: string };

/**
 * Basic RFC-ish syntax: exactly one @, non-empty local + domain, domain has a
 * label + a real-looking TLD (2+ alpha chars, no digits). Intentionally strict
 * enough to reject `foo@bar` (no TLD) and `foo@bar.123` (numeric TLD) while
 * accepting normal addresses.
 */
export function isValidEmailSyntax(email: string): boolean {
  if (!email || email.length > 254) return false;
  const at = email.indexOf("@");
  if (at <= 0 || at !== email.lastIndexOf("@")) return false;
  const local = email.slice(0, at);
  const domain = email.slice(at + 1);
  if (!local || local.length > 64) return false;
  // No spaces or control chars anywhere.
  if (/[\s]/.test(email)) return false;
  // Domain: dot-separated labels, last label (TLD) is 2+ letters.
  if (!/^[a-z0-9]([a-z0-9-]*[a-z0-9])?(\.[a-z0-9]([a-z0-9-]*[a-z0-9])?)+$/i.test(domain)) {
    return false;
  }
  const tld = domain.slice(domain.lastIndexOf(".") + 1);
  if (!/^[a-z]{2,}$/i.test(tld)) return false;
  return true;
}

/** Count of dots in the local part (before the @). */
export function localPartDotCount(email: string): number {
  const at = email.indexOf("@");
  if (at < 0) return 0;
  return (email.slice(0, at).match(/\./g) ?? []).length;
}

function domainMatches(domain: string, list: readonly string[]): boolean {
  return list.some((d) => domain === d || domain.endsWith(`.${d}`));
}

/**
 * Full spam classification. Returns the first failing reason, or {ok:true}.
 * `email` is expected already trimmed + lowercased by the caller.
 */
export function classifyEmail(email: string): EmailVerdict {
  if (!isValidEmailSyntax(email)) return { ok: false, reason: "invalid-syntax" };

  // 3+ dots in the local part is a classic Gmail dot-trick abuse signal.
  if (localPartDotCount(email) >= 3) return { ok: false, reason: "dot-trick" };

  const domain = email.slice(email.indexOf("@") + 1);
  if (domainMatches(domain, SMS_GATEWAY_DOMAINS)) {
    return { ok: false, reason: "sms-gateway" };
  }
  if (domainMatches(domain, DISPOSABLE_DOMAINS)) {
    return { ok: false, reason: "disposable" };
  }

  return { ok: true };
}
