"use client";

import { useState, type FormEvent } from "react";
import { CheckCircle2, Loader2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
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

type FormState = {
  name: string;
  phone: string;
  email: string;
  company: string;
  dot: string;
  fleetSize: string;
  message: string;
  companyWebsite: string; // honeypot
};

const INITIAL: FormState = {
  name: "",
  phone: "",
  email: "",
  company: "",
  dot: "",
  fleetSize: "",
  message: "",
  companyWebsite: "",
};

const FIELD_CLASS =
  "h-12 w-full rounded-lg border-[1.5px] border-gray-300 bg-white px-4 text-[16px] text-foreground placeholder:text-gray-500 transition-colors focus-visible:border-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan/60 disabled:cursor-not-allowed disabled:opacity-60";

const LABEL_CLASS =
  "mb-2 block text-[14px] font-medium leading-tight text-foreground";

const ERROR_CLASS = "mt-1 text-[13px] text-destructive";

function isValidEmail(value: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

function isValidPhone(value: string): boolean {
  const digits = value.replace(/\D/g, "");
  return digits.length >= 10;
}

export function QuoteForm() {
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
    if (!form.name.trim()) next.name = "This one we need.";
    if (!form.phone.trim()) next.phone = "This one we need.";
    else if (!isValidPhone(form.phone))
      next.phone = "Phone number looks incomplete.";
    if (!form.email.trim()) next.email = "This one we need.";
    else if (!isValidEmail(form.email))
      next.email = "Double-check the email, something is off.";
    if (!form.company.trim()) next.company = "This one we need.";
    if (!form.fleetSize) next.fleetSize = "Pick a fleet size.";
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
          event_label: form.fleetSize,
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
    const phoneFallback =
      !NAP.phone.startsWith("PLACEHOLDER_") &&
      ` or call us at ${NAP.phoneDisplay}`;
    return (
      <div
        role="status"
        className="flex flex-col items-center gap-4 rounded-2xl border border-gray-100 bg-white p-8 text-center lg:p-12"
      >
        <CheckCircle2 className="h-10 w-10 text-success" strokeWidth={1.5} />
        <h3 className="text-[22px] font-semibold text-foreground">
          Got it. An agent will reach out within 2 business hours.
        </h3>
        <p className="text-[16px] leading-[1.6] text-gray-700">
          If you need something sooner{phoneFallback || ""}, just reply to the
          confirmation email.
        </p>
      </div>
    );
  }

  const isLoading = status === "loading";

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className="flex flex-col gap-6 rounded-2xl border border-gray-100 bg-white p-6 shadow-sm lg:p-10"
    >
      {status === "error" && errorMessage && (
        <div
          role="alert"
          className="rounded-lg border border-destructive/30 bg-destructive/5 px-4 py-3 text-[14px] text-destructive"
        >
          {errorMessage}
          {!NAP.phone.startsWith("PLACEHOLDER_") &&
            ` Or call us directly at ${NAP.phoneDisplay}.`}
        </div>
      )}

      {/* Honeypot — not visible to humans, bots will fill it. */}
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

      <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
        <div>
          <Label htmlFor="qf-name" className={LABEL_CLASS}>
            Your name <span className="text-destructive">*</span>
          </Label>
          <Input
            id="qf-name"
            type="text"
            autoComplete="name"
            placeholder="Jane Doe"
            className={cn(
              FIELD_CLASS,
              errors.name && "border-destructive focus-visible:border-destructive",
            )}
            value={form.name}
            onChange={(e) => update("name", e.target.value)}
            disabled={isLoading}
            required
          />
          {errors.name && <p className={ERROR_CLASS}>{errors.name}</p>}
        </div>

        <div>
          <Label htmlFor="qf-phone" className={LABEL_CLASS}>
            Best number to reach you <span className="text-destructive">*</span>
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
          <Label htmlFor="qf-email" className={LABEL_CLASS}>
            Email <span className="text-destructive">*</span>
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
          <Label htmlFor="qf-company" className={LABEL_CLASS}>
            Company name <span className="text-destructive">*</span>
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
          <Label htmlFor="qf-dot" className={LABEL_CLASS}>
            USDOT number{" "}
            <span className="text-gray-500">(if you have one)</span>
          </Label>
          <Input
            id="qf-dot"
            type="text"
            inputMode="numeric"
            placeholder="1234567"
            className={FIELD_CLASS}
            value={form.dot}
            onChange={(e) => update("dot", e.target.value)}
            disabled={isLoading}
          />
        </div>

        <div>
          <Label htmlFor="qf-fleet" className={LABEL_CLASS}>
            How many units? <span className="text-destructive">*</span>
          </Label>
          <Select
            value={form.fleetSize || undefined}
            onValueChange={(v) => update("fleetSize", v as string)}
            disabled={isLoading}
          >
            <SelectTrigger
              id="qf-fleet"
              className={cn(
                FIELD_CLASS,
                "!h-12 justify-between text-left data-[placeholder]:text-gray-500",
                errors.fleetSize &&
                  "border-destructive focus-visible:border-destructive",
              )}
            >
              <SelectValue placeholder="Select fleet size" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="1">1 unit</SelectItem>
              <SelectItem value="2-5">2 to 5 units</SelectItem>
              <SelectItem value="6-9">6 to 9 units</SelectItem>
              <SelectItem value="10-25">10 to 25 units</SelectItem>
              <SelectItem value="25+">25 or more units</SelectItem>
            </SelectContent>
          </Select>
          {errors.fleetSize && (
            <p className={ERROR_CLASS}>{errors.fleetSize}</p>
          )}
        </div>
      </div>

      <div>
        <Label htmlFor="qf-message" className={LABEL_CLASS}>
          Tell us about your operation
        </Label>
        <Textarea
          id="qf-message"
          rows={5}
          placeholder="We run 4 dry vans in FL and GA, mostly regional freight. Our renewal is in 60 days..."
          className={cn(FIELD_CLASS, "!h-auto min-h-[120px] py-3")}
          value={form.message}
          onChange={(e) => update("message", e.target.value)}
          disabled={isLoading}
        />
      </div>

      <div className="flex flex-col items-start gap-3 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-[13px] text-gray-500">
          We will never share your information. An agent will respond within 2
          business hours.
        </p>
        <button
          type="submit"
          disabled={isLoading}
          className="inline-flex h-[52px] min-w-[180px] items-center justify-center gap-2 rounded-lg bg-primary px-8 text-[17px] font-semibold text-white transition-colors hover:bg-primary-dark disabled:cursor-not-allowed disabled:bg-primary/80"
        >
          {isLoading ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" strokeWidth={2} />
              Sending...
            </>
          ) : (
            "Send My Info"
          )}
        </button>
      </div>
    </form>
  );
}
