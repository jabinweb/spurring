import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Brain, CheckCircle, LineChart, Sparkles, ShieldCheck, Users, Lightbulb, Headphones } from "lucide-react"
import { Hero } from "@/components/ui/hero"
import { Container } from "@/components/ui/container"
import Image from "next/image"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

const services = [
  {
    title: "AI Consulting Services",
    icon: Brain,
    items: [
      { title: "Unlock AI Opportunities", description: "Realise the vast potential of AI for your organisation" },
      { title: "Tailored AI Solutions", description: "Get customised use cases for your unique industry" },
      { title: "End-to-End AI Services", description: "From strategy to scalable infrastructure and deployment" },
      { title: "Fast-Track AI with PoC", description: "Validate AI value quickly with reliable MVPs" },
      { title: "Guaranteed AI Performance", description: "Benefit from model validation, quality control, and post-implementation assurance" }
    ]
  },
  {
    title: "AI Strategic Planning",
    icon: Lightbulb,
    items: [
      { title: "Targeted AI Strategies", description: "Address your specific industry and business challenges with AI plans" },
      { title: "Aligned with Objectives", description: "Tailor AI strategies to your unique organisational goals" },
      { title: "Maximise AI Value", description: "Focus on strategies that deliver the greatest return on your AI investments" },
      { title: "Feasible AI Prioritisation", description: "Define how AI supports your business goals and prioritise top AI opportunities" },
      { title: "Strategic Roadmap", description: "Create a clear path for AI implementation and growth" }
    ]
  },
  {
    title: "AI Solution Innovation",
    icon: Sparkles,
    items: [
      { title: "Track & Evolve", description: "Continuously monitor results to fuel new AI applications" },
      { title: "Consultative AI Development", description: "Engage stakeholders regularly to explore and refine AI opportunities" },
      { title: "Envision Business Impact", description: "Understand how AI can transform your current processes" },
      { title: "Set Achievable AI Goals", description: "Define realistic targets for AI integration and ROI" },
      { title: "Future-Proof Solutions", description: "Develop scalable AI solutions that grow with your needs" }
    ]
  },
  {
    title: "AI Assistance",
    icon: Headphones,
    items: [
      { title: "Continuous Monitoring", description: "Proactive system monitoring and maintenance" },
      { title: "Regular Updates", description: "Keep your AI solutions current and optimised" },
      { title: "Performance Optimisation", description: "Continuous improvement of AI systems" }
    ]
  }
]

export default function AIConsultingPage() {
  return (
    <div>
      <Hero
        title="AI Consulting Services"
        description="Strategic guidance through the complexities of AI implementation"
        video="https://cdn.pixabay.com/video/2019/12/15/30200-380473759_tiny.mp4"
      />

      {/* Overview Section */}
      <section className="py-20 relative">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div className="space-y-6">
              <Badge>Strategic AI Solutions</Badge>
              <h2 className="text-3xl font-bold">Transform Your Organisation with AI</h2>
              <p className="text-lg text-muted-foreground">
                Our AI consultants combine deep industry expertise and technical proficiency to develop customized AI solutions that address your unique business challenges. We guide you through the process of creating and implementing AI systems, ensuring seamless integration, fostering innovation, and empowering your team to drive results.
              </p>
            </div>

            {/* Growth Trajectory */}
            <div className="relative rounded-2xl overflow-hidden bg-muted/5 border p-6">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent" />
              <LineChart className="w-16 h-16 text-primary mb-4" />
              <h3 className="text-xl font-semibold mb-4">AI Growth Trajectory</h3>
              <p className="text-muted-foreground">
                According to a recent IDC study, artificial intelligence is projected to contribute $19.9 trillion to the global economy by 2030, accounting for 3.5% of global GDP. This growth is driven by increased business spending on AI adoption, automation of routine tasks, and the creation of new efficiencies across industries.
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
                  <h3 className="text-2xl font-bold">{service.title}</h3>
                </div>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {service.items.map((item, itemIndex) => (
                    <Card key={itemIndex} className="group relative overflow-hidden hover:shadow-lg transition-all duration-300">
                      <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                      <CardContent className="p-6 relative">
                        <div className="flex items-start gap-4">
                          <div className="p-2 rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors">
                            <CheckCircle className="h-4 w-4 text-primary" />
                          </div>
                          <div>
                            <h4 className="font-semibold mb-2 group-hover:text-primary transition-colors">{item.title}</h4>
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
    </div>
  )
}
