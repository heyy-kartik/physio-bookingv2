"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ChevronDown, Menu, X } from "lucide-react";
import { Letter3DSwap } from "@/components/motion/letter-3d-swap";
import { cn } from "@/lib/utils";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Services", href: "/services" },
  { label: "FAQ", href: "/faq" },
  { label: "Contact", href: "/contact" },
];

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();

  // Close the mobile menu whenever the route changes.
  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  // Lock body scroll while the mobile menu is open.
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <nav
          className={cn(
            "mt-3 flex items-center justify-between gap-4 rounded-2xl border px-4 py-3 transition-all duration-300 md:mt-4 md:px-6",
            isScrolled
              ? "border-white/10 bg-[var(--ink)]/85 shadow-lg shadow-black/20 backdrop-blur-md"
              : "border-transparent bg-transparent"
          )}
        >
          {/* Logo */}
          <Link
            href="/"
            className="text-xl font-light tracking-wide text-white sm:text-2xl"
            aria-label="physio-pro home"
          >
            physio-pro
          </Link>

          {/* Desktop nav links with 3D letter swap */}
          <div className="hidden items-center gap-8 lg:flex">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className={cn(
                  "text-lg font-medium transition-colors",
                  pathname === link.href ? "text-white" : "text-white/90 hover:text-white"
                )}
              >
                <Letter3DSwap
                  as="span"
                  frontFaceClassName="text-white"
                  mainClassName="cursor-pointer text-lg font-medium hover:text-white"
                  rotateDirection="top"
                  secondFaceClassName="text-white"
                  staggerDuration={0.04}
                  transition={{ damping: 28, stiffness: 320, type: "spring" }}
                >
                  {link.label}
                </Letter3DSwap>
              </Link>
            ))}
          </div>

          {/* Desktop contact button */}
          <Link
            href="/contact"
            className="hidden rounded-full bg-white px-6 py-2.5 text-sm font-medium text-[var(--ink)] transition-opacity hover:opacity-90 lg:inline-flex"
          >
            Contact Us
          </Link>

          {/* Mobile hamburger button */}
          <button
            type="button"
            onClick={() => setMenuOpen((v) => !v)}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            aria-controls="mobile-nav"
            className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/25 bg-white/10 text-white backdrop-blur-sm transition-colors hover:bg-white/20 lg:hidden"
          >
            {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </nav>
      </div>

      {/* Mobile menu overlay */}
      <AnimatePresence>
        {menuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              key="backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm lg:hidden"
              onClick={() => setMenuOpen(false)}
            />

            {/* Slide-down panel */}
            <motion.div
              key="panel"
              id="mobile-nav"
              initial={{ opacity: 0, y: -16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="fixed inset-x-3 top-[76px] z-50 overflow-hidden rounded-2xl border border-white/10 bg-[var(--ink)]/95 p-6 shadow-2xl backdrop-blur-xl lg:hidden"
            >
              <div className="flex flex-col gap-1">
                {navLinks.map((link, i) => (
                  <motion.div
                    key={link.label}
                    initial={{ opacity: 0, x: -12 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.06 + i * 0.05, duration: 0.3 }}
                  >
                    <Link
                      href={link.href}
                      onClick={() => setMenuOpen(false)}
                      className={cn(
                        "flex min-h-12 items-center justify-between rounded-xl px-4 text-lg font-medium transition-colors",
                        pathname === link.href
                          ? "bg-white/10 text-white"
                          : "text-white/85 hover:bg-white/10 hover:text-white"
                      )}
                    >
                      {link.label}
                      <ChevronDown className="h-4 w-4 -rotate-90 text-white/40" />
                    </Link>
                  </motion.div>
                ))}
              </div>

              <Link
                href="/contact"
                onClick={() => setMenuOpen(false)}
                className="mt-4 flex min-h-12 items-center justify-center rounded-full bg-white px-6 text-sm font-medium text-[var(--ink)] transition-opacity hover:opacity-90"
              >
                Contact Us
              </Link>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  );
}
