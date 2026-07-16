import Image from "next/image";
import Link from "next/link";
import { Mail, MapPin, Phone } from "lucide-react";
import { NAP, LICENSE_INFO, SITE, SOCIALS } from "@/lib/constants";
import {
  FOOTER_COVERAGES,
  FOOTER_COMPANY,
  FOOTER_SUPPORT,
  FOOTER_LEGAL,
  type NavLink,
} from "@/lib/nav-config";
import { NewsletterForm } from "@/components/blocks/newsletter-form";

// Brand glyphs inlined, lucide no longer ships social brand icons.
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

function FooterColumn({ title, links }: { title: string; links: NavLink[] }) {
  return (
    <div className="flex flex-col gap-4">
      <h4 className="text-[13px] font-semibold text-white">{title}</h4>
      <ul className="flex flex-col gap-2.5">
        {links.map((link) => (
          <li key={link.href}>
            <Link
              href={link.href}
              className="text-[14px] leading-snug text-white/65 transition-colors hover:text-cyan"
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function Footer() {
  const year = new Date().getFullYear();
  const addr = NAP.address;

  return (
    <footer className="relative isolate overflow-hidden border-t border-white/12 bg-primary-dark text-white/80">
      {/* Soft brand glow, echoing the hero panels */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-24 right-0 z-0 h-80 w-80 rounded-full bg-cyan/10 blur-3xl"
      />

      <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-8">
        {/* Top: brand + newsletter */}
        <div className="grid grid-cols-1 gap-10 border-b border-white/10 py-12 lg:grid-cols-2 lg:items-center">
          <div className="flex flex-col gap-4">
            <Link href="/" aria-label="Road Ready Insurance home" className="w-fit">
              <Image
                src="/images/rr-white-logo.png"
                alt="Road Ready Insurance"
                width={500}
                height={110}
                className="h-14 w-auto"
              />
            </Link>
            <p className="max-w-sm text-[14px] leading-[1.6] text-white/60">
              {SITE.tagline}
            </p>
          </div>

          <div className="flex flex-col gap-3 lg:items-end">
            <div className="lg:text-right">
              <h4 className="text-[15px] font-semibold text-white">Join our newsletter</h4>
              <p className="text-[13px] text-white/55">Industry news and important updates, no spam.</p>
            </div>
            <div className="w-full max-w-sm">
              <NewsletterForm />
            </div>
          </div>
        </div>

        {/* Link columns + contact */}
        <div className="grid grid-cols-2 gap-x-8 gap-y-10 py-14 sm:grid-cols-3 lg:grid-cols-5">
          {/* Contact — spans wider */}
          <div className="col-span-2 flex flex-col gap-5 sm:col-span-3 lg:col-span-2">
            <h4 className="text-[13px] font-semibold text-white">Get in touch</h4>
            <a
              href={`tel:${NAP.phone}`}
              className="w-fit text-[28px] font-bold tracking-[-0.01em] text-white transition-colors hover:text-cyan"
            >
              {NAP.phoneDisplay}
            </a>
            <div className="flex flex-col gap-2.5 text-[14px]">
              <a
                href={`mailto:${NAP.email}`}
                className="inline-flex items-center gap-2.5 text-white/70 transition-colors hover:text-cyan"
              >
                <Mail className="h-4 w-4 flex-shrink-0" strokeWidth={1.5} />
                {NAP.email}
              </a>
              <span className="inline-flex items-start gap-2.5 text-white/70">
                <MapPin className="mt-0.5 h-4 w-4 flex-shrink-0" strokeWidth={1.5} />
                <span>
                  {addr.street}
                  <br />
                  {addr.city}, {addr.state} {addr.zip}
                </span>
              </span>
              <span className="inline-flex items-center gap-2.5 text-white/70">
                <Phone className="h-4 w-4 flex-shrink-0" strokeWidth={1.5} />
                {NAP.hours}
              </span>
            </div>

            <ul className="mt-1 flex gap-2.5">
              {SOCIAL_LINKS.map(({ label, href, icon: Icon }) => (
                <li key={label}>
                  <a
                    href={href}
                    {...(href !== "#" ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                    aria-label={`Road Ready Insurance on ${label}`}
                    className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-white ring-1 ring-white/10 transition-colors hover:bg-cyan hover:text-primary-dark"
                  >
                    <Icon className="h-[17px] w-[17px]" />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <FooterColumn title="Coverage" links={FOOTER_COVERAGES} />
          <FooterColumn title="Company" links={FOOTER_COMPANY} />
          <FooterColumn title="Support" links={FOOTER_SUPPORT} />
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col gap-4 border-t border-white/10 py-6 text-[12px] text-white/55 md:flex-row md:items-center md:justify-between">
          <div className="flex flex-col gap-1.5 md:flex-row md:items-center md:gap-4">
            <span>
              &copy; {year} {NAP.legalName}. All rights reserved.
            </span>
            <span className="hidden text-white/30 md:inline">&middot;</span>
            <span>{LICENSE_INFO.licensedDescription}</span>
            <span className="hidden text-white/30 md:inline">&middot;</span>
            <span>FL License #{LICENSE_INFO.agencyLicenseNumber}</span>
          </div>
          <ul className="flex flex-wrap items-center gap-x-5 gap-y-2">
            {FOOTER_LEGAL.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="transition-colors hover:text-cyan">
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
