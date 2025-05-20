import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

declare global {
  var prisma: PrismaClient | undefined
}

const prisma = global.prisma || new PrismaClient()

if (process.env.NODE_ENV !== 'production') {
  global.prisma = prisma
}

export default prisma

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
