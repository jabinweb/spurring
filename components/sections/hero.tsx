"use client"

import { Button } from "@/components/ui/button"
import Link from "next/link"
import { motion } from "framer-motion"
import { Container } from "../ui/container"
import { useEffect, useState } from "react"
import { GetStartedButton } from "../get-started-button"

interface HeroProps {
  videos?: string[]
}

export function Hero({ 
  videos = [
    "https://cdn.pixabay.com/video/2024/09/21/232561_large.mp4",
    "https://cdn.pixabay.com/video/2021/09/11/88223-606079076_large.mp4",
    "https://static.vecteezy.com/system/resources/previews/041/727/692/mp4/autonomous-vehicles-lidar-scanning-delivering-goods-in-warehouse-free-video.mp4"
  ] 
}: HeroProps) {
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentVideoIndex((prev) => (prev + 1) % videos.length);
    }, 8000); // Change video every 8 seconds

    return () => clearInterval(interval);
  }, [videos.length]);

  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden text-white">
      {/* Video Background */}
      <div className="absolute inset-0 -z-20">
        <video
          key={videos[currentVideoIndex]} // Key helps force remount
          src={videos[currentVideoIndex]}
          autoPlay
          muted
          loop={videos.length === 1}
          playsInline
          onEnded={() => videos.length > 1 && setCurrentVideoIndex((prev) => (prev + 1) % videos.length)}
          className="object-cover w-full h-full"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/50" />
      </div>

      <Container>
        {/* Interactive grid background */}
        {/* <div className="absolute inset-0 -z-10">
          <InteractiveGrid />
        </div> */}

        <div className="relative z-10 max-w-3xl mx-auto text-center">
          {/* Text Content */}
          <motion.h1
            className="text-4xl md:text-6xl font-bold mb-6 !leading-[1.3] drop-shadow-[0_2px_6px_rgba(0,0,0,0.6)]"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            Transform Business <br /> with&nbsp; 
            <span className="bg-gradient-to-r from-primary/90 via-purple-500/90 to-pink-500/90 bg-clip-text text-transparent drop-shadow-[0_2px_4px_rgba(0,0,0,0.4)]">
              Next-Gen AI
            </span>
          </motion.h1>

          <motion.p
            className="text-lg md:text-xl mb-8 text-white/90 drop-shadow-[0_2px_4px_rgba(0,0,0,0.4)]"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Empower your business with AI-driven automation and insights for smarter, faster growth.
          </motion.p>

          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <GetStartedButton />
            <Button 
              size="lg" 
              variant="outline" 
              className="rounded-full px-8 border-white/20 bg-white/10 text-white hover:bg-white/20 backdrop-blur-sm shadow-[0_8px_16px_rgba(0,0,0,0.2)]" 
              asChild
            >
              <Link href="/services">Explore Solutions</Link>
            </Button>
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

        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-black to-transparent pointer-events-none" />
      </Container>
    </section>
  )
}

