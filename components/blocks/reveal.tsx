"use client";

import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

export type RevealProps = {
  children: React.ReactNode;
  /** Stagger offset in ms, applied via CSS var so the transition owns it. */
  delay?: number;
  className?: string;
};

/**
 * Scroll-reveal wrapper: fades + slides children in the first time they
 * enter the viewport. Styling lives in globals.css (.rri-reveal) so
 * prefers-reduced-motion can disable it globally.
 */
export function Reveal({ children, delay = 0, className }: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);

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
      { threshold: 0.15, rootMargin: "0px 0px -40px 0px" },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={cn("rri-reveal", className)}
      style={{ "--reveal-delay": `${delay}ms` } as React.CSSProperties}
    >
      {children}
    </div>
  );
}
