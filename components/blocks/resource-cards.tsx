import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Reveal } from "@/components/blocks/reveal";

/**
 * Stripe-promo-style resource cards: bold lead-in sentence, arrow link,
 * abstract diagonal gradient art on the right, rebuilt in Road Ready Insurance brand blues
 * and cyan.
 */
const CARDS = [
  {
    key: "startup-guide",
    lead: "Startup Guide.",
    body: "Everything you need to launch your authority and get road ready, from first filings to your first policy.",
    linkText: "Read the guide",
    href: "/how-to-start-a-trucking-company/",
    art: "startup" as const,
  },
  {
    key: "get-a-coi",
    lead: "Get a COI.",
    body: "Request a certificate of insurance and have it in your inbox the same business day.",
    linkText: "Request your certificate",
    href: "/get-a-coi/",
    art: "coi" as const,
  },
];

export function ResourceCards() {
  return (
    <section aria-label="Client resources" className="bg-gray-50">
      <div className="relative z-10 mx-auto grid max-w-7xl grid-cols-1 gap-6 px-6 pb-16 pt-0 md:grid-cols-2 lg:px-8">
        {CARDS.map((card, i) => (
          <Reveal key={card.key} delay={i * 120}>
            <Link
              href={card.href}
              className="group flex h-full items-stretch justify-between gap-4 overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-gray-200 transition-shadow hover:shadow-lg"
            >
              <div className="flex flex-col justify-center gap-3 py-8 pl-8 pr-2 sm:py-10 sm:pl-10">
                <p className="text-[16px] leading-[1.55] text-gray-700">
                  <strong className="font-semibold text-foreground">
                    {card.lead}
                  </strong>{" "}
                  {card.body}
                </p>
                <span className="inline-flex items-center gap-1.5 text-[15px] font-semibold text-primary transition-colors group-hover:text-primary-dark">
                  {card.linkText}
                  <ArrowRight
                    className="h-4 w-4 transition-transform group-hover:translate-x-1"
                    strokeWidth={1.75}
                  />
                </span>
              </div>
              <CardArt variant={card.art} />
            </Link>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

/** Abstract diagonal-gradient art panel, Stripe-promo style, brand palette. */
function CardArt({ variant }: { variant: "startup" | "coi" }) {
  const isStartup = variant === "startup";
  return (
    <div
      aria-hidden="true"
      className="relative w-[150px] shrink-0 overflow-hidden sm:w-[190px]"
    >
      <svg
        viewBox="0 0 190 220"
        preserveAspectRatio="xMidYMid slice"
        className="absolute inset-0 h-full w-full transition-transform duration-500 group-hover:scale-105"
      >
        <defs>
          <linearGradient
            id={`rri-art-${variant}-a`}
            x1="0"
            y1="0"
            x2="1"
            y2="1"
          >
            <stop offset="0%" stopColor={isStartup ? "#225296" : "#0f1e3d"} />
            <stop offset="100%" stopColor={isStartup ? "#0f1e3d" : "#225296"} />
          </linearGradient>
          <linearGradient
            id={`rri-art-${variant}-b`}
            x1="0"
            y1="1"
            x2="1"
            y2="0"
          >
            <stop offset="0%" stopColor="#00fffc" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#5ea2ef" stopOpacity="0.9" />
          </linearGradient>
        </defs>
        {isStartup ? (
          <>
            <path d="M60 0 L190 0 L190 220 L0 220 Z" fill={`url(#rri-art-${variant}-a)`} />
            <path d="M120 0 L190 0 L190 130 Z" fill={`url(#rri-art-${variant}-b)`} />
            <path d="M0 220 L90 220 L30 120 Z" fill="#5ea2ef" opacity="0.85" />
          </>
        ) : (
          <>
            <path d="M40 0 L190 0 L190 220 L0 220 Z" fill={`url(#rri-art-${variant}-a)`} />
            <circle cx="150" cy="60" r="70" fill={`url(#rri-art-${variant}-b)`} opacity="0.9" />
            <path d="M0 220 L190 220 L190 170 L40 130 Z" fill="#5ea2ef" opacity="0.8" />
          </>
        )}
      </svg>
    </div>
  );
}
