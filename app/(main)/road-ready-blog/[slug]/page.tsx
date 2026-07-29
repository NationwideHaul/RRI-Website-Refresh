import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Calendar, Clock } from "lucide-react";
import { Reveal } from "@/components/blocks/reveal";
import { CTABanner } from "@/components/blocks/cta-banner";
import { BreadcrumbListSchema } from "@/components/schema/breadcrumb-list";
import { ArticleSchema } from "@/components/schema/article";
import { getPostBySlug, POSTS } from "@/content/blog";
import { SITE } from "@/lib/constants";

export const dynamicParams = false;

export function generateStaticParams() {
  return POSTS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return {};
  return {
    title: post.title,
    description: post.description,
    alternates: { canonical: post.href },
    openGraph: {
      type: "article",
      title: post.title,
      description: post.description,
      url: `${SITE.url}${post.href}`,
      publishedTime: post.datePublished,
      modifiedTime: post.dateModified ?? post.datePublished,
      authors: [post.author],
      images: [post.image ?? SITE.logoPath],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.description,
      images: [post.image ?? SITE.logoPath],
    },
  };
}

function formatDate(iso: string): string {
  // Deterministic, locale-stable formatting (avoids SSR/CSR drift).
  const [y, m, d] = iso.split("-").map(Number);
  const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December",
  ];
  return `${months[m - 1]} ${d}, ${y}`;
}

const SECTION = "mx-auto max-w-3xl px-6 lg:px-8";

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  return (
    <>
      <BreadcrumbListSchema
        items={[
          { name: "Home", href: "/" },
          { name: "Road Ready Blog", href: "/road-ready-blog/" },
          { name: post.title, href: post.href },
        ]}
      />
      <ArticleSchema
        headline={post.title}
        description={post.description}
        slug={post.href}
        authorName={post.author}
        datePublished={post.datePublished}
        dateModified={post.dateModified}
        imagePath={post.image}
      />

      {/* Header */}
      <section
        aria-labelledby="post-heading"
        className="relative isolate -mt-24 overflow-hidden bg-primary-dark"
      >
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 z-0"
          style={{
            background:
              "radial-gradient(60% 80% at 78% 20%, rgba(0,255,252,0.14), transparent 60%), radial-gradient(70% 90% at 8% 90%, rgba(34,82,150,0.55), transparent 55%)",
          }}
        />
        <div className="relative z-10 mx-auto flex max-w-3xl flex-col gap-5 px-6 pb-14 pt-36 lg:px-8 lg:pb-16 lg:pt-44">
          <Link
            href="/road-ready-blog/"
            className="inline-flex w-fit items-center gap-2 text-[13px] text-white/70 transition-colors hover:text-cyan"
          >
            <ArrowLeft className="h-4 w-4" strokeWidth={2} />
            Road Ready Blog
          </Link>
          <span className="inline-flex w-fit items-center rounded-full border border-white/20 bg-white/5 px-3 py-1 text-[12px] text-cyan">
            {post.category}
          </span>
          <h1
            id="post-heading"
            className="max-w-2xl text-[34px] type-display text-white sm:text-[42px] lg:text-[48px]"
          >
            {post.title}
          </h1>
          <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-[13px] text-white/70">
            <span className="inline-flex items-center gap-1.5">
              <Calendar className="h-3.5 w-3.5" strokeWidth={1.75} />
              {formatDate(post.datePublished)}
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Clock className="h-3.5 w-3.5" strokeWidth={1.75} />
              {post.readMinutes} min read
            </span>
            <span>By {post.author}</span>
          </div>
        </div>
      </section>

      {/* Body */}
      <div className="bg-[#eef1f6] px-3 pb-3 pt-3 sm:px-5 sm:pb-5 sm:pt-5 lg:px-6 lg:pb-6 lg:pt-6">
        <div className="overflow-hidden rounded-4xl border border-gray-200/80 bg-background shadow-[0_1px_2px_rgba(10,37,64,0.04),0_16px_40px_-16px_rgba(10,37,64,0.14)]">
          <article className={`${SECTION} flex flex-col gap-6 py-16 lg:py-20`}>
            {post.intro.map((p, i) => (
              <Reveal key={`intro-${i}`}>
                <p className="text-[18px] leading-[1.7] text-ink sm:text-[19px]">{p}</p>
              </Reveal>
            ))}

            {post.body.map((section, i) => (
              <div key={i} className="flex flex-col gap-4">
                {section.heading && (
                  <Reveal>
                    <h2 className="mt-4 type-h2 text-[24px] text-ink sm:text-[28px]">
                      {section.heading}
                    </h2>
                  </Reveal>
                )}
                {section.paragraphs?.map((p, j) => (
                  <Reveal key={`p-${j}`}>
                    <p className="text-[16px] leading-[1.7] text-gray-700 sm:text-[17px]">{p}</p>
                  </Reveal>
                ))}
                {section.bullets && (
                  <Reveal>
                    <ul className="flex flex-col gap-2.5">
                      {section.bullets.map((b, k) => (
                        <li
                          key={k}
                          className="flex items-start gap-3 text-[16px] leading-[1.6] text-gray-700 sm:text-[17px]"
                        >
                          <span className="mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-primary" />
                          {b}
                        </li>
                      ))}
                    </ul>
                  </Reveal>
                )}
              </div>
            ))}

            <Reveal>
              <p className="mt-6 rounded-2xl border border-gray-200 bg-primary-soft/50 p-6 text-[15px] leading-[1.65] text-gray-700">
                This article is general guidance, not a quote or legal advice. For coverage built
                around your specific operation,{" "}
                <Link href="/#quote-form" className="text-primary underline-offset-2 hover:underline">
                  start a quote
                </Link>{" "}
                and talk to a trucking specialist.
              </p>
            </Reveal>
          </article>
        </div>
      </div>

      <CTABanner
        headline="Coverage built around your operation."
        subhead="Talk to an agent who specializes in trucking. We place your fleet with the carriers that matter."
        primaryCTA={{ text: "Start Your Quote", href: "/#quote-form" }}
        variant="primary"
      />
    </>
  );
}
