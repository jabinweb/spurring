"use client"

import { cn } from "@/lib/utils"
import { motion } from "framer-motion"
import Link from "next/link"
import { useEffect, useState } from "react"
import { useLightText } from "@/hooks/use-light-text"
import Image from "next/image"

// Add variant prop to Logo component
interface LogoProps {
  size?: "sm" | "md" | "lg";
  variant?: "default" | "light";
}

export function Logo({ size = "md", variant = "default" }: LogoProps) {
  const [isMounted, setIsMounted] = useState(false)
  const { isLightText } = useLightText()

  // Use isLightText to determine variant if not explicitly provided
  const logoVariant = variant === "default" ? (isLightText ? "light" : "default") : variant

  useEffect(() => {
    setIsMounted(true)
  }, [])

  const sizes = {
    sm: "w-8",
    md: "w-10",
    lg: "w-12"
  }

  // Static version for SSR
  if (!isMounted) {
    return (
      <Link href="/" className="font-bold tracking-tight flex items-center gap-2">
        <div className={cn("relative aspect-square", sizes[size])}>
          <Image
            src="/images/spurring_logo_icon.png"
            alt="Spurring Ventures Logo"
            width={48}
            height={48}
            className="w-full h-full"
          />
        </div>
        <div className="font-semibold tracking-tight">
          <div className={cn(
            "text-lg leading-none",
            logoVariant === "light" ? "text-white" : "bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent"
          )}>
            Spurring
          </div>
          <div className={cn(
            "text-sm",
            logoVariant === "light" ? "text-white/80" : "text-muted-foreground"
          )}>
            Ventures India
          </div>
        </div>
      </Link>
    )
  }

  return (
    <Link href="/" className="font-bold tracking-tight flex items-center gap-2">
      <motion.div
        className={cn("relative aspect-square", sizes[size])}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <Image
          src="/images/spurring_logo_icon.png"
          alt="Spurring Ventures Logo"
          width={48}
          height={48}
          className="w-full h-full"
        />
      </motion.div>
      
      <motion.div
        className="font-semibold tracking-tight"
        initial={{ opacity: 0, x: -10 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <div className={cn(
          "text-lg leading-none",
          logoVariant === "light" ? "text-white" : "bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent"
        )}>
          Spurring
        </div>
        <div className={cn(
          "text-sm",
          logoVariant === "light" ? "text-white/80" : "text-muted-foreground"
        )}>
          Ventures India
        </div>
      </motion.div>
    </Link>
  )
}
