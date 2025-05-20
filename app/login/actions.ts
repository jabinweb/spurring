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
  url?: string
}

export async function loginAction(formData: LoginData): Promise<LoginResponse> {
  try {
    console.log('Starting login attempt for:', formData.email)
    
    const result = await signIn("credentials", {
      email: formData.email,
      password: formData.password,
      redirect: false
    })

    console.log('Raw auth result:', result)

    if (!result) {
      return { error: "Authentication failed" }
    }

    if (result.error) {
      return { error: result.error }
    }

    return { 
      success: true,
      url: '/admin'
    }
  } catch (error) {
    console.error('Login action error:', error)
    return { error: "An unexpected error occurred" }
  }
}
