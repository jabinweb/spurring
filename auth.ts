import NextAuth from "next-auth"
import Credentials from "next-auth/providers/credentials"
import { z } from "zod"
import bcrypt from "bcryptjs"
import { getUserByEmail } from "@/lib/db"

const schema = z.object({
  email: z.string().email(),
  password: z.string().min(6)
})

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      async authorize(credentials) {
        const parsedCredentials = schema.safeParse(credentials)
        if (!parsedCredentials.success) return null

        const { email, password } = parsedCredentials.data
        
        const user = await getUserByEmail(email)
        if (!user) return null
        
        const passwordsMatch = await bcrypt.compare(password, user.password)
        if (!passwordsMatch) return null
        
        return {
          id: user.id,
          email: user.email,
          name: user.name,
          isAdmin: user.isAdmin
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
