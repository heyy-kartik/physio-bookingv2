import Arc from "@/components/Arc";
import FaqItem from "@/components/FaqItem";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "FAQ — Meridian Physiotherapy",
};

const faqs = [
  {
    q: "Do I need a doctor's referral?",
    a: "No referral is required. You can book directly, and we'll assess whether a referral to a specialist is needed after your first session.",
  },
  {
    q: "What should I bring to my first appointment?",
    a: "Comfortable clothing you can move in, any recent scans or reports if you have them, and a list of current medications.",
  },
  {
    q: "How long is a typical session?",
    a: "Initial assessments run about 45–60 minutes. Follow-up sessions are usually 30–45 minutes, depending on your treatment plan.",
  },
  {
    q: "Do you accept insurance?",
    a: "We provide detailed receipts you can submit to your insurer for reimbursement. Ask us about your specific plan when you book.",
  },
  {
    q: "How many sessions will I need?",
    a: "It depends on the condition. Most patients see meaningful progress within 4–6 sessions, and we'll give you a realistic estimate after your first visit.",
  },
  {
    q: "Can I cancel or reschedule?",
    a: "Yes — message us on WhatsApp at least 24 hours ahead and we'll find a new time that works.",
  },
];

export default function FaqPage() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-16 md:py-24">
      <Arc className="mb-6 h-6 w-12" />
      <h1 className="font-display text-4xl text-[var(--ink)] md:text-5xl">
        Frequently asked questions
      </h1>
      <div className="mt-10 border-t border-[var(--line)]">
        {faqs.map((f) => (
          <FaqItem key={f.q} question={f.q} answer={f.a} />
        ))}
      </div>
    </div>
  );
}
