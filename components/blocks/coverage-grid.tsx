import { COVERAGES } from "@/content/coverage";
import { CoverageCard } from "./coverage-card";

export function CoverageGrid() {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8">
      {COVERAGES.map((coverage) => (
        <CoverageCard
          key={coverage.slug}
          icon={coverage.icon}
          title={coverage.name}
          description={coverage.short}
          href={coverage.href}
        />
      ))}
    </div>
  );
}
