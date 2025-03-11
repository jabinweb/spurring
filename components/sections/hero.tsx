"use client"

import { Button } from "@/components/ui/button"
import Link from "next/link"
import { motion } from "framer-motion"
import { InteractiveGrid } from "./interactive-grid"
import { ArrowRight, Sparkles } from "lucide-react"

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <InteractiveGrid />
      
      <div className="relative z-10 max-w-5xl mx-auto px-4 pt-20 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 bg-primary/10 border border-primary/20 rounded-full px-4 py-2 mb-6"
        >
          <Sparkles className="h-4 w-4 text-primary" />
          <span className="text-sm font-medium bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
            Announcing Our New AI Suite →
          </span>
        </motion.div>

        <motion.h1 
          className="text-4xl md:text-6xl font-bold mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          Transform Business with<br></br>{' '}
          <span className="bg-gradient-to-r from-primary via-purple-500 to-pink-500 bg-clip-text text-transparent">
            Next-Gen AI
          </span>
        </motion.h1>
        
        <motion.p 
          className="text-xl text-muted-foreground mb-12 max-w-2xl mx-auto leading-relaxed"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          Transform your enterprise with our cutting-edge AI solutions. From intelligent automation 
          to predictive analytics, we're helping businesses across India achieve unprecedented growth 
          and efficiency.
        </motion.p>

        <motion.div
          className="flex flex-col sm:flex-row gap-4 justify-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <Button size="lg" className="rounded-full px-8" asChild>
            <Link href="/contact">
              Get Started
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
          <Button size="lg" variant="outline" className="rounded-full px-8" asChild>
            <Link href="/services">Explore Solutions</Link>
          </Button>
        </motion.div>

        {/* Trust Indicators */}
        <motion.div
          className="mt-16 pt-8 border-t border-primary/10 flex flex-wrap justify-center gap-x-8 gap-y-4 text-sm text-muted-foreground"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <span>Trusted by 500+ Companies</span>
          <span>ISO 27001 Certified</span>
          <span>NASSCOM Member</span>
          <span>24/7 Expert Support</span>
        </motion.div>
      </div>

      <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-background to-transparent pointer-events-none" />
    </section>
  )
}
