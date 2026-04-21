import { absoluteUrl, clean } from "@/lib/schema-builder";

export type BreadcrumbItem = { name: string; href: string };

export function BreadcrumbListSchema({ items }: { items: BreadcrumbItem[] }) {
  if (items.length === 0) return null;

  const schema = clean({
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.href),
    })),
  });

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
