"use client";

import { useState, type FormEvent } from "react";
import { ArrowRight, Check, Loader2 } from "lucide-react";

type Status = "idle" | "loading" | "done" | "error";

export default function FooterNewsletter() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<Status>("idle");

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");
    try {
      const res = await fetch("/internal-api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      if (!res.ok) throw new Error("Subscribe failed");
      setStatus("done");
    } catch {
      setStatus("error");
    }
  }

  return (
    <div
      data-testid="footer-newsletter"
      className="rounded-[1.75rem] border border-[var(--line)] bg-[var(--bg)] p-7 md:p-9"
    >
      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--sage)]">
        Movement notes
      </p>
      <p className="mt-3 font-display text-2xl leading-tight tracking-[-0.02em] text-[var(--ink)]">
        One useful email a month.
      </p>
      <p className="mt-2 text-[15px] leading-relaxed text-[var(--ink-soft)]">
        Simple mobility routines, posture fixes, and clinic updates. No fluff.
      </p>

      {status === "done" ? (
        <div
          data-testid="newsletter-success"
          className="mt-6 flex items-center gap-3 rounded-full bg-[var(--accent-light)] px-5 py-3.5 text-[15px] font-medium text-[var(--accent)] animate-fade-in"
        >
          <Check className="h-4 w-4 shrink-0" strokeWidth={2.5} />
          You&apos;re on the list — see you next month.
        </div>
      ) : (
        <form onSubmit={onSubmit} className="mt-6" data-testid="newsletter-form">
          <label htmlFor="footer-email" className="sr-only">
            Email address
          </label>
          <div className="relative">
            <input
              id="footer-email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              data-testid="newsletter-email-input"
              className="h-13 w-full rounded-full border border-[var(--line)] bg-[var(--surface)] pl-5 pr-14 text-[15px] text-[var(--ink)] outline-none transition-[border-color,box-shadow] duration-200 placeholder:text-[var(--ink-soft)]/60 focus:border-[var(--accent)] focus:shadow-[0_0_0_4px_rgba(13,122,107,0.12)]"
            />
            <button
              type="submit"
              disabled={status === "loading"}
              aria-label="Subscribe"
              data-testid="newsletter-submit-button"
              className="group absolute right-1.5 top-1.5 flex h-10 w-10 items-center justify-center rounded-full bg-[var(--accent)] text-white transition-[transform,opacity] duration-200 hover:scale-105 disabled:opacity-60"
            >
              {status === "loading" ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" />
              )}
            </button>
          </div>
          <p className="mt-3 text-xs text-[var(--ink-soft)]" data-testid="newsletter-fine-print">
            {status === "error" ? (
              <span className="text-[var(--danger)]">Something went wrong. Please try again.</span>
            ) : (
              "No spam. Unsubscribe any time."
            )}
          </p>
        </form>
      )}
    </div>
  );
}
