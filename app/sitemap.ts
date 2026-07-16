import type { MetadataRoute } from "next";
import { SITE } from "@/lib/constants";
import { COVERAGES } from "@/content/coverage";

/**
 * XML sitemap covering every indexable route. Trailing-slash URLs match the
 * per-page canonicals and the production URL convention. Coverage detail
 * routes are generated from the coverage catalog so this never drifts.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const url = (path: string) => `${SITE.url}${path}`;

  const staticRoutes: { path: string; priority: number; changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"] }[] = [
    { path: "/", priority: 1.0, changeFrequency: "weekly" },
    { path: "/coverage/", priority: 0.9, changeFrequency: "monthly" },
    { path: "/rri-advantage/", priority: 0.8, changeFrequency: "monthly" },
    { path: "/who-we-cover/", priority: 0.7, changeFrequency: "monthly" },
    { path: "/client-perks/", priority: 0.6, changeFrequency: "monthly" },
    { path: "/how-to-start-a-trucking-company/", priority: 0.8, changeFrequency: "monthly" },
    { path: "/report-a-claim/", priority: 0.7, changeFrequency: "monthly" },
    { path: "/get-a-coi/", priority: 0.6, changeFrequency: "monthly" },
    { path: "/policy-change/", priority: 0.6, changeFrequency: "monthly" },
    { path: "/customer-service/", priority: 0.6, changeFrequency: "monthly" },
    { path: "/careers/", priority: 0.5, changeFrequency: "monthly" },
    { path: "/road-ready-blog/", priority: 0.5, changeFrequency: "weekly" },
    { path: "/contact-us/", priority: 0.7, changeFrequency: "yearly" },
    { path: "/privacy-policy/", priority: 0.3, changeFrequency: "yearly" },
    { path: "/terms-conditions/", priority: 0.3, changeFrequency: "yearly" },
  ];

  const coverageRoutes = COVERAGES.map((c) => ({
    path: c.href,
    priority: 0.8,
    changeFrequency: "monthly" as const,
  }));

  return [...staticRoutes, ...coverageRoutes].map((r) => ({
    url: url(r.path),
    changeFrequency: r.changeFrequency,
    priority: r.priority,
  }));
}
