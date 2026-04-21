import type { Metadata } from "next";
import { Check } from "lucide-react";
import { Hero } from "@/components/blocks/hero";
import { CTABanner } from "@/components/blocks/cta-banner";
import { SectionHeading } from "@/components/blocks/section-heading";
import { BreadcrumbListSchema } from "@/components/schema/breadcrumb-list";

export const metadata: Metadata = {
  title: "Who We Cover — Road Ready Insurance",
  description:
    "RRI works best with established fleet owners running 2 to 9 units, 2 or more years in business, growing steadily. Not every fleet is a fit for every broker. Here is exactly who we are built for.",
  alternates: { canonical: "/who-we-cover/" },
};

const SWEET_SPOT = [
  "Fleet owners running 2 to 9 units (we serve up to 50)",
  "Operations in business 2 or more years",
  "Owner-operators or owner/fleet managers making their own decisions",
  "Fleets growing steadily, typically 1 to 2 units per year",
  "Authority-held operations, not leased-on drivers",
  "Operators who value carrier quality and responsive service over quote speed",
];

const BEYOND = [
  "Larger fleets up to 50 units",
  "Specialty operations — hotshot, reefer, dump, tow, heavy haul, cargo",
  "Single-owner operators with multiple trucks",
  "Fleets transitioning from owner-operator to fleet structure",
];

export default function WhoWeCoverPage() {
  return (
    <>
      <BreadcrumbListSchema
        items={[
          { name: "Home", href: "/" },
          { name: "Who We Cover", href: "/who-we-cover/" },
        ]}
      />

      <Hero
        eyebrow="Who we work with"
        headline="We are built for operators who are serious about their business."
        subhead="Not every fleet is a fit for every broker. Here is exactly who RRI is built for, and who we can help most."
      />

      <section
        id="sweet-spot"
        aria-labelledby="sweet-spot-heading"
        className="bg-background"
      >
        <div className="mx-auto flex max-w-3xl flex-col gap-8 px-6 py-20 lg:px-8 lg:py-24">
          <SectionHeading
            eyebrow="Our sweet spot"
            headline="RRI works best with fleets that look like this."
          />
          <ul className="flex flex-col gap-4">
            {SWEET_SPOT.map((item) => (
              <li
                key={item}
                className="flex items-start gap-3 text-[17px] leading-[1.55] text-gray-700 sm:text-[18px]"
              >
                <span className="mt-1 inline-flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-primary-soft">
                  <Check
                    className="h-3.5 w-3.5 text-primary"
                    strokeWidth={2.5}
                  />
                </span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section
        id="beyond"
        aria-labelledby="beyond-heading"
        className="bg-gray-50"
      >
        <div className="mx-auto flex max-w-3xl flex-col gap-8 px-6 py-20 lg:px-8 lg:py-24">
          <SectionHeading
            eyebrow="Beyond our sweet spot"
            headline="We also regularly work with."
          />
          <ul className="flex flex-col gap-4">
            {BEYOND.map((item) => (
              <li
                key={item}
                className="flex items-start gap-3 text-[17px] leading-[1.55] text-gray-700 sm:text-[18px]"
              >
                <span className="mt-1 inline-flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-primary-soft">
                  <Check
                    className="h-3.5 w-3.5 text-primary"
                    strokeWidth={2.5}
                  />
                </span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section
        id="honest-about-fit"
        aria-labelledby="honest-about-fit-heading"
        className="bg-background"
      >
        <div className="mx-auto flex max-w-3xl flex-col gap-6 px-6 py-20 lg:px-8 lg:py-24">
          <SectionHeading
            eyebrow="Honest about fit"
            headline="When we might not be your best fit."
          />
          <div className="flex flex-col gap-5 text-[17px] leading-[1.65] text-gray-700 sm:text-[18px]">
            <p>
              If you are brand new, filing for DOT authority this week, about
              to buy your first truck, we can help, but you may find fast-quote
              brokers a better match for that specific moment. The premium
              markets we access want to see some track record. Come back to RRI
              when you are 2 years in and growing. We will be here.
            </p>
            <p>
              If your primary driver in shopping is getting the cheapest
              possible quote in 5 minutes, we are not built for that either.
              Our process takes longer because the carriers we place with take
              longer. That is a feature, not a bug, but only if it matches
              what you are looking for.
            </p>
          </div>
        </div>
      </section>

      <CTABanner
        headline="Sound like a fit? Let's talk."
        subhead="Share a few details about your operation. An agent responds within 2 business hours."
        primaryCTA={{ text: "Start Your Quote", href: "/#quote-form" }}
        variant="dark"
      />
    </>
  );
}
