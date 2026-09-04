"use client";

import { useState } from "react";

export default function FaqItem({
  question,
  answer,
}: {
  question: string;
  answer: string;
}) {
  const [open, setOpen] = useState(false);

  return (
    <div className="border-b border-[var(--line)] py-6">
      <button
        onClick={() => setOpen((o) => !o)}
        className="flex w-full items-center justify-between gap-6 text-left"
        aria-expanded={open}
      >
        <span className="font-display text-lg text-[var(--ink)]">{question}</span>
        <svg
          viewBox="0 0 24 24"
          className="h-5 w-5 shrink-0 text-[var(--accent)] transition-transform duration-200"
          style={{ transform: open ? "rotate(180deg)" : "rotate(0deg)" }}
          fill="none"
          aria-hidden="true"
        >
          <path
            d="M4 9c2.5 4 5.5 6 8 6s5.5-2 8-6"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </svg>
      </button>
      {open && (
        <p className="mt-4 max-w-2xl text-[15px] leading-relaxed text-[var(--ink-soft)]">
          {answer}
        </p>
      )}
    </div>
  );
}
