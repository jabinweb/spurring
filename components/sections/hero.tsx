"use client"

import { Button } from "@/components/ui/button"
import Link from "next/link"
import { motion } from "framer-motion"
import { InteractiveGrid } from "./interactive-grid"
import { ArrowRight } from "lucide-react"
import { Container } from "../ui/container"

export function Hero() {
  return (
    <section className="relative min-h-[70vh] flex items-center justify-center overflow-hidden px-4">
      <Container>
        {/* Background interactive grid on the right */}
        <div className="absolute inset-0 -z-10">
          <InteractiveGrid />
        </div>

        <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 items-center gap-12 max-w-7xl w-full mx-auto pt-20">
          {/* Left: Text Content */}
          <div>
            <motion.h1
              className="text-3xl md:text-5xl font-bold mb-6 !leading-[1.3]"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              Transform Business <br /> with&nbsp; 
              <span className="bg-gradient-to-r from-primary via-purple-500 to-pink-500 bg-clip-text text-transparent">
               Next-Gen AI
              </span>
            </motion.h1>

            <motion.p
              className="text-lg md:text-xl text-muted-foreground mb-8 max-w-xl"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
            Empower your business with AI-driven automation and insights for smarter, faster growth.
            </motion.p>

            <motion.div
              className="flex flex-col sm:flex-row gap-4"
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
            {/* <motion.div
              className="mt-12 pt-6 border-t border-primary/10 flex flex-wrap gap-6 text-sm text-muted-foreground"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <span>Trusted by 500+ Companies</span>
              <span>ISO 27001 Certified</span>
              <span>NASSCOM Member</span>
              <span>24/7 Expert Support</span>
            </motion.div> */}
          </div>

          {/* Right: Visual/Video */}
          <motion.div
            className="relative w-full min-h-[300px] aspect-video rounded-2xl overflow-hidden shadow-lg"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <video
              src="https://videos.pexels.com/video-files/3141210/3141210-uhd_2560_1440_25fps.mp4"
              autoPlay
              muted
              loop
              playsInline
              className="object-cover w-full h-full"
            />
          </motion.div>
        </div>

        {/* Floating elements */}
        <div className="absolute inset-0 -z-10">
          <motion.div
            className="absolute left-1/4 top-1/4 h-72 w-72 rounded-full bg-primary/10 blur-3xl"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.2, 0.3],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut",
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
              delay: 2,
            }}
          />
        </div>

        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-background to-transparent pointer-events-none" />
      </Container>
    </section>
  )
}

