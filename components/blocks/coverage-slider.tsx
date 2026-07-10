"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { COVERAGES } from "@/content/coverage";

/**
 * "Find out the coverage option your fleet needs" — horizontal scroll-snap
 * slider over the 11 coverage types. Dark gradient cards with a ghost
 * index number, cyan icon chip, and per-card link.
 */
export function CoverageSlider() {
  const trackRef = useRef<HTMLDivElement>(null);
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(true);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    const update = () => {
      setCanPrev(track.scrollLeft > 8);
      setCanNext(track.scrollLeft < track.scrollWidth - track.clientWidth - 8);
    };
    update();
    track.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      track.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  const scrollByCards = (dir: 1 | -1) => {
    const track = trackRef.current;
    if (!track) return;
    const card = track.querySelector<HTMLElement>("[data-coverage-card]");
    const step = card ? card.offsetWidth + 20 : 320;
    track.scrollBy({ left: dir * step * 2, behavior: "smooth" });
  };

  return (
    <div className="flex flex-col gap-8">
      <div className="flex items-end justify-between gap-6">
        <div className="hidden gap-2 sm:flex">
          <SliderArrow
            direction="prev"
            disabled={!canPrev}
            onClick={() => scrollByCards(-1)}
          />
          <SliderArrow
            direction="next"
            disabled={!canNext}
            onClick={() => scrollByCards(1)}
          />
        </div>
        <div className="ml-auto max-w-xl text-right">
          <h2
            id="coverage-slider-heading"
            className="text-[32px] font-semibold leading-[1.15] tracking-[-0.01em] text-foreground sm:text-[40px]"
          >
            Find out the coverage option your fleet needs
          </h2>
        </div>
      </div>

      <div
        ref={trackRef}
        className="rri-no-scrollbar -mx-6 flex snap-x snap-mandatory gap-5 overflow-x-auto scroll-px-6 px-6 pb-2 lg:mx-0 lg:scroll-px-0 lg:px-0"
      >
        {COVERAGES.map((coverage, i) => {
          const Icon = coverage.icon;
          return (
            <Link
              key={coverage.slug}
              href={coverage.href}
              data-coverage-card
              className={cn(
                "group relative flex h-[360px] w-[280px] shrink-0 snap-start flex-col justify-between overflow-hidden rounded-2xl p-7 text-white transition-transform duration-300 hover:-translate-y-1.5 sm:w-[300px]",
                i % 2 === 0
                  ? "bg-gradient-to-b from-primary-dark to-primary"
                  : "bg-gradient-to-b from-primary to-primary-dark",
              )}
            >
              <span
                aria-hidden="true"
                className="pointer-events-none absolute -right-2 -top-8 select-none text-[110px] font-bold leading-none text-white/[0.07]"
              >
                {String(i + 1).padStart(2, "0")}
              </span>

              <span className="flex h-12 w-12 items-center justify-center rounded-full bg-cyan/15 text-cyan transition-colors duration-300 group-hover:bg-cyan group-hover:text-primary-dark">
                <Icon className="h-6 w-6" strokeWidth={1.75} />
              </span>

              <span className="flex flex-col gap-3">
                <span className="text-[22px] font-semibold leading-[1.2]">
                  {coverage.name}
                </span>
                <span className="text-[14px] leading-[1.55] text-white/75">
                  {coverage.short}
                </span>
                <span className="inline-flex items-center gap-1.5 text-[14px] font-semibold text-cyan">
                  Learn more
                  <ArrowRight
                    className="h-4 w-4 transition-transform group-hover:translate-x-1"
                    strokeWidth={1.75}
                  />
                </span>
              </span>
            </Link>
          );
        })}
      </div>

      <div className="flex justify-center gap-2 sm:hidden">
        <SliderArrow direction="prev" disabled={!canPrev} onClick={() => scrollByCards(-1)} />
        <SliderArrow direction="next" disabled={!canNext} onClick={() => scrollByCards(1)} />
      </div>
    </div>
  );
}

function SliderArrow({
  direction,
  disabled,
  onClick,
}: {
  direction: "prev" | "next";
  disabled: boolean;
  onClick: () => void;
}) {
  const Icon = direction === "prev" ? ChevronLeft : ChevronRight;
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-label={direction === "prev" ? "Previous coverages" : "Next coverages"}
      className={cn(
        "flex h-11 w-11 items-center justify-center rounded-full ring-1 ring-gray-300 transition-colors",
        disabled
          ? "cursor-default text-gray-300"
          : "text-foreground hover:bg-primary hover:text-white hover:ring-primary",
      )}
    >
      <Icon className="h-5 w-5" strokeWidth={1.75} />
    </button>
  );
}
