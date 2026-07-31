"use client";

import { useEffect } from "react";
import Intercom from "@intercom/messenger-js-sdk";

/**
 * Boots the Intercom messenger on every page.
 *
 * This is a public marketing site with no user login, so Intercom runs in
 * anonymous / lead mode (app_id only). The default Intercom snippet's
 * user_id / name / email / created_at fields are intentionally omitted, they
 * reference a logged-in `user` object that does not exist here. If auth is
 * added later, pass those fields in to identify signed-in users.
 */
export function IntercomWidget() {
  useEffect(() => {
    let booted = false;
    const events = ["scroll", "pointerdown", "keydown", "touchstart"] as const;

    const boot = () => {
      if (booted) return;
      booted = true;
      events.forEach((e) => window.removeEventListener(e, boot));
      Intercom({ app_id: "v4qbge05" });
    };

    // Keep the messenger off the initial critical path, but load it on its own
    // shortly after the page is ready (so the launcher is present and clickable
    // without needing the visitor to interact first) — or immediately on the
    // first interaction, whichever comes first.
    const schedule = () => {
      const ric = (
        window as Window & {
          requestIdleCallback?: (cb: () => void, opts?: { timeout: number }) => void;
        }
      ).requestIdleCallback;
      if (ric) ric(boot, { timeout: 800 });
      else window.setTimeout(boot, 600);
    };
    if (document.readyState === "complete") schedule();
    else window.addEventListener("load", schedule, { once: true });

    events.forEach((e) => window.addEventListener(e, boot, { passive: true }));

    return () => events.forEach((e) => window.removeEventListener(e, boot));
  }, []);

  return null;
}
