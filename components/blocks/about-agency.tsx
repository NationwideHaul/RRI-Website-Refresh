"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Reveal } from "@/components/blocks/reveal";
import { FluidGradient } from "@/components/blocks/fluid-gradient";
import { WordReveal } from "@/components/blocks/word-reveal";

const STATS: { value: number; prefix?: string; suffix: string; label: string }[] = [
  { value: 12, prefix: "$", suffix: "M+", label: "Premium written" },
  { value: 100, suffix: "+", label: "Carriers compared" },
  { value: 1, suffix: "K+", label: "Fleets switched" },
];

/**
 * "About Our Agency", dark blue panel: copy + count-up stats on the left,
 * the Road Ready Insurance team photo on the right. Count-ups respect prefers-reduced-motion.
 */
export function AboutAgency() {
  return (
    <section aria-labelledby="about-heading" className="bg-gray-50">
      <div className="relative z-10 mx-auto max-w-7xl px-6 pb-8 pt-20 lg:px-8 lg:pb-8 lg:pt-24">
        <Reveal>
          <div className="relative isolate overflow-hidden rounded-3xl bg-primary text-white">
            {/* Animated fluid gradient, same as the hero backdrop */}
            <FluidGradient />
            {/* Dotted texture + soft cyan glow */}
            <div
              aria-hidden="true"
              className="absolute inset-0 opacity-[0.14]"
              style={{
                backgroundImage:
                  "radial-gradient(rgba(255,255,255,0.5) 1px, transparent 1px)",
                backgroundSize: "22px 22px",
              }}
            />
            <div
              aria-hidden="true"
              className="absolute -right-32 -top-32 h-96 w-96 rounded-full bg-cyan/20 blur-3xl"
            />
            {/* Lift the fluid gradient's naturally dark bottom edge so it does
                not read as a shadow band inside this compact panel. Full-height
                so it fades smoothly to nothing by the middle — no hard seam —
                and tinted with the panel's own mid-blue so it evens the tone
                instead of darkening it. */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#2f6ac0]/55 via-transparent to-transparent"
            />

            <div className="relative grid grid-cols-1 gap-12 p-8 sm:p-12 lg:grid-cols-2 lg:gap-8 lg:p-16">
              {/* Copy + stats */}
              <div className="flex flex-col gap-7">
                <h2
                  id="about-heading"
                  className="type-h2 text-[34px] text-white sm:text-[44px]"
                >
                  <WordReveal
                    segments={[
                      { text: "Better coverage and a better rate," },
                      {
                        text: "from people who get trucking.",
                        className: "text-white/55",
                      },
                    ]}
                  />
                </h2>
                <p className="max-w-xl text-[17px] leading-[1.65] text-white/80">
                  Because we work exclusively with fleets, we know how to spot
                  the gaps a general policy tends to miss and price it right.
                </p>

                <dl className="mt-2 grid grid-cols-3 gap-6">
                  {STATS.map((stat) => (
                    <div key={stat.label} className="flex flex-col gap-1">
                      <dt className="order-2 text-[13px] leading-snug text-white/70 sm:text-[14px]">
                        {stat.label}
                      </dt>
                      <dd className="order-1 text-[30px] font-bold tracking-[-0.01em] text-cyan sm:text-[40px]">
                        <CountUp
                          target={stat.value}
                          prefix={stat.prefix}
                          suffix={stat.suffix}
                        />
                      </dd>
                    </div>
                  ))}
                </dl>

                <Link
                  href="/contact-us/"
                  className="btn btn-cyan mt-2"
                >
                  Talk to an agent
                  <ArrowRight className="h-4 w-4" strokeWidth={2} />
                </Link>
              </div>

              {/* Road Ready Insurance team photo */}
              <div className="relative min-h-[320px] overflow-hidden rounded-2xl lg:min-h-full">
                <Image
                  src="/images/rri-team.jpg"
                  alt="The Road Ready Insurance team reviewing a policy together"
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/** Count-up that starts when scrolled into view; instant when reduced motion. */
function CountUp({
  target,
  prefix = "",
  suffix = "",
}: {
  target: number;
  prefix?: string;
  suffix?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const [value, setValue] = useState(0);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setValue(target);
      return;
    }

    let raf = 0;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        observer.disconnect();
        const duration = 1600;
        const start = performance.now();
        const tick = (now: number) => {
          const t = Math.min(1, (now - start) / duration);
          const eased = 1 - Math.pow(1 - t, 3);
          setValue(Math.round(eased * target));
          if (t < 1) raf = requestAnimationFrame(tick);
        };
        raf = requestAnimationFrame(tick);
      },
      { threshold: 0.5 },
    );
    observer.observe(node);
    return () => {
      observer.disconnect();
      cancelAnimationFrame(raf);
    };
  }, [target]);

  return (
    <span ref={ref}>
      {prefix}
      {value}
      {suffix}
    </span>
  );
}
