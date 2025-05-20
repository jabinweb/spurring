import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Brain, CheckCircle, LineChart, Hammer, Settings, Eye } from "lucide-react"
import { Hero } from "@/components/ui/hero"
import { Container } from "@/components/ui/container"
import { ConstructionSafetyCaseStudy } from "@/components/case-studies/construction-safety"

const services = [
  {
    title: "Computer Vision Consultation",
    description: "Transform your business with tailored computer vision solutions",
    icon: Eye,
    items: [
      { title: "Optimise Operations", description: "Automate visual inspection and improve operational efficiency" },
      { title: "Unlock Actionable Insights", description: "Turn visual data into decisions and predictive outcomes" },
      { title: "Boost Efficiency & Speed", description: "Accelerate image analysis and real-time decision-making" },
      { title: "Industry-Specific Solutions", description: "Tailored computer vision for diverse industry needs" }
    ]
  },
  {
    title: "Computer Vision Strategy Development",
    description: "Strategic planning and implementation roadmap for computer vision adoption",
    icon: Hammer,
    items: [
      { title: "Unlock Computer Vision Potential", description: "Critical for gaining a competitive edge" },
      { title: "Boost Innovation with Vision AI", description: "Harness computer vision to foster innovation and new business models" },
      { title: "Enhance Automation", description: "Automate processes across industries with real-time visual data analysis" },
      { title: "Scale Vision AI Solutions", description: "Implement scalable solutions that grow with your business needs" }
    ]
  },
  {
    title: "Computer Vision Performance Optimisation",
    description: "Continuous refinement to improve accuracy and efficiency of vision systems",
    icon: Settings,
    items: [
      { title: "Maximize Vision AI Performance", description: "Ensure consistent, high-quality results with ongoing system monitoring" },
      { title: "Ongoing Vision AI Improvement", description: "Proactively enhance algorithms to stay ahead of evolving needs" },
      { title: "Optimize Deployment", description: "Smooth integration and scaling of computer vision solutions across platforms" },
      { title: "Future-Proof Vision AI", description: "Develop adaptable systems that grow and evolve with your business" }
    ]
  }
]

export default function ComputerVisionPage() {
  return (
    <div>
      <Hero
        title="Next-Generation Vision AI Solutions"
        description="Transform your business operations with advanced computer vision"
        video="https://videos.pexels.com/video-files/3141210/3141210-sd_640_360_25fps.mp4"
      />

      {/* Overview Section */}
      <section className="py-20 relative">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div className="space-y-6">
              <Badge>Vision AI Solutions</Badge>
              <h2 className="text-3xl font-bold">Transform Your Business with Computer Vision</h2>
              <p className="text-lg text-muted-foreground">
                Harness the power of Computer Vision to transform your business operations. We specialise in crafting AI-driven solutions that allow machines to interpret and understand visual data, enabling our clients to enhance efficiency, automate processes, and make smarter, data-driven decisions. From object detection to image segmentation, our solutions are designed to provide accurate, real-time insights for diverse industries.
              </p>
            </div>

            {/* Impact Visualization */}
            <div className="relative rounded-2xl overflow-hidden bg-muted/5 border p-6">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent" />
              <LineChart className="w-16 h-16 text-primary mb-4" />
              <h3 className="text-xl font-semibold mb-4">Market Impact</h3>
              <p className="text-muted-foreground">
                The global computer vision market is poised for significant growth, projected to expand to $175.72 billion by 2032. This surge is driven by the increasing adoption of AI-powered vision systems across various industries, including manufacturing, healthcare, retail, and automotive. Key applications such as object detection, facial recognition, and predictive maintenance are enhancing operational efficiency and enabling real-time decision-making.
              </p>
            </div>
          </div>
        </Container>
      </section>

      {/* Services Grid */}
      <section className="py-20 bg-muted/50">
        <Container>
          <div className="grid gap-12">
            {services.map((service, index) => (
              <div key={index} className="space-y-6">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-primary/10">
                    <service.icon className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold">{service.title}</h3>
                    <p className="text-muted-foreground mt-1">{service.description}</p>
                  </div>
                </div>
                <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-6">
                  {service.items.map((item, itemIndex) => (
                    <Card key={itemIndex} className="group hover:shadow-lg transition-all duration-300">
                      <CardContent className="p-6">
                        <div className="flex items-start gap-4">
                          <div className="p-2 rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors">
                            <CheckCircle className="h-4 w-4 text-primary" />
                          </div>
                          <div>
                            <h4 className="font-semibold mb-2 group-hover:text-primary transition-colors">
                              {item.title}
                            </h4>
                            <p className="text-sm text-muted-foreground">{item.description}</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Case Study Section */}
      <ConstructionSafetyCaseStudy />
    </div>
  )
}
