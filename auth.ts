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
          
          // Use the API endpoint for password verification instead of direct bcrypt
          // This approach avoids Edge Runtime incompatibility issues with bcryptjs
          const response = await fetch(new URL('/api/auth/verify', process.env.NEXTAUTH_URL), {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password }),
          })
          
          if (!response.ok) {
            console.log('Auth failed:', await response.text())
            return null
          }
          
          const result = await response.json()
          const user = result.user
          
          if (!user) {
            console.log('No user returned from auth API')
            return null
          }
          
          // Return user data for session
          return {
            id: user.id,
            email: user.email,
            name: user.name,
            isAdmin: user.isAdmin
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
