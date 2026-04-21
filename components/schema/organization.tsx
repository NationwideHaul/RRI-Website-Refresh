import { NAP, SITE } from "@/lib/constants";
import {
  absoluteUrl,
  clean,
  postalAddressSchema,
  sameAsList,
} from "@/lib/schema-builder";

export function OrganizationSchema() {
  const schema = clean({
    "@context": "https://schema.org",
    "@type": "Organization",
    name: SITE.legalName,
    alternateName: SITE.name,
    url: SITE.url,
    logo: absoluteUrl(SITE.logoPath),
    description: SITE.description,
    address: postalAddressSchema(),
    telephone: NAP.phone,
    email: NAP.email,
    sameAs: sameAsList(),
  });

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
