"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { readLeadMeta } from "@/lib/lead-meta";

/**
 * Self-contained renewal-review lead form for the paid landing page.
 *
 * Built with native inputs and native <select> elements on purpose: native
 * pickers are the most reliable one-thumb experience on mobile and add no
 * component/runtime weight (no shadcn/@base-ui, no animation libraries). It
 * posts to the shared /api/lead route with formId "renewal-review", which
 * stores the lead in Supabase, emails the desk, and pushes to the CRM.
 */

type Status = "idle" | "loading" | "error";

const STATES = [
  "Alabama", "Alaska", "Arizona", "Arkansas", "California", "Colorado",
  "Connecticut", "Delaware", "Florida", "Georgia", "Hawaii", "Idaho",
  "Illinois", "Indiana", "Iowa", "Kansas", "Kentucky", "Louisiana", "Maine",
  "Maryland", "Massachusetts", "Michigan", "Minnesota", "Mississippi",
  "Missouri", "Montana", "Nebraska", "Nevada", "New Hampshire", "New Jersey",
  "New Mexico", "New York", "North Carolina", "North Dakota", "Ohio",
  "Oklahoma", "Oregon", "Pennsylvania", "Rhode Island", "South Carolina",
  "South Dakota", "Tennessee", "Texas", "Utah", "Vermont", "Virginia",
  "Washington", "West Virginia", "Wisconsin", "Wyoming",
];

const POWER_UNITS = ["1", "2 to 5", "6 to 15", "16 to 50", "More than 50"];

const RUN_LENGTHS = [
  "Within 200 miles",
  "200 to 500 miles",
  "Over 500 miles",
  "Mixed",
];

const RENEWAL_TIMING = [
  "Within 30 days",
  "1 to 3 months",
  "More than 6 months",
  "Not sure",
  "I want to switch",
];

type FormState = {
  company: string;
  name: string;
  email: string;
  phone: string;
  state: string;
  units: string;
  runs: string;
  renews: string;
  hp: string; // honeypot (_hp)
};

const INITIAL: FormState = {
  company: "",
  name: "",
  email: "",
  phone: "",
  state: "",
  units: "",
  runs: "",
  renews: "",
  hp: "",
};

function isValidEmail(value: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

function isValidPhone(value: string): boolean {
  return value.replace(/\D/g, "").length >= 10;
}

/** Format keystrokes into a US phone: (305) 555-0100. */
function formatPhone(value: string): string {
  const digits = value.replace(/\D/g, "").slice(0, 10);
  const len = digits.length;
  if (len === 0) return "";
  if (len < 4) return `(${digits}`;
  if (len < 7) return `(${digits.slice(0, 3)}) ${digits.slice(3)}`;
  return `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6)}`;
}

const FIELD =
  "h-12 w-full rounded-lg border-[1.5px] border-gray-300 bg-white px-4 text-[16px] text-ink placeholder:text-gray-500 transition-colors focus:border-primary focus:outline-none focus:ring-2 focus:ring-cyan/60 disabled:opacity-60";

// Native <select> with a custom chevron. text-[16px] keeps iOS from zooming.
const SELECT =
  FIELD +
  " appearance-none bg-[length:18px] bg-[right_0.9rem_center] bg-no-repeat pr-11 " +
  "bg-[url('data:image/svg+xml;utf8,<svg xmlns=%22http://www.w3.org/2000/svg%22 fill=%22none%22 viewBox=%220 0 24 24%22 stroke=%22%23425466%22 stroke-width=%222%22><path stroke-linecap=%22round%22 stroke-linejoin=%22round%22 d=%22M6 9l6 6 6-6%22/></svg>')]";

// Glass treatment (matches the home hero form): frosted dark card, white
// labels, white fields for readability, cyan focus ring.
const LABEL = "mb-1.5 block text-[14px] font-medium text-white";
const ERR = "mt-1 text-[13px] text-red-300";

export function RenewalForm() {
  const router = useRouter();
  const [form, setForm] = useState<FormState>(INITIAL);
  const [errors, setErrors] = useState<Partial<Record<keyof FormState, string>>>(
    {},
  );
  const [status, setStatus] = useState<Status>("idle");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  function update<K extends keyof FormState>(key: K, value: FormState[K]) {
    setForm((prev) => ({ ...prev, [key]: value }));
    if (errors[key]) setErrors((prev) => ({ ...prev, [key]: undefined }));
  }

  function validate(): boolean {
    const next: Partial<Record<keyof FormState, string>> = {};
    if (!form.company.trim()) next.company = "Required.";
    if (!form.name.trim()) next.name = "Required.";
    if (!form.email.trim()) next.email = "Required.";
    else if (!isValidEmail(form.email)) next.email = "Double-check the email.";
    if (!form.phone.trim()) next.phone = "Required.";
    else if (!isValidPhone(form.phone)) next.phone = "Phone looks incomplete.";
    if (!form.state) next.state = "Required.";
    if (!form.units) next.units = "Required.";
    if (!form.runs) next.runs = "Required.";
    if (!form.renews) next.renews = "Required.";
    setErrors(next);
    return Object.keys(next).length === 0;
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (status === "loading") return;
    if (!validate()) return;

    setStatus("loading");
    setErrorMessage(null);

    try {
      const meta = readLeadMeta();
      const res = await fetch("/api/lead/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          formId: "renewal-review",
          name: form.name.trim(),
          email: form.email,
          phone: form.phone,
          company: form.company,
          fields: {
            state: form.state,
            powerUnits: form.units,
            runLength: form.runs,
            policyRenews: form.renews,
          },
          utm: meta.utm,
          pageUrl: meta.pageUrl,
          _hp: form.hp,
        }),
      });
      const data = (await res.json()) as { ok: boolean; error?: string };

      if (!res.ok || !data.ok) {
        setStatus("error");
        setErrorMessage(
          data.error ??
            "Something went wrong sending that. Please try again in a moment.",
        );
        return;
      }

      if (typeof window !== "undefined") {
        const w = window as unknown as {
          dataLayer?: Record<string, unknown>[];
          fbq?: (...args: unknown[]) => void;
        };
        (w.dataLayer = w.dataLayer || []).push({
          event: "renewal_review_submit",
          form_id: "renewal-review",
        });
        // Meta Pixel standard Lead event — fired once here, only on a successful
        // submission and before the redirect. Validation failures and errors
        // return earlier, so Lead never fires for them, on page load, or on the
        // thank-you page.
        w.fbq?.("track", "Lead");
      }

      router.push("/renewal-review/thank-you/");
    } catch {
      setStatus("error");
      setErrorMessage(
        "Something went wrong sending that. Please try again in a moment.",
      );
    }
  }

  const isLoading = status === "loading";

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className="flex flex-col gap-4 rounded-3xl border border-white/20 bg-primary-dark/35 p-6 shadow-2xl ring-1 ring-inset ring-white/10 backdrop-blur-2xl backdrop-saturate-150 lg:p-7"
    >
      <div className="flex flex-col items-center gap-1 text-center">
        <h2 className="text-[22px] font-semibold leading-tight text-white sm:text-[24px]">
          Request your renewal review
        </h2>
        <p className="text-[13px] text-white/70">
          A licensed specialist will follow up within one business day.
        </p>
      </div>

      {status === "error" && errorMessage && (
        <div
          role="alert"
          className="rounded-lg border border-red-300/40 bg-red-500/15 px-4 py-3 text-[14px] text-red-100"
        >
          {errorMessage} Or call us at{" "}
          <a href="tel:+19549534845" className="font-semibold underline">
            (954) 953-4845
          </a>
          .
        </div>
      )}

      {/* Honeypot. Off-screen, opted out of every autofiller. Bots fill it;
          the API silently drops any submission where it is non-empty. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-[-9999px] top-[-9999px] h-0 w-0 overflow-hidden opacity-0"
      >
        <label>
          Leave this field empty
          <input
            type="text"
            name="_hp"
            tabIndex={-1}
            autoComplete="off"
            data-1p-ignore="true"
            data-lpignore="true"
            data-bwignore="true"
            data-form-type="other"
            value={form.hp}
            onChange={(e) => update("hp", e.target.value)}
          />
        </label>
      </div>

      <div>
        <label htmlFor="rr-company" className={LABEL}>
          Company name <span className="text-destructive">*</span>
        </label>
        <input
          id="rr-company"
          type="text"
          autoComplete="organization"
          placeholder="Fleet LLC"
          className={FIELD}
          value={form.company}
          onChange={(e) => update("company", e.target.value)}
          disabled={isLoading}
          aria-invalid={!!errors.company}
        />
        {errors.company && <p className={ERR}>{errors.company}</p>}
      </div>

      <div>
        <label htmlFor="rr-name" className={LABEL}>
          Your name <span className="text-destructive">*</span>
        </label>
        <input
          id="rr-name"
          type="text"
          autoComplete="name"
          placeholder="Jane Doe"
          className={FIELD}
          value={form.name}
          onChange={(e) => update("name", e.target.value)}
          disabled={isLoading}
          aria-invalid={!!errors.name}
        />
        {errors.name && <p className={ERR}>{errors.name}</p>}
      </div>

      <div>
        <label htmlFor="rr-email" className={LABEL}>
          Email <span className="text-destructive">*</span>
        </label>
        <input
          id="rr-email"
          type="email"
          inputMode="email"
          autoComplete="email"
          placeholder="jane@fleet.com"
          className={FIELD}
          value={form.email}
          onChange={(e) => update("email", e.target.value)}
          disabled={isLoading}
          aria-invalid={!!errors.email}
        />
        {errors.email && <p className={ERR}>{errors.email}</p>}
      </div>

      <div>
        <label htmlFor="rr-phone" className={LABEL}>
          Phone <span className="text-destructive">*</span>
        </label>
        <input
          id="rr-phone"
          type="tel"
          inputMode="tel"
          autoComplete="tel"
          placeholder="(305) 555-0100"
          className={FIELD}
          value={form.phone}
          onChange={(e) => update("phone", formatPhone(e.target.value))}
          disabled={isLoading}
          aria-invalid={!!errors.phone}
        />
        {errors.phone && <p className={ERR}>{errors.phone}</p>}
      </div>

      <div>
        <label htmlFor="rr-state" className={LABEL}>
          State of operation <span className="text-destructive">*</span>
        </label>
        <select
          id="rr-state"
          className={SELECT}
          value={form.state}
          onChange={(e) => update("state", e.target.value)}
          disabled={isLoading}
          aria-invalid={!!errors.state}
        >
          <option value="" disabled>
            Select a state
          </option>
          {STATES.map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>
        {errors.state && <p className={ERR}>{errors.state}</p>}
      </div>

      <div>
        <label htmlFor="rr-units" className={LABEL}>
          Number of power units <span className="text-destructive">*</span>
        </label>
        <select
          id="rr-units"
          className={SELECT}
          value={form.units}
          onChange={(e) => update("units", e.target.value)}
          disabled={isLoading}
          aria-invalid={!!errors.units}
        >
          <option value="" disabled>
            Select
          </option>
          {POWER_UNITS.map((u) => (
            <option key={u} value={u}>
              {u}
            </option>
          ))}
        </select>
        {errors.units && <p className={ERR}>{errors.units}</p>}
      </div>

      <div>
        <label htmlFor="rr-runs" className={LABEL}>
          Most of our runs are <span className="text-destructive">*</span>
        </label>
        <select
          id="rr-runs"
          className={SELECT}
          value={form.runs}
          onChange={(e) => update("runs", e.target.value)}
          disabled={isLoading}
          aria-invalid={!!errors.runs}
        >
          <option value="" disabled>
            Select
          </option>
          {RUN_LENGTHS.map((r) => (
            <option key={r} value={r}>
              {r}
            </option>
          ))}
        </select>
        {errors.runs && <p className={ERR}>{errors.runs}</p>}
      </div>

      <div>
        <label htmlFor="rr-renews" className={LABEL}>
          Current policy renews <span className="text-destructive">*</span>
        </label>
        <select
          id="rr-renews"
          className={SELECT}
          value={form.renews}
          onChange={(e) => update("renews", e.target.value)}
          disabled={isLoading}
          aria-invalid={!!errors.renews}
        >
          <option value="" disabled>
            Select
          </option>
          {RENEWAL_TIMING.map((t) => (
            <option key={t} value={t}>
              {t}
            </option>
          ))}
        </select>
        {errors.renews && <p className={ERR}>{errors.renews}</p>}
      </div>

      <button
        type="submit"
        disabled={isLoading}
        className="btn btn-cyan mt-2 w-full text-[16px] hover:bg-white disabled:cursor-not-allowed disabled:opacity-80"
      >
        {isLoading ? "Sending..." : "Request my renewal review"}
      </button>

      <p className="text-center text-[12.5px] leading-[1.5] text-white/70">
        By submitting, you agree to be contacted by a licensed specialist about
        your renewal review. We do not sell your information.
      </p>
    </form>
  );
}
