"use client";

import { useState } from "react";
import { motion } from "motion/react";
import { Plus } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

interface ServiceItem {
  id: string;
  number: string;
  title: string;
  detail: string;
}

interface PhysiotherapyServicesAccordionProps {
  services: ServiceItem[];
}

const PhysiotherapyServicesAccordion = ({ services }: PhysiotherapyServicesAccordionProps) => {
  const [openItems, setOpenItems] = useState<string[]>([services[0]?.id || ""]);
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  return (
    <div className="w-full">
      <Accordion
        value={openItems}
        onValueChange={setOpenItems}
        className="w-full"
      >
        {services.map((service) => {
          const isActive = openItems.includes(service.id);
          const isHovered = hoveredId === service.id;

          return (
            <AccordionItem
              key={service.id}
              value={service.id}
              className="relative border-none not-last:border-none"
              onMouseEnter={() => setHoveredId(service.id)}
              onMouseLeave={() => setHoveredId(null)}
            >
              <AccordionTrigger className="hover:no-underline **:data-[slot=accordion-trigger-icon]:hidden px-1 py-6 cursor-pointer">
                <div className="flex items-center gap-6 w-full">
                  {/* Number bubble */}
                  <div className="relative flex h-12 w-12 items-center justify-center shrink-0">
                    <motion.div
                      className="absolute inset-0 rounded-full bg-[var(--accent)]"
                      initial={false}
                      animate={{
                        scale: isActive ? 1 : isHovered ? 0.85 : 0,
                        opacity: isActive ? 1 : isHovered ? 0.1 : 0,
                      }}
                      transition={{ type: "spring", stiffness: 400, damping: 25 }}
                    />
                    <motion.span
                      className="relative z-10 text-sm font-medium tracking-wide"
                      animate={{
                        color: isActive
                          ? "white"
                          : "var(--ink-soft)",
                      }}
                      transition={{ duration: 0.2 }}
                    >
                      {service.number}
                    </motion.span>
                  </div>

                  {/* Title */}
                  <motion.span
                    className="text-lg font-display font-medium text-left"
                    animate={{
                      x: isActive || isHovered ? 4 : 0,
                      color:
                        isActive || isHovered
                          ? "var(--ink)"
                          : "var(--ink-soft)",
                    }}
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  >
                    {service.title}
                  </motion.span>

                  {/* Plus / X icon */}
                  <motion.div
                    className="ml-auto flex h-8 w-8 items-center justify-center shrink-0"
                    animate={{
                      rotate: isActive ? 45 : 0,
                      opacity: isActive || isHovered ? 1 : 0.4,
                    }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  >
                    <Plus className="size-5 text-[var(--accent)]" />
                  </motion.div>
                </div>
              </AccordionTrigger>

              <AccordionContent className="pl-18 pr-4 pb-6 text-[15px] text-[var(--ink-soft)] leading-relaxed">
                {service.detail}
              </AccordionContent>

              {/* Static border */}
              <div className="absolute bottom-0 left-0 right-0 h-px bg-[var(--line)]" />

              {/* Animated active/hover line */}
              <motion.div
                className="absolute bottom-0 left-0 h-px origin-left bg-[var(--accent)]"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: isActive ? 1 : isHovered ? 0.3 : 0 }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
              />
            </AccordionItem>
          );
        })}
      </Accordion>
    </div>
  );
};

export default PhysiotherapyServicesAccordion;