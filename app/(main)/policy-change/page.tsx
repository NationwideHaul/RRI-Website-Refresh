import type { Metadata } from "next";
import { ArrowUpRight, PhoneCall } from "lucide-react";
import { Hero } from "@/components/blocks/hero";
import { Reveal } from "@/components/blocks/reveal";
import { PolicyChangeForm } from "@/components/blocks/policy-change-form";
import { BreadcrumbListSchema } from "@/components/schema/breadcrumb-list";
import { NAP, PORTAL } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Request a Policy Change",
  description:
    "Add or remove a driver or vehicle, or make a general policy change. Do it yourself in the client portal, or send a request and your named agent handles it.",
  alternates: { canonical: "/policy-change/" },
};

const COMMON_CHANGES = [
  "Add or remove a driver",
  "Add or remove a truck or trailer",
  "Update a VIN, garaging address, or account details",
  "Adjust limits, deductibles, or endorsements as you grow",
];

const hasRealPhone = !NAP.phone.startsWith("PLACEHOLDER_");

export default function PolicyChangePage() {
  return (
    <>
      <BreadcrumbListSchema
        items={[
          { name: "Home", href: "/" },
          { name: "Policy Change", href: "/policy-change/" },
        ]}
      />

      <Hero
        eyebrow="Policy changes"
        headline="Your operation changes."
        headlineMuted="Your policy should keep up."
        subhead="Make many changes yourself in the client portal, or send us a request below, add or remove a driver or vehicle, or anything else, and your named agent takes it from there."
        image={{ src: "/images/photos/your-agent.webp", alt: "A Road Ready agent updating a client's policy" }}
      />

      {/* Portal option */}
      <section aria-label="Self-service option" className="bg-background">
        <div className="mx-auto max-w-7xl px-6 pt-16 lg:px-8 lg:pt-20">
          <Reveal>
            <div className="flex flex-col items-start justify-between gap-5 rounded-3xl border border-primary/15 bg-white p-6 shadow-sm sm:flex-row sm:items-center lg:p-8">
              <div className="max-w-xl">
                <h2 className="text-[20px] type-h3 text-ink sm:text-[22px]">Prefer to do it yourself?</h2>
                <p className="mt-1.5 text-[15px] leading-[1.6] text-gray-700">
                  Many account changes can be made instantly in the client portal, no waiting on anyone.
                </p>
              </div>
              <a
                href={PORTAL.nowcertsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-primary shrink-0"
              >
                Open the portal
                <ArrowUpRight className="h-4 w-4" strokeWidth={2} />
              </a>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Request form */}
      <section id="policy-change" aria-labelledby="policy-change-heading" className="bg-gray-50">
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-12 px-6 py-16 lg:grid-cols-5 lg:gap-16 lg:px-8 lg:py-20">
          <div className="flex flex-col gap-6 lg:col-span-2">
            <div className="flex flex-col gap-3">
              <p className="text-[13px] font-semibold capitalize tracking-normal text-primary">
                Send us a request
              </p>
              <h2 id="policy-change-heading" className="text-[26px] type-h2 text-foreground sm:text-[30px]">
                What needs to change?
              </h2>
              <p className="text-[16px] leading-[1.6] text-gray-700">
                Pick the type of change and the form adapts to ask for exactly what we need.
              </p>
            </div>

            <ul className="flex flex-col gap-3">
              {COMMON_CHANGES.map((item) => (
                <li key={item} className="flex items-start gap-3 text-[15px] leading-[1.55] text-gray-700">
                  <span className="mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-primary" />
                  {item}
                </li>
              ))}
            </ul>

            {hasRealPhone && (
              <p className="text-[15px] leading-[1.6] text-gray-500">
                Prefer to call?{" "}
                <a href={`tel:${NAP.phone}`} className="inline-flex items-center gap-1.5 font-semibold text-primary hover:text-primary-dark">
                  <PhoneCall className="h-4 w-4" strokeWidth={1.75} />
                  {NAP.phoneDisplay}
                </a>
              </p>
            )}
          </div>

          <div className="lg:col-span-3">
            <PolicyChangeForm />
          </div>
        </div>
      </section>
    </>
  );
}
