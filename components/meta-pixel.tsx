"use client";

import Script from "next/script";
import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";

/**
 * Meta Pixel, scoped to the /renewal-review landing funnel ONLY. It is rendered
 * from the (landing) layout (never added globally), and additionally guarded on
 * the pathname so it can never load off the /renewal-review routes.
 *
 * The pixel ID is read from NEXT_PUBLIC_META_PIXEL_ID and is never hardcoded.
 * If that env var is unset, nothing loads (the component renders null).
 *
 * PageView: the base snippet (next/script, afterInteractive) loads fbevents.js,
 * inits the pixel, and fires the first PageView on load. On client-side
 * navigation within the funnel (e.g. the SPA transition to the thank-you page)
 * the snippet does not re-run, so we fire PageView again on pathname changes.
 *
 * Lead: fired from the form's submit handler on a successful submission (see
 * renewal-form.tsx) — never here — so it fires exactly once per submission and
 * never on page load or on the thank-you page.
 */
const PIXEL_ID = process.env.NEXT_PUBLIC_META_PIXEL_ID;

export function MetaPixel() {
  const pathname = usePathname();
  const firstRun = useRef(true);

  useEffect(() => {
    // The inline snippet already fires PageView on the initial load; skip that
    // first effect run and only fire PageView on subsequent in-funnel nav.
    if (firstRun.current) {
      firstRun.current = false;
      return;
    }
    if (!PIXEL_ID) return;
    const w = window as unknown as { fbq?: (...args: unknown[]) => void };
    w.fbq?.("track", "PageView");
  }, [pathname]);

  // No ID configured, or somehow rendered off the landing routes: load nothing.
  if (!PIXEL_ID) return null;
  if (!pathname?.startsWith("/renewal-review")) return null;

  return (
    <Script id="meta-pixel" strategy="afterInteractive">
      {`!function(f,b,e,v,n,t,s)
{if(f.fbq)return;n=f.fbq=function(){n.callMethod?
n.callMethod.apply(n,arguments):n.queue.push(arguments)};
if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
n.queue=[];t=b.createElement(e);t.async=!0;
t.src=v;s=b.getElementsByTagName(e)[0];
s.parentNode.insertBefore(t,s)}(window,document,'script',
'https://connect.facebook.net/en_US/fbevents.js');
fbq('init','${PIXEL_ID}');
fbq('track','PageView');`}
    </Script>
  );
}
