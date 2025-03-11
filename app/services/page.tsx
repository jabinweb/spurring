import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Brain, Code, LineChart, MessageSquare, Zap, Database, Cloud, Shield } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

export default function ServicesPage() {
  return (
    <div>
      {/* Hero Section */}
      <section className="relative h-[400px] flex items-center justify-center overflow-hidden">
        <Image
          src="https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&q=80"
          alt="AI Services"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-background/80" />
        <div className="relative z-10 text-center px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Our Services</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Comprehensive AI solutions tailored to your business needs
          </p>
        </div>
      </section>

      {/* Main Services */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card className="p-6">
              <CardContent className="p-0">
                <div className="flex items-center mb-4">
                  <Brain className="h-8 w-8 text-primary mr-3" />
                  <h2 className="text-2xl font-bold">AI Consulting</h2>
                </div>
                <p className="text-muted-foreground mb-4">
                  Strategic guidance for implementing AI solutions in your business.
                  We help you identify opportunities, plan implementation, and
                  measure success.
                </p>
                <ul className="space-y-2 mb-6">
                  <li className="flex items-center">
                    <Zap className="h-5 w-5 text-primary mr-2" />
                    <span>AI Readiness Assessment</span>
                  </li>
                  <li className="flex items-center">
                    <Zap className="h-5 w-5 text-primary mr-2" />
                    <span>Implementation Strategy</span>
                  </li>
                  <li className="flex items-center">
                    <Zap className="h-5 w-5 text-primary mr-2" />
                    <span>ROI Analysis</span>
                  </li>
                </ul>
                <Button asChild>
                  <Link href="/contact">Learn More</Link>
                </Button>
              </CardContent>
            </Card>

            <Card className="p-6">
              <CardContent className="p-0">
                <div className="flex items-center mb-4">
                  <Code className="h-8 w-8 text-primary mr-3" />
                  <h2 className="text-2xl font-bold">Generative AI</h2>
                </div>
                <p className="text-muted-foreground mb-4">
                  Custom solutions for content generation, creative tasks, and
                  automated content production using state-of-the-art AI models.
                </p>
                <ul className="space-y-2 mb-6">
                  <li className="flex items-center">
                    <Zap className="h-5 w-5 text-primary mr-2" />
                    <span>Text Generation</span>
                  </li>
                  <li className="flex items-center">
                    <Zap className="h-5 w-5 text-primary mr-2" />
                    <span>Image Synthesis</span>
                  </li>
                  <li className="flex items-center">
                    <Zap className="h-5 w-5 text-primary mr-2" />
                    <span>Code Generation</span>
                  </li>
                </ul>
                <Button asChild>
                  <Link href="/contact">Learn More</Link>
                </Button>
              </CardContent>
            </Card>

            <Card className="p-6">
              <CardContent className="p-0">
                <div className="flex items-center mb-4">
                  <MessageSquare className="h-8 w-8 text-primary mr-3" />
                  <h2 className="text-2xl font-bold">Smart Assistants</h2>
                </div>
                <p className="text-muted-foreground mb-4">
                  Intelligent chatbots and virtual assistants that automate
                  customer service and internal processes.
                </p>
                <ul className="space-y-2 mb-6">
                  <li className="flex items-center">
                    <Zap className="h-5 w-5 text-primary mr-2" />
                    <span>Customer Service Bots</span>
                  </li>
                  <li className="flex items-center">
                    <Zap className="h-5 w-5 text-primary mr-2" />
                    <span>Process Automation</span>
                  </li>
                  <li className="flex items-center">
                    <Zap className="h-5 w-5 text-primary mr-2" />
                    <span>Virtual Assistants</span>
                  </li>
                </ul>
                <Button asChild>
                  <Link href="/contact">Learn More</Link>
                </Button>
              </CardContent>
            </Card>

            <Card className="p-6">
              <CardContent className="p-0">
                <div className="flex items-center mb-4">
                  <LineChart className="h-8 w-8 text-primary mr-3" />
                  <h2 className="text-2xl font-bold">Data Mining</h2>
                </div>
                <p className="text-muted-foreground mb-4">
                  Advanced analytics and pattern recognition solutions that
                  turn your data into actionable insights.
                </p>
                <ul className="space-y-2 mb-6">
                  <li className="flex items-center">
                    <Zap className="h-5 w-5 text-primary mr-2" />
                    <span>Predictive Analytics</span>
                  </li>
                  <li className="flex items-center">
                    <Zap className="h-5 w-5 text-primary mr-2" />
                    <span>Pattern Recognition</span>
                  </li>
                  <li className="flex items-center">
                    <Zap className="h-5 w-5 text-primary mr-2" />
                    <span>Data Visualization</span>
                  </li>
                </ul>
                <Button asChild>
                  <Link href="/contact">Learn More</Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Additional Services */}
      <section className="bg-muted py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Additional Services</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="flex flex-col items-center text-center">
              <Database className="h-12 w-12 text-primary mb-4" />
              <h3 className="text-xl font-semibold mb-2">Big Data Processing</h3>
              <p className="text-muted-foreground">
                Scalable solutions for processing and analyzing large datasets
              </p>
            </div>
            <div className="flex flex-col items-center text-center">
              <Cloud className="h-12 w-12 text-primary mb-4" />
              <h3 className="text-xl font-semibold mb-2">Cloud Integration</h3>
              <p className="text-muted-foreground">
                Seamless integration of AI solutions with cloud platforms
              </p>
            </div>
            <div className="flex flex-col items-center text-center">
              <Shield className="h-12 w-12 text-primary mb-4" />
              <h3 className="text-xl font-semibold mb-2">AI Security</h3>
              <p className="text-muted-foreground">
                Ensuring your AI systems are secure and compliant
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Our Process</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-12 h-12 bg-primary text-primary-foreground rounded-full flex items-center justify-center mx-auto mb-4">
                1
              </div>
              <h3 className="text-xl font-semibold mb-2">Discovery</h3>
              <p className="text-muted-foreground">
                Understanding your needs and objectives
              </p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-primary text-primary-foreground rounded-full flex items-center justify-center mx-auto mb-4">
                2
              </div>
              <h3 className="text-xl font-semibold mb-2">Planning</h3>
              <p className="text-muted-foreground">
                Developing a tailored solution strategy
              </p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-primary text-primary-foreground rounded-full flex items-center justify-center mx-auto mb-4">
                3
              </div>
              <h3 className="text-xl font-semibold mb-2">Implementation</h3>
              <p className="text-muted-foreground">
                Executing the solution with precision
              </p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-primary text-primary-foreground rounded-full flex items- center justify-center mx-auto mb-4">
                4
              </div>
              <h3 className="text-xl font-semibold mb-2">Optimization</h3>
              <p className="text-muted-foreground">
                Continuous improvement and refinement
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-primary text-primary-foreground py-20 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Get Started?</h2>
          <p className="text-lg mb-8">
            Let's discuss how our AI services can transform your business
          </p>
          <Button size="lg" variant="secondary" asChild>
            <Link href="/contact">Schedule a Consultation</Link>
          </Button>
        </div>
      </section>
    </div>
  )
}