"use client"

import { motion } from "framer-motion"
import { Lock, MapPin, Video, CreditCard, BrainCircuit } from "lucide-react"
import { Container } from "@/components/ui/container"
import { cn } from "@/lib/utils"
import Image from "next/image"

const features = [
  {
    icon: <Lock className="h-8 w-8" />,
    name: "Security",
    gradient: "from-blue-900 to-blue-800"
  },
  {
    icon: <MapPin className="h-8 w-8" />,
    name: "Location",
    gradient: "from-blue-800 to-blue-700"
  },
  {
    icon: <Video className="h-8 w-8" />,
    name: "Streaming",
    gradient: "from-blue-700 to-blue-600"
  },
  {
    icon: <CreditCard className="h-8 w-8" />,
    name: "Payments",
    gradient: "from-blue-600 to-blue-500"
  },
  {
    icon: <BrainCircuit className="h-8 w-8" />,
    name: "AI Core",
    gradient: "from-blue-500 to-blue-400"
  }
]

export function IntegratedPlatform() {
  return (
    <section className="py-24 relative overflow-hidden">
      {/* Background patterns */}
      <div className="absolute inset-0 -z-20">
        <div className="absolute inset-0 bg-grid-pattern opacity-30" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(var(--primary-rgb),0.1),transparent_50%)]" />
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-primary/10 via-transparent to-primary/10"
          animate={{
            backgroundPosition: ["0% 0%", "100% 100%"],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "linear"
          }}
        />
      </div>

      <Container>
        {/* Header content */}
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-5xl font-bold">
            Integrated AI Platform
          </h2>
          <p className="text-xl text-blue-400 max-w-2xl mx-auto mt-4">
            One platform for all your AI operations
          </p>
        </div>

        <div className="relative max-w-4xl mx-auto">
          {/* Central Logo */}
          <div className="flex justify-center mb-24">
            <motion.div
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              className="relative w-20 h-20 bg-gradient-to-b from-blue-500 to-blue-800 rounded-xl flex items-center justify-center"
            >
              <Image src="/ai.svg" alt="AI" width={50} height={50} />
            </motion.div>
          </div>

          {/* Connecting Lines */}
          <svg className="absolute top-16 w-full h-40" viewBox="0 0 400 100" fill="none">
            {[-2, -1, 0, 1, 2].map((offset, index) => (
              <motion.path
                key={index}
                d={`M200,20 C${200 + offset * 20},${40 + Math.abs(offset) * 10} ${200 + offset * 100},60 ${200 + offset * 150},80`}
                stroke="rgb(30 58 138)"
                strokeWidth="2"
                strokeDasharray="4 4"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 0.5 }}
                transition={{ duration: 1, delay: index * 0.2 }}
              />
            ))}
          </svg>

          {/* Feature Cards */}
          <div className="flex justify-between gap-4">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="relative group"
              >
                <div className={cn(
                  "relative w-20 h-20 rounded-lg bg-gradient-to-br overflow-hidden",
                  feature.gradient,
                  "flex items-center justify-center",
                  "border border-blue-700/50",
                  "transition-all duration-300 group-hover:scale-110",
                  "shadow-lg shadow-blue-900/20",
                  "cursor-pointer"
                )}>
                  {/* Icon container - slides up on hover */}
                  <div className="absolute inset-0 flex items-center justify-center transition-transform duration-300 group-hover:-translate-y-full">
                    <div className="text-white">
                      {feature.icon}
                    </div>
                  </div>

                  {/* Name container - slides up from bottom on hover */}
                  <div 
                    className="absolute inset-0 flex items-center justify-center transition-all duration-300 translate-y-full group-hover:translate-y-0"
                    style={{
                      background: `linear-gradient(to bottom right, ${feature.gradient.split(' ')[1]}, ${feature.gradient.split(' ')[2]})`,
                      boxShadow: `0 4px 30px ${feature.gradient.split(' ')[2]}50`
                    }}
                  >
                    <span className="text-sm font-medium text-center text-white px-2">
                      {feature.name}
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  )
}
