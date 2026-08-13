import type { Metadata } from "next";
import {
  Banknote,
  Calculator,
  Check,
  Clock,
  HeartHandshake,
  ShieldCheck,
  Users,
} from "lucide-react";
import { Hero } from "@/components/blocks/hero";
import { CTABanner } from "@/components/blocks/cta-banner";
import { EmailCTA } from "@/components/blocks/email-cta";
import { SectionHeading } from "@/components/blocks/section-heading";
import { Reveal } from "@/components/blocks/reveal";
import { BreadcrumbListSchema } from "@/components/schema/breadcrumb-list";

/**
 * Paychex referral partner. The call to action is an email, not a form: the
 * mailto opens the visitor's own mail client with our Paychex rep prefilled and
 * Road Ready CC'd, so every referral is tracked on both sides.
 */
const PAYCHEX_TO = "mpgrimaldi1@paychex.com";
const PAYCHEX_CC = "info@roadreadyinsurance.com";
const PAYCHEX_SUBJECT = "Payroll & HR inquiry (referred by Road Ready Insurance)";
const PAYCHEX_BODY = `Hi,

I run a trucking operation and I'm a Road Ready Insurance client. I'd like to learn more about Paychex payroll, HR, and benefits for my company.

Company name:
Number of employees / drivers:
Best phone number:

Thanks!`;

const PAYCHEX_MAILTO =
  `mailto:${PAYCHEX_TO}` +
  `?cc=${encodeURIComponent(PAYCHEX_CC)}` +
  `&subject=${encodeURIComponent(PAYCHEX_SUBJECT)}` +
  `&body=${encodeURIComponent(PAYCHEX_BODY)}`;

/**
 * Webmail fallbacks. A bare mailto only opens if the visitor's device has a
 * default mail app registered, which many desktops do not. These compose links
 * work in any browser with no OS-level handler required.
 */
const PAYCHEX_GMAIL =
  `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(PAYCHEX_TO)}` +
  `&cc=${encodeURIComponent(PAYCHEX_CC)}` +
  `&su=${encodeURIComponent(PAYCHEX_SUBJECT)}` +
  `&body=${encodeURIComponent(PAYCHEX_BODY)}`;

const PAYCHEX_OUTLOOK =
  `https://outlook.office.com/mail/deeplink/compose?to=${encodeURIComponent(PAYCHEX_TO)}` +
  `&cc=${encodeURIComponent(PAYCHEX_CC)}` +
  `&subject=${encodeURIComponent(PAYCHEX_SUBJECT)}` +
  `&body=${encodeURIComponent(PAYCHEX_BODY)}`;

export const metadata: Metadata = {
  title: "Paychex Payroll & HR for Trucking",
  description:
    "Road Ready clients get an introduction to Paychex for payroll, HR, benefits, and 401(k) built for trucking operations. Email our dedicated Paychex rep to get started.",
  alternates: { canonical: "/paychex/" },
};

const BENEFITS = [
  {
    icon: Banknote,
    title: "Payroll, done for you",
    body: "Run payroll in minutes with automatic pay runs, direct deposit, and driver settlements handled accurately every cycle.",
  },
  {
    icon: Calculator,
    title: "Payroll tax filing",
    body: "Federal, state, and local payroll taxes calculated, filed, and paid on time, so you avoid penalties and surprises.",
  },
  {
    icon: Users,
    title: "HR support",
    body: "Onboarding, employee records, and HR guidance from specialists who know the rules that apply to your operation.",
  },
  {
    icon: HeartHandshake,
    title: "Benefits & 401(k)",
    body: "Offer health benefits and retirement plans that help you attract and keep the drivers your fleet depends on.",
  },
  {
    icon: Clock,
    title: "Time & attendance",
    body: "Track hours and time off in one place that syncs straight into payroll, no spreadsheets required.",
  },
  {
    icon: ShieldCheck,
    title: "Workers' comp made simple",
    body: "Pay-as-you-go workers' comp that pairs with the coverage Road Ready places, based on real payroll instead of estimates.",
  },
];

export default function PaychexPage() {
  return (
    <>
      <BreadcrumbListSchema
        items={[
          { name: "Home", href: "/" },
          { name: "Partner Network", href: "/client-perks/" },
          { name: "Paychex", href: "/paychex/" },
        ]}
      />

      <Hero
        centered
        eyebrow="Partner network"
        headline="Payroll, HR, and benefits,"
        headlineMuted="handled by Paychex."
        subhead="As a Road Ready client, you get a direct introduction to Paychex, the payroll and HR partner that lets you pay your team, stay compliant, and offer real benefits, without the paperwork slowing you down."
        primarySlot={
          <EmailCTA
            label="Email our Paychex rep"
            address={PAYCHEX_TO}
            mailto={PAYCHEX_MAILTO}
            gmail={PAYCHEX_GMAIL}
            outlook={PAYCHEX_OUTLOOK}
            className="btn bg-cyan text-primary-dark hover:bg-white"
          />
        }
      />

      {/* Brand band + email fallback */}
      <section aria-labelledby="contact-heading" className="bg-background">
        <div className="mx-auto flex max-w-6xl flex-col items-center gap-4 px-6 pt-14 lg:px-8">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/images/partners/paychex.png"
            alt="Paychex"
            className="h-10 w-auto sm:h-12"
          />
          <p id="contact-heading" className="text-[13px] font-semibold uppercase tracking-wide text-slate">
            An official Road Ready partner
          </p>
        </div>
      </section>

      {/* What Paychex covers */}
      <section aria-labelledby="benefits-heading" className="bg-background">
        <div className="mx-auto flex max-w-6xl flex-col gap-10 px-6 py-20 lg:px-8 lg:py-24">
          <div className="max-w-2xl">
            <SectionHeading
              eyebrow="Why Paychex"
              headline="Everything payroll and HR,"
              headlineMuted="in one place."
              align="left"
            />
            <p className="mt-5 text-[17px] leading-[1.65] text-slate sm:text-[18px]">
              Running a fleet is enough to manage. Paychex takes payroll, tax
              filing, HR, and benefits off your plate so you can keep your trucks
              moving and your drivers paid on time.
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

      {/* How the intro works */}
      <section aria-labelledby="how-heading" className="bg-gray-50">
        <div className="mx-auto flex max-w-6xl flex-col gap-10 px-6 py-20 lg:px-8 lg:py-24">
          <SectionHeading
            eyebrow="How it works"
            headline="A warm introduction"
            align="left"
          />
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
            {[
              {
                step: "1",
                title: "Send the email",
                body: "Tap the button and your email opens with our dedicated Paychex rep already filled in, and Road Ready CC'd.",
              },
              {
                step: "2",
                title: "Tell them about your fleet",
                body: "Add your company name, team size, and best phone number. That's all Paychex needs to prepare a quote.",
              },
              {
                step: "3",
                title: "Get set up",
                body: "Paychex reaches out directly with pricing and next steps built around your operation.",
              },
            ].map((s) => (
              <div
                key={s.step}
                className="flex flex-col gap-4 rounded-2xl border border-gray-100 bg-white p-7 shadow-sm"
              >
                <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-primary text-[17px] font-bold text-white">
                  {s.step}
                </span>
                <h3 className="text-[18px] font-semibold text-ink">{s.title}</h3>
                <p className="text-[15px] leading-[1.6] text-slate">{s.body}</p>
              </div>
            ))}
          </div>

          <Reveal>
            <ul className="flex flex-col gap-3 text-[15px] leading-snug text-slate sm:flex-row sm:flex-wrap sm:gap-x-8">
              {[
                "No obligation",
                "Pricing built for your headcount",
                "Pairs with your Road Ready coverage",
              ].map((item) => (
                <li key={item} className="flex items-center gap-2.5">
                  <Check className="h-4 w-4 flex-shrink-0 text-primary" strokeWidth={2} />
                  {item}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>

      <CTABanner
        headline="Ready to hand off payroll?"
        headlineMuted="Send the intro email."
        subhead="Pick your email app, Gmail, or Outlook and your message opens with our Paychex rep prefilled and Road Ready CC'd. Add a couple details about your fleet and Paychex takes it from there."
        primarySlot={
          <EmailCTA
            label="Email our Paychex rep"
            address={PAYCHEX_TO}
            mailto={PAYCHEX_MAILTO}
            gmail={PAYCHEX_GMAIL}
            outlook={PAYCHEX_OUTLOOK}
            className="btn bg-white text-primary hover:bg-cyan hover:text-primary-dark"
          />
        }
        variant="primary"
      />
    </>
  );
}
