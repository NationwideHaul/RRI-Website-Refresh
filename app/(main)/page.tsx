import Image from "next/image";
import { Star } from "lucide-react";
import { FluidGradient } from "@/components/blocks/fluid-gradient";
import { FAQ } from "@/components/blocks/faq";
import { QuoteForm } from "@/components/blocks/quote-form";
import { SectionHeading } from "@/components/blocks/section-heading";
import { MarketsBand } from "@/components/blocks/markets-band";
import { CoverageExpander } from "@/components/blocks/coverage-expander";
import { GoogleReviews } from "@/components/blocks/google-reviews";
import { AboutAgency } from "@/components/blocks/about-agency";
import { CoverageSlider } from "@/components/blocks/coverage-slider";
import { ResourceCards } from "@/components/blocks/resource-cards";
import { PolicyReviewCta } from "@/components/blocks/policy-review-cta";
import { Reveal } from "@/components/blocks/reveal";
import { InsuranceAgencySchema } from "@/components/schema/insurance-agency";
import type { FAQItem } from "@/components/schema/faq-page";
import { REVIEWS_SUMMARY, REVIEWS_URL } from "@/content/reviews";
import { GoogleG } from "@/components/blocks/google-g";

const AGENT_AVATARS = [
  "/images/avatars/agent-1.jpg",
  "/images/avatars/agent-2.jpg",
  "/images/avatars/agent-3.jpg",
];

const FAQS: FAQItem[] = [
  {
    question: "How long does it take to get a commercial trucking insurance quote?",
    answer:
      "For secondary market quotes, 24 to 48 hours from the time we receive your submission. For placement with premium A-rated carriers, 1 to 2 weeks is typical. The extra time is how we access better markets. The fast-quote model does not reach those carriers.",
  },
  {
    question: "What carriers does Road Ready Insurance work with?",
    answer:
      "We have appointments with 100+ commercial trucking insurance carriers, including premium A-rated markets that most small brokers cannot access. When we build your submission, we place you with the carriers that match your operation, not just the ones that respond fastest.",
  },
  {
    question: "Does Road Ready Insurance work with new trucking authorities or only established fleets?",
    answer:
      "We specialize in fleets that are 2 years or more in business and growing steadily. For brand-new authorities, we can often help, but the best fit for our markets is an operator who has built some track record. If you are just starting, the Startup Guide is a good place to begin, and we can discuss your specific situation.",
  },
  {
    question: "What states does Road Ready Insurance operate in?",
    answer:
      "We are licensed in 48 states plus the District of Columbia. Our offices are in Boca Raton, Florida, and we work with fleets across the United States, including Florida, Georgia, Texas, New Jersey, North Carolina, and many more.",
  },
  {
    question: "How does claim handling work at Road Ready Insurance?",
    answer:
      "We have an in-house licensed claims adjuster on staff. When you file a claim, it is handled directly by our team, not routed to a call center or third-party administrator. Your named agent stays involved throughout the process.",
  },
  {
    question: "How is Road Ready Insurance different from fast-quote digital brokers?",
    answer:
      "Fast-quote brokers work from a limited pool of secondary markets, which is how they return quotes in minutes. Road Ready Insurance places coverage with the premium A-rated carriers that serious fleet operators want. Those carriers do not quote in minutes. We are built for operators who prioritize correct coverage and carrier quality over turnaround speed.",
  },
];

export default function HomePage() {
  return (
    <>
      <InsuranceAgencySchema />

      {/* Hero (reference design): interactive fluid-gradient backdrop under
          the white nav, white headline with a cyan marker highlight, trust
          row, and the glass "Speak with an Expert Today" form. Carrier logos
          live in the MarketsBand below (gray treatment on white). */}
      <section
        id="hero"
        aria-labelledby="hero-heading"
        className="relative isolate -mt-24 overflow-hidden bg-primary-dark"
      >
        <FluidGradient />

        {/* Film-grain overlay on top of the fluid gradient — fine fractal
            noise blended so it reads as a subtle textured surface, not flat. */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 z-[1] opacity-30 mix-blend-overlay"
          style={{
            backgroundImage:
              "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='160'%3E%3Cfilter id='g'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23g)'/%3E%3C/svg%3E\")",
            backgroundSize: "160px 160px",
          }}
        />

        <div className="relative z-10 mx-auto grid max-w-7xl grid-cols-1 gap-10 px-6 pb-16 pt-32 lg:grid-cols-12 lg:items-center lg:gap-8 lg:px-8 lg:pb-24 lg:pt-40">
          <div className="flex flex-col gap-7 lg:col-span-6">
            <h1
              id="hero-heading"
              className="text-[42px] type-display text-white sm:text-[54px] lg:text-[60px]"
            >
              Made for fleets
              <br />
              that{" "}
              <span className="relative inline-block">
                <span className="relative z-10">protects</span>
                {/* Hand-drawn circle annotation, drawn in on load */}
                <svg
                  aria-hidden="true"
                  viewBox="0 0 320 130"
                  preserveAspectRatio="none"
                  className="pointer-events-none absolute left-1/2 top-1/2 z-0 h-[150%] w-[122%] -translate-x-1/2 -translate-y-1/2 overflow-visible text-cyan"
                >
                  <path
                    d="M42 78 C18 46 92 22 168 23 C252 24 300 50 288 80 C278 106 190 118 116 112 C52 107 16 88 30 58 C37 43 54 35 82 31"
                    pathLength={1}
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={4}
                    strokeLinecap="round"
                    vectorEffect="non-scaling-stroke"
                    className="rri-draw-circle"
                  />
                </svg>
              </span>{" "}
              what
              <br />
              you&apos;ve built.
            </h1>

            <p className="max-w-xl text-[15px] leading-[1.65] text-white/85 sm:text-[16px]">
              Commercial trucking insurance specialists with access to the top
              markets in the industry, and agents who work exclusively with
              fleet operators.
            </p>

            {/* Trust row — two symmetric columns, all-white on the photo:
                left = live Google rating (links to the GBP so it reads
                legit), right = 48+ states with Premium Customer Service
                stacked beneath. */}
            <div className="mt-8 flex flex-wrap items-stretch gap-x-10 gap-y-6 [text-shadow:0_1px_2px_rgba(0,0,0,0.35)]">
              <a
                href={REVIEWS_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex flex-col justify-between gap-3"
                aria-label={`${REVIEWS_SUMMARY.rating.toFixed(1)} stars from ${REVIEWS_SUMMARY.count} Google reviews — read them on Google`}
              >
                <div className="flex items-center gap-2">
                  <GoogleG className="h-4 w-4 drop-shadow" />
                  <span className="flex items-center gap-0.5" aria-hidden="true">
                    {Array.from({ length: 5 }, (_, i) => (
                      <Star
                        key={i}
                        className="h-4 w-4 fill-amber-400 text-amber-400"
                        strokeWidth={0}
                      />
                    ))}
                  </span>
                  <span className="text-[12px] text-white/90 underline-offset-2 group-hover:underline">
                    ({REVIEWS_SUMMARY.count} reviews)
                  </span>
                </div>
                <div className="flex items-end gap-2.5">
                  <span className="text-[38px] font-bold leading-none text-white">
                    {REVIEWS_SUMMARY.rating.toFixed(1)}
                  </span>
                  <span className="max-w-[150px] text-[12px] leading-tight text-white/90">
                    Positive Reviews From Our Customers
                  </span>
                </div>
              </a>

              <span aria-hidden="true" className="hidden w-px self-stretch bg-white/40 sm:block" />

              <div className="flex flex-col justify-between gap-3">
                <div className="flex items-end gap-2.5">
                  <span className="text-[26px] font-bold leading-none text-white">
                    48+
                  </span>
                  <span className="max-w-[130px] text-[12px] leading-tight text-white/90">
                    Licensed across United States
                  </span>
                </div>
                <div className="flex items-center gap-2.5">
                  <span className="flex -space-x-2">
                    {AGENT_AVATARS.map((src, i) => (
                      <Image
                        key={src}
                        src={src}
                        alt={`Road Ready customer service agent ${i + 1}`}
                        width={32}
                        height={32}
                        className="h-8 w-8 rounded-full border-2 border-white object-cover"
                      />
                    ))}
                  </span>
                  <span className="max-w-[130px] text-[12px] leading-tight text-white/90">
                    Premium Customer Service
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div
            id="quote-form"
            className="relative w-full max-w-[520px] lg:col-span-6 lg:col-start-7 lg:justify-self-center"
          >
            <QuoteForm variant="glass" />
          </div>
        </div>
      </section>

      {/* All market logos, uniform white, on the dark blue band */}
      <MarketsBand />

      {/* Everything from the coverages section through the policy-review CTA
          lives inside a rounded, bordered white panel floating on a light gray
          backdrop — Stripe's contained-page look. Footer sits below it. */}
      <div className="bg-[#eef1f6] px-3 pb-3 pt-3 sm:px-5 sm:pb-5 sm:pt-5 lg:px-6 lg:pb-6 lg:pt-6">
        <div className="overflow-hidden rounded-4xl border border-gray-200/80 bg-background shadow-[0_1px_2px_rgba(10,37,64,0.04),0_16px_40px_-16px_rgba(10,37,64,0.14)]">

      {/* Expanding panels: what working with Road Ready Insurance actually gets you */}
      <section
        id="coverages"
        aria-labelledby="coverages-heading"
        className="bg-background"
      >
        <div className="mx-auto flex max-w-7xl flex-col px-6 py-20 lg:px-8 lg:py-24">
          <Reveal>
            <CoverageExpander
              headline="Every coverage"
              headlineMuted="a trucking operation needs."
              subhead="From first quote to claim day, everything is built around fleet operators."
            />
          </Reveal>
        </div>
      </section>

      {/* Live Google Business Profile reviews */}
      <GoogleReviews />

      {/* The coverage types as condensed light cards in a horizontal scroll.
          White here divides it from the gray reviews section above. */}
      <section
        id="coverage-options"
        aria-labelledby="coverage-slider-heading"
        className="bg-background"
      >
        <div className="mx-auto flex max-w-7xl flex-col px-6 pb-20 pt-28 lg:px-8 lg:pb-24 lg:pt-36">
          <Reveal>
            <CoverageSlider />
          </Reveal>
        </div>
      </section>

      {/* About panel with the Road Ready Insurance team photo */}
      <AboutAgency />

      {/* Stripe-style resource promos */}
      <ResourceCards />

      <section
        id="faq"
        aria-labelledby="faq-heading"
        className="bg-background"
      >
        <div className="mx-auto flex max-w-4xl flex-col gap-8 px-6 py-12 lg:px-8 lg:py-16">
          <Reveal>
            <SectionHeading
              headline="Straight answers"
              headlineMuted="to the questions fleet owners ask."
              align="left"
            />
          </Reveal>
          <FAQ items={FAQS} />
        </div>
      </section>

      {/* Policy-review CTA (the "switch to us" moment) */}
      <PolicyReviewCta />
        </div>
      </div>
    </>
  );
}
