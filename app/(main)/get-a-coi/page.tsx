import type { Metadata } from "next";
import { ArrowUpRight, Clock, Mail, PhoneCall, Zap } from "lucide-react";
import { Hero } from "@/components/blocks/hero";
import { Reveal } from "@/components/blocks/reveal";
import { RequestForm } from "@/components/blocks/request-form";
import { BreadcrumbListSchema } from "@/components/schema/breadcrumb-list";
import { NAP, PORTAL } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Get a Certificate of Insurance (COI)",
  description:
    "Need a certificate of insurance? Issue it instantly in your Road Ready client portal, or request it from us by form or at coi@roadreadyinsurance.com and we'll process it within business days.",
  alternates: { canonical: "/get-a-coi/" },
};

const hasRealPhone = !NAP.phone.startsWith("PLACEHOLDER_");

export default function GetCOIPage() {
  return (
    <>
      <BreadcrumbListSchema
        items={[
          { name: "Home", href: "/" },
          { name: "Get a COI", href: "/get-a-coi/" },
        ]}
      />

      <Hero
        eyebrow="Certificates"
        headline="Need a certificate of insurance?"
        headlineMuted="Two ways to get one."
        subhead="Issue it yourself in seconds from the client portal, or send us a request and we'll handle it for you."
        image={{ src: "/images/photos/certificates.webp", alt: "A certificate of insurance being prepared" }}
      />

      {/* Two paths */}
      <section aria-label="Ways to get a COI" className="bg-background">
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-6 px-6 py-16 lg:grid-cols-2 lg:px-8 lg:py-20">
          <Reveal>
            <div className="flex h-full flex-col justify-between gap-6 rounded-3xl border border-primary/15 bg-white p-8 shadow-[0_16px_40px_-20px_rgba(10,37,64,0.22)]">
              <div className="flex flex-col gap-4">
                <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-primary">
                  <Zap className="h-6 w-6 text-white" strokeWidth={1.75} />
                </span>
                <h2 className="text-[22px] type-h2 text-ink sm:text-[26px]">Need it instantly?</h2>
                <p className="text-[16px] leading-[1.6] text-gray-700">
                  Log in to the client portal and issue your own certificate on the spot,
                  the fastest way when a broker is waiting to release a load.
                </p>
              </div>
              <a
                href={PORTAL.nowcertsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-primary w-fit"
              >
                Issue it in the portal
                <ArrowUpRight className="h-4 w-4" strokeWidth={2} />
              </a>
            </div>
          </Reveal>

          <Reveal delay={100}>
            <div className="flex h-full flex-col justify-between gap-6 rounded-3xl border border-gray-200 bg-white p-8">
              <div className="flex flex-col gap-4">
                <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-primary-soft">
                  <Clock className="h-6 w-6 text-primary" strokeWidth={1.75} />
                </span>
                <h2 className="text-[22px] type-h2 text-ink sm:text-[26px]">Want us to issue it?</h2>
                <p className="text-[16px] leading-[1.6] text-gray-700">
                  Send us the details below or email{" "}
                  <a href={`mailto:${NAP.coiEmail}`} className="font-semibold text-primary hover:text-primary-dark">
                    {NAP.coiEmail}
                  </a>
                  . We process requests within business days, and confirm when it&apos;s sent.
                </p>
              </div>
              <a href="#coi" className="inline-flex w-fit items-center gap-1.5 text-[15px] font-semibold text-primary hover:text-primary-dark">
                Request it below
              </a>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Request form */}
      <section id="coi" aria-labelledby="coi-heading" className="scroll-mt-28 bg-gray-50">
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-12 px-6 py-16 lg:grid-cols-5 lg:gap-16 lg:px-8 lg:py-20">
          <div className="flex flex-col gap-6 lg:col-span-2">
            <div className="flex flex-col gap-3">
              <p className="text-[13px] font-semibold capitalize tracking-normal text-primary">
                Request a certificate
              </p>
              <h2 id="coi-heading" className="text-[26px] type-h2 text-foreground sm:text-[30px]">
                Tell us where it goes.
              </h2>
              <p className="text-[16px] leading-[1.6] text-gray-700">
                Give us the certificate holder and any specific requirements, and your agent
                takes it from there, processed within business days.
              </p>
            </div>

            <div className="flex flex-col gap-4 rounded-2xl border border-gray-200 bg-background p-6">
              <div>
                <p className="text-[12px] font-semibold capitalize tracking-normal text-gray-500">Email us</p>
                <a
                  href={`mailto:${NAP.coiEmail}`}
                  className="mt-1 inline-flex items-center gap-2 text-[16px] font-semibold text-primary transition-colors hover:text-primary-dark"
                >
                  <Mail className="h-4 w-4" strokeWidth={1.75} />
                  {NAP.coiEmail}
                </a>
              </div>
              {hasRealPhone && (
                <div className="border-t border-gray-200 pt-4">
                  <p className="text-[12px] font-semibold capitalize tracking-normal text-gray-500">Or call</p>
                  <a
                    href={`tel:${NAP.phone}`}
                    className="mt-1 inline-flex items-center gap-2 text-[16px] font-semibold text-primary transition-colors hover:text-primary-dark"
                  >
                    <PhoneCall className="h-4 w-4" strokeWidth={1.75} />
                    {NAP.phoneDisplay}
                  </a>
                </div>
              )}
            </div>
          </div>

          <div className="lg:col-span-3">
            <RequestForm kind="coi" />
          </div>
        </div>
      </section>
    </>
  );
}
