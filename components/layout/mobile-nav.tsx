"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { NAV_SECTIONS } from "@/lib/nav-config";

export function MobileNav() {
  const [open, setOpen] = useState(false);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger
        className="inline-flex h-10 w-10 items-center justify-center rounded-md text-foreground transition-colors hover:text-primary lg:hidden"
        aria-label="Open menu"
      >
        <Menu className="h-6 w-6" strokeWidth={1.5} />
      </SheetTrigger>

      <SheetContent
        side="right"
        showCloseButton={false}
        className="w-full max-w-md gap-0 bg-white p-0 sm:max-w-md"
      >
        <SheetHeader className="flex-row items-center justify-between border-b border-gray-100 px-6 py-4">
          <SheetTitle className="text-[15px] font-semibold text-foreground">
            Menu
          </SheetTitle>
          <SheetClose
            className="inline-flex h-10 w-10 items-center justify-center rounded-md text-foreground transition-colors hover:text-primary"
            aria-label="Close menu"
          >
            <X className="h-6 w-6" strokeWidth={1.5} />
          </SheetClose>
        </SheetHeader>

        <div className="px-6 py-6">
          <Link
            href="/#quote-form"
            onClick={() => setOpen(false)}
            className="flex items-center justify-center rounded-lg bg-primary px-5 py-3 text-[15px] font-semibold text-white transition-colors hover:bg-primary-dark"
          >
            Start Your Quote
          </Link>
        </div>

        <nav className="border-t border-gray-100 px-2 py-2">
          <Accordion multiple={false} className="w-full">
            {NAV_SECTIONS.map((section) => {
              if (section.kind === "link") {
                return (
                  <div key={section.label} className="border-b border-gray-100">
                    <Link
                      href={section.href}
                      onClick={() => setOpen(false)}
                      className="flex items-center px-4 py-4 text-[17px] font-semibold text-foreground transition-colors hover:text-primary"
                    >
                      {section.label}
                    </Link>
                  </div>
                );
              }

              return (
                <AccordionItem
                  key={section.label}
                  value={section.label}
                  className="border-b border-gray-100"
                >
                  <AccordionTrigger className="px-4 py-4 text-[17px] font-semibold text-foreground hover:no-underline hover:text-primary">
                    {section.label}
                  </AccordionTrigger>
                  <AccordionContent className="pb-3">
                    <ul className="flex flex-col">
                      {section.children.map((item) => (
                        <li key={item.href}>
                          <Link
                            href={item.href}
                            onClick={() => setOpen(false)}
                            className="block rounded-md px-4 py-2.5 text-[15px] text-gray-700 transition-colors hover:bg-primary-soft hover:text-primary"
                          >
                            {item.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </AccordionContent>
                </AccordionItem>
              );
            })}
          </Accordion>
        </nav>
      </SheetContent>
    </Sheet>
  );
}
