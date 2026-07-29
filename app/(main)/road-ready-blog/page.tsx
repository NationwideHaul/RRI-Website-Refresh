import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Calendar, Clock } from "lucide-react";
import { Hero } from "@/components/blocks/hero";
import { Reveal } from "@/components/blocks/reveal";
import { SectionHeading } from "@/components/blocks/section-heading";
import { NewsletterForm } from "@/components/blocks/newsletter-form";
import { BreadcrumbListSchema } from "@/components/schema/breadcrumb-list";
import { POSTS } from "@/content/blog";

export const metadata: Metadata = {
  title: "Road Ready Blog",
  description:
    "Straight-talking guidance on commercial trucking insurance, compliance, and running a fleet, from the specialists at Road Ready Insurance.",
  alternates: { canonical: "/road-ready-blog/" },
};

function formatDate(iso: string): string {
  const [y, m, d] = iso.split("-").map(Number);
  const months = [
    "Jan", "Feb", "Mar", "Apr", "May", "Jun",
    "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
  ];
  return `${months[m - 1]} ${d}, ${y}`;
}

// Newest first.
const SORTED_POSTS = [...POSTS].sort((a, b) =>
  a.datePublished < b.datePublished ? 1 : -1,
);

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
        subhead="No filler, no fear-mongering, just clear guidance on trucking insurance, compliance, and building a fleet that lasts."
        image={{ src: "/images/photos/highway.webp", alt: "A truck on the open highway" }}
      />

      <section aria-labelledby="posts-heading" className="bg-background">
        <div className="mx-auto flex max-w-7xl flex-col gap-12 px-6 py-20 lg:px-8 lg:py-24">
          <Reveal>
            <SectionHeading
              eyebrow="Latest articles"
              headline="Straight guidance,"
              headlineMuted="worth your time."
              align="center"
            />
          </Reveal>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {SORTED_POSTS.map((post, i) => (
              <Reveal key={post.slug} delay={(i % 3) * 80} className="h-full">
                <Link
                  href={post.href}
                  className="group flex h-full flex-col gap-4 rounded-2xl border border-gray-100 bg-white p-7 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-primary/30 hover:shadow-md"
                >
                  <span className="inline-flex w-fit items-center rounded-full bg-primary-soft px-3 py-1 text-[12px] font-medium text-primary">
                    {post.category}
                  </span>
                  <h3 className="text-[19px] font-semibold leading-[1.3] text-foreground">
                    {post.title}
                  </h3>
                  <p className="flex-1 text-[15px] leading-[1.6] text-gray-700">{post.excerpt}</p>
                  <span className="flex flex-wrap items-center gap-x-4 gap-y-1 text-[12px] text-slate">
                    <span className="inline-flex items-center gap-1.5">
                      <Calendar className="h-3.5 w-3.5" strokeWidth={1.75} />
                      {formatDate(post.datePublished)}
                    </span>
                    <span className="inline-flex items-center gap-1.5">
                      <Clock className="h-3.5 w-3.5" strokeWidth={1.75} />
                      {post.readMinutes} min
                    </span>
                  </span>
                  <span className="inline-flex items-center gap-1.5 text-[14px] font-medium text-primary">
                    Read article
                    <ArrowRight
                      className="h-4 w-4 transition-transform group-hover:translate-x-1"
                      strokeWidth={2}
                    />
                  </span>
                </Link>
              </Reveal>
            ))}
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
