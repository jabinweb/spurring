import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Brain, CheckCircle, LineChart, Sparkles, ShieldCheck, Users, Lightbulb, Headphones } from "lucide-react"
import { Hero } from "@/components/ui/hero"
import { Container } from "@/components/ui/container"
import Image from "next/image"

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
    title: "AI Readiness Assessment",
    icon: ShieldCheck,
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
    title: "AI Adoption",
    icon: Users,
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
    icon: Sparkles,
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
    icon: Headphones,
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

const industryConsulting = [
  {
    title: "Supply Chain",
    description: "Elevate your customer experience to differentiate your organisation by intelligently applying AI technology.",
    image: "https://images.unsplash.com/photo-1553413077-190dd305871c?auto=format&fit=crop&q=80"
  },
  {
    title: "Marketing",
    description: "Modify your strategy and content based on AI technology that identifies customer behaviour, preferences and sales trends.",
    image: "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&q=80"
  },
  {
    title: "Customer Service",
    description: "Optimise your workforce with our AI-augmented HR solutions and expertise.",
    image: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&q=80"
  },
  {
    title: "Cybersecurity",
    description: "Discover how our cybersecurity services use our proprietary AI to both transform your business and manage your risk.",
    image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80"
  },
  {
    title: "IT Operations",
    description: "Step up IT automation and operations with generative AI, aligning every aspect of your IT infrastructure with business priorities.",
    image: "https://images.unsplash.com/photo-1520869562399-e772f042f422?auto=format&fit=crop&q=80"
  },
  {
    title: "Finance",
    description: "Use AI-powered insights for better performance measurement, forecasting and more confident decision making.",
    image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&q=80"
  }
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

      {/* Industry Solutions */}
      <section className="py-24">
        <Container>
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">AI Consulting In Different Industries</h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Tailored AI solutions for diverse industry needs
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {industryConsulting.map((industry, index) => (
              <Card key={index} className="group hover:shadow-lg transition-shadow">
                <div className="relative h-48 overflow-hidden">
                  <Image
                    src={industry.image}
                    alt={industry.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover transform transition-transform duration-500 ease-out group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent to-background/90" />
                </div>
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold mb-3">
                    AI Consulting for {industry.title}
                  </h3>
                  <p className="text-muted-foreground">
                    {industry.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </Container>
      </section>
    </div>
  )
}
