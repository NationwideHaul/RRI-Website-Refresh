/**
 * Google reviews — static fallback data.
 *
 * These are the real reviews visible on RRI's Google Business Profile
 * (captured from the existing homepage widget). They render whenever the
 * live Places API is not configured. To go fully live, set in .env.local:
 *
 *   GOOGLE_PLACES_API_KEY=...   (Places API (New) enabled key)
 *   RRI_GOOGLE_PLACE_ID=...     (the agency's Place ID)
 *
 * lib/reviews.ts then refreshes rating, count, and review cards hourly.
 */

export type Review = {
  author: string;
  rating: number;
  text: string;
  relativeTime: string;
  /** Avatar circle color when no photo is available. */
  avatarColor: string;
};

export const REVIEWS_SUMMARY = {
  rating: 5.0,
  count: 103,
};

/** RRI's Google Business Profile review link (provided by Adriana). */
export const REVIEWS_URL = "https://g.page/r/CdPp7siXKtrhEAE/review";

export const REVIEWS: Review[] = [
  {
    author: "Jae Ross",
    rating: 5,
    text: "Handled it with efficiency & maximum professionalism... Would highly recommend!",
    relativeTime: "2 months ago",
    avatarColor: "#7c3aed",
  },
  {
    author: "Brent",
    rating: 5,
    text: "I've been with Road Ready now for 6 years. Excellent customer service. They drop everything to help.",
    relativeTime: "3 months ago",
    avatarColor: "#0891b2",
  },
  {
    author: "Maissada Nabi",
    rating: 5,
    text: "Road Ready Insurance Agency delivers an outstanding experience with a strong focus on service.",
    relativeTime: "3 months ago",
    avatarColor: "#d97706",
  },
  {
    author: "Berg Transportation",
    rating: 5,
    text: "They found me insurance the last minute when I needed the most. Thank you!",
    relativeTime: "5 months ago",
    avatarColor: "#dc2626",
  },
];
