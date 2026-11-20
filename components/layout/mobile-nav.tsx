"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { ChevronRight, Menu, X } from "lucide-react"
import { cn } from "cn"

import { Button, buttonVariants } from "@/components/ui/button"
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { Brand } from "./brand"
import { isActivePath, navItems } from "./nav-config"

function MobileNav() {
  const pathname = usePathname()

  return (
    <Sheet>
      <SheetTrigger
        render={
          <Button
            variant="ghost"
            size="icon-lg"
            aria-label="Open navigation"
            className="-mr-1.5 text-white/70 hover:bg-white/10 hover:text-white lg:hidden"
          />
        }
      >
        <Menu />
      </SheetTrigger>

      <SheetContent
        side="right"
        showCloseButton={false}
        className="gap-0 border-white/10 bg-[#0a0a0a] p-0 text-white data-[side=right]:w-[min(21rem,calc(100vw-3rem))]"
      >
        <SheetHeader className="flex-row items-center justify-between gap-3 border-b border-white/10 px-5 py-4">
          <SheetTitle className="sr-only">Site navigation</SheetTitle>
          <Brand />
          <SheetClose
            render={
              <Button
                variant="ghost"
                size="icon-lg"
                aria-label="Close navigation"
                className="text-white/60 hover:bg-white/10 hover:text-white"
              />
            }
          >
            <X />
          </SheetClose>
        </SheetHeader>

        <nav aria-label="Mobile" className="flex-1 overflow-y-auto px-3 py-4">
          <ul className="flex flex-col gap-1">
            {navItems.map((item) => {
              const active = isActivePath(pathname, item.href)

              return (
                <li key={item.href}>
                  <SheetClose
                    nativeButton={false}
                    render={
                      <Link
                        href={item.href}
                        aria-current={active ? "page" : undefined}
                        className={cn(
                          "group flex items-center justify-between rounded-xl px-4 py-3 text-[15px] font-medium transition-colors outline-none focus-visible:ring-3 focus-visible:ring-white/25",
                          active
                            ? "bg-white/10 text-white"
                            : "text-white/60 hover:bg-white/5 hover:text-white"
                        )}
                      />
                    }
                  >
                    {item.label}
                    <ChevronRight
                      aria-hidden="true"
                      className="size-4 text-white/25 transition-transform duration-200 group-hover:translate-x-0.5"
                    />
                  </SheetClose>
                </li>
              )
            })}
          </ul>
        </nav>

        <SheetFooter className="gap-2 border-t border-white/10 px-5 py-5">
          <SheetClose
            nativeButton={false}
            render={
              <Link
                href="/login"
                className={buttonVariants({
                  variant: "outline",
                  size: "lg",
                  className:
                    "h-11 w-full border-white/15 bg-transparent text-white hover:bg-white/10 hover:text-white",
                })}
              />
            }
          >
            Login
          </SheetClose>
          <SheetClose
            nativeButton={false}
            render={
              <Link
                href="/register"
                className={buttonVariants({
                  size: "lg",
                  className:
                    "h-11 w-full bg-white font-semibold text-black hover:bg-white/90",
                })}
              />
            }
          >
            Register
          </SheetClose>
          <p className="pt-2 text-center text-xs text-white/35">
            Rent smarter. Work better.
          </p>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  )
}

export { MobileNav }
