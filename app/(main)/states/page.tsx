import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, MapPin } from "lucide-react";
import { Reveal } from "@/components/blocks/reveal";
import { SectionHeading } from "@/components/blocks/section-heading";
import { CTABanner } from "@/components/blocks/cta-banner";
import { BreadcrumbListSchema } from "@/components/schema/breadcrumb-list";
import { STATES } from "@/content/states";
import { LICENSE_INFO, SITE } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Commercial Trucking Insurance by State",
  description:
    "Road Ready Insurance is a commercial trucking insurance broker licensed in 48 states plus DC. Explore state-specific coverage for your fleet.",
  alternates: { canonical: "/states/" },
  openGraph: {
    type: "website",
    title: "Commercial Trucking Insurance by State | Road Ready Insurance",
    description:
      "Licensed in 48 states plus DC, with access to 120+ carriers. Explore commercial trucking insurance by state.",
    url: `${SITE.url}/states/`,
    images: [SITE.logoPath],
  },
};

export default function StatesIndexPage() {
  return (
    <>
      <BreadcrumbListSchema
        items={[
          { name: "Home", href: "/" },
          { name: "States", href: "/states/" },
        ]}
      />

      {/* Hero */}
      <section
        aria-labelledby="states-hero-heading"
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
        <div className="relative z-10 mx-auto flex max-w-5xl flex-col gap-6 px-6 pb-16 pt-36 lg:px-8 lg:pb-24 lg:pt-44">
          <h1
            id="states-hero-heading"
            className="max-w-3xl text-[40px] type-display text-white sm:text-[52px] lg:text-[58px]"
          >
            Commercial trucking insurance,{" "}
            <span className="text-white/55">state by state.</span>
          </h1>
          <p className="max-w-2xl text-[17px] leading-[1.6] text-white/85 sm:text-[18px]">
            Road Ready Insurance is licensed in{" "}
            {LICENSE_INFO.statesLicensed} states plus the District of Columbia,
            with access to 120+ carriers including premium A-rated markets.
            Wherever your trucks run, we can place your coverage.
          </p>
        </div>
      </section>

      {/* Contained white panel */}
      <div className="bg-[#eef1f6] px-3 pb-3 pt-3 sm:px-5 sm:pb-5 sm:pt-5 lg:px-6 lg:pb-6 lg:pt-6">
        <div className="overflow-hidden rounded-4xl border border-gray-200/80 bg-background shadow-[0_1px_2px_rgba(10,37,64,0.04),0_16px_40px_-16px_rgba(10,37,64,0.14)]">
          <section className="bg-background">
            <div className="mx-auto flex max-w-5xl flex-col gap-10 px-6 py-16 lg:px-8 lg:py-20">
              <Reveal>
                <SectionHeading
                  eyebrow="States we cover"
                  headline="Find your state"
                  headlineMuted="and how we place it."
                />
              </Reveal>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {STATES.map((s, i) => (
                  <Reveal key={s.slug} delay={i * 60} className="h-full">
                    <Link
                      href={s.href}
                      className="group flex h-full items-center justify-between gap-4 rounded-2xl border border-gray-200 bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-primary/30 hover:shadow-md"
                    >
                      <span className="flex items-center gap-3">
                        <span className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-primary-soft">
                          <MapPin className="h-5 w-5 text-primary" strokeWidth={1.75} />
                        </span>
                        <span className="type-h3 text-[17px] text-ink">{s.name}</span>
                      </span>
                      <ArrowRight
                        className="h-4 w-4 text-slate transition-transform group-hover:translate-x-1 group-hover:text-primary"
                        strokeWidth={2}
                      />
                    </Link>
                  </Reveal>
                ))}
              </div>
              <p className="text-[14px] leading-[1.6] text-slate">
                Don&apos;t see your state? We&apos;re licensed in 48 states plus DC —{" "}
                <Link href="/contact-us/" className="text-primary underline-offset-2 hover:underline">
                  contact us
                </Link>{" "}
                and we&apos;ll place your coverage wherever your trucks run.
              </p>
            </div>
          </section>
        </div>
      </div>

      <CTABanner
        headline="Ready to insure your fleet?"
        subhead="Talk to an agent who specializes in trucking, wherever you operate."
        primaryCTA={{ text: "Start Your Quote", href: "/#quote-form" }}
        variant="primary"
      />
    </>
  );
}
