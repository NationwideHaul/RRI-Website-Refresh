import Image from "next/image";
import Link from "next/link";
import { Mail, MapPin, Phone } from "lucide-react";
import { NAP, LICENSE_INFO } from "@/lib/constants";
import {
  FOOTER_COMPANY,
  FOOTER_COVERAGES,
  FOOTER_LEGAL,
  FOOTER_SUPPORT,
} from "@/lib/nav-config";

export function Footer() {
  const year = new Date().getFullYear();
  const addr = NAP.address;

  return (
    <footer className="bg-primary-dark text-white/90">
      <div className="mx-auto max-w-7xl px-6 py-16 lg:px-8 lg:py-20">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-4">
          <div className="flex flex-col gap-5">
            <Link href="/" aria-label="Road Ready Insurance home">
              <Image
                src="/images/rr-white-logo.png"
                alt="Road Ready Insurance"
                width={180}
                height={40}
                className="h-10 w-auto"
              />
            </Link>
            <p className="text-sm leading-relaxed text-white/75">
              Specialist commercial trucking insurance broker.{" "}
              {LICENSE_INFO.licensedDescription}.
            </p>
            <ul className="flex flex-col gap-2 text-sm">
              <li>
                <a
                  href={`tel:${NAP.phone}`}
                  className="inline-flex items-center gap-2 text-white/90 transition-colors hover:text-cyan"
                >
                  <Phone className="h-4 w-4" strokeWidth={1.5} />
                  {NAP.phoneDisplay}
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${NAP.email}`}
                  className="inline-flex items-center gap-2 text-white/90 transition-colors hover:text-cyan"
                >
                  <Mail className="h-4 w-4" strokeWidth={1.5} />
                  {NAP.email}
                </a>
              </li>
              <li className="flex items-start gap-2 text-white/75">
                <MapPin className="mt-0.5 h-4 w-4 flex-shrink-0" strokeWidth={1.5} />
                <span>
                  {addr.street}
                  <br />
                  {addr.city}, {addr.state} {addr.zip}
                </span>
              </li>
            </ul>
          </div>

          <FooterColumn title="Coverages" links={FOOTER_COVERAGES} />
          <FooterColumn title="Company" links={FOOTER_COMPANY} />
          <FooterColumn title="Support" links={FOOTER_SUPPORT} />
        </div>
      </div>

      <div className="border-t border-white/20">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 px-6 py-6 text-xs text-white/70 md:flex-row md:items-center md:justify-between lg:px-8">
          <div className="flex flex-col gap-1 md:flex-row md:items-center md:gap-4">
            <span>&copy; {year} {NAP.legalName}. All rights reserved.</span>
            <span className="hidden md:inline text-white/40">&middot;</span>
            <span>{LICENSE_INFO.licensedDescription}</span>
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

function FooterColumn({
  title,
  links,
}: {
  title: string;
  links: { label: string; href: string }[];
}) {
  return (
    <div>
      <h4 className="mb-4 text-xs font-semibold uppercase tracking-[0.15em] text-white">
        {title}
      </h4>
      <ul className="flex flex-col gap-2.5">
        {links.map((link) => (
          <li key={link.href}>
            <Link
              href={link.href}
              className="text-sm text-white/80 transition-colors hover:text-cyan"
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
