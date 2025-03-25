import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Brain, ArrowRight, CheckCircle, TrendingUp } from "lucide-react"
import Link from "next/link"
import { Hero } from "@/components/ui/hero"
import { Container } from "@/components/ui/container"

export default function AIConsultingPage() {
  const features = [
    {
      title: "AI Assessment",
      description: "Comprehensive evaluation of your organization&apos;s AI readiness and potential implementation areas"
    },
    {
      title: "AI Strategy Development",
      description: "Custom roadmap creation for AI integration aligned with your business goals"
    },
    {
      title: "AI Integration",
      description: "Seamless implementation of AI solutions into your existing infrastructure"
    },
    {
      title: "AI Solution Development",
      description: "Custom AI solution development tailored to your specific needs"
    },
    {
      title: "AI Support",
      description: "Ongoing maintenance and optimization of your AI systems"
    }
  ]

  return (
    <div>
      <Hero
        title="AI Consulting Services"
        description="Strategic guidance through the complexities of AI implementation"
        image="https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80"
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
              <Image
                src="https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&q=80"
                alt="AI Consulting"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </Container>
      </section>

      {/* Features Section */}
      <section className="bg-muted/50 py-20 px-4">
        <Container>
          <div className="text-center mb-12">
            <Badge className="bg-primary/10 text-primary border-primary/20 mb-4">
              Our Services
            </Badge>
            <h2 className="text-3xl font-bold mb-4">Comprehensive AI Consultation</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              We deliver tailored solutions that maximize efficiency, improve customer experience, 
              streamline operations and drive tangible economic growth.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card key={index}>
                <CardContent className="p-6">
                  <CheckCircle className="h-8 w-8 text-primary mb-4" />
                  <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </Container>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Start Your AI Journey?</h2>
          <p className="text-lg text-muted-foreground mb-8">
            Let&apos;s discuss how our AI consulting services can transform your business
          </p>
          <Button size="lg" asChild>
            <Link href="/contact">
              Schedule a Consultation
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </section>
    </div>
  )
}
