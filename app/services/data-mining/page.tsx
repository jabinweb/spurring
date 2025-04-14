import { Features } from "@/components/services/features"
import { Hero } from "@/components/ui/hero"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import Image from "next/image"

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
    <Features
      title="Data Mining Solutions"
      subtitle="Uncover valuable insights from your data with advanced mining and analysis techniques"
      features={features}
    />
    </div>
  )
}
