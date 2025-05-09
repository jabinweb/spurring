import { Features } from "@/components/services/features"
import { Hero } from "@/components/ui/hero"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import Image from "next/image"
import { Container } from "@/components/ui/container"
import { Brain, Database, LineChart, Search, BarChart } from "lucide-react"

const services = [
  {
    title: "Define & Prepare",
    items: [
      { title: "Goal Setting", description: "Establish clear business objectives and success metrics" },
      { title: "Data Identification", description: "Identify and validate relevant data sources" },
      { title: "Quality Assurance", description: "Ensure data quality and completeness" },
      { title: "Data Preparation", description: "Clean and structure data for mining" }
    ],
    icon: Search
  },
  {
    title: "Model & Evaluate",
    items: [
      { title: "Method Selection", description: "Choose optimal data mining techniques" },
      { title: "Model Development", description: "Build robust and accurate models" },
      { title: "Performance Testing", description: "Rigorous testing and validation" },
      { title: "Result Verification", description: "Ensure accuracy and reliability" }
    ],
    icon: Brain
  },
  {
    title: "Optimise & Adapt",
    items: [
      { title: "Continuous Monitoring", description: "Track model performance and accuracy" },
      { title: "Model Refinement", description: "Enhance models based on new data" },
      { title: "Evolution Management", description: "Adapt to changing business needs" },
      { title: "Performance Optimisation", description: "Improve accuracy and efficiency" }
    ],
    icon: LineChart
  },
  {
    title: "Report & Deliver",
    items: [
      { title: "Clear Reporting", description: "Generate business-ready insights" },
      { title: "Custom Dashboards", description: "Visual representation of key metrics" },
      { title: "Automated Alerts", description: "Timely notification of important insights" },
      { title: "Self-Service Tools", description: "Enable independent analysis capabilities" }
    ],
    icon: BarChart
  }
]

const techStack = [
  { name: "Machine Learning", description: "Advanced algorithms for pattern recognition" },
  { name: "Deep Learning", description: "Neural networks for complex analysis" },
  { name: "Statistical Analysis", description: "Robust statistical methods" },
  { name: "Big Data Processing", description: "Handling large-scale datasets" }
]

export default function DataMiningPage() {
  const features = [
    {
      title: "Data Collection & Processing",
      description: "Gather and process data from multiple sources efficiently",
      subFeatures: [
        {
          title: "Automated Data Collection",
          description: "Smart systems that automatically gather data from diverse sources",
          image: "https://images.unsplash.com/photo-1518186285589-2f7649de83e0?auto=format&fit=crop&q=80"
        },
        {
          title: "Data Cleaning & Preprocessing", 
          description: "Clean and prepare data for analysis using advanced techniques",
          image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80"
        },
        {
          title: "Quality Assurance",
          description: "Ensure data quality and accuracy through rigorous validation",
          image: "https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?auto=format&fit=crop&q=80"
        }
      ]
    },
    {
      title: "Advanced Analytics",
      description: "Extract valuable insights using cutting-edge analytical techniques",
      subFeatures: [
        {
          title: "Pattern Recognition",
          description: "Identify hidden patterns and trends in complex datasets",
          image: "https://images.unsplash.com/photo-1509228468518-180dd4864904?auto=format&fit=crop&q=80"
        },
        {
          title: "Predictive Analytics",
          description: "Forecast future trends using historical data patterns",
          image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80"
        },
        {
          title: "Real-time Analytics",
          description: "Process and analyze data in real-time for immediate insights",
          image: "https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?auto=format&fit=crop&q=80"
        }
      ]
    }
  ]

  return (
    <div>
      <Hero
        title="Data Mining Solutions"
        description="Transform raw data into actionable business insights"
        video="https://static.vecteezy.com/system/resources/previews/002/308/032/mp4/digital-network-loop-background-free-video.mp4"
      />

      {/* Overview Section */}
      <section className="py-20">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <Badge>Data-Driven Insights</Badge>
              <h2 className="text-3xl font-bold">Unlock the Power of Your Data</h2>
              <p className="text-lg text-muted-foreground">
                Transforming raw data into strategic advantages, our comprehensive data mining services uncover hidden patterns that drive informed decisions, boosting productivity and profitability. We empower you with actionable insights, delivering high-quality, reliable, and scalable solutions.
              </p>
              <p className="text-lg text-muted-foreground">
                Leveraging industry-specific expertise and a global reach, we provide rapid turnaround on data mining projects. Our commitment is to equip you with the knowledge needed to make impactful business choices.
              </p>
              <div className="grid grid-cols-2 gap-4 pt-6">
                <Card>
                  <CardContent className="p-6">
                    <div className="text-2xl font-bold text-primary">100%</div>
                    <p className="text-sm text-muted-foreground">Data-driven decisions</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-6">
                    <div className="text-2xl font-bold text-primary">24/7</div>
                    <p className="text-sm text-muted-foreground">Real-time analytics</p>
                  </CardContent>
                </Card>
              </div>
            </div>
            <div className="relative h-[400px] rounded-2xl overflow-hidden">
              <Image
                src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80"
                alt="Data Mining"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </Container>
      </section>

      {/* Services Grid */}
      <section className="py-20 bg-muted/50">
        <Container>
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Our Service Scope</h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              See the unseen in your data. Partner with us for data mining solutions that deliver tangible results, turning complexity into clarity.
            </p>
          </div>

          <div className="grid gap-12">
            {services.map((service, index) => (
              <div key={index} className="space-y-6">
                <div className="flex items-center gap-3">
                  <service.icon className="h-6 w-6 text-primary" />
                  <h3 className="text-2xl font-bold">{service.title}</h3>
                </div>
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {service.items.map((item, itemIndex) => (
                    <Card key={itemIndex}>
                      <CardContent className="p-6">
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
        title="Data Mining Solutions"
        subtitle="Uncover valuable insights from your data with advanced mining and analysis techniques"
        features={features}
      />
    </div>
  )
}
