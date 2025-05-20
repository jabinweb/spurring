'use server'

import { revalidatePath } from "next/cache"
import prisma from "@/lib/db"
import { hashPassword } from "@/lib/crypto"
import { auth } from "@/auth"

export async function updateProfile(data: {
  name?: string
  email?: string
}) {
  const session = await auth()
  if (!session?.user?.id) throw new Error("Unauthorized")

  await prisma.user.update({
    where: { id: session.user.id },
    data
  })

  revalidatePath('/admin/profile')
  return { success: true }
}

export async function updatePassword(data: {
  currentPassword: string
  newPassword: string
}) {
  const session = await auth()
  if (!session?.user?.id) throw new Error("Unauthorized")

  const hashedPassword = await hashPassword(data.newPassword)
  await prisma.user.update({
    where: { id: session.user.id },
    data: { password: hashedPassword }
  })

  return { success: true }
}
