import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Hero } from "@/components/blocks/hero";
import { Reveal } from "@/components/blocks/reveal";
import { FAQ } from "@/components/blocks/faq";
import { SectionHeading } from "@/components/blocks/section-heading";
import { CTABanner } from "@/components/blocks/cta-banner";
import { BreadcrumbListSchema } from "@/components/schema/breadcrumb-list";
import type { FAQItem } from "@/components/schema/faq-page";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "How to Start a Trucking Company",
  description:
    "A plain-English guide to starting a trucking company: getting your MC and DOT authority, insurance requirements, BOC-3, IFTA, IRP, UCR, compliance, and when to upgrade your broker.",
  alternates: { canonical: "/how-to-start-a-trucking-company/" },
};

type Step = {
  id: string;
  eyebrow: string;
  title: string;
  paragraphs: string[];
};

const STEPS: Step[] = [
  {
    id: "authority",
    eyebrow: "Step 1",
    title: "Get your operating authority",
    paragraphs: [
      "Everything starts with your authority. You will register with the FMCSA to get a USDOT number and, if you are hauling regulated freight for hire across state lines, an MC (Motor Carrier) number. The application runs through the FMCSA's Unified Registration System.",
      "Budget for a processing and vetting period, there is a mandatory waiting window after you file before your authority becomes active. Plan around it rather than being surprised by it.",
    ],
  },
  {
    id: "insurance",
    eyebrow: "Step 2",
    title: "Meet the insurance requirements",
    paragraphs: [
      "The FMCSA will not activate your authority until proof of insurance is filed on your behalf. For general freight, the federal minimum liability is $750,000, though $1 million is the practical floor most brokers and shippers expect. You will also file the appropriate BMC-91 or BMC-91X form.",
      "This is the step where a specialist broker matters most. The fast-quote markets that dominate new-authority insurance are the same secondary markets you will eventually want to leave behind. Getting placed correctly from the start saves you from re-shopping under pressure later.",
    ],
  },
  {
    id: "boc-3",
    eyebrow: "Step 3",
    title: "File your BOC-3 (process agents)",
    paragraphs: [
      "The BOC-3 designates a process agent in every state where you operate, someone legally able to receive documents on your behalf. You cannot file it yourself for all states; you use a blanket process-agent service, which files it electronically with the FMCSA.",
      "It is a small step, but your authority will not activate without it. Most new carriers handle it through the same service that helps with their filings.",
    ],
  },
  {
    id: "ifta-irp",
    eyebrow: "Step 4",
    title: "Register for IFTA and IRP",
    paragraphs: [
      "If you run across state lines, you will need IRP (International Registration Plan) apportioned plates and an IFTA (International Fuel Tax Agreement) license. IRP handles your registration fees across the states you travel; IFTA handles fuel-tax reporting so you file one quarterly return instead of dealing with every state separately.",
      "Both are administered through your base state. Keep clean mileage and fuel records from day one, IFTA reporting is far easier when the paperwork is a habit rather than a scramble.",
    ],
  },
  {
    id: "ucr",
    eyebrow: "Step 5",
    title: "Pay your UCR",
    paragraphs: [
      "The Unified Carrier Registration (UCR) is an annual fee based on your fleet size. It applies to carriers, brokers, and freight forwarders operating in interstate commerce. It is inexpensive but easy to forget, and running without it can mean fines or being placed out of service at a roadside inspection.",
    ],
  },
  {
    id: "compliance",
    eyebrow: "Step 6",
    title: "Build your safety and compliance foundation",
    paragraphs: [
      "From your first day of operation, you are responsible for driver qualification files, drug and alcohol testing enrollment, hours-of-service compliance, ELD use, and vehicle maintenance records. Your CSA (Compliance, Safety, Accountability) scores start accumulating immediately.",
      "This matters more than new carriers expect: your safety record directly shapes what insurance markets will write you and at what price. A clean compliance foundation is one of the best investments you can make in your future premiums.",
    ],
  },
  {
    id: "operations",
    eyebrow: "Step 7",
    title: "First trucks, first loads, first claims",
    paragraphs: [
      "With your authority active, you can start booking freight, through load boards, direct shipper relationships, or brokers. Make sure your cargo coverage and limits match what you are actually hauling before you accept a load, and keep certificates handy so a booking never stalls on paperwork.",
      "And when the first claim comes, because eventually one does, how it is handled shapes your record. This is where having an agent who answers, and an in-house claims team, stops being a nice-to-have.",
    ],
  },
  {
    id: "upgrade-broker",
    eyebrow: "Step 8",
    title: "Know when to upgrade your broker",
    paragraphs: [
      "The fast-quote broker that got you on the road is rarely the broker that grows with you. Once you have a couple of years of operating history and a clean record, you become eligible for the premium A-rated markets that most new authorities cannot access, better terms, higher limits, and carriers that handle claims like professionals.",
      "That transition, from getting-started coverage to specialist placement, is exactly what Road Ready Insurance is built for. When you are 2 years in and growing, that is the moment to talk.",
    ],
  },
];

const FAQS: FAQItem[] = [
  {
    question: "How much does it cost to start a trucking company?",
    answer:
      "Beyond the truck itself, plan for authority registration, insurance (your largest recurring cost), IRP plates, IFTA, UCR, BOC-3, and working capital for fuel and maintenance before your first invoices are paid. Insurance is the line item that varies most, which is why placement matters.",
  },
  {
    question: "How long does it take to get trucking authority?",
    answer:
      "After you file with the FMCSA, there is a mandatory vetting and waiting period before your authority becomes active, typically a few weeks, and your insurance and BOC-3 must be filed before it activates. Plan your start date around that window.",
  },
  {
    question: "Do I need insurance before or after I get my authority?",
    answer:
      "Before it activates. The FMCSA requires proof of insurance to be filed on your behalf before your authority goes active. Line up your coverage as part of the application process, not after.",
  },
  {
    question: "When should a new carrier switch to a specialist insurance broker?",
    answer:
      "Once you have roughly 2 years of operating history and a clean safety record, you become a strong candidate for premium A-rated markets. That is the right time to move from fast-quote coverage to specialist placement, and the point where Road Ready Insurance can help most.",
  },
];

export default function StartupGuidePage() {
  return (
    <>
      <BreadcrumbListSchema
        items={[
          { name: "Home", href: "/" },
          { name: "How to Start a Trucking Company", href: "/how-to-start-a-trucking-company/" },
        ]}
      />

      <Hero
        eyebrow="Startup guide"
        headline="How to start"
        headlineMuted="a trucking company."
        subhead="From authority to your first load, in plain English. The steps every new carrier has to clear, and where getting insurance right from the start pays off later."
        image={{ src: "/images/photos/specialists.webp", alt: "Trucking specialists guiding a new carrier through startup" }}
      />

      {/* On-page contents */}
      <section aria-label="Contents" className="border-b border-gray-100 bg-background">
        <div className="mx-auto max-w-4xl px-6 py-8 lg:px-8">
          <p className="mb-4 text-[13px] font-semibold capitalize tracking-normal text-primary">
            The 8 steps
          </p>
          <ol className="grid grid-cols-1 gap-x-8 gap-y-2 sm:grid-cols-2">
            {STEPS.map((step, i) => (
              <li key={step.id}>
                <a
                  href={`#${step.id}`}
                  className="group flex items-baseline gap-3 py-1 text-[15px] text-gray-700 transition-colors hover:text-primary"
                >
                  <span className="text-[13px] font-bold text-primary">{i + 1}</span>
                  <span className="group-hover:underline underline-offset-2">{step.title}</span>
                </a>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {STEPS.map((step, index) => (
        <section
          key={step.id}
          id={step.id}
          aria-labelledby={`${step.id}-heading`}
          className={cn("scroll-mt-28", index % 2 === 0 ? "bg-background" : "bg-gray-50")}
        >
          <div className="mx-auto flex max-w-3xl flex-col gap-5 px-6 py-16 lg:px-8 lg:py-20">
            <Reveal>
              <p className="text-[13px] font-semibold capitalize tracking-normal text-primary">
                {step.eyebrow}
              </p>
              <h2 id={`${step.id}-heading`} className="mt-2 text-[28px] type-h2 text-foreground sm:text-[34px]">
                {step.title}
              </h2>
            </Reveal>
            <div className="flex flex-col gap-4">
              {step.paragraphs.map((p, pIdx) => (
                <Reveal key={pIdx} delay={pIdx * 70}>
                  <p className="text-[17px] leading-[1.65] text-gray-700 sm:text-[18px]">{p}</p>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      ))}

      <section aria-labelledby="startup-faq-heading" className="border-t border-gray-100 bg-background">
        <div className="mx-auto flex max-w-3xl flex-col gap-8 px-6 py-20 lg:px-8 lg:py-24">
          <Reveal>
            <SectionHeading
              eyebrow="Common questions"
              headline="Starting out,"
              headlineMuted="answered."
            />
          </Reveal>
          <FAQ items={FAQS} />
          <Reveal>
            <Link
              href="/coverage/"
              className="inline-flex items-center gap-1.5 text-[15px] font-semibold text-primary transition-colors hover:text-primary-dark"
            >
              See the coverages a new authority needs
              <ArrowRight className="h-4 w-4" strokeWidth={1.75} />
            </Link>
          </Reveal>
        </div>
      </section>

      <CTABanner
        headline="Two years in and growing?"
        headlineMuted="Let's talk markets."
        subhead="When you are ready to move beyond fast-quote coverage, we place fleets with the premium A-rated carriers that reward a clean record."
        primaryCTA={{ text: "Start Your Quote", href: "/#quote-form" }}
        variant="primary"
      />
    </>
  );
}
