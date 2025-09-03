import { NextRequest, NextResponse } from "next/server"
import { z } from "zod"
import prisma from "@/lib/db"
import bcrypt from "bcryptjs"
import { auth } from "@/auth"

// User creation schema
const userSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
  name: z.string().min(2).optional(),
  isAdmin: z.boolean().optional()
})

export async function POST(req: NextRequest) {
  try {
    // Authenticate - only admins can create users
    const session = await auth()
    if (!session?.user?.isAdmin) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 403 }
      )
    }
    
    const body = await req.json()
    
    // Validate input
    const result = userSchema.safeParse(body)
    if (!result.success) {
      return NextResponse.json(
        { error: "Invalid user data", issues: result.error.issues },
        { status: 400 }
      )
    }
    
    const { email, password, name, isAdmin } = result.data
    
    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email }
    })
    
    if (existingUser) {
      return NextResponse.json(
        { error: "User already exists" },
        { status: 409 }
      )
    }
    
    // Hash password with bcrypt
    const hashedPassword = await bcrypt.hash(password, 10)
    
    // Create the user
    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        name: name || email.split('@')[0],
        isAdmin: isAdmin || false
      },
      select: {
        id: true,
        email: true,
        name: true,
        isAdmin: true,
        createdAt: true
      }
    })
    
    return NextResponse.json({ user })
    
  } catch (error) {
    console.error("User creation error:", error)
    return NextResponse.json(
      { error: "Failed to create user" },
      { status: 500 }
    )
  }
}
