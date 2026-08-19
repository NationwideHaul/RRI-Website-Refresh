import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { AnalyticsGTM } from "@/components/analytics-gtm";
import { MetaPixel } from "@/components/meta-pixel";
import "./globals.css";
import { OrganizationSchema } from "@/components/schema/organization";
import { IntercomWidget } from "@/components/intercom-widget";
import { CookieConsent } from "@/components/blocks/cookie-consent";
import { SITE } from "@/lib/constants";

// Site-wide typeface per Adriana (Jul 2026): Inter everywhere.
// (Circular Std was tried and rejected, the .ttf still lives in app/fonts.)
const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-sans",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: `${SITE.name}, Commercial Trucking Insurance Specialist`,
    template: `%s | ${SITE.name}`,
  },
  description: SITE.description,
  applicationName: SITE.name,
  openGraph: {
    type: "website",
    siteName: SITE.name,
    title: `${SITE.name}, Commercial Trucking Insurance Specialist`,
    description: SITE.description,
    url: SITE.url,
    images: ["/images/og-default.png"],
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE.name}, Commercial Trucking Insurance Specialist`,
    description: SITE.description,
    images: ["/images/og-default.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
  // Favicon is auto-detected from app/icon.png (Next App Router).
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="font-sans antialiased">
        {/*
          Canonical-host guard. The apex (roadreadyinsurance.com) 308-redirects
          to www at the server, but a page CACHED on the apex origin (e.g. held
          open across the DNS cutover) posts its form to /api/lead/ on the apex,
          which then redirects cross-origin to www — and the browser kills that
          POST with a CORS error ("Failed to fetch"), so the lead never sends.
          This runs synchronously before any form can be submitted and bounces a
          bare-apex page to www so every form POST stays same-origin. Scoped to
          the exact apex host only — never touches www, *.vercel.app, or local.
        */}
        <script
          dangerouslySetInnerHTML={{
            __html:
              "(function(){if(location.hostname==='roadreadyinsurance.com'){location.replace('https://www.roadreadyinsurance.com'+location.pathname+location.search+location.hash);}})();",
          }}
        />
        <AnalyticsGTM />
        <MetaPixel />
        <OrganizationSchema />
        {children}
        <CookieConsent />
        <IntercomWidget />
      </body>
    </html>
  );
}
