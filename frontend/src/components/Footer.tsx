import FooterTop from "./FooterTop";
import FooterColumns from "./FooterColumns";
import BackToTop from "./BackToTop";

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer
      data-testid="site-footer"
      className="relative overflow-hidden border-t border-[var(--line)] bg-[var(--surface)]"
    >
      <FooterTop />

      <div className="mx-auto max-w-6xl px-6">
        <div className="h-px w-full bg-[var(--line)]" />
      </div>

      <FooterColumns />

      <div className="mx-auto max-w-6xl px-6">
        <div
          data-testid="footer-bottom-bar"
          className="flex flex-col gap-4 border-t border-[var(--line)] py-6 text-xs text-[var(--ink-soft)] sm:flex-row sm:items-center sm:justify-between"
        >
          <p data-testid="footer-copyright">
            © {year} Meridian Physiotherapy. All rights reserved.
          </p>
          <div className="flex items-center gap-5">
            <span className="hidden sm:inline">Made with care in Nashik</span>
            <BackToTop />
          </div>
        </div>
      </div>

      <div aria-hidden="true" className="pointer-events-none select-none overflow-hidden">
        <p className="mx-auto max-w-6xl translate-y-[26%] px-6 font-display text-[clamp(5rem,17vw,15.5rem)] font-semibold leading-[0.78] tracking-[-0.05em] text-[var(--accent-light)]">
          Meridian
        </p>
      </div>
    </footer>
  );
}
