"use client";

import { useEffect, useRef } from "react";

/**
 * Cloudflare Turnstile widget. Renders only when
 * NEXT_PUBLIC_TURNSTILE_SITE_KEY is set — until then it's a no-op so the form
 * works before the keys are pasted in. Calls `onToken` with the solved token
 * (and with "" on expiry/error so the parent can require a fresh solve).
 */

declare global {
  interface Window {
    turnstile?: {
      render: (
        el: HTMLElement,
        opts: {
          sitekey: string;
          callback: (token: string) => void;
          "expired-callback"?: () => void;
          "error-callback"?: () => void;
          theme?: "light" | "dark" | "auto";
        },
      ) => string;
      reset: (id?: string) => void;
    };
  }
}

const SITE_KEY = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;
const SCRIPT_SRC = "https://challenges.cloudflare.com/turnstile/v0/api.js";

export const TURNSTILE_ENABLED = Boolean(SITE_KEY);

export function TurnstileWidget({ onToken }: { onToken: (token: string) => void }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const rendered = useRef(false);
  // Keep the latest callback without re-running the render effect.
  const cb = useRef(onToken);
  cb.current = onToken;

  useEffect(() => {
    if (!SITE_KEY) return;
    let cancelled = false;

    const render = () => {
      if (cancelled || rendered.current || !containerRef.current || !window.turnstile) {
        return;
      }
      rendered.current = true;
      window.turnstile.render(containerRef.current, {
        sitekey: SITE_KEY,
        theme: "auto",
        callback: (token) => cb.current(token),
        "expired-callback": () => cb.current(""),
        "error-callback": () => cb.current(""),
      });
    };

    if (window.turnstile) {
      render();
    } else {
      let script = document.querySelector<HTMLScriptElement>(
        `script[src="${SCRIPT_SRC}"]`,
      );
      if (!script) {
        script = document.createElement("script");
        script.src = SCRIPT_SRC;
        script.async = true;
        script.defer = true;
        document.head.appendChild(script);
      }
      script.addEventListener("load", render);
    }

    return () => {
      cancelled = true;
    };
  }, []);

  if (!SITE_KEY) return null;
  return <div ref={containerRef} className="min-h-[65px]" />;
}
