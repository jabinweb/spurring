"use client"

import { motion, useScroll, useTransform } from "framer-motion"
import { useRef, useState } from "react"
import { Brain, AtomIcon, CircuitBoard, Network, CloudCog, Database, X, ArrowUpRight, CheckCircle } from "lucide-react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

const services = [
  {
    icon: <Brain className="h-10 w-10" />,
    title: "Artificial Intelligence",
    description: "Enterprise AI solutions that drive innovation and growth through machine learning and deep learning.",
    features: ["Custom AI Models", "ML Pipeline Development", "AI Strategy Consulting"],
    benefits: [
      "30% average efficiency improvement",
      "Reduced operational costs",
      "Enhanced decision making",
      "Automated workflows"
    ],
    technologies: ["TensorFlow", "PyTorch", "scikit-learn", "OpenAI"],
    useCases: [
      "Predictive Analytics",
      "Natural Language Processing",
      "Computer Vision",
      "Automated Decision Systems"
    ],
    color: "from-blue-600 to-violet-600",
    gradientBg: "from-blue-600/10 via-violet-600/5 to-transparent",
    link: "/services/ai"
  },
  {
    icon: <AtomIcon className="h-10 w-10" />,
    title: "Generative AI",
    description: "Next-gen generative AI solutions for content, design, and development automation.",
    features: ["LLM Integration", "Content Generation", "Creative AI Tools"],
    benefits: [
      "Increased creativity",
      "Faster content production",
      "Cost-effective design solutions",
      "Enhanced user experiences"
    ],
    technologies: ["GPT-3", "DALL-E", "Stable Diffusion", "MidJourney"],
    useCases: [
      "Automated Content Creation",
      "AI-Driven Design",
      "Personalized User Experiences",
      "Creative Assistance"
    ],
    color: "from-purple-600 to-pink-600",
    gradientBg: "from-purple-600/10 via-pink-600/5 to-transparent",
    link: "/services/gen-ai"
  },
  {
    icon: <CircuitBoard className="h-10 w-10" />,
    title: "IoT Solutions",
    description: "Transform traditional systems with smart IoT operations and analytics.",
    features: ["Device Integration", "Real-time Monitoring", "Predictive Maintenance"],
    benefits: [
      "Improved operational efficiency",
      "Enhanced data insights",
      "Reduced downtime",
      "Remote monitoring capabilities"
    ],
    technologies: ["MQTT", "Zigbee", "LoRaWAN", "AWS IoT"],
    useCases: [
      "Smart Home Automation",
      "Industrial IoT",
      "Healthcare Monitoring",
      "Supply Chain Optimization"
    ],
    color: "from-green-600 to-emerald-600",
    gradientBg: "from-green-600/10 via-emerald-600/5 to-transparent",
    link: "/services/iot"
  },
  {
    icon: <Network className="h-10 w-10" />,
    title: "Blockchain",
    description: "Next-level automation and transparency with blockchain solutions.",
    features: ["Smart Contracts", "Decentralized Applications", "Blockchain Integration"],
    benefits: [
      "Increased transparency",
      "Enhanced security",
      "Reduced fraud",
      "Automated processes"
    ],
    technologies: ["Ethereum", "Hyperledger", "Solidity", "Chainlink"],
    useCases: [
      "Supply Chain Management",
      "Financial Services",
      "Identity Verification",
      "Decentralized Finance"
    ],
    color: "from-orange-600 to-amber-600",
    gradientBg: "from-orange-600/10 via-amber-600/5 to-transparent",
    link: "/services/blockchain"
  },
  {
    icon: <CloudCog className="h-10 w-10" />,
    title: "Cloud Services",
    description: "End-to-end cloud development and migration services.",
    features: ["Cloud Strategy", "Migration Services", "Managed Cloud"],
    benefits: [
      "Scalability",
      "Cost savings",
      "Improved collaboration",
      "Enhanced security"
    ],
    technologies: ["AWS", "Azure", "Google Cloud", "Kubernetes"],
    useCases: [
      "Cloud Migration",
      "DevOps Automation",
      "Disaster Recovery",
      "Cloud-Native Development"
    ],
    color: "from-sky-600 to-cyan-600",
    gradientBg: "from-sky-600/10 via-cyan-600/5 to-transparent",
    link: "/services/cloud"
  },
  {
    icon: <Database className="h-10 w-10" />,
    title: "Data Engineering",
    description: "Scalable data pipelines and real-time analytics solutions.",
    features: ["Data Warehousing", "ETL Processes", "Real-time Analytics"],
    benefits: [
      "Improved data quality",
      "Faster data processing",
      "Enhanced decision making",
      "Scalable data solutions"
    ],
    technologies: ["Apache Spark", "Kafka", "Snowflake", "BigQuery"],
    useCases: [
      "Data Integration",
      "Business Intelligence",
      "Real-time Data Processing",
      "Data Lake Management"
    ],
    color: "from-red-600 to-rose-600",
    gradientBg: "from-red-600/10 via-rose-600/5 to-transparent",
    link: "/services/data"
  }
]

export function Services() {
  const [selectedService, setSelectedService] = useState<typeof services[0] | null>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  })

  return (
    <section ref={containerRef} className="relative py-32 overflow-hidden">
      {/* Background Effects */}
      <motion.div className="absolute inset-0 bg-grid-pattern opacity-40"      />
      <div className="absolute inset-0 bg-gradient-to-b from-background via-transparent to-background" />
      
      <motion.div 
        className="relative max-w-7xl mx-auto px-4"
      >
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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
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
                    {service.features && (
                      <ul className="space-y-3 mb-6">
                        {service.features.map((feature, i) => (
                          <li key={i} className="flex items-center text-sm">
                            <div className="h-1.5 w-1.5 rounded-full bg-primary mr-3" />
                            {feature}
                          </li>
                        ))}
                      </ul>
                    )}
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
      </motion.div>

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
                  Learn More About {selectedService?.title}
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
