import type { Metadata } from "next";
import { Check } from "lucide-react";
import { Hero } from "@/components/blocks/hero";
import { CTABanner } from "@/components/blocks/cta-banner";
import { SectionHeading } from "@/components/blocks/section-heading";
import { FAQ } from "@/components/blocks/faq";
import { BreadcrumbListSchema } from "@/components/schema/breadcrumb-list";
import type { FAQItem } from "@/components/schema/faq-page";

export const metadata: Metadata = {
  title: "Owner-Operator Trucking Insurance",
  description:
    "Commercial truck insurance built for owner-operators. Whether you run under your own authority or lease to a carrier, Road Ready Insurance places primary liability, physical damage, cargo, and non-trucking (bobtail) coverage with A-rated markets.",
  alternates: { canonical: "/owner-operator-trucking-insurance/" },
};

const NEEDS = [
  {
    title: "Primary liability",
    body: "Required to run under your own authority. Covers bodily injury and property damage you cause to others.",
  },
  {
    title: "Physical damage",
    body: "Comprehensive and collision for your truck (and trailer) — protects the asset you depend on to earn.",
  },
  {
    title: "Motor truck cargo",
    body: "Covers the freight you haul against loss or damage. Most shippers and brokers require it.",
  },
  {
    title: "Non-trucking liability (bobtail)",
    body: "For leased owner-operators — covers you when you drive the truck off-dispatch, not under a carrier's coverage.",
  },
  {
    title: "Occupational accident",
    body: "Injury coverage for owner-operators who aren't covered by workers' comp — a common lease requirement.",
  },
  {
    title: "Trailer interchange",
    body: "Covers trailers you pull under an interchange agreement that you don't own.",
  },
];

const WHY = [
  "One licensed agent who knows your operation — not a call center",
  "Coverage that fits whether you run your own authority or lease on",
  "A-rated markets, priced right, not just fast",
  "New authorities welcome — get it right from your first load",
  "Straight answers on what you actually need (and what you don't)",
];

const FAQS: FAQItem[] = [
  {
    question: "What insurance does an owner-operator need?",
    answer:
      "If you run under your own authority, you'll typically need primary liability, and most operations add physical damage and motor truck cargo. If you're leased to a carrier, the carrier usually provides primary liability while you carry non-trucking (bobtail) liability, physical damage on your truck, and often occupational accident. We'll walk you through exactly what applies to your setup.",
  },
  {
    question: "I'm leased to a carrier — do I still need my own policy?",
    answer:
      "Usually, yes. The carrier's policy generally covers you only while you're under dispatch. When you drive off-dispatch (bobtail), you need non-trucking liability. You'll also typically carry physical damage on your own truck and may need occupational accident coverage per your lease.",
  },
  {
    question: "How much does owner-operator truck insurance cost?",
    answer:
      "It depends on your authority status, driving and loss history, radius of operation, what you haul, and the value of your equipment. Rather than a generic number, we shop your specific risk across our A-rated markets and show you real options. Request a quote and a licensed agent will get you accurate pricing.",
  },
  {
    question: "Can you cover a brand-new authority?",
    answer:
      "Yes. New authorities are welcome. Getting your coverage structured correctly from day one keeps you compliant and sets you up to grow without gaps.",
  },
];

export default function OwnerOperatorPage() {
  return (
    <>
      <BreadcrumbListSchema
        items={[
          { name: "Home", href: "/" },
          {
            name: "Owner-Operator Trucking Insurance",
            href: "/owner-operator-trucking-insurance/",
          },
        ]}
      />

      <Hero
        eyebrow="Built for owner-operators"
        headline="Owner-operator"
        headlineMuted="truck insurance done right."
        subhead="Your truck is your business. Whether you run under your own authority or lease to a carrier, we build the coverage around how you actually operate — and back it with one licensed agent who knows your name."
        primaryCTA={{ text: "Get a Quote", href: "/#quote-form" }}
      />

      {/* Answer-first summary (GEO / AI-extractable) */}
      <section aria-labelledby="in-short-heading" className="bg-background">
        <div className="mx-auto max-w-3xl px-6 pt-16 lg:px-8 lg:pt-20">
          <div className="rounded-2xl border border-primary/15 bg-primary-soft/50 p-6 lg:p-8">
            <h2
              id="in-short-heading"
              className="mb-2 text-[13px] font-semibold uppercase tracking-[0.12em] text-primary"
            >
              In short
            </h2>
            <p className="text-[17px] leading-[1.6] text-gray-800 sm:text-[18px]">
              Owner-operators running their own authority typically need{" "}
              <strong>primary liability</strong>, plus{" "}
              <strong>physical damage</strong> and{" "}
              <strong>motor truck cargo</strong>. Owner-operators leased to a
              carrier typically need <strong>non-trucking (bobtail) liability</strong>,
              physical damage on their truck, and often{" "}
              <strong>occupational accident</strong> coverage. Road Ready Insurance
              places all of it with A-rated markets and one dedicated agent.
            </p>
          </div>
        </div>
      </section>

      {/* Coverages owner-operators need */}
      <section aria-labelledby="needs-heading" className="bg-background">
        <div className="mx-auto flex max-w-5xl flex-col gap-10 px-6 py-16 lg:px-8 lg:py-20">
          <SectionHeading
            eyebrow="Coverage that fits"
            headline="The coverages"
            headlineMuted="owner-operators actually need."
          />
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            {NEEDS.map((n) => (
              <div
                key={n.title}
                className="flex flex-col gap-2 rounded-2xl border border-gray-100 bg-white p-6 shadow-sm"
              >
                <h3 className="text-[17px] font-semibold text-foreground">
                  {n.title}
                </h3>
                <p className="text-[15px] leading-[1.6] text-gray-700">{n.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why RRI */}
      <section aria-labelledby="why-heading" className="bg-gray-50">
        <div className="mx-auto flex max-w-3xl flex-col gap-8 px-6 py-16 lg:px-8 lg:py-20">
          <SectionHeading
            eyebrow="Why owner-operators choose us"
            headline="A partner for the long haul,"
            headlineMuted="not just the first quote."
          />
          <ul className="flex flex-col gap-4">
            {WHY.map((item) => (
              <li
                key={item}
                className="flex items-start gap-3 text-[17px] leading-[1.55] text-gray-700 sm:text-[18px]"
              >
                <span className="mt-1 inline-flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-primary-soft">
                  <Check className="h-3.5 w-3.5 text-primary" strokeWidth={2.5} />
                </span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* FAQ */}
      <section aria-labelledby="faq-heading" className="bg-background">
        <div className="mx-auto flex max-w-3xl flex-col gap-8 px-6 py-16 lg:px-8 lg:py-20">
          <SectionHeading
            eyebrow="Questions"
            headline="Owner-operator insurance,"
            headlineMuted="answered."
          />
          <FAQ items={FAQS} />
        </div>
      </section>

      <CTABanner
        headline="Ready to run protected?"
        headlineMuted="Let's build your coverage."
        subhead="Share a few details about your operation. A licensed agent responds within 2 business hours."
        primaryCTA={{ text: "Start Your Quote", href: "/#quote-form" }}
        variant="primary"
      />
    </>
  );
}
