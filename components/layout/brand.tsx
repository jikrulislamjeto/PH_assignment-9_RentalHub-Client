import Link from "next/link"
import { Boxes } from "lucide-react"
import { cn } from "cn"

function Brand({ className }: { className?: string }) {
  return (
    <Link
      href="/"
      aria-label="RentalHub — home"
      className={cn(
        "group/brand inline-flex shrink-0 items-center gap-2.5 rounded-xl outline-none focus-visible:ring-3 focus-visible:ring-white/30",
        className
      )}
    >
      <span className="grid size-9 shrink-0 place-items-center rounded-[0.7rem] bg-white text-black shadow-[inset_0_-1px_0_0_rgba(0,0,0,0.12)] transition-transform duration-300 group-hover/brand:-rotate-6">
        <Boxes className="size-4.5" strokeWidth={2.25} aria-hidden="true" />
      </span>
      <span className="flex flex-col">
        <span className="text-[15px] leading-none font-semibold tracking-tight text-white">
          Rental<span className="text-white/45">Hub</span>
        </span>
        <span className="mt-1.5 text-[9px] leading-none font-medium tracking-[0.18em] text-white/40 uppercase">
          Equipment rental
        </span>
      </span>
    </Link>
  )
}

export { Brand }
