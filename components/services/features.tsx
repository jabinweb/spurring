"use client"

import { motion, useInView, Variants } from "framer-motion"
import Image from "next/image"
import { useRef, useState } from "react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Container } from "../ui/container"

// Types
interface SubFeature {
  title: string
  description: string
  image: string
}

interface Feature {
  title: string
  description: string
  subFeatures: SubFeature[]
}

interface FeaturesProps {
  title: string
  subtitle: string
  features: Feature[]
}

const variants: Record<string, Variants> = {
  container: {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  },
  button: {
    initial: { scale: 1 },
    hover: { scale: 1.02 },
    tap: { scale: 0.98 }
  }
}

export function Features({ title, subtitle, features }: FeaturesProps) {
  const [activeSubFeatures, setActiveSubFeatures] = useState<number[]>(features.map(() => 0))
  const containerRef = useRef<HTMLElement>(null)
  const isInView = useInView(containerRef, { once: true, margin: "-100px" })

  return (
    <section
      ref={containerRef}
      className="py-24 bg-black/95 relative overflow-hidden"
      aria-labelledby="features-title"
    >
      <Container>
      {/* Background effects */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(120,119,198,0.3),rgba(255,255,255,0))]" />
      <div className="absolute inset-0 backdrop-blur-3xl bg-grid-white/[0.02]" />

      <motion.div 
        className="container relative z-10"
        variants={variants.container}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
      >
        {/* Header */}
        <div className="text-center mb-20 space-y-4">
          <h2 id="features-title" className="text-4xl md:text-6xl font-bold">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-500 via-purple-500 to-pink-600">
              {title}
            </span>
          </h2>
          <p className="text-gray-400 text-lg md:text-xl max-w-3xl mx-auto">
            {subtitle}
          </p>
        </div>

        {/* Features sections */}
        <div className="space-y-32">
          {features.map((feature, featureIndex) => (
            <div 
              key={feature.title}
              className={cn(
                "grid grid-cols-1 lg:grid-cols-2 gap-12",
                featureIndex % 2 === 1 && "lg:[&>*:first-child]:order-2"
              )}
            >
              {/* Image column */}
              <div className="relative aspect-video rounded-2xl overflow-hidden bg-gradient-to-br from-gray-900 to-black">
                <Image
                  src={feature.subFeatures[activeSubFeatures[featureIndex]].image}
                  alt={feature.subFeatures[activeSubFeatures[featureIndex]].title}
                  fill
                  className="object-cover transition-opacity duration-300"
                  sizes="(max-width: 768px) 100vw, 50vw"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-8">
                  <h4 className="text-xl text-gray-200 font-semibold mb-2">
                    {feature.subFeatures[activeSubFeatures[featureIndex]].title}
                  </h4>
                  <p className="text-gray-400">
                    {feature.subFeatures[activeSubFeatures[featureIndex]].description}
                  </p>
                </div>
              </div>

              {/* Content column */}
              <div className="space-y-6">
                <h3 className="text-2xl text-gray-200 font-semibold">{feature.title}</h3>
                <p className="text-gray-400">{feature.description}</p>
                <div className="space-y-2">
                  {feature.subFeatures.map((subFeature, subIndex) => (
                    <motion.div
                      key={subFeature.title}
                      variants={variants.button}
                      initial="initial"
                      whileHover="hover"
                      whileTap="tap"
                    >
                      <Button
                        variant={activeSubFeatures[featureIndex] === subIndex ? "default" : "outline"}
                        className={cn(
                          "w-full justify-start text-left h-auto py-4 px-6",
                          "transition-colors duration-300",
                          activeSubFeatures[featureIndex] === subIndex 
                            ? "bg-gradient-to-r from-blue-500/20 to-purple-500/20 border-blue-500/50"
                            : "hover:bg-gradient-to-r hover:from-blue-500/10 hover:to-purple-500/10"
                        )}
                        onClick={() => {
                          const newActiveSubFeatures = [...activeSubFeatures]
                          newActiveSubFeatures[featureIndex] = subIndex
                          setActiveSubFeatures(newActiveSubFeatures)
                        }}
                      >
                        <span>{subFeature.title}</span>
                      </Button>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </motion.div>
      </Container>
    </section>
  )
}
