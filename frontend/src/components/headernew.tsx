"use client";
import Link from "next/link";
import React from "react";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";

const menuItems = [
  { name: "Services", href: "/services" },
  { name: "About", href: "/about" },
  { name: "FAQ", href: "/faq" },
  { name: "Contact", href: "/contact" },
];

const Header = () => {
  const [menuState, setMenuState] = React.useState(false);
  const [isScrolled, setIsScrolled] = React.useState(false);

  React.useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className="relative z-50">
      <nav className="fixed inset-x-0 top-0 z-50 px-3 pt-3">
        <div
          className={cn(
            "mx-auto max-w-6xl rounded-full border border-[var(--line)] bg-[var(--surface)]/90 px-4 transition-all duration-300 backdrop-blur-md md:px-6",
            isScrolled && "shadow-sm shadow-[rgba(15,23,42,0.06)]",
          )}
        >
          <div className="flex items-center justify-between gap-4 py-3 md:py-4">
            <Link
              href="/"
              aria-label="Meridian Physiotherapy home"
              className="flex items-center gap-3"
            >
              <Logo />
              <div className="leading-none">
                <div className="font-display text-base text-[var(--ink)] md:text-lg">
                  Meridian
                </div>
                <div className="text-[10px] uppercase tracking-[0.24em] text-[var(--ink-soft)]">
                  Physiotherapy
                </div>
              </div>
            </Link>

            <div className="hidden items-center gap-7 md:flex">
              {menuItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="text-sm font-medium text-[var(--ink-soft)] transition-colors hover:text-[var(--ink)]"
                >
                  {item.name}
                </Link>
              ))}
            </div>

            <div className="hidden items-center md:flex">
              <Link
                href="/appointment"
                className="rounded-full bg-[var(--accent)] px-5 py-2.5 text-sm font-medium text-white transition-opacity hover:opacity-90"
              >
                Book a session
              </Link>
            </div>

            <button
              type="button"
              onClick={() => setMenuState((value) => !value)}
              aria-label={menuState ? "Close menu" : "Open menu"}
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-[var(--line)] bg-[var(--surface)] text-[var(--ink)] md:hidden"
            >
              {menuState ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </button>
          </div>

          {menuState && (
            <div className="border-t border-[var(--line)] pb-4 pt-4 md:hidden">
              <div className="flex flex-col gap-3">
                {menuItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setMenuState(false)}
                    className="text-base font-medium text-[var(--ink-soft)] transition-colors hover:text-[var(--ink)]"
                  >
                    {item.name}
                  </Link>
                ))}
                <Link
                  href="/appointment"
                  onClick={() => setMenuState(false)}
                  className="mt-2 inline-flex items-center justify-center rounded-full bg-[var(--accent)] px-5 py-3 text-sm font-medium text-white"
                >
                  Book a session
                </Link>
              </div>
            </div>
          )}
        </div>
      </nav>
    </header>
  );
};

export const HeroHeader = Header;
export default Header;

const Logo = ({ className }: { className?: string }) => {
  return (
    <div
      className={cn(
        "flex h-10 w-10 items-center justify-center rounded-full bg-[var(--ink)] text-sm font-semibold text-white",
        className,
      )}
      aria-hidden="true"
    >
      M
    </div>
  );
};
