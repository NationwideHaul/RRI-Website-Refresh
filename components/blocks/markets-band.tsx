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

        <div className="relative z-10 mx-auto flex max-w-6xl flex-col gap-12 px-6 py-20 text-white lg:gap-16 lg:px-10 lg:py-28">
          <div className="flex flex-col items-center gap-1 text-center">
            <h2
              id="markets-heading"
              className="text-[32px] font-bold leading-[1.15] tracking-[-0.01em] sm:text-[40px]"
            >
              Top{" "}
              <span className="bg-[linear-gradient(transparent_62%,#00fffc_62%)]">
                A-Rated Markets
              </span>{" "}
              Access
            </h2>
            <p className="text-[15px] text-white/75 sm:text-[16px]">
              When we say we will get you the best rate, we mean it.
            </p>
          </div>

          {/* Uniform cells (exactly 5 per row on desktop, partial rows
              centered) so every logo sits aligned with equal visual weight */}
          <ul className="flex flex-wrap items-center justify-center gap-y-10 lg:gap-y-14">
            {CARRIERS_MARKETS.map((carrier) => (
              <li
                key={carrier.slug}
                className="flex h-12 w-1/2 items-center justify-center px-4 sm:w-1/3 lg:h-14 lg:w-1/5 lg:px-6"
              >
                <Image
                  src={carrier.logo}
                  alt={carrier.name}
                  width={200}
                  height={50}
                  className="max-h-10 w-auto max-w-full object-contain opacity-90 transition-opacity hover:opacity-100 lg:max-h-12"
                />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
