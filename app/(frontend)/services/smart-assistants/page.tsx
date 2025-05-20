import { Features } from "@/components/services/features"
import { Hero } from "@/components/ui/hero"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import Image from "next/image"

const features = [
  {
    title: "Intelligent Automation",
    description: "Automate tasks with AI-powered assistants",
    subFeatures: [
      {
        title: "Task Automation",
        description: "Automate repetitive tasks and workflows",
        image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&q=80"
      },
      {
        title: "Smart Scheduling",
        description: "Intelligent calendar and meeting management",
        image: "https://images.unsplash.com/photo-1483389127117-b6a2102724ae?auto=format&fit=crop&q=80"
      },
      {
        title: "Document Processing",
        description: "Automated document analysis and processing",
        image: "https://images.unsplash.com/photo-1532619675605-1ede6c2ed2b0?auto=format&fit=crop&q=80"
      }
    ]
  },
  {
    title: "Virtual Assistance",
    description: "AI-powered assistance for various needs",
    subFeatures: [
      {
        title: "Customer Support",
        description: "24/7 automated customer service solutions",
        image: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&q=80"
      },
      {
        title: "Personal Assistant",
        description: "AI companion for daily tasks and reminders",
        image: "https://images.unsplash.com/photo-1596558450268-9c27524ba856?auto=format&fit=crop&q=80"
      },
      {
        title: "Business Assistant",
        description: "Intelligent support for business operations",
        image: "https://images.unsplash.com/photo-1521791136064-7986c2920216?auto=format&fit=crop&q=80"
      }
    ]
  }
]

export default function SmartAssistantsPage() {
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
    <Features
      title="Smart Assistant Solutions"
      subtitle="Enhance productivity and user experience with intelligent digital assistants"
      features={features}
    />
    </div>
  )
}
