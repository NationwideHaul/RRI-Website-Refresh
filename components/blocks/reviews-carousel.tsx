"use client";

import { useRef, useState } from "react";
import { BadgeCheck, ChevronLeft, ChevronRight, Star } from "lucide-react";
import { cn } from "@/lib/utils";
import type { Review } from "@/content/reviews";
import { GoogleG } from "@/components/blocks/google-g";

/**
 * Scroll-snap carousel of Google review cards, styled to match the native
 * Google reviews widget (avatar, verified badge, amber stars, Read more).
 */
export function ReviewsCarousel({
  reviews,
  reviewsUrl,
}: {
  reviews: Review[];
  reviewsUrl: string;
}) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [expanded, setExpanded] = useState<number | null>(null);

  const scrollByCards = (dir: 1 | -1) => {
    const track = trackRef.current;
    if (!track) return;
    const card = track.querySelector<HTMLElement>("[data-review-card]");
    const step = card ? card.offsetWidth + 20 : 320;
    track.scrollBy({ left: dir * step, behavior: "smooth" });
  };

  return (
    <div className="relative">
      <div
        ref={trackRef}
        className="rri-no-scrollbar -mx-6 flex snap-x snap-mandatory gap-5 overflow-x-auto scroll-px-6 px-6 pb-2 lg:mx-0 lg:scroll-px-0 lg:px-0"
      >
        {reviews.map((review, i) => (
          <article
            key={`${review.author}-${i}`}
            data-review-card
            className="flex w-[300px] shrink-0 snap-start flex-col gap-3 rounded-2xl bg-white p-6 shadow-sm ring-1 ring-gray-100 sm:w-[320px]"
          >
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <span
                  aria-hidden="true"
                  className="flex h-10 w-10 items-center justify-center rounded-full text-[16px] font-semibold text-white"
                  style={{ backgroundColor: review.avatarColor }}
                >
                  {review.author.charAt(0).toUpperCase()}
                </span>
                <div className="flex flex-col">
                  <span className="flex items-center gap-1 text-[15px] font-semibold text-foreground">
                    {review.author}
                    <BadgeCheck
                      className="h-4 w-4 text-[#4285F4]"
                      strokeWidth={2}
                      aria-label="Verified Google review"
                    />
                  </span>
                  <span className="text-[13px] text-gray-500">
                    {review.relativeTime}
                  </span>
                </div>
              </div>
              <GoogleG className="h-5 w-5 shrink-0" />
            </div>

            <span className="flex items-center gap-0.5" aria-label={`${review.rating} out of 5 stars`}>
              {Array.from({ length: 5 }, (_, s) => (
                <Star
                  key={s}
                  className={cn(
                    "h-4 w-4",
                    s < review.rating
                      ? "fill-amber-400 text-amber-400"
                      : "fill-gray-100 text-gray-100",
                  )}
                  strokeWidth={0}
                />
              ))}
            </span>

            <p
              className={cn(
                "text-[15px] leading-[1.55] text-gray-700",
                expanded !== i && "line-clamp-4",
              )}
            >
              {review.text}
            </p>

            {review.text.length > 120 && (
              <button
                type="button"
                onClick={() => setExpanded(expanded === i ? null : i)}
                className="self-start text-[14px] font-semibold text-gray-500 transition-colors hover:text-primary"
              >
                {expanded === i ? "Show less" : "Read more"}
              </button>
            )}
          </article>
        ))}
      </div>

      <div className="mt-6 flex items-center justify-between">
        <a
          href={reviewsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="text-[15px] font-semibold text-primary transition-colors hover:text-primary-dark"
        >
          See all reviews on Google
        </a>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => scrollByCards(-1)}
            aria-label="Previous reviews"
            className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-foreground shadow-sm ring-1 ring-gray-100 transition-colors hover:bg-primary hover:text-white"
          >
            <ChevronLeft className="h-5 w-5" strokeWidth={1.75} />
          </button>
          <button
            type="button"
            onClick={() => scrollByCards(1)}
            aria-label="Next reviews"
            className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-foreground shadow-sm ring-1 ring-gray-100 transition-colors hover:bg-primary hover:text-white"
          >
            <ChevronRight className="h-5 w-5" strokeWidth={1.75} />
          </button>
        </div>
      </div>
    </div>
  );
}
