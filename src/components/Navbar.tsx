import Image from "next/image";
import Link from "next/link";
import { NAV_LINKS } from "@/lib/constants";

export default function Navbar() {
  return (
    <nav className="bg-page px-6 py-4">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center">
          <Image
            src="/logo.png"
            alt="Logo"
            width={125}
            height={125}
            className="rounded"
          />
        </Link>

        {/* Navigation Links */}
        <ul className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className="text-body hover:text-heading transition-colors"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* CTA Button */}
        <button className="bg-accent hover:bg-accent-hover text-white px-6 py-2 rounded-lg transition-colors font-medium">
          Hire Me
        </button>
      </div>
    </nav>
  );
}
