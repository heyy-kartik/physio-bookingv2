"use client";

import React, { useLayoutEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { GoArrowUpRight } from "react-icons/go";

type CardNavLink = {
  label: string;
  href: string;
  ariaLabel: string;
};

export type CardNavItem = {
  label: string;
  bgColor: string;
  textColor: string;
  links: CardNavLink[];
};

export interface CardNavProps {
  logo: React.ReactNode;
  logoAlt?: string;
  items: CardNavItem[];
  className?: string;
  ease?: string;
  baseColor?: string;
  menuColor?: string;
  buttonBgColor?: string;
  buttonTextColor?: string;
}

const CardNav: React.FC<CardNavProps> = ({
  logo,
  logoAlt = "Logo",
  items,
  className = "",
  ease = "power3.out",
  baseColor = "var(--surface)",
  menuColor = "var(--ink)",
  buttonBgColor = "var(--accent)",
  buttonTextColor = "var(--accent-ink)",
}) => {
  const [isHamburgerOpen, setIsHamburgerOpen] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const navRef = useRef<HTMLDivElement | null>(null);
  const cardsRef = useRef<HTMLDivElement[]>([]);
  const tlRef = useRef<gsap.core.Timeline | null>(null);

  const calculateHeight = () => {
    const navEl = navRef.current;
    if (!navEl) return 260;

    const isMobile = window.matchMedia("(max-width: 768px)").matches;
    if (isMobile) {
      const contentEl = navEl.querySelector<HTMLElement>(".card-nav-content");
      if (contentEl) {
        const previous = {
          visibility: contentEl.style.visibility,
          pointerEvents: contentEl.style.pointerEvents,
          position: contentEl.style.position,
          height: contentEl.style.height,
        };

        contentEl.style.visibility = "visible";
        contentEl.style.pointerEvents = "auto";
        contentEl.style.position = "static";
        contentEl.style.height = "auto";
        contentEl.offsetHeight;
        const contentHeight = contentEl.scrollHeight;

        contentEl.style.visibility = previous.visibility;
        contentEl.style.pointerEvents = previous.pointerEvents;
        contentEl.style.position = previous.position;
        contentEl.style.height = previous.height;

        return 60 + contentHeight + 16;
      }
    }

    return 260;
  };

  const createTimeline = () => {
    const navEl = navRef.current;
    if (!navEl) return null;

    gsap.set(navEl, { height: 60, overflow: "hidden" });
    gsap.set(cardsRef.current, { y: 32, opacity: 0 });

    return gsap
      .timeline({ paused: true })
      .to(navEl, { height: calculateHeight, duration: 0.4, ease })
      .to(cardsRef.current, { y: 0, opacity: 1, duration: 0.35, ease, stagger: 0.07 }, "-=0.12");
  };

  useLayoutEffect(() => {
    const timeline = createTimeline();
    tlRef.current = timeline;

    return () => {
      timeline?.kill();
      tlRef.current = null;
    };
  }, [ease, items]);

  useLayoutEffect(() => {
    const handleResize = () => {
      const currentTimeline = tlRef.current;
      if (!currentTimeline) return;

      currentTimeline.kill();
      const nextTimeline = createTimeline();
      if (!nextTimeline) return;

      tlRef.current = nextTimeline;
      if (isExpanded) nextTimeline.progress(1);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [isExpanded]);

  const toggleMenu = () => {
    const timeline = tlRef.current;
    if (!timeline) return;

    if (!isExpanded) {
      setIsHamburgerOpen(true);
      setIsExpanded(true);
      timeline.play(0);
      return;
    }

    setIsHamburgerOpen(false);
    timeline.eventCallback("onReverseComplete", () => setIsExpanded(false));
    timeline.reverse();
  };

  const setCardRef = (index: number) => (element: HTMLDivElement | null) => {
    if (element) cardsRef.current[index] = element;
  };

  return (
    <div className={`card-nav-container absolute left-1/2 z-[99] -translate-x-1/2 ${className}`}>
      <nav
        ref={navRef}
        aria-label="Main navigation"
        className={`card-nav relative block h-[60px] overflow-hidden rounded-2xl border border-[var(--line)] p-0 shadow-[0_10px_30px_rgba(15,43,42,0.08)] will-change-[height] ${isExpanded ? "open" : ""}`}
        style={{ backgroundColor: baseColor }}
      >
        <div className="card-nav-top absolute inset-x-0 top-0 z-[2] flex h-[60px] items-center justify-between gap-3 px-3 py-2 md:px-4">
          <button
            type="button"
            onClick={toggleMenu}
            aria-label={isExpanded ? "Close menu" : "Open menu"}
            aria-expanded={isExpanded}
            className="group order-2 flex h-11 w-11 shrink-0 flex-col items-center justify-center gap-[6px] rounded-xl border border-[var(--line)] bg-[var(--surface)] transition-colors hover:border-[var(--accent)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent)] md:order-none md:border-0 md:bg-transparent"
            style={{ color: menuColor }}
          >
            <span className={`h-[2px] w-6 bg-current transition-[transform,opacity] duration-300 ${isHamburgerOpen ? "translate-y-[4px] rotate-45" : ""}`} />
            <span className={`h-[2px] w-6 bg-current transition-[transform,opacity] duration-300 ${isHamburgerOpen ? "-translate-y-[4px] -rotate-45" : ""}`} />
          </button>

          <div className="logo-container order-1 flex min-w-0 items-center md:absolute md:left-1/2 md:top-1/2 md:-translate-x-1/2 md:-translate-y-1/2" aria-label={logoAlt}>
            {logo}
          </div>

          <a
            href="/appointment"
            className="card-nav-cta-button hidden min-h-11 items-center rounded-xl px-4 text-sm font-semibold tracking-[-0.01em] transition-[transform,opacity] duration-200 hover:-translate-y-0.5 hover:opacity-90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent)] md:inline-flex"
            style={{ backgroundColor: buttonBgColor, color: buttonTextColor }}
          >
            Book a session
          </a>
        </div>

        <div
          className={`card-nav-content absolute bottom-0 left-0 right-0 top-[60px] z-[1] flex flex-col items-stretch justify-start gap-2 p-2 md:flex-row md:items-end md:gap-3 ${isExpanded ? "pointer-events-auto visible" : "pointer-events-none invisible"}`}
          aria-hidden={!isExpanded}
        >
          {items.slice(0, 3).map((item, index) => (
            <div
              key={`${item.label}-${index}`}
              ref={setCardRef(index)}
              className="nav-card flex min-h-[76px] min-w-0 flex-[1_1_auto] select-none flex-col gap-2 rounded-xl p-4 md:h-full md:min-h-0 md:flex-[1_1_0%]"
              style={{ backgroundColor: item.bgColor, color: item.textColor }}
            >
              <div className="nav-card-label font-display text-xl font-semibold leading-tight tracking-[-0.025em] md:text-2xl">
                {item.label}
              </div>
              <div className="nav-card-links mt-auto flex flex-col gap-1">
                {item.links.map((link, linkIndex) => (
                  <a
                    key={`${link.label}-${linkIndex}`}
                    className="nav-card-link inline-flex min-h-11 items-center gap-1.5 rounded-lg text-sm font-medium leading-tight no-underline transition-opacity duration-200 hover:opacity-70 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-current md:min-h-8 md:text-[15px]"
                    href={link.href}
                    aria-label={link.ariaLabel}
                  >
                    <GoArrowUpRight className="h-4 w-4 shrink-0" aria-hidden="true" />
                    {link.label}
                  </a>
                ))}
              </div>
            </div>
          ))}
        </div>
      </nav>
    </div>
  );
};

export default CardNav;
