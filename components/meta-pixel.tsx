"use client";

import Script from "next/script";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { hasDeclinedCookies } from "@/lib/consent";

/**
 * Meta (Facebook) Pixel, loaded SITE-WIDE from the root layout. The pixel ID
 * is hardcoded (pixel IDs are public — they ship in the page source either
 * way) so a missing env var can never silently disable tracking again.
 *
 * Consent: follows the same US opt-out model as GTM (analytics-gtm.tsx) — the
 * pixel loads by default unless the visitor explicitly declined cookies.
 *
 * PageView: the base snippet (next/script, afterInteractive) loads
 * fbevents.js, inits the pixel, and fires the first PageView. App Router
 * client-side navigations don't re-run the snippet, so we fire PageView again
 * on every pathname change (skipping the first run to avoid a duplicate).
 *
 * Lead: fired ONLY from the renewal-review form's submit handler after the
 * /api/lead/ call succeeds (see renewal-form.tsx) — never here, never on page
 * load, and never on the thank-you page, so it fires exactly once per lead.
 *
 * The <noscript> image fallback is rendered unconditionally (it must be in
 * the server HTML to reach JS-disabled browsers; the consent banner itself
 * requires JS, so no-JS visitors cannot have declined).
 */
const PIXEL_ID = "1007939204552000";

declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void;
  }
}

export function MetaPixel() {
  const pathname = usePathname();
  const [allowed, setAllowed] = useState(false);
  const firstRun = useRef(true);

  useEffect(() => {
    if (!hasDeclinedCookies()) setAllowed(true);
  }, []);

  useEffect(() => {
    // The inline snippet already fires PageView on the initial load; skip the
    // first effect run and only fire on subsequent client-side navigations.
    if (firstRun.current) {
      firstRun.current = false;
      return;
    }
    if (typeof window !== "undefined") {
      window.fbq?.("track", "PageView");
    }
  }, [pathname]);

  return (
    <>
      {allowed && (
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
      )}
      <noscript>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          height="1"
          width="1"
          style={{ display: "none" }}
          alt=""
          src={`https://www.facebook.com/tr?id=${PIXEL_ID}&ev=PageView&noscript=1`}
        />
      </noscript>
    </>
  );
}
