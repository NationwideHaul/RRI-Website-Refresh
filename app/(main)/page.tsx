import Link from "next/link";
import { ArrowRight, Phone, Shield, ShieldCheck } from "lucide-react";
import { SectionHeading } from "@/components/blocks/section-heading";
import { CoverageCard } from "@/components/blocks/coverage-card";
import { CoverageGrid } from "@/components/blocks/coverage-grid";
import { StatsSection } from "@/components/blocks/stats-section";
import { ProcessSteps, type ProcessStep } from "@/components/blocks/process-steps";
import { FAQ } from "@/components/blocks/faq";
import { CTABanner } from "@/components/blocks/cta-banner";
import { QuoteForm } from "@/components/blocks/quote-form";
import { CarrierStrip } from "@/components/blocks/carrier-strip";
import { InsuranceAgencySchema } from "@/components/schema/insurance-agency";
import type { FAQItem } from "@/components/schema/faq-page";

const HERO_FEATURES = [
  "+120 premium markets",
  "Licensed in 48 states",
  "Trucking Specialists Only.",
  "Support who actually answers.",
];

const PROCESS: ProcessStep[] = [
  {
    title: "Initial conversation",
    duration: "20-30 min",
    detail:
      "We learn your operation, current coverage, fleet profile, and what you actually need.",
  },
  {
    title: "Secondary market quotes",
    duration: "24-48 hours",
    detail:
      "We return initial numbers from accessible markets within two business days.",
  },
  {
    title: "Premium market placement",
    duration: "1-2 weeks",
    detail:
      "For A-rated carriers, we work with underwriters to build the right submission.",
  },
  {
    title: "Review and bind",
    duration: "Together",
    detail:
      "We walk through every coverage, endorsement, and exclusion before you sign.",
  },
  {
    title: "Ongoing partnership",
    duration: "As long as needed",
    detail:
      "Your named agent stays with you through renewals, certificates, claims, and growth.",
  },
];

const FAQS: FAQItem[] = [
  {
    question: "How long does it take to get a commercial trucking insurance quote?",
    answer:
      "For secondary market quotes, 24 to 48 hours from the time we receive your submission. For placement with premium A-rated carriers, 1 to 2 weeks is typical. The extra time is how we access better markets. The fast-quote model does not reach those carriers.",
  },
  {
    question: "What carriers does Road Ready Insurance work with?",
    answer:
      "We have appointments with 100+ commercial trucking insurance carriers, including premium A-rated markets that most small brokers cannot access. When we build your submission, we place you with the carriers that match your operation, not just the ones that respond fastest.",
  },
  {
    question: "Does RRI work with new trucking authorities or only established fleets?",
    answer:
      "We specialize in fleets that are 2 years or more in business and growing steadily. For brand-new authorities, we can often help, but the best fit for our markets is an operator who has built some track record. If you are just starting, the Startup Guide is a good place to begin, and we can discuss your specific situation.",
  },
  {
    question: "What states does RRI operate in?",
    answer:
      "We are licensed in 48 states plus the District of Columbia. Our offices are in Boca Raton, Florida, and we work with fleets across the United States, including Florida, Georgia, Texas, New Jersey, North Carolina, and many more.",
  },
  {
    question: "How does claim handling work at RRI?",
    answer:
      "We have an in-house licensed claims adjuster on staff. When you file a claim, it is handled directly by our team, not routed to a call center or third-party administrator. Your named agent stays involved throughout the process.",
  },
  {
    question: "How is RRI different from fast-quote digital brokers?",
    answer:
      "Fast-quote brokers work from a limited pool of secondary markets, which is how they return quotes in minutes. RRI places coverage with the premium A-rated carriers that serious fleet operators want. Those carriers do not quote in minutes. We are built for operators who prioritize correct coverage and carrier quality over turnaround speed.",
  },
];

export default function HomePage() {
  return (
    <>
      <InsuranceAgencySchema />

      {/*
        Hero with dark photo background + overlay + white text + form right.
        Placeholder: dark gradient for now. Swap background div for a
        <Image /> full-bleed truck photo once Adriana supplies the file —
        structure below is photo-ready.
      */}
      <section
        id="hero"
        aria-labelledby="hero-heading"
        className="relative isolate overflow-hidden bg-primary-dark text-white"
      >
        {/* Placeholder background — replace with photo */}
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-[radial-gradient(ellipse_at_70%_30%,_rgba(34,82,150,0.45),_rgba(15,30,61,1)_65%)]"
        />
        {/* Left-side dark overlay to guarantee text contrast when photo lands */}
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-r from-primary-dark/90 via-primary-dark/60 to-primary-dark/20"
        />

        <div className="relative z-10 mx-auto grid max-w-7xl grid-cols-1 items-center gap-10 px-6 py-20 lg:grid-cols-12 lg:gap-12 lg:px-8 lg:py-28">
          <div className="flex flex-col gap-8 lg:col-span-7">
            <h1
              id="hero-heading"
              className="text-[40px] font-bold leading-[1.05] tracking-[-0.015em] text-white sm:text-[52px] lg:text-[60px]"
            >
              Trucking Insurance made for fleets that protect what they&apos;ve built.
            </h1>

            <ul className="grid max-w-lg grid-cols-1 gap-x-10 gap-y-3 sm:grid-cols-2">
              {HERO_FEATURES.map((item) => (
                <li
                  key={item}
                  className="border-l-2 border-cyan pl-4 py-1 text-[15px] font-medium leading-[1.35] text-white"
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div id="quote-form" className="relative lg:col-span-5">
            <QuoteForm />
          </div>
        </div>
      </section>

      <CarrierStrip />

      <section
        id="who-we-serve"
        aria-labelledby="who-we-serve-heading"
        className="bg-gray-50"
      >
        <div className="mx-auto flex max-w-5xl flex-col gap-8 px-6 py-20 lg:px-8 lg:py-24">
          <SectionHeading
            eyebrow="Who we work with"
            headline="Built for fleets that have earned their place."
            subhead="RRI works best with commercial trucking operations that are stable, growing, and serious about protection. If you are running 2 to 50 units, have been in business 2 or more years, and are growing steadily, you are who we are built for. You are also who underwriters want to insure. That means better markets, better rates, and a long-term partnership that understands how your operation scales."
          />
          <Link
            href="/who-we-cover/"
            className="group inline-flex items-center gap-1.5 self-start text-[16px] font-semibold text-primary transition-colors hover:text-primary-dark"
          >
            See exactly who we cover
            <ArrowRight
              className="h-4 w-4 transition-transform group-hover:translate-x-0.5"
              strokeWidth={1.75}
            />
          </Link>
        </div>
      </section>

      <section
        id="rri-advantage"
        aria-labelledby="rri-advantage-heading"
        className="bg-background"
      >
        <div className="mx-auto flex max-w-7xl flex-col gap-12 px-6 py-20 lg:px-8 lg:py-24">
          <SectionHeading
            eyebrow="The RRI advantage"
            headline="Three reasons fleet owners choose RRI."
            subhead="Most brokers sell the same coverage. What makes RRI different is how we place it, who we place it with, and what happens when you need us."
          />
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3 lg:gap-8">
            <CoverageCard
              icon={Shield}
              title="Carriers that matter"
              description="Access to premium A-rated markets most brokers cannot place. The carriers that protect serious operations, not just the ones that quote fastest."
              href="/rri-advantage/#carriers"
              linkText="How we place coverage"
            />
            <CoverageCard
              icon={ShieldCheck}
              title="In-house claims expertise"
              description="When something happens, your claim is handled by our in-house licensed adjuster, not a call center. A real person who knows trucking and stays with you until it is resolved."
              href="/rri-advantage/#claims"
              linkText="How claims work"
            />
            <CoverageCard
              icon={Phone}
              title="Agents who answer"
              description="Your account has a named agent. They pick up the phone, remember your fleet, and call you at renewal before you have to call them."
              href="/rri-advantage/#agents"
              linkText="Meet our team"
            />
          </div>
        </div>
      </section>

      <section
        id="coverages"
        aria-labelledby="coverages-heading"
        className="bg-gray-50"
      >
        <div className="mx-auto flex max-w-7xl flex-col gap-12 px-6 py-20 lg:px-8 lg:py-24">
          <SectionHeading
            eyebrow="Every coverage in one place"
            headline="Every coverage a trucking operation needs."
            subhead="We place eleven coverage types for commercial trucking operations. Browse what we offer, or call us to discuss your specific setup."
          />
          <CoverageGrid />
        </div>
      </section>

      <StatsSection />

      <section
        id="process"
        aria-labelledby="process-heading"
        className="bg-background"
      >
        <div className="mx-auto flex max-w-7xl flex-col gap-12 px-6 py-20 lg:px-8 lg:py-24">
          <SectionHeading
            eyebrow="How we work"
            headline="A real quote takes time. Here is how it actually goes."
            subhead="Fast-quote brokers work from a limited pool of secondary markets. For the premium carriers worth placing with, the process takes a bit longer. We are transparent about what that looks like."
          />
          <ProcessSteps steps={PROCESS} />
        </div>
      </section>

      <section
        id="faq"
        aria-labelledby="faq-heading"
        className="bg-gray-50"
      >
        <div className="mx-auto flex max-w-4xl flex-col gap-10 px-6 py-20 lg:px-8 lg:py-24">
          <SectionHeading
            eyebrow="Common questions"
            headline="Straight answers to the questions fleet owners ask."
            align="left"
          />
          <FAQ items={FAQS} />
        </div>
      </section>

      <CTABanner
        headline="Ready to see what your coverage should look like?"
        subhead="Talk to an agent who specializes in trucking. No pressure, no 5-minute sales pitch. Just a real conversation about your operation."
        primaryCTA={{ text: "Start Your Quote", href: "#quote-form" }}
        variant="dark"
      />
    </>
  );
}
