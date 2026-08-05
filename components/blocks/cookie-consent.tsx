"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Cookie } from "lucide-react";
import { cn } from "@/lib/utils";

const STORAGE_KEY = "rri-cookie-consent";

/**
 * Bottom cookie-consent banner. Slides up from the bottom on first visit,
 * remembers the choice in localStorage, and stays out of the way of the
 * Intercom bubble (bottom-right) by anchoring bottom-left on larger screens.
 *
 * SSR and the first client render both start hidden (translated off-screen),
 * so there is no hydration mismatch; an effect then reveals it only when no
 * prior choice is stored.
 */
export function CookieConsent() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    try {
      if (!localStorage.getItem(STORAGE_KEY)) setShow(true);
    } catch {
      // localStorage unavailable (private mode, etc.) — show anyway.
      setShow(true);
    }
  }, []);

  function choose(value: "accepted" | "declined") {
    try {
      localStorage.setItem(STORAGE_KEY, value);
    } catch {
      // Ignore storage failures; the banner still dismisses for this session.
    }
    setShow(false);
    // Decline must actually suppress the trackers that already loaded this
    // session (GTM, Intercom). Reload so they re-evaluate consent and stay off.
    if (value === "declined") window.location.reload();
  }

  return (
    <div
      aria-hidden={!show}
      className={cn(
        "fixed bottom-0 left-0 z-[60] w-full p-4 transition-transform duration-500 ease-out sm:bottom-5 sm:left-5 sm:w-auto sm:max-w-sm sm:p-0",
        show ? "translate-y-0" : "translate-y-[160%]",
      )}
    >
      <div
        role="dialog"
        aria-label="Cookie consent"
        className="flex flex-col gap-4 rounded-2xl border border-gray-200 bg-white p-5 shadow-[0_20px_50px_-15px_rgba(10,37,64,0.45)]"
      >
        <div className="flex items-start gap-3">
          <span className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full bg-primary-soft text-primary">
            <Cookie className="h-[18px] w-[18px]" strokeWidth={1.75} />
          </span>
          <div className="flex flex-col gap-1">
            <h2 className="text-[15px] font-semibold text-foreground">We use cookies</h2>
            <p className="text-[13px] leading-[1.55] text-gray-600">
              We use cookies to improve your experience and analyze site traffic.
              See our{" "}
              <Link
                href="/privacy-policy/"
                className="text-primary underline underline-offset-2 hover:text-primary-dark"
              >
                Privacy Policy
              </Link>
              .
            </p>
          </div>
        </div>
        <div className="flex gap-2.5">
          <button
            type="button"
            onClick={() => choose("accepted")}
            className="btn btn-primary flex-1"
          >
            Accept
          </button>
          <button
            type="button"
            onClick={() => choose("declined")}
            className="btn btn-outline flex-1"
          >
            Decline
          </button>
        </div>
      </div>
    </div>
  );
}
