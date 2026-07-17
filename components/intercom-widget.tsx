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
    Intercom({ app_id: "v4qbge05" });
  }, []);

  return null;
}
