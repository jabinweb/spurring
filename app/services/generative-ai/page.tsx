import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Atom, ArrowRight, CheckCircle, Sparkles } from "lucide-react"
import Link from "next/link"
import { Hero } from "@/components/ui/hero"

export default function GenerativeAIPage() {
  const features = [
    {
      title: "Generative AI Consultation",
      description: "Expert guidance on leveraging generative AI for your business needs"
    },
    {
      title: "Strategy Development",
      description: "Custom strategies for implementing generative AI solutions"
    },
    {
      title: "Performance Optimization",
      description: "Fine-tuning and optimization of generative AI models"
    },
    {
      title: "Data Engineering",
      description: "Robust data infrastructure for generative AI systems"
    },
    {
      title: "Integration Services",
      description: "Seamless integration with existing business processes"
    },
    {
      title: "Ongoing Support",
      description: "Continuous support and maintenance of generative AI solutions"
    }
  ]

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

      {/* Features Section */}
      <section className="bg-muted/50 py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <Badge className="bg-primary/10 text-primary border-primary/20 mb-4">
              Our Services
            </Badge>
            <h2 className="text-3xl font-bold mb-4">Comprehensive Generative AI Services</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              We help businesses automate content creation, accelerate design, personalize experiences, 
              and become future-ready with generative AI.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card key={index}>
                <CardContent className="p-6">
                  <Sparkles className="h-8 w-8 text-primary mb-4" />
                  <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Harness Generative AI?</h2>
          <p className="text-lg text-muted-foreground mb-8">
            Let&apos;s discuss how our generative AI solutions can transform your business
          </p>
          <Button size="lg" asChild>
            <Link href="/contact">
              Get Started
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </section>
    </div>
  )
}
