"use client"

import { motion } from "framer-motion"
import { useRef, useState } from "react"
import { Brain, Atom, Database, ArrowUpRight, CheckCircle, MessageSquare } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Container } from "@/components/ui/container"
import { useRouter } from 'next/navigation'

const services = [
  {
    icon: <Brain className="h-10 w-10" />,
    title: "AI Consulting",
    description: "We specialise in delivering customised AI solutions through expert consultation, helping organisations optimise their operations and achieve strategic goals.",
    color: "from-blue-600 to-violet-600",
    gradientBg: "from-blue-600/10 via-violet-600/5 to-transparent",
    link: "/services/ai-consulting",
  },
  {
    icon: <Atom className="h-10 w-10" />, 
    title: "Generative AI",
    description: "We specialise in crafting AI solutions utilising generative AI to revolutionise organisations across diverse industries. Our customised solutions drive innovation and optimise operations.",
    color: "from-purple-600 to-pink-600",
    gradientBg: "from-purple-600/10 via-pink-600/5 to-transparent",
    link: "/services/generative-ai",
  },
  // {
  //   icon: <MessageSquare className="h-10 w-10" />,
  //   title: "Smart Assistance",
  //   description: "Our Smart Assistant service offers a powerful, AI-driven virtual assistant for seamless workplace productivity. We help our clients stay ahead by harnessing the power of AI to transform how the organisation functions and its interactions with customers.",
  //   color: "from-green-600 to-emerald-600",
  //   gradientBg: "from-green-600/10 via-emerald-600/5 to-transparent",
  //   link: "/services/smart-assistants",
  // },
  {
    icon: <Database className="h-10 w-10" />,
    title: "Data Mining",
    description: "We offer comprehensive data mining services, transforming raw data into actionable insights for strategic organisation decisions. We help our clients recognise patterns for informed decisions.",
    color: "from-red-600 to-rose-600",
    gradientBg: "from-red-600/10 via-rose-600/5 to-transparent",
    link: "/services/data-mining",
  }
]

export function Services() {
  const containerRef = useRef<HTMLDivElement>(null)
  const router = useRouter();

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
                onClick={() => router.push(service.link)}
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
    </section>
  )
}
