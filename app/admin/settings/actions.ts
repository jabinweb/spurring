'use server'

import prisma from "@/lib/db"
import nodemailer from "nodemailer"
import { z } from "zod"
import { SmtpSettings, JsonValue } from '@/types/form'

const schema = z.object({
  host: z.string().min(1),
  port: z.number().min(1),
  user: z.string().min(1),
  password: z.string().min(1),
  from: z.string().min(1),
  fromName: z.string().min(1),
})

export async function updateSmtpSettings(data: SmtpSettings) {
  try {
    await prisma.settings.upsert({
      where: { key: 'smtp' },
      update: { value: data as JsonValue },
      create: {
        key: 'smtp',
        value: data as JsonValue
      }
    })
    return { success: true }
  } catch (error) {
    console.error('Failed to update SMTP settings:', error)
    throw new Error('Failed to update settings')
  }
}

export async function getSmtpSettings() {
  const settings = await prisma.settings.findUnique({
    where: { key: 'smtp' }
  })
  return settings?.value as SmtpSettings | null
}

export async function deleteSmtpSettings() {
  return await prisma.settings.delete({
    where: { key: 'smtp' }
  })
}

export async function testSmtpConnection(settings: SmtpSettings) {
  try {
    const transporter = nodemailer.createTransport({
      host: settings.host,
      port: settings.port,
      secure: settings.port === 465,
      auth: {
        user: settings.user,
        pass: settings.password
      }
    })

    await transporter.verify()
    return { success: true }
  } catch (error) {
    console.error('SMTP test failed:', error)
    throw new Error('Failed to connect to SMTP server')
  }
}
