import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Brain, ArrowRight, CheckCircle, TrendingUp } from "lucide-react"
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

export default function AIConsultingPage() {
  return (
    <div>
      <Hero
        title="AI Consulting Services"
        description="Strategic guidance through the complexities of AI implementation"
        image="https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80" // Replace with AI-focused hero image
      />

      {/* Overview Section */}
      <section className="py-20 px-4">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <Badge className="bg-primary/10 text-primary border-primary/20">
                Strategic AI Solutions
              </Badge>
              <h2 className="text-3xl font-bold">Transform Your Business with AI</h2>
              <p className="text-lg text-muted-foreground">
                We provide comprehensive AI consultation to guide businesses through complexities 
                of the ever-evolving AI landscape. Our experts assess your AI readiness and help 
                implement technology to achieve your individualized organizational targets.
              </p>
              <div className="grid grid-cols-2 gap-4 pt-6">
                <Card>
                  <CardContent className="p-6">
                    <div className="text-2xl font-bold text-primary">30%</div>
                    <p className="text-sm text-muted-foreground">Competitive advantage by 2025</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-6">
                    <div className="text-2xl font-bold text-primary">$13T</div>
                    <p className="text-sm text-muted-foreground">Global GDP impact by 2030</p>
                  </CardContent>
                </Card>
              </div>
            </div>
            <div className="relative h-[400px] rounded-2xl overflow-hidden">
              <video
                src="https://player.vimeo.com/external/451556922.hd.mp4?s=500c4724a68a5d55055c57e61ddd9ca378f32821&profile_id=175"
                autoPlay
                muted
                loop
                playsInline
                className="object-cover w-full h-full"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-background/20 to-transparent" />
            </div>
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
