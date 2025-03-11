"use client"

import { Button } from "@/components/ui/button"
import Link from "next/link"
import { motion } from "framer-motion"
import { InteractiveGrid } from "./interactive-grid"

export function Hero() {
  return (
    <section className="relative flex flex-col items-center justify-center min-h-[85vh] overflow-hidden bg-background">
      {/* Interactive background */}
      <InteractiveGrid />

      {/* Content container */}
      <div className="container relative z-1 px-4 mx-auto">
        <div className="text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="inline-block">
              <div className="inline-flex items-center rounded-full px-3 py-1 text-sm font-semibold leading-6 text-primary ring-1 ring-primary/20 bg-primary/5">
                <span>Announcing Our New AI Suite</span>
                <motion.div
                  className="ml-2"
                  animate={{ x: [0, 3, 0] }}
                  transition={{ repeat: Infinity, duration: 1.5 }}
                >
                  →
                </motion.div>
              </div>
            </div>
          </motion.div>

          <motion.h1
            className="mt-8 text-[2.5rem] font-bold leading-[1.1] tracking-tight md:text-6xl lg:text-7xl max-w-4xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <span className="inline-block bg-clip-text text-transparent bg-gradient-to-r from-foreground to-foreground/70">
              Transform Business with{" "}
            </span>
            <span className="inline-block text-primary relative">
              AI Innovation
              <motion.div 
                className="absolute -bottom-2 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-primary to-transparent"
                initial={{ scaleX: 0, opacity: 0 }}
                animate={{ scaleX: 1, opacity: 1 }}
                transition={{ duration: 1, delay: 0.5 }}
              />
              <motion.div 
                className="absolute -bottom-2 left-0 right-0 h-[2px] bg-primary/30 blur-sm"
                initial={{ scaleX: 0, opacity: 0 }}
                animate={{ scaleX: 1, opacity: 1 }}
                transition={{ duration: 1, delay: 0.5 }}
              />
            </span>
          </motion.h1>

          <motion.p
            className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground md:text-xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            Empower your business with cutting-edge AI solutions. From generative AI to intelligent automation,
            we deliver tomorrow's technology today.
          </motion.p>

          <motion.div
            className="mt-10 flex flex-wrap justify-center gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            <Button
              size="lg"
              className="h-12 px-8 text-base font-medium transition-shadow hover:shadow-primary/25 hover:shadow-xl"
              asChild
            >
              <Link href="/contact">Get Started</Link>
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="h-12 px-8 text-base font-medium transition-all hover:bg-primary/5"
              asChild
            >
              <Link href="/projects">View Projects</Link>
            </Button>
          </motion.div>
        </div>

        {/* Floating elements */}
        <div className="absolute inset-0 -z-10 overflow-hidden">
          <motion.div
            className="absolute left-1/4 top-1/4 h-72 w-72 rounded-full bg-primary/10 blur-3xl"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.2, 0.3],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          <motion.div
            className="absolute right-1/4 bottom-1/4 h-96 w-96 rounded-full bg-secondary/20 blur-3xl"
            animate={{
              scale: [1.2, 1, 1.2],
              opacity: [0.2, 0.3, 0.2],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 2
            }}
          />
        </div>
      </div>

      {/* Bottom gradient */}
      <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-background to-transparent" />
    </section>
  )
}
