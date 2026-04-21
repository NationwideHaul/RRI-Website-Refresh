import Link from "next/link";
import { cn } from "@/lib/utils";

export type HeroCTA = { text: string; href: string };

export type HeroProps = {
  eyebrow?: string;
  headline: string;
  subhead?: string;
  primaryCTA: HeroCTA;
  secondaryCTA?: HeroCTA;
  trustLine?: string;
  variant?: "light" | "dark";
  className?: string;
};

export function Hero({
  eyebrow,
  headline,
  subhead,
  primaryCTA,
  secondaryCTA,
  trustLine,
  variant = "light",
  className,
}: HeroProps) {
  const isDark = variant === "dark";

  return (
    <section
      className={cn(
        "w-full",
        isDark ? "bg-primary-dark text-white" : "bg-background text-foreground",
        className,
      )}
    >
      <div className="mx-auto flex max-w-5xl flex-col gap-7 px-6 py-20 sm:gap-8 sm:py-24 lg:px-8 lg:py-32">
        {eyebrow && (
          <p
            className={cn(
              "text-[13px] font-semibold uppercase tracking-[0.18em]",
              isDark ? "text-cyan" : "text-primary",
            )}
          >
            {eyebrow}
          </p>
        )}

        <h1
          className={cn(
            "max-w-4xl text-[40px] font-semibold leading-[1.05] tracking-[-0.01em] sm:text-[56px] lg:text-[72px]",
            isDark ? "text-white" : "text-primary",
          )}
        >
          {headline}
        </h1>

        {subhead && (
          <p
            className={cn(
              "max-w-3xl text-[18px] leading-[1.5] sm:text-[20px] lg:text-[22px]",
              isDark ? "text-white/85" : "text-gray-700",
            )}
          >
            {subhead}
          </p>
        )}

        <div className="mt-2 flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4">
          <Link
            href={primaryCTA.href}
            className={cn(
              "inline-flex h-[52px] items-center justify-center rounded-lg px-8 text-[17px] font-semibold transition-colors",
              isDark
                ? "bg-cyan text-primary-dark hover:bg-white"
                : "bg-primary text-white hover:bg-primary-dark",
            )}
          >
            {primaryCTA.text}
          </Link>

          {secondaryCTA && (
            <Link
              href={secondaryCTA.href}
              className={cn(
                "inline-flex h-[52px] items-center justify-center rounded-lg border-[1.5px] bg-transparent px-8 text-[17px] font-semibold transition-colors",
                isDark
                  ? "border-white/70 text-white hover:bg-white hover:text-primary-dark"
                  : "border-primary text-primary hover:bg-primary hover:text-white",
              )}
            >
              {secondaryCTA.text}
            </Link>
          )}
        </div>

        {trustLine && (
          <p
            className={cn(
              "text-[13px]",
              isDark ? "text-white/70" : "text-gray-500",
            )}
          >
            {trustLine}
          </p>
        )}
      </div>
    </section>
  );
}
