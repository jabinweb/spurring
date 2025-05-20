'use client'
import { Card, CardContent } from "@/components/ui/card"
import { Brain, Code, LineChart, MessageSquare, Zap, ArrowRight } from "lucide-react"
import { Hero } from "@/components/ui/hero"
import Link from "next/link"
import { Container } from "@/components/ui/container"
import { motion } from "framer-motion"
import { Badge } from "@/components/ui/badge"

export default function ServicesPage() {
  return (
    <div>
      {/* Enhanced Hero Section */}
      <Hero
        title="Our AI Services"
        description="Transforming businesses with cutting-edge artificial intelligence solutions"
        image="https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&q=80"
        height="md"
      >
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="flex flex-wrap justify-center gap-4 mt-8"
        >
          <Badge variant="outline" className="text-gray-300 bg-white/10 backdrop-blur-sm">
            Enterprise AI Solutions
          </Badge>
          <Badge variant="outline" className="text-gray-300 bg-white/10 backdrop-blur-sm">
            Custom Development
          </Badge>
          <Badge variant="outline" className="text-gray-300 bg-white/10 backdrop-blur-sm">
            24/7 Support
          </Badge>
        </motion.div>
      </Hero>

      {/* Main Services Grid */}
      <Container className="py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {[
            {
              title: "AI Consulting",
              icon: <Brain className="h-8 w-8" />,
              description: "Strategic guidance for implementing AI solutions in your business. We help you identify opportunities, plan implementation, and measure success.",
              features: ["AI Readiness Assessment", "Implementation Strategy", "ROI Analysis"],
              href: "/services/ai-consulting",
              gradient: "from-blue-500 to-indigo-500"
            },
            {
              title: "Generative AI",
              icon: <Code className="h-8 w-8" />,
              description: "Custom solutions for content generation, creative tasks, and automated content production using state-of-the-art AI models.",
              features: ["Text Generation", "Image Synthesis", "Code Generation"],
              href: "/services/generative-ai",
              gradient: "from-purple-500 to-pink-500"
            },
            // {
            //   title: "Smart Assistants",
            //   icon: <MessageSquare className="h-8 w-8" />,
            //   description: "Intelligent chatbots and virtual assistants that automate customer service and internal processes.",
            //   features: ["Customer Service Bots", "Process Automation", "Virtual Assistants"],
            //   href: "/services/smart-assistants",
            //   gradient: "from-green-500 to-emerald-500"
            // },
            {
              title: "Data Mining",
              icon: <LineChart className="h-8 w-8" />,
              description: "Advanced analytics and pattern recognition solutions that turn your data into actionable insights.",
              features: ["Predictive Analytics", "Pattern Recognition", "Data Visualization"],
              href: "/services/data-mining",
              gradient: "from-orange-500 to-red-500"
            }
          ].map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <Link href={service.href}>
                <Card className="h-full transition-all duration-300 hover:shadow-lg group">
                  <CardContent className="p-6">
                    <div className="mb-4">
                      <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${service.gradient} p-2.5 text-white`}>
                        {service.icon}
                      </div>
                    </div>
                    <h2 className="text-2xl font-bold mb-4 group-hover:text-primary transition-colors">
                      {service.title}
                    </h2>
                    <p className="text-muted-foreground mb-6">
                      {service.description}
                    </p>
                    <ul className="space-y-2 mb-6">
                      {service.features.map((feature, i) => (
                        <li key={i} className="flex items-center">
                          <Zap className="h-5 w-5 text-primary mr-2" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                    <div className="flex items-center text-primary font-medium">
                      Learn More <ArrowRight className="ml-2 h-4 w-4" />
                    </div>
                  </CardContent>
                </Card>
              </Link>
            </motion.div>
          ))}
        </div>
      </Container>

      {/* Process Section */}
      <section className="py-20 bg-muted/50">
        <Container>
          <div className="text-center mb-12">
            <Badge className="mb-4">Our Process</Badge>
            <h2 className="text-3xl font-bold mb-4">How We Work</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              A systematic approach to implementing AI solutions
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              { step: "1", title: "Discovery", description: "Understanding your needs and objectives" },
              { step: "2", title: "Planning", description: "Developing a tailored solution strategy" },
              { step: "3", title: "Implementation", description: "Executing the solution with precision" },
              { step: "4", title: "Optimization", description: "Continuous improvement and refinement" }
            ].map((phase, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center"
              >
                <div className="w-12 h-12 bg-primary text-primary-foreground rounded-full flex items-center justify-center mx-auto mb-4">
                  {phase.step}
                </div>
                <h3 className="text-xl font-semibold mb-2">{phase.title}</h3>
                <p className="text-muted-foreground">{phase.description}</p>
              </motion.div>
            ))}
          </div>
        </Container>
      </section>
    </div>
  )
}