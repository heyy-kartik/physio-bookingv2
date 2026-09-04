import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa6";
import Arc from "./Arc";
import FooterNewsletter from "./FooterNewsletter";
import { OWNER_WHATSAPP_NUMBER } from "@/lib/whatsapp";

export default function FooterTop() {
  return (
    <div
      data-testid="footer-cta-section"
      className="mx-auto grid max-w-6xl gap-12 px-6 pb-16 pt-20 lg:grid-cols-[1.15fr_0.85fr] lg:items-center lg:gap-20"
    >
      <div>
        <div className="flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.18em] text-[var(--sage)]">
          <Arc className="h-4 w-8" />
          <span>Start your recovery</span>
        </div>
        <h2 className="mt-6 max-w-xl font-display text-4xl leading-[1.02] tracking-[-0.035em] text-[var(--ink)] md:text-5xl">
          Move better,{" "}
          <em className="font-heading font-normal italic text-[var(--accent)]">
            starting this week.
          </em>
        </h2>
        <p className="mt-5 max-w-md text-[17px] leading-relaxed text-[var(--ink-soft)]">
          Book online in under two minutes. We confirm your slot on WhatsApp
          the same day — no phone tag, no waiting on hold.
        </p>
        <div className="mt-8 flex flex-wrap items-center gap-3">
          <Link
            href="/appointment"
            data-testid="footer-book-cta"
            className="group inline-flex min-h-12 items-center gap-2 rounded-full bg-[var(--accent)] pl-6 pr-5 text-[15px] font-semibold text-white shadow-lg shadow-[rgba(13,122,107,0.18)] transition-[transform,opacity] duration-200 hover:-translate-y-0.5 hover:opacity-90 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--accent)]"
          >
            Book a session
            <ArrowUpRight className="h-4 w-4 transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </Link>
          <a
            href={`https://wa.me/${OWNER_WHATSAPP_NUMBER}`}
            target="_blank"
            rel="noopener noreferrer"
            data-testid="footer-whatsapp-cta"
            className="inline-flex min-h-12 items-center gap-2 rounded-full border border-[var(--line)] px-5 text-[15px] font-medium text-[var(--ink)] transition-colors duration-200 hover:border-[var(--accent)] hover:text-[var(--accent)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--accent)]"
          >
            <FaWhatsapp className="h-4 w-4" />
            Chat on WhatsApp
          </a>
        </div>
      </div>

      <FooterNewsletter />
    </div>
  );
}
