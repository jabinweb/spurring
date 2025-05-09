import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Brain, ArrowRight, CheckCircle, TrendingUp, Sparkles, Shield, Workflow } from "lucide-react"
import Link from "next/link"
import { Hero } from "@/components/ui/hero"
import { Container } from "@/components/ui/container"
import { Features } from "@/components/services/features"

const features = [
  {
    title: "Content Generation",
    description: "Create high-quality content across multiple formats",
    subFeatures: [
      {
        title: "Text Generation",
        description: "Generate human-like text for various applications",
        image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&q=80"
      },
      {
        title: "Image Generation",
        description: "Create unique images from text descriptions",
        image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80"
      },
      {
        title: "Code Generation",
        description: "Generate code snippets and complete programs",
        image: "https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?auto=format&fit=crop&q=80"
      }
    ]
  },
  {
    title: "Creative Tools",
    description: "Powerful tools for creative professionals",
    subFeatures: [
      {
        title: "Style Transfer",
        description: "Apply artistic styles to existing content",
        image: "https://images.unsplash.com/photo-1519608425089-7f3bfa6f6bb8?auto=format&fit=crop&q=80"
      },
      {
        title: "3D Generation",
        description: "Create 3D models from text descriptions",
        image: "https://images.unsplash.com/photo-1534972195531-d756b9bfa9f2?auto=format&fit=crop&q=80"
      },
      {
        title: "Audio Generation",
        description: "Generate music and sound effects",
        image: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&q=80"
      }
    ]
  }
]

const services = [
  {
    title: "Generative AI Consultation",
    icon: Brain,
    description: "Comprehensive consultation services to transform your business with AI",
    items: [
      { title: "Transform Operations", description: "Enhance efficiency and automate with Gen AI" },
      { title: "Create Novel Content", description: "Leverage data to generate text, images, audio, and more" },
      { title: "Boost Speed & Interaction", description: "Accelerate creation and improve customer engagement" },
      { title: "Industry-Specific AI Agents", description: "Automate and accelerate processes with tailored Gen AI" },
      { title: "Empower & Personalise", description: "Improve products with fine-tuned AI and enhance customer satisfaction" }
    ]
  },
  {
    title: "Generative AI Strategy Development",
    icon: Sparkles,
    description: "Strategic planning and implementation roadmap for AI adoption",
    items: [
      { title: "Unlock Gen AI Potential", description: "Essential for staying competitive" },
      { title: "Establish Ethical AI", description: "Build robust governance and risk protocols" },
      { title: "Mitigate AI Risks", description: "Proactive approach to legal, reputational, and societal concerns" },
      { title: "Guide Infrastructure & Talent", description: "Develop tech capabilities and skills" }
    ]
  },
  {
    title: "Generative AI Performance Optimisation",
    icon: Shield,
    description: "Continuous improvement and optimization of AI systems",
    items: [
      { title: "Maintain Peak Performance", description: "Ensure long-term effectiveness and adaptability" },
      { title: "Continuous AI Improvement", description: "Proactive monitoring and iterative refinement for optimal results" },
      { title: "Navigate Deployment Challenges", description: "Expert guidance on technical and ethical hurdles" },
      { title: "Sustainable AI Operations", description: "Prioritise efficiency and eco-friendly practices" },
      { title: "Long-Term Scalable Success", description: "Confidently deliver exceptional AI results over time" }
    ]
  },
  {
    title: "Generative AI Integration Service",
    icon: Workflow,
    description: "Seamless integration of AI solutions into existing systems",
    items: [
      { title: "Custom AI Apps", description: "Tailored generative AI applications integrated effortlessly" },
      { title: "Expert Guidance", description: "Thorough evaluation and technical expertise for implementation" },
      { title: "End-to-End Support", description: "From workflow integration to ongoing maintenance" }
    ]
  }
]

const industryStats = [
  { label: "Annual Economic Impact", value: "$4.4T" },
  { label: "Synthetic Marketing by 2025", value: "30%" },
  { label: "Efficiency Improvement", value: "60%" },
  { label: "Content Creation Speed", value: "10x" }
]

export default function GenerativeAiPage() {
  return (
    <div>
      <Hero
        title="Generative AI Solutions"
        description="Transform your business with cutting-edge generative AI technology"
        video="https://static.vecteezy.com/system/resources/previews/011/106/039/mp4/abstract-background-of-digital-data-free-video.mp4"
      />

      {/* Overview with Stats */}
      <section className="py-20 relative">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div className="space-y-6">
              <Badge>Innovation Through AI</Badge>
              <h2 className="text-3xl font-bold">Next-Generation AI Solutions</h2>
              <p className="text-lg text-muted-foreground">
                Harnessing the transformative power of generative AI, we specialise in crafting AI solutions that revolutionise businesses across diverse industries, enabling our clients to drive innovation, streamline operations, and achieve scalable solutions. Our end-to-end Generative AI capabilities are designed to reinvent your business workflows and efficiency.
              </p>
              
              {/* Stats Grid */}
              <div className="grid grid-cols-2 gap-4 mt-8">
                {industryStats.map((stat, index) => (
                  <Card key={index}>
                    <CardContent className="p-6">
                      <div className="text-2xl font-bold text-primary">{stat.value}</div>
                      <p className="text-sm text-muted-foreground">{stat.label}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* Impact Visualization */}
            <div className="relative rounded-2xl overflow-hidden bg-muted/5 border p-6">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent" />
              <Brain className="w-16 h-16 text-primary mb-4" />
              <h3 className="text-xl font-semibold mb-4">Economic Impact</h3>
              <p className="text-muted-foreground">
                It is expected that annually AI technology will add about $2.6-$4.4 trillion into the global economy. By 2025, 30% of outbound marketing messages will be synthetically generated. We are committed to help our clients automate content creation, accelerate design, personalise experiences, and be future-ready.
              </p>
            </div>
          </div>
        </Container>
      </section>

      {/* Services Grid */}
      <section className="py-24 bg-muted/50">
        <Container>
          <div className="space-y-16">
            {services.map((service, index) => (
              <div key={index} className="space-y-8">
                <div className="flex items-center gap-4">
                  <div className="p-3 rounded-xl bg-primary/10">
                    <service.icon className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold">{service.title}</h3>
                    <p className="text-muted-foreground mt-1">{service.description}</p>
                  </div>
                </div>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {service.items.map((item, itemIndex) => (
                    <Card 
                      key={itemIndex} 
                      className="group hover:shadow-lg hover:border-primary/50 transition-all duration-300"
                    >
                      <CardContent className="p-6">
                        <div className="flex items-start gap-4 h-full">
                          <div className="p-2 rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors">
                            <CheckCircle className="w-4 h-4 text-primary" />
                          </div>
                          <div className="space-y-2">
                            <h4 className="font-semibold text-foreground/90 group-hover:text-primary transition-colors">
                              {item.title}
                            </h4>
                            <p className="text-sm text-muted-foreground">
                              {item.description}
                            </p>
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

      {/* Features Section */}
      <Features
        title="Generative AI Capabilities"
        subtitle="Create, innovate, and transform your business with custom generative AI solutions"
        features={features}
      />
    </div>
  )
}
