'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Printer, Mail, Download, Loader2 } from "lucide-react"
import { sendResponseEmail } from '@/app/admin/responses/actions'
import { useToast } from "@/hooks/use-toast"
import { ReplyDialog } from './reply-dialog'

interface ResponseActionsProps {
  response: {
    id: string
    formType: string
    data: {
      email: string
      firstName?: string
      name?: string
    }
  }
}

export function ResponseActions({ response }: ResponseActionsProps) {
  const { toast } = useToast()
  const [sending, setSending] = useState(false)
  const [replyOpen, setReplyOpen] = useState(false)

  const mailtoLink = `mailto:${response.data.email}?subject=RE: ${
    response.formType === 'contact' ? 'Contact Form' : 'Get Started Form'
  } Submission&body=Dear ${response.data.firstName || response.data.name},`

  const handleExport = () => {
    const data = JSON.stringify(response, null, 2)
    const blob = new Blob([data], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `response-${response.id}.json`
    a.click()
  }

  const handleSendEmail = async () => {
    setSending(true)
    try {
      await sendResponseEmail({
        to: response.data.email,
        subject: `RE: ${response.formType === 'contact' ? 'Contact' : 'Get Started'} Form Submission`,
        message: `Dear ${response.data.firstName || response.data.name},\n\nThank you for your submission.`,
        responseId: response.id
      })
      toast({
        title: "Email Sent",
        description: "Response has been sent successfully."
      })
    } catch (error) {
      toast({
        title: "Failed to Send",
        description: error instanceof Error ? error.message : "Could not send email",
        variant: "destructive"
      })
    } finally {
      setSending(false)
    }
  }

  return (
    <>
      <div className="flex gap-2">
        <Button 
          variant="outline" 
          size="sm"
          onClick={() => window.print()}
        >
          <Printer className="w-4 h-4 mr-2" />
          Print
        </Button>

        <Button 
          variant="outline" 
          size="sm"
          onClick={handleExport}
        >
          <Download className="w-4 h-4 mr-2" />
          Export
        </Button>

        <Button
          variant="outline"
          size="sm"
          onClick={handleSendEmail}
          disabled={sending}
        >
          {sending ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Sending...
            </>
          ) : (
            <>
              <Mail className="mr-2 h-4 w-4" />
              Send Email
            </>
          )}
        </Button>

        <Button
          variant="outline"
          size="sm"
          onClick={() => setReplyOpen(true)}
        >
          <Mail className="mr-2 h-4 w-4" />
          Reply
        </Button>
      </div>
      
      <ReplyDialog 
        open={replyOpen}
        onOpenChange={setReplyOpen}
        response={response}
      />
    </>
  )
}
