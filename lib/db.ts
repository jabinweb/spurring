import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'
import { FormResponse } from "@/types/form"

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
}

export const prisma = globalForPrisma.prisma ?? new PrismaClient()

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma

export default prisma

export interface DashboardStats {
  totalUsers: number
  totalResponses: number
  contactResponses: number
  getStartedResponses: number
  recentResponses: FormResponse[]
}

export async function getDashboardStats(): Promise<DashboardStats> {
  const [userCount, formResponses] = await Promise.all([
    prisma.user.count(),
    prisma.formResponse.findMany({
      orderBy: { createdAt: 'desc' }
    })
  ])

interface ContactFormResponse extends FormResponse {
    formType: 'contact'
}
const contactFormCount: number = formResponses.filter((r: FormResponse): r is ContactFormResponse => r.formType === 'contact').length
interface GetStartedFormResponse extends FormResponse {
    formType: 'getStarted'
}
const getStartedCount: number = formResponses.filter(
    (r: FormResponse): r is GetStartedFormResponse => r.formType === 'getStarted'
).length

  return {
    totalUsers: userCount,
    totalResponses: formResponses.length,
    contactResponses: contactFormCount,
    getStartedResponses: getStartedCount,
    recentResponses: formResponses.slice(0, 5)
  }
}

export async function getFirstAdmin() {
  return await prisma.user.findFirst({
    where: { isAdmin: true }
  })
}

export async function createAdmin(email: string, hashedPassword: string) {
  return await prisma.user.create({
    data: {
      email,
      password: hashedPassword,
      isAdmin: true
    }
  })
}

export async function getUserByEmail(email: string) {
  return await prisma.user.findUnique({
    where: { email }
  })
}

export async function getUsers() {
  return await prisma.user.findMany({
    orderBy: { createdAt: 'desc' }
  })
}

export async function createUser(data: {
  email: string
  password: string
  name?: string
  isAdmin?: boolean
}) {
  const hashedPassword = await bcrypt.hash(data.password, 12)
  return await prisma.user.create({
    data: {
      ...data,
      password: hashedPassword
    }
  })
}

export async function updateUser(id: string, data: {
  email?: string
  name?: string
  isAdmin?: boolean
}) {
  return await prisma.user.update({
    where: { id },
    data
  })
}

export async function deleteUser(id: string) {
  return await prisma.user.delete({
    where: { id }
  })
}

