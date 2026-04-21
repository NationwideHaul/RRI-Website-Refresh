import Image from "next/image";
import { SectionHeading } from "./section-heading";
import { CARRIERS_DISPLAY } from "@/lib/constants";

/**
 * Carrier strip shown on homepage right after the hero.
 * Logos are grayscale by default and colorize on hover per Design
 * doc §06. Add carriers via CARRIERS_DISPLAY in lib/constants.ts.
 */
export function CarrierStrip() {
  return (
    <section
      id="carriers"
      aria-labelledby="carriers-heading"
      className="bg-background"
    >
      <div className="mx-auto flex max-w-7xl flex-col gap-10 px-6 py-16 lg:px-8 lg:py-20">
        <SectionHeading
          eyebrow="120+ carriers, carefully chosen"
          headline="We work with the A-rated carriers that protect serious operations."
          subhead="Access to more than 120 commercial trucking insurance carriers, including premium A-rated markets most small brokers cannot place. When we say we will find you the best quote option, we mean it."
          align="center"
        />

        <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-5 lg:gap-4">
          {CARRIERS_DISPLAY.map((carrier) => (
            <li
              key={carrier.slug}
              className="group flex h-24 items-center justify-center rounded-xl border border-gray-100 bg-white p-4 transition-all hover:border-gray-300 hover:shadow-sm"
            >
              <Image
                src={carrier.logo}
                alt={carrier.name}
                width={160}
                height={56}
                className="max-h-12 w-auto object-contain grayscale opacity-60 transition-all duration-200 group-hover:grayscale-0 group-hover:opacity-100"
              />
            </li>
          ))}
        </ul>

        <p className="text-center text-[13px] text-gray-500">
          Plus 120+ additional commercial trucking markets. Licensed in 48
          states plus DC.
        </p>
      </div>
    </section>
  );
}
