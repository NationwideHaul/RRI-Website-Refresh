import { STATS } from "@/lib/constants";

const ITEMS = [
  STATS.statesLicensed,
  STATS.carriers,
  STATS.claims,
  STATS.sweetSpot,
];

export function StatsSection() {
  return (
    <section
      id="stats"
      aria-labelledby="stats-heading"
      className="bg-primary-dark text-white"
    >
      <div className="mx-auto max-w-7xl px-6 py-20 lg:px-8 lg:py-24">
        <div className="flex max-w-3xl flex-col gap-4">
          <p className="text-[13px] font-semibold uppercase tracking-[0.18em] text-cyan">
            The numbers behind the broker
          </p>
          <h2
            id="stats-heading"
            className="text-[32px] font-semibold leading-[1.15] tracking-[-0.01em] text-white sm:text-[40px]"
          >
            Quick facts that matter when you are deciding who places your coverage.
          </h2>
        </div>

        <dl className="mt-12 grid grid-cols-2 gap-x-8 gap-y-12 lg:grid-cols-4 lg:gap-y-0">
          {ITEMS.map((stat) => (
            <div key={stat.label} className="flex flex-col gap-2">
              <dt className="text-[56px] font-bold leading-none text-cyan sm:text-[64px] lg:text-[72px]">
                {stat.value}
              </dt>
              <dd className="flex flex-col gap-1.5">
                <span className="text-[13px] font-semibold uppercase tracking-[0.15em] text-white">
                  {stat.label}
                </span>
                <span className="text-[14px] leading-[1.5] text-white/80">
                  {stat.detail}
                </span>
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
