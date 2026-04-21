import { NAP, SITE } from "@/lib/constants";
import {
  absoluteUrl,
  clean,
  geoCoordinatesSchema,
  postalAddressSchema,
  sameAsList,
} from "@/lib/schema-builder";

export function LocalBusinessSchema() {
  const schema = clean({
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": `${SITE.url}/#business`,
    name: SITE.legalName,
    alternateName: SITE.name,
    url: SITE.url,
    logo: absoluteUrl(SITE.logoPath),
    image: absoluteUrl(SITE.logoPath),
    description: SITE.description,
    telephone: NAP.phone,
    email: NAP.email,
    address: postalAddressSchema(),
    geo: geoCoordinatesSchema(),
    sameAs: sameAsList(),
    priceRange: "$$",
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: [
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
        ],
        opens: "09:00",
        closes: "18:00",
      },
    ],
  });

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
