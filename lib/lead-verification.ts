/**
 * Lightweight, free, no-friction contact verification for lead forms.
 *
 *  - emailDomainHasMx: does the email domain actually accept mail? Catches
 *    typos and fake domains (e.g. "gmial.com") using Node's DNS — no API,
 *    no key, no cost. Returns null on a transient DNS error so we never
 *    flag a real lead just because a lookup timed out.
 *  - phoneLooksValid: basic NANP (US/CA) sanity — 10 digits, real area/exchange
 *    codes, not a repeated digit. Normalization itself is left to the CRM.
 *
 * These are advisory: the caller flags the lead in CRM notes, it does NOT
 * reject, so a mistyped address never costs a real customer.
 */

import { promises as dns } from "node:dns";

/** true = domain can receive mail; false = it can't; null = couldn't tell. */
export async function emailDomainHasMx(email: string): Promise<boolean | null> {
  const at = email.lastIndexOf("@");
  if (at < 0) return false;
  const domain = email.slice(at + 1).trim();
  if (!domain) return false;

  try {
    const mx = await dns.resolveMx(domain);
    if (mx && mx.length > 0 && mx.some((r) => r.exchange)) return true;
    // No MX — some domains still receive mail via an implicit A/AAAA record.
    return await hasAddressRecord(domain);
  } catch (err) {
    const code = (err as NodeJS.ErrnoException).code;
    if (code === "ENOTFOUND" || code === "ENODATA" || code === "NXDOMAIN") {
      // No MX records (or domain missing) — fall back to A/AAAA before giving up.
      return await hasAddressRecord(domain);
    }
    // SERVFAIL / timeout / other transient error — unknown, don't flag.
    return null;
  }
}

async function hasAddressRecord(domain: string): Promise<boolean> {
  try {
    const a = await dns.resolve(domain);
    if (a && a.length > 0) return true;
  } catch {
    /* ignore */
  }
  try {
    const aaaa = await dns.resolve6(domain);
    return Boolean(aaaa && aaaa.length > 0);
  } catch {
    return false;
  }
}

/** Basic NANP sanity check. Does not reformat — the CRM normalizes. */
export function phoneLooksValid(phone: string): boolean {
  let d = phone.replace(/\D/g, "");
  if (d.length === 11 && d.startsWith("1")) d = d.slice(1);
  if (d.length !== 10) return false;
  if (/^(\d)\1{9}$/.test(d)) return false; // all identical digits
  const areaFirst = d[0];
  const exchangeFirst = d[3];
  // NANP: area code and exchange both start 2-9.
  if (areaFirst < "2" || exchangeFirst < "2") return false;
  return true;
}
