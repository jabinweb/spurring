"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Container } from "@/components/ui/container"
import Link from "next/link"
import { ArrowRight } from "lucide-react"

const slides = [
  {
    image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80",
    badge: "Join Our Team",
    title: "Build the Future with AI Innovation",
    description: "Be part of a team that's revolutionizing industries through artificial intelligence",
    stats: ["50+ Team Members", "4.8★ Rating", "12+ Countries"]
  },
  {
    image: "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&q=80",
    badge: "Work Culture",
    title: "Innovation Meets Growth",
    description: "Experience a culture that values creativity, learning, and personal development",
    stats: ["Flexible Work", "Global Team", "Fast Growth"]
  },
  {
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80",
    badge: "Benefits",
    title: "Thrive With Us",
    description: "Enjoy competitive compensation and benefits that support your wellbeing",
    stats: ["Competitive Pay", "Health Benefits", "Learning Budget"]
  }
]

export function CareerHeroSlider() {
  const [currentSlide, setCurrentSlide] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [])

  return (
    <section className="relative min-h-[80vh] overflow-hidden">
      {/* Background Slides */}
      <AnimatePresence initial={false}>
        <motion.div
          key={currentSlide}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1 }}
          className="absolute inset-0"
        >
          <Image
            src={slides[currentSlide].image}
            alt="Career at Spurring"
            fill
            className="object-cover brightness-[0.7]"
            priority
          />
          {/* Updated dark gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/70" />
        </motion.div>
      </AnimatePresence>

      {/* Content */}
      <Container className="relative h-full flex items-center pt-24">
        <div className="max-w-2xl">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlide}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="text-shadow-lg" // Added text shadow
            >
              <Badge variant="outline" className="mb-6 bg-white/10 backdrop-blur-sm border-white/20 text-white">
                {slides[currentSlide].badge}
              </Badge>
              <h1 className="text-4xl md:text-6xl font-bold mb-6 text-white drop-shadow-lg">
                {slides[currentSlide].title}
              </h1>
              <p className="text-xl text-white mb-8 drop-shadow-md">
                {slides[currentSlide].description}
              </p>
              <div className="flex gap-4 mb-12">
                <Button size="lg" asChild>
                  <Link href="#positions">
                    View Positions
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <Button size="lg" variant="outline" asChild>
                  <Link href="/about">Learn More</Link>
                </Button>
              </div>
              <div className="flex gap-8">
                {slides[currentSlide].stats.map((stat, index) => (
                  <motion.div
                    key={stat}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="text-sm font-medium text-white drop-shadow-md"
                  >
                    {stat}
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Slide Indicators - Updated styling */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`h-2 rounded-full transition-all ${
                index === currentSlide ? "w-8 bg-white" : "w-2 bg-white/20"
              }`}
            />
          ))}
        </div>
      </Container>
    </section>
  )
}
