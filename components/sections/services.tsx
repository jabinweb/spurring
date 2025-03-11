import { Card, CardContent } from "@/components/ui/card"
import { Brain, Code, LineChart, MessageSquare } from "lucide-react"
import { FadeIn } from "@/components/animations/fade-in"

const services = [
  {
    icon: Brain,
    title: "AI Consulting",
    description: "Strategic guidance for implementing AI solutions"
  },
  {
    icon: Code,
    title: "Generative AI",
    description: "Custom solutions for content generation and creative tasks"
  },
  {
    icon: MessageSquare,
    title: "Smart Assistants",
    description: "Intelligent chatbots and virtual assistants for automation"
  },
  {
    icon: LineChart,
    title: "Data Mining",
    description: "Advanced analytics and pattern recognition solutions"
  }
]

export function Services() {
  return (
    <section className="py-32 px-4">
      <div className="max-w-7xl mx-auto">
        <FadeIn>
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-4">
            Our Services
          </h2>
          <p className="text-muted-foreground text-xl text-center mb-16 max-w-2xl mx-auto">
            Comprehensive AI solutions tailored to your business needs
          </p>
        </FadeIn>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, index) => (
            <FadeIn key={index} delay={index * 0.1}>
              <Card className="group hover:border-primary transition-colors duration-300">
                <CardContent className="pt-6">
                  <div className="mb-4 group-hover:scale-110 transition-transform duration-300">
                    <service.icon className="h-10 w-10 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{service.title}</h3>
                  <p className="text-muted-foreground">
                    {service.description}
                  </p>
                </CardContent>
              </Card>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  )
}
