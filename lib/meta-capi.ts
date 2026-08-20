// Meta Conversions API — server-side event sender for RRI (Next.js / Vercel)
// Pixel: 1007939204552000 (Road Ready Insurance)
// No SDK dependency — plain fetch against the Graph API.

import crypto from "node:crypto";

// Hardcoded on purpose, same as components/meta-pixel.tsx — a missing env var
// must never silently disable tracking. The pixel ID is public either way.
const PIXEL_ID = "1007939204552000";
const GRAPH_URL = `https://graph.facebook.com/v21.0/${PIXEL_ID}/events`;

/** SHA-256 hash for PII, per Meta spec: trim + lowercase before hashing. */
function hashPii(value?: string | null): string | undefined {
  if (!value) return undefined;
  return crypto
    .createHash("sha256")
    .update(value.trim().toLowerCase())
    .digest("hex");
}

/** Normalize US phone to digits with country code before hashing (Meta spec). */
function hashPhone(value?: string | null): string | undefined {
  if (!value) return undefined;
  let digits = value.replace(/\D/g, "");
  if (digits.length === 10) digits = "1" + digits; // assume US
  return hashPii(digits);
}

export interface CapiLeadInput {
  /** Shared with the browser fbq call for deduplication. Use the Supabase lead row id. */
  eventId: string;
  email?: string | null;
  phone?: string | null;
  firstName?: string | null;
  lastName?: string | null;
  /** From request headers — improves Event Match Quality significantly. */
  clientIpAddress?: string | null;
  clientUserAgent?: string | null;
  /** _fbc / _fbp cookies from the request. */
  fbc?: string | null;
  fbp?: string | null;
  /** Full URL of the page where the form was submitted. */
  sourceUrl: string;
}

/**
 * Sends a Lead event to Meta CAPI.
 * Fire-and-forget safe: never throws, logs errors instead,
 * so a Meta outage can never block saving the lead to Supabase.
 */
export async function sendCapiLead(input: CapiLeadInput): Promise<void> {
  const token = process.env.META_CAPI_TOKEN;
  if (!token) {
    console.error("[meta-capi] META_CAPI_TOKEN not set — skipping CAPI event");
    return;
  }

  const userData: Record<string, unknown> = {
    em: [hashPii(input.email)].filter(Boolean),
    ph: [hashPhone(input.phone)].filter(Boolean),
    fn: [hashPii(input.firstName)].filter(Boolean),
    ln: [hashPii(input.lastName)].filter(Boolean),
    client_ip_address: input.clientIpAddress ?? undefined,
    client_user_agent: input.clientUserAgent ?? undefined,
    fbc: input.fbc ?? undefined,
    fbp: input.fbp ?? undefined,
  };

  // Strip empty arrays / undefined so we never send hollow fields.
  for (const k of Object.keys(userData)) {
    const v = userData[k];
    if (v === undefined || (Array.isArray(v) && v.length === 0)) {
      delete userData[k];
    }
  }

  const body: Record<string, unknown> = {
    data: [
      {
        event_name: "Lead",
        event_time: Math.floor(Date.now() / 1000),
        event_id: input.eventId, // dedup key — must match browser fbq eventID
        action_source: "website",
        event_source_url: input.sourceUrl,
        user_data: userData,
      },
    ],
  };

  // Optional: route to the Test Events tab while validating. Must be REMOVED
  // from the environment before going live or events stay in test mode.
  if (process.env.META_TEST_EVENT_CODE) {
    body.test_event_code = process.env.META_TEST_EVENT_CODE;
  }

  try {
    const res = await fetch(`${GRAPH_URL}?access_token=${token}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    const json = await res.json();
    if (!res.ok) {
      console.error("[meta-capi] Lead event failed:", JSON.stringify(json));
    } else {
      console.log(
        `[meta-capi] Lead sent, event_id=${input.eventId}, events_received=${json.events_received}`,
      );
    }
  } catch (err) {
    console.error("[meta-capi] network error:", err);
  }
}
