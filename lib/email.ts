import nodemailer from 'nodemailer'
import prisma from './db'

interface SmtpSettings {
  host: string
  port: number
  user: string
  password: string
  from: string
  fromName: string
}

export async function getSmtpSettings(): Promise<SmtpSettings | null> {
  try {
    const settings = await prisma.settings.findUnique({
      where: { key: 'smtp' }
    })
    return settings?.value as SmtpSettings | null
  } catch (error) {
    console.error('Failed to get SMTP settings:', error)
    return null
  }
}

export async function sendEmail(to: string, subject: string, html: string) {
  try {
    const settings = await getSmtpSettings()
    if (!settings) throw new Error('SMTP settings not configured')

    // Default sender name if not in settings
    const senderName = settings.fromName || 'Spurring Ventures'
    const actualFromAddress = settings.from || 'info@spurringventures.com'
    
    const transporter = nodemailer.createTransport({
      host: settings.host,
      port: settings.port,
      secure: false,
      auth: {
        user: settings.user,
        pass: settings.password
      }
    })

    const mailOptions = {
      from: {
        name: senderName,
        address: settings.user // Technical sending address (Brevo SMTP user)
      },
      sender: actualFromAddress, // Actual business email
      replyTo: {
        name: senderName,
        address: actualFromAddress
      },
      to,
      subject,
      html,
      headers: {
        'Organization': senderName,
        'X-Original-From': actualFromAddress,
        'Return-Path': actualFromAddress
      }
    }

    // Verify connection
    await transporter.verify()
    console.log('SMTP connection verified')

    console.log('Sending email with options:', {
      from: mailOptions.from,
      to: mailOptions.to,
      subject: mailOptions.subject
    })

    const result = await transporter.sendMail(mailOptions)
    console.log('Email sent successfully:', result.messageId)
    return result
  } catch (error) {
    console.error('Failed to send email:', error)
    throw error
  }
}
