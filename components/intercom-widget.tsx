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
      cleanup();
      Intercom({ app_id: "v4qbge05" });
    };

    function cleanup() {
      events.forEach((e) => window.removeEventListener(e, boot));
      clearTimeout(idleTimer);
    }

    // Defer the (heavy, third-party) messenger off the critical load path:
    // boot on the first real interaction, or after a short idle fallback so
    // passive readers still get it. Keeps it out of initial TBT/INP.
    events.forEach((e) => window.addEventListener(e, boot, { passive: true }));
    const idleTimer = window.setTimeout(boot, 5000);

    return cleanup;
  }, []);

  return null;
}
