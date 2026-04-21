/**
 * Shared JSON-LD utilities for schema components.
 * Keep serialization centralized so every schema renders the same way.
 */

import { NAP, SITE, SOCIALS } from "./constants";

export type JsonLdValue =
  | string
  | number
  | boolean
  | null
  | JsonLdObject
  | JsonLdValue[];
export type JsonLdObject = { [key: string]: JsonLdValue | undefined };

/**
 * Strip undefined/empty-string fields so schema doesn't ship with placeholder noise.
 * Keeps explicit `null`, `0`, and `false`.
 */
export function clean<T extends JsonLdObject>(obj: T): JsonLdObject {
  const out: JsonLdObject = {};
  for (const [key, value] of Object.entries(obj)) {
    if (value === undefined) continue;
    if (typeof value === "string" && (value === "" || value.startsWith("PLACEHOLDER_")))
      continue;
    if (Array.isArray(value)) {
      const arr = value.filter(
        (v) =>
          v !== undefined &&
          !(typeof v === "string" && (v === "" || v.startsWith("PLACEHOLDER_"))),
      );
      if (arr.length > 0) out[key] = arr;
      continue;
    }
    out[key] = value;
  }
  return out;
}

export function absoluteUrl(path: string): string {
  if (path.startsWith("http://") || path.startsWith("https://")) return path;
  const base = SITE.url.replace(/\/$/, "");
  return `${base}${path.startsWith("/") ? path : `/${path}`}`;
}

export function sameAsList(): string[] {
  return (Object.values(SOCIALS) as string[]).filter((url) => url.length > 0);
}

export function postalAddressSchema(): JsonLdObject {
  return clean({
    "@type": "PostalAddress",
    streetAddress: NAP.address.street,
    addressLocality: NAP.address.city,
    addressRegion: NAP.address.state,
    postalCode: NAP.address.zip,
    addressCountry: NAP.address.country,
  });
}

export function geoCoordinatesSchema(): JsonLdObject {
  return {
    "@type": "GeoCoordinates",
    latitude: NAP.geo.latitude,
    longitude: NAP.geo.longitude,
  };
}
