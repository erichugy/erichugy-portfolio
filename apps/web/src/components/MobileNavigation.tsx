"use client";

import { useState, useCallback, useRef, useEffect } from "react";
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
  const buttonRef = useRef<HTMLButtonElement>(null);

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
    // Return focus to button
    setTimeout(() => buttonRef.current?.focus(), 0);
  }, []);

  /**
   * Close menu when a link is clicked
   */
  const handleLinkClick = useCallback(() => {
    setIsOpen(false);
  }, []);

  /**
   * Handle Escape key to close menu
   */
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        closeMenu();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
    };
  }, [isOpen, closeMenu]);

  /**
   * Determine if a link is active based on current pathname
   */
  const isLinkActive = useCallback(
    (href: string): boolean => {
      // Handle hash links: treat "/#contact" as active when on home (/)
      if (href.startsWith("/#")) {
        return pathname === "/";
      }
      return pathname === href;
    },
    [pathname]
  );

  return (
    <>
      {/* Floating hamburger button - only visible on mobile (md:hidden) */}
      <button
        type="button"
        ref={buttonRef}
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

      {/* Modal backdrop and container - z-index structured to allow backdrop clicks */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/30 dark:bg-black/50 flex flex-col items-end md:hidden"
          onClick={closeMenu}
          aria-hidden="true"
        >
          {/* Navigation modal - menu content positioned above backdrop */}
          <div
            role="dialog"
            aria-modal="true"
            aria-label="Navigation menu"
            className="relative z-50 w-full rounded-tl-3xl rounded-tr-3xl
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
