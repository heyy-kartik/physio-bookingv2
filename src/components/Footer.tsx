import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-[var(--line)] bg-[var(--surface)]">
      <div className="mx-auto grid max-w-6xl gap-10 px-6 py-14 md:grid-cols-3">
        <div>
          <p className="font-display text-lg text-[var(--ink)]">Meridian Physiotherapy</p>
          <p className="mt-3 max-w-xs text-sm leading-relaxed text-[var(--ink-soft)]">
            One-on-one physiotherapy for pain relief, injury recovery, and
            getting back to full movement.
          </p>
        </div>
        <div>
          <p className="text-sm font-medium text-[var(--ink)]">Clinic</p>
          <ul className="mt-3 space-y-2 text-sm text-[var(--ink-soft)]">
            <li>123 Wellness Road, Nashik, Maharashtra</li>
            <li>Mon–Sat, 9:00 AM – 7:00 PM</li>
            <li>
              <a href="tel:+919999999999" className="hover:text-[var(--ink)]">
                +91 99999 99999
              </a>
            </li>
          </ul>
        </div>
        <div>
          <p className="text-sm font-medium text-[var(--ink)]">Site</p>
          <ul className="mt-3 space-y-2 text-sm text-[var(--ink-soft)]">
            <li><Link href="/appointment" className="hover:text-[var(--ink)]">Book a session</Link></li>
            <li><Link href="/faq" className="hover:text-[var(--ink)]">FAQ</Link></li>
            <li><Link href="/privacy" className="hover:text-[var(--ink)]">Privacy consent</Link></li>
          </ul>
        </div>
      </div>
      <div className="border-t border-[var(--line)] px-6 py-5 text-center text-xs text-[var(--ink-soft)]">
        © {new Date().getFullYear()} Meridian Physiotherapy. All rights reserved.
      </div>
    </footer>
  );
}
