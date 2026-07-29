import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowRight, Check, MapPin, Phone } from "lucide-react";
import { Reveal } from "@/components/blocks/reveal";
import { WordReveal } from "@/components/blocks/word-reveal";
import { SectionHeading } from "@/components/blocks/section-heading";
import { FAQ } from "@/components/blocks/faq";
import { CTABanner } from "@/components/blocks/cta-banner";
import { BreadcrumbListSchema } from "@/components/schema/breadcrumb-list";
import { ServiceSchema } from "@/components/schema/service";
import { getStateBySlug } from "@/content/states";
import { STATE_DETAILS } from "@/content/states/details";
import { getCoverageBySlug } from "@/content/coverage";
import { NAP, SITE } from "@/lib/constants";

// Only the curated state slugs render; anything else 404s.
export const dynamicParams = false;

export function generateStaticParams() {
  return Object.keys(STATE_DETAILS).map((state) => ({ state }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ state: string }>;
}): Promise<Metadata> {
  const { state } = await params;
  const base = getStateBySlug(state);
  const detail = STATE_DETAILS[state];
  if (!base || !detail) return {};
  const title = `Commercial Trucking Insurance in ${base.name}`;
  return {
    title,
    description: detail.metaDescription,
    keywords: [
      `${base.name.toLowerCase()} commercial truck insurance`,
      `${base.name.toLowerCase()} trucking insurance`,
      "commercial trucking insurance",
      "fleet insurance",
      "truck insurance broker",
    ],
    alternates: { canonical: base.href },
    openGraph: {
      type: "article",
      title,
      description: detail.metaDescription,
      url: `${SITE.url}${base.href}`,
      images: [SITE.logoPath],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description: detail.metaDescription,
      images: [SITE.logoPath],
    },
  };
}

const SECTION = "mx-auto max-w-5xl px-6 lg:px-8";

export default async function StatePage({
  params,
}: {
  params: Promise<{ state: string }>;
}) {
  const { state } = await params;
  const base = getStateBySlug(state);
  const detail = STATE_DETAILS[state];
  if (!base || !detail) notFound();

  const coverages = detail.coverages
    .map((s) => getCoverageBySlug(s))
    .filter((c): c is NonNullable<typeof c> => Boolean(c));
  const hasRealPhone = !NAP.phone.startsWith("PLACEHOLDER_");

  return (
    <>
      <BreadcrumbListSchema
        items={[
          { name: "Home", href: "/" },
          { name: "States", href: "/states/" },
          { name: base.name, href: base.href },
        ]}
      />
      <ServiceSchema
        name={`Commercial Trucking Insurance in ${base.name}`}
        description={detail.metaDescription}
        slug={base.href}
        serviceType="Commercial Trucking Insurance"
      />

      {/* Hero — dark navy, matches coverage pages */}
      <section
        aria-labelledby="state-hero-heading"
        className="relative isolate -mt-24 overflow-hidden bg-primary-dark"
      >
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 z-0"
          style={{
            background:
              "radial-gradient(60% 80% at 78% 20%, rgba(0,255,252,0.14), transparent 60%), radial-gradient(70% 90% at 8% 90%, rgba(34,82,150,0.55), transparent 55%)",
          }}
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 z-[1] opacity-[0.22] mix-blend-overlay"
          style={{
            backgroundImage:
              "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='160'%3E%3Cfilter id='g'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23g)'/%3E%3C/svg%3E\")",
            backgroundSize: "160px 160px",
          }}
        />

        <div className="relative z-10 mx-auto flex max-w-5xl flex-col gap-7 px-6 pb-16 pt-36 lg:px-8 lg:pb-24 lg:pt-44">
          <span className="inline-flex w-fit items-center gap-2 rounded-full border border-white/20 bg-white/5 px-3 py-1 text-[13px] text-cyan">
            <MapPin className="h-3.5 w-3.5" strokeWidth={2} />
            {base.name}
          </span>
          <h1
            id="state-hero-heading"
            className="max-w-3xl text-[40px] type-display text-white sm:text-[52px] lg:text-[58px]"
          >
            <WordReveal
              segments={[
                { text: detail.h1 },
                ...(detail.heroMuted
                  ? [{ text: " " + detail.heroMuted, className: "text-white/55" }]
                  : []),
              ]}
            />
          </h1>
          <p className="max-w-2xl text-[17px] leading-[1.6] text-white/85 sm:text-[18px]">
            {detail.heroSubhead}
          </p>
          <div className="mt-2 flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4">
            <Link href="/#quote-form" className="btn bg-cyan text-primary-dark hover:bg-white">
              Start Your Quote
            </Link>
            {hasRealPhone && (
              <a
                href={`tel:${NAP.phone}`}
                className="inline-flex items-center gap-2 text-[14px] text-white/70 transition-colors hover:text-cyan"
              >
                <Phone className="h-4 w-4" strokeWidth={1.75} />
                Call {NAP.phoneDisplay}
              </a>
            )}
          </div>
        </div>
      </section>

      {/* Contained white panel */}
      <div className="bg-[#eef1f6] px-3 pb-3 pt-3 sm:px-5 sm:pb-5 sm:pt-5 lg:px-6 lg:pb-6 lg:pt-6">
        <div className="overflow-hidden rounded-4xl border border-gray-200/80 bg-background shadow-[0_1px_2px_rgba(10,37,64,0.04),0_16px_40px_-16px_rgba(10,37,64,0.14)]">

          {/* Answer-first "In short" callout (GEO) */}
          <section aria-label="In short" className="bg-background">
            <div className={`${SECTION} pt-16 lg:pt-20`}>
              <Reveal>
                <div className="rounded-2xl border border-gray-200 bg-primary-soft/60 p-6 lg:p-8">
                  <p className="mb-2 text-[12px] font-semibold capitalize tracking-normal text-primary">
                    In short
                  </p>
                  <p className="text-[18px] leading-[1.6] text-ink sm:text-[20px]">
                    {detail.quickAnswer}
                  </p>
                </div>
              </Reveal>
            </div>
          </section>

          {/* Intro */}
          <section className="bg-background">
            <div className={`${SECTION} flex flex-col gap-5 py-16 lg:py-20`}>
              {detail.intro.map((p, i) => (
                <Reveal key={i} delay={i * 80}>
                  <p className="text-[16px] leading-[1.65] text-gray-700 sm:text-[17px]">{p}</p>
                </Reveal>
              ))}
            </div>
          </section>

          {/* Freight hubs */}
          <section
            aria-labelledby="state-hubs-heading"
            className="border-t border-gray-100 bg-gray-50"
          >
            <div className={`${SECTION} flex flex-col gap-10 py-16 lg:py-20`}>
              <Reveal>
                <SectionHeading
                  eyebrow={`${base.name} freight`}
                  headline="Where your trucks"
                  headlineMuted="actually run."
                />
              </Reveal>
              <ul className="grid grid-cols-1 gap-x-6 gap-y-4 sm:grid-cols-2">
                {detail.freightHubs.map((item, i) => (
                  <Reveal key={item} delay={i * 70}>
                    <li className="flex h-full items-start gap-3.5 rounded-2xl border border-gray-100 bg-white p-5">
                      <span className="mt-0.5 inline-flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-primary-soft">
                        <MapPin className="h-3.5 w-3.5 text-primary" strokeWidth={2.5} />
                      </span>
                      <span className="text-[15px] leading-[1.55] text-gray-700 sm:text-[16px]">
                        {item}
                      </span>
                    </li>
                  </Reveal>
                ))}
              </ul>
            </div>
          </section>

          {/* Requirements */}
          <section aria-labelledby="state-req-heading" className="bg-background">
            <div className={`${SECTION} flex flex-col gap-8 py-16 lg:py-20`}>
              <Reveal>
                <SectionHeading
                  eyebrow="Filings & requirements"
                  headline="What it takes to run"
                  headlineMuted={`legal in ${base.name}.`}
                />
              </Reveal>
              <ul className="flex flex-col gap-4">
                {detail.requirements.map((item, i) => (
                  <Reveal key={i} delay={i * 70}>
                    <li className="flex items-start gap-3.5">
                      <span className="mt-0.5 inline-flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-primary-soft">
                        <Check className="h-3.5 w-3.5 text-primary" strokeWidth={2.5} />
                      </span>
                      <span className="text-[16px] leading-[1.6] text-gray-700 sm:text-[17px]">
                        {item}
                      </span>
                    </li>
                  </Reveal>
                ))}
              </ul>
              <p className="text-[13px] leading-[1.6] text-slate">
                This is general guidance, not legal advice. We confirm the exact filings and
                limits your operation needs before you bind.
              </p>
            </div>
          </section>

          {/* Relevant coverages */}
          <section
            aria-labelledby="state-coverage-heading"
            className="border-t border-gray-100 bg-gray-50"
          >
            <div className={`${SECTION} flex flex-col gap-10 py-16 lg:py-20`}>
              <Reveal>
                <SectionHeading
                  eyebrow="Coverage"
                  headline={`Coverage ${base.name} fleets`}
                  headlineMuted="ask about most."
                />
              </Reveal>
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                {coverages.map((c, i) => {
                  const CIcon = c.icon;
                  return (
                    <Reveal key={c.slug} delay={i * 80} className="h-full">
                      <Link
                        href={c.href}
                        className="group flex h-full items-stretch gap-4 rounded-2xl border border-gray-200 bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-primary/30 hover:shadow-md"
                      >
                        <span className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl bg-primary-soft">
                          <CIcon className="h-6 w-6 text-primary" strokeWidth={1.5} />
                        </span>
                        <span className="flex flex-1 flex-col justify-center gap-1">
                          <span className="type-h3 text-[17px] text-ink">{c.name}</span>
                          <span className="line-clamp-2 text-[13px] leading-[1.5] text-slate">
                            {c.short}
                          </span>
                        </span>
                      </Link>
                    </Reveal>
                  );
                })}
              </div>
              <Reveal>
                <Link href="/coverage/" className="btn btn-outline">
                  See all coverage options
                  <ArrowRight className="h-4 w-4" strokeWidth={2} />
                </Link>
              </Reveal>
            </div>
          </section>

          {/* Why RRI */}
          <section aria-labelledby="state-why-heading" className="relative isolate overflow-hidden bg-primary-dark">
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 z-0 opacity-70"
              style={{
                background:
                  "radial-gradient(50% 70% at 85% 15%, rgba(0,255,252,0.10), transparent 60%)",
              }}
            />
            <div className={`${SECTION} relative z-10 flex flex-col gap-6 py-16 lg:py-20`}>
              <Reveal>
                <SectionHeading
                  eyebrow={`Why Road Ready in ${base.name}`}
                  headline="The difference is how"
                  headlineMuted="we place it."
                  variant="dark"
                />
              </Reveal>
              <div className="flex flex-col gap-5">
                {detail.whyRRI.map((p, i) => (
                  <Reveal key={i} delay={i * 80}>
                    <p className="text-[16px] leading-[1.65] text-white/80 sm:text-[17px]">{p}</p>
                  </Reveal>
                ))}
              </div>
            </div>
          </section>

          {/* FAQ (emits FAQPageSchema) */}
          <section aria-labelledby="state-faq-heading" className="bg-background">
            <div className={`${SECTION} flex flex-col gap-8 py-16 lg:py-20`}>
              <Reveal>
                <SectionHeading
                  eyebrow="Common questions"
                  headline={`${base.name} trucking insurance,`}
                  headlineMuted="answered."
                />
              </Reveal>
              <FAQ items={detail.faqs} />
            </div>
          </section>
        </div>
      </div>

      <CTABanner
        headline={`Ready to insure your ${base.name} fleet?`}
        subhead="Talk to an agent who specializes in trucking. We review your operation and place coverage with no gaps and no padding."
        primaryCTA={{ text: "Start Your Quote", href: "/#quote-form" }}
        variant="primary"
      />
    </>
  );
}
