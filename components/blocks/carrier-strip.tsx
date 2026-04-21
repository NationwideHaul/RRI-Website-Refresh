import Image from "next/image";
import { SectionHeading } from "./section-heading";
import { CARRIERS_DISPLAY } from "@/lib/constants";

/**
 * Carrier strip shown on homepage right after the hero.
 * Pill-shaped white cards, color logos (not grayscale) per Adriana's
 * reference. Add carriers via CARRIERS_DISPLAY in lib/constants.ts.
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

        <ul className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-5">
          {CARRIERS_DISPLAY.map((carrier) => (
            <li
              key={carrier.slug}
              className="flex h-20 items-center justify-center rounded-full border border-gray-100 bg-white px-6 shadow-sm transition-shadow hover:shadow-md"
            >
              <Image
                src={carrier.logo}
                alt={carrier.name}
                width={180}
                height={48}
                className="max-h-10 w-auto object-contain"
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
