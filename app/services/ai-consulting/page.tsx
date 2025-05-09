import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Brain, ArrowRight, CheckCircle, TrendingUp, LineChart } from "lucide-react"
import Link from "next/link"
import { Hero } from "@/components/ui/hero"
import { Container } from "@/components/ui/container"
import { Features } from "@/components/services/features"

const features = [
  {
    title: "Strategic AI Integration",
    description: "Transform your business with strategic AI integration and expert consulting.",
    subFeatures: [
      {
        title: "AI Strategy Development",
        description: "Create comprehensive AI strategies aligned with your business goals",
        image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80" // Futuristic data visualization
      },
      {
        title: "Process Optimization",
        description: "Streamline operations with AI-powered process automation",
        image: "https://images.unsplash.com/photo-1535378917042-10a22c95931a?auto=format&fit=crop&q=80" // Modern office automation
      },
      {
        title: "Digital Transformation",
        description: "Guide your organization through AI-driven digital transformation",
        image: "https://images.unsplash.com/photo-1526628953301-3e589a6a8b74?auto=format&fit=crop&q=80" // Digital transformation visual
      }
    ]
  },
  {
    title: "Implementation & Training",
    description: "Expert guidance on AI implementation and team training.",
    subFeatures: [
      {
        title: "Custom AI Solutions",
        description: "Develop and deploy customized AI solutions for your specific needs",
        image: "https://images.unsplash.com/photo-1488229297570-58520851e868?auto=format&fit=crop&q=80" // Technology implementation
      },
      {
        title: "Team Training",
        description: "Comprehensive training programs for your team on AI technologies",
        image: "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&q=80" // Team training session
      },
      {
        title: "Change Management",
        description: "Smooth transition and adoption of AI technologies in your organization",
        image: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&q=80" // Change management visual
      }
    ]
  }
]

const services = [
  {
    title: "AI Consulting Services",
    items: [
      { title: "Unlock AI Opportunities", description: "Realise the vast potential of AI for your organisation" },
      { title: "Tailored AI Solutions", description: "Get customised use cases for your unique industry" },
      { title: "End-to-End AI Services", description: "From strategy to scalable infrastructure and deployment" },
      { title: "Fast-Track AI with PoC", description: "Validate AI value quickly with reliable MVPs" },
      { title: "Guaranteed AI Performance", description: "Benefit from model validation, quality control, and post-implementation assurance" }
    ]
  },
  {
    title: "AI Readiness Assessment",
    items: [
      { title: "Optimise for AI", description: "Refine data handling and ensure seamless connectivity across systems" },
      { title: "Evaluate AI Readiness", description: "Assess your organisation's capacity to adopt and integrate AI" },
      { title: "Identify Key Factors", description: "Understand critical considerations and potential risks" },
      { title: "Inventory AI Assets", description: "Catalogue your existing AI tools and models" },
      { title: "Gauge Adoption Readiness", description: "Determine your preparedness for AI integration" }
    ]
  },
  {
    title: "AI Strategic Planning",
    items: [
      { title: "Targeted AI Strategies", description: "Address your specific industry and business challenges with AI plans" },
      { title: "Aligned with Objectives", description: "Tailor AI strategies to your unique organisational goals" },
      { title: "Maximise AI Value", description: "Focus on strategies that deliver the greatest return on your AI investments" },
      { title: "Feasible AI Prioritisation", description: "Define how AI supports your business goals and prioritise top AI opportunities" },
      { title: "Strategic Roadmap", description: "Create a clear path for AI implementation and growth" }
    ]
  },
  {
    title: "AI Adoption",
    items: [
      { title: "Adapt for AI", description: "Transform your workforce and business for AI, boosting efficiency" },
      { title: "Manage Change", description: "Develop a workforce strategy with clear communication" },
      { title: "Cultivate AI Talent", description: "Attract, train, and retain the skills needed for AI implementation" },
      { title: "Client-Focused AI Partner", description: "We're an AI consulting company centred on your needs" },
      { title: "Seamless Integration", description: "Ensure smooth adoption across your organisation" }
    ]
  },
  {
    title: "AI Solution Innovation",
    items: [
      { title: "Track & Evolve", description: "Continuously monitor results to fuel new AI applications" },
      { title: "Interactive AI Vision", description: "Engage stakeholders in workshops to explore AI possibilities" },
      { title: "Envision Business Impact", description: "Understand how AI can transform your current processes" },
      { title: "Set Achievable AI Goals", description: "Define realistic targets for AI integration and ROI" },
      { title: "Future-Proof Solutions", description: "Develop scalable AI solutions that grow with your needs" }
    ]
  },
  {
    title: "AI Assistance",
    items: [
      { title: "24/7 AI Support", description: "Get round-the-clock assistance for your AI systems" },
      { title: "Expert AI Specialists", description: "Access our dedicated team of AI experts" },
      { title: "Continuous Monitoring", description: "Proactive system monitoring and maintenance" },
      { title: "Regular Updates", description: "Keep your AI solutions current and optimised" },
      { title: "Performance Optimisation", description: "Continuous improvement of AI systems" }
    ]
  }
]

const industryStats = [
  { label: "Global GDP Impact by 2030", value: "$13T" },
  { label: "AI-Enabled Organisation Performance by 2025", value: "30%" },
  { label: "Reduction in Operational Costs", value: "45%" },
  { label: "Increase in Productivity", value: "40%" }
]

export default function AIConsultingPage() {
  return (
    <div>
      <Hero
        title="AI Consulting Services"
        description="Strategic guidance through the complexities of AI implementation"
        video="https://player.vimeo.com/external/451556922.hd.mp4?s=500c4724a68a5d55055c57e61ddd9ca378f32821&profile_id=175"
      />

      {/* Overview with Stats */}
      <section className="py-20 relative">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div className="space-y-6">
              <Badge>Strategic AI Solutions</Badge>
              <h2 className="text-3xl font-bold">Transform Your Organisation with AI</h2>
              <p className="text-lg text-muted-foreground">
                Our AI consultants expertly blend industry experience and technical knowledge to create dynamic human-AI collaborations that solve your biggest business challenges. We offer comprehensive AI consultation, guiding you through the AI landscape to identify optimal use cases, establish effective governance, and empower your team.
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

            {/* Graph Visualization */}
            <div className="relative rounded-2xl overflow-hidden bg-muted/5 border p-6">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent" />
              <LineChart className="w-16 h-16 text-primary mb-4" />
              <h3 className="text-xl font-semibold mb-4">AI Growth Trajectory</h3>
              <p className="text-muted-foreground">
                By 2030, AI could potentially add $13 trillion to the global GDP. AI-enabled organisations will outperform their competition by 30% by 2025. Our consultants provide tailored strategies, reducing risks and maximising AI&apos;s impact on business growth.
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
                <h3 className="text-2xl font-bold">{service.title}</h3>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {service.items.map((item, itemIndex) => (
                    <Card key={itemIndex}>
                      <CardContent className="p-6">
                        <CheckCircle className="h-5 w-5 text-primary mb-4" />
                        <h4 className="font-semibold mb-2">{item.title}</h4>
                        <p className="text-sm text-muted-foreground">{item.description}</p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <Features
        title="Our AI Consulting Services"
        subtitle="Comprehensive solutions to transform your business"
        features={features}
      />
    </div>
  )
}
