import { FillPhoto } from "@/components/blocks/fill-photo";
import Link from "next/link";
import { Reveal } from "@/components/blocks/reveal";

/**
 * Policy-review CTA — a short, wide photo banner. Heading + button sit
 * top-left over a left-weighted navy gradient; the photo stays visible on the
 * right. Photo: /public/images/policy-review.jpg.
 */
export function PolicyReviewCta() {
  return (
    <section aria-labelledby="policy-review-heading" className="bg-gray-50">
      <div className="mx-auto max-w-7xl px-6 py-12 lg:px-8 lg:py-16">
        <Reveal>
          <div className="relative isolate flex min-h-[420px] items-start overflow-hidden rounded-3xl bg-primary-dark text-white">
            <FillPhoto
              src="/images/policy-review.jpg"
              alt="An agent reviewing a trucking insurance policy line by line with a client"
              sizes="(min-width: 1280px) 1216px, 100vw"
              className="object-[center_18%]"
            />

            <div className="relative flex max-w-4xl flex-col items-start gap-5 p-8 sm:p-10 lg:p-14">
              <h2
                id="policy-review-heading"
                className="type-h2 text-balance text-[32px] text-white sm:text-[40px]"
              >
                Get the stronger protection your operation needs without the
                bigger bill.
              </h2>
              <Link
                href="/contact-us/"
                className="btn btn-cyan"
              >
                Schedule a policy review
              </Link>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
