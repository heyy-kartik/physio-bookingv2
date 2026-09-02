import Arc from "@/components/Arc";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About — Meridian Physiotherapy",
};

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-6xl px-6 py-16 md:py-24">
      <div className="grid gap-12 md:grid-cols-[1fr_1fr]">
        <div>
          <Arc className="mb-6 h-6 w-12" />
          <h1 className="font-display text-4xl text-[var(--ink)] md:text-5xl">
            About the practice
          </h1>
          <p className="mt-6 text-[17px] leading-relaxed text-[var(--ink-soft)]">
            Meridian Physiotherapy was started with one idea: recovery works
            best when it&apos;s built around one person at a time, not a shared
            timetable. Every session is one-on-one, from the first
            assessment through to your final check-in.
          </p>
          <p className="mt-4 text-[17px] leading-relaxed text-[var(--ink-soft)]">
            Over 15 years, the practice has worked with athletes recovering
            from ligament injuries, patients rebuilding strength after
            surgery, and people managing pain that&apos;s been part of daily life
            for years — often after other treatment plans didn&apos;t stick.
          </p>
        </div>
        <div className="rounded-2xl border border-[var(--line)] bg-[var(--surface)] p-8">
          <p className="text-sm font-medium text-[var(--sage)]">Credentials</p>
          <ul className="mt-4 space-y-4 text-[15px] text-[var(--ink-soft)]">
            <li>
              <p className="font-medium text-[var(--ink)]">Dr. Anjali Rao, DPT</p>
              <p>Doctor of Physiotherapy, Sports Rehabilitation specialization</p>
            </li>
            <li>
              <p className="font-medium text-[var(--ink)]">15+ years in practice</p>
              <p>Clinical experience across sports clinics and hospital rehab units</p>
            </li>
            <li>
              <p className="font-medium text-[var(--ink)]">Certified in manual therapy</p>
              <p>Ongoing training in evidence-based rehabilitation techniques</p>
            </li>
          </ul>
        </div>
      </div>

      <div className="mt-20 grid gap-8 border-t border-[var(--line)] pt-16 md:grid-cols-3">
        <div>
          <p className="font-display text-3xl text-[var(--accent)]">1,200+</p>
          <p className="mt-2 text-[15px] text-[var(--ink-soft)]">Patients treated</p>
        </div>
        <div>
          <p className="font-display text-3xl text-[var(--accent)]">15</p>
          <p className="mt-2 text-[15px] text-[var(--ink-soft)]">Years in practice</p>
        </div>
        <div>
          <p className="font-display text-3xl text-[var(--accent)]">1:1</p>
          <p className="mt-2 text-[15px] text-[var(--ink-soft)]">Every session, one patient</p>
        </div>
      </div>
    </div>
  );
}
