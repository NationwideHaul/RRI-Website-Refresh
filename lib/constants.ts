/**
 * Road Ready Insurance — canonical business constants.
 *
 * PLACEHOLDERS MARKED WITH `PLACEHOLDER_` — confirm with Derek before launch.
 * See docs/RRI_03_Technical_Build_Prompts.docx §11 pre-launch checklist.
 */

export const NAP = {
  legalName: "Road Ready Insurance Agency",
  shortName: "Road Ready Insurance",
  phone: "+19549534845",
  phoneDisplay: "(954) 953-4845",
  email: "info@roadreadyinsurance.com",
  // Internal lead-routing destination (form submissions). Kept here so
  // schema-builder never ships it publicly but form API can reference it.
  leadsEmail: "agents@roadreadyinsurance.com",
  address: {
    street: "101 Plaza Real S, Suite 226",
    city: "Boca Raton",
    state: "FL",
    zip: "33432",
    country: "US",
  },
  hours: "Monday-Friday, 9am-6pm ET",
  geo: {
    // 101 Plaza Real S, Boca Raton — approximate Plaza Real centroid.
    // Refine to exact office coordinates if needed for LocalBusiness geo.
    latitude: 26.3487,
    longitude: -80.0843,
  },
} as const;

export const LICENSE_INFO = {
  statesLicensed: 48,
  plusDC: true,
  licensedDescription: "Licensed in 48 states plus the District of Columbia",
  // RRI's Florida agency license. Per-state license numbers for other states
  // pending Derek confirmation (needed for state pages Phase 2).
  agencyLicenseNumber: "6003367",
  licenseNumbers: {
    FL: "6003367",
  } as Record<string, string>,
} as const;

/**
 * Carriers displayed publicly on the site (homepage strip, trust
 * elements, etc.). Add a new entry here + drop a logo PNG/WEBP/SVG
 * in /public/images/carriers/ to extend.
 *
 * Derek still needs to confirm carrier appointment status for any
 * name ADDED here. Logos should be supplied/approved by the carrier.
 */
export type DisplayCarrier = {
  name: string;
  slug: string;
  logo: string; // path under /public
};

export const CARRIERS_DISPLAY: DisplayCarrier[] = [
  { name: "Great West Casualty Company", slug: "great-west", logo: "/images/carriers/great-west.webp" },
  { name: "Berkshire Hathaway Homestate Companies", slug: "bhhc", logo: "/images/carriers/bhhc.png" },
  { name: "Lancer Insurance", slug: "lancer", logo: "/images/carriers/lancer.png" },
  { name: "Progressive Commercial", slug: "progressive", logo: "/images/carriers/progressive.png" },
  { name: "Northland Insurance", slug: "northland", logo: "/images/carriers/northland.png" },
];

export const CARRIERS_COUNT_LABEL = "120+ carriers";

export const STATS = {
  statesLicensed: {
    value: "48+",
    label: "States plus DC",
    detail: "Licensed across the continental US",
  },
  carriers: {
    value: "120+",
    label: "Carriers",
    detail: "Including premium A-rated markets",
  },
  claims: {
    value: "In-House",
    label: "Claims adjuster",
    detail: "Licensed professional on staff",
  },
  sweetSpot: {
    value: "2-9",
    label: "Units, our sweet spot",
    detail: "Small-to-mid fleets, 2+ years in business",
  },
} as const;

export const SITE = {
  url: "https://www.roadreadyinsurance.com",
  name: "Road Ready Insurance",
  legalName: "Road Ready Insurance Agency",
  description:
    "Specialist commercial trucking insurance broker. Licensed in 48 states plus DC with access to 120+ carriers including premium A-rated markets. In-house licensed claims and named agents who answer the phone.",
  tagline: "Commercial trucking insurance, placed with the carriers that matter.",
  logoPath: "/images/rr-primary-logo.png",
  foundingLocation: "Boca Raton, FL",
} as const;

/**
 * Social / external profile URLs used in schema `sameAs`.
 * Confirm exact handles with Derek; leave empty strings filtered out
 * in schema builders so a placeholder never ships.
 */
export const SOCIALS = {
  facebook: "", // e.g. "https://www.facebook.com/roadreadyinsurance"
  linkedin: "", // e.g. "https://www.linkedin.com/company/road-ready-insurance"
  instagram: "", // e.g. "https://www.instagram.com/roadreadyinsurance"
  youtube: "",
  twitter: "",
} as const;

/**
 * Coverage types offered (mirrors INSURANCE_SOLUTIONS in nav-config).
 * Used for InsuranceAgency `serviceType` and offer catalogs.
 */
export const SERVICE_TYPES = [
  "Commercial Trucking Liability Insurance",
  "Physical Damage Insurance",
  "Motor Truck Cargo Insurance",
  "Trailer Interchange Insurance",
  "Non-Trucking Liability Insurance",
  "Reefer Breakdown Insurance",
  "Truckers Workers Compensation",
  "Transportation Bonds",
  "Single Trip Cargo Insurance",
  "Construction Equipment Insurance",
  "Additional Commercial Trucking Coverages",
] as const;

/**
 * Full list of US states + DC where RRI is licensed.
 * Used for InsuranceAgency `areaServed`. This is the 48-state list
 * (excludes Hawaii and Alaska, per strategy doc — confirm with Derek).
 */
export const AREA_SERVED_STATES = [
  "AL", "AR", "AZ", "CA", "CO", "CT", "DC", "DE", "FL", "GA",
  "IA", "ID", "IL", "IN", "KS", "KY", "LA", "MA", "MD", "ME",
  "MI", "MN", "MO", "MS", "MT", "NC", "ND", "NE", "NH", "NJ",
  "NM", "NV", "NY", "OH", "OK", "OR", "PA", "RI", "SC", "SD",
  "TN", "TX", "UT", "VA", "VT", "WA", "WI", "WV", "WY",
] as const;
