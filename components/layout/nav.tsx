"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Phone } from "lucide-react";
import { cn } from "@/lib/utils";
import { NAP } from "@/lib/constants";
import { NAV_SECTIONS } from "@/lib/nav-config";
import { MobileNav } from "./mobile-nav";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";

export function Nav() {
  const pathname = usePathname();

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    // White glassmorphic bar (RingCentral-style): translucent white +
    // backdrop blur so content frosts through on scroll, soft diffuse shadow.
    <header className="sticky top-0 z-40 w-full bg-white/75 backdrop-blur-xl shadow-[0_2px_16px_rgba(15,30,61,0.08)]">
      <div className="mx-auto flex h-[84px] max-w-7xl items-center justify-between gap-8 px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-2" aria-label="Road Ready Insurance home">
          <Image
            src="/images/rr-secondary-logo.png"
            alt="Road Ready Insurance"
            width={260}
            height={56}
            priority
            className="h-14 w-auto"
          />
        </Link>

        <NavigationMenu className="hidden lg:flex">
          <NavigationMenuList className="gap-1">
            {NAV_SECTIONS.map((section) => {
              if (section.kind === "link") {
                const active = isActive(section.href);
                return (
                  <NavigationMenuItem key={section.label}>
                    <Link
                      href={section.href}
                      className={cn(
                        "relative inline-flex h-10 items-center px-3 text-[15px] font-medium text-foreground transition-colors hover:text-primary focus-visible:text-primary focus-visible:outline-none",
                        active && "text-primary",
                      )}
                    >
                      {section.label}
                      {active && (
                        <span className="absolute inset-x-3 -bottom-[1px] h-[2px] bg-cyan" />
                      )}
                    </Link>
                  </NavigationMenuItem>
                );
              }

              const anyChildActive = section.children.some((c) => isActive(c.href));
              return (
                <NavigationMenuItem key={section.label}>
                  <NavigationMenuTrigger
                    className={cn(
                      "h-10 bg-transparent px-3 text-[15px] font-medium text-foreground hover:bg-transparent hover:text-primary data-[popup-open]:bg-transparent data-[popup-open]:text-primary focus:bg-transparent",
                      anyChildActive && "text-primary",
                    )}
                  >
                    {section.label}
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <DropdownGrid items={section.children} />
                  </NavigationMenuContent>
                </NavigationMenuItem>
              );
            })}
          </NavigationMenuList>
        </NavigationMenu>

        <div className="flex items-center gap-2.5">
          <Link
            href="/customer-service/"
            className="hidden rounded-full bg-primary px-5 py-2.5 text-[14px] font-semibold text-white transition-colors hover:bg-primary-dark lg:inline-flex"
          >
            Client Portal
          </Link>
          <a
            href={`tel:${NAP.phone}`}
            className="hidden items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-[15px] font-semibold text-white transition-colors hover:bg-primary-dark lg:inline-flex"
          >
            <Phone className="h-4 w-4" strokeWidth={2} />
            Call Now
          </a>
          <MobileNav />
        </div>
      </div>
    </header>
  );
}

function DropdownGrid({
  items,
}: {
  items: { label: string; href: string; description?: string }[];
}) {
  const twoCol = items.length > 6;
  return (
    <div
      className={cn(
        "grid gap-1 rounded-xl bg-white p-4 shadow-lg",
        twoCol ? "w-[620px] grid-cols-2" : "w-[360px] grid-cols-1",
      )}
    >
      {items.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          className="group block rounded-md px-3 py-2.5 transition-colors hover:bg-primary-soft focus:bg-primary-soft focus:outline-none"
        >
          <div className="text-[15px] font-semibold text-foreground group-hover:text-primary">
            {item.label}
          </div>
          {item.description && (
            <div className="mt-0.5 text-[13px] leading-[1.4] text-gray-500">
              {item.description}
            </div>
          )}
        </Link>
      ))}
    </div>
  );
}
