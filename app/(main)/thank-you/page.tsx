import type { Metadata } from "next";
import Link from "next/link";
import { CheckCircle2, Clock, PhoneCall, Search, ShieldCheck } from "lucide-react";
import { Hero } from "@/components/blocks/hero";
import { Reveal } from "@/components/blocks/reveal";
import { SectionHeading } from "@/components/blocks/section-heading";
import { NAP } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Thank You — Your Quote Request Is In",
  description:
    "Thanks for reaching out to Road Ready Insurance. Here's what happens next now that your quote request is in.",
  alternates: { canonical: "/thank-you/" },
  // Confirmation page, keep it out of search and off conversion double-counts.
  robots: { index: false, follow: false },
};

const STEPS = [
  {
    step: "1",
    title: "We review your submission",
    body: "A licensed agent reviews your details and authority status, then pulls the coverages that fit your operation.",
    Icon: Search,
  },
  {
    step: "2",
    title: "We shop your coverage",
    body: "We compare your risk across our A-rated markets to find the right protection at the best available rate, no guesswork.",
    Icon: ShieldCheck,
  },
  {
    step: "3",
    title: "An agent reaches out",
    body: "You'll hear from us within 2 business hours by phone or email with your options and clear next steps.",
    Icon: Clock,
  },
];

const hasRealPhone = !NAP.phone.startsWith("PLACEHOLDER_");

export default function ThankYouPage() {
  return (
    <>
      <Hero
        eyebrow="Quote request received"
        headline="Thank you."
        headlineMuted="Your request is in."
        subhead="Thanks for reaching out to Road Ready Insurance. A licensed agent is already on it, here's exactly what happens next."
      />

      {/* Next steps */}
      <section aria-labelledby="next-steps-heading" className="bg-background">
        <div className="mx-auto flex max-w-7xl flex-col gap-10 px-6 py-16 lg:px-8 lg:py-20">
          <Reveal>
            <SectionHeading
              eyebrow="What happens next"
              headline="From your request"
              headlineMuted="to a real quote."
            />
          </Reveal>

          <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
            {STEPS.map((item, i) => (
              <Reveal key={item.step} delay={i * 80} className="h-full">
                <div className="flex h-full flex-col gap-3 rounded-2xl border border-gray-100 bg-white p-7 shadow-sm">
                  <div className="flex items-center justify-between">
                    <span className="text-[28px] font-bold leading-none text-primary/25">
                      {item.step.padStart(2, "0")}
                    </span>
                    <item.Icon className="h-6 w-6 text-primary" strokeWidth={1.75} />
                  </div>
                  <h3 className="text-[18px] font-semibold text-foreground">{item.title}</h3>
                  <p className="text-[15px] leading-[1.6] text-gray-700">{item.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
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
