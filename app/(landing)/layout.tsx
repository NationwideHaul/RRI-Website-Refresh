import Image from "next/image";
import { PhoneCall } from "lucide-react";

/**
 * Standalone landing shell for paid traffic. Renders a minimal branded header
 * (logo + click-to-call only) and NO site navigation menu. These routes are
 * single-purpose conversion pages: the header offers the phone as the only
 * action, with no links out to the rest of the site. Kept separate from the
 * (main) route group so it never inherits the full site Nav/Footer.
 */
export default function LandingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen scroll-smooth">
      {/* Meta Pixel now loads site-wide from the root layout (meta-pixel.tsx). */}
      <header className="sticky top-0 z-50 border-b border-gray-100 bg-white/95 shadow-sm backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-5 py-3 sm:px-6">
          <Image
            src="/images/rr-secondary-logo.webp"
            alt="Road Ready Insurance"
            width={500}
            height={135}
            priority
            sizes="150px"
            className="h-8 w-auto sm:h-9"
          />
          <a
            href="tel:+19549534845"
            className="btn btn-primary h-10 gap-2 px-4 text-[14px]"
          >
            <PhoneCall className="h-4 w-4" strokeWidth={2} />
            <span>(954) 953-4845</span>
          </a>
        </div>
      </header>
      {children}
    </div>
  );
}
