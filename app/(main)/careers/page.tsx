import type { Metadata } from "next";
import { Award, HeartHandshake, TrendingUp, Users } from "lucide-react";
import { Hero } from "@/components/blocks/hero";
import { Reveal } from "@/components/blocks/reveal";
import { SectionHeading } from "@/components/blocks/section-heading";
import { FillPhoto } from "@/components/blocks/fill-photo";
import { BreadcrumbListSchema } from "@/components/schema/breadcrumb-list";
import { NAP } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Careers",
  description:
    "Join a specialist commercial trucking insurance agency built on expertise and long-term client partnerships. See what it's like to work at Road Ready Insurance in Boca Raton, FL.",
  alternates: { canonical: "/careers/" },
};

const VALUES = [
  {
    icon: Award,
    title: "Premium, not fast",
    body: "We compete on expertise and carrier access, not speed-to-quote. That means the work here is real insurance work, done right.",
  },
  {
    icon: HeartHandshake,
    title: "Named agents, real relationships",
    body: "Our people own their books and their client relationships. No call-center scripts, no anonymous ticket queues.",
  },
  {
    icon: TrendingUp,
    title: "Room to grow",
    body: "We are a growing agency. The people who join now help shape how it runs, and grow with it.",
  },
  {
    icon: Users,
    title: "A team that has your back",
    body: "In-house claims, licensed specialists, and colleagues who pick up the phone for each other as readily as for clients.",
  },
];

export default function CareersPage() {
  return (
    <>
      <BreadcrumbListSchema
        items={[
          { name: "Home", href: "/" },
          { name: "Careers", href: "/careers/" },
        ]}
      />

      <Hero
        eyebrow="Careers"
        headline="Build a career where"
        headlineMuted="expertise is the product."
        subhead="Road Ready Insurance is a specialist trucking agency built on knowing our craft and standing behind our clients. If that is how you want to work, we should talk."
        image={{ src: "/images/photos/agent-driver.webp", alt: "The Road Ready Insurance team at work" }}
      />

      {/* Values */}
      <section aria-labelledby="values-heading" className="bg-background">
        <div className="mx-auto flex max-w-7xl flex-col gap-12 px-6 py-20 lg:px-8 lg:py-24">
          <Reveal>
            <SectionHeading
              eyebrow="Why work here"
              headline="An agency built"
              headlineMuted="the way it should be."
              align="center"
            />
          </Reveal>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {VALUES.map((v, i) => {
              const Icon = v.icon;
              return (
                <Reveal key={v.title} delay={(i % 4) * 70} className="h-full">
                  <div className="flex h-full flex-col gap-4 rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
                    <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-primary-soft">
                      <Icon className="h-6 w-6 text-primary" strokeWidth={1.5} />
                    </span>
                    <h3 className="text-[18px] font-semibold text-foreground">{v.title}</h3>
                    <p className="text-[15px] leading-[1.6] text-gray-700">{v.body}</p>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* Culture split: photo + copy */}
      <section aria-labelledby="culture-heading" className="bg-gray-50">
        <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-12 px-6 py-20 lg:grid-cols-2 lg:gap-16 lg:px-8 lg:py-24">
          <Reveal>
            <div className="relative aspect-[4/3] overflow-hidden rounded-4xl">
              <FillPhoto
                src="/images/photos/specialists.webp"
                alt="The Road Ready Insurance team at work"
                sizes="(min-width: 1024px) 45vw, 100vw"
              />
            </div>
          </Reveal>
          <Reveal delay={100}>
            <div className="flex flex-col gap-5">
              <p className="text-[13px] font-semibold capitalize tracking-normal text-primary">
                Life at Road Ready
              </p>
              <h2 id="culture-heading" className="text-[30px] type-h2 text-foreground sm:text-[38px]">
                Boca Raton based. Trucking focused.
              </h2>
              <p className="text-[17px] leading-[1.65] text-gray-700 sm:text-[18px]">
                We are a tight, specialist team working out of Boca Raton, Florida,
                serving fleet operators across 48 states. You will learn commercial
                trucking insurance from people who do it at a high level, and you
                will be trusted to own your work from early on.
              </p>
              <p className="text-[17px] leading-[1.65] text-gray-700 sm:text-[18px]">
                We hire for curiosity, straight talk, and a genuine interest in the
                clients we serve. Licensing and product knowledge can be taught;
                those qualities are harder to.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Open roles / apply */}
      <section aria-labelledby="roles-heading" className="relative isolate overflow-hidden bg-primary">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 z-0 opacity-70"
          style={{ background: "radial-gradient(50% 70% at 20% 20%, rgba(0,255,252,0.10), transparent 60%)" }}
        />
        <div className="relative z-10 mx-auto flex max-w-2xl flex-col items-center gap-6 px-6 py-20 text-center lg:py-24">
          <h2 id="roles-heading" className="text-[32px] type-h2 text-white sm:text-[40px]">
            Interested in joining us?
          </h2>
          <p className="text-[17px] leading-[1.6] text-white/85 sm:text-[18px]">
            We are always glad to hear from licensed agents, CSRs, and claims
            professionals who want to do trucking insurance the right way. Send us
            your resume and a note about what you are looking for.
          </p>
          <a
            href={`mailto:${NAP.email}?subject=Careers%20at%20Road%20Ready%20Insurance`}
            className="btn bg-cyan text-primary-dark hover:bg-white"
          >
            Send your resume
          </a>
          <p className="text-[13px] text-white/60">
            Or call the office at{" "}
            <a href={`tel:${NAP.phone}`} className="text-cyan underline underline-offset-2 hover:text-white">
              {NAP.phoneDisplay}
            </a>
            .
          </p>
        </div>
      </section>
    </>
  );
}
