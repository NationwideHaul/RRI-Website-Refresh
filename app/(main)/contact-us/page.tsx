import type { Metadata } from "next";
import { Mail, Phone } from "lucide-react";
import { Hero } from "@/components/blocks/hero";
import { ContactChooser } from "@/components/blocks/contact-chooser";
import { BreadcrumbListSchema } from "@/components/schema/breadcrumb-list";
import { LocalBusinessSchema } from "@/components/schema/local-business";
import { NAP } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Contact Us",
  description:
    "Start a quote, ask a question, or talk through your situation. Our agents answer the phone. A national commercial trucking agency, licensed in 48 states plus DC.",
  alternates: { canonical: "/contact-us/" },
};

const CONTACT_METHODS = [
  {
    icon: Phone,
    label: "Call us",
    primary: NAP.phoneDisplay,
    href: `tel:${NAP.phone}`,
    detail: "Talk to a named agent, not a call-center queue.",
  },
  {
    icon: Mail,
    label: "Email",
    primary: NAP.email,
    href: `mailto:${NAP.email}`,
    detail: "For general inquiries. For a quote, use the form.",
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
        image={{ src: "/images/photos/your-agent.webp", alt: "A Road Ready agent ready to help" }}
      />

      <section
        id="contact"
        aria-labelledby="contact-heading"
        className="bg-background"
      >
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-12 px-6 py-20 lg:grid-cols-5 lg:gap-16 lg:px-8 lg:py-24">
          <div className="flex flex-col gap-10 lg:col-span-2">
            <div className="flex flex-col gap-3">
              <p className="text-[13px] font-semibold capitalize tracking-normal text-primary">
                How to reach us
              </p>
              <h2
                id="contact-heading"
                className="text-[28px] type-h2 text-foreground sm:text-[32px]"
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
                      <span className="text-[12px] font-semibold capitalize tracking-normal text-gray-500">
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
                      {method.detail && (
                        <span className="text-[14px] leading-[1.5] text-gray-500">
                          {method.detail}
                        </span>
                      )}
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>

          <div className="lg:col-span-3">
            <div className="mb-6">
              <p className="text-[13px] font-semibold capitalize tracking-normal text-primary">
                How can we help?
              </p>
              <h2 className="mt-2 text-[28px] type-h2 text-foreground sm:text-[32px]">
                First, tell us who you are.
              </h2>
            </div>
            <ContactChooser />
          </div>
        </div>
      </section>
    </>
  );
}
