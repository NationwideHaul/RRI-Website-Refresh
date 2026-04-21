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
  tagline: "Commercial trucking insurance, placed with the carriers that matter.",
} as const;
