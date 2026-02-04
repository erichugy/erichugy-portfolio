import Image from "next/image";
import Link from "next/link";
import { NAV_LINKS } from "@/lib/constants";

export default function Navbar() {
  return (
    <nav className="bg-page px-6 py-4">
      <div className="max-w-7xl mx-auto flex items-center justify-between relative">
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
        <ul className="hidden md:flex items-center gap-8 absolute left-1/2 -translate-x-1/2">
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

        {/* Empty spacer to maintain layout */}
        <div className="w-[125px]" />
      </div>
    </nav>
  );
}
