import Link from "next/link";
import Arc from "@/components/Arc";
import type { Metadata } from "next";
import BookingButton from "@/components/BookingButton";

export const metadata: Metadata = {
  title: "Services — Meridian Physiotherapy",
};

const services = [
  {
    name: "Sports injury recovery",
    detail:
      "Whether it&apos;s a sprain, a strain, or a full ligament tear, we build a rehab plan around your sport and your timeline — not a generic protocol.",
    includes: ["Initial movement assessment", "Manual therapy & taping", "Progressive strength programming", "Return-to-sport testing"],
  },
  {
    name: "Post-surgical rehabilitation",
    detail:
      "Structured, staged recovery after orthopaedic surgery — knee, hip, shoulder, and spine — working closely with your surgeon's protocol.",
    includes: ["Post-op mobility work", "Scar & swelling management", "Staged strength rebuilding", "Progress reports on request"],
  },
  {
    name: "Chronic pain & posture",
    detail:
      "For long-standing back, neck, and joint pain from desk work, driving, or old injuries that never fully resolved.",
    includes: ["Postural & ergonomic assessment", "Hands-on pain relief", "Home exercise programs", "Long-term management plan"],
  },
  {
    name: "Mobility for older adults",
    detail:
      "Balance, strength, and confidence for everyday movement — walking, stairs, getting up from a chair — with fall-prevention in mind.",
    includes: ["Balance & fall-risk screening", "Gentle strength training", "Gait & mobility aids advice", "Family caregiver guidance"],
  },
];

export default function ServicesPage() {
  return (
    <div className="mx-auto max-w-6xl px-6 py-16 md:py-24">
      <Arc className="mb-6 h-6 w-12" />
      <h1 className="font-display text-4xl text-[var(--ink)] md:text-5xl">Services</h1>
      <p className="mt-4 max-w-lg text-[17px] leading-relaxed text-[var(--ink-soft)]">
        Every treatment plan starts with a full assessment — no two patients
        get the same program.
      </p>

      <div className="mt-14 divide-y divide-[var(--line)] border-t border-[var(--line)]">
        {services.map((s) => (
          <div key={s.name} className="grid gap-6 py-10 md:grid-cols-[1fr_1fr]">
            <div>
              <h2 className="font-display text-2xl text-[var(--ink)]">{s.name}</h2>
              <p className="mt-3 max-w-md text-[15px] leading-relaxed text-[var(--ink-soft)]">
                {s.detail}
              </p>
            </div>
            <div>
              <p className="text-sm font-medium text-[var(--sage)]">What&apos;s included</p>
              <ul className="mt-3 space-y-2">
                {s.includes.map((item) => (
                  <li key={item} className="flex gap-3 text-[15px] text-[var(--ink-soft)]">
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--accent)]" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-16 rounded-2xl border border-[var(--line)] bg-[var(--surface)] p-8 md:p-10">
        <p className="font-display text-xl text-[var(--ink)]">Not sure which service fits?</p>
        <p className="mt-2 max-w-md text-[15px] text-[var(--ink-soft)]">
          Book an initial assessment and we&apos;ll recommend the right plan for you.
        </p>
        <div className="mt-6">
          <BookingButton />
        </div>
      </div>
    </div>
  );
}
