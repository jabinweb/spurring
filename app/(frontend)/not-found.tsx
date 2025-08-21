"use client"

import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import { Home, ArrowLeft, AlertCircle } from "lucide-react"
import Link from "next/link"

export default function NotFound() {
  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center relative overflow-hidden">
      {/* Background Pattern */}
      <div 
        className="absolute inset-0 bg-grid-pattern opacity-[0.2]" 
        aria-hidden="true"
      />
      {/* Gradient Overlay */}
      <div 
        className="absolute inset-0 bg-gradient-to-br from-background via-background/50 to-background"
        aria-hidden="true"
      />
      {/* Main Content */}
      <div className="relative z-10 px-4 py-10 w-full max-w-[600px] mx-auto">
        <div className="text-center">
          <motion.div
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="mb-8 relative mx-auto"
          >
            <div className="relative h-20 w-20 mx-auto mb-6">
              <div className="absolute inset-0 bg-primary/10 rounded-full animate-ping" />
              <div className="relative bg-background rounded-full p-6 border-2 border-primary/20">
                <AlertCircle className="h-full w-full text-primary" />
              </div>
            </div>
            <h1 className="text-7xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/50">
              404
            </h1>
          </motion.div>

          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="space-y-4"
          >
            <h2 className="text-2xl font-semibold">Page Not Found</h2>
            <p className="text-muted-foreground max-w-md mx-auto">
              We couldn&apos;t find the page you&apos;re looking for. It might have been moved, 
              deleted, or never existed. Let&apos;s get you back on track.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
              <Button size="lg" asChild>
                <Link href="/" className="gap-2">
                  <Home className="h-4 w-4" />
                  Back to Home
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href="/contact" className="gap-2">
                  <ArrowLeft className="h-4 w-4" />
                  Contact Support
                </Link>
              </Button>
            </div>
          </motion.div>
        </div>

        {/* Decorative Elements */}
        <motion.div 
          className="absolute inset-0 pointer-events-none"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <div className="absolute -left-1/4 top-1/4 w-1/2 h-1/2 bg-primary/5 rounded-full blur-3xl" />
          <div className="absolute -right-1/4 -bottom-1/4 w-1/2 h-1/2 bg-secondary/5 rounded-full blur-3xl" />
        </motion.div>
      </div>
    </div>
  );
}
