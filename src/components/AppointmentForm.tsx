"use client";

import { useState } from "react";
import Link from "next/link";
import { buildWhatsAppLink } from "@/lib/whatsapp";

const services = [
  "Sports injury recovery",
  "Post-surgical rehabilitation",
  "Chronic pain & posture",
  "Mobility for older adults",
  "Not sure — general assessment",
];

const timeSlots = [
  "9:00 AM",
  "10:00 AM",
  "11:00 AM",
  "12:00 PM",
  "2:00 PM",
  "3:00 PM",
  "4:00 PM",
  "5:00 PM",
  "6:00 PM",
];

type Status = "idle" | "submitting" | "success" | "error";

export default function AppointmentForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const [whatsappLink, setWhatsappLink] = useState("");

  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    service: services[0],
    preferredDate: "",
    preferredTime: timeSlots[0],
    message: "",
    consent: false,
  });

  function update<K extends keyof typeof form>(key: K, value: (typeof form)[K]) {
    setForm((f) => ({ ...f, [key]: value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setErrorMsg("");

    if (!form.consent) {
      setErrorMsg("Please accept the privacy consent to continue.");
      return;
    }

    setStatus("submitting");

    try {
      const res = await fetch("/api/appointments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (!res.ok) {
        setErrorMsg(data.error || "Something went wrong. Please try again.");
        setStatus("error");
        return;
      }

      const link = buildWhatsAppLink({
        name: form.name,
        phone: form.phone,
        service: form.service,
        preferredDate: form.preferredDate,
        preferredTime: form.preferredTime,
        message: form.message,
      });

      setWhatsappLink(link);
      setStatus("success");

      // Open WhatsApp automatically; if the popup is blocked, the
      // fallback button below still lets the client send it manually.
      window.open(link, "_blank");
    } catch {
      setErrorMsg("Something went wrong. Please check your connection and try again.");
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div className="rounded-2xl border border-[var(--line)] bg-[var(--surface)] p-8 md:p-10">
        <p className="font-display text-2xl text-[var(--ink)]">Request received</p>
        <p className="mt-3 max-w-md text-[15px] leading-relaxed text-[var(--ink-soft)]">
          We&apos;ve saved your appointment request. A WhatsApp message should
          have opened in a new tab — tap send there to confirm your slot
          with the clinic right away.
        </p>
        <a
          href={whatsappLink}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-6 inline-block rounded-full bg-[var(--sage)] px-7 py-3.5 text-[15px] font-medium text-white transition-opacity hover:opacity-90"
        >
          Open WhatsApp to confirm
        </a>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid gap-6 md:grid-cols-2">
        <Field label="Full name">
          <input
            required
            type="text"
            value={form.name}
            onChange={(e) => update("name", e.target.value)}
            className="input"
            placeholder="Your name"
          />
        </Field>
        <Field label="Phone number">
          <input
            required
            type="tel"
            value={form.phone}
            onChange={(e) => update("phone", e.target.value)}
            className="input"
            placeholder="+91 98765 43210"
          />
        </Field>
      </div>

      <Field label="Email (optional)">
        <input
          type="email"
          value={form.email}
          onChange={(e) => update("email", e.target.value)}
          className="input"
          placeholder="you@example.com"
        />
      </Field>

      <Field label="Service">
        <select
          value={form.service}
          onChange={(e) => update("service", e.target.value)}
          className="input"
        >
          {services.map((s) => (
            <option key={s} value={s}>{s}</option>
          ))}
        </select>
      </Field>

      <div className="grid gap-6 md:grid-cols-2">
        <Field label="Preferred date">
          <input
            required
            type="date"
            value={form.preferredDate}
            onChange={(e) => update("preferredDate", e.target.value)}
            className="input"
          />
        </Field>
        <Field label="Preferred time">
          <select
            value={form.preferredTime}
            onChange={(e) => update("preferredTime", e.target.value)}
            className="input"
          >
            {timeSlots.map((t) => (
              <option key={t} value={t}>{t}</option>
            ))}
          </select>
        </Field>
      </div>

      <Field label="Anything we should know? (optional)">
        <textarea
          value={form.message}
          onChange={(e) => update("message", e.target.value)}
          className="input min-h-24 resize-y"
          placeholder="E.g. previous injury, referring doctor, specific concern"
        />
      </Field>

      <label className="flex items-start gap-3 text-[14px] text-[var(--ink-soft)]">
        <input
          type="checkbox"
          checked={form.consent}
          onChange={(e) => update("consent", e.target.checked)}
          className="mt-1 h-4 w-4 shrink-0 accent-[var(--accent)]"
        />
        <span>
          I agree to Meridian Physiotherapy collecting and using my
          information to schedule and provide my care, as described in the{" "}
          <Link href="/privacy" className="underline underline-offset-2 hover:text-[var(--ink)]">
            privacy consent
          </Link>{" "}
          page.
        </span>
      </label>

      {errorMsg && (
        <p className="text-[14px] text-[var(--danger)]">{errorMsg}</p>
      )}

      <button
        type="submit"
        disabled={status === "submitting"}
        className="rounded-full bg-[var(--accent)] px-7 py-3.5 text-[15px] font-medium text-white transition-opacity hover:opacity-90 disabled:opacity-60"
      >
        {status === "submitting" ? "Sending…" : "Request appointment"}
      </button>

      <style jsx global>{`
        .input {
          width: 100%;
          border: 1px solid var(--line);
          background: var(--surface);
          border-radius: 0.75rem;
          padding: 0.75rem 1rem;
          font-size: 15px;
          color: var(--ink);
          outline: none;
        }
        .input:focus {
          border-color: var(--accent);
        }
      `}</style>
    </form>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="mb-2 block text-[14px] font-medium text-[var(--ink)]">{label}</span>
      {children}
    </label>
  );
}
