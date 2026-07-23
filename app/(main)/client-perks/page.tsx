import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Hero } from "@/components/blocks/hero";
import { Reveal } from "@/components/blocks/reveal";
import { SectionHeading } from "@/components/blocks/section-heading";
import { CTABanner } from "@/components/blocks/cta-banner";
import { BreadcrumbListSchema } from "@/components/schema/breadcrumb-list";

export const metadata: Metadata = {
  title: "Partner Network",
  description:
    "Road Ready clients get access to vetted trucking partners, fuel savings, equipment financing, truck and trailer sales, roadside assistance, fleet management, and compliance.",
  alternates: { canonical: "/client-perks/" },
};

type Partner = {
  name: string;
  /** Logo under /public. When omitted, the name renders as a text wordmark. */
  logo?: string;
  description: string;
  href: string;
  external: boolean;
  linkLabel: string;
};

const PARTNERS: Partner[] = [
  {
    name: "Nationwide Haul",
    logo: "/images/partners/nationwide-haul.webp",
    description: "New and used semi-trailer sales, rentals, and leasing, nationwide.",
    href: "https://nationwidehaul.com",
    external: true,
    linkLabel: "nationwidehaul.com",
  },
  {
    name: "NFI Truck Sales",
    logo: "/images/partners/nfi.webp",
    description: "A wide selection of fleet-maintained used semi-trucks, sleepers and day cabs.",
    href: "https://nfitrucksales.com",
    external: true,
    linkLabel: "nfitrucksales.com",
  },
  {
    name: "Nationwide Equipment Finance",
    logo: "/images/partners/nef.webp",
    description: "Flexible financing to acquire the equipment that drives your business forward.",
    href: "https://www.nefnow.com/",
    external: true,
    linkLabel: "nefnow.com",
  },
  {
    name: "TCS Fuel Card",
    logo: "/images/partners/tcs-card.webp",
    description: "Save on diesel at 2,000+ locations with zero fees and real-time discounts.",
    href: "/free-fuel-card/",
    external: false,
    linkLabel: "Learn more",
  },
  {
    name: "Roadside Masters",
    logo: "/images/partners/roadside-masters.webp",
    description: "24/7 roadside assistance, towing, and tire repair with nationwide coverage.",
    href: "https://www.roadsidemasters.com/signup-truck.php?r=RoadReadyInsurance",
    external: true,
    linkLabel: "roadsidemasters.com",
  },
  {
    name: "RouteMate",
    logo: "/images/partners/routemate.webp",
    description: "A modern fleet management platform for efficient, safe, and compliant operations.",
    href: "https://routemate.us",
    external: true,
    linkLabel: "routemate.us",
  },
  {
    name: "Total Insight Professional Services",
    logo: "/images/partners/tips.webp",
    description: "State & federal compliance solutions for motor carriers nationwide.",
    href: "/tips/",
    external: false,
    linkLabel: "Learn more",
  },
  {
    name: "Cherry Trader",
    logo: "/images/partners/cherry-trader.webp",
    description: "A trusted digital marketplace built for buying and selling commercial trucks and equipment with transparency and confidence.",
    href: "https://www.cherrytrader.com",
    external: true,
    linkLabel: "cherrytrader.com",
  },
  {
    name: "Oakwood Equipment Finance",
    logo: "/images/partners/oakwood.png",
    description: "A direct transportation lender with flexible terms, dedicated to semi-trailer loans and leases across the country.",
    href: "https://www.oakwoodef.com",
    external: true,
    linkLabel: "oakwoodef.com",
  },
];

function PartnerCard({ partner, delay }: { partner: Partner; delay: number }) {
  const linkProps = partner.external
    ? { href: partner.href, target: "_blank" as const, rel: "noopener noreferrer" }
    : { href: partner.href };

  return (
    <Reveal delay={delay} className="h-full">
      <Link
        {...linkProps}
        className="group flex h-full flex-col gap-4 rounded-2xl border border-white/70 bg-white/55 p-6 shadow-[0_10px_30px_-12px_rgba(10,37,64,0.18)] ring-1 ring-black/[0.04] backdrop-blur-xl transition-all duration-200 hover:-translate-y-1 hover:bg-white/75 hover:shadow-[0_18px_44px_-14px_rgba(10,37,64,0.26)]"
      >
        <div className="flex h-14 items-center justify-between gap-3">
          {partner.logo ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={partner.logo}
              alt={partner.name}
              className="max-h-12 w-auto max-w-[180px] object-contain object-left"
            />
          ) : (
            <span className="text-[19px] font-bold leading-tight text-primary">
              {partner.name}
            </span>
          )}
          <ArrowUpRight
            className="h-5 w-5 shrink-0 text-gray-300 transition-all group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-primary"
            strokeWidth={2}
          />
        </div>
        <p className="flex-1 text-[15px] leading-[1.6] text-gray-700">{partner.description}</p>
        <span className="text-[13px] font-semibold normal-case tracking-normal text-primary">
          {partner.linkLabel}
        </span>
      </Link>
    </Reveal>
  );
}

export default function PartnerNetworkPage() {
  return (
    <>
      <BreadcrumbListSchema
        items={[
          { name: "Home", href: "/" },
          { name: "Partner Network", href: "/client-perks/" },
        ]}
      />

      <Hero
        centered
        eyebrow="Partner network"
        headline="More than a policy,"
        headlineMuted="a network behind your fleet."
        subhead="Vetted trucking partners that help your operation run better: fuel, financing, equipment, roadside, and compliance."
      />

      <section aria-labelledby="partners-heading" className="relative isolate overflow-hidden bg-background">
        {/* Soft brand blobs give the glass cards something to frost over */}
        <div aria-hidden="true" className="pointer-events-none absolute -left-24 top-20 h-80 w-80 rounded-full bg-primary/10 blur-3xl" />
        <div aria-hidden="true" className="pointer-events-none absolute right-0 top-1/3 h-72 w-72 rounded-full bg-cyan/10 blur-3xl" />
        <div aria-hidden="true" className="pointer-events-none absolute bottom-8 left-1/3 h-80 w-80 rounded-full bg-primary/[0.07] blur-3xl" />
        <div className="relative z-10 mx-auto flex max-w-7xl flex-col gap-10 px-6 py-16 lg:px-8 lg:py-20">
          <Reveal>
            <SectionHeading
              eyebrow="The network"
              headline="Trusted partners,"
              headlineMuted="one call away."
            />
          </Reveal>
          <Reveal>
            <p className="max-w-3xl text-[17px] leading-[1.65] text-slate sm:text-[18px]">
              Our goal at Road Ready is not just to sell or place insurance. It is
              to make sure you are operating your company to its fullest potential.
              That is why we have built a vetted network of industry partners, so
              the people we send you to are ones we would trust with our own fleet.
            </p>
          </Reveal>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {PARTNERS.map((p, i) => (
              <PartnerCard key={p.name} partner={p} delay={(i % 3) * 70} />
            ))}
          </div>
        </div>
      </section>

      <CTABanner
        headline="Not a client yet?"
        headlineMuted="Let's fix that."
        subhead="Place your coverage with Road Ready and this whole network opens up, plus a named agent, annual reviews, and in-house claims support."
        primaryCTA={{ text: "Start Your Quote", href: "/#quote-form" }}
        variant="primary"
      />
    </>
  );
}
