/**
 * Top-nav + footer information architecture.
 * Source of truth for menu structure across Nav, MobileNav, and Footer.
 */

export type NavLink = { label: string; href: string; description?: string };

export type NavSection =
  | { kind: "link"; label: string; href: string }
  | { kind: "group"; label: string; children: NavLink[] };

export const INSURANCE_SOLUTIONS: NavLink[] = [
  { label: "Commercial Trucking Liability", href: "/commercial-trucking-liability/", description: "Foundational coverage for accidents and claims." },
  { label: "Physical Damage", href: "/physical-damage-comprehensive-collision/", description: "Comprehensive and collision for your trucks." },
  { label: "Motor Truck Cargo", href: "/motor-truck-cargo/", description: "Protection for the freight you haul." },
  { label: "Trailer Interchange", href: "/trailer-interchange/", description: "Coverage when you use someone else's trailer." },
  { label: "Non-Trucking Liability", href: "/non-trucking-liability/", description: "Off-duty and bobtail protection." },
  { label: "Reefer Breakdown", href: "/reefer-breakdown/", description: "When the unit fails and your load suffers." },
  { label: "Workers Compensation", href: "/truckers-workers-compensation/", description: "Protection for drivers and staff." },
  { label: "Transportation Bonds", href: "/trucking-transportation-bonds/", description: "BMC-84, ICC, and surety bonds." },
  { label: "Single Trip Cargo", href: "/single-trip-cargo-insurance/", description: "One-time high-value load coverage." },
  { label: "Construction Equipment", href: "/construction-equipment/", description: "Inland marine for heavy equipment." },
  { label: "Additional Coverages", href: "/additional-coverages/", description: "GAP, rental, tow and labor." },
];

export const CLIENT_RESOURCES: NavLink[] = [
  { label: "How to Start a Trucking Company", href: "/how-to-start-a-trucking-company/", description: "Startup guide for new authorities." },
  { label: "Get a COI", href: "/get-a-coi/", description: "Request a certificate of insurance." },
  { label: "Policy Change", href: "/policy-change/", description: "Add or remove units and endorsements." },
  { label: "Report a Claim", href: "/report-a-claim/", description: "Reach our in-house claims team." },
  { label: "Customer Service", href: "/customer-service/", description: "Client portal access." },
  { label: "Partner Network", href: "/client-perks/", description: "Vetted trucking partners for our clients." },
  { label: "Road Ready Blog", href: "/road-ready-blog/", description: "Industry insight and guidance." },
];

export const OUR_AGENCY: NavLink[] = [
  { label: "The Road Ready Insurance Advantage", href: "/rri-advantage/", description: "What makes Road Ready Insurance different." },
  { label: "Who We Cover", href: "/who-we-cover/", description: "Our ideal fleet profile." },
  { label: "Careers", href: "/careers/", description: "Join the Road Ready Insurance team." },
];

// Top nav follows Adriana's reference design: Coverage / Claims /
// About Us / Client Perks / Contact Us, with Client Portal + Call Now
// as pill buttons on the right.
export const NAV_SECTIONS: NavSection[] = [
  { kind: "group", label: "Coverage", children: INSURANCE_SOLUTIONS },
  { kind: "link", label: "Claims", href: "/report-a-claim/" },
  { kind: "group", label: "About Us", children: OUR_AGENCY },
  { kind: "link", label: "Partner Network", href: "/client-perks/" },
  { kind: "link", label: "Contact Us", href: "/contact-us/" },
];

export const FOOTER_COMPANY: NavLink[] = [
  { label: "Coverage", href: "/coverage/" },
  { label: "The Road Ready Insurance Advantage", href: "/rri-advantage/" },
  { label: "Who We Cover", href: "/who-we-cover/" },
  { label: "Careers", href: "/careers/" },
  { label: "Contact", href: "/contact-us/" },
];

export const FOOTER_SUPPORT: NavLink[] = [
  { label: "Startup Guide", href: "/how-to-start-a-trucking-company/" },
  { label: "Get a COI", href: "/get-a-coi/" },
  { label: "Policy Change", href: "/policy-change/" },
  { label: "Report a Claim", href: "/report-a-claim/" },
  { label: "Customer Portal", href: "/customer-service/" },
  { label: "Partner Network", href: "/client-perks/" },
];

export const FOOTER_LEGAL: NavLink[] = [
  { label: "Privacy Policy", href: "/privacy-policy/" },
  { label: "Terms & Conditions", href: "/terms-conditions/" },
];
