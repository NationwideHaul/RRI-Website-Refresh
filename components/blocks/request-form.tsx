"use client";

import Link from "next/link";
import { useState, type FormEvent } from "react";
import { CheckCircle2, Loader2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { NAP } from "@/lib/constants";
import { cn } from "@/lib/utils";

type Status = "idle" | "loading" | "success" | "error";

export type RequestKind = "claim" | "coi" | "policy-change" | "customer-service";

type Field = {
  key: string;
  label: string;
  type: "text" | "tel" | "email" | "textarea" | "date" | "select";
  required?: boolean;
  placeholder?: string;
  autoComplete?: string;
  options?: { value: string; label: string }[];
  /** Half-width on the sm+ grid (default full). */
  half?: boolean;
};

// Base fields shared by every request kind.
const BASE_FIELDS: Field[] = [
  { key: "fullName", label: "Full name", type: "text", required: true, autoComplete: "name", placeholder: "Jane Doe", half: true },
  { key: "company", label: "Company", type: "text", autoComplete: "organization", placeholder: "Fleet LLC", half: true },
  { key: "email", label: "Email", type: "email", required: true, autoComplete: "email", placeholder: "jane@fleet.com", half: true },
  { key: "phone", label: "Phone", type: "tel", required: true, autoComplete: "tel", placeholder: "(305) 555-0100", half: true },
];

const KIND_CONFIG: Record<
  RequestKind,
  { submitLabel: string; success: string; fields: Field[] }
> = {
  claim: {
    submitLabel: "Send claim details",
    success: "Claim details received. We'll respond with the instructions to report it to your carrier shortly.",
    fields: [
      { key: "dot", label: "USDOT number", type: "text", placeholder: "1234567", half: true },
      { key: "policyNumber", label: "Policy number", type: "text", placeholder: "If you have it handy", half: true },
      { key: "dateOfLoss", label: "Date of loss", type: "date", half: true },
      { key: "details", label: "What happened", type: "textarea", required: true, placeholder: "Tell us what happened, when, and where, as much as you can." },
    ],
  },
  coi: {
    submitLabel: "Request certificate",
    success: "Request received. Your agent will process it within business days and confirm when it's sent.",
    fields: [
      { key: "dot", label: "USDOT number", type: "text", placeholder: "1234567", half: true },
      { key: "policyNumber", label: "Policy number", type: "text", placeholder: "If you have it handy", half: true },
      { key: "certificateHolder", label: "Certificate holder", type: "text", placeholder: "Company the COI is for", half: true },
      { key: "holderEmail", label: "Where to send it", type: "text", placeholder: "Email or fax for the holder", half: true },
      { key: "details", label: "Requirements / details", type: "textarea", placeholder: "Any specific limits, endorsements, or additional insureds required." },
    ],
  },
  "policy-change": {
    submitLabel: "Request the change",
    success: "Request received. Your agent will confirm the change and follow up.",
    fields: [
      { key: "dot", label: "USDOT number", type: "text", placeholder: "1234567", half: true },
      { key: "policyNumber", label: "Policy number", type: "text", placeholder: "If you have it handy", half: true },
      {
        key: "changeType",
        label: "Type of change",
        type: "select",
        half: true,
        options: [
          { value: "add-unit", label: "Add a unit / driver" },
          { value: "remove-unit", label: "Remove a unit / driver" },
          { value: "endorsement", label: "Add / change an endorsement" },
          { value: "update-info", label: "Update account info" },
          { value: "other", label: "Something else" },
        ],
      },
      { key: "details", label: "Details of the change", type: "textarea", required: true, placeholder: "VIN, driver name, effective date, or whatever we need to make the change." },
    ],
  },
  "customer-service": {
    submitLabel: "Send my request",
    success: "Got it. Your agent will get back to you within 2 business hours.",
    fields: [
      { key: "dot", label: "USDOT number", type: "text", placeholder: "1234567", half: true },
      {
        key: "topic",
        label: "Topic",
        type: "select",
        half: true,
        options: [
          { value: "billing", label: "Billing / payments" },
          { value: "documents", label: "Policy documents" },
          { value: "coverage", label: "Coverage question" },
          { value: "portal", label: "Client portal access" },
          { value: "other", label: "Something else" },
        ],
      },
      { key: "details", label: "How can we help?", type: "textarea", required: true, placeholder: "Tell us what you need." },
    ],
  },
};

function isValidEmail(value: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}
function isValidPhone(value: string): boolean {
  return value.replace(/\D/g, "").length >= 10;
}

const FIELD_CLASS =
  "h-12 w-full rounded-lg border-[1.5px] border-gray-300 bg-white px-4 text-[16px] text-foreground placeholder:text-gray-500 transition-colors focus-visible:border-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan/60 disabled:cursor-not-allowed disabled:opacity-60";

export function RequestForm({ kind }: { kind: RequestKind }) {
  const config = KIND_CONFIG[kind];
  const fields = [...BASE_FIELDS, ...config.fields];

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

  function validate(): boolean {
    const next: Record<string, string> = {};
    for (const f of fields) {
      const v = (values[f.key] ?? "").trim();
      if (f.required && !v) next[f.key] = "Required.";
      else if (f.key === "email" && v && !isValidEmail(v)) next[f.key] = "Double-check the email.";
      else if (f.key === "phone" && v && !isValidPhone(v)) next[f.key] = "Phone looks incomplete.";
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
        body: JSON.stringify({ kind, consent, companyWebsite: honeypot, ...values }),
      });
      const data = (await res.json()) as { ok: boolean; error?: string };
      if (!res.ok || !data.ok) {
        setStatus("error");
        setErrorMessage(data.error ?? "Something went wrong. Please try again in a moment.");
        return;
      }
      setStatus("success");
      setValues({});
      setConsent(false);
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
        <h3 className="text-[20px] font-semibold text-foreground">{config.success}</h3>
        <p className="text-[15px] leading-[1.55] text-gray-700">
          If you need something sooner, call us at {NAP.phoneDisplay}.
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className="flex flex-col gap-5 rounded-2xl border border-gray-100 bg-white p-6 shadow-sm lg:p-7"
    >
      {status === "error" && errorMessage && (
        <div
          role="alert"
          className="rounded-lg border border-destructive/30 bg-destructive/5 px-4 py-3 text-[14px] text-destructive"
        >
          {errorMessage}{" "}
          {!NAP.phone.startsWith("PLACEHOLDER_") && `Or call us directly at ${NAP.phoneDisplay}.`}
        </div>
      )}

      {/* Honeypot */}
      <div className="hidden" aria-hidden="true">
        <label>
          Company website
          <input
            type="text"
            tabIndex={-1}
            autoComplete="off"
            value={honeypot}
            onChange={(e) => setHoneypot(e.target.value)}
          />
        </label>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {fields.map((f) => {
          const id = `rf-${f.key}`;
          const err = errors[f.key];
          const errCls = err ? "border-destructive focus-visible:border-destructive" : "";
          const wrap = f.type === "textarea" || !f.half ? "sm:col-span-2" : "";
          return (
            <div key={f.key} className={wrap}>
              <Label htmlFor={id} className="mb-2 block text-[14px] font-medium leading-tight text-foreground">
                {f.label} {f.required && <span className="text-destructive">*</span>}
              </Label>

              {f.type === "textarea" ? (
                <Textarea
                  id={id}
                  placeholder={f.placeholder}
                  rows={4}
                  className={cn(
                    "w-full rounded-lg border-[1.5px] border-gray-300 bg-white px-4 py-3 text-[16px] text-foreground placeholder:text-gray-500 transition-colors focus-visible:border-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan/60",
                    errCls,
                  )}
                  value={values[f.key] ?? ""}
                  onChange={(e) => set(f.key, e.target.value)}
                  disabled={isLoading}
                />
              ) : f.type === "select" ? (
                <Select
                  value={values[f.key] || undefined}
                  onValueChange={(v) => set(f.key, v as string)}
                  disabled={isLoading}
                >
                  <SelectTrigger
                    id={id}
                    className={cn(FIELD_CLASS, "!h-12 justify-between text-left data-[placeholder]:text-gray-500", errCls)}
                  >
                    <SelectValue placeholder="Select" />
                  </SelectTrigger>
                  <SelectContent>
                    {f.options?.map((o) => (
                      <SelectItem key={o.value} value={o.value}>
                        {o.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              ) : (
                <Input
                  id={id}
                  type={f.type}
                  autoComplete={f.autoComplete}
                  placeholder={f.placeholder}
                  className={cn(FIELD_CLASS, errCls)}
                  value={values[f.key] ?? ""}
                  onChange={(e) => set(f.key, e.target.value)}
                  disabled={isLoading}
                />
              )}
              {err && <p className="mt-1 text-[13px] text-destructive">{err}</p>}
            </div>
          );
        })}
      </div>

      <div className="flex items-start gap-3">
        <Checkbox
          id="rf-consent"
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
          <label htmlFor="rf-consent" className="cursor-pointer text-[12.5px] leading-[1.5] text-gray-500">
            I agree to the{" "}
            <Link href="/privacy-policy/" className="text-primary underline underline-offset-2 hover:text-primary-dark">
              Privacy Policy
            </Link>{" "}
            and{" "}
            <Link href="/terms-conditions/" className="text-primary underline underline-offset-2 hover:text-primary-dark">
              Terms of Service
            </Link>
            , and consent to receive communications from Road Ready Insurance.
          </label>
          {errors.consent && <p className="text-[12px] text-destructive">{errors.consent}</p>}
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
          config.submitLabel
        )}
      </button>
    </form>
  );
}
