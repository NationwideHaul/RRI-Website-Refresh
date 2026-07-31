import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Every canonical, the XML sitemap, and llms.txt use trailing-slash URLs.
  // Without this, Next serves the non-slash form as canonical and 308-redirects
  // the trailing-slash form — so each declared canonical pointed at a redirect.
  // This makes the server's canonical form match what we advertise everywhere.
  trailingSlash: true,
  images: {
    // Serve AVIF (smallest) first, then WebP, then the original — browsers that
    // don't support AVIF fall back automatically. Meaningfully smaller photos.
    formats: ["image/avif", "image/webp"],
    // The project lives on an external drive where macOS drops AppleDouble
    // ("._*") companion files inside .next/cache/images, which poisons the
    // optimizer cache (it serves the 4KB "._" junk instead of the image).
    // Skip optimization in dev only — production builds on Vercel (Linux)
    // are unaffected and stay optimized.
    unoptimized: process.env.NODE_ENV === "development",
  },
  async redirects() {
    // Migration map: old roadreadyinsurance.com URLs -> new site. Sources use
    // trailing slashes to match the live site's URL form (and trailingSlash:true).
    // Keeps inbound links + SEO equity intact when the content is swapped.
    return [
      // ---- Renamed page ----
      { source: "/rri-advantage/", destination: "/who-we-are/", permanent: true },

      // ---- Audience-segment pages removed in the refresh -> Who We Cover hub ----
      // Note: /owner-operator-trucking-insurance/ and /amazon-relay/ were
      // REBUILT as real pages (high-intent SEO), so they are NOT redirected.
      { source: "/small-fleet-trucking-insurance/", destination: "/who-we-cover/", permanent: true },
      { source: "/large-fleet-trucking-insurance/", destination: "/who-we-cover/", permanent: true },
      { source: "/high-risk-trucking-insurance/", destination: "/who-we-cover/", permanent: true },

      // ---- Old blog posts with a strong topical match on the new site ----
      { source: "/road-ready-blog/how-much-does-insurance-cost-for-a-truck/", destination: "/road-ready-blog/how-much-does-commercial-truck-insurance-cost/", permanent: true },
      { source: "/road-ready-blog/trucking-insurance-rates/", destination: "/road-ready-blog/how-much-does-commercial-truck-insurance-cost/", permanent: true },
      { source: "/road-ready-blog/how-fleets-lower-truck-insurance-costs-2026/", destination: "/road-ready-blog/how-to-lower-your-truck-insurance-premiums/", permanent: true },

      // ---- Old blog posts with no direct equivalent -> blog index ----
      { source: "/road-ready-blog/fleet-trucking-insurance-guide-2026/", destination: "/road-ready-blog/", permanent: true },
      { source: "/road-ready-blog/trucking-insurance-claims/", destination: "/road-ready-blog/", permanent: true },
      { source: "/road-ready-blog/2025-international-roadcheck-results/", destination: "/road-ready-blog/", permanent: true },
      { source: "/road-ready-blog/what-is-gap-insurance-in-trucking-and-when-do-you-need-it-2025-guide/", destination: "/road-ready-blog/", permanent: true },
      { source: "/road-ready-blog/top-trucking-insurance-companies-in-2025-what-fleets-need-to-know/", destination: "/road-ready-blog/", permanent: true },
      { source: "/road-ready-blog/what-is-the-best-insurance-for-a-trucking-company/", destination: "/road-ready-blog/", permanent: true },
      { source: "/road-ready-blog/the-real-benefits-of-commercial-trucking-insurance-for-fleet-owners/", destination: "/road-ready-blog/", permanent: true },
      { source: "/road-ready-blog/how-to-get-the-right-trucking-insurance-for-your-business/", destination: "/road-ready-blog/", permanent: true },
    ];
  },
};

export default nextConfig;
