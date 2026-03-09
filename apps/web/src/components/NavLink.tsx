import Link from "next/link";
import type { ComponentProps } from "react";

type NavLinkProps = ComponentProps<typeof Link>;

/**
 * Next.js <Link> doesn't trigger scroll for same-page hash navigation.
 * This component uses a native <a> for hash hrefs so the browser handles
 * anchor scrolling natively, and <Link> for everything else to preserve
 * client-side routing.
 */
export default function NavLink({ href, ...props }: NavLinkProps) {
  if (typeof href === "string" && href.includes("#")) {
    return <a href={href} {...(props as React.AnchorHTMLAttributes<HTMLAnchorElement>)} />;
  }

  return <Link href={href} {...props} />;
}
