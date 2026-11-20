"use client"

import Image from "next/image"
import Link from "next/link"
import { motion, useReducedMotion, type Variants } from "framer-motion"
import { cn } from "cn"
import {
  ArrowRight,
  CalendarDays,
  CreditCard,
  ShieldCheck,
  Star,
  Truck,
} from "lucide-react"

import { buttonVariants } from "@/components/ui/button"

const stats = [
  { label: "Listings live", value: "1,200+" },
  { label: "Rentals completed", value: "8,400" },
  { label: "On-time handover", value: "98%" },
  { label: "Average rating", value: "4.9/5" },
]

const container: Variants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.07, delayChildren: 0.05 },
  },
}

function Hero() {
  const shouldReduceMotion = useReducedMotion()

  const fadeUp: Variants = shouldReduceMotion
    ? {
        hidden: { opacity: 0 },
        show: { opacity: 1, transition: { duration: 0.2 } },
      }
    : {
        hidden: { opacity: 0, y: 20 },
        show: {
          opacity: 1,
          y: 0,
          transition: { duration: 0.6, ease: "easeOut" },
        },
      }

  return (
    <section className="relative isolate overflow-hidden bg-black text-white">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10"
      >
        <div
          className="absolute inset-0 opacity-40"
          style={{
            backgroundImage:
              "linear-gradient(to right, rgba(255,255,255,0.06) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.06) 1px, transparent 1px)",
            backgroundSize: "72px 72px",
            maskImage:
              "radial-gradient(ellipse 70% 60% at 50% 0%, black 20%, transparent 100%)",
            WebkitMaskImage:
              "radial-gradient(ellipse 70% 60% at 50% 0%, black 20%, transparent 100%)",
          }}
        />
        <div className="absolute -top-52 left-1/2 size-168 -translate-x-1/2 rounded-full bg-white/6 blur-3xl" />
      </div>

      <div className="mx-auto w-full max-w-7xl px-4 pt-14 pb-16 sm:px-6 sm:pt-20 lg:px-8 lg:pt-24 lg:pb-20">
        <div className="grid items-center gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">
          <motion.div variants={container} initial="hidden" animate="show">
            <motion.p
              variants={fadeUp}
              className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/4 py-1.5 pr-3.5 pl-2.5 text-[11px] font-medium tracking-[0.16em] text-white/55 uppercase"
            >
              <span className="relative flex size-2 items-center justify-center">
                <span className="absolute size-2 animate-ping rounded-full bg-emerald-400/60" />
                <span className="relative size-1.5 rounded-full bg-emerald-400" />
              </span>
              Peer-to-peer equipment rental
            </motion.p>

            <motion.h1
              variants={fadeUp}
              className="mt-7 text-4xl leading-[1.04] font-semibold tracking-[-0.03em] text-balance sm:text-6xl lg:text-[4.1rem]"
            >
              Heavy equipment.
              <span className="block text-white/35">Light commitment.</span>
            </motion.h1>

            <motion.p
              variants={fadeUp}
              className="mt-6 max-w-lg text-[15px] leading-relaxed text-white/55 sm:text-base"
            >
              Rent excavators, cameras, vehicles and event gear from verified
              owners — by the day, week or month. Transparent pricing, secure
              Stripe checkout, and no long-term contracts.
            </motion.p>

            <motion.div
              variants={fadeUp}
              className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center"
            >
              <Link
                href="/equipment"
                className={cn(
                  buttonVariants({
                    size: "lg",
                    className:
                      "group h-11 rounded-xl bg-white px-5 text-sm font-semibold text-black shadow-lg shadow-white/5 hover:bg-white/90",
                  })
                )}
              >
                Browse equipment
                <ArrowRight
                  aria-hidden="true"
                  className="size-4 transition-transform duration-200 group-hover:translate-x-0.5"
                />
              </Link>
              <Link
                href="/signup"
                className={cn(
                  buttonVariants({
                    variant: "outline",
                    size: "lg",
                    className:
                      "h-11 rounded-xl border-white/15 bg-transparent px-5 text-sm text-white hover:bg-white/10 hover:text-white",
                  })
                )}
              >
                List your equipment
              </Link>
            </motion.div>

            <motion.ul
              variants={fadeUp}
              className="mt-8 flex flex-wrap items-center gap-x-5 gap-y-2.5 text-[13px] text-white/45"
            >
              <li className="inline-flex items-center gap-1.5">
                <ShieldCheck
                  aria-hidden="true"
                  className="size-4 text-white/30"
                />
                Verified owners
              </li>
              <li className="inline-flex items-center gap-1.5">
                <CalendarDays
                  aria-hidden="true"
                  className="size-4 text-white/30"
                />
                Flexible dates
              </li>
              <li className="inline-flex items-center gap-1.5">
                <CreditCard
                  aria-hidden="true"
                  className="size-4 text-white/30"
                />
                Secure payments
              </li>
            </motion.ul>
          </motion.div>

          <motion.div
            initial={
              shouldReduceMotion ? { opacity: 0 } : { opacity: 0, scale: 0.97 }
            }
            animate={
              shouldReduceMotion ? { opacity: 1 } : { opacity: 1, scale: 1 }
            }
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.12 }}
            className="relative"
          >
            <div className="relative overflow-hidden rounded-[1.6rem] border border-white/10 bg-white/5 shadow-[0_30px_80px_-24px_rgba(0,0,0,0.9)]">
              <Image
                src="/images/hero-equipment.jpg"
                alt="Excavators and earthmovers working on a construction site"
                width={1600}
                height={1200}
                priority
                sizes="(min-width: 1024px) 46vw, 100vw"
                className="h-auto w-full object-cover"
              />
              <div className="absolute inset-0 bg-linear-to-t from-black/85 via-black/10 to-black/25" />

              <div className="absolute inset-x-3 bottom-3 flex items-center gap-3 rounded-2xl border border-white/10 bg-black/60 p-3 backdrop-blur-md sm:inset-x-5 sm:bottom-5 sm:p-4">
                <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-white/10 text-white/80 sm:size-11">
                  <Truck aria-hidden="true" className="size-5" />
                </span>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-medium text-white">
                    20-ton crawler excavator
                  </p>
                  <p className="mt-0.5 truncate text-xs text-white/45">
                    Dhaka · Verified owner
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-semibold whitespace-nowrap text-white">
                    ৳15,000
                  </p>
                  <p className="text-[11px] text-white/45">per day</p>
                </div>
              </div>
            </div>

            <div className="absolute -top-3 right-4 rounded-2xl border border-white/10 bg-black/80 px-3.5 py-2 text-center backdrop-blur-md sm:-top-4 sm:right-6">
              <p className="flex items-center justify-center gap-1 text-sm font-semibold text-white">
                <Star aria-hidden="true" className="size-3.5 fill-white" />
                4.9
              </p>
              <p className="mt-0.5 text-[10px] tracking-[0.12em] text-white/40 uppercase">
                1.8k reviews
              </p>
            </div>
          </motion.div>
        </div>

        <motion.dl
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          className="mt-14 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-white/10 bg-white/10 sm:mt-16 sm:grid-cols-4"
        >
          {stats.map((stat) => (
            <motion.div
              key={stat.label}
              variants={fadeUp}
              className="bg-black px-4 py-5 sm:px-5 sm:py-6"
            >
              <dt className="text-[11px] font-medium tracking-[0.14em] text-white/35 uppercase">
                {stat.label}
              </dt>
              <dd className="mt-2 text-2xl font-semibold tracking-tight text-white">
                {stat.value}
              </dd>
            </motion.div>
          ))}
        </motion.dl>
      </div>
    </section>
  )
}

export { Hero }
