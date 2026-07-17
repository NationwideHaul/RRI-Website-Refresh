"use client";

import { useState, type FormEvent } from "react";
import {
  CheckCircle2,
  Loader2,
  Pencil,
  Truck,
  User,
  type LucideIcon,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { NAP } from "@/lib/constants";
import { cn } from "@/lib/utils";

type Status = "idle" | "loading" | "success" | "error";

type ChangeType = {
  key: string;
  label: string;
  icon: LucideIcon;
  /** Prompt for the free-text explanation, worded per change type. */
  explainLabel: string;
};

// The three real endorsement request forms, consolidated into one page.
const CHANGE_TYPES: ChangeType[] = [
  {
    key: "general",
    label: "General policy change",
    icon: Pencil,
    explainLabel:
      "In your own words, please explain the change(s) you are requesting on the policy:",
  },
  {
    key: "driver",
    label: "Add or remove a driver",
    icon: User,
    explainLabel:
      "In your own words, please explain the driver change(s) you are requesting on the policy:",
  },
  {
    key: "vehicle",
    label: "Add or remove a vehicle(s)",
    icon: Truck,
    explainLabel:
      "In your own words, please explain the vehicle change(s) you are requesting on the policy:",
  },
];

type FormValues = {
  firstName: string;
  lastName: string;
  company: string;
  email: string;
  phone: string;
  explanation: string;
  signature: string;
};

const INITIAL: FormValues = {
  firstName: "",
  lastName: "",
  company: "",
  email: "",
  phone: "",
  explanation: "",
  signature: "",
};

const FIELD_CLASS =
  "h-12 w-full rounded-lg border-[1.5px] border-gray-300 bg-white px-4 text-[16px] text-foreground placeholder:text-gray-500 transition-colors focus-visible:border-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan/60 disabled:cursor-not-allowed disabled:opacity-60";
const LABEL_CLASS = "mb-2 block text-[14px] font-medium leading-tight text-foreground";

function isValidEmail(v: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
}
function isValidPhone(v: string) {
  return v.replace(/\D/g, "").length >= 10;
}

export function PolicyChangeForm() {
  const [changeType, setChangeType] = useState<ChangeType | null>(null);
  const [values, setValues] = useState<FormValues>(INITIAL);
  const [honeypot, setHoneypot] = useState("");
  const [errors, setErrors] = useState<Partial<Record<keyof FormValues | "changeType", string>>>({});
  const [status, setStatus] = useState<Status>("idle");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const isLoading = status === "loading";

  function set<K extends keyof FormValues>(key: K, value: FormValues[K]) {
    setValues((prev) => ({ ...prev, [key]: value }));
    if (errors[key]) setErrors((prev) => ({ ...prev, [key]: undefined }));
  }

  function selectType(ct: ChangeType) {
    setChangeType(ct);
    setErrors((prev) => ({ ...prev, changeType: undefined }));
  }

  function validate(): boolean {
    const next: Partial<Record<keyof FormValues | "changeType", string>> = {};
    if (!changeType) next.changeType = "Pick what you'd like to change.";
    if (!values.firstName.trim()) next.firstName = "Required.";
    if (!values.lastName.trim()) next.lastName = "Required.";
    if (!values.company.trim()) next.company = "Required.";
    if (!values.email.trim()) next.email = "Required.";
    else if (!isValidEmail(values.email)) next.email = "Double-check the email.";
    if (!values.phone.trim()) next.phone = "Required.";
    else if (!isValidPhone(values.phone)) next.phone = "Phone looks incomplete.";
    if (!values.explanation.trim()) next.explanation = "Please describe the change.";
    if (!values.signature.trim()) next.signature = "Type your name to sign.";
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
          changeType: changeType?.label,
          fullName: `${values.firstName.trim()} ${values.lastName.trim()}`,
          company: values.company,
          email: values.email,
          phone: values.phone,
          details: values.explanation,
          signature: values.signature,
          companyWebsite: honeypot,
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
          Remember, this is a request only. Coverage is confirmed by a licensed
          Road Ready Insurance representative. If you need something sooner, call
          us at {NAP.phoneDisplay}.
        </p>
      </div>
    );
  }

  const field = (
    key: keyof FormValues,
    label: string,
    opts: { type?: string; placeholder?: string; inputMode?: "tel" | "email" } = {},
  ) => {
    const id = `pc-${key}`;
    const err = errors[key];
    return (
      <div>
        <Label htmlFor={id} className={LABEL_CLASS}>
          {label} <span className="text-destructive">*</span>
        </Label>
        <Input
          id={id}
          type={opts.type ?? "text"}
          inputMode={opts.inputMode}
          placeholder={opts.placeholder}
          className={cn(FIELD_CLASS, err && "border-destructive focus-visible:border-destructive")}
          value={values[key]}
          onChange={(e) => set(key, e.target.value)}
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

      {/* Step 1, what kind of endorsement */}
      <div>
        <p className="mb-3 text-[14px] font-medium text-foreground">
          What would you like to change? <span className="text-destructive">*</span>
        </p>
        <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-3">
          {CHANGE_TYPES.map((ct) => {
            const Icon = ct.icon;
            const selected = changeType?.key === ct.key;
            return (
              <button
                key={ct.key}
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

      {/* Named insured */}
      <fieldset className="flex flex-col gap-4">
        <legend className={LABEL_CLASS}>
          Named Insured <span className="text-destructive">*</span>
        </legend>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <Input
              aria-label="Named insured first name"
              placeholder="First"
              className={cn(FIELD_CLASS, errors.firstName && "border-destructive focus-visible:border-destructive")}
              value={values.firstName}
              onChange={(e) => set("firstName", e.target.value)}
              disabled={isLoading}
            />
            {errors.firstName && <p className="mt-1 text-[13px] text-destructive">{errors.firstName}</p>}
          </div>
          <div>
            <Input
              aria-label="Named insured last name"
              placeholder="Last"
              className={cn(FIELD_CLASS, errors.lastName && "border-destructive focus-visible:border-destructive")}
              value={values.lastName}
              onChange={(e) => set("lastName", e.target.value)}
              disabled={isLoading}
            />
            {errors.lastName && <p className="mt-1 text-[13px] text-destructive">{errors.lastName}</p>}
          </div>
        </div>
      </fieldset>

      {field("company", "Company Name", { placeholder: "Fleet LLC" })}

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {field("email", "Email", { type: "email", inputMode: "email", placeholder: "jane@fleet.com" })}
        {field("phone", "Phone", { type: "tel", inputMode: "tel", placeholder: "(305) 555-0100" })}
      </div>

      {/* Explanation, worded per change type */}
      <div>
        <Label htmlFor="pc-explanation" className={LABEL_CLASS}>
          {changeType?.explainLabel ??
            "In your own words, please explain the change(s) you are requesting on the policy:"}{" "}
          <span className="text-destructive">*</span>
        </Label>
        <Textarea
          id="pc-explanation"
          rows={5}
          className={cn(
            "w-full rounded-lg border-[1.5px] border-gray-300 bg-white px-4 py-3 text-[16px] text-foreground placeholder:text-gray-500 transition-colors focus-visible:border-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan/60",
            errors.explanation && "border-destructive focus-visible:border-destructive",
          )}
          value={values.explanation}
          onChange={(e) => set("explanation", e.target.value)}
          disabled={isLoading}
        />
        {errors.explanation && <p className="mt-1 text-[13px] text-destructive">{errors.explanation}</p>}
      </div>

      {/* Typed signature */}
      <div>
        <Label htmlFor="pc-signature" className={LABEL_CLASS}>
          Signature <span className="text-destructive">*</span>
        </Label>
        <Input
          id="pc-signature"
          placeholder="Type your full name to sign"
          autoComplete="name"
          className={cn(
            FIELD_CLASS,
            "text-[18px] italic",
            errors.signature && "border-destructive focus-visible:border-destructive",
          )}
          value={values.signature}
          onChange={(e) => set("signature", e.target.value)}
          disabled={isLoading}
        />
        {errors.signature && <p className="mt-1 text-[13px] text-destructive">{errors.signature}</p>}
        <p className="mt-2 text-[12.5px] italic leading-[1.55] text-gray-500">
          By signing, you understand that this form is a request form only.
          Insurance cannot be bound, altered, or canceled via this form, email,
          or voicemail system. Coverage confirmation must be communicated through
          a licensed Road Ready Insurance representative, and an official
          confirmation document will be sent to you.
        </p>
      </div>

      <button type="submit" disabled={isLoading} className="btn btn-primary w-full disabled:cursor-not-allowed disabled:bg-primary/80">
        {isLoading ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" strokeWidth={2} />
            Sending...
          </>
        ) : (
          "Submit request"
        )}
      </button>
    </form>
  );
}
