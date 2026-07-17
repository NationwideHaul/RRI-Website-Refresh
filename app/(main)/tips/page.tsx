import type { Metadata } from "next";
import Link from "next/link";
import {
  BadgeCheck,
  Check,
  ClipboardCheck,
  Map,
  ShieldCheck,
  Wallet,
} from "lucide-react";
import { Hero } from "@/components/blocks/hero";
import { CTABanner } from "@/components/blocks/cta-banner";
import { SectionHeading } from "@/components/blocks/section-heading";
import { Reveal } from "@/components/blocks/reveal";
import { BreadcrumbListSchema } from "@/components/schema/breadcrumb-list";

const TIPS_PHONE = "(208) 278-6722";
const TIPS_TEL = "tel:2082786722";
const TIPS_SITE = "https://tiproservices.com/";

export const metadata: Metadata = {
  title: "TIPS, DOT Compliance & Motor Carrier Services",
  description:
    "Total Insight Professional Services (TIPS) handles State and Federal DOT compliance for motor carriers nationwide, from USDOT and MC authority to audits, filings, and driver management, so carriers can stay focused on the road.",
  alternates: { canonical: "/tips/" },
};

const BENEFITS = [
  {
    icon: BadgeCheck,
    title: "Dedicated compliance specialists",
    body: "Direct access to experts with deep knowledge of DOT and FMCSA regulations.",
  },
  {
    icon: ClipboardCheck,
    title: "End-to-end compliance management",
    body: "Registrations, filings, renewals, and ongoing monitoring, all handled in one place.",
  },
  {
    icon: ShieldCheck,
    title: "Audit readiness & risk reduction",
    body: "Proactive support designed to minimize fines, violations, and shutdown risks.",
  },
  {
    icon: Map,
    title: "Nationwide carrier support",
    body: "Solutions built for multi-state operations and growing fleets.",
  },
  {
    icon: Wallet,
    title: "Operational efficiency & cost savings",
    body: "Less administrative burden, so carriers can focus on profitability.",
  },
];

const HANDLES = [
  {
    title: "Getting started",
    items: [
      "Free USDOT number filing",
      "MC authority applications",
      "BOC-3 filing",
      "LLC & EIN formation",
    ],
  },
  {
    title: "Ongoing compliance",
    items: [
      "Biennial updates",
      "UCR registration",
      "IFTA & IRP filings",
      "Quarterly fuel tax reports",
      "Form 2290",
      "State permits (OR, NY, KY, NM, CT)",
      "Intrastate authorities (CA, TX, OH)",
      "Driver management",
    ],
  },
  {
    title: "Audit support & reviews",
    items: ["New entrant safety audit prep", "Compliance reviews"],
  },
  {
    title: "Driver management",
    items: [
      "Driver qualification files",
      "MVR & CDLIS reports",
      "PSP reports",
      "Background checks",
      "Clearinghouse queries",
      "Drug & alcohol consortium",
      "Supervisor training",
      "Audit support",
    ],
  },
];

export default function TipsPage() {
  return (
    <>
      <BreadcrumbListSchema
        items={[
          { name: "Home", href: "/" },
          { name: "TIPS", href: "/tips/" },
        ]}
      />

      <Hero
        eyebrow="DOT compliance"
        headline="Compliance handled by specialists,"
        headlineMuted="so you can stay focused on the road."
        subhead="Total Insight Professional Services (TIPS) provides State and Federal compliance solutions for motor carriers nationwide, managing registrations and ongoing requirements so you operate efficiently, legally, and with confidence."
        primaryCTA={{ text: "Talk to a specialist", href: TIPS_TEL }}
        secondaryCTA={{ text: "Visit tiproservices.com", href: TIPS_SITE }}
      />

      {/* Benefits */}
      <section aria-labelledby="benefits-heading" className="bg-background">
        <div className="mx-auto flex max-w-6xl flex-col gap-10 px-6 py-20 lg:px-8 lg:py-24">
          <div className="max-w-2xl">
            <SectionHeading
              eyebrow="Why TIPS"
              headline="Compliance support"
              headlineMuted="at every stage of growth."
              align="left"
            />
            <p className="mt-5 text-[17px] leading-[1.65] text-slate sm:text-[18px]">
              Whether you&apos;re launching a new company, preparing for a DOT
              safety audit, or expanding into new states or vehicle classes, TIPS
              delivers hands-on compliance support as you grow.
            </p>
          </div>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {BENEFITS.map((b, i) => {
              const Icon = b.icon;
              return (
                <Reveal key={b.title} delay={(i % 3) * 70} className="h-full">
                  <div className="flex h-full flex-col gap-4 rounded-2xl border border-gray-100 bg-white p-7 shadow-sm">
                    <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-primary-soft">
                      <Icon className="h-5 w-5 text-primary" strokeWidth={1.75} />
                    </span>
                    <h3 className="text-[17px] font-semibold text-ink">{b.title}</h3>
                    <p className="text-[15px] leading-[1.6] text-slate">{b.body}</p>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* What TIPS handles */}
      <section aria-labelledby="handles-heading" className="bg-gray-50">
        <div className="mx-auto flex max-w-6xl flex-col gap-10 px-6 py-20 lg:px-8 lg:py-24">
          <SectionHeading
            eyebrow="What TIPS handles"
            headline="From your first filing"
            headlineMuted="to every renewal after."
            align="left"
          />
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            {HANDLES.map((group) => (
              <div
                key={group.title}
                className="flex flex-col gap-4 rounded-2xl border border-gray-100 bg-white p-7 shadow-sm"
              >
                <h3 className="text-[18px] font-semibold text-ink">{group.title}</h3>
                <ul className="flex flex-col gap-2.5">
                  {group.items.map((item) => (
                    <li key={item} className="flex items-start gap-2.5 text-[15px] leading-snug text-slate">
                      <Check className="mt-0.5 h-4 w-4 flex-shrink-0 text-primary" strokeWidth={2} />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CTABanner
        headline="Talk to a compliance specialist."
        headlineMuted={`Call ${TIPS_PHONE}.`}
        subhead="Get DOT compliance off your plate so you can keep the wheels turning. Learn more at tiproservices.com."
        primaryCTA={{ text: "Call a specialist", href: TIPS_TEL }}
        variant="primary"
      />
    </>
  );
}
