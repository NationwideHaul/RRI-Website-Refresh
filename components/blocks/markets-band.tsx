import Image from "next/image";
import { CARRIERS_MARKETS } from "@/lib/constants";

/**
 * "Top A-Rated Markets Access" — symmetric split panel on white: a photo on
 * the left and the heading + a grid of uniform market logos on the right,
 * each taking half the width and stretching to the same height. The white
 * logo PNGs in /public/images/carriers/white/ are recolored to a uniform
 * gray via a CSS filter so they read on the light background.
 */
export function MarketsBand() {
  return (
    <section
      aria-labelledby="markets-heading"
      className="bg-background px-6 py-16 sm:py-20 lg:px-8"
    >
      <div className="mx-auto grid max-w-6xl grid-cols-1 items-stretch gap-8 lg:grid-cols-2 lg:gap-12">
        {/* Left: photo — fills its half and matches the right column height */}
        <div className="relative min-h-[380px] overflow-hidden rounded-[24px] lg:min-h-full">
          <Image
            src="/images/home-hero.jpg"
            alt="Fleet owner checking his phone in front of his trucks"
            fill
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="object-cover object-[68%_center]"
          />
        </div>

        {/* Right: heading + gray logo grid, vertically centered */}
        <div className="flex flex-col justify-center gap-10">
          <div className="flex flex-col items-center gap-1 text-center">
            <h2
              id="markets-heading"
              className="text-[28px] leading-[1.15] tracking-[-0.01em] text-gray-900 sm:text-[34px]"
            >
              <span className="font-semibold">Top</span>{" "}
              <span className="font-bold">A-Rated Markets Access</span>
            </h2>
            <p className="text-[15px] text-gray-500 sm:text-[16px]">
              When we say we will give you the best rate, we mean it.
            </p>
          </div>

          {/* 13 logos in 3 cols → the lone last item is centered (col 2) */}
          <ul className="grid grid-cols-3 items-center gap-x-6 gap-y-9 [&>li:last-child]:col-start-2">
            {CARRIERS_MARKETS.map((carrier) => (
              <li key={carrier.slug} className="flex items-center justify-center">
                <Image
                  src={carrier.logo}
                  alt={carrier.name}
                  width={160}
                  height={40}
                  className="max-h-8 w-auto max-w-full object-contain opacity-90 transition-all [filter:brightness(0)_invert(0.5)] hover:opacity-100 hover:[filter:brightness(0)_invert(0.28)]"
                />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
