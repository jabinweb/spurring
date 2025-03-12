import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Brain, Users, Target, History } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

export default function AboutPage() {
  return (
    <div>
      {/* Hero Section */}
      <section className="relative h-[400px] flex items-center justify-center overflow-hidden">
        <Image
          src="https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&q=80"
          alt="Team Collaboration"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-background/80" />
        <div className="relative z-10 text-center px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">About Spurring Ventures</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Leading the AI revolution in India with innovative solutions and expert consulting
          </p>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div>
              <div className="flex items-center mb-6">
                <Target className="h-8 w-8 text-primary mr-3" />
                <h2 className="text-3xl font-bold">Our Mission</h2>
              </div>
              <p className="text-lg text-muted-foreground">
                To empower businesses across India with cutting-edge AI solutions that drive
                innovation, efficiency, and sustainable growth. We're committed to making
                advanced technology accessible and practical for organizations of all sizes.
              </p>
            </div>
            <div>
              <div className="flex items-center mb-6">
                <Brain className="h-8 w-8 text-primary mr-3" />
                <h2 className="text-3xl font-bold">Our Vision</h2>
              </div>
              <p className="text-lg text-muted-foreground">
                To be India's leading AI solutions provider, recognized globally for our
                innovative approaches, technical excellence, and the transformative impact
                we create for our clients and society at large.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* History Timeline */}
      <section className="bg-muted py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-center mb-12">
            <History className="h-8 w-8 text-primary mr-3" />
            <h2 className="text-3xl font-bold">Our Journey</h2>
          </div>
          <div className="space-y-12">
            <div className="flex flex-col md:flex-row gap-8">
              <div className="md:w-1/4 text-right">
                <h3 className="text-xl font-bold">2015</h3>
              </div>
              <div className="md:w-3/4">
                <h4 className="text-lg font-semibold mb-2">Company Founded</h4>
                <p className="text-muted-foreground">
                  Spurring Ventures was established with a vision to revolutionize
                  AI adoption in India.
                </p>
              </div>
            </div>
            <div className="flex flex-col md:flex-row gap-8">
              <div className="md:w-1/4 text-right">
                <h3 className="text-xl font-bold">2018</h3>
              </div>
              <div className="md:w-3/4">
                <h4 className="text-lg font-semibold mb-2">Major Expansion</h4>
                <p className="text-muted-foreground">
                  Expanded operations to multiple cities and launched our AI research division.
                </p>
              </div>
            </div>
            <div className="flex flex-col md:flex-row gap-8">
              <div className="md:w-1/4 text-right">
                <h3 className="text-xl font-bold">2021</h3>
              </div>
              <div className="md:w-3/4">
                <h4 className="text-lg font-semibold mb-2">Innovation Hub</h4>
                <p className="text-muted-foreground">
                  Established our Innovation Hub in Bangalore, focusing on cutting-edge AI research.
                </p>
              </div>
            </div>
            <div className="flex flex-col md:flex-row gap-8">
              <div className="md:w-1/4 text-right">
                <h3 className="text-xl font-bold">2023</h3>
              </div>
              <div className="md:w-3/4">
                <h4 className="text-lg font-semibold mb-2">Global Recognition</h4>
                <p className="text-muted-foreground">
                  Received multiple international awards for our AI solutions and impact.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-center mb-12">
            <Users className="h-8 w-8 text-primary mr-3" />
            <h2 className="text-3xl font-bold">Our Leadership Team</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card>
              <CardContent className="p-0">
                <div className="relative h-64">
                  <Image
                    src="https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80"
                    alt="CEO"
                    fill
                    className="object-cover rounded-t-lg"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold">Rajesh Kumar</h3>
                  <p className="text-muted-foreground">CEO & Founder</p>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-0">
                <div className="relative h-64">
                  <Image
                    src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80"
                    alt="CTO"
                    fill
                    className="object-cover rounded-t-lg"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold">Priya Sharma</h3>
                  <p className="text-muted-foreground">Chief Technology Officer</p>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-0">
                <div className="relative h-64">
                  <Image
                    src="https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80"
                    alt="COO"
                    fill
                    className="object-cover rounded-t-lg"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold">Amit Patel</h3>
                  <p className="text-muted-foreground">Chief Operations Officer</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

    </div>
  )
}