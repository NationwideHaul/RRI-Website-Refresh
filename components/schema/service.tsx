import { SITE } from "@/lib/constants";
import { absoluteUrl, clean } from "@/lib/schema-builder";

export type ServiceSchemaProps = {
  name: string;
  description: string;
  slug: string;
  serviceType?: string;
};

export function ServiceSchema({
  name,
  description,
  slug,
  serviceType,
}: ServiceSchemaProps) {
  const schema = clean({
    "@context": "https://schema.org",
    "@type": "Service",
    name,
    description,
    serviceType: serviceType ?? name,
    url: absoluteUrl(slug),
    provider: {
      "@type": "InsuranceAgency",
      name: SITE.legalName,
      url: SITE.url,
    },
    areaServed: {
      "@type": "Country",
      name: "United States",
    },
  });

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
