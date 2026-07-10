"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ArrowRight,
  FileCheck,
  Headset,
  ShieldCheck,
  Truck,
  Zap,
  type LucideIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";

type Panel = {
  key: string;
  icon: LucideIcon;
  title: string;
  detail: string;
  href: string;
  linkText: string;
};

const PANELS: Panel[] = [
  {
    key: "fleets",
    icon: Truck,
    title: "Fleets of all sizes, including high-risk",
    detail:
      "From a 2-truck operation to a 50-unit fleet, and the hard-to-place, high-risk accounts other brokers turn away. If you run trucks, we have a market for you.",
    href: "/who-we-cover/",
    linkText: "See who we cover",
  },
  {
    key: "claims",
    icon: Zap,
    title: "Faster claims and filings",
    detail:
      "An in-house licensed claims adjuster handles your claim directly. No call centers, no third-party administrators, no waiting weeks for a callback.",
    href: "/report-a-claim/",
    linkText: "How claims work",
  },
  {
    key: "markets",
    icon: ShieldCheck,
    title: "120+ premium A-rated markets",
    detail:
      "We place coverage with the premium A-rated carriers serious fleets want, not just the secondary markets that quote fastest.",
    href: "/rri-advantage/",
    linkText: "How we place coverage",
  },
  {
    key: "coi",
    icon: FileCheck,
    title: "Same-day COIs and certificates",
    detail:
      "Need a certificate of insurance for a load or a new contract? Request it and have it in your inbox the same business day.",
    href: "/get-a-coi/",
    linkText: "Get a COI",
  },
  {
    key: "agents",
    icon: Headset,
    title: "A named agent who answers",
    detail:
      "Your account has one dedicated agent who knows your fleet, picks up the phone, and calls you before renewal, not after.",
    href: "/contact-us/",
    linkText: "Talk to an agent",
  },
];

/**
 * Horizontal expanding panels ("accordion cards"). The active panel grows
 * to reveal its detail while the rest collapse to slim columns with a
 * vertical title. On mobile the same interaction runs vertically.
 */
export function CoverageExpander() {
  const [active, setActive] = useState(0);

  return (
    <div className="flex flex-col gap-3 lg:h-[460px] lg:flex-row">
      {PANELS.map((panel, i) => {
        const isActive = i === active;
        const Icon = panel.icon;
        return (
          // div + role="button" (not <button>) because the expanded panel
          // nests a real <Link>, and interactive elements cannot nest.
          <div
            key={panel.key}
            role="button"
            tabIndex={0}
            onClick={() => setActive(i)}
            onMouseEnter={() => setActive(i)}
            onFocus={() => setActive(i)}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                setActive(i);
              }
            }}
            aria-expanded={isActive}
            className={cn(
              "group relative overflow-hidden rounded-2xl text-left transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)]",
              // Mobile: vertical expansion via height. Desktop: horizontal via flex-grow.
              isActive ? "h-[340px]" : "h-[76px]",
              "lg:h-full lg:min-w-0",
              isActive ? "lg:flex-[3.4]" : "lg:flex-[1]",
              i % 2 === 0
                ? "bg-gradient-to-br from-primary-dark via-primary-dark to-primary"
                : "bg-gradient-to-br from-primary to-primary-dark",
            )}
          >
            {/* Oversized ghost number anchors each panel */}
            <span
              aria-hidden="true"
              className={cn(
                "pointer-events-none absolute -right-3 -top-6 select-none text-[120px] font-bold leading-none text-white/[0.06] transition-opacity duration-500",
                isActive ? "opacity-100" : "opacity-0 lg:opacity-100",
              )}
            >
              {String(i + 1).padStart(2, "0")}
            </span>

            {/* Collapsed state: icon + vertical title (desktop) / slim row (mobile) */}
            <div
              className={cn(
                "absolute inset-0 flex items-center gap-4 px-6 transition-opacity duration-300",
                "lg:flex-col lg:items-center lg:justify-between lg:px-0 lg:py-7",
                isActive ? "pointer-events-none opacity-0" : "opacity-100",
              )}
            >
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-cyan/15 text-cyan">
                <Icon className="h-5 w-5" strokeWidth={1.75} />
              </span>
              <span className="min-w-0 truncate text-[16px] font-semibold text-white lg:[writing-mode:vertical-rl] lg:rotate-180 lg:truncate lg:text-[15px] lg:tracking-wide">
                {panel.title}
              </span>
            </div>

            {/* Expanded state */}
            <div
              className={cn(
                "absolute inset-0 flex flex-col justify-end gap-4 p-7 transition-opacity delay-150 duration-500 lg:p-9",
                isActive ? "opacity-100" : "pointer-events-none opacity-0",
              )}
            >
              <span className="flex h-12 w-12 items-center justify-center rounded-full bg-cyan text-primary-dark">
                <Icon className="h-6 w-6" strokeWidth={1.75} />
              </span>
              <h3 className="max-w-md text-[24px] font-semibold leading-[1.15] text-white lg:text-[28px]">
                {panel.title}
              </h3>
              <p className="max-w-md text-[15px] leading-[1.6] text-white/80 lg:text-[16px]">
                {panel.detail}
              </p>
              <Link
                href={panel.href}
                onClick={(e) => e.stopPropagation()}
                className="inline-flex items-center gap-1.5 text-[15px] font-semibold text-cyan transition-colors hover:text-white"
              >
                {panel.linkText}
                <ArrowRight className="h-4 w-4" strokeWidth={1.75} />
              </Link>
            </div>
          </div>
        );
      })}
    </div>
  );
}
