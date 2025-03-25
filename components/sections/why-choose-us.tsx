"use client"

import { motion, useScroll, useTransform, useInView } from "framer-motion"
import { Shield, Rocket, Award, Zap } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useRef } from "react"
import Link from "next/link"
import Image from "next/image"

interface MediaProps {
  type: 'image' | 'video'
  url: string
  fallback?: string
}

interface CardProps {
  title: string
  description: string
  icon: React.ReactNode
  gradient: string
  media: MediaProps
  link: string
}

const cards: CardProps[] = [
  {
    title: "Enterprise Security",
    description: "Implementing bank-grade security protocols and ISO 27001 certified practices to protect your AI infrastructure. Our comprehensive security framework ensures data protection, privacy compliance, and robust access controls for enterprise-level safety.",
    icon: <Shield className="h-6 w-6" />,
    gradient: "from-blue-500 to-violet-500",
    media: {
      type: 'video' as const,
      url: 'https://example.com/security.mp4'
    },
    link: "/services/security"
  },
  {
    title: "Rapid Deployment",
    description: "Accelerate your AI journey with our proven rapid deployment methodology. Our streamlined processes and pre-built components enable quick implementation while maintaining high quality and reliability, reducing time-to-market by up to 60%.",
    icon: <Rocket className="h-6 w-6" />,
    gradient: "from-purple-500 to-pink-500",
    media: {
      type: 'image',
      url: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71'
    },
    link: "/services/deployment"
  },
  {
    title: "Industry Recognition",
    description: "Our dedication to delivering exceptional AI solutions has earned us prestigious industry awards and recognition. We are known for driving innovation, solving complex challenges, and consistently achieving client success through our expert strategies and solutions.",
    icon: <Award className="h-6 w-6" />,
    gradient: "from-orange-500 to-red-500",
    media: {
      type: 'image' as const,
      url: '/patterns/award-pattern.svg'
    },
    link: "/about/awards"
  },
  {
    title: "Innovation Focus",
    description: "Fostering a culture of innovation to stay ahead in the AI industry. We continuously explore new technologies and methodologies to deliver cutting-edge solutions that drive business growth and efficiency.",
    icon: <Zap className="h-6 w-6" />,
    gradient: "from-green-500 to-emerald-500",
    media: {
      type: 'image' as const,
      url: '/patterns/innovation-pattern.svg'
    },
    link: "/about/innovation"
  }
]

export function WhyChooseUs() {
  const containerRef = useRef<HTMLDivElement>(null)
  const cardContainerRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(containerRef, { margin: "-100px" })
  
  const { scrollYProgress } = useScroll({
    target: cardContainerRef,
    offset: ["start end", "end start"],
  })

  // Since cards is static (4 items), we can define the transforms individually.
  const cardTransforms = [
    useTransform(scrollYProgress, [0 / cards.length, 1 / cards.length], ["0%", "-100%"]),
    useTransform(scrollYProgress, [1 / cards.length, 2 / cards.length], ["0%", "-100%"]),
    useTransform(scrollYProgress, [2 / cards.length, 3 / cards.length], ["0%", "-100%"]),
    useTransform(scrollYProgress, [3 / cards.length, 4 / cards.length], ["0%", "-100%"]),
  ]

  const getCardStyle = (index: number) => ({
    y: isInView ? cardTransforms[index] : 0,
    zIndex: cards.length - index
  })

  const MediaContent = ({ media }: { media: MediaProps }) => {
    if (media.type === 'video') {
      return (
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover rounded-2xl opacity-70"
        />
      )
    }
    return (
      <Image
        src={media.url}
        alt="Feature illustration"
        fill
        className="object-cover rounded-2xl opacity-70"
      />
    )
  }

  return (
    <section ref={containerRef} className="relative">
      <div className="max-w-7xl mx-auto px-4">
        {/* Sticky Header Container */}
        <div className="sticky top-0 pt-20 pb-10 bg-background z-10 mb-20">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-bold text-center"
          >
            Why Choose{' '}
            <span className="bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
              Spurring
            </span>
          </motion.h2>
        </div>

        {/* Cards Container */}
        <div 
          ref={cardContainerRef} 
          className="relative min-h-[400vh]"
        >
          <div className="sticky top-40">
            <div className="relative h-[70vh] flex items-center">
              {cards.map((card, index) => (
                <motion.div
                  key={index}
                  className="absolute w-full"
                  style={getCardStyle(index)}
                  initial={false}
                >
                  {/* Card content */}
                  <div className="max-w-7xl mx-auto px-4">
                    <div className="bg-background rounded-2xl p-12 shadow-xl border border-primary/10">
                      <div className="flex items-start gap-12">
                        <div className="flex-1 max-w-xl">
                          <div className={`inline-flex items-center justify-center w-14 h-14 rounded-xl bg-gradient-to-br ${card.gradient} p-3 text-white mb-8`}>
                            {card.icon}
                          </div>
                          <h3 className="text-2xl font-semibold mb-4">{card.title}</h3>
                          <p className="text-muted-foreground mb-8 text-lg leading-relaxed">
                            {card.description}
                          </p>
                          <Button variant="outline" size="lg" asChild>
                            <Link href={card.link}>Learn More</Link>
                          </Button>
                        </div>
                        <div className="w-[400px] h-[300px] relative hidden md:block">
                          {/* Gradient overlay */}
                          <div className={`absolute inset-0 bg-gradient-to-br ${card.gradient} opacity-10 rounded-2xl`} />
                          
                          {/* Media content */}
                          <div className="absolute inset-0 overflow-hidden rounded-2xl">
                            {card.media && <MediaContent media={card.media} />}
                          </div>

                          {/* Additional decorative elements */}
                          <div className="absolute inset-0 bg-grid-pattern opacity-30" />
                          <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
