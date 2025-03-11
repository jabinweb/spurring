import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Brain, Code, LineChart, MessageSquare, Users, CheckCircle, Rocket, Award } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { FadeIn } from "@/components/animations/fade-in"
import { Hero } from "@/components/sections/hero"
import { Services } from "@/components/sections/services"
import { CTA } from "@/components/sections/cta"

export default function Home() {
  return (
    <div>
      <Hero />
      <Services />
      {/* Why Choose Us Section */}
      <section className="bg-muted py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Why Choose Us</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="flex flex-col items-center text-center">
              <CheckCircle className="h-12 w-12 text-primary mb-4" />
              <h3 className="text-xl font-semibold mb-2">Proven Expertise</h3>
              <p className="text-muted-foreground">
                Over a decade of experience in delivering cutting-edge AI solutions
              </p>
            </div>
            <div className="flex flex-col items-center text-center">
              <Rocket className="h-12 w-12 text-primary mb-4" />
              <h3 className="text-xl font-semibold mb-2">Rapid Implementation</h3>
              <p className="text-muted-foreground">
                Swift deployment of AI solutions with minimal disruption
              </p>
            </div>
            <div className="flex flex-col items-center text-center">
              <Award className="h-12 w-12 text-primary mb-4" />
              <h3 className="text-xl font-semibold mb-2">Industry Recognition</h3>
              <p className="text-muted-foreground">
                Award-winning solutions and industry-leading practices
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold mb-2">50+</div>
              <div className="text-muted-foreground">Successful Projects</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">95%</div>
              <div className="text-muted-foreground">Client Satisfaction</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">24/7</div>
              <div className="text-muted-foreground">Support Available</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">10+</div>
              <div className="text-muted-foreground">Years Experience</div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Projects Section */}
      <section className="bg-muted py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Featured Projects</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card>
              <CardContent className="p-0">
                <div className="relative h-48">
                  <Image
                    src="https://images.unsplash.com/photo-1555949963-aa79dcee981c?auto=format&fit=crop&q=80"
                    alt="AI Project 1"
                    fill
                    className="object-cover rounded-t-lg"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2">Smart City AI</h3>
                  <p className="text-muted-foreground mb-4">
                    Implementing AI-driven solutions for urban infrastructure management
                  </p>
                  <Button variant="outline" asChild>
                    <Link href="/projects">Learn More</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-0">
                <div className="relative h-48">
                  <Image
                    src="https://images.unsplash.com/photo-1531746790731-6c087fecd65a?auto=format&fit=crop&q=80"
                    alt="AI Project 2"
                    fill
                    className="object-cover rounded-t-lg"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2">Healthcare AI</h3>
                  <p className="text-muted-foreground mb-4">
                    AI-powered diagnostic tools for healthcare providers
                  </p>
                  <Button variant="outline" asChild>
                    <Link href="/projects">Learn More</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-0">
                <div className="relative h-48">
                  <Image
                    src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80"
                    alt="AI Project 3"
                    fill
                    className="object-cover rounded-t-lg"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2">FinTech AI</h3>
                  <p className="text-muted-foreground mb-4">
                    Intelligent financial analysis and prediction systems
                  </p>
                  <Button variant="outline" asChild>
                    <Link href="/projects">Learn More</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">What Our Clients Say</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <Card key={i}>
                <CardContent className="pt-6">
                  <div className="flex items-center mb-4">
                    <Users className="h-8 w-8 text-primary mr-2" />
                    <div>
                      <div className="font-semibold">Client Name</div>
                      <div className="text-sm text-muted-foreground">Company {i}</div>
                    </div>
                  </div>
                  <p className="text-muted-foreground">
                    "Spurring Ventures has been instrumental in our AI transformation journey.
                    Their expertise and dedication to our success made all the difference."
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Technologies Section */}
      <section className="bg-muted py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-4">Technologies We Use</h2>
          <p className="text-muted-foreground text-center mb-12 max-w-2xl mx-auto">
            We leverage cutting-edge technologies and frameworks to deliver powerful AI solutions
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-8">
            {[
              {
                name: "TensorFlow",
                image: "https://cdn.worldvectorlogo.com/logos/tensorflow-2.svg"
              },
              {
                name: "PyTorch",
                image: "https://pytorch.org/assets/images/pytorch-logo.png"
              },
              {
                name: "OpenAI",
                image: "https://upload.wikimedia.org/wikipedia/commons/4/4d/OpenAI_Logo.svg"
              },
              {
                name: "Microsoft Azure",
                image: "https://upload.wikimedia.org/wikipedia/commons/f/fa/Microsoft_Azure.svg"
              },
              {
                name: "AWS",
                image: "https://upload.wikimedia.org/wikipedia/commons/9/93/Amazon_Web_Services_Logo.svg"
              },
              {
                name: "Google Cloud",
                image: "https://www.vectorlogo.zone/logos/google_cloud/google_cloud-icon.svg"
              }
            ].map((tech, index) => (
              <Card key={index} className="bg-background">
                <CardContent className="p-6 flex items-center justify-center">
                  <div className="relative h-12 w-full">
                    <Image
                      src={tech.image}
                      alt={tech.name}
                      fill
                      className="object-contain"
                    />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section with gradient variant */}
      <CTA 
        variant="gradient"
        title="Ready to Transform Your Business?"
        description="Let's discuss how our AI solutions can drive your success"
        primaryButtonText="Get Started"
        secondaryButtonText="Learn More"
        secondaryButtonHref="/about"
      />
    </div>
  )
}