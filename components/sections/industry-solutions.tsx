"use client"

import { motion } from "framer-motion"
import { useState } from "react"
import { Container } from "@/components/ui/container"
import { cn } from "@/lib/utils"
import { Stethoscope, BadgeDollarSign, Factory, Store, Brain } from "lucide-react"

const industries = [
  {
    id: "healthcare",
    name: "Healthcare",
    icon: Stethoscope,
    description: "Transform patient care with AI-powered diagnostics and personalized treatment plans.",
    solutions: [
      {
        title: "Early Disease Detection",
        description: "AI algorithms for early diagnosis and risk assessment",
        metric: "95% accuracy in early detection"
      },
      {
        title: "Patient Care Optimization",
        description: "Smart scheduling and resource allocation",
        metric: "30% reduction in wait times"
      }
    ],
    video: "https://videos.pexels.com/video-files/30593273/13100531_2560_1440_30fps.mp4",
    color: "from-blue-500 to-cyan-500"
  },
  {
    id: "finance",
    name: "Finance",
    icon: BadgeDollarSign,
    description: "Enhance financial operations with AI-driven insights and fraud detection.",
    solutions: [
      {
        title: "Fraud Detection",
        description: "Real-time monitoring and risk assessment",
        metric: "60% reduction in fraud cases"
      },
      {
        title: "Investment Analysis",
        description: "AI-powered market analysis and predictions",
        metric: "40% better returns"
      }
    ],
    video: "https://static.vecteezy.com/system/resources/previews/002/273/297/mp4/digital-animation-of-business-stock-market-price-chart-free-video.mp4",
    color: "from-green-500 to-emerald-500"
  },
  {
    id: "manufacturing",
    name: "Manufacturing",
    icon: Factory,
    description: "Optimize production with intelligent automation and quality control.",
    solutions: [
      {
        title: "Quality Control",
        description: "AI-powered defect detection system",
        metric: "90% defect detection rate"
      },
      {
        title: "Predictive Maintenance",
        description: "Smart equipment monitoring",
        metric: "50% reduced downtime"
      }
    ],
    video: "https://static.vecteezy.com/system/resources/previews/041/727/692/mp4/autonomous-vehicles-lidar-scanning-delivering-goods-in-warehouse-free-video.mp4",
    color: "from-orange-500 to-red-500"
  },
  {
    id: "retail",
    name: "Retail",
    icon: Store,
    description: "Personalize shopping experiences with AI-driven recommendations.",
    solutions: [
      {
        title: "Smart Inventory",
        description: "AI-driven inventory management",
        metric: "35% reduced stockouts"
      },
      {
        title: "Customer Analytics",
        description: "Personalized shopping experience",
        metric: "45% increased engagement"
      }
    ],
    video: "https://static.vecteezy.com/system/resources/previews/016/783/262/mp4/women-are-paying-online-by-credit-card-and-shopping-for-the-things-they-like-on-their-computers-at-home-online-shopping-free-video.mp4",
    color: "from-purple-500 to-pink-500"
  }
]

export function IndustrySolutions() {
  const [activeIndustry, setActiveIndustry] = useState(industries[0].id)

  return (
    <section className="py-24 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 -z-20">
        <div className="absolute inset-0 bg-grid-pattern opacity-[0.2]" />
        <div className="absolute inset-0 bg-gradient-to-b from-background via-transparent to-background" />
      </div>

      <Container>
        {/* Section Header */}
        <div className="text-center mb-16">
          <motion.span 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-block px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4"
          >
            Industry Solutions
          </motion.span>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl font-bold mb-4"
          >
            AI Solutions Across Industries
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-xl text-muted-foreground max-w-3xl mx-auto"
          >
            Transform your business with our industry-specific AI solutions
          </motion.p>
        </div>

        {/* Industry Navigation */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {industries.map((industry) => {
            const Icon = industry.icon
            const isActive = activeIndustry === industry.id
            
            return (
              <motion.button
                key={industry.id}
                onClick={() => setActiveIndustry(industry.id)}
                className={cn(
                  "relative px-6 py-3 rounded-xl flex items-center gap-2",
                  "transition-colors duration-300",
                  isActive ? "text-primary" : "hover:text-primary"
                )}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Icon className="h-5 w-5" />
                <span className="font-medium">{industry.name}</span>
                {isActive && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute inset-0 bg-primary/10 rounded-xl -z-10"
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  />
                )}
              </motion.button>
            )
          })}
        </div>

        {/* Content Area */}
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Solution Details */}
          {industries.map((industry) => {
            if (industry.id !== activeIndustry) return null

            return (
              <motion.div
                key={industry.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.3 }}
                className="space-y-8"
              >
                <div className="space-y-4">
                  <h3 className="text-2xl font-bold">{industry.name} Solutions</h3>
                  <p className="text-muted-foreground text-lg">
                    {industry.description}
                  </p>
                </div>

                <div className="space-y-4">
                  {industry.solutions.map((solution, index) => (
                    <motion.div
                      key={solution.title}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="bg-background/50 backdrop-blur-sm border border-primary/10 rounded-xl p-6 space-y-4"
                    >
                      <div className="flex justify-between items-start">
                        <div>
                          <h4 className="font-semibold mb-2">{solution.title}</h4>
                          <p className="text-muted-foreground">{solution.description}</p>
                        </div>
                        <div className="flex items-center gap-2">
                          <Brain className="h-5 w-5 text-primary" />
                          <span className="text-sm font-medium">{solution.metric}</span>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )
          })}

          {/* Video Area - Replace the Image Area section */}
          <div className="relative h-[400px] rounded-2xl overflow-hidden">
            {industries.map((industry) => {
              if (industry.id !== activeIndustry) return null

              return (
                <motion.div
                  key={industry.id}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 1.05 }}
                  transition={{ duration: 0.3 }}
                  className="absolute inset-0"
                >
                  <video
                    src={industry.video}
                    autoPlay
                    muted
                    loop
                    playsInline
                    className="absolute z-10 inset-0 w-full h-full object-cover"
                  />
                  <div className={cn(
                    "absolute inset-0 bg-gradient-to-br opacity-60",
                    industry.color
                  )} />
                </motion.div>
              )
            })}
          </div>
        </div>
      </Container>
    </section>
  )
}
