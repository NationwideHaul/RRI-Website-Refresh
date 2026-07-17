import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { OrganizationSchema } from "@/components/schema/organization";
import { IntercomWidget } from "@/components/intercom-widget";
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
    images: [SITE.logoPath],
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE.name}, Commercial Trucking Insurance Specialist`,
    description: SITE.description,
    images: [SITE.logoPath],
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
        <OrganizationSchema />
        {children}
        <IntercomWidget />
      </body>
    </html>
  );
}
