import type { Metadata } from "next";
import { LegalLayout, type LegalSection } from "@/components/blocks/legal-layout";
import { BreadcrumbListSchema } from "@/components/schema/breadcrumb-list";
import { NAP } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "How Road Ready Insurance Agency collects, uses, and protects the information you share with us.",
  alternates: { canonical: "/privacy-policy/" },
};

const SECTIONS: LegalSection[] = [
  {
    heading: "Information we collect",
    body: [
      "We collect information you provide directly when you request a quote, submit a form, report a claim, or otherwise contact us. This may include your name, company, email address, phone number, USDOT number, policy details, and any information you include in your message.",
      "We also automatically collect limited technical information when you visit our website, such as your IP address, browser type, pages viewed, and referring site, through cookies and similar technologies.",
    ],
  },
  {
    heading: "How we use your information",
    body: ["We use the information we collect to:"],
    bullets: [
      "Respond to your inquiries and prepare insurance quotes",
      "Place, service, and renew your insurance coverage with carriers",
      "Handle claims and provide customer support",
      "Communicate with you about your account, policies, and relevant updates",
      "Improve our website and understand how it is used",
      "Comply with legal, regulatory, and underwriting requirements",
    ],
  },
  {
    heading: "How we share your information",
    body: [
      "To place and service your coverage, we share your information with insurance carriers, wholesalers, and other parties necessary to obtain quotes and bind coverage. We may also share information with service providers who support our operations, and when required by law or to protect our legal rights.",
      "We do not sell your personal information.",
    ],
  },
  {
    heading: "Communications and consent",
    body: [
      "By submitting a form on our website, you consent to be contacted by Road Ready Insurance by phone, email, or text regarding your inquiry and our services. Message and data rates may apply. You can opt out of marketing communications at any time by following the unsubscribe instructions in our emails or by contacting us directly.",
    ],
  },
  {
    heading: "Data security",
    body: [
      "We maintain reasonable administrative, technical, and physical safeguards designed to protect the information we hold. No method of transmission or storage is completely secure, however, and we cannot guarantee absolute security.",
    ],
  },
  {
    heading: "Your choices",
    body: [
      "You may request access to, correction of, or deletion of the personal information we hold about you, subject to legal and regulatory obligations. To make a request, contact us using the details below. You can also control cookies through your browser settings.",
    ],
  },
  {
    heading: "Third-party links",
    body: [
      "Our website may link to third-party sites, including our client portal and carrier resources. We are not responsible for the privacy practices of those sites, and we encourage you to review their policies.",
    ],
  },
  {
    heading: "Changes to this policy",
    body: [
      "We may update this Privacy Policy from time to time. Changes will be posted on this page with an updated effective date.",
    ],
  },
  {
    heading: "Contact us",
    body: [
      `If you have questions about this Privacy Policy or how we handle your information, contact ${NAP.legalName} at ${NAP.email} or ${NAP.phoneDisplay}. Our office is located at ${NAP.address.street}, ${NAP.address.city}, ${NAP.address.state} ${NAP.address.zip}.`,
    ],
  },
];

export default function PrivacyPolicyPage() {
  return (
    <>
      <BreadcrumbListSchema
        items={[
          { name: "Home", href: "/" },
          { name: "Privacy Policy", href: "/privacy-policy/" },
        ]}
      />
      <LegalLayout
        title="Privacy Policy"
        lastUpdated="July 16, 2026"
        intro={`${NAP.legalName} ("Road Ready Insurance," "we," "us," or "our") respects your privacy. This policy explains what information we collect, how we use it, and the choices you have. It applies to our website and the services we provide.`}
        sections={SECTIONS}
      />
    </>
  );
}
