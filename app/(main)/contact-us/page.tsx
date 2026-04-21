import type { Metadata } from "next";
import { Clock, Mail, MapPin, Phone } from "lucide-react";
import { Hero } from "@/components/blocks/hero";
import { QuoteForm } from "@/components/blocks/quote-form";
import { BreadcrumbListSchema } from "@/components/schema/breadcrumb-list";
import { LocalBusinessSchema } from "@/components/schema/local-business";
import { NAP } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Contact Us — Road Ready Insurance",
  description:
    "Start a quote, ask a question, or talk through your situation. Our agents answer the phone. Based in Boca Raton, FL. Licensed in 48 states plus DC.",
  alternates: { canonical: "/contact-us/" },
};

const CONTACT_METHODS = [
  {
    icon: Phone,
    label: "Call us",
    primary: NAP.phoneDisplay,
    href: `tel:${NAP.phone}`,
    detail: "Agents answer during business hours.",
  },
  {
    icon: Mail,
    label: "Email",
    primary: NAP.email,
    href: `mailto:${NAP.email}`,
    detail: "For general inquiries. For a quote, use the form.",
  },
  {
    icon: MapPin,
    label: "Office",
    primary: `${NAP.address.street}`,
    secondary: `${NAP.address.city}, ${NAP.address.state} ${NAP.address.zip}`,
    detail: "Our agents work Eastern time.",
  },
  {
    icon: Clock,
    label: "Hours",
    primary: NAP.hours,
    detail: "Outside hours? Leave a message or use the form.",
  },
];

export default function ContactPage() {
  return (
    <>
      <BreadcrumbListSchema
        items={[
          { name: "Home", href: "/" },
          { name: "Contact", href: "/contact-us/" },
        ]}
      />
      <LocalBusinessSchema />

      <Hero
        eyebrow="Contact"
        headline="Ready when you are."
        subhead="Start a quote, ask a question, or just talk through your situation. Our agents answer the phone."
      />

      <section
        id="contact"
        aria-labelledby="contact-heading"
        className="bg-gray-50"
      >
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-12 px-6 py-20 lg:grid-cols-5 lg:gap-16 lg:px-8 lg:py-24">
          <div className="flex flex-col gap-10 lg:col-span-2">
            <div className="flex flex-col gap-3">
              <p className="text-[13px] font-semibold uppercase tracking-[0.18em] text-primary">
                How to reach us
              </p>
              <h2
                id="contact-heading"
                className="text-[28px] font-semibold leading-[1.2] tracking-[-0.01em] text-foreground sm:text-[32px]"
              >
                A named agent, not a call center queue.
              </h2>
            </div>

            <ul className="flex flex-col gap-6">
              {CONTACT_METHODS.map((method) => {
                const Icon = method.icon;
                const PrimaryEl = method.href ? "a" : "span";
                return (
                  <li
                    key={method.label}
                    className="flex items-start gap-4 border-t border-gray-200 pt-6 first:border-t-0 first:pt-0"
                  >
                    <span className="inline-flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-primary-soft">
                      <Icon
                        className="h-5 w-5 text-primary"
                        strokeWidth={1.75}
                      />
                    </span>
                    <div className="flex flex-1 flex-col gap-1">
                      <span className="text-[12px] font-semibold uppercase tracking-[0.15em] text-gray-500">
                        {method.label}
                      </span>
                      <PrimaryEl
                        {...(method.href ? { href: method.href } : {})}
                        className={
                          method.href
                            ? "text-[17px] font-semibold text-primary transition-colors hover:text-primary-dark"
                            : "text-[17px] font-semibold text-foreground"
                        }
                      >
                        {method.primary}
                      </PrimaryEl>
                      {method.secondary && (
                        <span className="text-[15px] text-gray-700">
                          {method.secondary}
                        </span>
                      )}
                      <span className="text-[14px] leading-[1.5] text-gray-500">
                        {method.detail}
                      </span>
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>

          <div className="lg:col-span-3">
            <div className="mb-6">
              <p className="text-[13px] font-semibold uppercase tracking-[0.18em] text-primary">
                Start your quote
              </p>
              <h2 className="mt-2 text-[28px] font-semibold leading-[1.2] tracking-[-0.01em] text-foreground sm:text-[32px]">
                Tell us about your operation.
              </h2>
            </div>
            <QuoteForm />
          </div>
        </div>
      </section>
    </>
  );
}
