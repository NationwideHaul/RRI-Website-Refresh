import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, HeartHandshake, ShieldCheck, Users } from "lucide-react";
import { Hero } from "@/components/blocks/hero";
import { CTABanner } from "@/components/blocks/cta-banner";
import { SectionHeading } from "@/components/blocks/section-heading";
import { BreadcrumbListSchema } from "@/components/schema/breadcrumb-list";

export const metadata: Metadata = {
  title: "Who We Are",
  description:
    "Founded by Derek and Tracy Madon after years in trucking, Road Ready Insurance was built for operators who couldn't find an agency they could trust. Meet the team, the culture, and the ecosystem behind us.",
  alternates: { canonical: "/who-we-are/" },
};

const CULTURE = [
  {
    icon: HeartHandshake,
    title: "We back each other",
    body: "Mutual support isn't a poster on the wall. It's how the team actually runs, and it's why the person on your account never has to figure it out alone.",
  },
  {
    icon: Users,
    title: "Different strengths, on purpose",
    body: "Every agent here brings something the others don't. When we hire, we look for people who genuinely care about getting it right, not just closing a policy.",
  },
  {
    icon: ShieldCheck,
    title: "We take your risk seriously",
    body: "Running a fleet carries real exposure, and we treat it that way. No copy-paste policies, no shortcuts, the time it takes to get each account right.",
  },
];

const ECOSYSTEM = [
  { name: "Nationwide Haul", logo: "/images/partners/nationwide-haul.webp" },
  { name: "NFI Truck Sales", logo: "/images/partners/nfi.webp" },
  { name: "Nationwide Equipment Finance", logo: "/images/partners/nef.webp" },
  { name: "TCS Fuel Card", logo: "/images/partners/tcs-card.webp" },
  { name: "Roadside Masters", logo: "/images/partners/roadside-masters.webp" },
  { name: "RouteMate", logo: "/images/partners/routemate.webp" },
];

const AWARDS = [
  { src: "/images/awards/businessrate-best-of-2026.webp", alt: "BusinessRate Best of 2026" },
  { src: "/images/awards/businessrate-ranking-2026.webp", alt: "BusinessRate top-ranked insurance agency 2026" },
  { src: "/images/awards/geico-truck-partner.webp", alt: "GEICO commercial trucking partner" },
];

export default function WhoWeArePage() {
  return (
    <>
      <BreadcrumbListSchema
        items={[
          { name: "Home", href: "/" },
          { name: "Who We Are", href: "/who-we-are/" },
        ]}
      />

      <Hero
        eyebrow="Who we are"
        headline="Built by trucking people,"
        headlineMuted="for trucking people."
        subhead="We're not a call center that happens to sell trucking policies. Trucking is the only thing we do, which is exactly why we know the carriers, the filings, and what one bad claim can do to a growing operation."
        image={{ src: "/images/rri-team.jpg", alt: "The Road Ready Insurance team" }}
      />

      {/* Recognition, up top and with a little personality */}
      <section aria-labelledby="awards-heading" className="bg-background">
        <div className="mx-auto flex max-w-5xl flex-col items-center gap-8 px-6 py-16 lg:px-8 lg:py-20">
          <div className="flex max-w-2xl flex-col items-center gap-3 text-center">
            <p className="text-[13px] font-semibold capitalize tracking-normal text-primary">
              We&apos;ve got a little hardware
            </p>
            <h2 id="awards-heading" className="text-[28px] type-h2 text-ink sm:text-[34px]">
              We don&apos;t lead with awards. But since you&apos;re here&hellip;
            </h2>
            <p className="text-[16px] leading-[1.6] text-slate">
              BusinessRate ranked us, our partners have recognized us for years,
              and our clients keep the five-star reviews coming. We&apos;ll take it.
            </p>
          </div>
          <div className="grid grid-cols-1 items-center justify-items-center gap-8 sm:grid-cols-3">
            {AWARDS.map((a, i) => (
              <Image
                key={a.src}
                src={a.src}
                alt={a.alt}
                width={320}
                height={320}
                className={`h-auto w-full object-contain transition-transform duration-200 hover:-translate-y-1 hover:scale-105 ${
                  i === 1 ? "max-w-[300px]" : "max-w-[150px]"
                }`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Origin story */}
      <section aria-labelledby="story-heading" className="bg-gray-50">
        <div className="mx-auto flex max-w-3xl flex-col gap-6 px-6 py-20 lg:px-8 lg:py-24">
          <SectionHeading
            eyebrow="Where Road Ready came from"
            headline="Years in the industry,"
            headlineMuted="one problem that wouldn't go away."
            align="left"
          />
          <div className="flex flex-col gap-5 text-[17px] leading-[1.65] text-slate sm:text-[18px]">
            <p>
              Our roots go back to 2012, when the first of our sister companies
              opened its doors. Years of living inside the trucking industry taught
              Derek and Tracy Madon something they couldn&apos;t unsee: their
              clients could rarely find an insurance agency they actually trusted.
            </p>
            <p>
              The market was, and still is, crowded with agencies that pump out fast
              policies and five-minute quotes, the kind that look fine right up until
              there&apos;s an accident and the coverage isn&apos;t really there. They
              decided to build the opposite.
            </p>
            <p>
              Road Ready exists to take the risks of running a fleet as seriously as
              the operators who live them. That means coverage built around your
              actual operation, not a template, and the time it takes to get every
              account right.
            </p>
          </div>
        </div>
      </section>

      {/* The founders */}
      <section aria-labelledby="founders-heading" className="bg-background">
        <div className="mx-auto grid max-w-5xl grid-cols-1 items-center gap-8 px-6 py-20 sm:grid-cols-[180px_1fr] sm:gap-12 lg:px-8 lg:py-24">
          <div className="flex w-full max-w-[180px] flex-col gap-3">
            <div className="relative aspect-[4/5] w-full overflow-hidden rounded-2xl bg-gray-100 shadow-[0_18px_40px_-20px_rgba(10,37,64,0.35)]">
              <Image
                src="/images/derek-madon.jpg"
                alt="Derek Madon, co-founder of Road Ready Insurance"
                fill
                sizes="180px"
                className="object-cover"
              />
            </div>
            <p className="text-center text-[13px] text-slate-muted">
              Derek Madon, co-founder
            </p>
          </div>
          <div className="flex flex-col gap-4">
            <p className="text-[13px] font-semibold capitalize tracking-normal text-primary">
              The founders
            </p>
            <h2 id="founders-heading" className="text-[28px] type-h2 text-ink sm:text-[34px]">
              Derek &amp; Tracy Madon.
            </h2>
            <div className="flex flex-col gap-4 text-[16px] leading-[1.65] text-slate sm:text-[17px]">
              <p>
                After years in the industry, Derek and Tracy Madon kept running into
                the same wall on behalf of their clients: there was almost nowhere
                to send a fleet owner for insurance they could genuinely trust.
              </p>
              <p>
                So they started Road Ready to be that place, an agency that digs
                into the details, treats every operator&apos;s risk like it&apos;s
                their own, and measures success by how well you&apos;re protected
                when it actually counts, not by how fast a quote went out the door.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Culture */}
      <section aria-labelledby="culture-heading" className="bg-gray-50">
        <div className="mx-auto flex max-w-6xl flex-col gap-10 px-6 py-20 lg:px-8 lg:py-24">
          <div className="max-w-2xl">
            <SectionHeading
              eyebrow="Our culture"
              headline="A close team"
              headlineMuted="that actually has each other's backs."
              align="left"
            />
            <p className="mt-5 text-[17px] leading-[1.65] text-slate sm:text-[18px]">
              The way we treat each other inside Road Ready is the way we treat you:
              with respect, loyalty, and a lot of mutual support. We&apos;re a tight
              team, not a floor of interchangeable reps, and you feel that in every
              conversation.
            </p>
          </div>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {CULTURE.map((item) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.title}
                  className="flex h-full flex-col gap-4 rounded-2xl border border-gray-100 bg-white p-7 shadow-sm"
                >
                  <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-primary-soft">
                    <Icon className="h-5 w-5 text-primary" strokeWidth={1.75} />
                  </span>
                  <h3 className="text-[18px] font-semibold text-ink">{item.title}</h3>
                  <p className="text-[15px] leading-[1.6] text-slate">{item.body}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* The ecosystem */}
      <section aria-labelledby="ecosystem-heading" className="bg-background">
        <div className="mx-auto flex max-w-6xl flex-col gap-10 px-6 py-20 lg:px-8 lg:py-24">
          <div className="flex flex-col gap-6">
            <SectionHeading
              eyebrow="More than insurance"
              headline="A whole trucking ecosystem"
              headlineMuted="behind you."
              align="left"
            />
            <p className="max-w-2xl text-[17px] leading-[1.65] text-slate sm:text-[18px]">
              Insurance is just where we start. Through our sister companies, one
              relationship plugs you into equipment sales, financing, fuel savings,
              roadside support, and more, a network built for trucking instead of a
              pile of vendors who&apos;ve never sat in a cab.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
            {ECOSYSTEM.map((c) => (
              <div
                key={c.name}
                className="flex h-24 items-center justify-center rounded-2xl border border-gray-100 bg-white px-6 shadow-sm"
              >
                <Image
                  src={c.logo}
                  alt={c.name}
                  width={180}
                  height={56}
                  className="h-9 w-auto max-w-[150px] object-contain"
                />
              </div>
            ))}
          </div>
          <Link
            href="/client-perks/"
            className="inline-flex w-fit items-center gap-1.5 text-[15px] font-semibold text-primary transition-colors hover:text-primary-dark"
          >
            Explore the partner network
            <ArrowUpRight className="h-4 w-4" strokeWidth={2} />
          </Link>
        </div>
      </section>

      {/* Closing, an invitation rather than a hard sell */}
      <CTABanner
        headline="Put a face to the name."
        headlineMuted="Come talk trucking with us."
        subhead="We're real people who like this industry. Call us, and you'll reach someone who actually knows it."
        primaryCTA={{ text: "Talk to us", href: "/contact-us/" }}
        variant="primary"
      />
    </>
  );
}
