"use client"

import * as React from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import {
  ArrowRight,
  Eye,
  EyeOff,
  Lock,
  Mail,
  CheckCircle2,
  AlertCircle,
  X,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { GoogleButton } from "./google-button"
import { authClient } from "@/lib/auth-client"

export interface SignInData {
  email: string
  password: string
  rememberMe: boolean
  submittedAt: string
}

interface SignInFormProps {
  onDataCollected?: (data: SignInData) => void
}

export function SignInForm({ onDataCollected }: SignInFormProps) {
  const router = useRouter()
  const [email, setEmail] = React.useState("")
  const [password, setPassword] = React.useState("")
  const [rememberMe, setRememberMe] = React.useState(false)
  const [showPassword, setShowPassword] = React.useState(false)
  const [isLoading, setIsLoading] = React.useState(false)

  const [notification, setNotification] = React.useState<{
    type: "success" | "error" | "info"
    message: string
    details?: string
  } | null>(null)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    // Client-side validation check
    if (!email.trim() || !password) {
      setNotification({
        type: "error",
        message: "Missing Credentials",
        details: "Please provide both your email address and password to sign in.",
      })
      return
    }

    setIsLoading(true)
    setNotification(null)

    // Form data payload collection
    const collectedData: SignInData = {
      email: email.trim(),
      password,
      rememberMe,
      submittedAt: new Date().toISOString(),
    }

    console.log("[Sign In Form Data Collected]:", {
      ...collectedData,
      password: "•".repeat(collectedData.password.length),
    })

    // Invoke optional callback prop
    onDataCollected?.(collectedData)

    try {
      /**
       * BETTER AUTH LOGIN METHOD:
       * For sign in, Better Auth uses `authClient.signIn.email` (NOT `signUp.email`).
       * It verifies credentials against the users/accounts collections in MongoDB Atlas
       * and issues a valid session saved in the `session` collection.
       */
      const { data, error } = await authClient.signIn.email({
        email: collectedData.email,
        password: collectedData.password,
        rememberMe: collectedData.rememberMe,
        callbackURL: "/",
      })

      if (error) {
        setNotification({
          type: "error",
          message: "Login Failed",
          details:
            error.message ||
            "Invalid email or password. Please check your credentials or register first.",
        })
        return
      }

      console.log("[Sign In Success]: Session data stored in MongoDB:", data)

      setNotification({
        type: "success",
        message: "Signed In Successfully!",
        details: "Authenticated with MongoDB Atlas. Redirecting...",
      })

      setTimeout(() => {
        router.push("/")
        router.refresh()
      }, 1000)
    } catch (err: unknown) {
      console.error("Sign in execution error:", err)
      const errorMessage =
        err instanceof Error ? err.message : "Failed to connect to authentication server."
      setNotification({
        type: "error",
        message: "Authentication Error",
        details: errorMessage,
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleForgotPassword = (e: React.MouseEvent) => {
    e.preventDefault()
    setNotification({
      type: "info",
      message: "Password Reset Notice",
      details: email.trim()
        ? `A password reset link will be dispatched to ${email.trim()}.`
        : "Please enter your email above to receive password reset instructions.",
    })
  }

  return (
    <div className="space-y-5">
      {/* Dynamic Feedback Notification Banner */}
      {notification && (
        <div
          role="status"
          aria-live="polite"
          className={`relative flex items-start gap-3 rounded-xl border p-3.5 text-xs transition-all ${
            notification.type === "success"
              ? "border-emerald-500/30 bg-emerald-500/10 text-emerald-300"
              : notification.type === "error"
              ? "border-rose-500/30 bg-rose-500/10 text-rose-300"
              : "border-sky-500/30 bg-sky-500/10 text-sky-300"
          }`}
        >
          {notification.type === "success" && (
            <CheckCircle2 className="size-4 shrink-0 text-emerald-400 mt-0.5" />
          )}
          {notification.type === "error" && (
            <AlertCircle className="size-4 shrink-0 text-rose-400 mt-0.5" />
          )}
          {notification.type === "info" && (
            <AlertCircle className="size-4 shrink-0 text-sky-400 mt-0.5" />
          )}
          <div className="flex-1">
            <p className="font-semibold">{notification.message}</p>
            {notification.details && (
              <p className="mt-0.5 text-white/70">{notification.details}</p>
            )}
          </div>
          <button
            type="button"
            onClick={() => setNotification(null)}
            className="text-white/40 hover:text-white transition-colors"
            aria-label="Dismiss notification"
          >
            <X className="size-3.5" />
          </button>
        </div>
      )}

      {/* Main Sign In Form */}
      <form onSubmit={handleSubmit} className="space-y-4" noValidate>
        {/* Email Address Field */}
        <div className="space-y-1.5">
          <Label htmlFor="signin-email" required>
            Email Address
          </Label>
          <Input
            id="signin-email"
            name="email"
            type="email"
            autoComplete="email"
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            icon={<Mail className="size-4" />}
            required
          />
        </div>

        {/* Password Field */}
        <div className="space-y-1.5">
          <div className="flex items-center justify-between">
            <Label htmlFor="signin-password" required>
              Password
            </Label>
            <button
              type="button"
              onClick={handleForgotPassword}
              className="text-xs text-white/50 hover:text-white transition-colors underline-offset-4 hover:underline"
            >
              Forgot password?
            </button>
          </div>
          <Input
            id="signin-password"
            name="password"
            type={showPassword ? "text" : "password"}
            autoComplete="current-password"
            placeholder="••••••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            icon={<Lock className="size-4" />}
            endIcon={
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="text-white/40 hover:text-white transition-colors p-1"
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? (
                  <EyeOff className="size-4" />
                ) : (
                  <Eye className="size-4" />
                )}
              </button>
            }
            required
          />
        </div>

        {/* Remember Me Checkbox */}
        <div className="flex items-center justify-between pt-1">
          <label className="flex items-center gap-2 cursor-pointer select-none">
            <input
              type="checkbox"
              name="rememberMe"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
              className="size-4 rounded border-white/20 bg-white/5 text-white accent-white focus:ring-1 focus:ring-white/30"
            />
            <span className="text-xs text-white/70">Remember my session</span>
          </label>
        </div>

        {/* Primary Submit Button */}
        <Button
          type="submit"
          disabled={isLoading}
          className="h-11 w-full rounded-xl bg-white text-black font-semibold shadow-md hover:bg-white/90 disabled:opacity-50 transition-all duration-200 mt-2"
        >
          {isLoading ? (
            <span className="flex items-center gap-2">
              <span className="size-3.5 animate-spin rounded-full border-2 border-black border-t-transparent" />
              Verifying credentials...
            </span>
          ) : (
            <span className="flex items-center justify-center gap-1.5">
              <span>Sign In</span>
              <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
            </span>
          )}
        </Button>
      </form>

      {/* Visual Divider */}
      <div className="relative my-4 flex items-center justify-center">
        <span className="absolute inset-x-0 h-px bg-white/10" />
        <span className="relative bg-[#0d0d0e] px-3 text-[11px] font-medium tracking-wider text-white/40 uppercase">
          Or continue with
        </span>
      </div>

      {/* Google Social Login */}
      <GoogleButton label="Continue with Google" />

      {/* Toggle Link to Sign Up */}
      <div className="pt-2 text-center text-xs text-white/55">
        Don&apos;t have an account yet?{" "}
        <Link
          href="/signup"
          className="font-semibold text-white underline-offset-4 hover:underline"
        >
          Create an account
        </Link>
      </div>
    </div>
  )
}
