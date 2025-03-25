"use client"

import { motion } from "framer-motion"
import { useRef, useState } from "react"
import { Brain, Atom, Database, ArrowUpRight, CheckCircle, MessageSquare } from "lucide-react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Container } from "@/components/ui/container"

const services = [
  {
    icon: <Brain className="h-10 w-10" />,
    title: "AI Consulting",
    description: "We provide comprehensive AI consultation to guide business through complexities of the ever-evolving AI landscape. We assess our clients AI readiness, help implement AI technology to achieve their individualized organization targets.",
    features: [
      "AI Assessment",
      "AI Strategy Development",
      "AI Integration",
      "AI Solution Development",
      "AI Support"
    ],
    benefits: [
      "$13 trillion potential GDP impact by 2030",
      "30% competitive advantage by 2025",
      "Maximized efficiency",
      "Improved customer experience"
    ],
    metrics: {
      highlight: "$13T",
      label: "AI impact on global GDP by 2030"
    },
    technologies: ["Machine Learning", "Deep Learning", "Neural Networks", "AI Analytics"],
    useCases: [
      "Business Process Optimization",
      "Digital Transformation",
      "AI Readiness Assessment",
      "Technology Integration"
    ],
    color: "from-blue-600 to-violet-600",
    gradientBg: "from-blue-600/10 via-violet-600/5 to-transparent",
    link: "/contact",
    ctaText: "Consult our Team"
  },
  {
    icon: <Atom className="h-10 w-10" />, // Changed from AtomIcon to Atom
    title: "Generative AI",
    description: "We specialize in crafting AI solutions using the power of generative AI to revolutionize businesses across diverse industries. Using generative AI, we help our clients drive innovation, streamline operations and achieve scalable solutions.",
    features: [
      "Generative AI Consultation",
      "Strategy Development",
      "Performance Optimization",
      "Data Engineering",
      "Integration Services",
      "Support"
    ],
    benefits: [
      "$2.6-4.4T annual economic impact",
      "30% outbound marketing synthetic by 2025",
      "Automated content creation",
      "Accelerated design process"
    ],
    metrics: {
      highlight: "30%",
      label: "Synthetic marketing messages by 2025"
    },
    technologies: ["GPT", "DALL-E", "Stable Diffusion", "LLMs"],
    useCases: [
      "Content Automation",
      "Design Generation",
      "Code Generation",
      "Text Analysis"
    ],
    color: "from-purple-600 to-pink-600",
    gradientBg: "from-purple-600/10 via-pink-600/5 to-transparent",
    link: "/contact",
    ctaText: "Consult our Team"
  },
  {
    icon: <MessageSquare className="h-10 w-10" />,
    title: "Smart Assistance",
    description: "Our Smart Assistant service offers a powerful, AI-driven virtual assistant for seamless workplace productivity. We help our clients stay ahead by harnessing the power of AI to transform how the organization functions and its interactions with customers.",
    features: [
      "Data Integration",
      "Smart Assistance Deployment",
      "Personalized Coaching",
      "Continued Support"
    ],
    benefits: [
      "40% productivity boost",
      "20% cost reduction",
      "Streamlined operations",
      "Enhanced customer interaction"
    ],
    metrics: {
      highlight: "40%",
      label: "Productivity increase"
    },
    technologies: ["NLP", "Machine Learning", "Speech Recognition", "Chatbots"],
    useCases: [
      "Customer Service",
      "Process Automation",
      "Employee Support",
      "Data Analysis"
    ],
    color: "from-green-600 to-emerald-600",
    gradientBg: "from-green-600/10 via-emerald-600/5 to-transparent",
    link: "/contact",
    ctaText: "Consult our Team"
  },
  {
    icon: <Database className="h-10 w-10" />,
    title: "Data Mining",
    description: "We offer comprehensive data mining services, transforming raw data into actionable insights for strategic business decisions. We help our clients see patterns for informed decisions, boosting productivity and profitability.",
    features: [
      "Web Data Mining",
      "Social Media Mining",
      "Lead Data Mining",
      "Image Data Mining",
      "Excel Data Mining",
      "Word Data Mining",
      "PDF Data Mining"
    ],
    benefits: [
      "Enhanced decision making",
      "Pattern recognition",
      "Rapid turnaround",
      "Scalable solutions"
    ],
    metrics: {
      highlight: "100%",
      label: "Data-driven decisions"
    },
    technologies: ["Python", "R", "SQL", "Machine Learning"],
    useCases: [
      "Business Intelligence",
      "Market Analysis",
      "Customer Insights",
      "Trend Prediction"
    ],
    color: "from-red-600 to-rose-600",
    gradientBg: "from-red-600/10 via-rose-600/5 to-transparent",
    link: "/contact",
    ctaText: "Consult our Team"
  }
]

export function Services() {
  const [selectedService, setSelectedService] = useState<typeof services[0] | null>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  return (
    <section ref={containerRef} className="relative py-32 overflow-hidden">
      {/* Background Elements with lower z-index */}
      <div className="absolute inset-0 -z-20 bg-grid-pattern opacity-40" />
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-background via-transparent to-background" />
      
      <Container>
        {/* Section Header */}
        <div className="text-center mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-block"
          >
            <span className="px-4 py-2 rounded-full border border-primary/20 bg-primary/10 text-sm font-medium text-primary">
              Our Services
            </span>
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="mt-6 text-4xl font-bold tracking-tight"
          >
            Comprehensive AI Solutions
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="mt-4 text-xl text-muted-foreground max-w-2xl mx-auto"
          >
            Transform your business with our cutting-edge AI services
          </motion.p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <div 
                onClick={() => setSelectedService(service)}
                className="cursor-pointer block group"
              >
                <motion.div
                  className="relative h-full rounded-3xl p-8 overflow-hidden bg-gradient-to-br from-background to-muted"
                  whileHover={{ y: -5 }}
                  transition={{ duration: 0.3 }}
                >
                  {/* Service Content */}
                  <div className="relative z-10">
                    <div className={`inline-flex p-3 rounded-2xl bg-gradient-to-br ${service.gradientBg} mb-6`}>
                      <div className={`bg-gradient-to-br ${service.color} rounded-xl p-2 text-primary-foreground`}>
                        {service.icon}
                      </div>
                    </div>
                    <h3 className="text-2xl font-semibold mb-4 group-hover:text-primary transition-colors">
                      {service.title}
                    </h3>
                    <p className="text-muted-foreground mb-6">
                      {service.description}
                    </p>
                    {/* {service.features && (
                      <ul className="space-y-3 mb-6">
                        {service.features.map((feature, i) => (
                          <li key={i} className="flex items-center text-sm">
                            <div className="h-1.5 w-1.5 rounded-full bg-primary mr-3" />
                            {feature}
                          </li>
                        ))}
                      </ul>
                    )} */}
                    <motion.div
                      className="flex items-center text-primary font-medium"
                      whileHover={{ x: 5 }}
                    >
                      Learn more →
                    </motion.div>
                  </div>

                  {/* Background Gradient */}
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                </motion.div>
              </div>
            </motion.div>
          ))}
        </div>
      </Container>

      {/* Service Details Dialog */}
      <Dialog open={!!selectedService} onOpenChange={() => setSelectedService(null)}>
        <DialogContent className="max-w-3xl h-[90vh] overflow-y-auto">
          <DialogHeader>
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-4">
                <div className={`p-3 rounded-2xl bg-gradient-to-br ${selectedService?.gradientBg}`}>
                  <div className={`bg-gradient-to-br ${selectedService?.color} rounded-xl p-2 text-primary-foreground`}>
                    {selectedService?.icon}
                  </div>
                </div>
                <div>
                  <DialogTitle className="text-2xl mb-1">{selectedService?.title}</DialogTitle>
                  <DialogDescription>{selectedService?.description}</DialogDescription>
                </div>
              </div>
            </div>
          </DialogHeader>

          <div className="mt-6 space-y-8">
            {/* Key Features */}
            <div>
              <h3 className="text-lg font-semibold mb-4 flex items-center">
                <CheckCircle className="h-5 w-5 mr-2 text-primary" />
                Key Features
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {selectedService?.features.map((feature, i) => (
                  <div
                    key={i}
                    className="flex items-center p-3 rounded-lg bg-muted/50"
                  >
                    <div className="h-2 w-2 rounded-full bg-primary mr-3" />
                    {feature}
                  </div>
                ))}
              </div>
            </div>

            {/* Business Benefits */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Business Benefits</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {selectedService?.benefits.map((benefit, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1 }}
                    className="flex items-center"
                  >
                    <ArrowUpRight className="h-5 w-5 text-primary mr-2" />
                    <span>{benefit}</span>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Technologies */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Technologies</h3>
              <div className="flex flex-wrap gap-2">
                {selectedService?.technologies.map((tech, i) => (
                  <Badge key={i} variant="secondary">
                    {tech}
                  </Badge>
                ))}
              </div>
            </div>

            {/* Use Cases */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Use Cases</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {selectedService?.useCases.map((useCase, i) => (
                  <div
                    key={i}
                    className="p-4 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors"
                  >
                    {useCase}
                  </div>
                ))}
              </div>
            </div>

            {/* CTA */}
            <div className="flex justify-center pt-6">
              <Button size="lg" asChild>
                <a href={selectedService?.link}>
                  {selectedService?.ctaText}
                  <ArrowUpRight className="ml-2 h-4 w-4" />
                </a>
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </section>
  )
}
