"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ArrowRight, BadgeCheck, Headset, ShieldCheck } from "lucide-react";
import { Reveal } from "@/components/blocks/reveal";

const STATS: { value: number; prefix?: string; suffix: string; label: string }[] = [
  { value: 12, prefix: "$", suffix: "M+", label: "Policies written" },
  { value: 48, suffix: "", label: "States licensed in US" },
  { value: 20, suffix: "K+", label: "Fleets helped" },
];

/**
 * "About Our Agency" — creative dark panel: animated count-up stats, an
 * animated highway with a driving semi, pulsing shield rings, and floating
 * proof cards. All motion is CSS-driven (globals.css) or rAF count-ups
 * that respect prefers-reduced-motion.
 */
export function AboutAgency() {
  return (
    <section aria-labelledby="about-heading" className="bg-background">
      <div className="mx-auto max-w-7xl px-6 py-20 lg:px-8 lg:py-24">
        <Reveal>
          <div className="relative isolate overflow-hidden rounded-3xl bg-primary text-white">
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

            <div className="relative grid grid-cols-1 gap-12 p-8 sm:p-12 lg:grid-cols-2 lg:gap-8 lg:p-16">
              {/* Copy + stats */}
              <div className="flex flex-col gap-7">
                <span className="inline-flex w-fit items-center rounded-full border border-white/25 bg-white/10 px-4 py-1.5 text-[13px] font-semibold uppercase tracking-[0.14em] text-white">
                  About Our Agency
                </span>
                <h2
                  id="about-heading"
                  className="text-[34px] font-semibold leading-[1.12] tracking-[-0.01em] sm:text-[44px]"
                >
                  The trucking insurance team that has your back.
                </h2>
                <p className="max-w-xl text-[17px] leading-[1.65] text-white/80">
                  Commercial trucking insurance specialists with access to the
                  top markets in the industry, and agents who work exclusively
                  with fleet operators. When you call, a person who knows your
                  fleet picks up.
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
                  href="/rri-advantage/"
                  className="mt-2 inline-flex h-[52px] w-fit items-center gap-2 rounded-lg bg-cyan px-7 text-[16px] font-semibold text-primary-dark transition-colors hover:bg-white"
                >
                  Learn More
                  <ArrowRight className="h-4 w-4" strokeWidth={2} />
                </Link>
              </div>

              {/* Animated visual: highway + semi + floating proof cards */}
              <div className="relative min-h-[320px]" aria-hidden="true">
                <HighwayScene />

                <div className="rri-float absolute left-0 top-6 flex items-center gap-3 rounded-xl bg-white/95 px-4 py-3 text-primary-dark shadow-xl backdrop-blur">
                  <ShieldCheck className="h-5 w-5 text-primary" strokeWidth={1.75} />
                  <span className="text-[14px] font-semibold">
                    120+ A-rated markets
                  </span>
                </div>
                <div className="rri-float rri-float-delay-1 absolute right-0 top-[38%] flex items-center gap-3 rounded-xl bg-white/95 px-4 py-3 text-primary-dark shadow-xl backdrop-blur">
                  <Headset className="h-5 w-5 text-primary" strokeWidth={1.75} />
                  <span className="text-[14px] font-semibold">
                    In-house claims team
                  </span>
                </div>
                <div className="rri-float rri-float-delay-2 absolute bottom-6 left-[12%] flex items-center gap-3 rounded-xl bg-white/95 px-4 py-3 text-primary-dark shadow-xl backdrop-blur">
                  <BadgeCheck className="h-5 w-5 text-primary" strokeWidth={1.75} />
                  <span className="text-[14px] font-semibold">
                    Licensed in 48 states + DC
                  </span>
                </div>
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

/** Minimal line-art highway with scrolling lane markers and a semi truck. */
function HighwayScene() {
  return (
    <svg
      viewBox="0 0 480 340"
      className="absolute inset-0 h-full w-full"
      fill="none"
    >
      {/* Road curve */}
      <path
        d="M-20 300 C 120 300, 200 160, 480 170"
        stroke="rgba(255,255,255,0.25)"
        strokeWidth="34"
        strokeLinecap="round"
      />
      {/* Scrolling center lane markers */}
      <path
        className="rri-lane-markers"
        d="M-20 300 C 120 300, 200 160, 480 170"
        stroke="#00fffc"
        strokeWidth="3"
        strokeDasharray="18 30"
        strokeLinecap="round"
        opacity="0.85"
      />
      {/* Pulsing shield rings behind the truck */}
      <g transform="translate(330 130)">
        <circle className="rri-shield-ring rri-shield-ring-delay-1" r="52" stroke="#00fffc" strokeWidth="1.5" />
        <circle className="rri-shield-ring rri-shield-ring-delay-2" r="52" stroke="#00fffc" strokeWidth="1.5" />
        <circle className="rri-shield-ring rri-shield-ring-delay-3" r="52" stroke="#00fffc" strokeWidth="1.5" />
      </g>
      {/* Semi truck */}
      <g transform="translate(255 92)">
        <rect x="0" y="18" width="88" height="42" rx="6" fill="white" opacity="0.95" />
        <path
          d="M88 30h24c3 0 5.8 1.4 7.6 3.8l10.8 14.4c1 1.4 1.6 3.1 1.6 4.8v5a5 5 0 0 1-5 5H88z"
          fill="white"
          opacity="0.95"
        />
        <rect x="96" y="35" width="16" height="12" rx="2" fill="#0f1e3d" />
        <circle cx="22" cy="66" r="10" fill="#0f1e3d" stroke="white" strokeWidth="3" />
        <circle cx="48" cy="66" r="10" fill="#0f1e3d" stroke="white" strokeWidth="3" />
        <circle cx="112" cy="66" r="10" fill="#0f1e3d" stroke="white" strokeWidth="3" />
        {/* RRI cyan stripe on the trailer */}
        <rect x="8" y="26" width="72" height="5" rx="2.5" fill="#00fffc" />
      </g>
    </svg>
  );
}
