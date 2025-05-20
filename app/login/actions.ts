'use server'

import { signIn } from "@/auth"

interface LoginData {
  email: string
  password: string
}

export async function loginAction(formData: LoginData) {
  return await signIn("credentials", {
    email: formData.email,
    password: formData.password,
    redirectTo: "/admin"
  })
}
