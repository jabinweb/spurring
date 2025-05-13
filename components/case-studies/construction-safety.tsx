"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import { Container } from "@/components/ui/container"
import { Card, CardContent } from "@/components/ui/card"
import { Shield, Clock, Target } from "lucide-react"

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
        {/* Section Header */}
        <div className="text-center mb-20">
          <div className="inline-flex items-center gap-2 bg-primary/10 border border-primary/20 rounded-full px-4 py-2 mb-4">
            <span className="text-sm font-medium bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
              Featured Case Study
            </span>
          </div>
          <h2 className="text-4xl font-bold mb-4">Success Story</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Discover how our AI solutions are transforming industries and delivering measurable results
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-6"
          >

            {/* <h2 className="text-3xl font-bold">
              Improving Construction Safety with AI
            </h2> */}

          <div className="relative rounded-2xl overflow-hidden bg-muted/5 border p-6">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent" />
            <p className="text-lg text-muted-foreground leading-relaxed">
              Spurring Ventures focuses on developing AI-powered vision analysis platform designed to transform the construction industry. By leveraging advanced computer vision and deep learning algorithms, we are creating a solution that allows teams to detect and assess project risks, even in complex and dynamic environments.
            </p>
            <p className="text-lg text-muted-foreground leading-relaxed">
              This cutting-edge AI technology provides data-driven insights that enhance decision-making, optimise resource allocation, and automate risk mitigation. With this new technology, construction project managers are equipped with the tools they need to drive operational efficiency and deliver superior project outcomes.
            </p>
          </div>


            {/* Metrics */}
            <div className="grid grid-cols-3 gap-6 pt-6">
              {metrics.map((metric, index) => (
                <Card key={index}>
                  <CardContent className="p-4 text-center space-y-2">
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
            className="relative h-full rounded-2xl overflow-hidden"
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
