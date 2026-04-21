import { clean } from "@/lib/schema-builder";

export type FAQItem = { question: string; answer: string };

export function FAQPageSchema({ items }: { items: FAQItem[] }) {
  if (items.length === 0) return null;

  const schema = clean({
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  });

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
