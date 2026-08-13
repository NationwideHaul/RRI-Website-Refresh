import type { Metadata } from "next";
import Image from "next/image";
import { FileSearch, Globe2, LifeBuoy, Check } from "lucide-react";
import { Reveal } from "@/components/blocks/reveal";
import { MarketsBand } from "@/components/blocks/markets-band";
import { RenewalForm } from "./renewal-form";

/**
 * Standalone conversion landing page for paid Meta traffic (/renewal-review).
 *
 * Isolation: renders NO site header/footer nav (it lives outside the (main)
 * route group). The only outbound links are the small legal footer below.
 * Performance: no hero video and no animation libraries. The hero uses a
 * single compressed WebP photo (priority, explicit dimensions) and the motion
 * is CSS-only (the shared Reveal wrapper: IntersectionObserver + CSS classes).
 * SEO: noindex, nofollow so it never competes with the main site in search.
 */

export const metadata: Metadata = {
  title: "Renewal Review for Your Fleet",
  description:
    "Before you renew, see what the market actually offers your fleet. We review your operation and shop it across more than 100 carriers. Licensed in 48 states.",
  robots: {
    index: false,
    follow: false,
    googleBot: { index: false, follow: false },
  },
};

const TRUST = [
  "100+ carrier access",
  "Licensed in 48 states",
  "Commercial trucking only",
];

const DIFFERENCE = [
  {
    icon: FileSearch,
    heading: "We review the operation, not just the policy",
    body: "Radius, commodity mix, driver experience, and safety technology all move your pricing. Most agents never put that in front of an underwriter.",
  },
  {
    icon: Globe2,
    heading: "Real market access",
    body: "An agency limited to a handful of carriers can only show you what those carriers want to sell. We place fleets across more than 100 markets and we know which ones reward a well documented operation.",
  },
  {
    icon: LifeBuoy,
    heading: "Claims support is part of the coverage",
    body: "When something happens, what matters is who answers and how fast your equipment gets back to work. We factor service performance into where we place your business, not just price.",
  },
];

const STEPS = [
  "Tell us how your fleet operates.",
  "A licensed specialist reviews your current coverage and your exposures.",
  "We bring you real options before your renewal date, with the tradeoffs explained.",
];

export default function RenewalReviewPage() {
  return (
    <main className="bg-background text-ink">
      {/* ---------- HERO ---------- */}
      <section className="relative isolate overflow-hidden bg-primary-dark">
        {/* Background photo (compressed WebP, LCP element) */}
        <Image
          src="/images/photos/highway.webp"
          alt=""
          aria-hidden="true"
          fill
          priority
          fetchPriority="high"
          sizes="100vw"
          className="pointer-events-none absolute inset-0 z-0 h-full w-full object-cover"
        />
        {/* Brand-blue scrim so white text stays legible over the photo */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 z-[1] bg-gradient-to-br from-primary-dark/95 via-primary/80 to-primary/50"
        />
        {/* Fine film-grain texture (same treatment as the home hero) */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 z-[2] opacity-25 mix-blend-overlay"
          style={{
            backgroundImage:
              "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='160'%3E%3Cfilter id='g'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23g)'/%3E%3C/svg%3E\")",
            backgroundSize: "160px 160px",
          }}
        />

        <div className="relative z-10 mx-auto grid max-w-6xl grid-cols-1 gap-10 px-5 pb-14 pt-12 sm:px-6 sm:pt-14 lg:grid-cols-12 lg:items-center lg:gap-10 lg:pb-20 lg:pt-16">
          {/* Left column: message + trust (logo lives in the header nav) */}
          <div className="flex flex-col lg:col-span-6">
            <h1 className="type-display text-[34px] font-semibold text-white sm:text-[44px] lg:text-[50px]">
              Before you renew, see{" "}
              <span className="bg-gradient-to-r from-[#d6fdff] via-[#9bf6ff] to-cyan bg-clip-text text-transparent">
                what the market actually offers your fleet
              </span>
            </h1>

            <p className="mt-5 max-w-xl text-[16px] leading-[1.65] text-white/85 sm:text-[18px]">
              Most agents send you the same coverage at a higher price and call
              it a renewal. We review your operation and shop it across more than
              100 carriers. Licensed in 48 states, and trucking is the only thing
              we write.
            </p>

            <ul className="mt-8 flex flex-col gap-3 [text-shadow:0_1px_2px_rgba(0,0,0,0.35)] sm:flex-row sm:flex-wrap sm:gap-x-6">
              {TRUST.map((item) => (
                <li
                  key={item}
                  className="flex items-center gap-2 text-[15px] font-medium text-white"
                >
                  <span className="flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-cyan/20">
                    <Check className="h-3.5 w-3.5 text-cyan" strokeWidth={3} />
                  </span>
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* Right column: the glass conversion form */}
          <div
            id="form"
            className="w-full scroll-mt-4 lg:col-span-6 lg:col-start-7"
          >
            <RenewalForm />
          </div>
        </div>
      </section>

      {/* ---------- TOP MARKETS CAROUSEL ---------- */}
      <MarketsBand />

      {/* ---------- WHY THIS IS DIFFERENT ---------- */}
      <section className="mx-auto max-w-6xl px-5 py-16 sm:px-6 lg:py-24">
        <Reveal>
          <h2 className="type-h2 text-[26px] sm:text-[34px]">
            Why this is <span className="text-primary">different</span>
          </h2>
        </Reveal>
        <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-3">
          {DIFFERENCE.map((block, i) => {
            const Icon = block.icon;
            return (
              <Reveal key={block.heading} delay={(i % 3) * 90} className="h-full">
                <div className="flex h-full flex-col gap-4 rounded-2xl border border-gray-100 bg-white p-7 shadow-sm">
                  <span className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-primary-soft">
                    <Icon className="h-6 w-6 text-primary" strokeWidth={1.75} />
                  </span>
                  <h3 className="type-h3 text-[19px] text-ink">
                    {block.heading}
                  </h3>
                  <p className="text-[15px] leading-[1.65] text-slate">
                    {block.body}
                  </p>
                </div>
              </Reveal>
            );
          })}
        </div>
      </section>

      {/* ---------- PHOTO + PROOF BAND ---------- */}
      <section className="bg-primary-dark">
        <div className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-10 px-5 py-16 sm:px-6 lg:grid-cols-2 lg:py-20">
          <Reveal>
            <div className="overflow-hidden rounded-3xl shadow-2xl">
              <Image
                src="/images/photos/agent-driver.webp"
                alt="A Road Ready specialist reviewing coverage with a fleet owner"
                width={1536}
                height={1024}
                loading="lazy"
                sizes="(min-width: 1024px) 560px, 100vw"
                className="h-full w-full object-cover"
              />
            </div>
          </Reveal>
          <Reveal delay={90}>
            <div className="flex flex-col gap-5 text-white">
              <h2 className="type-h2 text-[26px] sm:text-[32px]">
                A renewal review is not a{" "}
                <span className="bg-gradient-to-r from-[#d6fdff] via-[#9bf6ff] to-cyan bg-clip-text text-transparent">
                  sales call
                </span>
              </h2>
              <p className="text-[16px] leading-[1.65] text-white/85 sm:text-[17px]">
                It is a licensed specialist looking at how your fleet actually
                runs, then putting that story in front of the markets most likely
                to reward it. You see real options and the tradeoffs behind them,
                so the decision at renewal is yours to make with full
                information.
              </p>
              <ul className="mt-1 flex flex-col gap-3">
                {[
                  "One point of contact who knows trucking",
                  "Your operation documented for underwriters",
                  "Options explained before your renewal date",
                ].map((item) => (
                  <li key={item} className="flex items-center gap-3 text-[15px]">
                    <span className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-cyan/20">
                      <Check className="h-4 w-4 text-cyan" strokeWidth={3} />
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ---------- HOW IT WORKS ---------- */}
      <section className="bg-gray-50">
        <div className="mx-auto max-w-6xl px-5 py-16 sm:px-6 lg:py-24">
          <Reveal>
            <h2 className="type-h2 text-[26px] sm:text-[34px]">
              How it <span className="text-primary">works</span>
            </h2>
          </Reveal>
          <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-3">
            {STEPS.map((step, i) => (
              <Reveal key={i} delay={(i % 3) * 90} className="h-full">
                <div className="flex h-full flex-col gap-4 rounded-2xl border border-gray-100 bg-white p-7 shadow-sm">
                  <span className="flex h-11 w-11 items-center justify-center rounded-full bg-primary text-[17px] font-bold text-white">
                    {i + 1}
                  </span>
                  <p className="text-[16px] leading-[1.5] text-ink">{step}</p>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal delay={120}>
            <div className="mt-12 flex justify-center">
              <a href="#form" className="btn btn-primary w-full text-[16px] sm:w-fit sm:px-8">
                Request my renewal review
              </a>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ---------- LEGAL FOOTER (only outbound links) ---------- */}
      <footer className="border-t border-gray-100 bg-white">
        <div className="mx-auto flex max-w-6xl flex-col items-center gap-3 px-5 py-8 text-center text-[13px] text-slate sm:px-6">
          <Image
            src="/images/rr-secondary-logo.webp"
            alt="Road Ready Insurance"
            width={500}
            height={135}
            loading="lazy"
            sizes="150px"
            className="h-8 w-auto"
          />
          <p>
            &copy; {new Date().getFullYear()} Road Ready Insurance. Commercial
            trucking insurance specialist.
          </p>
          <div className="flex items-center gap-4">
            <a
              href="tel:+19549534845"
              className="font-semibold text-primary hover:underline"
            >
              (954) 953-4845
            </a>
            <span aria-hidden="true" className="text-gray-300">
              |
            </span>
            <a
              href="/privacy-policy/"
              className="font-semibold text-primary hover:underline"
            >
              Privacy Policy
            </a>
          </div>
        </div>
      </footer>
    </main>
  );
}
