import { Hero } from "@/components/blocks/hero";
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

      <section id="who-we-serve" aria-label="Who we serve" />
      <section id="rri-advantage" aria-label="The RRI advantage" />
      <section id="coverages" aria-label="Coverages" />
      <section id="stats" aria-label="Stats" />
      <section id="process" aria-label="How we work" />
      <section id="quote-form" aria-label="Start your quote" />
      <section id="faq" aria-label="Frequently asked questions" />
      <section id="final-cta" aria-label="Final call to action" />
    </>
  );
}
