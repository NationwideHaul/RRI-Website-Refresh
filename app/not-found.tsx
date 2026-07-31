import Link from "next/link";
import { Nav } from "@/components/layout/nav";
import { Footer } from "@/components/layout/footer";
import { NAP } from "@/lib/constants";

// Global 404 for any unmatched URL (renders under the root layout, so it brings
// its own Nav + Footer to match the main site chrome). Legacy URLs that changed
// in the migration are handled by redirects() in next.config.ts; this is the
// safety net for anything with no mapping.
const hasRealPhone = !NAP.phone.startsWith("PLACEHOLDER_");

const LINKS = [
  { href: "/", label: "Home" },
  { href: "/coverage/", label: "Coverage" },
  { href: "/who-we-cover/", label: "Who we cover" },
  { href: "/road-ready-blog/", label: "Blog" },
  { href: "/contact-us/", label: "Contact us" },
];

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col">
      <Nav />
      <main className="flex-1 pt-24">
        <section className="mx-auto flex max-w-2xl flex-col items-center gap-6 px-6 py-24 text-center lg:py-32">
          <span className="text-[13px] font-semibold uppercase tracking-[0.14em] text-primary">
            Error 404
          </span>
          <h1 className="text-[40px] font-bold leading-[1.05] tracking-tight text-foreground sm:text-[52px]">
            This page took a wrong exit.
          </h1>
          <p className="max-w-xl text-[16px] leading-[1.6] text-gray-700">
            We couldn&apos;t find the page you were looking for. It may have moved
            or no longer exists. Let&apos;s get you back on the road.
          </p>

          <div className="flex flex-col items-center gap-4 sm:flex-row">
            <Link href="/#quote-form" className="btn btn-primary">
              Get a quote
            </Link>
            {hasRealPhone && (
              <a href={`tel:${NAP.phone}`} className="btn btn-outline">
                Call {NAP.phoneDisplay}
              </a>
            )}
          </div>

          <nav aria-label="Helpful links" className="mt-4 flex flex-wrap justify-center gap-x-6 gap-y-2">
            {LINKS.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="text-[15px] font-medium text-primary underline-offset-4 hover:underline"
              >
                {l.label}
              </Link>
            ))}
          </nav>
        </section>
      </main>
      <Footer />
    </div>
  );
}
