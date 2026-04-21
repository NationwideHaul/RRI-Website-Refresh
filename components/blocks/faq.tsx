import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { FAQPageSchema, type FAQItem } from "@/components/schema/faq-page";

export type FAQProps = {
  items: FAQItem[];
  /** Attach FAQPageSchema (JSON-LD) inline. Defaults to true. */
  withSchema?: boolean;
};

export function FAQ({ items, withSchema = true }: FAQProps) {
  return (
    <div className="flex flex-col gap-6">
      {withSchema && <FAQPageSchema items={items} />}

      <Accordion multiple={false} className="flex w-full flex-col gap-0">
        {items.map((item, index) => (
          <AccordionItem
            key={index}
            value={String(index)}
            className="border-b border-gray-100"
          >
            <AccordionTrigger className="py-6 text-left text-[18px] font-semibold leading-[1.35] text-foreground hover:no-underline sm:text-[20px] [&>svg]:h-5 [&>svg]:w-5 [&>svg]:text-primary">
              {item.question}
            </AccordionTrigger>
            <AccordionContent className="pb-6 text-[16px] leading-[1.65] text-gray-700 sm:text-[17px]">
              {item.answer}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
}
