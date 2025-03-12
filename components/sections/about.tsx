"use client"

import { motion } from "framer-motion"
import { Brain, Cpu, Rocket, Target } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export function About() {
  const features = [
    {
      icon: <Brain className="h-6 w-6" />,
      title: "AI Excellence",
      description: "Transform business operations with state-of-the-art artificial intelligence solutions"
    },
    {
      icon: <Cpu className="h-6 w-6" />,
      title: "Deep Tech Expertise",
      description: "Industry-leading expertise in machine learning and neural networks"
    },
    {
      icon: <Rocket className="h-6 w-6" />,
      title: "Rapid Innovation",
      description: "Fast-track digital transformation with proven AI frameworks"
    },
    {
      icon: <Target className="h-6 w-6" />,
      title: "Strategic Impact",
      description: "Drive measurable outcomes through strategic AI implementation"
    }
  ]

  return (
    <section className="relative py-24 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-grid-pattern opacity-40" />
      <div className="absolute inset-0 bg-gradient-to-b from-background via-transparent to-background" />
      
      <div className="relative max-w-7xl mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="space-y-8"
            >
              <div className="inline-flex items-center gap-2 bg-primary/10 border border-primary/20 rounded-full px-4 py-2">
                <span className="text-sm font-medium bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
                  Pioneering AI Excellence
                </span>
              </div>
              
              <h2 className="text-4xl md:text-5xl font-bold !leading-[1.3] tracking-tight">
                Empowering Innovation with{' '}
                <span className="bg-gradient-to-r from-primary via-purple-500 to-pink-500 bg-clip-text text-transparent">
                  AI-Driven Solutions
                </span>
              </h2>

              <p className="text-lg text-muted-foreground leading-relaxed">
                We harness cutting-edge AI to transform businesses. Our solutions 
                drive innovation, efficiency, and growth across industries.
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" className="rounded-full" asChild>
                  <Link href="/contact">Schedule a Consultation</Link>
                </Button>
                <Button size="lg" variant="outline" className="rounded-full" asChild>
                  <Link href="/about">Discover Our Story</Link>
                </Button>
              </div>
            </motion.div>
          </div>

          <div className="grid sm:grid-cols-2 gap-6">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-background to-muted p-6"
              >
                {/* Animated border effect */}
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-primary/50 via-purple-500/50 to-pink-500/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="absolute inset-[1px] rounded-2xl bg-background" />
                
                {/* Moving gradient */}
                <div className="absolute inset-[1px] rounded-2xl overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                </div>

                {/* Content */}
                <div className="relative z-10">
                  <div className="mb-3 text-primary">
                    {feature.icon}
                  </div>
                  <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                  <p className="text-[15px] leading-relaxed text-muted-foreground">
                    {feature.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
