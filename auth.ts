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
            console.log("Validation error:", parsedCredentials.error)
            return null
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

          console.log('Found user:', { 
            email, 
            hasPassword: !!user?.password,
            isAdmin: user?.isAdmin 
          })

          if (!user?.password) {
            console.log('No password found for user')
            return null
          }

          const isValid = await verifyPassword(password, user.password)
          console.log('Password verification result:', { isValid, email })

          if (!isValid) {
            return null
          }

          console.log('Password check:', { 
            email,
            inputPassword: password.substring(0, 3) + '...',
            hashedPassword: user.password.substring(0, 10) + '...',
            isValid: isValid 
          })

          if (isValid) {
            const userData = {
              id: user.id,
              email: user.email,
              name: user.name,
              isAdmin: user.isAdmin
            }
            console.log('Auth successful, returning:', userData)
            return userData
          }
          return null
        } catch (error: unknown) {
          const err = error as Error;
          console.error('Detailed auth error:', {
            name: err.name,
            message: err.message,
            stack: err.stack
          })
          return null
        }
      }
    })
  ],
  pages: {
    signIn: "/login"
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
      if (url.startsWith(baseUrl)) return url
      if (url.startsWith('/')) return `${baseUrl}${url}`
      return baseUrl
    }
  }
})
