"use client";

import { GoogleTagManager } from "@next/third-parties/google";
import { useEffect, useState } from "react";
import { hasDeclinedCookies } from "@/lib/consent";

/**
 * Loads Google Tag Manager unless the visitor declined cookies (US opt-out).
 * Client-gated so the Decline choice actually suppresses analytics — the
 * cookie banner reloads the page on Decline, and on that reload this renders
 * nothing.
 */
export function AnalyticsGTM() {
  const [allowed, setAllowed] = useState(false);

  useEffect(() => {
    if (!hasDeclinedCookies()) setAllowed(true);
  }, []);

  return allowed ? <GoogleTagManager gtmId="GTM-N2JQCVW" /> : null;
}
