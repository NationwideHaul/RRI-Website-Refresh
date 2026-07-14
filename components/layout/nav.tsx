"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
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
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  // Floating pill nav. Translucent dark glass only at the very top of the
  // home page (so the fluid-gradient hero shows through, like the reference);
  // solid dark glass once scrolled or on any inner page, so the white text
  // and links stay legible over light page content.
  const solid = scrolled || pathname !== "/";

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-3 pt-3 sm:px-4 sm:pt-4">
      <div
        className={cn(
          "mx-auto flex h-16 max-w-7xl items-center justify-between gap-6 rounded-full border pl-3 pr-3 backdrop-blur-xl transition-colors duration-300 sm:pl-4 sm:pr-4",
          solid
            ? "border-white/10 bg-primary-dark/90 shadow-[0_10px_30px_rgba(6,17,38,0.35)]"
            : "border-white/20 bg-primary-dark/35 shadow-[0_10px_30px_rgba(6,17,38,0.20)]",
        )}
      >
        {/* Brand: full Road Ready logo (white version for the dark bar) */}
        <Link
          href="/"
          className="flex shrink-0 items-center"
          aria-label="Road Ready Insurance home"
        >
          <Image
            src="/images/rr-white-logo.png"
            alt="Road Ready Insurance"
            width={500}
            height={135}
            priority
            className="h-10 w-auto"
          />
        </Link>

        {/* Center links */}
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
                        "inline-flex h-9 items-center rounded-full px-3.5 text-[15px] font-medium transition-colors focus-visible:outline-none",
                        active
                          ? "bg-white/15 text-white"
                          : "text-white/75 hover:bg-white/10 hover:text-white",
                      )}
                    >
                      {section.label}
                    </Link>
                  </NavigationMenuItem>
                );
              }

              const anyChildActive = section.children.some((c) => isActive(c.href));
              return (
                <NavigationMenuItem key={section.label}>
                  <NavigationMenuTrigger
                    className={cn(
                      "h-9 rounded-full bg-transparent px-3.5 text-[15px] font-medium hover:bg-white/10 focus:bg-white/10 data-[popup-open]:bg-white/10",
                      anyChildActive
                        ? "text-white"
                        : "text-white/75 hover:text-white data-[popup-open]:text-white",
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

        {/* Right actions — ghost Client Portal + white "Call Now" pill */}
        <div className="flex shrink-0 items-center gap-2">
          <Link
            href="/customer-service/"
            className="hidden rounded-full border border-white/30 px-5 py-2 text-[14px] font-semibold text-white transition-colors hover:bg-white/10 lg:inline-flex"
          >
            Client Portal
          </Link>
          <a
            href={`tel:${NAP.phone}`}
            className="hidden items-center gap-2 rounded-full bg-white px-5 py-2 text-[15px] font-semibold text-primary-dark transition-colors hover:bg-white/90 lg:inline-flex"
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
