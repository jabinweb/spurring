import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Database, ArrowRight, LineChart, BarChart } from "lucide-react"
import Link from "next/link"
import { Hero } from "@/components/ui/hero"

export default function DataMiningPage() {
  const features = [
    {
      title: "Web Data Mining",
      description: "Extract valuable insights from web-based data sources"
    },
    {
      title: "Social Media Mining",
      description: "Analyze social media data for market insights and trends"
    },
    {
      title: "Lead Data Mining",
      description: "Identify and qualify potential business opportunities"
    },
    {
      title: "Image Data Mining",
      description: "Extract insights from visual data and images"
    },
    {
      title: "Excel Data Mining",
      description: "Process and analyze spreadsheet-based data"
    },
    {
      title: "Word Data Mining",
      description: "Extract insights from text documents"
    },
    {
      title: "PDF Data Mining",
      description: "Analyze and extract data from PDF documents"
    }
  ]

  return (
    <div>
      <Hero
        title="Data Mining Solutions"
        description="Transform raw data into actionable business insights"
        image="https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80"
      />

      {/* Overview Section */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <Badge className="bg-primary/10 text-primary border-primary/20">
                Data-Driven Insights
              </Badge>
              <h2 className="text-3xl font-bold">Unlock the Power of Your Data</h2>
              <p className="text-lg text-muted-foreground">
                We offer comprehensive data mining services, transforming raw data into 
                actionable insights for strategic business decisions. Our solutions help you 
                identify patterns, boost productivity, and drive profitability through 
                data-driven decision making.
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
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-muted/50 py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <Badge className="bg-primary/10 text-primary border-primary/20 mb-4">
              Our Services
            </Badge>
            <h2 className="text-3xl font-bold mb-4">Comprehensive Data Mining Services</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              High-quality, reliable, and scalable data mining solutions with rapid turnaround
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card key={index}>
                <CardContent className="p-6">
                  <LineChart className="h-8 w-8 text-primary mb-4" />
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
          <h2 className="text-3xl font-bold mb-4">Ready to Leverage Your Data?</h2>
          <p className="text-lg text-muted-foreground mb-8">
            Let&apos;s discuss how our data mining solutions can unlock insights for your business
          </p>
          <Button size="lg" asChild>
            <Link href="/contact">
              Start Mining Insights
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </section>
    </div>
  )
}
