"use client"

import { motion } from "framer-motion"
import { useState } from "react"
import { Container } from "@/components/ui/container"
import { cn } from "@/lib/utils"
import { Stethoscope, BadgeDollarSign, Factory, Store, Brain } from "lucide-react"

const industries = [
  {
    id: "farming",
    name: "Farming",
    icon: Factory,
    description: "Transform agricultural operations with AI-powered automation and precision farming solutions.",
    solutions: [
      {
        title: "Crop Optimisation",
        description: "AI-driven crop monitoring and yield optimisation",
        metric: "40% increased yield"
      },
      {
        title: "Smart Irrigation",
        description: "Intelligent water resource management",
        metric: "35% water conservation"
      }
    ],
    video: "https://videos.pexels.com/video-files/31999640/13637442_640_360_60fps.mp4",
    color: "from-green-500 to-emerald-500"
  },
  {
    id: "construction",
    name: "Construction",
    icon: Store,
    description: "Enhance construction site safety and efficiency with AI-powered monitoring.",
    solutions: [
      {
        title: "Safety Analytics",
        description: "Real-time risk assessment and safety monitoring",
        metric: "60% risk reduction"
      },
      {
        title: "Project Optimisation",
        description: "AI-driven project planning and resource utilisation",
        metric: "45% better efficiency"
      }
    ],
    video: "https://videos.pexels.com/video-files/5567711/5567711-sd_640_360_30fps.mp4",
    color: "from-orange-500 to-red-500"
  },
  {
    id: "machinery",
    name: "Machinery",
    icon: Factory,
    description: "Optimise equipment performance with intelligent monitoring and predictive maintenance.",
    solutions: [
      {
        title: "Predictive Maintenance",
        description: "AI-powered equipment health monitoring",
        metric: "70% less downtime"
      },
      {
        title: "Performance Optimisation",
        description: "Smart operational efficiency enhancement",
        metric: "40% productivity gain"
      }
    ],
    video: "https://static.vecteezy.com/system/resources/previews/041/727/694/mp4/autonomous-vehicles-lidar-scanning-delivering-goods-in-warehouse-free-video.mp4",
    color: "from-blue-500 to-cyan-500"
  },
  {
    id: "manufacturing",
    name: "Manufacturing",
    icon: Factory,
    description: "Transform production lines with intelligent automation and quality control.",
    solutions: [
      {
        title: "Quality Assurance",
        description: "AI-powered defect recognition system",
        metric: "95% detection rate"
      },
      {
        title: "Process Optimisation",
        description: "Smart production line monitoring",
        metric: "50% efficiency gain"
      }
    ],
    video: "https://static.vecteezy.com/system/resources/previews/049/642/799/mp4/robots-welding-metal-in-a-factory-free-video.mp4",
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
