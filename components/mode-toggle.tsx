"use client"

import * as React from "react"
import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"
import { motion } from "framer-motion"

export function ModeToggle() {
  const { theme, setTheme } = useTheme()
  const [isMounted, setIsMounted] = React.useState(false)

  React.useEffect(() => {
    setIsMounted(true)
  }, [])

  if (!isMounted) {
    return <div className="w-16 h-8" />
  }

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light")
  }

  return (
    <motion.button
      className="relative w-16 h-8 rounded-full bg-primary/10 p-1 border border-primary/20"
      onClick={toggleTheme}
      whileTap={{ scale: 0.95 }}
      whileHover={{ scale: 1.05 }}
    >
      <motion.div
        className="absolute inset-0 flex items-center justify-between px-2"
        initial={false}
      >
        <Sun className="h-4 w-4 text-primary" />
        <Moon className="h-4 w-4 text-primary" />
      </motion.div>
      <motion.div
        className="w-6 h-6 rounded-full bg-primary"
        animate={{
          x: theme === "light" ? 0 : "calc(200% - 17px)",
        }}
        transition={{
          type: "spring",
          stiffness: 400,
          damping: 25
        }}
      >
        <motion.div
          className="w-full h-full rounded-full flex items-center justify-center text-primary-foreground"
          animate={{
            rotate: theme === "light" ? 0 : 360,
          }}
          transition={{
            duration: 0.5,
          }}
        >
          {theme === "light" ? (
            <Sun className="h-3 w-3" />
          ) : (
            <Moon className="h-3 w-3" />
          )}
        </motion.div>
      </motion.div>
    </motion.button>
  )
}