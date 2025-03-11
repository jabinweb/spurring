import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, Brain } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

export default function ProjectsPage() {
  const projects = [
    {
      title: "Smart City Infrastructure",
      client: "Municipal Corporation",
      image: "https://images.unsplash.com/photo-1573804013926-c3f537c3c0fc?auto=format&fit=crop&q=80",
      description: "Implemented AI-driven solutions for traffic management and urban planning",
      tags: ["Smart City", "IoT", "Data Analytics"],
      results: ["30% reduction in traffic congestion", "20% energy savings"]
    },
    {
      title: "Healthcare Diagnostics AI",
      client: "Leading Hospital Chain",
      image: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&q=80",
      description: "Developed AI system for early disease detection and diagnosis",
      tags: ["Healthcare", "Machine Learning", "Diagnostics"],
      results: ["95% accuracy in predictions", "40% faster diagnosis"]
    },
    {
      title: "Financial Fraud Detection",
      client: "Major Bank",
      image: "https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&q=80",
      description: "Created AI-powered system to detect and prevent financial fraud",
      tags: ["FinTech", "Security", "Machine Learning"],
      results: ["60% reduction in fraud cases", "₹100M saved annually"]
    },
    {
      title: "E-commerce Recommendation Engine",
      client: "Online Retail Platform",
      image: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?auto=format&fit=crop&q=80",
      description: "Built personalized product recommendation system",
      tags: ["E-commerce", "ML", "Personalization"],
      results: ["40% increase in sales", "25% higher engagement"]
    },
    {
      title: "Manufacturing Quality Control",
      client: "Automotive Manufacturer",
      image: "https://images.unsplash.com/photo-1581091226825-c6a89e7e4801?auto=format&fit=crop&q=80",
      description: "Implemented computer vision for quality control in manufacturing",
      tags: ["Manufacturing", "Computer Vision", "Quality"],
      results: ["90% defect detection rate", "50% reduction in manual inspection"]
    },
    {
      title: "Agricultural Yield Prediction",
      client: "Agricultural Cooperative",
      image: "https://images.unsplash.com/photo-1523348837708-15d4a09cfac2?auto=format&fit=crop&q=80",
      description: "Developed AI system for crop yield prediction and optimization",
      tags: ["Agriculture", "Prediction", "Data Science"],
      results: ["25% increase in crop yield", "40% water savings"]
    }
  ]

  return (
    <div>
      {/* Hero Section */}
      <section className="relative h-[400px] flex items-center justify-center overflow-hidden">
        <Image
          src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80"
          alt="Projects Overview"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-background/80" />
        <div className="relative z-10 text-center px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Our Projects</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Transforming businesses through innovative AI solutions
          </p>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <Card key={index} className="overflow-hidden">
                <CardContent className="p-0">
                  <div className="relative h-48">
                    <Image
                      src={project.image}
                      alt={project.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-semibold mb-2">{project.title}</h3>
                    <p className="text-sm text-muted-foreground mb-2">{project.client}</p>
                    <p className="text-muted-foreground mb-4">{project.description}</p>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.tags.map((tag, tagIndex) => (
                        <Badge key={tagIndex} variant="secondary">{tag}</Badge>
                      ))}
                    </div>
                    <div className="space-y-2 mb-4">
                      {project.results.map((result, resultIndex) => (
                        <div key={resultIndex} className="flex items-center">
                          <Brain className="h-4 w-4 text-primary mr-2" />
                          <span className="text-sm">{result}</span>
                        </div>
                      ))}
                    </div>
                    <Button variant="outline" className="w-full" asChild>
                      <Link href={`/projects/${index}`}>
                        View Details
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-muted py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold mb-2">100+</div>
              <div className="text-muted-foreground">Projects Completed</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">50+</div>
              <div className="text-muted-foreground">Enterprise Clients</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">10+</div>
              <div className="text-muted-foreground">Industries Served</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">95%</div>
              <div className="text-muted-foreground">Client Satisfaction</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-primary text-primary-foreground py-20 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Start Your Project?</h2>
          <p className="text-lg mb-8">
            Let's discuss how we can help transform your business with AI
          </p>
          <Button size="lg" variant="secondary" asChild>
            <Link href="/contact">Get Started</Link>
          </Button>
        </div>
      </section>
    </div>
  )
}