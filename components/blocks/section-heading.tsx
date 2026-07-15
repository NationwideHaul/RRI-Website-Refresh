import { cn } from "@/lib/utils";
import { WordReveal } from "@/components/blocks/word-reveal";

export type SectionHeadingProps = {
  eyebrow?: string;
  headline: string;
  /** Optional gray continuation of the headline, rendered inline after
   *  `headline` in Stripe's muted slate — the black/gray two-tone effect. */
  headlineMuted?: string;
  subhead?: string;
  align?: "left" | "center";
  variant?: "light" | "dark";
  className?: string;
};

export function SectionHeading({
  eyebrow,
  headline,
  headlineMuted,
  subhead,
  align = "left",
  variant = "light",
  className,
}: SectionHeadingProps) {
  const isDark = variant === "dark";
  return (
    <div
      className={cn(
        "flex max-w-3xl flex-col gap-4",
        align === "center" && "mx-auto items-center text-center",
        className,
      )}
    >
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
      <h2
        className={cn(
          "type-h2 text-[32px] sm:text-[40px]",
          isDark ? "text-white" : "text-ink",
        )}
      >
        <WordReveal
          segments={[
            { text: headline },
            ...(headlineMuted
              ? [
                  {
                    text: headlineMuted,
                    className: isDark ? "text-white/55" : "text-slate-muted",
                  },
                ]
              : []),
          ]}
        />
      </h2>
      {subhead && (
        <p
          className={cn(
            "type-sub text-[17px] sm:text-[18px]",
            isDark ? "text-white/80" : "text-slate",
          )}
        >
          {subhead}
        </p>
      )}
    </div>
  );
}
