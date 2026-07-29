/**
 * State catalog — the states with dedicated commercial trucking insurance
 * landing pages. Single source of truth for the states index grid, the
 * nav/footer links, the sitemap, and the individual state pages.
 *
 * Mirrors the coverage catalog model (see content/coverage/index.ts): a
 * lightweight array here + a keyed detail record in details.ts, joined by
 * slug. Every slug here MUST have a matching STATE_DETAILS entry (the route
 * uses dynamicParams=false, so a mismatch would 404). Seeded from the
 * STATE_LICENSES roster in lib/constants.ts (DC excluded — not a state).
 */

export type State = {
  slug: string;
  href: string; // leading + trailing slash, e.g. "/states/florida/"
  name: string;
  abbr: string; // two-letter postal code
};

export const STATES: State[] = [
  { slug: "alabama", href: "/states/alabama/", name: "Alabama", abbr: "AL" },
  { slug: "arizona", href: "/states/arizona/", name: "Arizona", abbr: "AZ" },
  { slug: "arkansas", href: "/states/arkansas/", name: "Arkansas", abbr: "AR" },
  { slug: "california", href: "/states/california/", name: "California", abbr: "CA" },
  { slug: "colorado", href: "/states/colorado/", name: "Colorado", abbr: "CO" },
  { slug: "connecticut", href: "/states/connecticut/", name: "Connecticut", abbr: "CT" },
  { slug: "delaware", href: "/states/delaware/", name: "Delaware", abbr: "DE" },
  { slug: "florida", href: "/states/florida/", name: "Florida", abbr: "FL" },
  { slug: "georgia", href: "/states/georgia/", name: "Georgia", abbr: "GA" },
  { slug: "idaho", href: "/states/idaho/", name: "Idaho", abbr: "ID" },
  { slug: "illinois", href: "/states/illinois/", name: "Illinois", abbr: "IL" },
  { slug: "indiana", href: "/states/indiana/", name: "Indiana", abbr: "IN" },
  { slug: "iowa", href: "/states/iowa/", name: "Iowa", abbr: "IA" },
  { slug: "kansas", href: "/states/kansas/", name: "Kansas", abbr: "KS" },
  { slug: "kentucky", href: "/states/kentucky/", name: "Kentucky", abbr: "KY" },
  { slug: "louisiana", href: "/states/louisiana/", name: "Louisiana", abbr: "LA" },
  { slug: "maine", href: "/states/maine/", name: "Maine", abbr: "ME" },
  { slug: "maryland", href: "/states/maryland/", name: "Maryland", abbr: "MD" },
  { slug: "michigan", href: "/states/michigan/", name: "Michigan", abbr: "MI" },
  { slug: "minnesota", href: "/states/minnesota/", name: "Minnesota", abbr: "MN" },
  { slug: "mississippi", href: "/states/mississippi/", name: "Mississippi", abbr: "MS" },
  { slug: "missouri", href: "/states/missouri/", name: "Missouri", abbr: "MO" },
  { slug: "montana", href: "/states/montana/", name: "Montana", abbr: "MT" },
  { slug: "nebraska", href: "/states/nebraska/", name: "Nebraska", abbr: "NE" },
  { slug: "nevada", href: "/states/nevada/", name: "Nevada", abbr: "NV" },
  { slug: "new-hampshire", href: "/states/new-hampshire/", name: "New Hampshire", abbr: "NH" },
  { slug: "new-jersey", href: "/states/new-jersey/", name: "New Jersey", abbr: "NJ" },
  { slug: "new-mexico", href: "/states/new-mexico/", name: "New Mexico", abbr: "NM" },
  { slug: "new-york", href: "/states/new-york/", name: "New York", abbr: "NY" },
  { slug: "north-carolina", href: "/states/north-carolina/", name: "North Carolina", abbr: "NC" },
  { slug: "north-dakota", href: "/states/north-dakota/", name: "North Dakota", abbr: "ND" },
  { slug: "ohio", href: "/states/ohio/", name: "Ohio", abbr: "OH" },
  { slug: "oklahoma", href: "/states/oklahoma/", name: "Oklahoma", abbr: "OK" },
  { slug: "oregon", href: "/states/oregon/", name: "Oregon", abbr: "OR" },
  { slug: "pennsylvania", href: "/states/pennsylvania/", name: "Pennsylvania", abbr: "PA" },
  { slug: "south-carolina", href: "/states/south-carolina/", name: "South Carolina", abbr: "SC" },
  { slug: "south-dakota", href: "/states/south-dakota/", name: "South Dakota", abbr: "SD" },
  { slug: "tennessee", href: "/states/tennessee/", name: "Tennessee", abbr: "TN" },
  { slug: "texas", href: "/states/texas/", name: "Texas", abbr: "TX" },
  { slug: "utah", href: "/states/utah/", name: "Utah", abbr: "UT" },
  { slug: "virginia", href: "/states/virginia/", name: "Virginia", abbr: "VA" },
  { slug: "west-virginia", href: "/states/west-virginia/", name: "West Virginia", abbr: "WV" },
  { slug: "wisconsin", href: "/states/wisconsin/", name: "Wisconsin", abbr: "WI" },
  { slug: "wyoming", href: "/states/wyoming/", name: "Wyoming", abbr: "WY" },
];

export function getStateBySlug(slug: string): State | undefined {
  return STATES.find((s) => s.slug === slug);
}
