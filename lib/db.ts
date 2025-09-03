import { PrismaClient } from '@prisma/client'
import { hashPassword } from './crypto'
import { FormResponse, DashboardStats } from "@/types/form"

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
}

export const prisma = globalForPrisma.prisma ?? new PrismaClient()

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma

export default prisma

export async function getDashboardStats(): Promise<DashboardStats> {
  const [userCount, rawFormResponses] = await Promise.all([
    prisma.user.count(),
    prisma.formResponse.findMany({
      orderBy: { createdAt: 'desc' }
    })
  ])

  // Cast raw responses to FormResponse type
  const formResponses = rawFormResponses as unknown as FormResponse[]

  const contactFormCount = formResponses.filter(r => r.formType === 'contact').length
  const getStartedCount = formResponses.filter(r => r.formType === 'getStarted').length

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
  const hashedPassword = await hashPassword(data.password)
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

