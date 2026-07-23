import type { Metadata } from "next";
import { Check } from "lucide-react";
import { Hero } from "@/components/blocks/hero";
import { CTABanner } from "@/components/blocks/cta-banner";
import { SectionHeading } from "@/components/blocks/section-heading";
import { BreadcrumbListSchema } from "@/components/schema/breadcrumb-list";

export const metadata: Metadata = {
  title: "Who We Cover",
  description:
    "Road Ready Insurance works with trucking operations of every size and stage, from brand-new authorities to large, established fleets. Whoever you are and wherever you are in your growth, we build coverage around your operation.",
  alternates: { canonical: "/who-we-cover/" },
};

const WHO_WE_COVER = [
  "Brand-new authorities getting their first trucks on the road",
  "Owner-operators and owner/fleet managers making their own decisions",
  "Small and mid-size fleets scaling unit by unit",
  "Large, established fleets running hundreds of trucks",
  "Fleets transitioning from owner-operator to a full fleet structure",
  "Operators who value carrier quality and responsive service",
];

const SPECIALTY = [
  "Tractor trailer and straight truck operations",
  "Hotshot and pickup truck operations",
  "Dump, tow, and heavy haul",
  "Reefer, dry van, and cargo",
  "Hazmat and tanker operations",
  "Last-mile and intermodal (UIIA) operations",
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
        headline="We work with trucking operations"
        headlineMuted="of every size and stage."
        subhead="From brand-new authorities getting their first trucks on the road to large, established fleets, Road Ready Insurance builds coverage around your operation, wherever you are in your growth."
        image={{ src: "/images/photos/who-we-cover.webp", alt: "A fleet operator Road Ready Insurance works with" }}
      />

      <section
        id="who-we-cover"
        aria-labelledby="who-we-cover-heading"
        className="bg-background"
      >
        <div className="mx-auto flex max-w-3xl flex-col gap-8 px-6 py-20 lg:px-8 lg:py-24">
          <SectionHeading
            eyebrow="Who we cover"
            headline="Whoever you are,"
            headlineMuted="we build coverage around your operation."
          />
          <ul className="flex flex-col gap-4">
            {WHO_WE_COVER.map((item) => (
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
        id="specialty"
        aria-labelledby="specialty-heading"
        className="bg-gray-50"
      >
        <div className="mx-auto flex max-w-3xl flex-col gap-8 px-6 py-20 lg:px-8 lg:py-24">
          <SectionHeading
            eyebrow="Operations we cover"
            headline="Whatever you haul,"
            headlineMuted="whatever you run."
          />
          <ul className="flex flex-col gap-4">
            {SPECIALTY.map((item) => (
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
        id="new-authorities"
        aria-labelledby="new-authorities-heading"
        className="bg-background"
      >
        <div className="mx-auto flex max-w-3xl flex-col gap-6 px-6 py-20 lg:px-8 lg:py-24">
          <SectionHeading
            eyebrow="New authorities welcome"
            headline="Just getting started?"
            headlineMuted="We are here for that too."
          />
          <div className="flex flex-col gap-5 text-[17px] leading-[1.65] text-gray-700 sm:text-[18px]">
            <p>
              If you are filing for your DOT authority this week or about to
              put your first truck on the road, we can help. New authorities are
              welcome here, and getting your coverage right from day one sets you
              up to grow.
            </p>
            <p>
              And as your operation grows, from your first unit to a large,
              established fleet, your coverage grows with you. We are built for
              the long-term partnership: the same team, the same named agent,
              at every stage of your business.
            </p>
          </div>
        </div>
      </section>

      <CTABanner
        headline="Sound like a fit?"
        headlineMuted="Let's talk."
        subhead="Share a few details about your operation. An agent responds within 2 business hours."
        primaryCTA={{ text: "Start Your Quote", href: "/#quote-form" }}
        variant="primary"
      />
    </>
  );
}
