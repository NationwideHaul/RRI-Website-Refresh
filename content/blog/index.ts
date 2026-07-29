/**
 * Blog content model. Mirrors the coverage/state pattern: a POSTS array is
 * the single source of truth for the blog index, the individual post routes,
 * and the sitemap, joined by slug.
 *
 * Body is structured as an array of sections (heading + paragraphs + optional
 * bullets) rather than raw HTML/MDX, so posts stay server-rendered, typed, and
 * consistent with the rest of the content layer. Add a post by appending here.
 */

export type PostSection = {
  heading?: string;
  paragraphs?: string[];
  bullets?: string[];
};

export type Post = {
  slug: string;
  href: string; // /road-ready-blog/{slug}/
  title: string;
  /** Meta description + social description. ~150–160 chars. */
  description: string;
  /** Short excerpt for the index card. */
  excerpt: string;
  author: string;
  datePublished: string; // ISO 8601 (YYYY-MM-DD)
  dateModified?: string;
  category: string;
  readMinutes: number;
  image?: string;
  /** Lead paragraph(s) rendered under the title, before the first section. */
  intro: string[];
  body: PostSection[];
};

export const POSTS: Post[] = [
  {
    slug: "how-much-does-commercial-truck-insurance-cost",
    href: "/road-ready-blog/how-much-does-commercial-truck-insurance-cost/",
    title: "How Much Does Commercial Truck Insurance Cost?",
    description:
      "What commercial truck insurance actually costs per truck and per month in 2026, the factors that move your premium, and how to pay for the operation you run.",
    excerpt:
      "Straight ranges for owner-operators and fleets, the factors that actually move your premium, and why the cheapest quote is rarely the cheapest policy.",
    author: "Road Ready Insurance",
    datePublished: "2026-06-15",
    category: "Coverage explained",
    readMinutes: 7,
    intro: [
      "It's the first question every owner-operator and fleet manager asks, and the honest answer is: it depends. But \"it depends\" isn't useful when you're trying to budget. So here are real ranges, the factors that move them, and what actually drives the number up or down.",
    ],
    body: [
      {
        heading: "The short answer",
        paragraphs: [
          "For an owner-operator running under their own authority, full commercial truck insurance commonly runs about $9,000 to $17,000 per truck per year, or roughly $900 to $1,800 a month once you add up the full stack of coverages. Drivers leased onto a motor carrier pay far less, often $250 to $500 a month, because the motor carrier's policy covers much of the exposure.",
          "Those are industry ranges, not a quote. Where you land inside them, or outside them, comes down to a handful of factors.",
        ],
      },
      {
        heading: "What moves your premium",
        bullets: [
          "Driving record and CSA scores — a clean MVR is the single biggest lever on price.",
          "Years in business — new authorities pay more; a 2+ year track record earns better rates.",
          "What you haul — general freight prices differently than hazmat, reefer, or high-value cargo.",
          "Where you run — radius of operation and the states you drive in change the risk.",
          "Equipment value and age — physical damage premium tracks the value of the truck and trailer.",
          "Coverage limits and deductibles — higher limits cost more; higher deductibles cost less up front.",
        ],
      },
      {
        heading: "The full stack of coverages",
        paragraphs: [
          "When people compare \"truck insurance\" quotes, they're often comparing different things. A complete commercial trucking program usually includes several distinct coverages, each with its own premium:",
        ],
        bullets: [
          "Primary liability — required for authority; covers injury and property damage you cause.",
          "Physical damage — comprehensive and collision on your own equipment.",
          "Motor truck cargo — the freight you haul, often worth more than the truck.",
          "Non-trucking (bobtail) liability — when the truck is used off-dispatch.",
          "Plus optional layers: trailer interchange, reefer breakdown, and more depending on your operation.",
        ],
      },
      {
        heading: "Why the cheapest quote is rarely the cheapest policy",
        paragraphs: [
          "The fast-quote model gets you a number quickly by shopping the same handful of secondary-market carriers every broker can reach. That's fine until you have a claim and discover the coverage was thin, the carrier is slow, or the policy gets non-renewed after one incident.",
          "Premium A-rated carriers, the ones that price a clean fleet fairly and handle claims well, take longer to place because they underwrite carefully. The extra time is the point. A policy that's $50 a month cheaper but leaves a cargo gap can cost you a truck's worth of freight on a single load.",
        ],
      },
      {
        heading: "How to actually lower your cost",
        paragraphs: [
          "The durable ways to reduce premium aren't tricks, they're operational: keep your MVRs and CSA scores clean, build time in business, choose deductibles you can actually absorb, and work with a broker who can present your operation to markets that reward good risk.",
          "That last point is where a specialist earns its keep. We place your submission with the carriers that match your operation, not just the ones that answer first.",
        ],
      },
    ],
  },

  {
    slug: "new-trucking-authority-insurance-requirements",
    href: "/road-ready-blog/new-trucking-authority-insurance-requirements/",
    title: "New Trucking Authority Insurance Requirements: What You Actually Need",
    description:
      "The insurance filings a new trucking authority needs, BMC-91, BOC-3, USDOT and MC numbers, explained in plain English, so you can get active without surprises.",
    excerpt:
      "USDOT and MC numbers, the BMC-91 filing, the BOC-3, and how insurance fits into activating your authority, without the jargon.",
    author: "Road Ready Insurance",
    datePublished: "2026-06-28",
    category: "New authority basics",
    readMinutes: 6,
    intro: [
      "Getting your own authority is exciting and confusing in equal measure. Between the FMCSA, filings with names like BMC-91 and BOC-3, and insurers who all say something slightly different, it's easy to lose track of what you actually need. Here's the plain-English version.",
    ],
    body: [
      {
        heading: "The numbers: USDOT and MC",
        paragraphs: [
          "Most interstate for-hire carriers need both a USDOT number (your safety identifier) and an MC number (your operating authority). You apply through the FMCSA's Unified Registration System. Your authority isn't active until the required insurance and process-agent filings are on record.",
        ],
      },
      {
        heading: "The BMC-91 (or 91X): proof of liability",
        paragraphs: [
          "This is the filing that proves you carry the federally required public liability insurance. Your insurance company files it electronically with the FMCSA on your behalf, you don't file it yourself. For most general freight carriers the federal minimum is $750,000 in liability, but $1,000,000 is the practical standard most brokers and shippers require.",
          "Higher minimums apply to certain commodities, hazmat in particular can require $5,000,000. The right limit depends on what you haul.",
        ],
      },
      {
        heading: "The BOC-3: your process agents",
        paragraphs: [
          "The BOC-3 designates a process agent in each state where you operate, someone who can receive legal documents on your behalf. It's filed by a process-agent service, not your insurer, and it's a one-time requirement to activate authority.",
        ],
      },
      {
        heading: "What insurers look at for a new authority",
        bullets: [
          "Your driving history and years of verifiable experience.",
          "The equipment you'll run and its value.",
          "What you plan to haul and your operating radius.",
          "Whether you're truly new, or an experienced driver starting your own authority (which prices better).",
        ],
      },
      {
        heading: "The reality of new-authority pricing",
        paragraphs: [
          "New authorities pay more, there's no way around it. Insurers have no loss history to price against, so the first 12 months are the most expensive. The good news: a clean first year, and time in business, brings rates down meaningfully at renewal.",
          "A broker who works with new authorities regularly knows which carriers actually want new-venture business instead of declining it. That's the difference between getting placed and getting stuck.",
        ],
      },
      {
        heading: "Where to start",
        paragraphs: [
          "If you're standing up a new authority, our Startup Guide walks through the full sequence, and we can have the insurance side ready to file the moment your authority is granted, so you're not sitting idle waiting on a BMC-91.",
        ],
      },
    ],
  },

  {
    slug: "how-to-lower-your-truck-insurance-premiums",
    href: "/road-ready-blog/how-to-lower-your-truck-insurance-premiums/",
    title: "How to Lower Your Commercial Truck Insurance Premiums",
    description:
      "Practical, durable ways to reduce your commercial truck insurance premium, from CSA scores and deductibles to carrier quality, without cutting the coverage you need.",
    excerpt:
      "The levers that actually move your premium at renewal, and the false economies that cost more than they save.",
    author: "Road Ready Insurance",
    datePublished: "2026-07-12",
    category: "Running a fleet",
    readMinutes: 6,
    intro: [
      "Everyone wants a lower premium. The trouble is that the fastest way to cut cost, dropping coverage or chasing the cheapest carrier, is usually the most expensive decision you'll make. Here are the levers that actually work, and the ones that backfire.",
    ],
    body: [
      {
        heading: "1. Protect your CSA scores and MVRs",
        paragraphs: [
          "Your safety record is the single biggest factor in your premium. Clean motor vehicle records and low CSA scores translate directly into lower rates. That means hiring carefully, addressing violations quickly, and running a real safety program, not just hoping.",
        ],
      },
      {
        heading: "2. Choose deductibles you can actually absorb",
        paragraphs: [
          "Raising your physical-damage deductible lowers your premium. But only raise it to a level you could pay out of pocket tomorrow without hurting the business. A high deductible you can't cover isn't savings, it's a gap.",
        ],
      },
      {
        heading: "3. Build and document time in business",
        paragraphs: [
          "Every clean year lowers your risk profile. Keep your loss runs clean, document your operating history, and make sure your broker presents that track record to underwriters, it's one of the strongest arguments for a better rate.",
        ],
      },
      {
        heading: "4. Right-size your coverage, don't gut it",
        paragraphs: [
          "Paying for coverage you don't need is waste, but so is carrying limits that leave you exposed. The goal is accuracy: the coverage your operation actually requires, no padding and no gaps. A specialist review often finds both overlaps to trim and gaps to close.",
        ],
      },
      {
        heading: "5. Work with a broker who has real market access",
        paragraphs: [
          "This is the lever most operators overlook. A broker who can only reach a few secondary-market carriers has little leverage, they shop the same markets everyone else does. A broker with access to premium A-rated carriers can place a clean fleet with an insurer that rewards good risk with a better rate.",
          "That's the whole model here: carrier quality over carrier count, so your premium reflects the operation you actually run.",
        ],
      },
      {
        heading: "The false economies to avoid",
        bullets: [
          "Under-insuring cargo to save a few dollars, then eating a full load on one claim.",
          "Chasing the cheapest carrier that non-renews you after a single incident.",
          "Letting coverage lapse between policies, a gap that spikes your next premium.",
          "Misrepresenting your operation to get a lower quote, which voids claims when it matters.",
        ],
      },
      {
        heading: "The bottom line",
        paragraphs: [
          "Lower premiums come from lower risk and better market access, not from cutting corners. If it's been a while since anyone actually reviewed your policy against your operation, that's usually where the savings are hiding.",
        ],
      },
    ],
  },
];

export function getPostBySlug(slug: string): Post | undefined {
  return POSTS.find((p) => p.slug === slug);
}
