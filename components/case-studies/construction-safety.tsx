"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import { Container } from "@/components/ui/container"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowRight, Shield, Clock, Target } from "lucide-react"
import Link from "next/link"

export function ConstructionSafetyCaseStudy() {
  const metrics = [
    {
      icon: Shield,
      value: "85%",
      label: "Risk Detection Rate"
    },
    {
      icon: Clock,
      value: "60%",
      label: "Faster Response Time"
    },
    {
      icon: Target,
      value: "40%",
      label: "Incident Reduction"
    }
  ]

  return (
    <section className="py-24 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 -z-20">
        <div className="absolute inset-0 bg-grid-pattern opacity-[0.2]" />
        <div className="absolute inset-0 bg-gradient-to-b from-background via-transparent to-background" />
      </div>

      <Container>
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <div className="inline-block px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium">
              Case Study
            </div>
            <h2 className="text-3xl font-bold">
              Improving Construction Safety with AI
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Spurring Ventures is collaborating with Cornerstone Analytics to develop an AI-powered vision analysis platform designed to transform the construction industry. By leveraging advanced computer vision and deep learning algorithms, we are creating a solution that allows teams to detect and assess project risks, even in complex and dynamic environments.
            </p>
            <p className="text-lg text-muted-foreground leading-relaxed">
              This cutting-edge AI technology provides data-driven insights that enhance decision-making, optimise resource allocation, and automate risk mitigation. With this new technology, construction project managers are equipped with the tools they need to drive operational efficiency and deliver superior project outcomes.
            </p>

            {/* Metrics */}
            <div className="grid grid-cols-3 gap-6 pt-6">
              {metrics.map((metric, index) => (
                <Card key={index}>
                  <CardContent className="p-6 text-center space-y-2">
                    <metric.icon className="h-6 w-6 text-primary mx-auto" />
                    <div className="text-2xl font-bold">{metric.value}</div>
                    <div className="text-sm text-muted-foreground">{metric.label}</div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* <Button size="lg" className="mt-8" asChild>
              <Link href="/contact">
                Learn More
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button> */}
          </motion.div>

          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative h-[500px] rounded-2xl overflow-hidden"
          >
            <Image
              src="/images/construction-ai.png"
              alt="AI-powered construction safety"
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          </motion.div>
        </div>
      </Container>
    </section>
  )
}
