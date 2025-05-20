'use server'

import { signIn } from "@/auth"
import { AuthError } from "next-auth"

interface LoginData {
  email: string
  password: string
}

interface LoginResponse {
  error?: string
  success?: boolean
}

export async function loginAction(formData: LoginData): Promise<LoginResponse> {
  try {
    console.log("Attempting login for:", formData.email)
    const result = await signIn("credentials", {
      email: formData.email,
      password: formData.password,
      redirect: false
    })

    console.log("Login result:", result)

    if (!result?.ok) {
      console.log("Login failed:", result?.error)
      return { error: "Invalid credentials" }
    }

    return { success: true }
  } catch (error) {
    console.error("Login error:", error)
    if (error instanceof AuthError) {
      return { error: "Invalid credentials" }
    }
    return { error: "Something went wrong" }
  }
}
