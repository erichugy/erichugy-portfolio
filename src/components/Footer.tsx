import Image from "next/image";
import Link from "next/link";
import { NAV_LINKS, SOCIAL_LINKS } from "@/lib/constants";

export default function Footer() {
  return (
    <footer className="bg-page border-t border-border">
      <div className="max-w-7xl mx-auto px-6 py-8 md:py-12">
        {/* Main Footer Content */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 md:gap-8 mb-8">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <Image
              src="/logo.png"
              alt="Logo"
              width={40}
              height={40}
              className="rounded"
            />
          </Link>

          {/* Navigation Links */}
          <nav>
            <ul className="flex flex-wrap items-center justify-center gap-4 md:gap-8">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-body hover:text-heading transition-colors text-sm md:text-base"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Social Media Icons */}
          <div className="flex items-center gap-4">
            {SOCIAL_LINKS.map((social) => (
              <a
                key={social.name}
                href={social.href}
                aria-label={social.name}
                className="text-accent hover:text-accent-hover transition-colors"
              >
                {/* Placeholder for social icons - using text for now */}
                <span className="text-xl font-semibold">
                  {social.icon === "in" ? "in" : "𝕏"}
                </span>
              </a>
            ))}
          </div>
        </div>

        {/* Copyright */}
        <div className="text-center pt-6 border-t border-border">
          <p className="text-muted text-sm">
            © 2024 Eric Huang. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
