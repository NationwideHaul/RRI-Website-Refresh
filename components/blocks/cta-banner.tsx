import Link from "next/link";
import { Phone } from "lucide-react";
import { cn } from "@/lib/utils";
import { NAP } from "@/lib/constants";

export type CTABannerProps = {
  headline: string;
  subhead?: string;
  primaryCTA: { text: string; href: string };
  showPhone?: boolean;
  variant?: "primary" | "dark";
  className?: string;
};

export function CTABanner({
  headline,
  subhead,
  primaryCTA,
  showPhone = true,
  variant = "primary",
  className,
}: CTABannerProps) {
  const isDark = variant === "dark";
  const hasRealPhone = !NAP.phone.startsWith("PLACEHOLDER_");

  return (
    <section
      aria-label={headline}
      className={cn(
        "w-full text-white",
        isDark ? "bg-primary-dark" : "bg-primary",
        className,
      )}
    >
      <div className="mx-auto flex max-w-3xl flex-col items-center gap-8 px-6 py-20 text-center lg:py-24">
        <div className="flex flex-col gap-4">
          <h2 className="text-[32px] font-semibold leading-[1.15] tracking-[-0.01em] text-white sm:text-[40px]">
            {headline}
          </h2>
          {subhead && (
            <p className="text-[17px] leading-[1.6] text-white/85 sm:text-[18px]">
              {subhead}
            </p>
          )}
        </div>

        <div className="flex flex-col items-center gap-4 sm:flex-row sm:gap-5">
          <Link
            href={primaryCTA.href}
            className={cn(
              "inline-flex h-[52px] items-center justify-center rounded-lg px-8 text-[17px] font-semibold transition-colors",
              isDark
                ? "bg-cyan text-primary-dark hover:bg-white"
                : "bg-white text-primary hover:bg-cyan hover:text-primary-dark",
            )}
          >
            {primaryCTA.text}
          </Link>

          {showPhone && hasRealPhone && (
            <a
              href={`tel:${NAP.phone}`}
              className="inline-flex items-center gap-2 text-[16px] font-semibold text-white transition-colors hover:text-cyan"
            >
              <Phone className="h-4 w-4" strokeWidth={1.75} />
              Or call us at {NAP.phoneDisplay}
            </a>
          )}
        </div>
      </div>
    </section>
  );
}
