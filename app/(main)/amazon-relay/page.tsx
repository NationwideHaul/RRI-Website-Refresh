import type { Metadata } from "next";
import { Check } from "lucide-react";
import { Hero } from "@/components/blocks/hero";
import { CTABanner } from "@/components/blocks/cta-banner";
import { SectionHeading } from "@/components/blocks/section-heading";
import { FAQ } from "@/components/blocks/faq";
import { BreadcrumbListSchema } from "@/components/schema/breadcrumb-list";
import type { FAQItem } from "@/components/schema/faq-page";

export const metadata: Metadata = {
  title: "Amazon Relay Insurance Requirements",
  description:
    "Meet Amazon Relay's insurance requirements to haul freight. Road Ready Insurance places the auto liability, motor truck cargo, and general liability coverage carriers need to onboard and stay compliant — fast.",
  alternates: { canonical: "/amazon-relay/" },
};

const REQUIREMENTS = [
  {
    title: "Auto liability",
    body: "Commonly $1,000,000 combined single limit. Covers bodily injury and property damage from your covered vehicles.",
  },
  {
    title: "Motor truck cargo",
    body: "Commonly $100,000, typically with limited exclusions. Covers the freight you haul for Amazon against loss or damage.",
  },
  {
    title: "General liability",
    body: "Often required (e.g. $1,000,000 per occurrence) for non-trucking, premises, and operations exposure.",
  },
  {
    title: "Workers' compensation",
    body: "As required by your state for your drivers and employees.",
  },
];

const HOW = [
  "We confirm the exact limits Amazon Relay is asking you for",
  "We place each required coverage with A-rated markets",
  "We issue certificates of insurance formatted for Amazon onboarding",
  "We keep you compliant as your fleet and loads grow",
  "One licensed agent handles it all — no call center runaround",
];

const FAQS: FAQItem[] = [
  {
    question: "What insurance does Amazon Relay require?",
    answer:
      "Amazon Relay generally requires carriers to carry auto liability (commonly $1,000,000), motor truck cargo (commonly $100,000), and often general liability, plus workers' compensation as required by your state. Amazon sets and updates the exact limits and endorsements, so we confirm your current onboarding requirements and place coverage to match.",
  },
  {
    question: "How fast can I get a certificate of insurance for Amazon?",
    answer:
      "Once your coverage is bound, we issue a certificate of insurance (COI) formatted for Amazon Relay's requirements, usually same or next business day. If you're already insured with us, request a COI and we'll turn it around quickly.",
  },
  {
    question: "Do the requirements change?",
    answer:
      "Yes — Amazon can update its insurance requirements, and they can vary by program (e.g. box truck vs. tractor-trailer). Always confirm the current limits in your Amazon Relay onboarding portal. We'll match your policy to exactly what they're asking for.",
  },
  {
    question: "Can you cover a new authority hauling for Amazon Relay?",
    answer:
      "Yes. New authorities are welcome. We'll structure your coverage to meet Amazon's requirements from your first load and keep it right as you grow.",
  },
];

export default function AmazonRelayPage() {
  return (
    <>
      <BreadcrumbListSchema
        items={[
          { name: "Home", href: "/" },
          { name: "Amazon Relay Insurance", href: "/amazon-relay/" },
        ]}
      />

      <Hero
        eyebrow="Amazon Relay carriers"
        headline="Amazon Relay insurance,"
        headlineMuted="handled fast."
        subhead="Hauling for Amazon Relay means meeting their insurance requirements exactly — and quickly. We place the coverage you need to onboard and stay compliant, and get your certificates out the door fast."
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
              To haul for Amazon Relay, carriers generally need{" "}
              <strong>auto liability (commonly $1,000,000)</strong>,{" "}
              <strong>motor truck cargo (commonly $100,000)</strong>, often{" "}
              <strong>general liability</strong>, and{" "}
              <strong>workers&apos; compensation</strong> as required by state. Amazon
              sets the exact limits, so confirm your current onboarding
              requirements — then we place coverage to match and issue the
              certificates Amazon needs.
            </p>
          </div>
        </div>
      </section>

      {/* Requirements */}
      <section aria-labelledby="requirements-heading" className="bg-background">
        <div className="mx-auto flex max-w-5xl flex-col gap-10 px-6 py-16 lg:px-8 lg:py-20">
          <SectionHeading
            eyebrow="What Amazon asks for"
            headline="The coverage"
            headlineMuted="Amazon Relay requires."
          />
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            {REQUIREMENTS.map((r) => (
              <div
                key={r.title}
                className="flex flex-col gap-2 rounded-2xl border border-gray-100 bg-white p-6 shadow-sm"
              >
                <h3 className="text-[17px] font-semibold text-foreground">
                  {r.title}
                </h3>
                <p className="text-[15px] leading-[1.6] text-gray-700">{r.body}</p>
              </div>
            ))}
          </div>
          <p className="text-[14px] leading-[1.6] text-gray-500">
            Requirements and limits are set by Amazon and can change or vary by
            program. Always confirm the current requirements in your Amazon Relay
            onboarding portal — we&apos;ll match your policy to exactly what they ask for.
          </p>
        </div>
      </section>

      {/* How we help */}
      <section aria-labelledby="how-heading" className="bg-gray-50">
        <div className="mx-auto flex max-w-3xl flex-col gap-8 px-6 py-16 lg:px-8 lg:py-20">
          <SectionHeading
            eyebrow="How we help"
            headline="From requirements"
            headlineMuted="to on the road."
          />
          <ul className="flex flex-col gap-4">
            {HOW.map((item) => (
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
            headline="Amazon Relay insurance,"
            headlineMuted="answered."
          />
          <FAQ items={FAQS} />
        </div>
      </section>

      <CTABanner
        headline="Hauling for Amazon Relay?"
        headlineMuted="Let's get you compliant."
        subhead="Share a few details and a licensed agent responds within 2 business hours with coverage that meets Amazon's requirements."
        primaryCTA={{ text: "Start Your Quote", href: "/#quote-form" }}
        variant="primary"
      />
    </>
  );
}
