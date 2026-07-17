"use client";

import Link from "next/link";
import { useEffect, useState, type FormEvent } from "react";
import { createPortal } from "react-dom";
import { CheckCircle2, Loader2, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { NAP, AREA_SERVED_STATES } from "@/lib/constants";
import { cn } from "@/lib/utils";

type Status = "idle" | "loading" | "success" | "error";

// ---- Quick-quote application: option sets ------------------------------
// Dropdown values are sensible defaults (Adriana to confirm/adjust).
const AUTHORITY_STATUS = ["New Authority", "Existing Authority", "Pending Cancellation"];
const YES_NO = ["Yes", "No"];
const COUNT_RANGES = ["1", "2", "3", "4-5", "6-9", "10-24", "25-49", "50+"];
const AUTO_LIABILITY = ["$750,000", "$1,000,000", "Other / Not sure"];
const CARGO_COVERAGE = ["$50,000", "$100,000", "$250,000", "Other / Not sure"];
const GENERAL_LIABILITY = ["Yes", "No", "Not sure"];
const TRUCK_TYPES = [
  "Tractor Trailer",
  "Straight Truck",
  "Pickup Truck (Hot Shotter)",
  "Cargo Van",
  "Tow Truck",
  "Dump Truck",
];
const COMMODITIES = [
  "Paper / Plastic",
  "Store Merchandise",
  "Canned Goods / Beverages",
  "Building Supplies",
  "Automobiles",
  "Machinery",
  "Dry Bulk Commodities (pneumatic tanker)",
  "Dirt / Sand / Gravel",
  "Food Grade Tankers",
  "Intermodal Containers (UIIA)",
  "Hazmat Freight",
  "Gas / Oil (Hazmat Liquid Tankers)",
  "Last Mile Delivery (furniture, appliances, etc)",
];
const HEAR_ABOUT = [
  "Google Search",
  "Referral",
  "Social Media",
  "Existing Customer",
  "Online Ad",
  "Other",
];

type AppState = {
  statusOfAuthority: string;
  knowEin: string;
  addr1: string;
  addr2: string;
  city: string;
  state: string;
  zip: string;
  numberOfTrucks: string;
  truckTypes: string[];
  truckTypeOther: string;
  autoLiability: string;
  cargoCoverage: string;
  generalLiability: string;
  commodities: string[];
  commodityOther: string;
  numberOfDrivers: string;
  ownerIsDriver: string;
  ownerFirst: string;
  ownerLast: string;
  ownerDob: string;
  ownerDl: string;
  cdl: string;
  homeSameAsBusiness: string;
  truckInfoAvailable: string;
  submittedBy: string;
  comments: string;
  hearAboutUs: string;
  smsConsent: boolean;
};

const APP_INITIAL: AppState = {
  statusOfAuthority: "",
  knowEin: "",
  addr1: "",
  addr2: "",
  city: "",
  state: "",
  zip: "",
  numberOfTrucks: "",
  truckTypes: [],
  truckTypeOther: "",
  autoLiability: "",
  cargoCoverage: "",
  generalLiability: "",
  commodities: [],
  commodityOther: "",
  numberOfDrivers: "",
  ownerIsDriver: "",
  ownerFirst: "",
  ownerLast: "",
  ownerDob: "",
  ownerDl: "",
  cdl: "",
  homeSameAsBusiness: "",
  truckInfoAvailable: "",
  submittedBy: "",
  comments: "",
  hearAboutUs: "",
  smsConsent: false,
};

type FormState = {
  fullName: string;
  company: string;
  email: string;
  phone: string;
  dot: string;
  authority: string;
  /** "yes" = has time for the full quick-quote application (opens popup). */
  quickApp: "" | "yes" | "no";
  consent: boolean;
  companyWebsite: string; // honeypot
};

const INITIAL: FormState = {
  fullName: "",
  company: "",
  email: "",
  phone: "",
  dot: "",
  authority: "",
  quickApp: "",
  consent: false,
  companyWebsite: "",
};

export type QuoteFormVariant = "light" | "glass";

function isValidEmail(value: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

function isValidPhone(value: string): boolean {
  return value.replace(/\D/g, "").length >= 10;
}

export function QuoteForm({
  variant = "light",
}: {
  /** "glass" = WhatsApp-style dark frosted card for photo backgrounds. */
  variant?: QuoteFormVariant;
} = {}) {
  const [form, setForm] = useState<FormState>(INITIAL);
  const [errors, setErrors] = useState<Partial<Record<keyof FormState, string>>>(
    {},
  );
  const [status, setStatus] = useState<Status>("idle");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [showQuickApp, setShowQuickApp] = useState(false);

  const glass = variant === "glass";

  const FIELD_CLASS = cn(
    "h-12 w-full bg-white px-4 text-[16px] text-foreground placeholder:text-gray-500 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan/60 disabled:cursor-not-allowed disabled:opacity-60",
    glass
      ? "rounded-lg border border-white/30 focus-visible:border-cyan"
      : "rounded-lg border-[1.5px] border-gray-300 focus-visible:border-primary",
  );

  const LABEL_CLASS = cn(
    "mb-2 block text-[14px] font-medium leading-tight",
    glass ? "text-white" : "text-foreground",
  );

  const ERROR_CLASS = cn(
    "mt-1 text-[13px]",
    glass ? "text-red-300" : "text-destructive",
  );

  const REQUIRED_CLASS = glass ? "text-red-300" : "text-destructive";

  function update<K extends keyof FormState>(key: K, value: FormState[K]) {
    setForm((prev) => ({ ...prev, [key]: value }));
    if (errors[key]) setErrors((prev) => ({ ...prev, [key]: undefined }));
  }

  function validate(): boolean {
    const next: Partial<Record<keyof FormState, string>> = {};
    if (!form.fullName.trim()) next.fullName = "Required.";
    if (!form.company.trim()) next.company = "Required.";
    if (!form.email.trim()) next.email = "Required.";
    else if (!isValidEmail(form.email)) next.email = "Double-check the email.";
    if (!form.phone.trim()) next.phone = "Required.";
    else if (!isValidPhone(form.phone)) next.phone = "Phone looks incomplete.";
    if (!form.dot.trim()) next.dot = "Required.";
    if (!form.authority) next.authority = "Pick one.";
    if (!form.consent) next.consent = "Please confirm to submit.";
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
      const res = await fetch("/api/quote", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
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
        const gtag = (
          window as unknown as {
            gtag?: (command: string, name: string, params: Record<string, unknown>) => void;
          }
        ).gtag;
        gtag?.("event", "quote_form_submit", {
          event_category: "lead",
          event_label: form.authority,
        });
      }

      setStatus("success");
      setForm(INITIAL);
    } catch {
      setStatus("error");
      setErrorMessage(
        "Something went wrong sending that. Please try again in a moment.",
      );
    }
  }

  if (status === "success") {
    return (
      <div
        role="status"
        className={cn(
          "flex flex-col items-center gap-4 p-8 text-center",
          glass
            ? "rounded-3xl border border-white/15 bg-primary-dark/45 shadow-2xl backdrop-blur-2xl"
            : "rounded-2xl border border-gray-100 bg-white",
        )}
      >
        <CheckCircle2 className="h-10 w-10 text-success" strokeWidth={1.5} />
        <h3 className={cn("text-[20px] font-semibold", glass ? "text-white" : "text-foreground")}>
          Got it. An agent will reach out within 2 business hours.
        </h3>
        <p className={cn("text-[15px] leading-[1.55]", glass ? "text-white/80" : "text-gray-700")}>
          If you need something sooner, call us at {NAP.phoneDisplay}.
        </p>
      </div>
    );
  }

  const isLoading = status === "loading";

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className={cn(
        "flex flex-col gap-5 p-6 lg:p-7",
        glass
          ? "rounded-3xl border border-white/15 bg-primary-dark/45 shadow-2xl backdrop-blur-2xl"
          : "rounded-2xl border border-gray-100 bg-white shadow-sm",
      )}
    >
      <div className={cn("flex flex-col gap-1", glass && "items-center text-center")}>
        <h2
          className={cn(
            "text-[22px] font-semibold leading-tight sm:text-[24px]",
            glass ? "text-white" : "text-foreground",
          )}
        >
          Speak with an Expert Today
        </h2>
        <p className={cn("text-[13px]", glass ? "text-white/70" : "text-gray-500")}>
          A licensed agent will reach out with your quote.
        </p>
      </div>

      {status === "error" && errorMessage && (
        <div
          role="alert"
          className={cn(
            "rounded-lg px-4 py-3 text-[14px]",
            glass
              ? "border border-red-300/40 bg-red-500/15 text-red-100"
              : "border border-destructive/30 bg-destructive/5 text-destructive",
          )}
        >
          {errorMessage}{" "}
          {!NAP.phone.startsWith("PLACEHOLDER_") &&
            `Or call us directly at ${NAP.phoneDisplay}.`}
        </div>
      )}

      {/* Honeypot, not visible to humans, bots will fill it. */}
      <div className="hidden" aria-hidden="true">
        <label>
          Company website
          <input
            type="text"
            tabIndex={-1}
            autoComplete="off"
            value={form.companyWebsite}
            onChange={(e) => update("companyWebsite", e.target.value)}
          />
        </label>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <Label htmlFor="qf-fullname" className={LABEL_CLASS}>
            Full Name <span className={REQUIRED_CLASS}>*</span>
          </Label>
          <Input
            id="qf-fullname"
            type="text"
            autoComplete="name"
            placeholder="Jane Doe"
            className={cn(
              FIELD_CLASS,
              errors.fullName && "border-destructive focus-visible:border-destructive",
            )}
            value={form.fullName}
            onChange={(e) => update("fullName", e.target.value)}
            disabled={isLoading}
            required
          />
          {errors.fullName && <p className={ERROR_CLASS}>{errors.fullName}</p>}
        </div>

        <div>
          <Label htmlFor="qf-company" className={LABEL_CLASS}>
            Company Name <span className={REQUIRED_CLASS}>*</span>
          </Label>
          <Input
            id="qf-company"
            type="text"
            autoComplete="organization"
            placeholder="Fleet LLC"
            className={cn(
              FIELD_CLASS,
              errors.company && "border-destructive focus-visible:border-destructive",
            )}
            value={form.company}
            onChange={(e) => update("company", e.target.value)}
            disabled={isLoading}
            required
          />
          {errors.company && <p className={ERROR_CLASS}>{errors.company}</p>}
        </div>

        <div>
          <Label htmlFor="qf-email" className={LABEL_CLASS}>
            Email <span className={REQUIRED_CLASS}>*</span>
          </Label>
          <Input
            id="qf-email"
            type="email"
            autoComplete="email"
            placeholder="jane@fleet.com"
            className={cn(
              FIELD_CLASS,
              errors.email && "border-destructive focus-visible:border-destructive",
            )}
            value={form.email}
            onChange={(e) => update("email", e.target.value)}
            disabled={isLoading}
            required
          />
          {errors.email && <p className={ERROR_CLASS}>{errors.email}</p>}
        </div>

        <div>
          <Label htmlFor="qf-phone" className={LABEL_CLASS}>
            Phone Number <span className={REQUIRED_CLASS}>*</span>
          </Label>
          <Input
            id="qf-phone"
            type="tel"
            autoComplete="tel"
            placeholder="(305) 555-0100"
            className={cn(
              FIELD_CLASS,
              errors.phone && "border-destructive focus-visible:border-destructive",
            )}
            value={form.phone}
            onChange={(e) => update("phone", e.target.value)}
            disabled={isLoading}
            required
          />
          {errors.phone && <p className={ERROR_CLASS}>{errors.phone}</p>}
        </div>

        <div>
          <Label htmlFor="qf-dot" className={LABEL_CLASS}>
            USDOT Number <span className={REQUIRED_CLASS}>*</span>
          </Label>
          <Input
            id="qf-dot"
            type="text"
            inputMode="numeric"
            placeholder="1234567"
            className={cn(
              FIELD_CLASS,
              errors.dot && "border-destructive focus-visible:border-destructive",
            )}
            value={form.dot}
            onChange={(e) => update("dot", e.target.value)}
            disabled={isLoading}
            required
          />
          {errors.dot && <p className={ERROR_CLASS}>{errors.dot}</p>}
        </div>

        <div>
          <Label htmlFor="qf-authority" className={LABEL_CLASS}>
            Authority <span className={REQUIRED_CLASS}>*</span>
          </Label>
          <Select
            value={form.authority || undefined}
            onValueChange={(v) => update("authority", v as string)}
            disabled={isLoading}
          >
            <SelectTrigger
              id="qf-authority"
              className={cn(
                FIELD_CLASS,
                "!h-12 justify-between text-left data-[placeholder]:text-gray-500",
                errors.authority &&
                  "border-destructive focus-visible:border-destructive",
              )}
            >
              <SelectValue placeholder="Select" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="new-authority">New Authority</SelectItem>
              <SelectItem value="existing-authority">Existing Authority</SelectItem>
              <SelectItem value="pending-cancellation">Pending Cancellation</SelectItem>
            </SelectContent>
          </Select>
          {errors.authority && (
            <p className={ERROR_CLASS}>{errors.authority}</p>
          )}
        </div>
      </div>

      {/* Optional deeper application, some people only want to leave
          contact info, others have time for more steps. "Yes" opens the
          quick-quote popup (question set TBD from Adriana). */}
      <div
        className={cn(
          "flex flex-wrap items-center justify-between gap-x-4 gap-y-3 rounded-lg border px-4 py-3",
          glass ? "border-white/20 bg-white/5" : "border-gray-200 bg-background",
        )}
      >
        <span
          className={cn(
            "text-[13.5px] font-medium leading-snug",
            glass ? "text-white" : "text-foreground",
          )}
        >
          Would you like to fill out a quick quote application?
        </span>
        <div className="flex gap-2" role="group" aria-label="Quick quote application">
          <button
            type="button"
            disabled={isLoading}
            onClick={() => {
              update("quickApp", "yes");
              // Contact + consent must be filled first; the popup carries them
              // along with the application, so validate before opening it.
              if (validate()) setShowQuickApp(true);
            }}
            className={cn(
              "rounded-lg px-4 py-1.5 text-[13.5px] font-semibold transition-colors",
              form.quickApp === "yes"
                ? "bg-cyan text-primary-dark"
                : glass
                  ? "border border-white/30 text-white hover:border-cyan hover:text-cyan"
                  : "border border-gray-300 text-foreground hover:border-primary hover:text-primary",
            )}
          >
            Yes
          </button>
          <button
            type="button"
            disabled={isLoading}
            onClick={() => update("quickApp", "no")}
            className={cn(
              "rounded-lg px-4 py-1.5 text-[13.5px] font-semibold transition-colors",
              form.quickApp === "no"
                ? "bg-cyan text-primary-dark"
                : glass
                  ? "border border-white/30 text-white hover:border-cyan hover:text-cyan"
                  : "border border-gray-300 text-foreground hover:border-primary hover:text-primary",
            )}
          >
            No, just contact me
          </button>
        </div>
      </div>

      {showQuickApp && (
        <QuickAppDialog
          contact={form}
          onClose={() => setShowQuickApp(false)}
          onSuccess={() => {
            setShowQuickApp(false);
            setForm(INITIAL);
            setStatus("success");
          }}
        />
      )}

      <div className="flex items-start gap-3">
        <Checkbox
          id="qf-consent"
          checked={form.consent}
          onCheckedChange={(v) => update("consent", v === true)}
          disabled={isLoading}
          aria-invalid={!!errors.consent}
          className={cn(
            "mt-0.5 shrink-0",
            glass && "border-white/50 bg-white/10 data-[state=checked]:border-cyan data-[state=checked]:bg-cyan data-[state=checked]:text-primary-dark",
          )}
        />
        <div className="flex flex-col gap-1">
          <label
            htmlFor="qf-consent"
            className={cn(
              "cursor-pointer text-[12.5px] leading-[1.5]",
              glass ? "text-white/70" : "text-gray-500",
            )}
          >
            I agree to the{" "}
            <Link
              href="/privacy-policy/"
              className={cn(
                "underline underline-offset-2",
                glass ? "text-cyan hover:text-white" : "text-primary hover:text-primary-dark",
              )}
            >
              Privacy Policy
            </Link>
            {" "}and{" "}
            <Link
              href="/terms-conditions/"
              className={cn(
                "underline underline-offset-2",
                glass ? "text-cyan hover:text-white" : "text-primary hover:text-primary-dark",
              )}
            >
              Terms of Service
            </Link>
            , and consent to receive communications from Road Ready Insurance.
          </label>
          {errors.consent && (
            <p className={cn("text-[12px]", glass ? "text-red-300" : "text-destructive")}>
              {errors.consent}
            </p>
          )}
        </div>
      </div>

      <button
        type="submit"
        disabled={isLoading}
        className={cn(
          "btn btn-primary w-full disabled:cursor-not-allowed disabled:bg-primary/80",
          glass && "hover:bg-cyan hover:text-primary-dark",
        )}
      >
        {isLoading ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" strokeWidth={2} />
            Sending...
          </>
        ) : (
          "Submit quote request"
        )}
      </button>
    </form>
  );
}

/**
 * Popup for the deeper quick-quote application. Collects the full
 * application (matching Road Ready Insurance's intake form) and submits it
 * together with the contact info already entered on the main form.
 */
function QuickAppDialog({
  contact,
  onClose,
  onSuccess,
}: {
  contact: FormState;
  onClose: () => void;
  onSuccess: () => void;
}) {
  const [app, setApp] = useState<AppState>(APP_INITIAL);
  const [errors, setErrors] = useState<Partial<Record<keyof AppState, string>>>({});
  const [status, setStatus] = useState<Status>("idle");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [onClose]);

  const isLoading = status === "loading";

  function set<K extends keyof AppState>(key: K, value: AppState[K]) {
    setApp((prev) => ({ ...prev, [key]: value }));
    if (errors[key]) setErrors((prev) => ({ ...prev, [key]: undefined }));
  }

  function toggleInArray(key: "truckTypes" | "commodities", value: string) {
    setApp((prev) => {
      const list = prev[key];
      const next = list.includes(value)
        ? list.filter((v) => v !== value)
        : [...list, value];
      return { ...prev, [key]: next };
    });
    if (errors[key]) setErrors((prev) => ({ ...prev, [key]: undefined }));
  }

  function validate(): boolean {
    const next: Partial<Record<keyof AppState, string>> = {};
    const required: (keyof AppState)[] = [
      "statusOfAuthority",
      "knowEin",
      "addr1",
      "city",
      "state",
      "zip",
      "numberOfTrucks",
      "autoLiability",
      "cargoCoverage",
      "generalLiability",
      "numberOfDrivers",
      "ownerIsDriver",
      "ownerFirst",
      "ownerLast",
      "ownerDob",
      "cdl",
      "homeSameAsBusiness",
      "truckInfoAvailable",
      "submittedBy",
    ];
    for (const key of required) {
      if (!String(app[key]).trim()) next[key] = "Required.";
    }
    if (app.truckTypes.length === 0 && !app.truckTypeOther.trim())
      next.truckTypes = "Pick at least one.";
    if (app.commodities.length === 0 && !app.commodityOther.trim())
      next.commodities = "Pick at least one.";
    if (!app.smsConsent) next.smsConsent = "Please agree to continue.";
    setErrors(next);
    return Object.keys(next).length === 0;
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (isLoading) return;
    if (!validate()) {
      // Jump to the first error so it is never off-screen in the scroll area.
      const firstError = document.querySelector<HTMLElement>("[data-qa-error='true']");
      firstError?.scrollIntoView({ behavior: "smooth", block: "center" });
      return;
    }

    setStatus("loading");
    setErrorMessage(null);
    try {
      const res = await fetch("/api/quote", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...contact,
          quickApp: "yes",
          application: {
            ...app,
            truckTypes: [
              ...app.truckTypes,
              ...(app.truckTypeOther.trim() ? [`Other: ${app.truckTypeOther.trim()}`] : []),
            ],
            commodities: [
              ...app.commodities,
              ...(app.commodityOther.trim() ? [`Other: ${app.commodityOther.trim()}`] : []),
            ],
          },
        }),
      });
      const data = (await res.json()) as { ok: boolean; error?: string };
      if (!res.ok || !data.ok) {
        setStatus("error");
        setErrorMessage(
          data.error ?? "Something went wrong sending that. Please try again in a moment.",
        );
        return;
      }
      onSuccess();
    } catch {
      setStatus("error");
      setErrorMessage("Something went wrong sending that. Please try again in a moment.");
    }
  }

  const FIELD =
    "h-12 w-full rounded-lg border-[1.5px] border-gray-300 bg-white px-4 text-[16px] text-foreground placeholder:text-gray-500 transition-colors focus-visible:border-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan/60 disabled:cursor-not-allowed disabled:opacity-60";
  const LABEL = "mb-2 block text-[14px] font-medium leading-tight text-foreground";
  const errClass = (k: keyof AppState) =>
    errors[k] ? "border-destructive focus-visible:border-destructive" : "";

  // Bind a module-level AppDropdown to this dialog's state for a given key.
  const dd = (k: keyof AppState, label: string, options: readonly string[], required = true) => (
    <AppDropdown
      id={`qa-${k}`}
      label={label}
      options={options}
      required={required}
      value={app[k] as string}
      onChange={(v) => set(k, v as AppState[typeof k])}
      error={errors[k]}
      disabled={isLoading}
    />
  );

  // Portal to <body>: the glass form card's backdrop-filter creates a
  // containing block, which would trap position:fixed inside the card.
  return createPortal(
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="quick-app-title"
      className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto p-4 py-8"
    >
      <button
        type="button"
        aria-label="Close"
        onClick={onClose}
        className="fixed inset-0 cursor-default bg-primary-dark/60 backdrop-blur-sm"
      />
      <div className="relative w-full max-w-2xl rounded-2xl bg-white shadow-2xl">
        {/* Header */}
        <div className="sticky top-0 z-10 flex items-start justify-between gap-4 rounded-t-2xl border-b border-gray-100 bg-white px-6 py-5 lg:px-8">
          <div>
            <h3 id="quick-app-title" className="text-[22px] font-semibold leading-tight text-foreground">
              Quick quote application
            </h3>
            <p className="mt-1 text-[14px] text-gray-600">
              A few more details help us place you with the right market faster.
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close dialog"
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-gray-500 transition-colors hover:bg-gray-100 hover:text-foreground"
          >
            <X className="h-5 w-5" strokeWidth={1.75} />
          </button>
        </div>

        <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-6 px-6 py-6 lg:px-8">
          {status === "error" && errorMessage && (
            <div role="alert" className="rounded-lg border border-destructive/30 bg-destructive/5 px-4 py-3 text-[14px] text-destructive">
              {errorMessage}
            </div>
          )}

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {dd("statusOfAuthority", "Status of Authority", AUTHORITY_STATUS)}
            {dd("knowEin", "Do you know the company EIN?", YES_NO)}
          </div>

          {/* Address */}
          <fieldset className="flex flex-col gap-3">
            <legend className={LABEL}>
              Address <span className="text-destructive">*</span>
            </legend>
            <Input
              placeholder="Address Line 1"
              className={cn(FIELD, errClass("addr1"))}
              data-qa-error={errors.addr1 ? "true" : undefined}
              value={app.addr1}
              onChange={(e) => set("addr1", e.target.value)}
              disabled={isLoading}
            />
            <Input
              placeholder="Address Line 2"
              className={FIELD}
              value={app.addr2}
              onChange={(e) => set("addr2", e.target.value)}
              disabled={isLoading}
            />
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
              <div>
                <Input
                  placeholder="City"
                  className={cn(FIELD, errClass("city"))}
                  data-qa-error={errors.city ? "true" : undefined}
                  value={app.city}
                  onChange={(e) => set("city", e.target.value)}
                  disabled={isLoading}
                />
                {errors.city && <p className="mt-1 text-[13px] text-destructive">{errors.city}</p>}
              </div>
              <div>
                <Select
                  value={app.state || undefined}
                  onValueChange={(v) => set("state", (v as string) ?? "")}
                  disabled={isLoading}
                >
                  <SelectTrigger
                    data-qa-error={errors.state ? "true" : undefined}
                    className={cn(FIELD, "!h-12 justify-between text-left data-[placeholder]:text-gray-500", errClass("state"))}
                  >
                    <SelectValue placeholder="State" />
                  </SelectTrigger>
                  <SelectContent>
                    {AREA_SERVED_STATES.map((s) => (
                      <SelectItem key={s} value={s}>
                        {s}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.state && <p className="mt-1 text-[13px] text-destructive">{errors.state}</p>}
              </div>
              <div>
                <Input
                  placeholder="Zip Code"
                  inputMode="numeric"
                  className={cn(FIELD, errClass("zip"))}
                  data-qa-error={errors.zip ? "true" : undefined}
                  value={app.zip}
                  onChange={(e) => set("zip", e.target.value)}
                  disabled={isLoading}
                />
                {errors.zip && <p className="mt-1 text-[13px] text-destructive">{errors.zip}</p>}
              </div>
            </div>
          </fieldset>

          {dd("numberOfTrucks", "Number of Trucks", COUNT_RANGES)}

          {/* Type of Trucks */}
          <CheckGroup
            legend="Type of Trucks (check all that apply)"
            options={TRUCK_TYPES}
            selected={app.truckTypes}
            onToggle={(v) => toggleInArray("truckTypes", v)}
            otherValue={app.truckTypeOther}
            onOther={(v) => set("truckTypeOther", v)}
            error={errors.truckTypes}
            disabled={isLoading}
          />

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {dd("autoLiability", "Auto Liability Required", AUTO_LIABILITY)}
            {dd("cargoCoverage", "Cargo Coverage Amount", CARGO_COVERAGE)}
          </div>

          {dd("generalLiability", "General Liability Required?", GENERAL_LIABILITY)}

          {/* Commodities */}
          <CheckGroup
            legend="Commodities to be Hauled (check all that apply)"
            options={COMMODITIES}
            selected={app.commodities}
            onToggle={(v) => toggleInArray("commodities", v)}
            otherValue={app.commodityOther}
            onOther={(v) => set("commodityOther", v)}
            error={errors.commodities}
            disabled={isLoading}
            columns={1}
          />

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {dd("numberOfDrivers", "Number of Drivers", COUNT_RANGES)}
            {dd("ownerIsDriver", "Is the Owner a Driver?", YES_NO)}
          </div>

          {/* Owner info */}
          <fieldset className="flex flex-col gap-4 rounded-xl border border-gray-100 bg-gray-50/70 p-5">
            <legend className="px-1 text-[13px] font-semibold text-primary">
              Owner &mdash; Name / DOB / DL Info
            </legend>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <Label className={LABEL}>
                  First name <span className="text-destructive">*</span>
                </Label>
                <Input
                  placeholder="First"
                  className={cn(FIELD, errClass("ownerFirst"))}
                  data-qa-error={errors.ownerFirst ? "true" : undefined}
                  value={app.ownerFirst}
                  onChange={(e) => set("ownerFirst", e.target.value)}
                  disabled={isLoading}
                />
              </div>
              <div>
                <Label className={LABEL}>
                  Last name <span className="text-destructive">*</span>
                </Label>
                <Input
                  placeholder="Last"
                  className={cn(FIELD, errClass("ownerLast"))}
                  data-qa-error={errors.ownerLast ? "true" : undefined}
                  value={app.ownerLast}
                  onChange={(e) => set("ownerLast", e.target.value)}
                  disabled={isLoading}
                />
              </div>
            </div>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
              <div>
                <Label className={LABEL}>
                  Date of Birth <span className="text-destructive">*</span>
                </Label>
                <Input
                  type="date"
                  className={cn(FIELD, errClass("ownerDob"))}
                  data-qa-error={errors.ownerDob ? "true" : undefined}
                  value={app.ownerDob}
                  onChange={(e) => set("ownerDob", e.target.value)}
                  disabled={isLoading}
                />
              </div>
              <div>
                <Label className={LABEL}>Driver&apos;s License #</Label>
                <Input
                  className={FIELD}
                  value={app.ownerDl}
                  onChange={(e) => set("ownerDl", e.target.value)}
                  disabled={isLoading}
                />
              </div>
              {dd("cdl", "CDL?", YES_NO)}
            </div>
          </fieldset>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {dd("homeSameAsBusiness", "Is your home address the same as the business?", YES_NO)}
            {dd("truckInfoAvailable", "Truck Info Available?", YES_NO)}
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <Label htmlFor="qa-submittedBy" className={LABEL}>
                Information Submitted by: <span className="text-destructive">*</span>
              </Label>
              <Input
                id="qa-submittedBy"
                className={cn(FIELD, errClass("submittedBy"))}
                data-qa-error={errors.submittedBy ? "true" : undefined}
                value={app.submittedBy}
                onChange={(e) => set("submittedBy", e.target.value)}
                disabled={isLoading}
              />
            </div>
            {dd("hearAboutUs", "How did you hear about us?", HEAR_ABOUT, false)}
          </div>

          <div>
            <Label htmlFor="qa-comments" className={LABEL}>
              Comments
            </Label>
            <Textarea
              id="qa-comments"
              rows={3}
              className="w-full rounded-lg border-[1.5px] border-gray-300 bg-white px-4 py-3 text-[16px] text-foreground placeholder:text-gray-500 transition-colors focus-visible:border-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan/60"
              value={app.comments}
              onChange={(e) => set("comments", e.target.value)}
              disabled={isLoading}
            />
          </div>

          {/* Terms & Conditions */}
          <div className="flex items-start gap-3">
            <Checkbox
              id="qa-sms"
              checked={app.smsConsent}
              onCheckedChange={(v) => set("smsConsent", v === true)}
              disabled={isLoading}
              aria-invalid={!!errors.smsConsent}
              data-qa-error={errors.smsConsent ? "true" : undefined}
              className="mt-0.5 shrink-0"
            />
            <div className="flex flex-col gap-1">
              <label htmlFor="qa-sms" className="cursor-pointer text-[12.5px] leading-[1.5] text-gray-600">
                By providing your phone number, you agree to receive text messages from
                Complete Carrier Coverage LLC, DBA Road Ready Insurance. Message and data
                rates may apply. Message frequency varies. No insurance coverage is bound by
                this request. <span className="text-destructive">*</span>
              </label>
              {errors.smsConsent && (
                <p className="text-[12px] text-destructive">{errors.smsConsent}</p>
              )}
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="btn btn-primary w-full disabled:cursor-not-allowed disabled:bg-primary/80"
          >
            {isLoading ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" strokeWidth={2} />
                Sending...
              </>
            ) : (
              "Submit application"
            )}
          </button>
        </form>
      </div>
    </div>,
    document.body,
  );
}

const QA_FIELD =
  "h-12 w-full rounded-lg border-[1.5px] border-gray-300 bg-white px-4 text-[16px] text-foreground placeholder:text-gray-500 transition-colors focus-visible:border-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan/60 disabled:cursor-not-allowed disabled:opacity-60";
const QA_LABEL = "mb-2 block text-[14px] font-medium leading-tight text-foreground";

/**
 * A dropdown for the quick-quote application. Module-level (not defined inside
 * QuickAppDialog) so it keeps a stable component identity and does not remount
 * every keystroke.
 */
function AppDropdown({
  id,
  label,
  options,
  required = true,
  value,
  onChange,
  error,
  disabled,
}: {
  id: string;
  label: string;
  options: readonly string[];
  required?: boolean;
  value: string;
  onChange: (v: string) => void;
  error?: string;
  disabled?: boolean;
}) {
  return (
    <div>
      <Label htmlFor={id} className={QA_LABEL}>
        {label} {required && <span className="text-destructive">*</span>}
      </Label>
      <Select value={value || undefined} onValueChange={(v) => onChange((v as string) ?? "")} disabled={disabled}>
        <SelectTrigger
          id={id}
          data-qa-error={error ? "true" : undefined}
          className={cn(
            QA_FIELD,
            "!h-12 justify-between text-left data-[placeholder]:text-gray-500",
            error && "border-destructive focus-visible:border-destructive",
          )}
        >
          <SelectValue placeholder="Select" />
        </SelectTrigger>
        <SelectContent>
          {options.map((o) => (
            <SelectItem key={o} value={o}>
              {o}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      {error && <p className="mt-1 text-[13px] text-destructive">{error}</p>}
    </div>
  );
}

/** Checkbox grid with an inline "Other" text field, used for trucks & commodities. */
function CheckGroup({
  legend,
  options,
  selected,
  onToggle,
  otherValue,
  onOther,
  error,
  disabled,
  columns = 2,
}: {
  legend: string;
  options: readonly string[];
  selected: string[];
  onToggle: (v: string) => void;
  otherValue: string;
  onOther: (v: string) => void;
  error?: string;
  disabled?: boolean;
  columns?: 1 | 2;
}) {
  return (
    <fieldset>
      <legend
        className="mb-2 block text-[14px] font-medium leading-tight text-foreground"
        data-qa-error={error ? "true" : undefined}
      >
        {legend} <span className="text-destructive">*</span>
      </legend>
      <div className={cn("grid gap-x-4 gap-y-2.5", columns === 2 ? "sm:grid-cols-2" : "grid-cols-1")}>
        {options.map((o) => (
          <label
            key={o}
            className="flex cursor-pointer items-start gap-2.5 text-[14px] leading-snug text-gray-700"
          >
            <Checkbox
              checked={selected.includes(o)}
              onCheckedChange={() => onToggle(o)}
              disabled={disabled}
              className="mt-0.5 shrink-0"
            />
            {o}
          </label>
        ))}
        <label className="flex items-center gap-2.5">
          <Checkbox
            checked={otherValue.trim().length > 0}
            disabled
            className="mt-0.5 shrink-0 opacity-60"
            aria-hidden="true"
          />
          <Input
            placeholder="Other"
            className="h-10 w-full rounded-lg border-[1.5px] border-gray-300 bg-white px-3 text-[15px] text-foreground placeholder:text-gray-500 focus-visible:border-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan/60"
            value={otherValue}
            onChange={(e) => onOther(e.target.value)}
            disabled={disabled}
          />
        </label>
      </div>
      {error && <p className="mt-1.5 text-[13px] text-destructive">{error}</p>}
    </fieldset>
  );
}
