import type { Metadata } from "next";
import { Hero } from "@/components/blocks/hero";
import { CoverageGrid } from "@/components/blocks/coverage-grid";
import { CTABanner } from "@/components/blocks/cta-banner";
import { BreadcrumbListSchema } from "@/components/schema/breadcrumb-list";

export const metadata: Metadata = {
  title: "Coverage Options — Commercial Trucking Insurance",
  description:
    "Every commercial trucking coverage Road Ready Insurance places — from liability and physical damage to cargo, trailer interchange, and more.",
  alternates: { canonical: "/coverage/" },
};

export default function CoveragePage() {
  return (
    <>
      <BreadcrumbListSchema
        items={[
          { name: "Home", href: "/" },
          { name: "Coverage", href: "/coverage/" },
        ]}
      />

      <Hero
        eyebrow="Coverage"
        headline="Every coverage"
        headlineMuted="your operation needs."
        subhead="One agency for the whole policy — from the foundational coverages every authority carries to the specialized protection serious fleets depend on."
      />

      <section aria-label="All coverage options" className="bg-gray-50">
        <div className="mx-auto max-w-7xl px-6 py-20 lg:px-8 lg:py-24">
          <CoverageGrid />
        </div>
      </section>

      <CTABanner
        headline="Not sure which coverages"
        headlineMuted="your operation needs?"
        subhead="Talk to an agent who specializes in trucking. We will review your operation and build a policy with no gaps and no padding."
        primaryCTA={{ text: "Talk to an agent", href: "/contact-us/" }}
        variant="dark"
      />
    </>
  );
}
