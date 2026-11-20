export type NavItem = {
  label: string
  href: string
}

export const navItems: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "All Equipment", href: "/equipment" },
  { label: "How it works", href: "/how-it-works" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
]

/**
 * Matches the current pathname against a nav href so nested routes
 * (e.g. /equipment/excavator) keep their parent link highlighted.
 */
export function isActivePath(pathname: string, href: string) {
  if (href === "/") {
    return pathname === "/"
  }

  return pathname === href || pathname.startsWith(`${href}/`)
}
