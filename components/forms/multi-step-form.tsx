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
} from "lucide-react"

const formSchema = z.object({
  industry: z.string().min(1, "Please select an industry"),
  fleetSize: z.string().min(1, "Please select a fleet size"),
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

const fleetSizes = [
  "1-10 vehicles",
  "11-50 vehicles",
  "51-200 vehicles",
  "201-500 vehicles",
  "500+ vehicles",
]

interface MultiStepFormProps {
  onComplete?: () => void
}

export function MultiStepForm({ onComplete }: MultiStepFormProps) {
  const [step, setStep] = useState(1)
  const { toast } = useToast()
  const router = useRouter()
  
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      industry: "",
      fleetSize: "",
      firstName: "",
      lastName: "",
      phone: "",
      email: "",
      companyName: "",
    },
  })

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    try {
      // Here you would typically send the data to your API
      console.log(data)
      
      toast({
        title: "Success!",
        description: "Thank you for your interest. We'll be in touch soon!",
      })

      // Call onComplete callback instead of redirecting
      if (onComplete) {
        setTimeout(onComplete, 2000)
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      })
    }
  }

  const nextStep = () => setStep(step + 1)
  const prevStep = () => setStep(step - 1)

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="max-w-3xl mx-auto">
      <Card>
        <CardContent className="pt-6">
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
                className="space-y-4"
              >
                <h2 className="text-2xl font-bold mb-6 text-center">
                  How many vehicles or assets do you operate?
                </h2>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4 place-items-center max-w-2xl mx-auto">
                  {fleetSizes.map((size) => (
                    <button
                      key={size}
                      type="button"
                      onClick={() => {
                        form.setValue("fleetSize", size)
                        nextStep()
                      }}
                      className={`w-full p-6 rounded-lg border-2 hover:border-primary transition-colors text-center ${
                        form.watch("fleetSize") === size ? "border-primary bg-primary/5" : "border-muted"
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </motion.div>
            )}

            {step === 3 && (
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
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName">Last Name</Label>
                    <Input
                      id="lastName"
                      {...form.register("lastName")}
                      placeholder="Doe"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="companyName">Company Name</Label>
                  <Input
                    id="companyName"
                    {...form.register("companyName")}
                    placeholder="Acme Inc."
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Company Email</Label>
                  <Input
                    id="email"
                    type="email"
                    {...form.register("email")}
                    placeholder="john@company.com"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input
                    id="phone"
                    {...form.register("phone")}
                    placeholder="+1 (555) 000-0000"
                  />
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
              <Button type="button" variant="outline" onClick={prevStep}>
                Previous
              </Button>
            )}
            {step < 3 ? (
              <Button type="button" onClick={nextStep} className="ml-auto">
                Next
              </Button>
            ) : (
              <Button type="submit" className="ml-auto">
                Get Started
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    </form>
  )
}
