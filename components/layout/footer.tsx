import Image from "next/image";
import Link from "next/link";
import { Mail, MapPin, Phone } from "lucide-react";
import { NAP, LICENSE_INFO, SOCIALS } from "@/lib/constants";
import { FOOTER_LEGAL } from "@/lib/nav-config";
import { NewsletterForm } from "@/components/blocks/newsletter-form";

// Brand glyphs inlined — lucide no longer ships social brand icons.
function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" className={className} aria-hidden="true">
      <rect x="2.5" y="2.5" width="19" height="19" rx="5" />
      <circle cx="12" cy="12" r="4.2" />
      <circle cx="17.3" cy="6.7" r="1.1" fill="currentColor" stroke="none" />
    </svg>
  );
}

function FacebookIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M13.5 21v-7h2.4l.5-3h-2.9V9.1c0-.9.3-1.6 1.6-1.6h1.4V4.8c-.7-.1-1.5-.2-2.3-.2-2.4 0-4 1.4-4 4V11H8v3h2.2v7z" />
    </svg>
  );
}

function LinkedinIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M6.5 8.8H3.6V21h2.9zM5 7.4a1.7 1.7 0 1 0 0-3.4 1.7 1.7 0 0 0 0 3.4zM20.5 14.2c0-3.1-1.7-4.6-3.9-4.6-1.8 0-2.6 1-3 1.7V8.8h-2.9V21h2.9v-6.5c0-1.3.6-2.1 1.8-2.1s1.7.9 1.7 2.2V21h2.9z" />
    </svg>
  );
}

const SOCIAL_LINKS = [
  { label: "Facebook", href: SOCIALS.facebook || "#", icon: FacebookIcon },
  { label: "Instagram", href: SOCIALS.instagram || "#", icon: InstagramIcon },
  { label: "LinkedIn", href: SOCIALS.linkedin || "#", icon: LinkedinIcon },
];

export function Footer() {
  const year = new Date().getFullYear();
  const addr = NAP.address;

  return (
    <footer className="bg-primary-dark text-white/90">
      {/* Top row: logo + newsletter signup */}
      <div className="border-b border-white/10">
        <div className="relative z-10 mx-auto flex max-w-7xl flex-col gap-8 px-6 py-12 lg:flex-row lg:items-center lg:justify-between lg:px-8">
          <Link href="/" aria-label="Road Ready Insurance home">
            <Image
              src="/images/rr-white-logo.png"
              alt="Road Ready Insurance"
              width={500}
              height={110}
              className="h-20 w-auto"
            />
          </Link>
          <div className="flex flex-col gap-3 lg:items-end">
            <div>
              <h4 className="text-[15px] font-semibold text-white">
                Join our newsletter
              </h4>
              <p className="text-sm text-white/60">
                Industry news and important updates, no spam.
              </p>
            </div>
            <NewsletterForm />
          </div>
        </div>
      </div>

      {/* Contact + socials */}
      <div className="relative z-10 mx-auto max-w-7xl px-6 py-12 lg:px-8">
        <div className="flex flex-col gap-10 md:flex-row md:items-start md:justify-between">
          <div className="flex flex-col gap-4">
            <a
              href={`tel:${NAP.phone}`}
              className="whitespace-nowrap text-[32px] font-bold tracking-[-0.01em] text-white transition-colors hover:text-cyan sm:text-[36px]"
            >
              {NAP.phoneDisplay}
            </a>
            <a
              href={`mailto:${NAP.email}`}
              className="inline-flex items-center gap-2 text-sm text-white/90 transition-colors hover:text-cyan"
            >
              <Mail className="h-4 w-4" strokeWidth={1.5} />
              {NAP.email}
            </a>
          </div>

          <ul className="flex flex-col gap-2.5 text-sm">
            <li className="flex items-start gap-2 text-white/75">
              <MapPin className="mt-0.5 h-4 w-4 flex-shrink-0" strokeWidth={1.5} />
              <span>
                {addr.street}
                <br />
                {addr.city}, {addr.state} {addr.zip}
              </span>
            </li>
            <li className="flex items-center gap-2 text-white/75">
              <Phone className="h-4 w-4 flex-shrink-0" strokeWidth={1.5} />
              <span>{NAP.hours}</span>
            </li>
          </ul>

          <ul className="flex gap-3">
            {SOCIAL_LINKS.map(({ label, href, icon: Icon }) => (
              <li key={label}>
                <a
                  href={href}
                  {...(href !== "#"
                    ? { target: "_blank", rel: "noopener noreferrer" }
                    : {})}
                  aria-label={`Road Ready Insurance on ${label}`}
                  className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-cyan hover:text-primary-dark"
                >
                  <Icon className="h-[18px] w-[18px]" />
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="border-t border-white/20">
        <div className="relative z-10 mx-auto flex max-w-7xl flex-col gap-4 px-6 py-6 text-xs text-white/70 md:flex-row md:items-center md:justify-between lg:px-8">
          <div className="flex flex-col gap-1 md:flex-row md:items-center md:gap-4">
            <span>&copy; {year} {NAP.legalName}. All rights reserved.</span>
            <span className="hidden md:inline text-white/40">&middot;</span>
            <span>FL License #{LICENSE_INFO.agencyLicenseNumber}</span>
          </div>
          <ul className="flex flex-wrap items-center gap-x-5 gap-y-2">
            {FOOTER_LEGAL.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="transition-colors hover:text-cyan"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
}
