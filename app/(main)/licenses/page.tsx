import type { Metadata } from "next";
import { Reveal } from "@/components/blocks/reveal";
import { BreadcrumbListSchema } from "@/components/schema/breadcrumb-list";
import { NAP, STATE_LICENSES, LICENSE_NOTES } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Licenses",
  description:
    "State insurance agency licenses held by Complete Carrier Coverage LLC d/b/a Road Ready Insurance, listed by state with license type and number.",
  alternates: { canonical: "/licenses/" },
};

const LAST_UPDATED = "July 27, 2026";

// Split the roster into two balanced columns for the desktop layout.
const HALF = Math.ceil(STATE_LICENSES.length / 2);
const COLUMNS = [STATE_LICENSES.slice(0, HALF), STATE_LICENSES.slice(HALF)];

function LicenseTable({ rows }: { rows: typeof STATE_LICENSES }) {
  return (
    <table className="w-full border-collapse text-left text-[14px]">
      <thead>
        <tr className="border-b border-gray-200 text-[12px] font-semibold uppercase tracking-wide text-gray-500">
          <th className="py-2.5 pr-4">State</th>
          <th className="py-2.5 pr-4">License Type</th>
          <th className="py-2.5">License #</th>
        </tr>
      </thead>
      <tbody>
        {rows.map((r) => (
          <tr key={r.state} className="border-b border-gray-100">
            <td className="py-2.5 pr-4 font-semibold text-foreground">{r.state}</td>
            <td className="py-2.5 pr-4 text-gray-600">{r.type}</td>
            <td className="py-2.5 font-medium tabular-nums text-foreground">{r.number}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default function LicensesPage() {
  return (
    <>
      <BreadcrumbListSchema
        items={[
          { name: "Home", href: "/" },
          { name: "Licenses", href: "/licenses/" },
        ]}
      />

      <section className="relative isolate overflow-hidden bg-primary-dark">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 z-0 opacity-70"
          style={{ background: "radial-gradient(50% 80% at 85% 10%, rgba(0,255,252,0.10), transparent 60%)" }}
        />
        <div className="relative z-10 mx-auto max-w-5xl px-6 py-16 lg:px-8 lg:py-20">
          <p className="text-[13px] font-semibold capitalize tracking-normal text-cyan">Legal</p>
          <h1 className="mt-3 text-[36px] type-display text-white sm:text-[48px]">State Licenses</h1>
          <p className="mt-4 text-[14px] text-white/70">Last updated: {LAST_UPDATED}</p>
        </div>
      </section>

      <section className="bg-background">
        <div className="mx-auto max-w-5xl px-6 py-16 lg:px-8 lg:py-20">
          <p className="max-w-3xl text-[17px] leading-[1.7] text-gray-700">
            {NAP.legalName} (Complete Carrier Coverage LLC d/b/a Road Ready
            Insurance) is a licensed Property &amp; Casualty insurance brokerage.
            All licenses are held in the name of Complete Carrier Coverage LLC
            d/b/a Road Ready Insurance. Our active agency licenses by state are
            listed below.
          </p>

          <Reveal>
            <div className="mt-10 grid grid-cols-1 gap-x-12 gap-y-4 lg:grid-cols-2">
              {COLUMNS.map((rows, i) => (
                <LicenseTable key={i} rows={rows} />
              ))}
            </div>
          </Reveal>

          <p className="mt-10 max-w-3xl text-[13px] leading-[1.7] text-gray-500">
            {LICENSE_NOTES}
          </p>
        </div>
      </section>
    </>
  );
}
