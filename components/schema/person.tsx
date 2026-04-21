import { SITE } from "@/lib/constants";
import { absoluteUrl, clean } from "@/lib/schema-builder";

export type PersonSchemaProps = {
  name: string;
  jobTitle?: string;
  imagePath?: string;
  slug?: string;
  sameAs?: string[];
  description?: string;
};

export function PersonSchema({
  name,
  jobTitle,
  imagePath,
  slug,
  sameAs,
  description,
}: PersonSchemaProps) {
  const schema = clean({
    "@context": "https://schema.org",
    "@type": "Person",
    name,
    jobTitle,
    description,
    image: imagePath ? absoluteUrl(imagePath) : undefined,
    url: slug ? absoluteUrl(slug) : undefined,
    worksFor: {
      "@type": "InsuranceAgency",
      name: SITE.legalName,
      url: SITE.url,
    },
    sameAs: sameAs && sameAs.length > 0 ? sameAs.filter(Boolean) : undefined,
  });

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
