import type { Metadata } from "next"
import { AuthCard } from "@/components/auth/auth-card"
import { SignUpForm } from "@/components/auth/signup-form"

export const metadata: Metadata = {
  title: "Create Account — RentalHub",
  description:
    "Register for a RentalHub account to rent high-quality equipment or list your own machinery.",
}

export default function SignUpPage() {
  return (
    <AuthCard
      mode="signup"
      title="Create Your Account"
      subtitle="Join thousands of contractors, creators, and event planners renting equipment effortlessly."
    >
      <SignUpForm />
    </AuthCard>
  )
}
