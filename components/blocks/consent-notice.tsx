import Link from "next/link";
import { cn } from "@/lib/utils";

/**
 * The single source of truth for the TCPA / CAN-SPAM consent language shown on
 * every lead form. Rendered inline inside a checkbox <label> (or as fine print
 * for the newsletter), so it returns inline content only.
 *
 * "glass" tints links cyan for dark/frosted backgrounds; "light" uses the
 * brand primary for white cards. Surrounding text color is inherited from the
 * parent, so wrap it in a label/paragraph with the color you want.
 */
export function ConsentNoticeText({
  variant = "light",
  kind = "full",
}: {
  variant?: "light" | "glass";
  /** "full" = the TCPA/CAN-SPAM lead-form consent; "subscribe" = the shorter
   *  newsletter line that only references the two policies. */
  kind?: "full" | "subscribe";
}) {
  const linkCls = cn(
    "underline underline-offset-2",
    variant === "glass"
      ? "text-cyan hover:text-white"
      : "text-primary hover:text-primary-dark",
  );
  const privacy = (
    <Link href="/privacy-policy/" className={linkCls}>
      Privacy Policy
    </Link>
  );
  const terms = (
    <Link href="/terms-conditions/" className={linkCls}>
      Terms &amp; Conditions
    </Link>
  );

  if (kind === "subscribe") {
    return (
      <>
        By subscribing, you agree to our {privacy} and {terms}.
      </>
    );
  }

  return (
    <>
      I agree to the {privacy} and {terms}, and consent to receive calls, texts,
      and emails from Road Ready Insurance. Message and data rates may apply.
      Reply STOP to cancel.
    </>
  );
}
