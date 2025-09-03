import { NextRequest, NextResponse } from "next/server"
import { z } from "zod"
import prisma from "@/lib/db"
import bcrypt from "bcryptjs"
import { auth } from "@/auth"

// Password update schema
const passwordSchema = z.object({
  userId: z.string().optional(),
  currentPassword: z.string().optional(),
  newPassword: z.string().min(6)
})

export async function POST(req: NextRequest) {
  try {
    const session = await auth()
    if (!session?.user) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      )
    }
    
    const body = await req.json()
    
    // Validate input
    const result = passwordSchema.safeParse(body)
    if (!result.success) {
      return NextResponse.json(
        { error: "Invalid password data" },
        { status: 400 }
      )
    }
    
    const { userId, currentPassword, newPassword } = result.data
    
    // Admin can update any user's password without currentPassword
    const targetUserId = userId && session.user.isAdmin ? userId : session.user.id
    
    // If not an admin and updating own password, require current password
    if (!session.user.isAdmin && (!currentPassword || targetUserId !== session.user.id)) {
      return NextResponse.json(
        { error: "Current password required" },
        { status: 400 }
      )
    }
    
    // Verify current password if provided
    if (currentPassword) {
      const user = await prisma.user.findUnique({
        where: { id: targetUserId },
        select: { password: true }
      })
      
      if (!user?.password) {
        return NextResponse.json(
          { error: "User not found" },
          { status: 404 }
        )
      }
      
      const isValid = await bcrypt.compare(currentPassword, user.password)
      if (!isValid) {
        return NextResponse.json(
          { error: "Current password is incorrect" },
          { status: 401 }
        )
      }
    }
    
    // Hash new password with bcrypt
    const hashedPassword = await bcrypt.hash(newPassword, 10)
    
    // Update the password
    await prisma.user.update({
      where: { id: targetUserId },
      data: { password: hashedPassword }
    })
    
    return NextResponse.json({ 
      success: true,
      message: "Password updated successfully"
    })
    
  } catch (error) {
    console.error("Password update error:", error)
    return NextResponse.json(
      { error: "Failed to update password" },
      { status: 500 }
    )
  }
}
