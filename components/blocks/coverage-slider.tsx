"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { COVERAGES } from "@/content/coverage";
import { WordReveal } from "@/components/blocks/word-reveal";

/**
 * "Find out the coverage option your fleet needs" — wide horizontal cards in a
 * scroll-snap track: title + short subheading on the left, a soft visual panel
 * with the coverage icon on the right (like a website-builder picker).
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
    const step = card ? card.offsetWidth + 16 : 280;
    track.scrollBy({ left: dir * step * 2, behavior: "smooth" });
  };

  // Fade the scroll edges only where there's more content to reveal.
  const fade = "72px";
  const maskImage = `linear-gradient(to right, ${
    canPrev ? `transparent, black ${fade}` : "black 0"
  }, ${canNext ? `black calc(100% - ${fade}), transparent` : "black 100%"})`;

  return (
    <div className="flex flex-col gap-8">
      {/* Header row: heading left, arrows right */}
      <div className="flex items-end justify-between gap-6">
        <div className="max-w-2xl">
          <h2
            id="coverage-slider-heading"
            className="type-h2 text-[32px] text-ink sm:text-[40px]"
          >
            <WordReveal
              segments={[
                { text: "Find out the coverage" },
                { text: "your fleet needs", className: "text-slate-muted" },
              ]}
            />
          </h2>
        </div>
        <div className="hidden shrink-0 gap-2 sm:flex">
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
      </div>

      <div
        ref={trackRef}
        style={{ maskImage, WebkitMaskImage: maskImage }}
        className="rri-no-scrollbar -mx-6 flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-px-6 px-6 pb-2 lg:mx-0 lg:scroll-px-0 lg:px-0"
      >
        {COVERAGES.map((coverage) => {
          const Icon = coverage.icon;
          return (
            <Link
              key={coverage.slug}
              href={coverage.href}
              data-coverage-card
              className="group flex h-[164px] w-[400px] shrink-0 snap-start items-stretch gap-5 rounded-2xl border border-gray-200 bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-primary/30 hover:shadow-md"
            >
              <span className="flex flex-1 flex-col justify-center gap-2">
                <span className="type-h3 text-[19px] text-ink">
                  {coverage.name}
                </span>
                <span className="line-clamp-2 text-[13.5px] leading-[1.5] text-slate">
                  {coverage.short}
                </span>
              </span>
              <span className="relative flex aspect-square h-full shrink-0 items-center justify-center overflow-hidden rounded-xl bg-primary-soft">
                {coverage.image ? (
                  /* eslint-disable-next-line @next/next/no-img-element */
                  <img
                    src={coverage.image}
                    alt=""
                    aria-hidden="true"
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <Icon className="h-11 w-11 text-primary" strokeWidth={1.5} />
                )}
              </span>
            </Link>
          );
        })}
      </div>

      <div className="flex flex-col items-center gap-6 sm:flex-row sm:justify-between">
        <Link
          href="/coverage/"
          className="btn btn-outline"
        >
          See all coverage options
          <ArrowRight className="h-4 w-4" strokeWidth={2} />
        </Link>

        <div className="flex gap-2 sm:hidden">
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
