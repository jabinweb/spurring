'use server'

import { signIn } from "@/auth"

interface LoginData {
  email: string
  password: string
}

interface LoginResult {
  error?: string
}

export async function loginAction(formData: LoginData): Promise<LoginResult> {
  try {
    const result = await signIn("credentials", {
      email: formData.email,
      password: formData.password,
      redirectTo: "/admin",
      redirect: false
    })

    if (!result?.ok) {
      return { error: "Invalid credentials" }
    }

    return {}
  } catch (error) {
    return { error: "Something went wrong" }
  }
}
