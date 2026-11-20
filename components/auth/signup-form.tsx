"use client"

import * as React from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import {
  ArrowRight,
  Camera,
  CheckCircle2,
  Eye,
  EyeOff,
  Lock,
  Mail,
  User,
  XCircle,
  AlertCircle,
  X,
  ShoppingBag,
  Wrench,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { GoogleButton } from "./google-button"
import { authClient } from "@/lib/auth-client"
import { cn } from "@/lib/utils"

export type UserRole = "Customer" | "Owner"

export interface SignUpData {
  name: string
  email: string
  photoUrl: string
  role: UserRole
  password: string
  agreeTerms: boolean
  submittedAt: string
}

interface SignUpFormProps {
  onDataCollected?: (data: SignUpData) => void
}

export function SignUpForm({ onDataCollected }: SignUpFormProps) {
  const router = useRouter()
  const [name, setName] = React.useState("")
  const [email, setEmail] = React.useState("")
  const [photoUrl, setPhotoUrl] = React.useState("")
  const [role, setRole] = React.useState<UserRole>("Customer")
  const [password, setPassword] = React.useState("")
  const [confirmPassword, setConfirmPassword] = React.useState("")
  const [agreeTerms, setAgreeTerms] = React.useState(false)

  const [showPassword, setShowPassword] = React.useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = React.useState(false)
  const [isLoading, setIsLoading] = React.useState(false)

  const [notification, setNotification] = React.useState<{
    type: "success" | "error"
    message: string
    details?: string
  } | null>(null)

  // Real-time password requirement validators
  const hasMinLength = password.length >= 6
  const hasUppercase = /[A-Z]/.test(password)
  const hasLowercase = /[a-z]/.test(password)
  const isPasswordValid = hasMinLength && hasUppercase && hasLowercase
  const doPasswordsMatch = password.length > 0 && password === confirmPassword

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    // 1. Check required text inputs
    if (!name.trim()) {
      setNotification({
        type: "error",
        message: "Full Name Required",
        details: "Please enter your full legal name or organization name.",
      })
      return
    }

    if (!email.trim() || !email.includes("@")) {
      setNotification({
        type: "error",
        message: "Valid Email Required",
        details: "Please enter a valid email address.",
      })
      return
    }

    // 2. Strict password validation per specification:
    // "must have an uppercase letter, a lowercase letter, and a length of at least 6 characters"
    if (!hasMinLength) {
      setNotification({
        type: "error",
        message: "Password Too Short",
        details: "Password must be at least 6 characters long.",
      })
      return
    }

    if (!hasUppercase) {
      setNotification({
        type: "error",
        message: "Missing Uppercase Letter",
        details: "Password must contain at least one uppercase letter (A-Z).",
      })
      return
    }

    if (!hasLowercase) {
      setNotification({
        type: "error",
        message: "Missing Lowercase Letter",
        details: "Password must contain at least one lowercase letter (a-z).",
      })
      return
    }

    // 3. Confirm password check
    if (password !== confirmPassword) {
      setNotification({
        type: "error",
        message: "Passwords Do Not Match",
        details: "Please ensure your confirmation password matches the password above.",
      })
      return
    }

    // 4. Terms acceptance check
    if (!agreeTerms) {
      setNotification({
        type: "error",
        message: "Terms Acceptance Required",
        details: "Please accept the rental terms and conditions to proceed.",
      })
      return
    }

    setIsLoading(true)
    setNotification(null)

    // Form data payload collection
    const collectedData: SignUpData = {
      name: name.trim(),
      email: email.trim(),
      photoUrl: photoUrl.trim(),
      role,
      password,
      agreeTerms,
      submittedAt: new Date().toISOString(),
    }

    console.log("[Sign Up Form Data Collected]:", {
      ...collectedData,
      password: "•".repeat(collectedData.password.length),
    })

    // Invoke optional callback prop
    onDataCollected?.(collectedData)

    try {
      /**
       * BETTER AUTH REGISTRATION METHOD:
       * Creates user & account records in MongoDB Atlas.
       * Passes custom `role` through the additionalFields schema.
       */
      const { data, error } = await authClient.signUp.email({
        name: collectedData.name,
        email: collectedData.email,
        password: collectedData.password,
        image: collectedData.photoUrl || undefined,
        callbackURL: "/",
        role: collectedData.role,
      })

      if (error) {
        setNotification({
          type: "error",
          message: "Registration Failed",
          details:
            error.message ||
            "Unable to register account. A user with this email may already exist.",
        })
        return
      }

      console.log("[Sign Up Success]: User saved to MongoDB Atlas:", data)

      setNotification({
        type: "success",
        message: "Account Created Successfully in MongoDB Atlas!",
        details: `Welcome, ${collectedData.name}! Your account as a ${collectedData.role} has been saved. Redirecting...`,
      })

      setTimeout(() => {
        router.push("/signin")
      }, 1500)
    } catch (err: unknown) {
      console.error("Sign up execution error:", err)
      const errorMessage =
        err instanceof Error ? err.message : "Failed to connect to authentication server."
      setNotification({
        type: "error",
        message: "Registration Error",
        details: errorMessage,
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="space-y-5">
      {/* Feedback Notification Banner */}
      {notification && (
        <div
          role="status"
          aria-live="polite"
          className={`relative flex items-start gap-3 rounded-xl border p-3.5 text-xs transition-all ${
            notification.type === "success"
              ? "border-emerald-500/30 bg-emerald-500/10 text-emerald-300"
              : "border-rose-500/30 bg-rose-500/10 text-rose-300"
          }`}
        >
          {notification.type === "success" ? (
            <CheckCircle2 className="size-4 shrink-0 text-emerald-400 mt-0.5" />
          ) : (
            <AlertCircle className="size-4 shrink-0 text-rose-400 mt-0.5" />
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

      {/* Main Registration Form */}
      <form onSubmit={handleSubmit} className="space-y-4" noValidate>
        {/* Full Name Field */}
        <div className="space-y-1.5">
          <Label htmlFor="signup-name" required>
            Full Name
          </Label>
          <Input
            id="signup-name"
            name="name"
            type="text"
            autoComplete="name"
            placeholder="John Doe"
            value={name}
            onChange={(e) => setName(e.target.value)}
            icon={<User className="size-4" />}
            required
          />
        </div>

        {/* Email Address Field */}
        <div className="space-y-1.5">
          <Label htmlFor="signup-email" required>
            Email Address
          </Label>
          <Input
            id="signup-email"
            name="email"
            type="email"
            autoComplete="email"
            placeholder="john@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            icon={<Mail className="size-4" />}
            required
          />
        </div>

        {/* Profile Photo URL Field with Live Preview */}
        <div className="space-y-1.5">
          <div className="flex items-center justify-between">
            <Label htmlFor="signup-photo">Profile Photo URL</Label>
            <span className="text-[10px] text-white/40">Optional</span>
          </div>
          <div className="flex gap-2.5 items-center">
            <div className="flex-1">
              <Input
                id="signup-photo"
                name="photoUrl"
                type="url"
                placeholder="Direct image link or imgbb URL"
                value={photoUrl}
                onChange={(e) => setPhotoUrl(e.target.value)}
                icon={<Camera className="size-4" />}
              />
            </div>
            {photoUrl && (
              <div className="relative size-11 shrink-0 overflow-hidden rounded-xl border border-white/20 bg-white/5">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={photoUrl}
                  alt="Avatar preview"
                  className="size-full object-cover"
                  onError={(e) => {
                    ;(e.target as HTMLElement).style.display = "none"
                  }}
                />
              </div>
            )}
          </div>
          <p className="text-[11px] text-white/40">
            Direct image link (.png, .jpg) or ImgBB upload link to store in MongoDB Atlas.
          </p>
        </div>

        {/* Account Role Selector */}
        <div className="space-y-1.5 pt-1">
          <Label>Account Purpose / Role</Label>
          <div className="grid grid-cols-2 gap-2.5">
            <button
              type="button"
              onClick={() => setRole("Customer")}
              className={cn(
                "flex flex-col items-start gap-1 rounded-xl border p-3 text-left transition-all duration-200 outline-none focus-visible:ring-2 focus-visible:ring-white/40",
                role === "Customer"
                  ? "border-white/40 bg-white/8 text-white ring-1 ring-white/20"
                  : "border-white/10 bg-white/2 text-white/60 hover:border-white/20 hover:text-white"
              )}
            >
              <div className="flex w-full items-center justify-between">
                <span className="flex items-center gap-1.5 text-xs font-semibold text-white">
                  <ShoppingBag className="size-3.5 text-emerald-400" />
                  Customer
                </span>
                {role === "Customer" && (
                  <CheckCircle2 className="size-3.5 text-emerald-400" />
                )}
              </div>
              <span className="text-[10px] text-white/45 leading-tight">
                Browse & rent equipment
              </span>
            </button>

            <button
              type="button"
              onClick={() => setRole("Owner")}
              className={cn(
                "flex flex-col items-start gap-1 rounded-xl border p-3 text-left transition-all duration-200 outline-none focus-visible:ring-2 focus-visible:ring-white/40",
                role === "Owner"
                  ? "border-white/40 bg-white/8 text-white ring-1 ring-white/20"
                  : "border-white/10 bg-white/2 text-white/60 hover:border-white/20 hover:text-white"
              )}
            >
              <div className="flex w-full items-center justify-between">
                <span className="flex items-center gap-1.5 text-xs font-semibold text-white">
                  <Wrench className="size-3.5 text-amber-400" />
                  Owner
                </span>
                {role === "Owner" && (
                  <CheckCircle2 className="size-3.5 text-amber-400" />
                )}
              </div>
              <span className="text-[10px] text-white/45 leading-tight">
                List equipment for rent
              </span>
            </button>
          </div>
        </div>

        {/* Password Field */}
        <div className="space-y-1.5 pt-1">
          <Label htmlFor="signup-password" required>
            Create Password
          </Label>
          <Input
            id="signup-password"
            name="password"
            type={showPassword ? "text" : "password"}
            autoComplete="new-password"
            placeholder="At least 6 characters"
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

          {/* Real-time Password Requirements Card */}
          <div className="rounded-xl border border-white/10 bg-white/2 p-3 space-y-1.5 text-[11px]">
            <p className="font-medium text-white/70 mb-1">
              Password requirements:
            </p>
            <div className="flex items-center gap-2">
              {hasMinLength ? (
                <CheckCircle2 className="size-3.5 text-emerald-400" />
              ) : (
                <XCircle className="size-3.5 text-white/30" />
              )}
              <span
                className={hasMinLength ? "text-emerald-300" : "text-white/45"}
              >
                At least 6 characters long
              </span>
            </div>
            <div className="flex items-center gap-2">
              {hasUppercase ? (
                <CheckCircle2 className="size-3.5 text-emerald-400" />
              ) : (
                <XCircle className="size-3.5 text-white/30" />
              )}
              <span
                className={hasUppercase ? "text-emerald-300" : "text-white/45"}
              >
                At least one uppercase letter (A-Z)
              </span>
            </div>
            <div className="flex items-center gap-2">
              {hasLowercase ? (
                <CheckCircle2 className="size-3.5 text-emerald-400" />
              ) : (
                <XCircle className="size-3.5 text-white/30" />
              )}
              <span
                className={hasLowercase ? "text-emerald-300" : "text-white/45"}
              >
                At least one lowercase letter (a-z)
              </span>
            </div>
          </div>
        </div>

        {/* Confirm Password Field */}
        <div className="space-y-1.5">
          <Label htmlFor="signup-confirm-password" required>
            Confirm Password
          </Label>
          <Input
            id="signup-confirm-password"
            name="confirmPassword"
            type={showConfirmPassword ? "text" : "password"}
            autoComplete="new-password"
            placeholder="Repeat your password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            icon={<Lock className="size-4" />}
            endIcon={
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="text-white/40 hover:text-white transition-colors p-1"
                aria-label={
                  showConfirmPassword ? "Hide password" : "Show password"
                }
              >
                {showConfirmPassword ? (
                  <EyeOff className="size-4" />
                ) : (
                  <Eye className="size-4" />
                )}
              </button>
            }
            required
          />
          {confirmPassword.length > 0 && (
            <p
              className={cn(
                "text-[11px] flex items-center gap-1.5 pt-0.5",
                doPasswordsMatch ? "text-emerald-300" : "text-rose-400"
              )}
            >
              {doPasswordsMatch ? (
                <>
                  <CheckCircle2 className="size-3" />
                  Passwords match
                </>
              ) : (
                <>
                  <XCircle className="size-3" />
                  Passwords do not match
                </>
              )}
            </p>
          )}
        </div>

        {/* Terms Agreement Checkbox */}
        <div className="pt-1">
          <label className="flex items-start gap-2.5 cursor-pointer select-none">
            <input
              type="checkbox"
              name="agreeTerms"
              checked={agreeTerms}
              onChange={(e) => setAgreeTerms(e.target.checked)}
              className="mt-0.5 size-4 rounded border-white/20 bg-white/5 text-white accent-white focus:ring-1 focus:ring-white/30"
            />
            <span className="text-xs text-white/70 leading-snug">
              I agree to RentalHub&apos;s{" "}
              <Link
                href="/terms"
                className="text-white underline underline-offset-2 hover:text-white/80"
              >
                Terms of Service
              </Link>{" "}
              and{" "}
              <Link
                href="/privacy"
                className="text-white underline underline-offset-2 hover:text-white/80"
              >
                Privacy Policy
              </Link>
              .
            </span>
          </label>
        </div>

        {/* Submit Button */}
        <Button
          type="submit"
          disabled={isLoading || !isPasswordValid || !agreeTerms}
          className="h-11 w-full rounded-xl bg-white text-black font-semibold shadow-md hover:bg-white/90 disabled:opacity-40 transition-all duration-200 mt-2"
        >
          {isLoading ? (
            <span className="flex items-center gap-2">
              <span className="size-3.5 animate-spin rounded-full border-2 border-black border-t-transparent" />
              Saving to MongoDB Atlas...
            </span>
          ) : (
            <span className="flex items-center justify-center gap-1.5">
              <span>Create Account</span>
              <ArrowRight className="size-4" />
            </span>
          )}
        </Button>
      </form>

      {/* Visual Divider */}
      <div className="relative my-4 flex items-center justify-center">
        <span className="absolute inset-x-0 h-px bg-white/10" />
        <span className="relative bg-[#0d0d0e] px-3 text-[11px] font-medium tracking-wider text-white/40 uppercase">
          Or sign up with
        </span>
      </div>

      {/* Google Social Signup */}
      <GoogleButton label="Sign up with Google" />

      {/* Toggle Link to Sign In */}
      <div className="pt-2 text-center text-xs text-white/55">
        Already have an account?{" "}
        <Link
          href="/signin"
          className="font-semibold text-white underline-offset-4 hover:underline"
        >
          Sign in
        </Link>
      </div>
    </div>
  )
}
