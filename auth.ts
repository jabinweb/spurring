import NextAuth from "next-auth"
import Credentials from "next-auth/providers/credentials"
import { z } from "zod"
import prisma from "@/lib/db"
import { verifyPassword } from "@/lib/crypto"
import { AuthError } from "next-auth"

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
            throw new AuthError("Invalid credentials format")
          }

          const { email, password } = parsedCredentials.data
          const user = await prisma.user.findUnique({ 
            where: { email },
            select: {
              id: true,
              email: true,
              password: true,
              name: true,
              isAdmin: true
            }
          })

          if (!user?.password) {
            throw new AuthError("Invalid credentials")
          }

          const isValid = await verifyPassword(password, user.password)
          console.log('Auth attempt:', { email, isValid })

          if (!isValid) {
            console.log('Password verification failed')
            return null
          }

          return {
            id: user.id,
            email: user.email,
            name: user.name,
            isAdmin: user.isAdmin
          }
        } catch (error) {
          console.error('Auth error details:', {
            error: error instanceof Error ? error.message : String(error),
            email: credentials?.email
          })
          return null
        }
      }
    })
  ],
  pages: {
    signIn: "/login",
    error: "/login" // Redirect back to login on error
  },
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60 // 30 days
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.isAdmin = user.isAdmin
        token.userId = user.id
      }
      return token
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.isAdmin = token.isAdmin as boolean
        session.user.id = token.userId as string
      }
      return session
    },
    async redirect({ url, baseUrl }) {
      // Handle admin redirect
      if (url.includes("/admin")) {
        return `${baseUrl}/admin`
      }
      // Default redirects
      if (url.startsWith(baseUrl)) return url
      if (url.startsWith("/")) return `${baseUrl}${url}`
      return baseUrl
    }
  }
})
