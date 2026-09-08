"use client";

import { motion } from "motion/react";
import type { ReactNode } from "react";

interface FadeUpProps {
  children: ReactNode;
  className?: string;
  /** Delay before the animation starts, in seconds. */
  delay?: number;
  /** Vertical offset the element rises from, in px. */
  y?: number;
  /** Duration of the animation, in seconds. */
  duration?: number;
  /** Fraction of the element that must be visible before animating. */
  amount?: number;
}

/**
 * Scroll-triggered fade-up reveal powered by motion/react.
 * Animates once when the element enters the viewport.
 */
export default function FadeUp({
  children,
  className,
  delay = 0,
  y = 28,
  duration = 0.7,
  amount = 0.25,
}: FadeUpProps) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount }}
      transition={{ duration, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
}
