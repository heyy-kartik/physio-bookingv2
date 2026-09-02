"use client";

import Link from "next/link";
import { HeartPulse } from "lucide-react";
import CardNav, { type CardNavItem } from "./CardNav";

const navItems: CardNavItem[] = [
  {
    label: "Care",
    bgColor: "var(--accent-light)",
    textColor: "var(--ink)",
    links: [
      { label: "Services", href: "/services", ariaLabel: "Explore physiotherapy services" },
      { label: "How it works", href: "/#booking", ariaLabel: "Learn how booking works" },
    ],
  },
  {
    label: "About",
    bgColor: "var(--surface-muted)",
    textColor: "var(--ink)",
    links: [
      { label: "Our approach", href: "/about", ariaLabel: "Learn about Meridian's approach" },
      { label: "FAQs", href: "/faq", ariaLabel: "Read frequently asked questions" },
    ],
  },
  {
    label: "Visit",
    bgColor: "var(--ink)",
    textColor: "var(--surface)",
    links: [
      { label: "Contact us", href: "/contact", ariaLabel: "Contact Meridian Physiotherapy" },
      { label: "Book a session", href: "/appointment", ariaLabel: "Book a physiotherapy session" },
    ],
  },
];

function MeridianMark() {
  return (
    <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[var(--accent)] text-[var(--accent-ink)]" aria-hidden="true">
      <HeartPulse className="h-4 w-4" strokeWidth={2.25} />
    </span>
  );
}

function MeridianLogo() {
  return (
    <Link href="/" aria-label="Meridian Physiotherapy home" className="flex items-center gap-3">
      <MeridianMark />
      <span className="leading-none">
        <span className="block font-display text-[17px] font-semibold tracking-[-0.02em] text-[var(--ink)]">Meridian</span>
        <span className="mt-1 block text-[9px] font-semibold uppercase tracking-[0.2em] text-[var(--ink-soft)]">Physiotherapy</span>
      </span>
    </Link>
  );
}

export default function Header() {
  return (
    <CardNav
      logo={<MeridianLogo />}
      logoAlt="Meridian Physiotherapy"
      items={navItems}
      baseColor="var(--surface)"
      menuColor="var(--ink)"
      buttonBgColor="var(--accent)"
      buttonTextColor="var(--accent-ink)"
      className="top-3 w-[calc(100%-1.5rem)] max-w-6xl md:top-5 md:w-[calc(100%-3rem)]"
    />
  );
}
