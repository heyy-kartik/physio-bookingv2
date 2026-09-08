import Arc from "@/components/Arc";
import FadeUp from "@/components/FadeUp";
import type { Metadata } from "next";
import BookingButton from "@/components/BookingButton";

export const metadata: Metadata = {
  title: "Contact — Meridian Physiotherapy",
};

export default function ContactPage() {
  return (
    <div className="mx-auto max-w-6xl px-6 py-24 md:py-28">
      <FadeUp>
        <div>
          <Arc className="mb-6 h-6 w-12" />
          <h1 className="font-display text-3xl text-[var(--ink)] sm:text-4xl md:text-5xl">Contact us</h1>
          <p className="mt-4 max-w-md text-[17px] leading-relaxed text-[var(--ink-soft)]">
            Have a question before booking? Reach out directly, or send an
            appointment request and we&apos;ll confirm on WhatsApp.
          </p>
        </div>
      </FadeUp>

      <div className="mt-12 grid gap-6 md:mt-14 md:grid-cols-2 md:gap-8">
        <FadeUp>
          <div className="h-full rounded-2xl border border-[var(--line)] bg-[var(--surface)] p-6 sm:p-8">
            <p className="text-sm font-medium text-[var(--sage)]">Clinic details</p>
            <ul className="mt-4 space-y-4 text-[15px] text-[var(--ink-soft)]">
              <li>
                <p className="font-medium text-[var(--ink)]">Address</p>
                <p>123 Wellness Road, Nashik, Maharashtra</p>
              </li>
              <li>
                <p className="font-medium text-[var(--ink)]">Phone / WhatsApp</p>
                <a href="tel:+919999999999" className="break-all hover:text-[var(--ink)]">+91 99999 99999</a>
              </li>
              <li>
                <p className="font-medium text-[var(--ink)]">Email</p>
                <a href="mailto:hello@meridianphysio.example" className="break-all hover:text-[var(--ink)]">
                  hello@meridianphysio.example
                </a>
              </li>
              <li>
                <p className="font-medium text-[var(--ink)]">Hours</p>
                <p>Monday–Saturday, 9:00 AM – 7:00 PM</p>
              </li>
            </ul>
          </div>
        </FadeUp>

        <FadeUp delay={0.15}>
          <div className="h-full rounded-2xl border border-[var(--line)] bg-[var(--ink)] p-6 text-white sm:p-8">
            <p className="font-display text-xl">Prefer to just book?</p>
            <p className="mt-2 max-w-sm text-[15px] text-white/80">
              Skip the back-and-forth — fill out the appointment form and
              we&apos;ll confirm your slot on WhatsApp the same day.
            </p>
            <div className="mt-6">
              <BookingButton />
            </div>
          </div>
        </FadeUp>
      </div>
    </div>
  );
}
