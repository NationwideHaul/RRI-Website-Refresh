import type { Metadata } from "next";
import Link from "next/link";
import { BookOpen, FileText, Gauge, Map, Scale, Wrench } from "lucide-react";
import { Hero } from "@/components/blocks/hero";
import { Reveal } from "@/components/blocks/reveal";
import { SectionHeading } from "@/components/blocks/section-heading";
import { NewsletterForm } from "@/components/blocks/newsletter-form";
import { BreadcrumbListSchema } from "@/components/schema/breadcrumb-list";

export const metadata: Metadata = {
  title: "Road Ready Blog",
  description:
    "Straight-talking guidance on commercial trucking insurance, compliance, and running a fleet, from the specialists at Road Ready Insurance. New articles coming soon.",
  alternates: { canonical: "/road-ready-blog/" },
};

const TOPICS = [
  { icon: Scale, title: "Coverage explained", body: "What each policy actually does, in plain English, and the gaps that catch operators out." },
  { icon: Gauge, title: "CSA & compliance", body: "How your safety scores shape your premiums, and what to do about them." },
  { icon: FileText, title: "Claims & the fine print", body: "Why claims get denied, and how carrier quality changes the outcome." },
  { icon: Map, title: "The insurance market", body: "What is driving rates, nuclear verdicts, capacity, and the A-rated markets." },
  { icon: Wrench, title: "Running a fleet", body: "Practical guidance for growing from owner-operator to a fleet that lasts." },
  { icon: BookOpen, title: "New authority basics", body: "The startup steps, from authority to your first load and first renewal." },
];

export default function BlogIndexPage() {
  return (
    <>
      <BreadcrumbListSchema
        items={[
          { name: "Home", href: "/" },
          { name: "Road Ready Blog", href: "/road-ready-blog/" },
        ]}
      />

      <Hero
        eyebrow="Road Ready blog"
        headline="Insight for operators"
        headlineMuted="who take this seriously."
        subhead="No filler, no fear-mongering, just clear guidance on trucking insurance, compliance, and building a fleet that lasts. The first articles are on the way."
        image={{ src: "/images/photos/highway.webp", alt: "A truck on the open highway" }}
      />

      <section aria-labelledby="topics-heading" className="bg-background">
        <div className="mx-auto flex max-w-7xl flex-col gap-12 px-6 py-20 lg:px-8 lg:py-24">
          <Reveal>
            <SectionHeading
              eyebrow="What we'll cover"
              headline="The topics"
              headlineMuted="we're writing about."
              align="center"
            />
          </Reveal>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {TOPICS.map((topic, i) => {
              const Icon = topic.icon;
              return (
                <Reveal key={topic.title} delay={(i % 3) * 80} className="h-full">
                  <div className="flex h-full flex-col gap-4 rounded-2xl border border-gray-100 bg-white p-7 shadow-sm">
                    <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-primary-soft">
                      <Icon className="h-6 w-6 text-primary" strokeWidth={1.5} />
                    </span>
                    <h3 className="text-[19px] font-semibold text-foreground">{topic.title}</h3>
                    <p className="text-[15px] leading-[1.6] text-gray-700">{topic.body}</p>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* Newsletter band (dark, uses cyan form) */}
      <section aria-labelledby="subscribe-heading" className="relative isolate overflow-hidden bg-primary">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 z-0 opacity-70"
          style={{ background: "radial-gradient(50% 70% at 80% 10%, rgba(0,255,252,0.10), transparent 60%)" }}
        />
        <div className="relative z-10 mx-auto flex max-w-2xl flex-col items-center gap-6 px-6 py-20 text-center lg:py-24">
          <h2 id="subscribe-heading" className="text-[32px] type-h2 text-white sm:text-[40px]">
            Be first to read it.
          </h2>
          <p className="text-[17px] leading-[1.6] text-white/85 sm:text-[18px]">
            Subscribe and we will send new articles when they land, no spam, no daily emails,
            just the occasional piece worth your time.
          </p>
          <div className="w-full max-w-md">
            <NewsletterForm />
          </div>
          <p className="text-[13px] text-white/60">
            Looking for the startup basics now?{" "}
            <Link href="/how-to-start-a-trucking-company/" className="text-cyan underline underline-offset-2 hover:text-white">
              Read the Startup Guide
            </Link>
            .
          </p>
        </div>
      </section>
    </>
  );
}
