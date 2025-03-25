import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { MessageSquare, ArrowRight, Bot, Zap } from "lucide-react"
import Link from "next/link"
import { Hero } from "@/components/ui/hero"

export default function SmartAssistantsPage() {
  const features = [
    {
      title: "Data Integration",
      description: "Seamless integration with your existing data sources and systems"
    },
    {
      title: "Smart Assistance Deployment",
      description: "End-to-end deployment of AI-powered virtual assistants"
    },
    {
      title: "Personalized Coaching",
      description: "AI-driven personalized recommendations and guidance"
    },
    {
      title: "Continued Support",
      description: "Ongoing maintenance and optimization of smart assistance systems"
    }
  ]

  return (
    <div>
      <Hero
        title="Smart Assistant Solutions"
        description="Transform workplace productivity with AI-powered virtual assistants"
        image="https://images.unsplash.com/photo-1531973576160-7125cd663d86?auto=format&fit=crop&q=80"
      />

      {/* Overview Section */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <Badge className="bg-primary/10 text-primary border-primary/20">
                AI-Powered Automation
              </Badge>
              <h2 className="text-3xl font-bold">Intelligent Workplace Solutions</h2>
              <p className="text-lg text-muted-foreground">
                Our Smart Assistant service offers powerful, AI-driven virtual assistants for 
                seamless workplace productivity. We help clients stay ahead by transforming 
                organizational functions and customer interactions through intelligent automation.
              </p>
              <div className="grid grid-cols-2 gap-4 pt-6">
                <Card>
                  <CardContent className="p-6">
                    <div className="text-2xl font-bold text-primary">40%</div>
                    <p className="text-sm text-muted-foreground">Productivity increase</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-6">
                    <div className="text-2xl font-bold text-primary">20%</div>
                    <p className="text-sm text-muted-foreground">Cost reduction</p>
                  </CardContent>
                </Card>
              </div>
            </div>
            <div className="relative h-[400px] rounded-2xl overflow-hidden">
              <Image
                src="https://images.unsplash.com/photo-1535378917042-10a22c95931a?auto=format&fit=crop&q=80"
                alt="Smart Assistants"
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
            <h2 className="text-3xl font-bold mb-4">Smart Assistant Services</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Streamline operations and enhance customer interactions with intelligent AI assistants
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {features.map((feature, index) => (
              <Card key={index}>
                <CardContent className="p-6">
                  <Bot className="h-8 w-8 text-primary mb-4" />
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
          <h2 className="text-3xl font-bold mb-4">Ready to Enhance Your Operations?</h2>
          <p className="text-lg text-muted-foreground mb-8">
            Let&apos;s discuss how our smart assistant solutions can transform your business
          </p>
          <Button size="lg" asChild>
            <Link href="/contact">
              Schedule a Demo
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </section>
    </div>
  )
}
