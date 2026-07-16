"use client";

import Link from "next/link";
import { useState, type FormEvent } from "react";
import {
  CheckCircle2,
  Loader2,
  Pencil,
  Truck,
  UserMinus,
  UserPlus,
  type LucideIcon,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { NAP } from "@/lib/constants";
import { cn } from "@/lib/utils";

type Status = "idle" | "loading" | "success" | "error";

type FieldDef = {
  key: string;
  label: string;
  type: "text" | "date";
  required?: boolean;
  placeholder?: string;
  half?: boolean;
};

const FIELDS: Record<string, FieldDef> = {
  driverName: { key: "driverName", label: "Driver full name", type: "text", required: true, placeholder: "Jane Doe", half: true },
  driverDob: { key: "driverDob", label: "Date of birth", type: "date", half: true },
  driverLicense: { key: "driverLicense", label: "Driver license #", type: "text", half: true },
  driverState: { key: "driverState", label: "License state", type: "text", placeholder: "e.g. FL", half: true },
  vin: { key: "vin", label: "VIN", type: "text", required: true, placeholder: "17-character VIN", half: true },
  vehicleYear: { key: "vehicleYear", label: "Year", type: "text", placeholder: "2022", half: true },
  vehicleMakeModel: { key: "vehicleMakeModel", label: "Make & model", type: "text", placeholder: "Freightliner Cascadia", half: true },
  vehicleValue: { key: "vehicleValue", label: "Stated value", type: "text", placeholder: "$120,000", half: true },
  effectiveDate: { key: "effectiveDate", label: "Effective date", type: "date", half: true },
};

type ChangeType = {
  value: string;
  label: string;
  icon: LucideIcon;
  /** Keys from FIELDS shown for this change type. */
  fields: string[];
  /** Whether the details textarea is required (used for "other"). */
  detailsRequired?: boolean;
  detailsLabel: string;
};

const CHANGE_TYPES: ChangeType[] = [
  {
    value: "Add a driver",
    label: "Add a driver",
    icon: UserPlus,
    fields: ["driverName", "driverDob", "driverLicense", "driverState", "effectiveDate"],
    detailsLabel: "Anything else about this driver?",
  },
  {
    value: "Remove a driver",
    label: "Remove a driver",
    icon: UserMinus,
    fields: ["driverName", "effectiveDate"],
    detailsLabel: "Reason or notes (optional)",
  },
  {
    value: "Add a vehicle",
    label: "Add a vehicle",
    icon: Truck,
    fields: ["vin", "vehicleYear", "vehicleMakeModel", "vehicleValue", "effectiveDate"],
    detailsLabel: "Anything else about this unit?",
  },
  {
    value: "Remove a vehicle",
    label: "Remove a vehicle",
    icon: Truck,
    fields: ["vin", "effectiveDate"],
    detailsLabel: "Reason or notes (optional)",
  },
  {
    value: "Other change",
    label: "Something else",
    icon: Pencil,
    fields: [],
    detailsRequired: true,
    detailsLabel: "Describe the change you need",
  },
];

const BASE: FieldDef[] = [
  { key: "fullName", label: "Your name", type: "text", required: true, placeholder: "Jane Doe", half: true },
  { key: "company", label: "Company", type: "text", placeholder: "Fleet LLC", half: true },
  { key: "email", label: "Email", type: "text", required: true, placeholder: "jane@fleet.com", half: true },
  { key: "phone", label: "Phone", type: "text", required: true, placeholder: "(305) 555-0100", half: true },
  { key: "dot", label: "USDOT number", type: "text", placeholder: "1234567", half: true },
  { key: "policyNumber", label: "Policy number", type: "text", placeholder: "If you have it handy", half: true },
];

const FIELD_CLASS =
  "h-12 w-full rounded-lg border-[1.5px] border-gray-300 bg-white px-4 text-[16px] text-foreground placeholder:text-gray-500 transition-colors focus-visible:border-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan/60 disabled:cursor-not-allowed disabled:opacity-60";

function isValidEmail(v: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
}
function isValidPhone(v: string) {
  return v.replace(/\D/g, "").length >= 10;
}

export function PolicyChangeForm() {
  const [changeType, setChangeType] = useState<ChangeType | null>(null);
  const [values, setValues] = useState<Record<string, string>>({});
  const [consent, setConsent] = useState(false);
  const [honeypot, setHoneypot] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<Status>("idle");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const isLoading = status === "loading";

  function set(key: string, value: string) {
    setValues((prev) => ({ ...prev, [key]: value }));
    if (errors[key]) setErrors((prev) => ({ ...prev, [key]: "" }));
  }

  function selectType(ct: ChangeType) {
    setChangeType(ct);
    setErrors((prev) => ({ ...prev, changeType: "" }));
  }

  function validate(): boolean {
    const next: Record<string, string> = {};
    if (!changeType) next.changeType = "Pick what you'd like to change.";
    for (const f of BASE) {
      const v = (values[f.key] ?? "").trim();
      if (f.required && !v) next[f.key] = "Required.";
      else if (f.key === "email" && v && !isValidEmail(v)) next[f.key] = "Double-check the email.";
      else if (f.key === "phone" && v && !isValidPhone(v)) next[f.key] = "Phone looks incomplete.";
    }
    if (changeType) {
      for (const key of changeType.fields) {
        const f = FIELDS[key];
        if (f.required && !(values[key] ?? "").trim()) next[key] = "Required.";
      }
      if (changeType.detailsRequired && !(values.details ?? "").trim()) {
        next.details = "Required.";
      }
    }
    if (!consent) next.consent = "Please confirm to submit.";
    setErrors(next);
    return Object.keys(next).length === 0;
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (isLoading) return;
    if (!validate()) return;

    setStatus("loading");
    setErrorMessage(null);
    try {
      const res = await fetch("/api/request", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          kind: "policy-change",
          changeType: changeType?.value,
          consent,
          companyWebsite: honeypot,
          ...values,
        }),
      });
      const data = (await res.json()) as { ok: boolean; error?: string };
      if (!res.ok || !data.ok) {
        setStatus("error");
        setErrorMessage(data.error ?? "Something went wrong. Please try again in a moment.");
        return;
      }
      setStatus("success");
    } catch {
      setStatus("error");
      setErrorMessage("Something went wrong. Please try again in a moment.");
    }
  }

  if (status === "success") {
    return (
      <div
        role="status"
        className="flex flex-col items-center gap-4 rounded-2xl border border-gray-100 bg-white p-8 text-center shadow-sm"
      >
        <CheckCircle2 className="h-10 w-10 text-success" strokeWidth={1.5} />
        <h3 className="text-[20px] font-semibold text-foreground">
          Request received. Your agent will confirm the change and follow up.
        </h3>
        <p className="text-[15px] leading-[1.55] text-gray-700">
          If you need something sooner, call us at {NAP.phoneDisplay}.
        </p>
      </div>
    );
  }

  const renderField = (f: FieldDef) => {
    const id = `pc-${f.key}`;
    const err = errors[f.key];
    return (
      <div key={f.key} className={f.half ? "" : "sm:col-span-2"}>
        <Label htmlFor={id} className="mb-2 block text-[14px] font-medium leading-tight text-foreground">
          {f.label} {f.required && <span className="text-destructive">*</span>}
        </Label>
        <Input
          id={id}
          type={f.type === "date" ? "date" : "text"}
          inputMode={f.key === "phone" ? "tel" : undefined}
          placeholder={f.placeholder}
          className={cn(FIELD_CLASS, err && "border-destructive focus-visible:border-destructive")}
          value={values[f.key] ?? ""}
          onChange={(e) => set(f.key, e.target.value)}
          disabled={isLoading}
        />
        {err && <p className="mt-1 text-[13px] text-destructive">{err}</p>}
      </div>
    );
  };

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className="flex flex-col gap-6 rounded-2xl border border-gray-100 bg-white p-6 shadow-sm lg:p-7"
    >
      {status === "error" && errorMessage && (
        <div role="alert" className="rounded-lg border border-destructive/30 bg-destructive/5 px-4 py-3 text-[14px] text-destructive">
          {errorMessage}{" "}
          {!NAP.phone.startsWith("PLACEHOLDER_") && `Or call us at ${NAP.phoneDisplay}.`}
        </div>
      )}

      {/* Honeypot */}
      <div className="hidden" aria-hidden="true">
        <label>
          Company website
          <input type="text" tabIndex={-1} autoComplete="off" value={honeypot} onChange={(e) => setHoneypot(e.target.value)} />
        </label>
      </div>

      {/* Step 1, what kind of change */}
      <div>
        <p className="mb-3 text-[14px] font-medium text-foreground">
          What would you like to change? <span className="text-destructive">*</span>
        </p>
        <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-3">
          {CHANGE_TYPES.map((ct) => {
            const Icon = ct.icon;
            const selected = changeType?.value === ct.value;
            return (
              <button
                key={ct.value}
                type="button"
                onClick={() => selectType(ct)}
                disabled={isLoading}
                className={cn(
                  "flex items-center gap-2.5 rounded-xl border px-3.5 py-3 text-left text-[14px] font-medium transition-colors",
                  selected
                    ? "border-primary bg-primary-soft text-primary"
                    : "border-gray-200 text-gray-700 hover:border-primary/40 hover:bg-gray-50",
                )}
                aria-pressed={selected}
              >
                <Icon className={cn("h-[18px] w-[18px] shrink-0", selected ? "text-primary" : "text-gray-400")} strokeWidth={1.75} />
                {ct.label}
              </button>
            );
          })}
        </div>
        {errors.changeType && <p className="mt-2 text-[13px] text-destructive">{errors.changeType}</p>}
      </div>

      {/* Step 2, details specific to the change */}
      {changeType && changeType.fields.length > 0 && (
        <div className="flex flex-col gap-4 rounded-xl border border-gray-100 bg-gray-50/70 p-5">
          <p className="text-[13px] font-semibold capitalize tracking-normal text-primary">
            {changeType.label}, details
          </p>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {changeType.fields.map((k) => renderField(FIELDS[k]))}
          </div>
        </div>
      )}

      {/* Your info */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {BASE.map(renderField)}
      </div>

      {/* Notes / description */}
      <div>
        <Label htmlFor="pc-details" className="mb-2 block text-[14px] font-medium leading-tight text-foreground">
          {changeType?.detailsLabel ?? "Notes"} {changeType?.detailsRequired && <span className="text-destructive">*</span>}
        </Label>
        <Textarea
          id="pc-details"
          rows={4}
          className={cn(
            "w-full rounded-lg border-[1.5px] border-gray-300 bg-white px-4 py-3 text-[16px] text-foreground placeholder:text-gray-500 transition-colors focus-visible:border-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan/60",
            errors.details && "border-destructive focus-visible:border-destructive",
          )}
          value={values.details ?? ""}
          onChange={(e) => set("details", e.target.value)}
          disabled={isLoading}
        />
        {errors.details && <p className="mt-1 text-[13px] text-destructive">{errors.details}</p>}
      </div>

      {/* Consent */}
      <div className="flex items-start gap-3">
        <Checkbox
          id="pc-consent"
          checked={consent}
          onCheckedChange={(v) => {
            setConsent(v === true);
            if (errors.consent) setErrors((prev) => ({ ...prev, consent: "" }));
          }}
          disabled={isLoading}
          aria-invalid={!!errors.consent}
          className="mt-0.5 shrink-0"
        />
        <div className="flex flex-col gap-1">
          <label htmlFor="pc-consent" className="cursor-pointer text-[12.5px] leading-[1.5] text-gray-500">
            I agree to the{" "}
            <Link href="/privacy-policy/" className="text-primary underline underline-offset-2 hover:text-primary-dark">Privacy Policy</Link>{" "}
            and{" "}
            <Link href="/terms-conditions/" className="text-primary underline underline-offset-2 hover:text-primary-dark">Terms of Service</Link>
            , and consent to receive communications from Road Ready Insurance.
          </label>
          {errors.consent && <p className="text-[12px] text-destructive">{errors.consent}</p>}
        </div>
      </div>

      <button type="submit" disabled={isLoading} className="btn btn-primary w-full disabled:cursor-not-allowed disabled:bg-primary/80">
        {isLoading ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" strokeWidth={2} />
            Sending...
          </>
        ) : (
          "Submit change request"
        )}
      </button>
    </form>
  );
}
