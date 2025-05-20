'use server'

import { sendEmail } from '@/lib/email'

export async function sendResponseEmail(data: {
  to: string
  subject: string
  message: string
  responseId: string
}) {
  try {
    await sendEmail(
      data.to,
      data.subject,
      data.message
    )
    return { success: true }
  } catch (error) {
    console.error('Failed to send email:', error)
    throw new Error(error instanceof Error ? error.message : 'Failed to send email')
  }
}
