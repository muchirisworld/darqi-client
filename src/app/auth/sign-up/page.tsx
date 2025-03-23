import { SignUpForm } from "../_components/sign-up-form"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Sign Up",
  description: "Create a new account",
}

export default function SignUpPage() {
  return (
    <div className="mx-auto w-full max-w-md space-y-6">
      <div className="space-y-2 text-center">
        <h1 className="text-3xl font-bold">Sign Up</h1>
        <p className="text-muted-foreground">Create an account to get started</p>
      </div>
      <SignUpForm />
    </div>
  )
}

