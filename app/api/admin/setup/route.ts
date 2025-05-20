import { NextResponse } from "next/server"
import bcrypt from "bcryptjs"
import { z } from "zod"
import { getFirstAdmin, createAdmin } from "@/lib/db"

const schema = z.object({
  email: z.string().email(),
  password: z.string().min(6)
})

export async function POST(req: Request) {
  try {
    const json = await req.json()
    const body = schema.parse(json)
    
    // Check if admin already exists
    const hasAdmin = await getFirstAdmin()
    
    if (hasAdmin) {
      return new NextResponse("Admin already exists", { status: 400 })
    }
    
    const hashedPassword = await bcrypt.hash(body.password, 12)
    const admin = await createAdmin(body.email, hashedPassword)
    
    return NextResponse.json({ user: admin }, { status: 201 })
  } catch (error) {
    console.error('Admin setup error:', error)
    return new NextResponse("Error creating admin", { status: 500 })
  }
}
