"use client"

import { CareerHeroSlider } from "@/components/careers/hero-slider"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { FadeIn } from "@/components/animations/fade-in"
import { Globe, Building, GraduationCap, 
  LineChart, Laptop, Clock, Coins, Filter, Search, MapPin, ArrowRight } from "lucide-react"
import Image from "next/image"
import { jobs } from "@/data/jobs"
import { Container } from "@/components/ui/container"
import { Rocket, Heart, Coffee, Gift } from "lucide-react"
import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import Link from "next/link"
import { Button } from "@/components/ui/button"

const perks = [
  {
    icon: <Building className="h-6 w-6" />,
    title: "Startup Culture",
    description: "Be part of a dynamic, fast-paced environment where your impact is immediate"
  },
  {
    icon: <Globe className="h-6 w-6" />,
    title: "Global Network",
    description: "Connect with teams across Australia and other international markets"
  },
  {
    icon: <GraduationCap className="h-6 w-6" />,
    title: "Learning & Growth",
    description: "Continuous learning opportunities and career development programs"
  },
  {
    icon: <LineChart className="h-6 w-6" />,
    title: "Rapid Growth",
    description: "Fast-track your career in a high-growth environment"
  }
]

const benefits = [
  {
    icon: <Laptop className="h-6 w-6" />,
    title: "Remote-First",
    description: "Flexible work arrangements"
  },
  {
    icon: <Clock className="h-6 w-6" />,
    title: "Flexible Hours",
    description: "Work-life balance focused"
  },
  {
    icon: <Coins className="h-6 w-6" />,
    title: "Competitive Pay",
    description: "Market-leading compensation"
  }
]

const workCulture = [
  {
    icon: <Rocket />,
    title: "Innovation First",
    description: "Freedom to experiment and innovate with cutting-edge AI technologies"
  },
  {
    icon: <Heart />,
    title: "Work-Life Balance",
    description: "Flexible schedules and remote work options for optimal balance"
  },
  {
    icon: <Coffee />,
    title: "Learning Culture",
    description: "Regular workshops, training sessions, and knowledge sharing"
  },
  {
    icon: <Gift />,
    title: "Great Benefits",
    description: "Competitive salary, health insurance, and stock options"
  }
]

export default function CareersPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedTypes, setSelectedTypes] = useState<string[]>([])
  const [selectedLocations, setSelectedLocations] = useState<string[]>([])
  const [selectedExperience, setSelectedExperience] = useState<string[]>([])

  // Get unique values for filters
  const jobTypes = Array.from(new Set(jobs.map(job => job.type)))
  const locations = Array.from(new Set(jobs.map(job => job.location)))
  const experienceLevels = Array.from(new Set(jobs.map(job => job.experience)))

  // Filter jobs based on search and filters
  const filteredJobs = jobs.filter(job => {
    const matchesSearch = job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         job.description.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesType = selectedTypes.length === 0 || selectedTypes.includes(job.type)
    const matchesLocation = selectedLocations.length === 0 || selectedLocations.includes(job.location)
    const matchesExperience = selectedExperience.length === 0 || selectedExperience.includes(job.experience)
    
    return matchesSearch && matchesType && matchesLocation && matchesExperience
  })

  return (
    <div>
      <CareerHeroSlider />

      {/* Vision Section */}
      <section className="relative py-20 px-4 overflow-hidden">
        <Container>
          <div className="absolute inset-0 bg-grid-pattern opacity-40" />
          <div className="absolute inset-0 bg-gradient-to-b from-background via-transparent to-background" />
        
          <div className="relative max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <FadeIn>
                <div className="space-y-6">
                  <Badge className="bg-primary/10 text-primary border-primary/20">
                    Our Vision
                  </Badge>
                  <h2 className="text-3xl font-bold">Build Your Future With Us</h2>
                  <p className="text-lg text-muted-foreground">
                    Choosing to work with us means joining a startup brimming with untapped potential, 
                    both for the company&apos;s growth and your personal career trajectory. We foster an 
                    environment where innovation thrives, and your contributions directly shape our success.
                  </p>
                  <p className="text-lg text-muted-foreground">
                    Our integration within a global network provides unique advantages. This connection 
                    grants us exposure to diverse markets, industry expertise, and collaborative 
                    opportunities that amplify our impact.
                  </p>
                </div>
              </FadeIn>
              <FadeIn delay={0.2}>
                <div className="relative">
                  <Image
                    src="https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&q=80"
                    alt="Team Collaboration"
                    width={600}
                    height={400}
                    className="rounded-2xl shadow-2xl"
                  />
                  <div className="absolute text-white -bottom-6 -right-6 bg-primary/10 backdrop-blur-sm border border-primary/20 p-6 rounded-2xl">
                    <div className="text-4xl font-bold mb-2">50+</div>
                    <div className="text-sm">Team Members Globally</div>
                  </div>
                </div>
              </FadeIn>
            </div>
          </div>
        </Container>
      </section>

      {/* Perks Grid */}
      <section className="py-20 px-4 bg-muted/50">
        <Container>
          <div className="text-center mb-12">
            <Badge className="mb-4">Why Join Us</Badge>
            <h2 className="text-3xl font-bold mb-4">Growth & Opportunities</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Join a team that values innovation, growth, and collaboration
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {perks.map((perk, index) => (
              <FadeIn key={index} delay={index * 0.1}>
                <Card className="relative group hover:shadow-lg transition-all duration-300">
                  <CardContent className="p-6">
                    <div className="mb-4 p-3 bg-primary/10 rounded-lg w-fit group-hover:bg-primary/20 transition-colors">
                      {perk.icon}
                    </div>
                    <h3 className="text-xl font-semibold mb-2">{perk.title}</h3>
                    <p className="text-muted-foreground">{perk.description}</p>
                  </CardContent>
                </Card>
              </FadeIn>
            ))}
          </div>
        </Container>
      </section>

      {/* Work Culture Section */}
      <section className="py-20">
        <Container>
          <div className="text-center mb-12">
            <Badge className="mb-4">Work Culture</Badge>
            <h2 className="text-3xl font-bold mb-4">Life at Spurring Ventures</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              We believe in creating an environment where innovation thrives and people grow
            </p>
          </div>
          <div className="grid md:grid-cols-4 gap-8">
            {workCulture.map((item, i) => (
              <Card key={i} className="text-center hover:shadow-lg transition-shadow">
                <CardContent className="pt-6">
                  <div className="mb-4 inline-flex p-3 bg-primary/10 rounded-xl">
                    {item.icon}
                  </div>
                  <h3 className="font-semibold mb-2">{item.title}</h3>
                  <p className="text-sm text-muted-foreground">{item.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </Container>
      </section>

      {/* Benefits Section */}
      <section className="py-20 px-4 bg-muted/50">
        <Container>
          <div className="text-center mb-12">
            <Badge className="mb-4">Benefits</Badge>
            <h2 className="text-3xl font-bold">What We Offer</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {benefits.map((benefit, index) => (
              <FadeIn key={index} delay={index * 0.1}>
                <Card className="relative overflow-hidden group">
                  <CardContent className="p-6">
                    <div className="flex items-center gap-4 mb-4">
                      <div className="p-3 bg-primary/10 rounded-lg group-hover:bg-primary/20 transition-colors">
                        {benefit.icon}
                      </div>
                      <h3 className="text-xl font-semibold">{benefit.title}</h3>
                    </div>
                    <p className="text-muted-foreground">{benefit.description}</p>
                  </CardContent>
                  <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                </Card>
              </FadeIn>
            ))}
          </div>
        </Container>
      </section>

      {/* Open Positions with Categories */}
      <section id="positions" className="py-20 bg-muted/50">
        <Container>
          <div className="text-center mb-12">
            <Badge className="mb-4">Open Positions</Badge>
            <h2 className="text-3xl font-bold mb-4">Current Opportunities</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Join our mission to revolutionize businesses through AI
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Filters Sidebar */}
            <div className="space-y-6">
              <Card>
                <CardContent className="p-4">
                  <div className="relative">
                    <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Search positions..."
                      className="pl-8"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-4">
                  <h3 className="font-semibold mb-4 flex items-center gap-2">
                    <Filter className="h-4 w-4" /> Filters
                  </h3>
                  
                  <div className="space-y-6">
                    {/* Job Type Filter */}
                    <div>
                      <h4 className="text-sm font-medium mb-3">Job Type</h4>
                      <div className="space-y-2">
                        {jobTypes.map((type) => (
                          <div key={type} className="flex items-center">
                            <Checkbox
                              id={`type-${type}`}
                              checked={selectedTypes.includes(type)}
                              onCheckedChange={(checked) => {
                                setSelectedTypes(
                                  checked
                                    ? [...selectedTypes, type]
                                    : selectedTypes.filter(t => t !== type)
                                )
                              }}
                            />
                            <label htmlFor={`type-${type}`} className="ml-2 text-sm">
                              {type}
                            </label>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Location Filter */}
                    <div>
                      <h4 className="text-sm font-medium mb-3">Location</h4>
                      <div className="space-y-2">
                        {locations.map((location) => (
                          <div key={location} className="flex items-center">
                            <Checkbox
                              id={`location-${location}`}
                              checked={selectedLocations.includes(location)}
                              onCheckedChange={(checked) => {
                                setSelectedLocations(
                                  checked
                                    ? [...selectedLocations, location]
                                    : selectedLocations.filter(l => l !== location)
                                )
                              }}
                            />
                            <label htmlFor={`location-${location}`} className="ml-2 text-sm">
                              {location}
                            </label>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Experience Level Filter */}
                    <div>
                      <h4 className="text-sm font-medium mb-3">Experience Level</h4>
                      <div className="space-y-2">
                        {experienceLevels.map((level) => (
                          <div key={level} className="flex items-center">
                            <Checkbox
                              id={`exp-${level}`}
                              checked={selectedExperience.includes(level)}
                              onCheckedChange={(checked) => {
                                setSelectedExperience(
                                  checked
                                    ? [...selectedExperience, level]
                                    : selectedExperience.filter(e => e !== level)
                                )
                              }}
                            />
                            <label htmlFor={`exp-${level}`} className="ml-2 text-sm">
                              {level}
                            </label>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Jobs List */}
            <div className="lg:col-span-3 space-y-4">
              {filteredJobs.length === 0 ? (
                <Card>
                  <CardContent className="p-8 text-center text-muted-foreground">
                    No positions match your criteria
                  </CardContent>
                </Card>
              ) : (
                filteredJobs.map((job, index) => (
                  <Card 
                    key={job.id}
                    className="hover:shadow-md transition-shadow"
                  >
                    <CardContent className="p-6">
                      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                        <div className="space-y-1">
                          <Badge variant="outline" className="mb-2">
                            {job.type}
                          </Badge>
                          <h3 className="text-xl font-semibold">
                            {job.title}
                          </h3>
                          <div className="flex gap-4 text-sm text-muted-foreground">
                            <span className="flex items-center gap-2">
                              <MapPin className="h-4 w-4" />
                              {job.location}
                            </span>
                            <span className="flex items-center gap-2">
                              <Clock className="h-4 w-4" />
                              {job.experience}
                            </span>
                          </div>
                        </div>
                        <div className="flex flex-col md:items-end gap-4">
                          <Button asChild>
                            <Link href={`/careers/${job.id}`}>
                              View Details
                              <ArrowRight className="ml-2 h-4 w-4" />
                            </Link>
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))
              )}
            </div>
          </div>
        </Container>
      </section>
    </div>
  )
}
