/**
 * Road Ready Insurance — canonical business constants.
 *
 * PLACEHOLDERS MARKED WITH `PLACEHOLDER_` — confirm with Derek before launch.
 * See docs/RRI_03_Technical_Build_Prompts.docx §11 pre-launch checklist.
 */

export const NAP = {
  legalName: "Road Ready Insurance Agency",
  shortName: "Road Ready Insurance",
  phone: "PLACEHOLDER_PHONE", // e.g. "+1-561-555-0100" — confirm with Derek
  phoneDisplay: "PLACEHOLDER_PHONE_DISPLAY", // e.g. "(561) 555-0100"
  email: "PLACEHOLDER_EMAIL", // e.g. "info@roadreadyinsurance.com"
  address: {
    street: "PLACEHOLDER_STREET", // Boca Raton office street address
    city: "Boca Raton",
    state: "FL",
    zip: "PLACEHOLDER_ZIP",
    country: "US",
  },
  hours: "Monday-Friday, 9am-6pm ET",
  geo: {
    // Approximate Boca Raton centroid — replace with exact office coordinates
    latitude: 26.3683,
    longitude: -80.1289,
  },
} as const;

export const LICENSE_INFO = {
  statesLicensed: 48,
  plusDC: true,
  licensedDescription: "Licensed in 48 states plus the District of Columbia",
  // Per-state license numbers needed for footer disclosure / state pages.
  // Ask Derek for the full list (FL, GA, TX, NJ, NC, OH, IL, TN, SC, AL for Phase 1-2).
  licenseNumbers: {
    FL: "PLACEHOLDER_FL_LICENSE",
  } as Record<string, string>,
} as const;

/**
 * Carriers RRI holds active appointments with.
 * NAMING SPECIFIC CARRIERS REQUIRES DEREK'S WRITTEN CONFIRMATION.
 * Until confirmed, use `CARRIERS_COUNT_LABEL` only.
 */
export const CARRIERS_PENDING_CONFIRMATION = [
  "Great West Casualty Company",
  "Sentry Insurance",
  "QBE",
  "Lancer Insurance",
  // Plus 100+ additional carriers
] as const;

export const CARRIERS_COUNT_LABEL = "100+ carriers";

export const STATS = {
  statesLicensed: {
    value: "48+",
    label: "States plus DC",
    detail: "Licensed across the continental US",
  },
  carriers: {
    value: "100+",
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
    "Specialist commercial trucking insurance broker. Licensed in 48 states plus DC with access to 100+ carriers including premium A-rated markets. In-house licensed claims and named agents who answer the phone.",
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
