import {
  AREA_SERVED_STATES,
  NAP,
  SERVICE_TYPES,
  SITE,
} from "@/lib/constants";
import {
  absoluteUrl,
  clean,
  postalAddressSchema,
  sameAsList,
} from "@/lib/schema-builder";

export function InsuranceAgencySchema() {
  const schema = clean({
    "@context": "https://schema.org",
    "@type": "InsuranceAgency",
    name: SITE.legalName,
    alternateName: SITE.name,
    url: SITE.url,
    logo: absoluteUrl(SITE.logoPath),
    description: SITE.description,
    address: postalAddressSchema(),
    telephone: NAP.phone,
    email: NAP.email,
    sameAs: sameAsList(),
    areaServed: AREA_SERVED_STATES.map((code) => ({
      "@type": "AdministrativeArea",
      name: code,
    })),
    serviceType: [...SERVICE_TYPES],
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Commercial trucking insurance coverages",
      itemListElement: SERVICE_TYPES.map((name) => ({
        "@type": "Offer",
        itemOffered: { "@type": "Service", name },
      })),
    },
  });

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
