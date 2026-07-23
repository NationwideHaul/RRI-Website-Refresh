/**
 * Per-coverage long-form content for the 11 coverage detail pages.
 * Follows the Design & Content doc §13 template and is tuned for SEO/GEO:
 *   - `quickAnswer`: an answer-first, citable definition (GEO: AI engines
 *     lift concise, factual definitions straight into answers).
 *   - Specific statistics and technical terms woven through the copy
 *     (GEO methods: Statistics +37%, Technical terms +18%, Authoritative tone).
 *   - Rich, question-shaped FAQs → FAQPage schema (+40% AI visibility).
 * Facts were reconciled against the live roadreadyinsurance.com coverage
 * pages (FMCSA limits, cargo exclusions, bond types, occ/acc, etc.).
 *
 * Keyed by the same slug used in content/coverage/index.ts.
 */

import type { FAQItem } from "@/components/schema/faq-page";

export type CoverageDetail = {
  /** Hero H1 (plain-English, sentence case per brand voice). */
  h1: string;
  heroMuted?: string;
  heroSubhead: string;
  /** Answer-first definition for the GEO "quick answer" callout + meta. */
  quickAnswer: string;
  /** Short meta description for <head>. */
  metaDescription: string;
  /** Paper-craft illustration under /public (square). Falls back to icon. */
  illustration?: string;
  /** Supporting stock photo for the "Who needs it" section. */
  photo?: { src: string; alt: string };
  /** 3–5 specific "what it covers" bullets. */
  whatItCovers: string[];
  /** Fleet-profile fit paragraph(s). */
  whoNeedsIt: string[];
  /** Why place it through Road Ready, carriers, how we place it. */
  whyRRI: string[];
  faqs: FAQItem[];
  /** 3–4 related coverage slugs. */
  related: string[];
};

export const COVERAGE_DETAILS: Record<string, CoverageDetail> = {
  "commercial-trucking-liability": {
    h1: "The coverage that stands between your operation",
    heroMuted: "and a claim.",
    heroSubhead:
      "The most important policy your fleet carries, and the one that requires the most careful placement. Primary liability is the foundation everything else is built on.",
    quickAnswer:
      "Commercial trucking liability insurance covers bodily injury and property damage you cause to others in an accident. The FMCSA requires a minimum of $750,000 for most general freight over 10,000 lbs, but $1 million is the working industry standard, and hazardous materials can require $5 million or more.",
    metaDescription:
      "Commercial trucking liability insurance placed with premium A-rated carriers. FMCSA minimums from $750,000, $1M industry standard, $5M for hazmat, placed by trucking specialists.",
    illustration: "/images/coverage-illustrations/commercial-trucking-liability.webp",
    photo: {
      src: "/images/photos/agent-driver.webp",
      alt: "A Road Ready agent reviewing coverage with a fleet driver beside their truck",
    },
    whatItCovers: [
      "Bodily injury claims from accidents where you are at fault",
      "Property damage to other vehicles, buildings, or infrastructure",
      "Legal defense costs when a claim goes to litigation",
      "The federal minimums FMCSA requires of every authorized motor carrier",
    ],
    whoNeedsIt: [
      "Every commercial trucking operation. FMCSA requires a minimum of $750,000 for most general freight, $1 million for auto haulers (now the practical industry standard most brokers demand), and up to $5 million for certain hazardous materials. Driving without it invites fines, suspension, and loss of authority.",
      "Note that commercial trucking liability is not the same as general liability for your business. General liability covers accidents that happen off the road, a visitor slipping in your yard, for example. Serious operations carry both.",
    ],
    whyRRI: [
      "Liability placement is where carrier access matters most. Secondary markets often cap at $1M or impose tight terms. The premium A-rated markets Road Ready works with write higher limits with better terms and more consistent underwriting.",
      "When a claim happens, the quality of the carrier directly affects how it is handled. A 5-minute quote is almost always coming from the same handful of secondary markets. We build your submission for the carriers that actually protect an operation your size.",
    ],
    faqs: [
      {
        question: "How much commercial trucking liability do I need?",
        answer:
          "FMCSA minimums start at $750,000 for most general freight over 10,000 lbs. Auto haulers need at least $1 million, which has become the industry standard most freight brokers demand. Certain hazardous materials require a minimum of $5 million. The right limit depends on what you haul, where you run, and your fleet size.",
      },
      {
        question: "What is the difference between primary liability and excess liability?",
        answer:
          "Primary liability responds first to a claim, up to its limit. Excess (or umbrella) coverage kicks in when the primary limit is exhausted. Many fleets use a primary + excess structure to reach higher total coverage cost-effectively.",
      },
      {
        question: "Is commercial trucking liability the same as general liability?",
        answer:
          "No. Commercial trucking (auto) liability covers accidents involving your truck on the road. General liability covers your business operations off the road, slips, falls, and property damage at your premises. They are separate policies, and many operations carry both.",
      },
      {
        question: "Does commercial trucking liability cover the freight?",
        answer:
          "No, liability covers damage or injury you cause to others. Damage to the freight itself is covered by Motor Truck Cargo, a separate policy.",
      },
    ],
    related: ["physical-damage-comprehensive-collision", "motor-truck-cargo", "non-trucking-liability"],
  },

  "physical-damage-comprehensive-collision": {
    h1: "Protection for the trucks",
    heroMuted: "you have invested everything in.",
    heroSubhead:
      "Comprehensive and collision coverage for your tractors and trailers, regardless of who is at fault. When a unit is down, this is what gets it back on the road.",
    quickAnswer:
      "Physical damage insurance pays to repair or replace your own truck after a covered loss. Collision covers accidents; comprehensive covers non-driving events like fire, hail, theft, and vandalism. On a total loss it pays either the truck's actual cash value (ACV) or its agreed stated value.",
    metaDescription:
      "Physical damage insurance for commercial trucks, collision plus comprehensive (fire, hail, theft, vandalism) for your tractors and trailers, placed by trucking specialists.",
    illustration: "/images/coverage-illustrations/physical-damage-comprehensive-collision.webp",
    photo: {
      src: "/images/photos/highway.webp",
      alt: "A commercial truck on the highway, the equipment physical damage coverage protects",
    },
    whatItCovers: [
      "Collision damage to your truck, whether or not you were at fault",
      "Comprehensive losses, fire, hail, theft, and vandalism",
      "Damage from named storms and hurricanes (critical for Florida-based fleets)",
      "Total-loss payout at actual cash value (ACV) or your agreed stated value",
    ],
    whoNeedsIt: [
      "Physical damage is not mandated by every state, but it becomes required the moment you finance or lease a truck, lenders mandate it to protect their collateral. Even owned outright, replacing a tractor out of pocket is the kind of loss that ends operations.",
      "Combining collision and comprehensive gives the broadest protection. On its own, physical damage is not full coverage: it excludes liability and injury costs, so it works best paired with your primary policy.",
    ],
    whyRRI: [
      "Physical damage rates and terms swing hard on stated value, deductible structure, and how your equipment is scheduled. We make sure your units are valued correctly so you are neither overpaying on premium nor underinsured at claim time.",
      "For storm-exposed fleets, carrier selection matters. We place with markets that honor comprehensive claims cleanly rather than fighting named-storm losses.",
    ],
    faqs: [
      {
        question: "How is the value of my truck determined for a total loss?",
        answer:
          "Coverage is written on either an actual cash value (ACV) or a stated/agreed value basis. We help you set values that reflect what your equipment is actually worth, so a total loss pays out correctly rather than on a number pulled from thin air.",
      },
      {
        question: "Is physical damage insurance required?",
        answer:
          "Not by every state, but if you have a loan or lease on a truck, your lender almost certainly requires it as a condition of financing. Many fleets carry it regardless to protect their own equipment.",
      },
      {
        question: "Does physical damage cover mechanical breakdown?",
        answer:
          "No. Physical damage covers sudden external events, collisions, fire, hail, theft, vandalism. Ordinary wear and mechanical failure are excluded. For refrigeration unit failure specifically, see Reefer Breakdown coverage.",
      },
      {
        question: "Can I choose my deductible?",
        answer:
          "Yes. Higher deductibles lower your premium but raise your out-of-pocket cost at claim time. We model a couple of options so the trade-off is a decision you make on purpose.",
      },
    ],
    related: ["commercial-trucking-liability", "motor-truck-cargo", "reefer-breakdown"],
  },

  "motor-truck-cargo": {
    h1: "Coverage for the freight",
    heroMuted: "that is often worth more than the truck.",
    heroSubhead:
      "Motor Truck Cargo protects the load you are hauling. Shippers require it, brokers demand proof of it, and one damaged high-value load can dwarf the value of the tractor carrying it.",
    quickAnswer:
      "Motor Truck Cargo insurance covers loss or damage to the freight you haul, from collision, fire, theft, and weather. Brokers commonly require proof of at least $100,000 in cargo coverage before tendering a load, and standard policies exclude high-risk commodities like alcohol, tobacco, and explosives.",
    metaDescription:
      "Motor Truck Cargo insurance protecting the freight you haul. Right limits, correct commodity scheduling, and same-day certificates, placed by trucking specialists.",
    illustration: "/images/coverage-illustrations/motor-truck-cargo.webp",
    photo: {
      src: "/images/photos/who-we-cover.webp",
      alt: "A fleet operator whose freight is protected by motor truck cargo coverage",
    },
    whatItCovers: [
      "Loss or damage to the freight you are legally hauling",
      "Fire, collision, theft, and covered perils affecting the load",
      "Damage from severe weather and accidents outside the driver's control",
      "The cargo limits shippers and brokers require to book your loads",
    ],
    whoNeedsIt: [
      "Any authority hauling freight for hire. Most brokers and shippers require proof of cargo coverage, commonly $100,000, before they will tender a load. Because policies carry a value limit, you want enough coverage for the most valuable load you realistically haul before you take off. $100,000 is the standard baseline, but we can write higher limits, $250,000, $500,000, and above, whenever the freight you move calls for it.",
      "Standard cargo policies exclude high-risk commodities such as alcohol, tobacco, coins, explosives, and radioactive material. Those exclusions are not the final word, though: if alcohol, tobacco, or another normally-excluded commodity is a regular part of what you haul, we can often schedule it onto your policy so it is actually covered. If you move reefer, high-value, or specialized freight, the commodity schedule matters as much as the limit.",
    ],
    whyRRI: [
      "Cargo claims get denied on the fine print, excluded commodities, refrigeration warranties, unattended-vehicle clauses. We read that fine print before you sign, so the coverage matches what you actually haul.",
      "Need more coverage for one specific load? We can add a single-trip cargo increase, endorsing the extra limit onto your policy for that one haul. If your policy covers $100,000 and a load requires $150,000, we bind the additional $50,000 for that single trip and turn the quote around quickly, so you can secure the opportunity for your company without disturbing your annual policy.",
      "We also turn certificates around fast. When a broker needs proof of cargo coverage to release a load, your agent issues the COI the same day rather than leaving you sitting.",
    ],
    faqs: [
      {
        question: "How much motor truck cargo coverage do I need?",
        answer:
          "$100,000 is the common baseline brokers require, but the right limit is the value of the most valuable load you realistically haul. When your freight calls for it, we can write higher limits, $250,000, $500,000, and above. Cargo policies carry a value limit, so undervaluing leaves you exposed on your highest-stakes freight.",
      },
      {
        question: "Can I get more cargo coverage for a single high-value load?",
        answer:
          "Yes, that is a single-trip cargo increase. If your policy covers $100,000 and one load needs $150,000, we endorse the additional $50,000 onto your cargo coverage for that single trip. We can do this quickly and get a quote back fast, so you can secure the load opportunity for your company without changing your annual policy.",
      },
      {
        question: "What commodities are excluded from motor truck cargo insurance?",
        answer:
          "Standard policies typically exclude high-risk items like alcohol, tobacco, coins, explosives, and radioactive material. Those are excluded most of the time, but not always: if a commodity like alcohol or tobacco is a regular part of what you haul, we can often add it onto your policy so it is covered. Electronics, pharmaceuticals, and similar commodities are often limited too. We make sure what you haul is actually scheduled on the policy.",
      },
      {
        question: "What is a refrigeration (reefer) breakdown exclusion?",
        answer:
          "Many cargo policies exclude spoilage caused by refrigeration unit failure unless Reefer Breakdown coverage is added. If you haul temperature-sensitive freight, you want both.",
      },
    ],
    related: ["reefer-breakdown", "single-trip-cargo-insurance", "commercial-trucking-liability"],
  },

  "trailer-interchange": {
    h1: "Coverage for trailers",
    heroMuted: "that are not yours.",
    heroSubhead:
      "When you pull a trailer under an interchange agreement, this covers physical damage to that trailer while it is in your possession, even though you do not own it.",
    quickAnswer:
      "Trailer Interchange insurance covers physical damage, from collision, theft, fire, vandalism, or explosion, to a non-owned trailer you pull under a written trailer interchange agreement. Without that written agreement in place, neither party can hold the other responsible for damage to the trailer.",
    metaDescription:
      "Trailer Interchange insurance covers physical damage to non-owned trailers you haul under a written interchange agreement. Placed by commercial trucking specialists.",
    illustration: "/images/coverage-illustrations/trailer-interchange.webp",
    photo: {
      src: "/images/photos/specialists.webp",
      alt: "Trucking specialists reviewing a trailer interchange agreement",
    },
    whatItCovers: [
      "Physical damage to a non-owned trailer while it is hooked to your truck",
      "Collision, theft, fire, vandalism, and explosion affecting the trailer",
      "Your contractual liability under a written trailer interchange agreement",
      "Damage that occurs while the trailer is in your care, custody, and control",
    ],
    whoNeedsIt: [
      "Owner-operators and fleets that frequently pull trailers belonging to carriers, shippers, or leasing companies. A trailer interchange agreement is the written contract that lets two parties swap a trailer to complete a shipment, and whichever party holds the trailer is responsible for damage while it is in their care.",
      "This is the detail operators miss: without a written interchange agreement, you cannot hold the other party responsible for damage to their trailer. This coverage answers for that exposure while you have the equipment.",
    ],
    whyRRI: [
      "Trailer interchange is frequently confused with non-owned trailer physical damage, they are not the same, and the difference decides whether a claim pays. We make sure the coverage you carry matches the agreements you are actually signing.",
      "We place it alongside your primary and physical damage so the whole policy is coherent, and we help you set the right limit and deductible for the trailers you actually interchange.",
    ],
    faqs: [
      {
        question: "Do I need a trailer interchange agreement?",
        answer:
          "Yes, if you want to be protected. A trailer interchange agreement is a written contract that transfers a trailer between two parties to complete a shipment. Whoever holds the trailer is responsible for damage while it is in their care, and without a written agreement, you cannot hold the other party responsible.",
      },
      {
        question: "What is the difference between trailer interchange and non-owned trailer coverage?",
        answer:
          "Trailer interchange applies when there is a written interchange agreement in place. Non-owned trailer physical damage applies when you pull a trailer you do not own without a formal interchange agreement. Which one you need depends on how your loads are set up.",
      },
      {
        question: "How do the limit and deductible work?",
        answer:
          "The limit is the most the insurer will pay for damage to the trailer; the deductible is what you pay before coverage kicks in. We match the limit to the value of the trailers you typically pull, commonly $20,000 to $50,000.",
      },
    ],
    related: ["motor-truck-cargo", "physical-damage-comprehensive-collision", "non-trucking-liability"],
  },

  "non-trucking-liability": {
    h1: "The bobtail coverage",
    heroMuted: "you did not think you needed.",
    heroSubhead:
      "Non-Trucking Liability covers you when the truck is being driven for non-business use, off dispatch, empty, personal errands. The gap your primary policy leaves open.",
    quickAnswer:
      "Non-Trucking Liability (NTL) covers property damage and bodily injury to others when you drive your truck for personal, non-business use, while you are off dispatch. Many motor carriers require their leased owner-operators to carry it, because the carrier's liability policy does not respond during personal use.",
    metaDescription:
      "Non-Trucking Liability (bobtail) insurance covers your truck when driven off dispatch for personal use. Required by many carriers for leased owner-operators.",
    illustration: "/images/coverage-illustrations/non-trucking-liability.webp",
    photo: {
      src: "/images/photos/agent-driver.webp",
      alt: "An owner-operator whose off-dispatch driving is covered by non-trucking liability",
    },
    whatItCovers: [
      "Liability when the truck is driven for non-business (personal) purposes",
      "Property damage and bodily injury to a third party while off dispatch",
      "The gap between when the motor carrier's liability applies and when it does not",
      "The bobtail requirement many carriers place on leased owner-operators",
    ],
    whoNeedsIt: [
      "Owner-operators leased onto a motor carrier. Many fleets require their leased owner-operators to carry non-trucking liability, because when you are dispatched the carrier's policy covers you, but the moment you are off dispatch (driving home, running an errand), that policy stops responding. NTL fills that window.",
    ],
    whyRRI: [
      "The line between 'on dispatch' and 'off dispatch' is exactly where claims get contested. We place NTL that dovetails cleanly with your carrier arrangement so there is no daylight between the two policies.",
      "For operators running their own authority, we assess whether NTL or a full commercial liability structure is the right fit, rather than selling a bobtail policy that does not match how you actually operate.",
    ],
    faqs: [
      {
        question: "What is the difference between bobtail and non-trucking liability?",
        answer:
          "The terms are often used interchangeably. Technically, bobtail refers to driving the tractor without a trailer, while non-trucking liability covers any non-business use. Most policies today are written as Non-Trucking Liability and cover both situations.",
      },
      {
        question: "Do I need NTL if I have my own authority?",
        answer:
          "If you run under your own authority, you typically carry full commercial liability rather than NTL. NTL is designed for owner-operators leased to another carrier. Your agent will confirm which structure fits your operation.",
      },
      {
        question: "Does NTL cover me while I am hauling a load?",
        answer:
          "No. While you are dispatched and under load, the motor carrier's liability policy is what responds. NTL covers the off-dispatch, non-business gap.",
      },
    ],
    related: ["commercial-trucking-liability", "physical-damage-comprehensive-collision", "trailer-interchange"],
  },

  "reefer-breakdown": {
    h1: "When the unit fails",
    heroMuted: "and the load is on the line.",
    heroSubhead:
      "Reefer Breakdown covers cargo spoilage caused by refrigeration unit failure, the exact loss that a standard cargo policy usually excludes.",
    quickAnswer:
      "Reefer Breakdown insurance covers spoilage of refrigerated freight caused by a mechanical failure of the truck or trailer's refrigeration unit, a loss standard Motor Truck Cargo policies normally exclude. It is essential for carriers hauling temperature-sensitive produce, fruit, and dairy on a regular basis.",
    metaDescription:
      "Reefer Breakdown insurance covers cargo spoilage from refrigeration unit failure, the exclusion standard cargo policies leave open. Placed by trucking specialists.",
    illustration: "/images/coverage-illustrations/reefer-breakdown.webp",
    photo: {
      src: "/images/photos/highway.webp",
      alt: "A refrigerated trailer on the highway hauling temperature-sensitive freight",
    },
    whatItCovers: [
      "Spoilage of refrigerated goods caused by mechanical breakdown of the reefer unit",
      "Temperature-sensitive produce, fruit, vegetables, and dairy in transit",
      "The refrigeration-failure loss that standard cargo policies carve out",
      "Cold-chain exposure that Motor Truck Cargo alone does not cover",
    ],
    whoNeedsIt: [
      "Any carrier hauling refrigerated freight on a regular basis, significant produce and seafood freight moves through Florida and the Southeast. Standard Motor Truck Cargo excludes spoilage from reefer unit failure, so without this coverage a breakdown that ruins a full load comes out of your pocket.",
      "Read the exclusions carefully: many reefer policies also exclude fresh seafood, pharmaceuticals, and meats, as well as spoilage caused by driver delay or negligence. We tell you up front what your policy does and does not cover.",
    ],
    whyRRI: [
      "Reefer breakdown claims live and die on maintenance records and the policy's exclusions. We place coverage that is realistic about how reefer units actually operate, and we tell you exactly what a carrier will expect at claim time.",
      "Premiums turn on load type, unit specs, driver history, service radius, and deductible. We shop those variables so you are not overpaying, and we pair the coverage with your cargo policy so the two read as one package.",
    ],
    faqs: [
      {
        question: "Why is reefer breakdown not included in my cargo policy?",
        answer:
          "Standard Motor Truck Cargo policies exclude spoilage caused by refrigeration failure because it is a distinct, high-frequency risk. It is added back through a Reefer Breakdown endorsement or standalone coverage.",
      },
      {
        question: "What does reefer breakdown typically exclude?",
        answer:
          "Common exclusions include fresh seafood, pharmaceuticals, and meats, as well as losses caused by driver delay or driver negligence rather than mechanical failure. Coverage responds to genuine unit breakdown, we review the specific terms with you.",
      },
      {
        question: "What affects the cost of reefer breakdown coverage?",
        answer:
          "Premiums depend on the type of load, the truck and unit specifications, driver history and claims record, service radius and geography, and the deductible you choose. A higher deductible lowers the premium.",
      },
    ],
    related: ["motor-truck-cargo", "physical-damage-comprehensive-collision", "single-trip-cargo-insurance"],
  },

  "truckers-workers-compensation": {
    h1: "Protection for the drivers",
    heroMuted: "and staff who move your business.",
    heroSubhead:
      "Workers' compensation covers medical costs and lost wages when an employee is injured on the job. For leased owner-operators, occupational accident coverage often fits better. We place both.",
    quickAnswer:
      "Truckers workers' compensation covers medical expenses, lost wages, and legal defense when a W-2 employee driver is injured on the job. For 1099 contractors and leased owner-operators, occupational accident coverage is the usual fit, it covers on-the-job injury at lower cost but does not include lost wages or legal defense.",
    metaDescription:
      "Truckers workers compensation and occupational accident coverage for drivers and staff. W-2 employees vs leased owner-operators, placed by trucking specialists.",
    illustration: "/images/coverage-illustrations/truckers-workers-compensation.webp",
    photo: {
      src: "/images/photos/specialists.webp",
      alt: "Trucking company staff and drivers protected by workers compensation coverage",
    },
    whatItCovers: [
      "Medical treatment for employees injured while working",
      "Lost wages during recovery (workers' compensation)",
      "Legal defense if an injured employee files a lawsuit (workers' compensation)",
      "On-the-job injury and optional accidental death for 1099 owner-operators (occupational accident)",
    ],
    whoNeedsIt: [
      "Any trucking operation with drivers or staff. Companies with W-2 employee drivers typically carry workers' compensation, which most states require as soon as you hire. Firms that lease 1099 owner-operators to their authority typically choose occupational accident coverage instead.",
      "The two are not interchangeable. Workers' compensation includes lost wages and legal defense; occupational accident is lower-cost and gives the employer more control, but does not cover lost wages or provide legal defense. Getting driver classification right is where operations get caught out, we help you land it correctly.",
    ],
    whyRRI: [
      "Workers' comp and occ/acc for trucking are their own specialty, driver classification, multi-state exposure, and experience mods all drive the rate. We place them with carriers that understand trucking payroll rather than treating you like a generic employer.",
      "For fleets running across state lines, we make sure your coverage is compliant everywhere you operate, not just in your home state.",
    ],
    faqs: [
      {
        question: "What is the difference between workers' compensation and occupational accident coverage?",
        answer:
          "Workers' compensation covers medical costs, lost wages, and legal defense, and is typically required for W-2 employees. Occupational accident coverage is usually chosen for 1099 contractors and leased owner-operators, it covers on-the-job injury (and optional accidental death) at lower cost, but does not include lost wages or legal defense.",
      },
      {
        question: "Is workers compensation required for trucking companies?",
        answer:
          "In most states, yes, as soon as you have W-2 employees. Requirements vary by state and by how drivers are classified. We confirm what your specific operation needs across every state you run in.",
      },
      {
        question: "Which do I need for leased owner-operators?",
        answer:
          "Firms that lease on 1099 owner-operators typically use occupational accident coverage, while companies with W-2 company drivers usually carry workers' compensation. Classification is where this gets complicated, and we help you get it right.",
      },
    ],
    related: ["commercial-trucking-liability", "non-trucking-liability", "additional-coverages"],
  },

  "trucking-transportation-bonds": {
    h1: "The bonds that keep",
    heroMuted: "your authority active.",
    heroSubhead:
      "BMC-84, freight broker, FMCSA, highway, and surety bonds, the financial guarantees regulators and partners require to operate. We place the bonds that keep your authority in good standing.",
    quickAnswer:
      "A transportation bond is a guarantee from a surety that you will meet your obligations, pay carriers, follow regulations, or perform under a contract. Freight brokers must file a $75,000 BMC-84 bond with the FMCSA. Bond pricing is credit-based, typically a small percentage of the bond amount per year.",
    metaDescription:
      "Trucking transportation bonds, BMC-84 freight broker bonds ($75,000), FMCSA, highway, customs, and surety bonds. Placed quickly by commercial trucking specialists.",
    illustration: "/images/coverage-illustrations/trucking-transportation-bonds.webp",
    photo: {
      src: "/images/photos/certificates.webp",
      alt: "Bond and filing paperwork prepared for a trucking authority",
    },
    whatItCovers: [
      "BMC-84 (and BMC-85) freight broker surety bonds, the $75,000 FMCSA requirement",
      "FMCSA authority bonds, highway bonds, and US Customs bonds",
      "Specialty filings: OTI, NVOCC, oversize/overweight permit, and household goods carrier bonds",
      "Surety guarantees that protect the carriers and shippers you do business with",
    ],
    whoNeedsIt: [
      "Freight brokers and forwarders required to file a $75,000 BMC-84 bond with the FMCSA, and motor carriers who need surety filings to obtain or maintain operating authority. A bond is essentially a surety guaranteeing that you will perform or pay as your obligations and regulations require.",
      "Because bonds work like a form of credit, approval and pricing depend on your creditworthiness and business financials. We access a range of surety markets to fit your profile.",
    ],
    whyRRI: [
      "Bond pricing turns on personal credit and business financials, and the range is wide. We shop the surety markets to get you a rate that reflects your actual profile rather than a one-size default.",
      "We coordinate the bond with the rest of your filings so your authority comes together on one timeline instead of stalling on a missing piece.",
    ],
    faqs: [
      {
        question: "What is a BMC-84 bond?",
        answer:
          "The BMC-84 is the $75,000 surety bond the FMCSA requires of freight brokers and forwarders. It guarantees you will pay carriers and shippers as agreed. Without it, the FMCSA will not grant or maintain your broker authority. (A BMC-85 trust fund is the alternative way to satisfy the same requirement.)",
      },
      {
        question: "How much does a freight broker bond cost?",
        answer:
          "You pay a percentage of the $75,000 face amount, commonly 1% to 10% per year depending on credit and financials, because a bond functions as a form of credit. Strong credit lands near the low end. We shop it to get your best rate.",
      },
      {
        question: "What other transportation bonds can you place?",
        answer:
          "Beyond the BMC-84, we place FMCSA bonds, highway bonds, US Customs bonds, OTI and NVOCC bonds, oversize and overweight permit bonds, household goods carrier bonds, and other surety bonds. If you need one not listed, ask.",
      },
    ],
    related: ["commercial-trucking-liability", "additional-coverages", "single-trip-cargo-insurance"],
  },

  "single-trip-cargo-insurance": {
    h1: "One load, one policy,",
    heroMuted: "when you need it.",
    heroSubhead:
      "Single Trip Cargo covers a one-time, high-value, or out-of-profile load that your standard policy does not, without changing your annual coverage.",
    quickAnswer:
      "Single Trip Cargo insurance protects one specific load from point A to point B against accident, theft, natural disaster, and other transit events. It lets brokers and carriers accept a high-value load without changing their annual policy, and Road Ready typically returns quotes the same day.",
    metaDescription:
      "Single Trip Cargo insurance for one-time or high-value loads that exceed your standard policy. Same-day quotes and spike coverage from trucking specialists.",
    illustration: "/images/coverage-illustrations/single-trip-cargo-insurance.webp",
    photo: {
      src: "/images/photos/your-agent.webp",
      alt: "An agent arranging single-trip cargo coverage for a high-value load",
    },
    whatItCovers: [
      "A single high-value load that exceeds your standard cargo limit",
      "One trip from point A to point B, accident, theft, natural disaster, and transit events",
      "A one-off commodity or route outside your normal annual profile",
      "Spike coverage for sudden surges in demand or unexpected high-value orders",
    ],
    whoNeedsIt: [
      "Brokers and carriers who occasionally take a load worth more than their annual cargo limit, or a commodity outside their normal profile. Rather than raising your annual premium for a one-time need, single-trip coverage answers for that specific load and then goes away.",
      "It also suits seasonal operations and anyone who wants to confidently accept a high-value load without worrying about their annual coverage limit.",
    ],
    whyRRI: [
      "The whole point of single-trip cargo is speed, you usually need it because a lucrative load is on the table now. We return multiple quotes the same day so you can book the load with the certificate in hand.",
      "We also make sure the single-trip policy actually covers the commodity and value in question, so a high-stakes load is not riding on assumptions.",
    ],
    faqs: [
      {
        question: "When should I use single trip cargo instead of raising my annual limit?",
        answer:
          "Use it when a high-value or unusual load is a one-off. If you are regularly hauling above your limit, it is cheaper to raise the annual policy. Your agent will tell you which is the better economics for your pattern.",
      },
      {
        question: "How quickly can single trip coverage be issued?",
        answer:
          "Often the same day. Because these loads are usually time-sensitive, we prioritize returning multiple quotes and getting the certificate in your hands fast.",
      },
      {
        question: "What information do you need to quote a single trip policy?",
        answer:
          "The commodity, its value, the origin and destination, and the pickup date. With those we can place coverage matched to the trip.",
      },
    ],
    related: ["motor-truck-cargo", "reefer-breakdown", "commercial-trucking-liability"],
  },

  "construction-equipment": {
    h1: "Coverage for the heavy equipment",
    heroMuted: "your operation runs on.",
    heroSubhead:
      "Inland marine coverage for excavators, loaders, cranes, and heavy equipment, protecting machinery on the job site, in transit, and in storage. Plus the broader contracting coverages that go with it.",
    quickAnswer:
      "Construction equipment (contractor's equipment) insurance is inland marine coverage that protects movable heavy machinery, excavators, bulldozers, cranes, generators, tools, and scaffolding, against theft, damage, and loss on the job site, in transit, and in storage.",
    metaDescription:
      "Construction equipment insurance (inland marine) for heavy machinery on the job site, in transit, and in storage, plus contractor's liability. Placed by specialists.",
    illustration: "/images/coverage-illustrations/construction-equipment.webp",
    photo: {
      src: "/images/photos/highway.webp",
      alt: "Heavy equipment being hauled between job sites",
    },
    whatItCovers: [
      "Heavy equipment, excavators, bulldozers, cranes, generators, on the job site",
      "Machinery, tools, and scaffolding damaged or stolen in transit between sites",
      "Equipment in storage between jobs",
      "Owned, rented, and leased equipment scheduled on the policy",
    ],
    whoNeedsIt: [
      "Contractors and operations that haul and run heavy equipment. If you move machinery between sites, or your trucking operation crosses into construction and heavy haul, inland marine coverage protects equipment that auto and cargo policies were never designed for.",
      "Construction operations usually need more than equipment coverage alone. We can also place general liability, workers' compensation, builder's risk, contractor's equipment, professional liability (E&O), pollution, and umbrella coverage as one coordinated program.",
    ],
    whyRRI: [
      "Construction equipment sits at the seam between trucking and inland marine, and generic brokers often mis-place it. We schedule your equipment correctly by value and type so a loss on a $200,000 excavator does not turn into a coverage argument.",
      "We coordinate it with your auto, cargo, and liability coverage so equipment is protected whether it is being hauled, operated, or parked.",
    ],
    faqs: [
      {
        question: "What is inland marine insurance?",
        answer:
          "Despite the name, it has nothing to do with water. Inland marine covers movable property, like construction equipment and tools, that standard property or auto policies do not, whether it is on a site, in transit, or in storage.",
      },
      {
        question: "Does it cover rented or leased equipment?",
        answer:
          "It can. We schedule owned, rented, and leased equipment as needed, rental agreements often require you to insure the machinery you are using.",
      },
      {
        question: "Can you cover the rest of my contracting business too?",
        answer:
          "Yes. Alongside equipment coverage we place general liability, workers' compensation, builder's risk, professional liability (E&O), pollution, umbrella, and commercial auto, so your whole operation is covered under one coordinated program.",
      },
    ],
    related: ["physical-damage-comprehensive-collision", "motor-truck-cargo", "additional-coverages"],
  },

  "additional-coverages": {
    h1: "The coverages that round out",
    heroMuted: "a complete policy.",
    heroSubhead:
      "GAP, umbrella, hired/non-owned, on-hook, oversize and heavy haul, pollution, and the endorsements that close the gaps between your major policies. The details that separate adequate coverage from complete coverage.",
    quickAnswer:
      "Additional trucking coverages are the specialized endorsements and policies that close the gaps between primary liability, physical damage, and cargo, including umbrella/excess, contingent cargo, hired and non-owned, on-hook (tow), passenger liability, uninsured/underinsured motorist, GAP, oversize and heavy haul, pollution, and medical payments.",
    metaDescription:
      "Additional trucking coverages, umbrella/excess, contingent cargo, hired/non-owned, on-hook, oversize, heavy haul, pollution, GAP, and more. Placed by specialists.",
    photo: {
      src: "/images/photos/claims.webp",
      alt: "A fleet owner reviewing a complete insurance program with their agent",
    },
    whatItCovers: [
      "Umbrella / excess liability above your primary limits",
      "Contingent cargo, hired and non-owned, and non-owned trailer physical damage",
      "On-hook / tow truck cargo, passenger liability, and uninsured/underinsured motorist",
      "Oversize and heavy haul, concrete pumper, pollution, GAP, rental reimbursement, and medical payments",
    ],
    whoNeedsIt: [
      "Fleets that want no gaps. The major policies, liability, physical damage, cargo, do most of the work, but the space between them is where an operation gets caught out. These endorsements exist to close those gaps, and which ones matter depends entirely on how you run.",
      "Specialty operations especially, tow, oversize, heavy haul, concrete pumper, long haul, passenger transport, need coverages built for their exposure. If you need something not listed here, ask; we place it.",
    ],
    whyRRI: [
      "This is where a specialist agent earns their keep. We do not bolt on endorsements to pad a premium, we look at your operation and recommend only the ones that address a real exposure for your fleet.",
      "As your operation changes, new financing, new equipment, new lanes, we revisit these at renewal so your coverage keeps pace instead of drifting out of date.",
    ],
    faqs: [
      {
        question: "What is GAP coverage and do I need it?",
        answer:
          "If your truck is totaled, physical damage pays its current market value, which may be less than your loan balance. GAP coverage pays the difference. It matters most on newer, financed equipment where depreciation outpaces the loan.",
      },
      {
        question: "What is the difference between hired/non-owned and non-owned trailer coverage?",
        answer:
          "Hired and non-owned coverage extends liability to vehicles you hire or borrow for business use. Non-owned trailer physical damage covers a trailer you pull but do not own. They address different exposures, we sort out which you actually need.",
      },
      {
        question: "How do I know which additional coverages I actually need?",
        answer:
          "That is the conversation. Your agent reviews your operation, your equipment, your financing, and your lanes, then recommends only the endorsements that close a real gap, whether that is umbrella, on-hook, oversize, pollution, or something else, nothing you do not need.",
      },
    ],
    related: ["commercial-trucking-liability", "physical-damage-comprehensive-collision", "truckers-workers-compensation"],
  },
};
