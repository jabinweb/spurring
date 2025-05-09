"use client"

import { cn } from "@/lib/utils"
import Image from "next/image"
import { motion } from "framer-motion"

interface HeroProps {
  title: string
  description?: string
  image?: string
  video?: string
  height?: "sm" | "md" | "lg"
  children?: React.ReactNode
  className?: string
}

export function Hero({
  title,
  description,
  image,
  video,
  height = "sm",
  children,
  className
}: HeroProps) {
  const heights = {
    sm: "h-[300px]",
    md: "h-[400px]",
    lg: "h-[500px]"
  }

  return (
    <section className={cn("relative flex items-center justify-center overflow-hidden", heights[height], className)}>
      {video ? (
        <video
          src={video}
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
        />
      ) : image ? (
        <Image
          src={image}
          alt={title}
          fill
          className="object-cover brightness-[0.7]"
          priority
        />
      ) : null}
      
      {/* Overlay with gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/70" />

      {/* Content */}
      <div className="relative z-10 text-center px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-shadow-lg" // Added text shadow for better visibility
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-white drop-shadow-lg">
            {title}
          </h1>
          {description && (
            <p className="text-lg text-white/90 max-w-2xl mx-auto drop-shadow-md">
              {description}
            </p>
          )}
          {children}
        </motion.div>
      </div>
    </section>
  )
}
