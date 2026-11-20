import Link from "next/link"
import { Search } from "lucide-react"

import { buttonVariants } from "@/components/ui/button"
import { Brand } from "./brand"
import { MainNav } from "./main-nav"
import { MobileNav } from "./mobile-nav"

function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-white/8 bg-black/80 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.04)] backdrop-blur-xl">
      <div className="mx-auto flex h-16 w-full max-w-7xl items-center gap-4 px-4 sm:px-6 lg:px-8">
        <Brand />

        <MainNav className="ml-6" />

        <div className="ml-auto flex items-center gap-1 sm:gap-2">
          <Link
            href="/equipment"
            aria-label="Search equipment"
            className={buttonVariants({
              variant: "ghost",
              size: "icon-lg",
              className: "text-white/60 hover:bg-white/10 hover:text-white",
            })}
          >
            <Search />
          </Link>

          <span
            aria-hidden="true"
            className="mx-1 hidden h-5 w-px bg-white/10 sm:block"
          />

          <Link
            href="/login"
            className={buttonVariants({
              variant: "ghost",
              size: "lg",
              className:
                "hidden h-9 px-3 text-sm text-white/65 hover:bg-white/10 hover:text-white sm:inline-flex",
            })}
          >
            Login
          </Link>

          <Link
            href="/register"
            className={buttonVariants({
              size: "lg",
              className:
                "hidden h-9 rounded-xl bg-white px-4 text-sm font-semibold text-black shadow-sm hover:bg-white/90 sm:inline-flex",
            })}
          >
            Register
          </Link>

          <MobileNav />
        </div>
      </div>
    </header>
  )
}

export { SiteHeader }
