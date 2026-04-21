import { cn } from "@/lib/utils";

export type SectionHeadingProps = {
  eyebrow?: string;
  headline: string;
  subhead?: string;
  align?: "left" | "center";
  variant?: "light" | "dark";
  className?: string;
};

export function SectionHeading({
  eyebrow,
  headline,
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
          "text-[32px] font-semibold leading-[1.15] tracking-[-0.01em] sm:text-[40px]",
          isDark ? "text-white" : "text-foreground",
        )}
      >
        {headline}
      </h2>
      {subhead && (
        <p
          className={cn(
            "text-[17px] leading-[1.6] sm:text-[18px]",
            isDark ? "text-white/80" : "text-gray-700",
          )}
        >
          {subhead}
        </p>
      )}
    </div>
  );
}
