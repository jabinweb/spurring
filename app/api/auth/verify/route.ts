import { NextRequest, NextResponse } from "next/server"
import { z } from "zod"
import prisma from "@/lib/db"
import bcrypt from "bcryptjs"

// Auth validation schema
const authSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6)
})

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    
    // Validate input
    const result = authSchema.safeParse(body)
    if (!result.success) {
      return NextResponse.json(
        { error: "Invalid credentials format" },
        { status: 400 }
      )
    }
    
    const { email, password } = result.data
    
    // Find the user
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
      return NextResponse.json(
        { error: "Invalid credentials" },
        { status: 401 }
      )
    }
    
    // Verify password with bcrypt (safe in API route)
    const isValid = await bcrypt.compare(password, user.password)
    
    if (!isValid) {
      return NextResponse.json(
        { error: "Invalid credentials" },
        { status: 401 }
      )
    }
    
    // Return user info (without password)
    return NextResponse.json({
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        isAdmin: user.isAdmin
      }
    })
    
  } catch (error) {
    console.error("Auth API error:", error)
    return NextResponse.json(
      { error: "Authentication error" },
      { status: 500 }
    )
  }
}
