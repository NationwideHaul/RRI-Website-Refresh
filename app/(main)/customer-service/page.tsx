import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  ArrowUpRight,
  CreditCard,
  Download,
  FileCheck,
  FileText,
  LogIn,
  Phone,
  ShieldCheck,
  UserCog,
} from "lucide-react";
import { Hero } from "@/components/blocks/hero";
import { Reveal } from "@/components/blocks/reveal";
import { SectionHeading } from "@/components/blocks/section-heading";
import { YouTubeLite } from "@/components/blocks/youtube-lite";
import { BreadcrumbListSchema } from "@/components/schema/breadcrumb-list";
import { NAP, PORTAL } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Client Portal",
  description:
    "Log in to your Road Ready client portal to view policies, issue certificates of insurance, update your info, download documents, and make payments, all in one place.",
  alternates: { canonical: "/customer-service/" },
};

const CAN_DO = [
  { icon: FileText, title: "View your policies", body: "See every active policy, coverage, and limit in one dashboard." },
  { icon: FileCheck, title: "Issue a Certificate of Insurance", body: "Generate and send a COI instantly, no waiting on anyone." },
  { icon: UserCog, title: "Update your information", body: "Change contact details, addresses, and account info yourself." },
  { icon: Download, title: "Download documents", body: "Pull policy documents, ID cards, and records any time." },
  { icon: CreditCard, title: "Make a payment", body: "Handle your policy payments quickly and securely." },
  { icon: ShieldCheck, title: "…and more", body: "Manage your whole account from one secure place, 24/7." },
];

const QUICK_ACTIONS = [
  { title: "Request a COI", body: "Need us to issue it? Send a request and we'll handle it.", href: "/get-a-coi/" },
  { title: "Change your policy", body: "Add or remove a unit or driver, or update your account.", href: "/policy-change/" },
  { title: "Make a payment", body: "Pay a policy premium or ask us about billing.", href: PORTAL.paymentsUrl },
  { title: "Report a claim", body: "Send your claim details and we'll guide the rest.", href: "/report-a-claim/" },
];

const hasRealPhone = !NAP.phone.startsWith("PLACEHOLDER_");

export default function ClientPortalPage() {
  return (
    <>
      <BreadcrumbListSchema
        items={[
          { name: "Home", href: "/" },
          { name: "Client Portal", href: "/customer-service/" },
        ]}
      />

      <Hero
        eyebrow="Client portal"
        headline="Your policies, documents,"
        headlineMuted="and COIs, all in one place."
        subhead="Road Ready clients manage everything from the portal: view policies, issue certificates, update your info, download documents, and pay, any time, without calling anyone."
        primaryCTA={{ text: "Log in to your portal", href: "#login" }}
        secondaryCTA={{ text: "How it works", href: "#how-to" }}
        image={{ src: "/images/photos/your-agent.webp", alt: "A fleet operator managing their account online" }}
      />

      {/* ---------- Login: the focal point ---------- */}
      <section id="login" aria-labelledby="login-heading" className="scroll-mt-28 bg-background">
        <div className="mx-auto max-w-7xl px-6 py-16 lg:px-8 lg:py-20">
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
            {/* NowCerts, primary */}
            <Reveal className="lg:col-span-2">
              <div className="flex h-full flex-col justify-between gap-6 rounded-3xl border border-primary/15 bg-white p-8 shadow-[0_16px_40px_-20px_rgba(10,37,64,0.25)] lg:p-10">
                <div className="flex flex-col gap-4">
                  <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-primary">
                    <LogIn className="h-6 w-6 text-white" strokeWidth={1.75} />
                  </span>
                  <h2 id="login-heading" className="text-[26px] type-h2 text-ink sm:text-[30px]">
                    Road Ready client portal
                  </h2>
                  <p className="max-w-lg text-[16px] leading-[1.6] text-gray-700">
                    Your account home base. Log in to view policies, issue certificates,
                    update your information, download documents, and more, instantly.
                  </p>
                </div>
                <div className="flex flex-col gap-3">
                  <a
                    href={PORTAL.nowcertsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-primary w-fit"
                  >
                    Log in to your portal
                    <ArrowUpRight className="h-4 w-4" strokeWidth={2} />
                  </a>
                  <p className="text-[13px] text-gray-500">Secure login powered by NowCerts.</p>
                </div>
              </div>
            </Reveal>

            {/* Progressive, secondary */}
            <Reveal delay={100}>
              <div className="flex h-full flex-col justify-between gap-6 rounded-3xl border border-gray-200 bg-white p-8">
                <div className="flex flex-col gap-4">
                  <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-primary-soft">
                    <ShieldCheck className="h-6 w-6 text-primary" strokeWidth={1.75} />
                  </span>
                  <h3 className="text-[20px] type-h3 text-ink">Insured with Progressive?</h3>
                  <p className="text-[15px] leading-[1.6] text-gray-700">
                    Manage your Progressive Commercial policy directly through their portal.
                  </p>
                </div>
                <a
                  href={PORTAL.progressiveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex w-fit items-center gap-1.5 text-[15px] font-semibold text-primary transition-colors hover:text-primary-dark"
                >
                  Progressive login
                  <ArrowUpRight className="h-4 w-4" strokeWidth={2} />
                </a>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ---------- What you can do in the portal ---------- */}
      <section aria-labelledby="can-do-heading" className="bg-gray-50">
        <div className="mx-auto flex max-w-7xl flex-col gap-12 px-6 py-16 lg:px-8 lg:py-20">
          <Reveal>
            <SectionHeading
              eyebrow="Self-service"
              headline="Everything you can do"
              headlineMuted="from the portal."
              align="center"
            />
          </Reveal>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {CAN_DO.map((item, i) => {
              const Icon = item.icon;
              return (
                <Reveal key={item.title} delay={(i % 3) * 80} className="h-full">
                  <div className="flex h-full flex-col gap-4 rounded-2xl border border-gray-100 bg-white p-7 shadow-sm">
                    <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-primary-soft">
                      <Icon className="h-6 w-6 text-primary" strokeWidth={1.5} />
                    </span>
                    <h3 className="text-[18px] font-semibold text-foreground">{item.title}</h3>
                    <p className="text-[15px] leading-[1.6] text-gray-700">{item.body}</p>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* ---------- How to use the portal (videos) ---------- */}
      <section id="how-to" aria-labelledby="how-to-heading" className="scroll-mt-28 bg-background">
        <div className="mx-auto flex max-w-5xl flex-col gap-10 px-6 py-16 lg:px-8 lg:py-20">
          <Reveal>
            <SectionHeading
              eyebrow="How to use it"
              headline="A quick walkthrough,"
              headlineMuted="in your language."
              align="center"
            />
          </Reveal>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
            <Reveal>
              <YouTubeLite
                videoId={PORTAL.howToVideos.en}
                title="How to use the client portal"
                label="English"
              />
            </Reveal>
            <Reveal delay={100}>
              <YouTubeLite
                videoId={PORTAL.howToVideos.es}
                title="Cómo usar el portal de clientes"
                label="Español"
              />
            </Reveal>
          </div>
        </div>
      </section>

      {/* ---------- Prefer we handle it? ---------- */}
      <section aria-labelledby="handle-heading" className="bg-gray-50">
        <div className="mx-auto flex max-w-7xl flex-col gap-10 px-6 py-16 lg:px-8 lg:py-20">
          <Reveal>
            <SectionHeading
              eyebrow="Rather we handle it?"
              headline="Send it to us"
              headlineMuted="and we'll take care of it."
            />
          </Reveal>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {QUICK_ACTIONS.map((item, i) => (
              <Reveal key={item.title} delay={(i % 4) * 70} className="h-full">
                <Link
                  href={item.href}
                  className="group flex h-full flex-col gap-3 rounded-2xl border border-gray-100 bg-white p-6 shadow-sm transition-all duration-150 hover:-translate-y-0.5 hover:border-gray-300 hover:shadow-md"
                >
                  <h3 className="text-[17px] font-semibold text-foreground">{item.title}</h3>
                  <p className="flex-1 text-[14px] leading-[1.55] text-gray-700">{item.body}</p>
                  <span className="inline-flex items-center gap-1.5 text-[14px] font-semibold text-primary group-hover:text-primary-dark">
                    Start
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" strokeWidth={1.75} />
                  </span>
                </Link>
              </Reveal>
            ))}
          </div>

          {hasRealPhone && (
            <Reveal>
              <div className="flex flex-col items-start justify-between gap-4 rounded-2xl border border-gray-200 bg-background p-6 sm:flex-row sm:items-center">
                <div>
                  <p className="text-[15px] font-semibold text-foreground">Prefer to talk to someone?</p>
                  <p className="text-[14px] text-gray-600">
                    Your named agent is a call or email away, {NAP.hours}.
                  </p>
                </div>
                <div className="flex flex-wrap gap-3">
                  <a href={`tel:${NAP.phone}`} className="btn btn-primary">
                    <Phone className="h-4 w-4" strokeWidth={2} />
                    {NAP.phoneDisplay}
                  </a>
                  <a href={`mailto:${NAP.email}`} className="btn btn-outline">
                    {NAP.email}
                  </a>
                </div>
              </div>
            </Reveal>
          )}
        </div>
      </section>
    </>
  );
}
