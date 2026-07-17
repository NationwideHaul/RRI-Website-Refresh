import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Check, Phone } from "lucide-react";
import { Reveal } from "@/components/blocks/reveal";
import { WordReveal } from "@/components/blocks/word-reveal";
import { SectionHeading } from "@/components/blocks/section-heading";
import { FAQ } from "@/components/blocks/faq";
import { FillPhoto } from "@/components/blocks/fill-photo";
import { CTABanner } from "@/components/blocks/cta-banner";
import { BreadcrumbListSchema } from "@/components/schema/breadcrumb-list";
import { ServiceSchema } from "@/components/schema/service";
import { getCoverageBySlug } from "@/content/coverage";
import { COVERAGE_DETAILS } from "@/content/coverage/details";
import { NAP, SITE } from "@/lib/constants";

// Only the 11 coverage slugs are valid here; every other top-level path is
// either a static route (careers, client-perks, …) or a genuine 404.
export const dynamicParams = false;

export function generateStaticParams() {
  return Object.keys(COVERAGE_DETAILS).map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const base = getCoverageBySlug(slug);
  const detail = COVERAGE_DETAILS[slug];
  if (!base || !detail) return {};
  const title = `${base.name} Insurance, Road Ready Insurance`;
  const ogImage = detail.illustration ?? SITE.logoPath;
  return {
    title: `${base.name} Insurance`,
    description: detail.metaDescription,
    keywords: [
      `${base.name.toLowerCase()} insurance`,
      "commercial trucking insurance",
      "trucking insurance",
      "fleet insurance",
      base.name.toLowerCase(),
    ],
    alternates: { canonical: base.href },
    openGraph: {
      type: "article",
      title,
      description: detail.metaDescription,
      url: `${SITE.url}${base.href}`,
      images: [ogImage],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description: detail.metaDescription,
      images: [ogImage],
    },
  };
}

// One shared content width for every section → consistent side gutters.
const SECTION = "mx-auto max-w-5xl px-6 lg:px-8";

export default async function CoverageDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const base = getCoverageBySlug(slug);
  const detail = COVERAGE_DETAILS[slug];
  if (!base || !detail) notFound();

  const Icon = base.icon;
  const related = detail.related
    .map((s) => getCoverageBySlug(s))
    .filter((c): c is NonNullable<typeof c> => Boolean(c));
  const hasRealPhone = !NAP.phone.startsWith("PLACEHOLDER_");

  return (
    <>
      <BreadcrumbListSchema
        items={[
          { name: "Home", href: "/" },
          { name: "Coverage", href: "/coverage/" },
          { name: base.name, href: base.href },
        ]}
      />
      <ServiceSchema
        name={`${base.name} Insurance`}
        description={detail.metaDescription}
        slug={base.href}
      />

      {/* ---------- Hero: dark navy, echoing the homepage. Paper-craft
          illustration floats in a light card on the right; the film-grain
          overlay ties it to the home hero surface. ---------- */}
      <section
        aria-labelledby="coverage-hero-heading"
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

        <div className="relative z-10 mx-auto grid max-w-7xl grid-cols-1 items-center gap-12 px-6 pb-16 pt-36 lg:grid-cols-12 lg:gap-8 lg:px-8 lg:pb-24 lg:pt-44">
          <div className="flex flex-col gap-7 lg:col-span-7">
            <h1
              id="coverage-hero-heading"
              className="max-w-2xl text-[40px] type-display text-white sm:text-[52px] lg:text-[58px]"
            >
              <WordReveal
                segments={[
                  { text: detail.h1 },
                  ...(detail.heroMuted
                    ? [{ text: detail.heroMuted, className: "text-white/55" }]
                    : []),
                ]}
              />
            </h1>

            <p className="max-w-xl text-[17px] leading-[1.6] text-white/85 sm:text-[18px]">
              {detail.heroSubhead}
            </p>

            <div className="mt-2 flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4">
              <Link href="/#quote-form" className="btn bg-cyan text-primary-dark hover:bg-white">
                Start Your Quote
              </Link>
              <Link
                href="/who-we-are/"
                className="btn border-[1.5px] border-white/60 bg-transparent text-white hover:bg-white hover:text-primary-dark"
              >
                See what sets us apart
              </Link>
            </div>

            {hasRealPhone && (
              <a
                href={`tel:${NAP.phone}`}
                className="inline-flex items-center gap-2 text-[14px] text-white/70 transition-colors hover:text-cyan"
              >
                <Phone className="h-4 w-4" strokeWidth={1.75} />
                Prefer to talk it through? Call {NAP.phoneDisplay}
              </a>
            )}
          </div>

          <div className="lg:col-span-5 lg:justify-self-end">
            {detail.illustration ? (
              <div className="rri-float mx-auto w-full max-w-[380px] overflow-hidden rounded-4xl bg-white p-3 shadow-[0_30px_80px_-24px_rgba(0,0,0,0.55)] ring-1 ring-white/10">
                <Image
                  src={detail.illustration}
                  alt={`${base.name} insurance, illustration`}
                  width={760}
                  height={760}
                  priority
                  className="h-auto w-full rounded-3xl"
                />
              </div>
            ) : (
              <div className="rri-float mx-auto flex aspect-square w-full max-w-[340px] items-center justify-center rounded-4xl bg-white/[0.06] ring-1 ring-white/12">
                <Icon className="h-28 w-28 text-cyan" strokeWidth={1} />
              </div>
            )}
          </div>
        </div>
      </section>

      {/* ---------- Contained white panel (Stripe look, matches home) ---------- */}
      <div className="bg-[#eef1f6] px-3 pb-3 pt-3 sm:px-5 sm:pb-5 sm:pt-5 lg:px-6 lg:pb-6 lg:pt-6">
        <div className="overflow-hidden rounded-4xl border border-gray-200/80 bg-background shadow-[0_1px_2px_rgba(10,37,64,0.04),0_16px_40px_-16px_rgba(10,37,64,0.14)]">

          {/* Answer-first "In short" callout, a concise, citable definition
              (GEO: AI engines lift these straight into answers). */}
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

          {/* What it covers */}
          <section aria-labelledby="what-it-covers-heading" className="bg-background">
            <div className={`${SECTION} flex flex-col gap-10 py-16 lg:py-20`}>
              <Reveal>
                <SectionHeading
                  eyebrow="What it covers"
                  headline="The protection this policy"
                  headlineMuted="actually puts in place."
                />
              </Reveal>
              <ul className="grid grid-cols-1 gap-x-6 gap-y-4 sm:grid-cols-2">
                {detail.whatItCovers.map((item, i) => (
                  <Reveal key={item} delay={i * 70}>
                    <li className="flex h-full items-start gap-3.5 rounded-2xl border border-gray-100 bg-gray-50/60 p-5">
                      <span className="mt-0.5 inline-flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-primary-soft">
                        <Check className="h-3.5 w-3.5 text-primary" strokeWidth={2.5} />
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

          {/* Who needs it, text + supporting photo */}
          <section
            aria-labelledby="who-needs-it-heading"
            className="border-t border-gray-100 bg-gray-50"
          >
            <div className={`${SECTION} py-16 lg:py-20`}>
              <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-2">
                <div className="flex flex-col gap-6">
                  <Reveal>
                    <SectionHeading
                      eyebrow="Who needs it"
                      headline="Is this coverage"
                      headlineMuted="for your operation?"
                    />
                  </Reveal>
                  <div className="flex flex-col gap-5">
                    {detail.whoNeedsIt.map((p, i) => (
                      <Reveal key={i} delay={i * 80}>
                        <p className="text-[16px] leading-[1.65] text-gray-700 sm:text-[17px]">{p}</p>
                      </Reveal>
                    ))}
                  </div>
                </div>
                {detail.photo && (
                  <Reveal delay={120}>
                    <div className="relative aspect-[4/3] overflow-hidden rounded-3xl shadow-sm">
                      <FillPhoto
                        src={detail.photo.src}
                        alt={detail.photo.alt}
                        sizes="(min-width: 1024px) 45vw, 100vw"
                      />
                    </div>
                  </Reveal>
                )}
              </div>
            </div>
          </section>

          {/* Why Road Ready, accent band */}
          <section aria-labelledby="why-rri-heading" className="relative isolate overflow-hidden bg-primary-dark">
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
                  eyebrow={`Why Road Ready for ${base.name.toLowerCase()}`}
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

          {/* FAQ */}
          <section aria-labelledby="coverage-faq-heading" className="bg-background">
            <div className={`${SECTION} flex flex-col gap-8 py-16 lg:py-20`}>
              <Reveal>
                <SectionHeading
                  eyebrow="Common questions"
                  headline="Straight answers on"
                  headlineMuted={base.name.toLowerCase() + "."}
                />
              </Reveal>
              <FAQ items={detail.faqs} />
            </div>
          </section>

          {/* Related coverages, home-style cards (title + thumbnail) */}
          <section aria-labelledby="related-heading" className="border-t border-gray-100 bg-gray-50">
            <div className={`${SECTION} flex flex-col gap-10 py-16 lg:py-20`}>
              <Reveal>
                <SectionHeading
                  eyebrow="Related coverage"
                  headline="Coverages that often"
                  headlineMuted="ride alongside this one."
                />
              </Reveal>
              <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                {related.map((c, i) => {
                  const CIcon = c.icon;
                  return (
                    <Reveal key={c.slug} delay={i * 80} className="h-full">
                      <Link
                        href={c.href}
                        className="group flex h-full items-stretch gap-4 rounded-2xl border border-gray-200 bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-primary/30 hover:shadow-md"
                      >
                        <span className="flex flex-1 flex-col justify-center gap-2">
                          <span className="type-h3 text-[17px] text-ink">{c.name}</span>
                          <span className="line-clamp-2 text-[13px] leading-[1.5] text-slate">
                            {c.short}
                          </span>
                        </span>
                        <span className="relative flex aspect-square h-[72px] shrink-0 items-center justify-center self-center overflow-hidden rounded-xl bg-primary-soft">
                          {c.image ? (
                            /* eslint-disable-next-line @next/next/no-img-element */
                            <img src={c.image} alt="" aria-hidden="true" className="h-full w-full object-cover" />
                          ) : (
                            <CIcon className="h-8 w-8 text-primary" strokeWidth={1.5} />
                          )}
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
        </div>
      </div>

      <CTABanner
        headline={`Ready to review your ${base.name.toLowerCase()}?`}
        subhead="Talk to an agent who specializes in trucking. We will review your operation and place coverage with no gaps and no padding."
        primaryCTA={{ text: "Start Your Quote", href: "/#quote-form" }}
        variant="primary"
      />
    </>
  );
}
