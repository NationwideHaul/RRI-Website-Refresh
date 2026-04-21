import Link from "next/link";
import { ArrowRight, Phone, Shield, ShieldCheck } from "lucide-react";
import { Hero } from "@/components/blocks/hero";
import { SectionHeading } from "@/components/blocks/section-heading";
import { CoverageCard } from "@/components/blocks/coverage-card";
import { CoverageGrid } from "@/components/blocks/coverage-grid";
import { InsuranceAgencySchema } from "@/components/schema/insurance-agency";

export default function HomePage() {
  return (
    <>
      <InsuranceAgencySchema />

      <Hero
        eyebrow="Commercial trucking insurance · Licensed in 48 states"
        headline="Commercial trucking insurance, placed with the carriers that matter."
        subhead="Road Ready Insurance specializes in commercial trucking coverage for established fleet owners. We place policies with A-rated carriers most brokers cannot access, with in-house licensed claims, responsive agents, and coverage that is correct the first time."
        primaryCTA={{ text: "Start Your Quote", href: "#quote-form" }}
        secondaryCTA={{ text: "See What Sets Us Apart", href: "/rri-advantage/" }}
        trustLine="Trusted by fleets from Florida to Oregon · Licensed in 48 states plus DC"
      />

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
            className="inline-flex items-center gap-1.5 self-start text-[16px] font-semibold text-primary transition-colors hover:text-primary-dark"
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

      <section id="stats" aria-label="Stats" />
      <section id="process" aria-label="How we work" />
      <section id="quote-form" aria-label="Start your quote" />
      <section id="faq" aria-label="Frequently asked questions" />
      <section id="final-cta" aria-label="Final call to action" />
    </>
  );
}
