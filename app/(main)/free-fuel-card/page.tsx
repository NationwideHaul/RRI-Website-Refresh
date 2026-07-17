import type { Metadata } from "next";
import Link from "next/link";
import { Check, Smartphone, MapPin, Globe } from "lucide-react";
import { Hero } from "@/components/blocks/hero";
import { CTABanner } from "@/components/blocks/cta-banner";
import { SectionHeading } from "@/components/blocks/section-heading";
import { Reveal } from "@/components/blocks/reveal";
import { BreadcrumbListSchema } from "@/components/schema/breadcrumb-list";

const APPLY_URL =
  "https://apply.transconnectservices.com/#/Apply?target=referral&key=NATIONWIDEHAUL";
const IOS_URL = "https://itunes.apple.com/us/app/transconnect/id1037073139?mt=8";
const ANDROID_URL =
  "https://play.google.com/store/apps/details?id=com.transconnectservices.clientApp";

export const metadata: Metadata = {
  title: "TCS Fuel Card",
  description:
    "The TCS Fuel Card saved clients an average of $0.51 per gallon in Q1 2026, with zero transaction fees at 2,000+ in-network locations across the US and Canada, plus fuel management tools built for trucking.",
  alternates: { canonical: "/free-fuel-card/" },
};

const BENEFITS = [
  "An average discount of $0.51 per gallon in Q1 2026, roughly 15% savings per gallon.",
  "$0 transaction fees at in-network locations.",
  "Cost-plus discount network with 2,000+ locations across the US and Canada.",
  "24/7 customer service.",
  "Universal acceptance at 12,000+ fuel stops nationwide.",
  "Point-of-sale discounts right at the pump.",
  "Low transaction fee at out-of-network locations, with no hidden costs.",
  "Automatic discounts on tires, service, and maintenance at TA Truck Service centers when you give your DOT number at payment.",
  "Free mobile app with fuel finder and on-the-go management tools.",
  "Free online account management website, available 24/7.",
];

const FUEL_PARTNERS = [
  "AMBEST Fuel Stops",
  "Road Ranger",
  "Roady's",
  "Sapp Bros.",
  "TA",
  "TA Express",
  "Petro Stopping Centers",
  "Speedway",
  "Kwik Trip",
  "Kwik Star",
  "Casey's",
  "Maverik",
  "7-Eleven",
  "Irving",
  "Stripes",
];

const TOOLS = [
  {
    icon: Smartphone,
    title: "TCS mobile app",
    intro:
      "Manage your fuel account from your phone or tablet, on Android and iOS.",
    points: [
      "24/7 account access from your mobile device",
      "Manage your company fuel cards from anywhere",
      "Securely issue industry checks from your TCS account",
      "Find the best prices in your area or along your route with the Fuel Finder",
      "Real-time account updates",
      "Contact TCS Client Services directly from the app",
    ],
  },
  {
    icon: MapPin,
    title: "TCS Fuel Finder",
    intro:
      "See fuel prices along any route so you can control costs before you fill up.",
    points: [
      "Search current location to destination, or set your own origin and destination",
      "View by chain or list by price",
      "See retail price, ex-tax, and TCS discount price",
      "Options to avoid highways or tolls",
      "Find in-network discount locations along your route",
      "Search within a specific radius",
      "See truck stop amenities",
    ],
  },
  {
    icon: Globe,
    title: "Account management website",
    intro:
      "A free, mobile-friendly dashboard with full, real-time transparency into your account.",
    points: [
      "Personalized dashboard snapshot of your account",
      "Easy for owners and drivers to use",
      "24/7 access on computer, tablet, or phone",
      "View account balances and card limits",
      "Free Fuel Finder built in",
      "Issue checks and view statements",
      "Create users and customize permissions and spending",
      "Clear, itemized statements for each account",
    ],
  },
];

export default function FuelCardPage() {
  return (
    <>
      <BreadcrumbListSchema
        items={[
          { name: "Home", href: "/" },
          { name: "TCS Fuel Card", href: "/free-fuel-card/" },
        ]}
      />

      <Hero
        eyebrow="TCS fuel card"
        headline="Save an average of 51&cent; a gallon,"
        headlineMuted="on every fill-up."
        subhead="Fuel eats up a huge share of what it costs to run a trucking company. The TCS Fuel Card gives you real diesel discounts and the tools to find the best prices at 2,000+ in-network locations across the US and Canada."
        primaryCTA={{ text: "Start saving", href: APPLY_URL }}
        secondaryCTA={{ text: "Talk to us", href: "/contact-us/" }}
      />

      {/* Benefits */}
      <section aria-labelledby="benefits-heading" className="bg-background">
        <div className="mx-auto flex max-w-5xl flex-col gap-10 px-6 py-20 lg:px-8 lg:py-24">
          <SectionHeading
            eyebrow="Program benefits"
            headline="A fuel card that works"
            headlineMuted="as hard as you do."
            align="left"
          />
          <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {BENEFITS.map((b, i) => (
              <Reveal key={b} delay={(i % 2) * 60}>
                <li className="flex items-start gap-3 rounded-2xl border border-gray-100 bg-white p-5 text-[15px] leading-[1.55] text-slate shadow-sm">
                  <span className="mt-0.5 inline-flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-primary-soft">
                    <Check className="h-3.5 w-3.5 text-primary" strokeWidth={2.5} />
                  </span>
                  {b}
                </li>
              </Reveal>
            ))}
          </ul>
          <p className="text-[13px] italic leading-[1.5] text-slate-muted">
            Average savings of $0.51 per gallon are based on actual in-network TCS
            client transactions for Q1 of 2026.
          </p>
          <Link href={APPLY_URL} target="_blank" rel="noopener noreferrer" className="btn btn-primary w-fit">
            Start saving
          </Link>
        </div>
      </section>

      {/* In-network partners */}
      <section aria-labelledby="partners-heading" className="bg-gray-50">
        <div className="mx-auto flex max-w-5xl flex-col gap-8 px-6 py-20 lg:px-8 lg:py-24">
          <SectionHeading
            eyebrow="Where it works"
            headline="TCS in-network"
            headlineMuted="fuel partners."
            align="left"
          />
          <div className="flex flex-wrap gap-3">
            {FUEL_PARTNERS.map((name) => (
              <span
                key={name}
                className="rounded-full border border-gray-200 bg-white px-4 py-2 text-[14px] font-medium text-ink shadow-sm"
              >
                {name}
              </span>
            ))}
          </div>
          <p className="text-[15px] leading-[1.6] text-slate">
            Plus universal acceptance at 12,000+ fuel stops nationwide.
          </p>
        </div>
      </section>

      {/* Fuel management tools */}
      <section aria-labelledby="tools-heading" className="bg-background">
        <div className="mx-auto flex max-w-5xl flex-col gap-12 px-6 py-20 lg:px-8 lg:py-24">
          <div className="max-w-2xl">
            <SectionHeading
              eyebrow="Fuel management tools"
              headline="A complete system,"
              headlineMuted="not just a card."
              align="left"
            />
            <p className="mt-5 text-[17px] leading-[1.65] text-slate sm:text-[18px]">
              The TCS Fuel Card comes with a card, an account management website,
              and a mobile app, so you get substantial fuel and service discounts
              nationwide with real-time updates and on-the-go account access.
            </p>
          </div>

          <div className="flex flex-col gap-6">
            {TOOLS.map((tool) => {
              const Icon = tool.icon;
              return (
                <Reveal key={tool.title}>
                  <div className="rounded-2xl border border-gray-100 bg-white p-7 shadow-sm lg:p-8">
                    <div className="flex items-center gap-3">
                      <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-primary-soft">
                        <Icon className="h-5 w-5 text-primary" strokeWidth={1.75} />
                      </span>
                      <h3 className="text-[20px] font-semibold text-ink">{tool.title}</h3>
                    </div>
                    <p className="mt-3 text-[15px] leading-[1.6] text-slate">{tool.intro}</p>
                    <ul className="mt-5 grid grid-cols-1 gap-x-8 gap-y-2.5 sm:grid-cols-2">
                      {tool.points.map((p) => (
                        <li key={p} className="flex items-start gap-2.5 text-[14px] leading-snug text-slate">
                          <Check className="mt-0.5 h-4 w-4 flex-shrink-0 text-primary" strokeWidth={2} />
                          {p}
                        </li>
                      ))}
                    </ul>
                    {tool.title === "TCS mobile app" && (
                      <div className="mt-6 flex flex-wrap gap-3">
                        <Link href={IOS_URL} target="_blank" rel="noopener noreferrer" className="btn btn-outline">
                          Download for iPhone
                        </Link>
                        <Link href={ANDROID_URL} target="_blank" rel="noopener noreferrer" className="btn btn-outline">
                          Download for Android
                        </Link>
                      </div>
                    )}
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* Retail minus vs cost-plus */}
      <section aria-labelledby="pricing-heading" className="bg-gray-50">
        <div className="mx-auto flex max-w-5xl flex-col gap-8 px-6 py-20 lg:px-8 lg:py-24">
          <SectionHeading
            eyebrow="Know what you're paying"
            headline="Retail minus"
            headlineMuted="vs. cost-plus pricing."
            align="left"
          />
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div className="flex flex-col gap-3 rounded-2xl border border-gray-100 bg-white p-7 shadow-sm">
              <h3 className="text-[18px] font-semibold text-ink">Retail minus</h3>
              <p className="text-[15px] leading-[1.65] text-slate">
                The retail price minus a negotiated discount per gallon. Retail is
                the lowest posted pump price, typically what cash or fuel-card
                customers pay. If retail is $5.00 and the discount is 5 cents, you
                pay $4.95 a gallon.
              </p>
            </div>
            <div className="flex flex-col gap-3 rounded-2xl border border-primary/20 bg-primary-soft/40 p-7 shadow-sm">
              <h3 className="text-[18px] font-semibold text-ink">Cost-plus</h3>
              <p className="text-[15px] leading-[1.65] text-slate">
                The truck stop&apos;s actual cost of a gallon (taxes and freight
                included) plus a small pumping fee. If cost is $4.50 and the plus is
                5 cents, you pay $4.55 a gallon. Against a $5.00 retail price,
                that&apos;s $0.45 saved on that fill-up.
              </p>
            </div>
          </div>
        </div>
      </section>

      <CTABanner
        headline="Ready to spend less"
        headlineMuted="at the pump?"
        subhead="Get your TCS Fuel Card and start pocketing the difference on every fill-up."
        primaryCTA={{ text: "Get your fuel card", href: APPLY_URL }}
        variant="primary"
      />
    </>
  );
}
