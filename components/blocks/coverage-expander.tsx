"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { WordReveal } from "@/components/blocks/word-reveal";

type Panel = {
  key: string;
  /** Short label overlaid in the corner of the card image. */
  tag: string;
  /** Full headline shown in the detail row below the filmstrip. */
  title: string;
  detail: string;
  href: string;
  linkText: string;
  /** Background photo for the card. */
  image: string;
};

const PANELS: Panel[] = [
  {
    key: "fleets",
    tag: "Trucking specialists",
    title: "Trucking specialists, not general insurance",
    detail:
      "We only write commercial trucking, not home, auto, or general business. That focus is why we know your risks, your carriers, and your filings better than any generalist agency ever could.",
    href: "/who-we-are/",
    linkText: "Who we are",
    image: "/images/coverage/fleets.jpg",
  },
  {
    key: "claims",
    tag: "Claims & filings",
    title: "Claims oversight and guidance",
    detail:
      "When a claim hits, we stay in it with you, oversight and guidance from people who know your policy and your carrier. We make sure it is reported the right way and moves the way it should. No call centers, no getting passed around.",
    href: "/report-a-claim/",
    linkText: "How claims work",
    image: "/images/coverage/claims.jpg",
  },
  {
    key: "ecosystem",
    tag: "More than just insurance",
    title: "A whole trucking ecosystem behind you",
    detail:
      "You're not a client, we're your partner. Insurance is where we start, but through our sister companies you get more benefits on equipment sales, financing, fuel discounts, roadside assistance, and more. One network built for trucking.",
    href: "/client-perks/",
    linkText: "Explore the partner network",
    image: "/images/coverage/specialists.jpg",
  },
  {
    key: "coi",
    tag: "Certificates",
    title: "On-demand, instant COIs",
    detail:
      "Need a certificate of insurance for a load or a new contract? Pull it on demand from your client portal, instantly, any time, or send us a request and we will issue it for you.",
    href: "/get-a-coi/",
    linkText: "Get a COI",
    image: "/images/coverage/coi.jpg",
  },
  {
    key: "agents",
    tag: "Your agent",
    title: "A named agent who answers",
    detail:
      "Your account has one dedicated agent who knows your fleet, picks up the phone, and calls you before renewal, not after.",
    href: "/contact-us/",
    linkText: "Talk to an agent",
    image: "/images/coverage/agents.jpg",
  },
];

const AUTOPLAY_MS = 6000;
// The opening "Trucking specialists" panel is the key message, let it linger
// just slightly longer than the rest.
const AUTOPLAY_MS_FIRST = 7000;

export type CoverageExpanderProps = {
  eyebrow?: string;
  headline: string;
  /** Gray continuation of the headline (Stripe black/gray two-tone). */
  headlineMuted?: string;
  subhead?: string;
};

/**
 * Stripe-style "What's happening" filmstrip carousel. The active card is a
 * large image tile on the left; the remaining cards peek in, cropped, to its
 * right. Prev/next arrows sit beside the heading, and the active card's full
 * title, description, and CTA render in a detail row below the strip.
 */
export function CoverageExpander({
  eyebrow,
  headline,
  headlineMuted,
  subhead,
}: CoverageExpanderProps) {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const [inView, setInView] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const count = PANELS.length;

  const go = useCallback(
    (dir: 1 | -1) => setActive((i) => (i + dir + count) % count),
    [count],
  );

  // Only auto-advance once the section is actually on screen.
  useEffect(() => {
    const node = rootRef.current;
    if (!node) return;
    const observer = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { threshold: 0.4 },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  // Gentle auto-advance, matching Stripe's rotation. Runs only while the
  // section is in view; pauses on hover/focus, respects reduced motion, and
  // holds the first panel a little longer.
  useEffect(() => {
    if (paused || !inView) return;
    if (typeof window !== "undefined") {
      const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
      if (mq.matches) return;
    }
    const delay = active === 0 ? AUTOPLAY_MS_FIRST : AUTOPLAY_MS;
    const id = window.setTimeout(() => setActive((i) => (i + 1) % count), delay);
    return () => window.clearTimeout(id);
  }, [active, paused, inView, count]);

  const activePanel = PANELS[active];

  return (
    <div
      ref={rootRef}
      className="flex flex-col gap-8"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={() => setPaused(false)}
    >
      {/* Header row: heading on the left, arrows on the right (Stripe layout) */}
      <div className="flex items-start justify-between gap-6">
        <div className="flex max-w-2xl flex-col gap-3">
          {eyebrow && (
            <p className="text-[13px] font-semibold capitalize tracking-normal text-primary">
              {eyebrow}
            </p>
          )}
          <h2 className="type-h2 text-[32px] text-ink sm:text-[40px]">
            <WordReveal
              segments={[
                { text: headline },
                ...(headlineMuted
                  ? [{ text: headlineMuted, className: "text-slate-muted" }]
                  : []),
              ]}
            />
          </h2>
          {subhead && (
            <p className="type-sub text-[17px] text-slate sm:text-[18px]">
              {subhead}
            </p>
          )}
        </div>
        <div className="hidden shrink-0 gap-3 pt-2 sm:flex">
          <CarouselArrow
            direction="prev"
            onClick={() => go(-1)}
            label="Previous coverage"
          />
          <CarouselArrow
            direction="next"
            onClick={() => go(1)}
            label="Next coverage"
          />
        </div>
      </div>

      {/* Filmstrip */}
      <div className="flex flex-col gap-3 lg:h-[420px] lg:flex-row">
        {PANELS.map((panel, i) => {
          const isActive = i === active;
          return (
            <button
              key={panel.key}
              type="button"
              onClick={() => setActive(i)}
              aria-label={panel.title}
              aria-current={isActive}
              className={cn(
                "group relative overflow-hidden rounded-2xl bg-primary-dark text-left outline-none transition-all duration-[600ms] ease-[cubic-bezier(0.32,0.72,0,1)]",
                "focus-visible:ring-2 focus-visible:ring-cyan focus-visible:ring-offset-2 focus-visible:ring-offset-background",
                // Mobile: only the active card is shown, full width.
                isActive ? "h-[300px]" : "hidden lg:block",
                // Desktop: active grows wide, others shrink to thin peeking
                // slivers (Stripe-style).
                "lg:h-full lg:min-w-0",
                isActive ? "lg:flex-[6]" : "lg:flex-[0.4]",
              )}
            >
              {/* Background photo */}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={panel.image}
                alt=""
                aria-hidden="true"
                className="absolute inset-0 h-full w-full object-cover"
              />

              {/* Bottom scrim so the label stays legible over any photo */}
              <div className="pointer-events-none absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-black/70 via-black/25 to-transparent" />

              {/* Corner label (bottom-left), same type treatment as the heading */}
              <div
                className={cn(
                  "absolute bottom-0 left-0 p-6 transition-opacity duration-500 lg:p-7",
                  isActive ? "opacity-100" : "opacity-0",
                )}
              >
                <span className="type-h2 text-[22px] text-white lg:text-[28px]">
                  {panel.tag}
                </span>
              </div>
            </button>
          );
        })}
      </div>

      {/* Detail row below the strip (Stripe: copy left, CTA right) */}
      <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between sm:gap-10">
        <p className="max-w-2xl text-[18px] leading-[1.6] text-gray-800 sm:text-[19px]">
          <span className="font-semibold text-foreground">
            {activePanel.title}.
          </span>{" "}
          {activePanel.detail}
        </p>
        <Link
          href={activePanel.href}
          className="btn btn-outline"
        >
          {activePanel.linkText}
          <ArrowRight className="h-4 w-4" strokeWidth={2} />
        </Link>
      </div>

      {/* Mobile arrows + progress dots */}
      <div className="flex items-center justify-between sm:hidden">
        <div className="flex gap-2" aria-hidden="true">
          {PANELS.map((p, i) => (
            <span
              key={p.key}
              className={cn(
                "h-1.5 rounded-full transition-all duration-300",
                i === active ? "w-6 bg-primary" : "w-1.5 bg-gray-300",
              )}
            />
          ))}
        </div>
        <div className="flex gap-3">
          <CarouselArrow
            direction="prev"
            onClick={() => go(-1)}
            label="Previous coverage"
          />
          <CarouselArrow
            direction="next"
            onClick={() => go(1)}
            label="Next coverage"
          />
        </div>
      </div>
    </div>
  );
}

function CarouselArrow({
  direction,
  onClick,
  label,
}: {
  direction: "prev" | "next";
  onClick: () => void;
  label: string;
}) {
  const Icon = direction === "prev" ? ArrowLeft : ArrowRight;
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      className="flex h-12 w-12 items-center justify-center rounded-full border border-gray-200 bg-white text-primary shadow-sm outline-none transition-colors hover:border-primary hover:bg-primary hover:text-white focus-visible:ring-2 focus-visible:ring-cyan focus-visible:ring-offset-2"
    >
      <Icon className="h-5 w-5" strokeWidth={2} />
    </button>
  );
}
