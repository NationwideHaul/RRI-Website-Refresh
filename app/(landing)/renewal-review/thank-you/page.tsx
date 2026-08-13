import type { Metadata } from "next";
import Image from "next/image";

/**
 * Post-submit confirmation for the /renewal-review landing page. Same isolated
 * shell (no site nav), noindex, and only the legal footer links out.
 */

export const metadata: Metadata = {
  title: "Thank You",
  robots: {
    index: false,
    follow: false,
    googleBot: { index: false, follow: false },
  },
};

export default function RenewalReviewThankYouPage() {
  return (
    <main className="flex min-h-screen flex-col bg-background text-ink">
      <section className="flex flex-1 items-center justify-center px-5 py-16">
        <div className="mx-auto flex max-w-md flex-col items-center text-center">
          <span className="flex h-16 w-16 items-center justify-center rounded-full bg-primary-soft">
            <svg
              aria-hidden="true"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              className="h-8 w-8 text-primary"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m5 13 4 4L19 7"
              />
            </svg>
          </span>

          <h1 className="type-h2 mt-6 text-[28px] sm:text-[34px]">
            Your request is in
          </h1>

          <p className="mt-4 text-[16px] leading-[1.6] text-slate sm:text-[17px]">
            Thank you. A licensed specialist will review your operation and
            follow up within one business day. If you would like to talk sooner,
            give us a call.
          </p>

          <a
            href="tel:+19549534845"
            className="btn btn-primary mt-8 w-full text-[16px] sm:w-fit sm:px-8"
          >
            Call (954) 953-4845
          </a>
        </div>
      </section>

      {/* ---------- LEGAL FOOTER (only outbound links) ---------- */}
      <footer className="border-t border-gray-100 bg-white">
        <div className="mx-auto flex max-w-xl flex-col items-center gap-3 px-5 py-8 text-center text-[13px] text-slate sm:max-w-2xl lg:max-w-3xl">
          <Image
            src="/images/rr-secondary-logo.webp"
            alt="Road Ready Insurance"
            width={500}
            height={135}
            loading="lazy"
            sizes="150px"
            className="h-8 w-auto"
          />
          <p>
            &copy; {new Date().getFullYear()} Road Ready Insurance. Commercial
            trucking insurance specialist.
          </p>
          <div className="flex items-center gap-4">
            <a
              href="tel:+19549534845"
              className="font-semibold text-primary hover:underline"
            >
              (954) 953-4845
            </a>
            <span aria-hidden="true" className="text-gray-300">
              |
            </span>
            <a
              href="/privacy-policy/"
              className="font-semibold text-primary hover:underline"
            >
              Privacy Policy
            </a>
          </div>
        </div>
      </footer>
    </main>
  );
}
