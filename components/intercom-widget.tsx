"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import Intercom from "@intercom/messenger-js-sdk";
import { hasDeclinedCookies } from "@/lib/consent";

/**
 * Standalone paid-landing routes are single-purpose conversion pages with no
 * escape routes, so the chat launcher (an escape route + the heaviest
 * third-party on the page) is suppressed there to protect the mobile score.
 */
const NO_INTERCOM_PREFIXES = ["/renewal-review"];

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
  const pathname = usePathname();

  useEffect(() => {
    // Boot immediately after hydration so the launcher is reliably present and
    // clickable. Skipped if the visitor declined cookies, or on the isolated
    // paid-landing routes.
    if (hasDeclinedCookies()) return;
    if (NO_INTERCOM_PREFIXES.some((p) => pathname?.startsWith(p))) return;
    Intercom({ app_id: "v4qbge05" });
  }, [pathname]);

  return null;
}
