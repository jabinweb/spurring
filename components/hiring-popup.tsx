"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export function HiringPopup() {
  const [isVisible, setIsVisible] = useState(false)
  const [isDismissed, setIsDismissed] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => {
      const dismissed = localStorage.getItem("hiringPopupDismissed")
      if (!dismissed) {
        setIsVisible(true)
      }
    }, 3000)

    return () => clearTimeout(timer)
  }, [])

  const handleDismiss = () => {
    setIsVisible(false)
    setIsDismissed(true)
    localStorage.setItem("hiringPopupDismissed", "true")
  }

  if (isDismissed) return null

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          className="fixed bottom-4 left-4 z-50"
        >
          <div className="relative bg-background/95 backdrop-blur-md border border-primary/20 rounded-lg shadow-lg p-4 w-[280px]">
            {/* Close Button */}
            <button
              onClick={handleDismiss}
              className="absolute -top-2 -right-2 p-1.5 bg-background rounded-full border border-primary/20 hover:bg-accent transition-colors"
            >
              <X className="h-3 w-3" />
            </button>
            
            <div className="flex items-start gap-3">
              <div className="flex-1 min-w-0">
                <motion.h3 
                  className="font-semibold text-sm mb-1"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  We are hiring!                   
                  <motion.span 
                    className="text-lg"
                    animate={{
                      rotate: [0, 15, -15, 15, -15, 0],
                    }}
                    transition={{
                      duration: 1.5,
                      repeat: Infinity,
                      repeatDelay: 1,
                    }}
                  >
                    👋
                  </motion.span>
                </motion.h3>
                <motion.p 
                  className="text-xs text-muted-foreground mb-3 line-clamp-2"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  Shape the future of AI technology with us
                </motion.p>
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                >
                  <Button 
                    size="sm" 
                    className="w-full text-xs h-8 transition-transform hover:scale-105"
                    asChild
                  >
                    <Link href="/careers">View Opportunities</Link>
                  </Button>
                </motion.div>
              </div>
            </div>

            {/* Animated Background Gradient */}
            <div className="absolute inset-0 -z-10 overflow-hidden rounded-lg">
              <motion.div
                className="absolute -left-1/2 top-0 h-full w-[200%] bg-gradient-to-r from-transparent via-primary/5 to-transparent"
                animate={{
                  x: ["0%", "100%"],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "linear",
                }}
              />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
