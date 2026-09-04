import Link from "next/link";
import { HeartPulse, MapPin, Phone, Mail, Clock } from "lucide-react";
import { FaInstagram, FaFacebookF, FaLinkedinIn, FaYoutube } from "react-icons/fa6";
import { cn } from "@/lib/utils";

const careLinks = [
  { label: "Services", href: "/services" },
  { label: "How it works", href: "/#booking" },
  { label: "Book a session", href: "/appointment" },
  { label: "FAQs", href: "/faq" },
];

const clinicLinks = [
  { label: "Our approach", href: "/about" },
  { label: "Contact", href: "/contact" },
  { label: "Privacy consent", href: "/privacy" },
];

const socials = [
  { label: "Instagram", href: "https://instagram.com", Icon: FaInstagram },
  { label: "Facebook", href: "https://facebook.com", Icon: FaFacebookF },
  { label: "LinkedIn", href: "https://linkedin.com", Icon: FaLinkedinIn },
  { label: "YouTube", href: "https://youtube.com", Icon: FaYoutube },
];

const linkClass =
  "relative inline-block text-[15px] text-[var(--ink-soft)] transition-colors duration-200 hover:text-[var(--ink)] after:absolute after:-bottom-0.5 after:left-0 after:h-px after:w-full after:origin-left after:scale-x-0 after:bg-[var(--accent)] after:transition-transform after:duration-300 after:ease-out hover:after:scale-x-100";

const headingClass = "text-xs font-semibold uppercase tracking-[0.18em] text-[var(--ink)]";

function LinkColumn({ title, links, testId }: { title: string; links: typeof careLinks; testId: string }) {
  return (
    <div data-testid={testId} className="md:col-span-2">
      <p className={headingClass}>{title}</p>
      <ul className="mt-5 space-y-3">
        {links.map((l) => (
          <li key={l.href}>
            <Link
              href={l.href}
              className={linkClass}
              data-testid={`footer-link-${l.label.toLowerCase().replace(/\s+/g, "-")}`}
            >
              {l.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function FooterColumns() {
  return (
    <div
      data-testid="footer-columns"
      className="mx-auto grid max-w-6xl gap-12 px-6 py-14 md:grid-cols-12 md:gap-8"
    >
      <div className="md:col-span-4" data-testid="footer-brand">
        <Link href="/" aria-label="Meridian Physiotherapy home" className="inline-flex items-center gap-3" data-testid="footer-logo">
          <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[var(--accent)] text-white" aria-hidden="true">
            <HeartPulse className="h-[18px] w-[18px]" strokeWidth={2.25} />
          </span>
          <span className="leading-none">
            <span className="block font-display text-lg font-semibold tracking-[-0.02em] text-[var(--ink)]">Meridian</span>
            <span className="mt-1 block text-[9px] font-semibold uppercase tracking-[0.2em] text-[var(--ink-soft)]">Physiotherapy</span>
          </span>
        </Link>
        <p className="mt-5 max-w-xs text-[15px] leading-relaxed text-[var(--ink-soft)]">
          One-on-one physiotherapy for pain relief, injury recovery, and getting
          back to full movement.
        </p>
        <div className="mt-6 flex items-center gap-2" data-testid="footer-socials">
          {socials.map(({ label, href, Icon }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={label}
              data-testid={`footer-social-${label.toLowerCase()}`}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-[var(--line)] text-[var(--ink-soft)] transition-[background-color,border-color,color,transform] duration-200 hover:-translate-y-0.5 hover:border-[var(--accent)] hover:bg-[var(--accent-light)] hover:text-[var(--accent)]"
            >
              <Icon className="h-4 w-4" />
            </a>
          ))}
        </div>
      </div>

      <LinkColumn title="Care" links={careLinks} testId="footer-care-links" />
      <LinkColumn title="Clinic" links={clinicLinks} testId="footer-clinic-links" />

      <div className="md:col-span-4" data-testid="footer-visit">
        <p className={headingClass}>Visit</p>
        <ul className="mt-5 space-y-4 text-[15px] text-[var(--ink-soft)]">
          <li className="flex gap-3">
            <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-[var(--accent)]" />
            <span data-testid="footer-address">
              123 Wellness Road,
              <br />
              Nashik, Maharashtra 422001
            </span>
          </li>
          <li className="flex gap-3">
            <Clock className="mt-0.5 h-4 w-4 shrink-0 text-[var(--accent)]" />
            <span data-testid="footer-hours">
              Mon–Sat · 9:00 AM – 7:00 PM
              <br />
              <span className="text-xs">Closed on Sundays</span>
            </span>
          </li>
          <li className="flex gap-3">
            <Phone className="mt-0.5 h-4 w-4 shrink-0 text-[var(--accent)]" />
            <a href="tel:+919999999999" className={cn(linkClass, "text-[var(--ink)]")} data-testid="footer-phone">
              +91 99999 99999
            </a>
          </li>
          <li className="flex gap-3">
            <Mail className="mt-0.5 h-4 w-4 shrink-0 text-[var(--accent)]" />
            <a href="mailto:hello@meridianphysio.example" className={cn(linkClass, "text-[var(--ink)]")} data-testid="footer-email">
              hello@meridianphysio.example
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
}
