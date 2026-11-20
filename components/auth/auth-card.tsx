"use client"

import * as React from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { Brand } from "@/components/layout/brand"
import { ShieldCheck, Sparkles } from "lucide-react"
import { cn } from "@/lib/utils"

interface AuthCardProps {
  mode: "signin" | "signup"
  title: string
  subtitle: string
  children: React.ReactNode
}

export function AuthCard({ mode, title, subtitle, children }: AuthCardProps) {
  return (
    <div className="relative isolate min-h-[calc(100svh-4rem)] flex items-center justify-center overflow-hidden bg-black px-4 py-10 sm:px-6 lg:px-8">
      {/* Background ambient mesh & glow matching Hero section */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10"
      >
        <div
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage:
              "linear-gradient(to right, rgba(255,255,255,0.06) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.06) 1px, transparent 1px)",
            backgroundSize: "64px 64px",
            maskImage:
              "radial-gradient(ellipse 70% 60% at 50% 20%, black 20%, transparent 100%)",
            WebkitMaskImage:
              "radial-gradient(ellipse 70% 60% at 50% 20%, black 20%, transparent 100%)",
          }}
        />
        <div className="absolute top-10 left-1/2 -translate-x-1/2 size-96 rounded-full bg-white/4 blur-3xl" />
        <div className="absolute top-1/3 -left-32 size-72 rounded-full bg-amber-500/3 blur-3xl" />
        <div className="absolute top-1/2 -right-32 size-72 rounded-full bg-emerald-500/3 blur-3xl" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, ease: "easeOut" }}
        className="w-full max-w-md sm:max-w-lg"
      >
        {/* Brand & Badge Header */}
        <div className="flex flex-col items-center text-center mb-6">
          <Brand className="scale-105 mb-4" />
          <div className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/4 px-3 py-1 text-[11px] font-medium tracking-[0.16em] text-white/60 uppercase">
            {mode === "signin" ? (
              <>
                <ShieldCheck className="size-3.5 text-emerald-400" />
                <span>SECURE ACCESS</span>
              </>
            ) : (
              <>
                <Sparkles className="size-3.5 text-amber-400" />
                <span>JOIN THE NETWORK</span>
              </>
            )}
          </div>
          <h1 className="mt-3 text-2xl font-bold tracking-tight text-white sm:text-3xl">
            {title}
          </h1>
          <p className="mt-1.5 text-sm text-white/50 max-w-sm">
            {subtitle}
          </p>
        </div>

        {/* Central Card Container */}
        <div className="relative rounded-2xl border border-white/10 bg-[#0d0d0e]/90 p-6 sm:p-8 shadow-2xl backdrop-blur-xl ring-1 ring-white/5">
          {/* Segmented Toggle Bar Between Sign In and Sign Up */}
          <div className="mb-6 grid grid-cols-2 rounded-xl border border-white/10 bg-white/4 p-1 text-xs font-semibold">
            <Link
              href="/signin"
              className={cn(
                "relative flex items-center justify-center rounded-lg py-2 transition-all duration-200 outline-none focus-visible:ring-2 focus-visible:ring-white/40",
                mode === "signin"
                  ? "text-black font-bold"
                  : "text-white/60 hover:text-white"
              )}
            >
              {mode === "signin" && (
                <motion.span
                  layoutId="auth-tab-pill"
                  className="absolute inset-0 rounded-lg bg-white shadow-sm"
                  transition={{ type: "spring", stiffness: 450, damping: 35 }}
                />
              )}
              <span className="relative z-10 flex items-center gap-1.5">
                Sign In
              </span>
            </Link>

            <Link
              href="/signup"
              className={cn(
                "relative flex items-center justify-center rounded-lg py-2 transition-all duration-200 outline-none focus-visible:ring-2 focus-visible:ring-white/40",
                mode === "signup"
                  ? "text-black font-bold"
                  : "text-white/60 hover:text-white"
              )}
            >
              {mode === "signup" && (
                <motion.span
                  layoutId="auth-tab-pill"
                  className="absolute inset-0 rounded-lg bg-white shadow-sm"
                  transition={{ type: "spring", stiffness: 450, damping: 35 }}
                />
              )}
              <span className="relative z-10 flex items-center gap-1.5">
                Create Account
              </span>
            </Link>
          </div>

          {/* Form Content */}
          {children}
        </div>

        {/* Trust Badges */}
        <div className="mt-6 flex items-center justify-center gap-6 text-[11px] text-white/40">
          <span className="flex items-center gap-1.5">
            <span className="size-1.5 rounded-full bg-emerald-400" />
            256-bit SSL Encryption
          </span>
          <span>•</span>
          <span>Role-Based Access</span>
          <span>•</span>
          <span>Fast Booking</span>
        </div>
      </motion.div>
    </div>
  )
}
