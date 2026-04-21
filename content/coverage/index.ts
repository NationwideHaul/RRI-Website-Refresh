/**
 * Coverage catalog — the 11 coverage types RRI places.
 * Single source of truth for the homepage coverage grid, nav dropdown
 * data, footer links, and (later) individual coverage pages.
 *
 * Icon mapping follows Design & Content doc §07.
 */

import {
  FileCheck,
  HeartPulse,
  Package,
  PlusCircle,
  RefreshCw,
  Route,
  Shield,
  ShieldAlert,
  Thermometer,
  Truck,
  Wrench,
  type LucideIcon,
} from "lucide-react";

export type Coverage = {
  slug: string;
  href: string;
  name: string;
  short: string;
  icon: LucideIcon;
};

export const COVERAGES: Coverage[] = [
  {
    slug: "commercial-trucking-liability",
    href: "/commercial-trucking-liability/",
    name: "Commercial Trucking Liability",
    short:
      "Foundational coverage protecting against claims from accidents involving bodily injury or property damage.",
    icon: Shield,
  },
  {
    slug: "physical-damage-comprehensive-collision",
    href: "/physical-damage-comprehensive-collision/",
    name: "Physical Damage",
    short:
      "Comprehensive and collision coverage for your trucks and trailers, regardless of who is at fault.",
    icon: Truck,
  },
  {
    slug: "motor-truck-cargo",
    href: "/motor-truck-cargo/",
    name: "Motor Truck Cargo",
    short:
      "Protection for the freight you haul, often worth more than the truck itself.",
    icon: Package,
  },
  {
    slug: "trailer-interchange",
    href: "/trailer-interchange/",
    name: "Trailer Interchange",
    short:
      "When you use someone else's trailer, this covers damage while it is in your possession.",
    icon: RefreshCw,
  },
  {
    slug: "non-trucking-liability",
    href: "/non-trucking-liability/",
    name: "Non-Trucking Liability",
    short:
      "Coverage when the truck is in use for non-business purposes. The bobtail you did not think you needed.",
    icon: ShieldAlert,
  },
  {
    slug: "reefer-breakdown",
    href: "/reefer-breakdown/",
    name: "Reefer Breakdown",
    short:
      "Refrigerated haulers, covered when the unit fails and your load suffers.",
    icon: Thermometer,
  },
  {
    slug: "truckers-workers-compensation",
    href: "/truckers-workers-compensation/",
    name: "Workers Compensation",
    short:
      "Protection for drivers and staff when they are injured on the job.",
    icon: HeartPulse,
  },
  {
    slug: "trucking-transportation-bonds",
    href: "/trucking-transportation-bonds/",
    name: "Transportation Bonds",
    short:
      "BMC-84, ICC, and other surety bonds for authority, brokerage, and operations.",
    icon: FileCheck,
  },
  {
    slug: "single-trip-cargo-insurance",
    href: "/single-trip-cargo-insurance/",
    name: "Single Trip Cargo",
    short:
      "One-time high-value load coverage without binding a full annual policy.",
    icon: Route,
  },
  {
    slug: "construction-equipment",
    href: "/construction-equipment/",
    name: "Construction Equipment",
    short:
      "Inland marine and specialty coverage for fleets carrying or operating heavy equipment.",
    icon: Wrench,
  },
  {
    slug: "additional-coverages",
    href: "/additional-coverages/",
    name: "Additional Coverages",
    short:
      "GAP, rental reimbursement, tow and labor. The add-ons that complete the policy.",
    icon: PlusCircle,
  },
];

export function getCoverageBySlug(slug: string): Coverage | undefined {
  return COVERAGES.find((c) => c.slug === slug);
}
