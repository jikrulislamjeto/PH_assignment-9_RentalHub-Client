import type { Metadata } from "next"
import { AuthCard } from "@/components/auth/auth-card"
import { SignInForm } from "@/components/auth/signin-form"

export const metadata: Metadata = {
  title: "Sign In — RentalHub",
  description:
    "Sign in to your RentalHub account to rent equipment or manage listings.",
}

export default function SignInPage() {
  return (
    <AuthCard
      mode="signin"
      title="Welcome Back"
      subtitle="Sign in to your account to access your rental bookings, listings, and profile."
    >
      <SignInForm />
    </AuthCard>
  )
}
