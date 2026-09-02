import Arc from "@/components/Arc";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Consent — Meridian Physiotherapy",
};

export default function PrivacyPage() {
  return (
    <div className="mx-auto max-w-2xl px-6 py-16 md:py-24">
      <Arc className="mb-6 h-6 w-12" />
      <h1 className="font-display text-4xl text-[var(--ink)] md:text-5xl">
        Privacy & consent
      </h1>
      <p className="mt-4 text-[15px] text-[var(--ink-soft)]">Last updated: September 2026</p>

      <div className="mt-10 space-y-8 text-[15px] leading-relaxed text-[var(--ink-soft)]">
        <div>
          <h2 className="font-display text-xl text-[var(--ink)]">What we collect</h2>
          <p className="mt-2">
            When you book an appointment, we collect your name, phone number,
            email (if provided), the service you&apos;re requesting, and your
            preferred date and time. If you leave a note, that&apos;s stored too.
          </p>
        </div>

        <div>
          <h2 className="font-display text-xl text-[var(--ink)]">How we use it</h2>
          <p className="mt-2">
            Your details are used only to confirm and manage your
            appointment, and to contact you about your treatment. Your
            appointment request is sent to the clinic&apos;s WhatsApp so we can
            confirm your slot quickly.
          </p>
        </div>

        <div>
          <h2 className="font-display text-xl text-[var(--ink)]">How it&apos;s stored</h2>
          <p className="mt-2">
            Appointment details are stored securely and are only accessible
            to clinic staff. We don&apos;t sell or share your information with
            third parties for marketing.
          </p>
        </div>

        <div>
          <h2 className="font-display text-xl text-[var(--ink)]">Your rights</h2>
          <p className="mt-2">
            You can ask us to update or delete your information at any time
            by contacting the clinic directly.
          </p>
        </div>

        <div>
          <h2 className="font-display text-xl text-[var(--ink)]">Consent</h2>
          <p className="mt-2">
            By submitting the appointment form, you consent to Meridian
            Physiotherapy collecting and using your information as described
            above, for the purpose of scheduling and providing your care.
          </p>
        </div>
      </div>
    </div>
  );
}
