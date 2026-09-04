"use client";

import Link from "next/link";
import { Letter3DSwap } from "@/components/motion/letter-3d-swap";
import { ChevronDown } from "lucide-react";
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react';
import { useState } from "react";

const navLinks = [
  { label: "Home", href: "/" },
  { 
    label: "About Us", 
    href: "/about",
    hasDropdown: true,
    dropdownItems: [
      { label: "Services", href: "/services" },
      { label: "Benefits", href: "/benefits" }
    ]
  },
  { label: "Classes", href: "/classes" },
  { label: "Pricing", href: "/pricing" },
  
];

export default function Header() {
  const [hoveredMenu, setHoveredMenu] = useState<string | null>(null);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-transparent">
      <div className="mx-auto max-w-7xl px-6 py-6">
        <nav className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="text-2xl font-light tracking-wide text-white">
            physio-pro
          </Link>

          {/* Navigation Links with 3D Animation */}
          <div className="hidden items-center gap-8 md:flex">
            {navLinks.map((link) => (
              <div 
                key={link.label} 
                className="relative"
                onMouseEnter={() => link.hasDropdown && setHoveredMenu(link.label)}
                onMouseLeave={() => setHoveredMenu(null)}
              >
                {link.hasDropdown ? (
                  <Menu>
                    {({ open }) => (
                      <>
                        <MenuButton className="flex items-center gap-1 group">
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
                          <ChevronDown className={`h-4 w-4 text-white transition-transform duration-300 ${hoveredMenu === link.label ? 'rotate-180' : ''}`} />
                        </MenuButton>

                        <MenuItems
                          static
                          className={`absolute top-full left-0 mt-2 w-48 origin-top-left rounded-lg border border-white/10 bg-white/95 backdrop-blur-sm p-1 text-sm shadow-lg transition-all duration-200 ease-out focus:outline-none ${
                            hoveredMenu === link.label 
                              ? 'opacity-100 scale-100 visible' 
                              : 'opacity-0 scale-95 invisible pointer-events-none'
                          }`}
                        >
                          {link.dropdownItems?.map((item) => (
                            <MenuItem key={item.label}>
                              <Link
                                href={item.href}
                                className="group flex w-full items-center gap-2 rounded-lg px-3 py-2 font-semibold text-[var(--ink)] data-[focus]:bg-[var(--accent-light)] hover:bg-[var(--accent-light)] transition-colors"
                              >
                                {item.label}
                              </Link>
                            </MenuItem>
                          ))}
                        </MenuItems>
                      </>
                    )}
                  </Menu>
                ) : (
                  <Link href={link.href}>
                    <Letter3DSwap
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
                )}
              </div>
            ))}
          </div>

          {/* Contact Button */}
          <Link
            href="/contact"
            className="rounded-full bg-white px-6 py-2.5 text-sm font-medium text-[var(--ink)] transition-opacity hover:opacity-90"
          >
            Contact Us
          </Link>
        </nav>
      </div>
    </header>
  );
}
