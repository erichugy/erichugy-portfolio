"use client";

import { useState, useCallback } from "react";
import { usePathname } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { NAV_LINKS } from "@/lib/constants";
import ThemeToggle from "./ThemeToggle";

/**
 * MobileNavigation Component
 * Provides a floating glass hamburger menu for mobile navigation
 * Only visible on mobile devices (hidden on md and above)
 */
export default function MobileNavigation() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  /**
   * Toggle menu open/close state
   */
  const toggleMenu = useCallback(() => {
    setIsOpen((prev) => !prev);
  }, []);

  /**
   * Close menu when backdrop is clicked
   */
  const closeMenu = useCallback(() => {
    setIsOpen(false);
  }, []);

  /**
   * Close menu when a link is clicked
   */
  const handleLinkClick = useCallback(() => {
    setIsOpen(false);
  }, []);

  /**
   * Determine if a link is active based on current pathname
   */
  const isLinkActive = useCallback(
    (href: string): boolean => {
      // Exact match for home
      if (href === "/" && pathname === "/") {
        return true;
      }
      // Check if pathname starts with the link href (but not for home)
      if (href !== "/" && pathname.startsWith(href)) {
        return true;
      }
      // Special case for contact anchor
      if (href === "/#contact" && pathname === "/") {
        return false;
      }
      return false;
    },
    [pathname]
  );

  return (
    <>
      {/* Floating hamburger button - only visible on mobile (md:hidden) */}
      <button
        onClick={toggleMenu}
        aria-label="Toggle navigation menu"
        aria-expanded={isOpen}
        className="fixed bottom-6 left-6 z-50 h-12 w-12 rounded-[10px]
          bg-white/70 dark:bg-slate-900/70
          border border-white/20 dark:border-slate-700/50
          backdrop-blur-md
          flex items-center justify-center
          text-heading dark:text-heading
          hover:bg-white/80 dark:hover:bg-slate-900/80
          transition-all duration-200
          md:hidden"
      >
        {/* Hamburger icon */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <line x1="4" y1="6" x2="20" y2="6" />
          <line x1="4" y1="12" x2="20" y2="12" />
          <line x1="4" y1="18" x2="20" y2="18" />
        </svg>
      </button>

      {/* Modal backdrop - semi-transparent, clickable to close */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/30 dark:bg-black/50 z-40 md:hidden"
          onClick={closeMenu}
          aria-hidden="true"
        />
      )}

      {/* Navigation modal - menu content */}
      {isOpen && (
        <div
          role="dialog"
          aria-label="Navigation menu"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 md:hidden
            opacity-0 animate-in fade-in duration-300"
        >
          <div
            className="w-full max-w-sm rounded-2xl
              bg-white/80 dark:bg-slate-900/80
              backdrop-blur-md
              border border-white/20 dark:border-slate-700/50
              p-8
              shadow-lg
              space-y-6
              animate-in fade-in slide-in-from-bottom-4 duration-300"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Logo */}
            <div className="flex justify-center">
              <Image
                src="/logo.png"
                alt="Eric Huang logo"
                width={80}
                height={80}
                className="rounded-lg"
              />
            </div>

            {/* Navigation links */}
            <nav className="space-y-3">
              {NAV_LINKS.map((link) => {
                const active = isLinkActive(link.href);
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={handleLinkClick}
                    className={`block px-4 py-2.5 rounded-lg font-mono text-base font-medium
                      transition-colors duration-200
                      ${
                        active
                          ? "text-accent font-bold bg-accent/10"
                          : "text-body hover:text-heading hover:bg-page/50"
                      }`}
                  >
                    {link.label}
                  </Link>
                );
              })}
            </nav>

            {/* Theme toggle */}
            <div className="flex justify-center border-t border-border/30 dark:border-slate-700/30 pt-4">
              <ThemeToggle />
            </div>
          </div>
        </div>
      )}
    </>
  );
}
