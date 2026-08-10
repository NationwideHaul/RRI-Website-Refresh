import type { Metadata } from "next";
import Link from "next/link";
import { CheckCircle2, MailWarning } from "lucide-react";
import { Hero } from "@/components/blocks/hero";

export const metadata: Metadata = {
  title: "Newsletter Confirmation — Road Ready Insurance",
  description: "Confirm your subscription to Road Ready Insurance updates.",
  alternates: { canonical: "/newsletter-confirmed/" },
  robots: { index: false, follow: false },
};

type Status = "confirmed" | "already" | "invalid";

const COPY: Record<Status, { eyebrow: string; headline: string; headlineMuted: string; subhead: string }> = {
  confirmed: {
    eyebrow: "Subscription confirmed",
    headline: "You're all set.",
    headlineMuted: "Welcome aboard.",
    subhead:
      "Your email is confirmed. You'll now receive trucking news and partner offers from Road Ready Insurance.",
  },
  already: {
    eyebrow: "Already confirmed",
    headline: "You're already in.",
    headlineMuted: "Nothing to do.",
    subhead: "This email was already confirmed. You're on the list — no further action needed.",
  },
  invalid: {
    eyebrow: "Link problem",
    headline: "That link didn't work.",
    headlineMuted: "It may have expired.",
    subhead:
      "We couldn't confirm this link — it may be invalid or already used. Try subscribing again from our site.",
  },
};

export default async function NewsletterConfirmedPage({
  searchParams,
}: {
  searchParams: Promise<{ status?: string }>;
}) {
  const { status } = await searchParams;
  const key: Status =
    status === "confirmed" || status === "already" || status === "invalid"
      ? status
      : "invalid";
  const copy = COPY[key];
  const isError = key === "invalid";

  return (
    <>
      <Hero
        eyebrow={copy.eyebrow}
        headline={copy.headline}
        headlineMuted={copy.headlineMuted}
        subhead={copy.subhead}
      />

      <section className="bg-gray-50">
        <div className="mx-auto max-w-7xl px-6 py-16 lg:px-8 lg:py-20">
          <div className="mx-auto flex max-w-2xl flex-col items-center gap-6 text-center">
            {isError ? (
              <MailWarning className="h-12 w-12 text-amber-500" strokeWidth={1.5} />
            ) : (
              <CheckCircle2 className="h-12 w-12 text-success" strokeWidth={1.5} />
            )}
            <Link href="/" className="btn btn-primary">
              Back to home
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
