"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
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
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 2);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <header
      className={cn(
        "sticky top-0 z-40 w-full border-b border-gray-100 bg-white/95 backdrop-blur transition-shadow duration-150",
        scrolled && "shadow-sm",
      )}
    >
      <div className="mx-auto flex h-[72px] max-w-7xl items-center justify-between gap-8 px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-2" aria-label="Road Ready Insurance home">
          <Image
            src="/images/rr-secondary-logo.png"
            alt="Road Ready Insurance"
            width={160}
            height={36}
            priority
            className="h-9 w-auto"
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

        <div className="flex items-center gap-2">
          <Link
            href="/customer-service/"
            className="hidden rounded-lg border-[1.5px] border-gray-300 px-4 py-2 text-[14px] font-semibold text-foreground transition-colors hover:border-primary hover:text-primary lg:inline-flex"
          >
            Client Portal
          </Link>
          <Link
            href="/contact-us/"
            className="hidden rounded-lg bg-primary px-5 py-2.5 text-[15px] font-semibold text-white transition-colors hover:bg-primary-dark lg:inline-flex"
          >
            Contact us
          </Link>
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
