'use client'

import { useState } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Loader2, Check } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { Editor } from '@/components/ui/editor'
import { sendResponseEmail } from '@/app/admin/responses/actions'

interface ReplyDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  response: {
    id: string
    formType: string
    data: {
      email: string
      firstName?: string
      name?: string
      message?: string
    }
  }
}

export function ReplyDialog({ open, onOpenChange, response }: ReplyDialogProps) {
  const { toast } = useToast()
  const [sending, setSending] = useState(false)
  const [sent, setSent] = useState(false)
  const [subject, setSubject] = useState(
    `Re: ${response.formType === 'contact' ? 'Contact' : 'Get Started'} Form Submission`
  )

  const emailTemplate = `
    <div style="font-family: sans-serif; color: #333;">
      <p>Dear ${response.data.firstName || response.data.name},</p>
      <p>Thank you for your message.</p>
      <br/>
      <div style="padding: 12px 0; color: #666;">
        <div style="border-left: 2px solid #e2e8f0; padding-left: 12px; margin: 8px 0;">
          <p style="color: #666; font-size: 14px;">Original Message:</p>
          ${response.data.message || ''}
        </div>
      </div>
      <br/>
      <p style="color: #666; font-size: 12px;">
        Best regards,<br/>
        Spurring Ventures
      </p>
    </div>
  `

  const [content, setContent] = useState(emailTemplate)

  const handleSend = async () => {
    setSending(true)
    try {
      await sendResponseEmail({
        to: response.data.email,
        subject,
        message: content,
        responseId: response.id
      })
      setSent(true)
      toast({ 
        title: "Email sent successfully",
        description: `Reply sent to ${response.data.email}`
      })
      setTimeout(() => {
        onOpenChange(false)
        setSent(false)
      }, 2000)
    } catch (error) {
      toast({
        title: "Failed to send email",
        variant: "destructive"
      })
    } finally {
      setSending(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={sent ? undefined : onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Reply to {response.data.email}</DialogTitle>
        </DialogHeader>
        <div className="space-y-4 py-4">
          {sent ? (
            <div className="flex flex-col items-center justify-center py-8">
              <div className="h-12 w-12 rounded-full bg-green-100 flex items-center justify-center mb-4">
                <Check className="h-6 w-6 text-green-600" />
              </div>
              <h3 className="text-lg font-medium">Email Sent Successfully</h3>
              <p className="text-sm text-muted-foreground">
                Your reply has been sent to {response.data.email}
              </p>
            </div>
          ) : (
            <>
              <div className="space-y-2">
                <Input
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  placeholder="Subject"
                />
              </div>
              <Editor 
                value={content}
                onChange={setContent}
                placeholder="Write your reply..."
              />
            </>
          )}
        </div>
        <DialogFooter>
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
            disabled={sending}
          >
            Cancel
          </Button>
          <Button onClick={handleSend} disabled={sending}>
            {sending ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Sending...
              </>
            ) : (
              'Send Reply'
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
