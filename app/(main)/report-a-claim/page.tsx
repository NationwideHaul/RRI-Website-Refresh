import type { Metadata } from "next";
import { Info, Mail, PhoneCall } from "lucide-react";
import { Hero } from "@/components/blocks/hero";
import { Reveal } from "@/components/blocks/reveal";
import { SectionHeading } from "@/components/blocks/section-heading";
import { RequestForm } from "@/components/blocks/request-form";
import { BreadcrumbListSchema } from "@/components/schema/breadcrumb-list";
import { NAP } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Report a Claim",
  description:
    "Use the form to send your claim information to Road Ready Insurance. We'll guide you through the correct reporting process and connect you with the appropriate carrier or claims handler.",
  alternates: { canonical: "/report-a-claim/" },
};

const STEPS = [
  {
    step: "1",
    title: "Send us the details",
    body: "Fill out the form above, or email your claim details straight to claims@roadreadyinsurance.com. Tell us what happened, when, and where.",
  },
  {
    step: "2",
    title: "We reply with instructions",
    body: "Our team responds with the correct reporting instructions for your specific carrier or claims handler, so it is reported the right way, the first time.",
  },
  {
    step: "3",
    title: "Report it to the carrier",
    body: "You report the claim directly to the insurance company or claims handler using our instructions. We stay with you and help however you need.",
  },
];

const HAVE_READY = [
  "Your USDOT and policy number, if handy",
  "Date, time, and location of the loss",
  "What happened, in as much detail as you can",
  "Any photos, police report, or other documentation",
  "Contact info for anyone else involved",
];

const hasRealPhone = !NAP.phone.startsWith("PLACEHOLDER_");

export default function ReportClaimPage() {
  return (
    <>
      <BreadcrumbListSchema
        items={[
          { name: "Home", href: "/" },
          { name: "Report a Claim", href: "/report-a-claim/" },
        ]}
      />

      <Hero
        eyebrow="Claims"
        headline="Report a claim."
        subhead="Use this form to send the claim information to us, and we'll guide you through the correct reporting process and connect you with the appropriate carrier."
        image={{ src: "/images/photos/claims.webp", alt: "A Road Ready client reviewing claim paperwork" }}
      />

      {/* Form, right after the header */}
      <section id="claim" aria-labelledby="claim-heading" className="bg-background">
        <div className="mx-auto max-w-7xl px-6 py-16 lg:px-8 lg:py-20">
          {/* Disclaimer, sits above everything */}
          <Reveal>
            <div className="mb-10 flex items-start gap-3.5 rounded-2xl border border-gray-200 border-l-4 border-l-cyan bg-white p-5 lg:p-6">
              <Info className="mt-0.5 h-5 w-5 flex-shrink-0 text-primary" strokeWidth={1.75} />
              <p className="text-[14px] leading-[1.6] text-gray-700 sm:text-[15px]">
                While Road Ready Insurance does not adjust or settle claims on behalf of any
                insurance carrier, supporting your fleet is a core part of what we do. After
                receiving your submission, we respond with the correct claim reporting
                instructions so you can report the claim{" "}
                <span className="font-semibold text-primary">
                  directly to the insurance company or claims handler.
                </span>
              </p>
            </div>
          </Reveal>

          <div className="grid grid-cols-1 gap-12 lg:grid-cols-5 lg:gap-16">
          <div className="flex flex-col gap-8 lg:col-span-2">
            <div className="flex flex-col gap-3">
              <p className="text-[13px] font-semibold capitalize tracking-normal text-primary">
                Before you start
              </p>
              <h2 id="claim-heading" className="text-[26px] type-h2 text-foreground sm:text-[30px]">
                What to have ready.
              </h2>
            </div>

            <ul className="flex flex-col gap-3">
              {HAVE_READY.map((item) => (
                <li key={item} className="flex items-start gap-3 text-[16px] leading-[1.55] text-gray-700">
                  <span className="mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-primary" />
                  {item}
                </li>
              ))}
            </ul>

            <div className="flex flex-col gap-4 rounded-2xl border border-gray-200 bg-white p-6">
              <div>
                <p className="text-[12px] font-semibold capitalize tracking-normal text-gray-500">
                  Prefer email?
                </p>
                <a
                  href={`mailto:${NAP.claimsEmail}?subject=New%20Claim%20-%20Please%20advise`}
                  className="mt-1 inline-flex items-center gap-2 text-[17px] font-semibold text-primary transition-colors hover:text-primary-dark"
                >
                  <Mail className="h-4 w-4" strokeWidth={1.75} />
                  {NAP.claimsEmail}
                </a>
              </div>
              {hasRealPhone && (
                <div className="border-t border-gray-100 pt-4">
                  <p className="text-[12px] font-semibold capitalize tracking-normal text-gray-500">
                    Rather call?
                  </p>
                  <a
                    href={`tel:${NAP.phone}`}
                    className="mt-1 inline-flex items-center gap-2 text-[17px] font-semibold text-primary transition-colors hover:text-primary-dark"
                  >
                    <PhoneCall className="h-4 w-4" strokeWidth={1.75} />
                    {NAP.phoneDisplay}
                  </a>
                  <p className="mt-1 text-[13px] text-gray-500">{NAP.hours}</p>
                </div>
              )}
            </div>
          </div>

          <div className="flex flex-col gap-5 lg:col-span-3">
            <div>
              <p className="text-[13px] font-semibold capitalize tracking-normal text-primary">
                Report a claim
              </p>
              <h2 className="mt-2 text-[26px] type-h2 text-foreground sm:text-[30px]">
                Send us the details.
              </h2>
            </div>

            <RequestForm kind="claim" />
          </div>
          </div>
        </div>
      </section>

      {/* How it works, 3 steps, no icons */}
      <section aria-labelledby="how-it-works-heading" className="bg-gray-50">
        <div className="mx-auto flex max-w-7xl flex-col gap-10 px-6 py-16 lg:px-8 lg:py-20">
          <Reveal>
            <SectionHeading
              eyebrow="How it works"
              headline="From your first message"
              headlineMuted="to a reported claim."
            />
          </Reveal>
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
            {STEPS.map((item, i) => (
              <Reveal key={item.step} delay={i * 80} className="h-full">
                <div className="flex h-full flex-col gap-3 rounded-2xl border border-gray-100 bg-white p-7 shadow-sm">
                  <span className="text-[28px] font-bold leading-none text-primary/25">
                    {item.step.padStart(2, "0")}
                  </span>
                  <h3 className="text-[18px] font-semibold text-foreground">{item.title}</h3>
                  <p className="text-[15px] leading-[1.6] text-gray-700">{item.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
