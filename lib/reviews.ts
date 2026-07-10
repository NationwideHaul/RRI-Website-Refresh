import {
  REVIEWS,
  REVIEWS_SUMMARY,
  type Review,
} from "@/content/reviews";

export type ReviewsData = {
  rating: number;
  count: number;
  reviews: Review[];
  live: boolean;
};

const AVATAR_COLORS = ["#7c3aed", "#0891b2", "#d97706", "#dc2626", "#059669"];

type PlacesReview = {
  rating?: number;
  relativePublishTimeDescription?: string;
  text?: { text?: string };
  authorAttribution?: { displayName?: string };
};

type PlacesResponse = {
  rating?: number;
  userRatingCount?: number;
  reviews?: PlacesReview[];
};

/**
 * Live Google Business Profile data via Places API (New), refreshed hourly.
 * Falls back to the captured static reviews when the API is not configured
 * or the request fails, so the section never renders empty.
 */
export async function getReviews(): Promise<ReviewsData> {
  const apiKey = process.env.GOOGLE_PLACES_API_KEY;
  const placeId = process.env.RRI_GOOGLE_PLACE_ID;

  if (apiKey && placeId) {
    try {
      const res = await fetch(
        `https://places.googleapis.com/v1/places/${placeId}`,
        {
          headers: {
            "X-Goog-Api-Key": apiKey,
            "X-Goog-FieldMask": "rating,userRatingCount,reviews",
          },
          next: { revalidate: 3600 },
        },
      );
      if (res.ok) {
        const data = (await res.json()) as PlacesResponse;
        const reviews: Review[] = (data.reviews ?? [])
          .filter((r) => (r.text?.text ?? "").trim().length > 0)
          .map((r, i) => ({
            author: r.authorAttribution?.displayName ?? "Google user",
            rating: r.rating ?? 5,
            text: r.text?.text ?? "",
            relativeTime: r.relativePublishTimeDescription ?? "",
            avatarColor: AVATAR_COLORS[i % AVATAR_COLORS.length],
          }));
        if (reviews.length > 0) {
          return {
            rating: data.rating ?? REVIEWS_SUMMARY.rating,
            count: data.userRatingCount ?? REVIEWS_SUMMARY.count,
            reviews,
            live: true,
          };
        }
      } else {
        console.warn(`[reviews] Places API responded ${res.status}`);
      }
    } catch (err) {
      console.warn("[reviews] Places API fetch failed:", err);
    }
  }

  return {
    rating: REVIEWS_SUMMARY.rating,
    count: REVIEWS_SUMMARY.count,
    reviews: REVIEWS,
    live: false,
  };
}
