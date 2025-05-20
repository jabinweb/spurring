import { NextResponse } from "next/server"
import prisma from "@/lib/db"
import { hashPassword } from "@/lib/crypto"

export async function POST(req: Request) {
  try {
    const { email, newPassword, secretKey } = await req.json()
    
    // Verify secret key from environment
    if (secretKey !== process.env.ADMIN_SECRET) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const hashedPassword = await hashPassword(newPassword)
    await prisma.user.update({
      where: { email },
      data: { password: hashedPassword }
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Reset error:', error)
    return NextResponse.json({ error: "Reset failed" }, { status: 500 })
  }
}
