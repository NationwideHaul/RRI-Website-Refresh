import { ShieldCheck } from "lucide-react";
import { SectionHeading } from "./section-heading";

/**
 * Carrier strip shown on homepage right after the hero.
 * Current state: no specific carrier names or logos until Derek confirms
 * active appointments in writing + we receive usable logo files. Strategy
 * doc §3.3 and §6.5 block naming carriers publicly until then.
 *
 * When greenlit, replace the placeholder pill grid with a real logo strip
 * using /public/images/carriers/*.svg and add a `CARRIERS_DISPLAY` list
 * to lib/constants.ts.
 */
const PLACEHOLDER_TILES = Array.from({ length: 8 });

export function CarrierStrip() {
  return (
    <section
      id="carriers"
      aria-labelledby="carriers-heading"
      className="bg-background"
    >
      <div className="mx-auto flex max-w-7xl flex-col gap-10 px-6 py-16 lg:px-8 lg:py-20">
        <SectionHeading
          eyebrow="100+ carriers, carefully chosen"
          headline="We work with the A-rated carriers that protect serious operations."
          subhead="Access to more than 100 commercial trucking insurance carriers, including premium A-rated markets most small brokers cannot place. When we say we will find you the best quote option, we mean it."
          align="center"
        />

        <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:gap-4">
          {PLACEHOLDER_TILES.map((_, i) => (
            <li
              key={i}
              className="flex h-20 items-center justify-center gap-2 rounded-xl border border-gray-100 bg-gray-50 text-[13px] font-semibold uppercase tracking-[0.15em] text-gray-500"
            >
              <ShieldCheck className="h-4 w-4 text-primary" strokeWidth={1.75} />
              A-Rated Carrier
            </li>
          ))}
        </ul>

        <p className="text-center text-[13px] text-gray-500">
          Carrier names and logos pending confirmation. Licensed in 48 states
          plus DC.
        </p>
      </div>
    </section>
  );
}
