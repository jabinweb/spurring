import NextAuth from "next-auth"
import Credentials from "next-auth/providers/credentials"
import { z } from "zod"
import prisma from "@/lib/db"
import { verifyPassword } from "@/lib/crypto"

const schema = z.object({
  email: z.string().email(),
  password: z.string().min(6)
})

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      async authorize(credentials) {
        try {
          const parsedCredentials = schema.safeParse(credentials)
          if (!parsedCredentials.success) {
            console.log("Invalid credentials format:", parsedCredentials.error)
            return null
          }

          const { email, password } = parsedCredentials.data
          
          const user = await prisma.user.findUnique({
            where: { email }
          })

          if (!user) {
            console.log("User not found:", email)
            return null
          }
          
          const isValid = await verifyPassword(password, user.password)
          if (!isValid) {
            console.log("Invalid password for user:", email)
            return null
          }
          
          console.log("Login successful for user:", email)
          return {
            id: user.id,
            email: user.email,
            name: user.name,
            isAdmin: user.isAdmin
          }
        } catch (error) {
          console.error("Auth error:", error)
          return null
        }
      }
    })
  ],
  pages: {
    signIn: "/login"
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.isAdmin = user.isAdmin
      }
      return token
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.isAdmin = token.isAdmin as boolean
      }
      return session
    }
  }
})
