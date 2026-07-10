import { FillPhoto } from "@/components/blocks/fill-photo";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Reveal } from "@/components/blocks/reveal";

/**
 * Policy-review CTA — the "switch to us" moment. Full-width photo card
 * with a left-weighted navy overlay. Photo: Adriana's "Schedule a Review
 * pic.png", optimized to /public/images/policy-review.jpg.
 */
export function PolicyReviewCta() {
  return (
    <section aria-labelledby="policy-review-heading" className="bg-background">
      <div className="mx-auto max-w-7xl px-6 py-20 lg:px-8 lg:py-24">
        <Reveal>
          <div className="relative isolate overflow-hidden rounded-3xl bg-primary-dark text-white">
            <FillPhoto
              src="/images/policy-review.jpg"
              alt="An agent reviewing a trucking insurance policy line by line with a client"
              sizes="(min-width: 1280px) 1216px, 100vw"
            />
            <div
              aria-hidden="true"
              className="absolute inset-0 bg-gradient-to-r from-primary-dark/95 via-primary-dark/75 to-primary-dark/25"
            />

            <div className="relative flex max-w-2xl flex-col gap-5 p-10 sm:p-14 lg:p-20">
              <h2
                id="policy-review-heading"
                className="text-[32px] font-semibold leading-[1.12] tracking-[-0.01em] sm:text-[42px]"
              >
                When was the last time your agent called you first?
              </h2>
              <p className="text-[16px] leading-[1.65] text-white/85 sm:text-[18px]">
                Bring us your current policy. We will review it line by line,
                show you what you are actually paying for, and tell you
                honestly if you already have the right deal.
              </p>
              <Link
                href="/contact-us/"
                className="inline-flex h-[52px] w-fit items-center gap-2 rounded-lg bg-white px-7 text-[16px] font-semibold text-primary transition-colors hover:bg-cyan hover:text-primary-dark"
              >
                Schedule a Policy Review
                <ArrowRight className="h-4 w-4" strokeWidth={2} />
              </Link>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
