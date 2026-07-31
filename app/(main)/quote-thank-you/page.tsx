import type { Metadata } from "next";
import Link from "next/link";
import { CheckCircle2, PhoneCall } from "lucide-react";
import { Hero } from "@/components/blocks/hero";
import { Reveal } from "@/components/blocks/reveal";
import { YouTubeLite } from "@/components/blocks/youtube-lite";
import { NAP } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Thank You — Your Quote Request Is In",
  description:
    "Thanks for reaching out to Road Ready Insurance. Your confirmation email is on its way and a licensed agent will review your details shortly.",
  alternates: { canonical: "/quote-thank-you/" },
  // Confirmation page, keep it out of search and off conversion double-counts.
  robots: { index: false, follow: false },
};

const hasRealPhone = !NAP.phone.startsWith("PLACEHOLDER_");

export default function ThankYouPage() {
  return (
    <>
      <Hero
        eyebrow="Quote request received"
        headline="Thank you."
        headlineMuted="Your request is in."
        subhead="Your confirmation email is on its way, and a licensed agent will review your application details shortly. Please expect a call or email from our team. Talk soon!"
      />

      {/* Welcome video */}
      <section aria-labelledby="welcome-video-heading" className="bg-background">
        <div className="mx-auto max-w-3xl px-6 py-16 lg:px-8 lg:py-20">
          <h2 id="welcome-video-heading" className="sr-only">
            A quick welcome from Road Ready Insurance
          </h2>
          <Reveal>
            <YouTubeLite
              videoId="AuhpTk3-j18"
              start={12}
              title="Welcome to Road Ready Insurance"
            />
          </Reveal>
        </div>
      </section>

      {/* Reassurance + call CTA */}
      <section aria-labelledby="meanwhile-heading" className="bg-gray-50">
        <div className="mx-auto max-w-7xl px-6 py-16 lg:px-8 lg:py-20">
          <div className="mx-auto flex max-w-2xl flex-col items-center gap-6 text-center">
            <CheckCircle2 className="h-12 w-12 text-success" strokeWidth={1.5} />
            <h2 id="meanwhile-heading" className="text-[26px] type-h2 text-foreground sm:text-[30px]">
              Need something sooner?
            </h2>
            <p className="text-[16px] leading-[1.6] text-gray-700">
              No need to wait for us to call. If your renewal is close or you just want to
              talk it through, reach a licensed agent right now.
            </p>

            <div className="flex flex-col items-center gap-4 sm:flex-row">
              {hasRealPhone && (
                <a href={`tel:${NAP.phone}`} className="btn btn-primary">
                  <PhoneCall className="h-4 w-4" strokeWidth={2} />
                  Call {NAP.phoneDisplay}
                </a>
              )}
              <Link href="/coverage/" className="btn btn-outline">
                Explore our coverage
              </Link>
            </div>

            {hasRealPhone && (
              <p className="text-[13px] text-gray-500">{NAP.hours}</p>
            )}
          </div>
        </div>
      </section>
    </>
  );
}
