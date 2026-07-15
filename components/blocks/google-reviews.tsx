import { Star } from "lucide-react";
import { SectionHeading } from "@/components/blocks/section-heading";
import { Reveal } from "@/components/blocks/reveal";
import { ReviewsCarousel } from "@/components/blocks/reviews-carousel";
import { GoogleG } from "@/components/blocks/google-g";
import { getReviews } from "@/lib/reviews";
import { REVIEWS_URL } from "@/content/reviews";

/**
 * "Backed by our loyal customers" — Google Business Profile reviews in the
 * native Google-widget look: rating summary bar + review cards. Data comes
 * from lib/reviews.ts (live Places API when configured, static otherwise).
 */
export async function GoogleReviews() {
  const { rating, count, reviews } = await getReviews();
  const ratingLabel = Number.isInteger(rating) ? rating.toFixed(1) : `${rating}`;

  return (
    <section aria-labelledby="reviews-heading" className="bg-gray-50">
      <div className="mx-auto flex max-w-7xl flex-col gap-8 px-6 py-12 lg:px-8 lg:py-16">
        <Reveal>
          <SectionHeading
            headline="Backed by"
            headlineMuted="our loyal customers"
            align="center"
            className="[&>h2]:sm:text-[36px]"
          />
        </Reveal>

        <Reveal delay={100}>
          <div className="mx-auto flex flex-wrap items-center justify-center gap-x-3 gap-y-2 rounded-full bg-white px-6 py-3 shadow-sm ring-1 ring-gray-100">
            <GoogleG className="h-5 w-5" />
            <span className="flex items-center gap-0.5" aria-hidden="true">
              {Array.from({ length: 5 }, (_, i) => (
                <Star
                  key={i}
                  className="h-4 w-4 fill-amber-400 text-amber-400"
                  strokeWidth={0}
                />
              ))}
            </span>
            <span className="text-[15px] font-semibold text-foreground">
              {ratingLabel} out of 5
            </span>
            <span className="text-[15px] text-gray-500">
              based on {count} Google reviews
            </span>
          </div>
        </Reveal>

        <Reveal delay={150}>
          <ReviewsCarousel reviews={reviews} reviewsUrl={REVIEWS_URL} />
        </Reveal>
      </div>
    </section>
  );
}
