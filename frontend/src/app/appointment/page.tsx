import Arc from "@/components/Arc";
import AppointmentForm from "@/components/AppointmentForm";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Book an Appointment — Meridian Physiotherapy",
};

export default function AppointmentPage() {
  return (
    <div className="mx-auto max-w-2xl px-6 py-16 md:py-24">
      <Arc className="mb-6 h-6 w-12" />
      <h1 className="font-display text-4xl text-[var(--ink)] md:text-5xl">
        Book an appointment
      </h1>
      <p className="mt-4 text-[17px] leading-relaxed text-[var(--ink-soft)]">
        Fill in your details below. We&apos;ll save your request and confirm your
        slot on WhatsApp the same day.
      </p>

      <div className="mt-10">
        <AppointmentForm />
      </div>
    </div>
  );
}
