"use client";

import { ArrowUp } from "lucide-react";

export default function BackToTop() {
  return (
    <button
      type="button"
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      data-testid="footer-back-to-top"
      className="group inline-flex items-center gap-2 rounded-full border border-[var(--line)] px-3.5 py-2 text-xs font-medium text-[var(--ink)] transition-colors duration-200 hover:border-[var(--accent)] hover:text-[var(--accent)]"
    >
      Back to top
      <ArrowUp className="h-3.5 w-3.5 transition-transform duration-200 group-hover:-translate-y-0.5" />
    </button>
  );
}
