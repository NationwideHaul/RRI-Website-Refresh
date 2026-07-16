import type { Metadata } from "next";
import { LegalLayout, type LegalSection } from "@/components/blocks/legal-layout";
import { BreadcrumbListSchema } from "@/components/schema/breadcrumb-list";
import { NAP } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Terms & Conditions",
  description:
    "The terms that govern your use of the Road Ready Insurance Agency website and services.",
  alternates: { canonical: "/terms-conditions/" },
};

const SECTIONS: LegalSection[] = [
  {
    heading: "Acceptance of these terms",
    body: [
      "By accessing or using this website, you agree to be bound by these Terms & Conditions and our Privacy Policy. If you do not agree, please do not use the site.",
    ],
  },
  {
    heading: "About our services",
    body: [
      `${NAP.legalName} is a licensed insurance agency. Information on this website is provided for general informational purposes and does not constitute an offer of insurance, a binder, or a guarantee of coverage. Coverage is subject to the terms, conditions, and exclusions of the actual policy issued by the applicable carrier, and to carrier underwriting and approval.`,
    ],
  },
  {
    heading: "No professional advice",
    body: [
      "Content on this site is not legal, financial, tax, or professional advice. Insurance needs vary by operation. You should speak with a licensed agent before making decisions about your coverage.",
    ],
  },
  {
    heading: "Quotes and submissions",
    body: [
      "Any quote or estimate provided is not a contract and may change based on underwriting review, additional information, and carrier requirements. Coverage is not in effect until it is bound in writing by the carrier and any required premium is paid.",
      "You are responsible for providing accurate and complete information. Inaccurate or incomplete information may affect your quote, your coverage, or the handling of a claim.",
    ],
  },
  {
    heading: "Use of the website",
    body: ["When using this website, you agree not to:"],
    bullets: [
      "Use the site for any unlawful purpose or in violation of these terms",
      "Attempt to gain unauthorized access to our systems or data",
      "Interfere with the operation or security of the website",
      "Submit false, misleading, or fraudulent information",
    ],
  },
  {
    heading: "Intellectual property",
    body: [
      "The content, branding, logos, and materials on this website are owned by or licensed to Road Ready Insurance and are protected by applicable intellectual property laws. You may not reproduce or use them without our permission.",
    ],
  },
  {
    heading: "Third-party links and services",
    body: [
      "Our website may link to third-party websites and tools, including our client portal and carrier resources. We do not control and are not responsible for the content, availability, or practices of those third parties.",
    ],
  },
  {
    heading: "Limitation of liability",
    body: [
      "To the fullest extent permitted by law, Road Ready Insurance is not liable for any indirect, incidental, or consequential damages arising from your use of this website. The website is provided on an \"as is\" and \"as available\" basis without warranties of any kind.",
    ],
  },
  {
    heading: "Changes to these terms",
    body: [
      "We may update these Terms & Conditions from time to time. Continued use of the website after changes are posted constitutes acceptance of the updated terms.",
    ],
  },
  {
    heading: "Contact us",
    body: [
      `Questions about these terms can be directed to ${NAP.legalName} at ${NAP.email} or ${NAP.phoneDisplay}, ${NAP.address.street}, ${NAP.address.city}, ${NAP.address.state} ${NAP.address.zip}.`,
    ],
  },
];

export default function TermsConditionsPage() {
  return (
    <>
      <BreadcrumbListSchema
        items={[
          { name: "Home", href: "/" },
          { name: "Terms & Conditions", href: "/terms-conditions/" },
        ]}
      />
      <LegalLayout
        title="Terms & Conditions"
        lastUpdated="July 16, 2026"
        intro={`These Terms & Conditions govern your use of the ${NAP.legalName} website and services. Please read them carefully.`}
        sections={SECTIONS}
      />
    </>
  );
}
