"use client";

import { Fragment, useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

export type WordRevealSegment = {
  /** The text of this segment; split into words. */
  text: string;
  /** Optional class for this segment's words (e.g. the gray two-tone half). */
  className?: string;
};

/**
 * Reveals a heading word-by-word as it scrolls into view: each word fades and
 * rises in sequence. Segments let a two-tone headline (ink + muted) share one
 * continuous stagger. Render it inside the real <h2>/<h1> so it inherits the
 * heading's font size and color; pass the muted color via a segment className.
 *
 * Motion lives in .rri-word (globals.css) so prefers-reduced-motion disables it.
 */
export function WordReveal({
  segments,
  className,
  /** Per-word stagger in ms. */
  stagger = 55,
}: {
  segments: WordRevealSegment[];
  className?: string;
  stagger?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        }
      },
      { threshold: 0.2, rootMargin: "0px 0px -40px 0px" },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  let index = 0;
  return (
    <span ref={ref} className={cn("rri-words", className)}>
      {segments.map((seg, si) => {
        const words = seg.text.split(/\s+/).filter(Boolean);
        return words.map((word, wi) => {
          const i = index++;
          return (
            <Fragment key={`${si}-${wi}`}>
              <span
                className={cn("rri-word", seg.className)}
                style={
                  { "--w-delay": `${i * stagger}ms` } as React.CSSProperties
                }
              >
                {word}
              </span>{" "}
            </Fragment>
          );
        });
      })}
    </span>
  );
}
