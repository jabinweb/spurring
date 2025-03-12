import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Users } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { Hero } from "@/components/sections/hero"
import { Services } from "@/components/sections/services"
import { CTA } from "@/components/sections/cta"
import { Technologies } from "@/components/sections/technologies"
import { About } from "@/components/sections/about"
import { WhyChooseUs } from "@/components/sections/why-choose-us"
import { Achivement } from "@/components/sections/achivements"

export default function Home() {


  return (
    <div>
      <Hero />
      <About />
      <Services />
      <WhyChooseUs />

      <Achivement />

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
      <Technologies />

    </div>
  )
}