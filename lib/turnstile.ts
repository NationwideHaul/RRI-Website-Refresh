/**
 * Cloudflare Turnstile server-side verification.
 *
 * Set TURNSTILE_SECRET_KEY (server) + NEXT_PUBLIC_TURNSTILE_SITE_KEY (client)
 * to activate. Until the secret is set, `verifyTurnstile` returns "unconfigured"
 * so the newsletter route can fall back to its other spam layers instead of
 * blocking every signup before the keys are pasted in.
 */

export type TurnstileResult = "ok" | "failed" | "unconfigured";

const VERIFY_URL = "https://challenges.cloudflare.com/turnstile/v0/siteverify";

export async function verifyTurnstile(
  token: string | undefined | null,
  ip?: string | null,
): Promise<TurnstileResult> {
  const secret = process.env.TURNSTILE_SECRET_KEY;
  if (!secret) return "unconfigured";
  if (!token) return "failed";

  try {
    const form = new URLSearchParams();
    form.set("secret", secret);
    form.set("response", token);
    if (ip) form.set("remoteip", ip);

    const res = await fetch(VERIFY_URL, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: form,
    });
    if (!res.ok) return "failed";
    const data = (await res.json()) as { success?: boolean };
    return data.success ? "ok" : "failed";
  } catch {
    return "failed";
  }
}
