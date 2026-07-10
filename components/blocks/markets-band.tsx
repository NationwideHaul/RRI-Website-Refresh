import Image from "next/image";
import { CARRIERS_MARKETS } from "@/lib/constants";
import { FluidGradient } from "@/components/blocks/fluid-gradient";

/**
 * "Top A-Rated Markets Access" — rounded (19px) panel with an interactive
 * fluid noise-gradient background in brand blue (see FluidGradient), and
 * every market logo in a uniform all-white treatment laid out in static
 * wrapped rows. White logo PNGs are pre-generated at matched heights in
 * /public/images/carriers/white/.
 */
export function MarketsBand() {
  return (
    <section
      aria-labelledby="markets-heading"
      className="bg-background px-3 py-3 sm:px-4"
    >
      <div className="relative isolate overflow-hidden rounded-[19px]">
        <FluidGradient />

        <div className="relative z-10 mx-auto flex max-w-6xl flex-col gap-10 px-6 py-14 text-white lg:px-10 lg:py-16">
          <div className="flex flex-col items-center gap-2 text-center">
            <h2
              id="markets-heading"
              className="text-[26px] font-semibold leading-[1.2] tracking-[-0.01em] sm:text-[32px]"
            >
              Top A-Rated Markets Access
            </h2>
            <p className="text-[15px] text-white/75 sm:text-[16px]">
              When we say we will get you the best rate, we mean it.
            </p>
          </div>

          <ul className="flex flex-wrap items-center justify-center gap-x-10 gap-y-8 lg:gap-x-14">
            {CARRIERS_MARKETS.map((carrier) => (
              <li key={carrier.slug} className="flex items-center">
                <Image
                  src={carrier.logo}
                  alt={carrier.name}
                  width={200}
                  height={50}
                  className="h-8 w-auto max-w-[150px] object-contain opacity-90 transition-opacity hover:opacity-100 lg:h-9 lg:max-w-[170px]"
                />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
