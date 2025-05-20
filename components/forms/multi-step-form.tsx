"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { useRouter } from "next/navigation"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useToast } from "@/hooks/use-toast"
import {
  Building2,
  Factory,
  ShoppingBag,
  Truck,
  Building,
  Globe,
  Check,
  AlertCircle,
  Loader2,
} from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"

const formSchema = z.object({
  industry: z.string().min(1, "Please select an industry"),
  firstName: z.string().min(2, "First name is required"),
  lastName: z.string().min(2, "Last name is required"),
  phone: z.string().min(10, "Valid phone number is required"),
  email: z.string().email("Valid email is required"),
  companyName: z.string().min(2, "Company name is required"),
})

const industries = [
  { id: "manufacturing", name: "Manufacturing", icon: Factory },
  { id: "retail", name: "Retail", icon: ShoppingBag },
  { id: "logistics", name: "Logistics", icon: Truck },
  { id: "real-estate", name: "Real Estate", icon: Building2 },
  { id: "corporate", name: "Corporate", icon: Building },
  { id: "other", name: "All Others", icon: Globe },
]

interface MultiStepFormProps {
  onComplete?: () => void
}

export function MultiStepForm({ onComplete }: MultiStepFormProps) {
  const [step, setStep] = useState(1)
  const [loading, setLoading] = useState(false)
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const { toast } = useToast()
  const router = useRouter()
  
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      industry: "",
      firstName: "",
      lastName: "",
      phone: "",
      email: "",
      companyName: "",
    },
  })

  const nextStep = () => {
    // Validate fields for current step before proceeding
    if (step === 1) {
      if (!form.getValues('industry')) {
        toast({
          title: "Required",
          description: "Please select an industry",
          variant: "destructive",
        })
        return
      }
    }
    setStep(step + 1)
  }

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    console.log('Form submitted with data:', data) // Debug log
    
    // Validate form data
    const isValid = await form.trigger()
    if (!isValid) {
      console.log('Form validation failed:', form.formState.errors)
      toast({
        title: "Error",
        description: "Please fill in all required fields",
        variant: "destructive",
      })
      return
    }

    setLoading(true)
    setStatus('loading')

    try {
      console.log('Submitting form data:', data) // Debug log
      const res = await fetch('/api/forms', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          formType: 'getStarted',
          data
        })
      })

      if (!res.ok) throw new Error('Failed to submit form')

      setStatus('success')
      toast({
        title: "Successfully submitted!",
        description: "We'll review your information and get back to you shortly.",
      })

      if (onComplete) {
        setTimeout(onComplete, 2000)
      }
    } catch (error) {
      console.error('Form submission error:', error) // Debug log
      setStatus('error')
      toast({
        title: "Submission failed",
        description: "Please try again or contact us directly.",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const prevStep = () => setStep(step - 1)

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="max-w-3xl mx-auto">
      <Card>
        <CardContent className="pt-6">
          {status === 'success' && (
            <Alert className="mb-6 bg-green-50 text-green-600 border-green-200">
              <Check className="h-4 w-4" />
              <AlertDescription>Form submitted successfully! We&apos;ll be in touch soon.</AlertDescription>
            </Alert>
          )}
          
          {status === 'error' && (
            <Alert className="mb-6 bg-red-50 text-red-600 border-red-200">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>Failed to submit form. Please try again.</AlertDescription>
            </Alert>
          )}

          <AnimatePresence mode="wait">
            {step === 1 && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-4"
              >
                <h2 className="text-2xl font-bold mb-6">What industry is your company in?</h2>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {industries.map((industry) => {
                    const Icon = industry.icon
                    return (
                      <button
                        key={industry.id}
                        type="button"
                        onClick={() => {
                          form.setValue("industry", industry.id)
                          nextStep()
                        }}
                        className={`p-6 rounded-lg border-2 hover:border-primary transition-colors text-center space-y-2 ${
                          form.watch("industry") === industry.id ? "border-primary" : "border-muted"
                        }`}
                      >
                        <Icon className="w-8 h-8 mx-auto text-primary" />
                        <span className="block font-medium">{industry.name}</span>
                      </button>
                    )
                  })}
                </div>
              </motion.div>
            )}

            {step === 2 && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6"
              >
                <h2 className="text-2xl font-bold mb-6">Where can we reach you?</h2>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">First Name</Label>
                    <Input
                      id="firstName"
                      {...form.register("firstName")}
                      placeholder="John"
                    />
                    {form.formState.errors.firstName && (
                      <p className="text-sm text-red-500 mt-1">
                        {form.formState.errors.firstName.message}
                      </p>
                    )}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName">Last Name</Label>
                    <Input
                      id="lastName"
                      {...form.register("lastName")}
                      placeholder="Doe"
                    />
                    {form.formState.errors.lastName && (
                      <p className="text-sm text-red-500 mt-1">
                        {form.formState.errors.lastName.message}
                      </p>
                    )}
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="companyName">Company Name</Label>
                  <Input
                    id="companyName"
                    {...form.register("companyName")}
                    placeholder="Acme Inc."
                  />
                  {form.formState.errors.companyName && (
                    <p className="text-sm text-red-500 mt-1">
                      {form.formState.errors.companyName.message}
                    </p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Company Email</Label>
                  <Input
                    id="email"
                    type="email"
                    {...form.register("email")}
                    placeholder="john@company.com"
                  />
                  {form.formState.errors.email && (
                    <p className="text-sm text-red-500 mt-1">
                      {form.formState.errors.email.message}
                    </p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input
                    id="phone"
                    {...form.register("phone")}
                    placeholder="+1 (555) 000-0000"
                  />
                  {form.formState.errors.phone && (
                    <p className="text-sm text-red-500 mt-1">
                      {form.formState.errors.phone.message}
                    </p>
                  )}
                </div>
                <p className="text-sm text-muted-foreground">
                  By clicking Get Started, I acknowledge receipt of the{" "}
                  <a href="/privacy" className="text-primary hover:underline">
                    Spurring Privacy Policy
                  </a>
                  .
                </p>
              </motion.div>
            )}
          </AnimatePresence>

          <div className="flex justify-between mt-8">
            {step > 1 && (
              <Button 
                type="button" 
                variant="outline" 
                onClick={prevStep}
                disabled={loading || status === 'success'}
              >
                Previous
              </Button>
            )}
            {step < 2 ? (
              <Button 
                type="button" 
                onClick={nextStep} 
                className="ml-auto"
                disabled={loading || status === 'success'}
              >
                Next
              </Button>
            ) : (
              <Button 
                type="submit" 
                className="ml-auto"
                disabled={loading || status === 'success'}
              >
                {loading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Submitting...
                  </>
                ) : status === 'success' ? (
                  <>
                    <Check className="mr-2 h-4 w-4" />
                    Submitted
                  </>
                ) : (
                  "Get Started"
                )}
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    </form>
  )
}
