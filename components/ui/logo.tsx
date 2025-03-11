"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { useEffect, useState } from "react"

interface LogoProps {
  size?: "sm" | "md" | "lg"
}

export function Logo({ size = "md" }: LogoProps) {
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  const sizes = {
    sm: "h-8",
    md: "h-10",
    lg: "h-12"
  }

  // Static version for SSR
  if (!isMounted) {
    return (
      <Link href="/" className="flex items-center gap-3">
        <div className={`relative ${sizes[size]} aspect-square`}>
          <svg viewBox="0 0 100 100" className="text-primary">
            <circle cx="50" cy="50" r="48" fill="currentColor" fillOpacity="0.1" />
            <path
              d="M25,50 C25,25 75,25 75,50 C75,75 25,75 25,50"
              stroke="currentColor"
              fill="none"
              strokeWidth="3"
            />
          </svg>
        </div>
        <div className="font-semibold tracking-tight">
          <div className="text-lg leading-none">Spurring</div>
          <div className="text-sm text-muted-foreground">Ventures India</div>
        </div>
      </Link>
    )
  }

  return (
    <Link href="/" className="flex items-center gap-3">
      <motion.div
        className={`relative ${sizes[size]} aspect-square`}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <svg viewBox="0 0 100 100" className="text-primary">
          {/* Outer circle */}
          <motion.circle
            cx="50"
            cy="50"
            r="48"
            stroke="currentColor"
            strokeWidth="2"
            fill="none"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
          />

          {/* Inner infinity/wave pattern */}
          <motion.path
            d="M25,50 C25,25 75,25 75,50 C75,75 25,75 25,50"
            stroke="currentColor"
            strokeWidth="3"
            fill="none"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 2, ease: "easeInOut" }}
          />

          {/* Accent dots */}
          <motion.g
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5, delay: 1 }}
          >
            <circle cx="25" cy="50" r="4" fill="currentColor" />
            <circle cx="75" cy="50" r="4" fill="currentColor" />
          </motion.g>

          {/* Center gradient overlay */}
          <motion.circle
            cx="50"
            cy="50"
            r="20"
            fill="url(#logoGradient)"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.1 }}
            transition={{ duration: 1 }}
          />

          {/* Gradient definition */}
          <defs>
            <radialGradient id="logoGradient">
              <stop offset="0%" stopColor="currentColor" />
              <stop offset="100%" stopColor="currentColor" stopOpacity="0" />
            </radialGradient>
          </defs>
        </svg>
      </motion.div>

      <motion.div
        className="font-semibold tracking-tight"
        initial={{ opacity: 0, x: -10 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <div className="text-lg leading-none bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
          Spurring
        </div>
        <div className="text-sm text-muted-foreground">
          Ventures India
        </div>
      </motion.div>
    </Link>
  )
}
