import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { FillPhoto } from "@/components/blocks/fill-photo";

export type HeroCTA = { text: string; href: string };

export type HeroProps = {
  eyebrow?: string;
  headline: string;
  /** Muted continuation of the headline (two-tone). */
  headlineMuted?: string;
  subhead?: string;
  primaryCTA?: HeroCTA;
  secondaryCTA?: HeroCTA;
  trustLine?: string;
  /** Kept for API compatibility; the header is always brand-colored now. */
  variant?: "light" | "dark";
  /** Optional supporting photo, renders a two-column header. */
  image?: { src: string; alt: string };
  /** Optional transparent illustration, floats on the right with no card frame. */
  illustration?: { src: string; alt: string };
  className?: string;
};

/**
 * Page header rendered as a brand-colored rounded panel (navy→blue gradient
 * with a dotted texture + cyan glow) floating on white, echoing the homepage
 * hero and About panel. White copy on the left, an optional photo card on the
 * right. Replaces the old flat white header.
 */
export function Hero({
  eyebrow,
  headline,
  headlineMuted,
  subhead,
  primaryCTA,
  secondaryCTA,
  trustLine,
  image,
  illustration,
  className,
}: HeroProps) {
  const copy = (
    <div className="flex flex-col gap-5">
      {eyebrow && (
        <p className="text-[13px] font-semibold capitalize tracking-normal text-cyan">
          {eyebrow}
        </p>
      )}

      <h1 className="text-[30px] type-display text-white sm:text-[38px] lg:text-[44px]">
        {headline}
        {headlineMuted && (
          <>
            {" "}
            <span className="text-white/55">{headlineMuted}</span>
          </>
        )}
      </h1>

      {subhead && (
        <p className="max-w-xl text-[16px] leading-[1.6] text-white/85 sm:text-[17px] lg:text-[18px]">
          {subhead}
        </p>
      )}

      {(primaryCTA || secondaryCTA) && (
        <div className="mt-1 flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4">
          {primaryCTA && (
            <Link href={primaryCTA.href} className="btn bg-cyan text-primary-dark hover:bg-white">
              {primaryCTA.text}
            </Link>
          )}
          {secondaryCTA && (
            <Link
              href={secondaryCTA.href}
              className="btn border-[1.5px] border-white/60 bg-transparent text-white hover:bg-white hover:text-primary-dark"
            >
              {secondaryCTA.text}
            </Link>
          )}
        </div>
      )}

      {trustLine && <p className="text-[13px] text-white/70">{trustLine}</p>}
    </div>
  );

  return (
    <section className={cn("bg-background", className)}>
      <div className="mx-auto max-w-7xl px-4 pt-2 sm:px-6 lg:px-8">
        <div className="relative isolate overflow-hidden rounded-[28px] bg-primary-dark lg:rounded-[36px]">
          {/* Brand gradient */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 z-0"
            style={{
              background:
                "radial-gradient(70% 90% at 82% 12%, rgba(0,255,252,0.13), transparent 55%), radial-gradient(95% 120% at 8% 100%, rgba(34,82,150,0.65), transparent 55%), linear-gradient(135deg, #0f1e3d 0%, #14294d 100%)",
            }}
          />
          {/* Dotted texture */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 z-0 opacity-[0.12]"
            style={{
              backgroundImage:
                "radial-gradient(rgba(255,255,255,0.6) 1px, transparent 1px)",
              backgroundSize: "22px 22px",
            }}
          />
          {/* Soft cyan corner glow */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -right-24 -top-24 z-0 h-72 w-72 rounded-full bg-cyan/15 blur-3xl"
          />

          {illustration ? (
            <div className="relative z-10 grid grid-cols-1 items-center gap-9 px-7 py-12 sm:px-10 sm:py-14 lg:grid-cols-2 lg:gap-12 lg:px-14 lg:py-16">
              {copy}
              <div className="flex justify-center lg:justify-center">
                <Image
                  src={illustration.src}
                  alt={illustration.alt}
                  width={760}
                  height={760}
                  priority
                  className="h-auto w-full max-w-[480px] lg:-ml-6"
                />
              </div>
            </div>
          ) : image ? (
            <div className="relative z-10 grid grid-cols-1 items-center gap-9 px-7 py-12 sm:px-10 sm:py-14 lg:grid-cols-2 lg:gap-12 lg:px-14 lg:py-16">
              {copy}
              <div className="relative aspect-[16/10] overflow-hidden rounded-2xl shadow-[0_24px_60px_-24px_rgba(0,0,0,0.6)] ring-1 ring-white/10">
                <FillPhoto src={image.src} alt={image.alt} sizes="(min-width: 1024px) 42vw, 100vw" priority />
              </div>
            </div>
          ) : (
            <div className="relative z-10 max-w-3xl px-7 py-14 sm:px-10 sm:py-16 lg:px-14 lg:py-20">
              {copy}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
