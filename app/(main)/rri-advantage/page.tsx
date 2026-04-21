import type { Metadata } from "next";
import { Hero } from "@/components/blocks/hero";
import { CTABanner } from "@/components/blocks/cta-banner";
import { BreadcrumbListSchema } from "@/components/schema/breadcrumb-list";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "The RRI Advantage — Why fleet owners choose Road Ready Insurance",
  description:
    "Most brokers sell the same thing. The difference is how we place it, who we place it with, and what happens when you need us. Licensed in 48 states, 120+ carriers, in-house claims.",
  alternates: { canonical: "/rri-advantage/" },
};

type AdvantageSection = {
  id: string;
  eyebrow: string;
  headline: string;
  paragraphs: string[];
};

const SECTIONS: AdvantageSection[] = [
  {
    id: "carriers",
    eyebrow: "Carriers that matter",
    headline: "The carriers that protect serious operations.",
    paragraphs: [
      "Every broker claims to work with many carriers. What matters is which carriers. A 5-minute quote is almost always coming from the same handful of secondary markets every broker can access. The premium A-rated carriers, the ones that protect against nuclear verdicts and catastrophic claims, do not quote in 5 minutes, and most small brokers cannot access them at all.",
      "Road Ready Insurance has active appointments with more than 120 commercial trucking insurance carriers, including premium A-rated markets most small brokers cannot place. When we build your submission, we match you with the carriers that fit your operation, not just the ones that respond fastest.",
    ],
  },
  {
    id: "claims",
    eyebrow: "In-house licensed claims",
    headline: "When something happens, someone who knows trucking answers.",
    paragraphs: [
      "The single most common complaint from clients who come to RRI from another agency: their previous agent stopped responding, especially when there was a claim. That is not how this works at RRI. We have an in-house licensed claims adjuster on staff. When you call about a claim, you reach a real person who understands trucking, not a call center script, not a third-party administrator routing you through tiered support.",
      "Your named agent stays involved throughout the claim process. They know your operation. They know what questions to ask. And they stay with you until it is resolved.",
    ],
  },
  {
    id: "agents",
    eyebrow: "Agents who answer",
    headline: "You get a named agent. Not a ticket number.",
    paragraphs: [
      "Every RRI client is assigned a named agent. That agent knows your fleet, your operation, your history. They pick up when you call. They remember you at renewal and reach out before you have to chase them. They tell you the truth about the market, when rates are going up, why, and what to do about it.",
      "This is not a service promise. It is how the agency is operationally built. No call center, no account routing, no handoffs.",
    ],
  },
  {
    id: "growth",
    eyebrow: "Built for growth",
    headline: "We work best with fleets that are built to last.",
    paragraphs: [
      "RRI's sweet-spot client runs 2 to 9 units, has been in business 2 or more years, and is growing 1 to 2 units per year. This is not an arbitrary profile. It is the profile underwriters reward, operations that show discipline, stability, and sustainable growth. When we bring your submission to premium carriers, that profile opens doors that are closed to brand-new authorities.",
      "As your fleet grows, your coverage evolves with you. We are built for the long-term partnership, not the one-year transaction.",
    ],
  },
  {
    id: "portal",
    eyebrow: "The client portal",
    headline: "Self-service when you want it. An agent when you need it.",
    paragraphs: [
      "The RRI client portal gives you direct access to your certificates of insurance, policy documents, and account details, any time, without calling anyone. Need a specific COI for a customer? Request it online and your agent handles it same-day. Payment due? Pay it from the portal.",
      "But when you need to actually talk through something, a new unit, a claim question, a renewal concern, your agent is still there. Self-service is a convenience, not a replacement for the human side of insurance.",
    ],
  },
];

export default function RRIAdvantagePage() {
  return (
    <>
      <BreadcrumbListSchema
        items={[
          { name: "Home", href: "/" },
          { name: "The RRI Advantage", href: "/rri-advantage/" },
        ]}
      />

      <Hero
        eyebrow="The RRI advantage"
        headline="Why fleet owners who have shopped before end up at RRI."
        subhead="Most brokers sell the same thing. The difference is how we place it, who we place it with, and what happens when you need us."
      />

      {SECTIONS.map((section, index) => (
        <section
          key={section.id}
          id={section.id}
          aria-labelledby={`${section.id}-heading`}
          className={cn(index % 2 === 0 ? "bg-background" : "bg-gray-50")}
        >
          <div className="mx-auto flex max-w-3xl flex-col gap-6 px-6 py-20 lg:px-8 lg:py-24">
            <p className="text-[13px] font-semibold uppercase tracking-[0.18em] text-primary">
              {section.eyebrow}
            </p>
            <h2
              id={`${section.id}-heading`}
              className="text-[32px] font-semibold leading-[1.15] tracking-[-0.01em] text-foreground sm:text-[40px]"
            >
              {section.headline}
            </h2>
            <div className="flex flex-col gap-4">
              {section.paragraphs.map((paragraph, pIdx) => (
                <p
                  key={pIdx}
                  className="text-[17px] leading-[1.65] text-gray-700 sm:text-[18px]"
                >
                  {paragraph}
                </p>
              ))}
            </div>
          </div>
        </section>
      ))}

      <CTABanner
        headline="Ready to see what this looks like for your fleet?"
        subhead="Talk to an agent who specializes in trucking. No pressure, no 5-minute sales pitch. Just a real conversation about your operation."
        primaryCTA={{ text: "Start Your Quote", href: "/#quote-form" }}
        variant="dark"
      />
    </>
  );
}
