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

export default function GenerativeAiPage() {
  return (
    <div>
      <Hero
        title="Generative AI Solutions"
        description="Revolutionize your business with cutting-edge generative AI technology"
        image="https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80"
      />

      {/* Overview Section */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <Badge className="bg-primary/10 text-primary border-primary/20">
                Innovation Through AI
              </Badge>
              <h2 className="text-3xl font-bold">Next-Generation AI Solutions</h2>
              <p className="text-lg text-muted-foreground">
                We specialize in crafting AI solutions using the power of generative AI to revolutionize 
                businesses across diverse industries. Using generative AI, we help our clients drive 
                innovation, streamline operations and achieve scalable solutions.
              </p>
              <div className="grid grid-cols-2 gap-4 pt-6">
                <Card>
                  <CardContent className="p-6">
                    <div className="text-2xl font-bold text-primary">$4.4T</div>
                    <p className="text-sm text-muted-foreground">Annual economic impact</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-6">
                    <div className="text-2xl font-bold text-primary">30%</div>
                    <p className="text-sm text-muted-foreground">Synthetic marketing by 2025</p>
                  </CardContent>
                </Card>
              </div>
            </div>
            <div className="relative h-[400px] rounded-2xl overflow-hidden">
              <Image
                src="https://images.unsplash.com/photo-1676299081940-2529ea16aa67?auto=format&fit=crop&q=80"
                alt="Generative AI"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>
    <Features
      title="Generative AI Solutions"
      subtitle="Create, innovate, and transform your business with custom generative AI solutions that bring ideas to life"
      features={features}
    />
    </div>
  )
}
