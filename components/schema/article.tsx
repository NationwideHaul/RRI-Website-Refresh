import { SITE } from "@/lib/constants";
import { absoluteUrl, clean } from "@/lib/schema-builder";

export type ArticleSchemaProps = {
  headline: string;
  description?: string;
  slug: string;
  authorName: string;
  datePublished: string; // ISO 8601
  dateModified?: string;
  imagePath?: string;
};

export function ArticleSchema({
  headline,
  description,
  slug,
  authorName,
  datePublished,
  dateModified,
  imagePath,
}: ArticleSchemaProps) {
  const schema = clean({
    "@context": "https://schema.org",
    "@type": "Article",
    headline,
    description,
    url: absoluteUrl(slug),
    datePublished,
    dateModified: dateModified ?? datePublished,
    author: {
      "@type": "Person",
      name: authorName,
    },
    publisher: {
      "@type": "Organization",
      name: SITE.legalName,
      logo: {
        "@type": "ImageObject",
        url: absoluteUrl(SITE.logoPath),
      },
    },
    image: imagePath ? absoluteUrl(imagePath) : undefined,
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": absoluteUrl(slug),
    },
  });

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
