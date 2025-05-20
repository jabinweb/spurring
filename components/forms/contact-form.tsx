"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { useState } from "react"
import { toast } from "@/hooks/use-toast"
import { Check, AlertCircle } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"

export function ContactForm() {
  const [loading, setLoading] = useState(false)
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    message: ""
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setStatus('loading')

    try {
      const res = await fetch('/api/forms', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          formType: 'contact',
          data: formData
        })
      })

      if (!res.ok) throw new Error('Failed to submit form')

      setStatus('success')
      toast({
        title: "Message sent successfully!",
        description: "Thank you for contacting us. We'll get back to you within 24-48 hours.",
      })

      // Reset form
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        message: ""
      })
    } catch (error) {
      setStatus('error')
      toast({
        title: "Submission failed",
        description: "Please try again or contact us directly via email.",
        variant: "destructive"
      })
    } finally {
      setLoading(false)
      // Reset status after 5 seconds
      setTimeout(() => setStatus('idle'), 5000)
    }
  }

  return (
    <Card>
      <CardContent className="p-6">
        {status === 'success' && (
          <Alert className="mb-6 bg-green-50 text-green-600 border-green-200">
            <Check className="h-4 w-4" />
            <AlertDescription>Your message has been sent successfully!</AlertDescription>
          </Alert>
        )}
        
        {status === 'error' && (
          <Alert className="mb-6 bg-red-50 text-red-600 border-red-200">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>Failed to send message. Please try again.</AlertDescription>
          </Alert>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium mb-2 block">First Name</label>
              <Input 
                placeholder="John" 
                value={formData.firstName}
                onChange={(e) => setFormData(prev => ({ ...prev, firstName: e.target.value }))}
                required
              />
            </div>
            <div>
              <label className="text-sm font-medium mb-2 block">Last Name</label>
              <Input 
                placeholder="Doe" 
                value={formData.lastName}
                onChange={(e) => setFormData(prev => ({ ...prev, lastName: e.target.value }))}
                required
              />
            </div>
          </div>
          <div>
            <label className="text-sm font-medium mb-2 block">Email</label>
            <Input 
              type="email" 
              placeholder="john@example.com" 
              value={formData.email}
              onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
              required
            />
          </div>
          <div>
            <label className="text-sm font-medium mb-2 block">Phone</label>
            <Input 
              placeholder="+91 98765 43210" 
              value={formData.phone}
              onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
              required
            />
          </div>
          <div>
            <label className="text-sm font-medium mb-2 block">Message</label>
            <Textarea
              placeholder="Tell us about your project..."
              className="min-h-[150px]"
              value={formData.message}
              onChange={(e) => setFormData(prev => ({ ...prev, message: e.target.value }))}
              required
            />
          </div>
          <Button 
            type="submit" 
            className="w-full" 
            disabled={loading || status === 'success'}
          >
            {loading ? "Sending..." : status === 'success' ? "Sent!" : "Send Message"}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
