import { CARRIERS_MARKETS, type DisplayCarrier } from "@/lib/constants";

/**
 * "Top A-Rated Markets Access", a centered heading over two rows of carrier
 * logos that scroll continuously in opposite directions (infinite marquee).
 * Logos sit grayscale + muted; the hovered row pauses and the logo under the
 * cursor animates to full brand color. Edges fade out via a mask gradient.
 */
export function MarketsBand() {
  const half = Math.ceil(CARRIERS_MARKETS.length / 2);
  const rowOne = CARRIERS_MARKETS.slice(0, half);
  const rowTwo = CARRIERS_MARKETS.slice(half);

  return (
    <section
      aria-labelledby="markets-heading"
      className="bg-background px-6 py-16 sm:py-20 lg:px-8"
    >
      <div className="mx-auto flex max-w-6xl flex-col gap-10">
        <div className="flex flex-col items-center gap-3 text-center">
          <h2
            id="markets-heading"
            className="type-h2 text-[28px] sm:text-[34px]"
          >
            <span className="rri-gradient-text">Top A-Rated Markets</span>{" "}
            <span className="text-ink">Access</span>
          </h2>
          <p className="type-sub text-[16px] text-slate">
            When we say we&apos;ll give you the best coverage, we mean it.
          </p>
        </div>

        {/* Two marquee rows, faded at the edges */}
        <div
          className="flex flex-col gap-8"
          style={{
            maskImage:
              "linear-gradient(to right, transparent, black 7%, black 93%, transparent)",
            WebkitMaskImage:
              "linear-gradient(to right, transparent, black 7%, black 93%, transparent)",
          }}
        >
          <MarqueeRow carriers={rowOne} />
          <MarqueeRow carriers={rowTwo} reverse duration="52s" />
        </div>
      </div>
    </section>
  );
}

function MarqueeRow({
  carriers,
  reverse = false,
  duration = "46s",
}: {
  carriers: DisplayCarrier[];
  reverse?: boolean;
  duration?: string;
}) {
  // Render the set twice so the -50% translation loops seamlessly. A plain
  // <img> at a fixed height keeps every logo the SAME height with its aspect
  // ratio intact, no fragile per-logo scaling.
  const items = [...carriers, ...carriers];
  return (
    <div className="rri-marquee overflow-hidden">
      <ul
        className={`rri-marquee-track${reverse ? " is-reverse" : ""}`}
        style={{ ["--marquee-duration" as string]: duration }}
      >
        {items.map((carrier, i) => (
          <li
            key={`${carrier.slug}-${i}`}
            aria-hidden={i >= carriers.length}
            className="flex shrink-0 items-center justify-center px-10 sm:px-12"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={carrier.colorLogo ?? carrier.logo}
              alt={i < carriers.length ? carrier.name : ""}
              loading="lazy"
              style={
                carrier.scale
                  ? { transform: `scale(${carrier.scale})` }
                  : undefined
              }
              className="h-10 w-auto max-w-[188px] object-contain opacity-70 grayscale transition-all duration-300 hover:opacity-100 hover:grayscale-0"
            />
          </li>
        ))}
      </ul>
    </div>
  );
}
