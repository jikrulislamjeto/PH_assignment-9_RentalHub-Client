"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "cn"

import { isActivePath, navItems } from "./nav-config"

function MainNav({ className }: { className?: string }) {
  const pathname = usePathname()

  return (
    <nav aria-label="Main" className={cn("hidden lg:block", className)}>
      <ul className="flex items-center gap-0.5">
        {navItems.map((item) => {
          const active = isActivePath(pathname, item.href)

          return (
            <li key={item.href}>
              <Link
                href={item.href}
                aria-current={active ? "page" : undefined}
                className={cn(
                  "inline-flex items-center rounded-full px-3.5 py-2 text-[13.5px] font-medium transition-colors duration-200 outline-none focus-visible:ring-3 focus-visible:ring-white/25",
                  active
                    ? "bg-white/10 text-white ring-1 ring-white/10 ring-inset"
                    : "text-white/55 hover:bg-white/5 hover:text-white"
                )}
              >
                {item.label}
              </Link>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}

export { MainNav }
