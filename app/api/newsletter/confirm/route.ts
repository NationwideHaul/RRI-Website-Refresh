/**
 * Double opt-in confirmation — GET /api/newsletter/confirm?token=…
 *
 * The link emailed by /api/newsletter. On a valid, still-pending token we mark
 * the row confirmed and only THEN forward the contact to GoHighLevel. Always
 * redirects to /newsletter-confirmed with a status the page can render.
 *
 * Note: this is a GET so the email link works on click. Aggressive inbox link
 * scanners can therefore auto-confirm; acceptable for a marketing newsletter.
 */

import { NextResponse } from "next/server";
import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import { SITE } from "@/lib/constants";

export const runtime = "nodejs";

function getSupabase(): SupabaseClient | null {
  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) return null;
  return createClient(url, key, { auth: { persistSession: false } });
}

function redirect(status: "confirmed" | "already" | "invalid") {
  return NextResponse.redirect(new URL(`/newsletter-confirmed?status=${status}`, SITE.url));
}

export async function GET(req: Request) {
  const token = new URL(req.url).searchParams.get("token");
  if (!token) return redirect("invalid");

  const supabase = getSupabase();
  if (!supabase) {
    console.error("[newsletter/confirm] Supabase not configured.");
    return redirect("invalid");
  }

  // Find the signup by token.
  const { data: row, error } = await supabase
    .from("newsletter_signups")
    .select("id, email, status")
    .eq("token", token)
    .maybeSingle();

  if (error || !row) return redirect("invalid");
  if (row.status === "confirmed") return redirect("already");

  // Mark confirmed.
  const { error: updateError } = await supabase
    .from("newsletter_signups")
    .update({ status: "confirmed", confirmed_at: new Date().toISOString() })
    .eq("id", row.id);

  if (updateError) {
    console.error("[newsletter/confirm] update failed:", updateError.message);
    return redirect("invalid");
  }

  // Only now does the contact reach the marketing list.
  const ghlUrl = process.env.GHL_WEBHOOK_URL;
  if (ghlUrl) {
    try {
      await fetch(ghlUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: row.email,
          type: "newsletter-signup",
          submittedAt: new Date().toISOString(),
          source: SITE.url,
          confirmed: true,
        }),
      });
    } catch (err) {
      // Contact is confirmed in our store; a GHL hiccup shouldn't error the user.
      console.error("[newsletter/confirm] GHL forward failed:", err instanceof Error ? err.message : err);
    }
  }

  return redirect("confirmed");
}
