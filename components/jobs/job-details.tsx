"use client"

import { Container } from "@/components/ui/container"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { 
  MapPin, Clock, Briefcase, ArrowRight, Share2, 
  Building, CheckCircle, Download, Send 
} from "lucide-react"
import { motion } from "framer-motion"
import Link from "next/link"
import type { Job } from "@/types/job"

interface JobDetailsProps {
  job: Job
}

export function JobDetails({ job }: JobDetailsProps) {
  const formatDeadline = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div>
      {/* Hero Section */}
      <section className="bg-muted/50 border-b">
        <Container className="pt-24 pb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className=""
          >
            <Badge variant="outline" className="mb-6 text-sm">
              {job.experience} • {job.type}
            </Badge>
            
            <h1 className="text-4xl font-bold mb-6 bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
              {job.title}
            </h1>
            
            <div className="flex flex-wrap items-center gap-6 text-muted-foreground">
              <div className="flex items-center gap-2">
                <MapPin className="h-5 w-5 text-primary" />
                {job.location}
              </div>
              <div className="flex items-center gap-2">
                <Building className="h-5 w-5 text-primary" />
                Spurring Ventures India
              </div>
              <div className="flex items-center gap-2">
                <Clock className="h-5 w-5 text-primary" />
                Apply by {formatDeadline(job.applicationDeadline)}
              </div>
            </div>
          </motion.div>
        </Container>
      </section>

      {/* Main Content */}
      <Container className="py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {/* Job Details */}
          <div className="lg:col-span-2">
            <Card className="mb-8">
              <CardContent className="p-6">
                <h2 className="text-xl font-semibold mb-4">Overview</h2>
                <p className="text-muted-foreground leading-relaxed">
                  {job.description}
                </p>
              </CardContent>
            </Card>

            {/* Responsibilities */}
            {job.responsibilities.map((section, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 * index }}
              >
                <Card className="mb-8">
                  <CardContent className="p-6">
                    <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
                      <CheckCircle className="h-5 w-5 text-primary" />
                      {section.title}
                    </h2>
                    <div className="grid gap-4">
                      {section.items.map((item, i) => (
                        <div key={i} className="flex items-start gap-3 p-4 rounded-lg bg-muted/50">
                          <div className="h-2 w-2 rounded-full bg-primary mt-2 flex-shrink-0" />
                          <p className="text-muted-foreground">{item}</p>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}

            {/* Requirements & Skills */}
            <div className="grid md:grid-cols-2 gap-8">
              {/* Requirements */}
              <Card>
                <CardContent className="p-6">
                  <h2 className="text-xl font-semibold mb-4">Requirements</h2>
                  <ul className="space-y-3">
                    {job.requirements[0].items.map((item, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <CheckCircle className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                        <span className="text-muted-foreground">{item}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>

              {/* Supplementary Skills */}
              <Card>
                <CardContent className="p-6">
                  <h2 className="text-xl font-semibold mb-4">Nice to Have</h2>
                  <ul className="space-y-3">
                    {job.supplementarySkills.map((skill, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <div className="h-2 w-2 rounded-full bg-primary mt-2" />
                        <span className="text-muted-foreground">{skill}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
              className="sticky top-24 space-y-6"
            >
              <Card>
                <CardContent className="p-6 space-y-6">
                  <div>
                    <h3 className="font-semibold mb-4">Quick Apply</h3>
                    <Button size="lg" className="w-full" asChild>
                      <Link href="/contact">
                        <Send className="mr-2 h-4 w-4" />
                        Apply Now
                      </Link>
                    </Button>
                  </div>

                  <div className="pt-6 border-t">
                    <h3 className="font-semibold mb-4">Job Overview</h3>
                    <dl className="space-y-4">
                      <div className="flex justify-between">
                        <dt className="text-muted-foreground">Position</dt>
                        <dd className="font-medium">{job.type}</dd>
                      </div>
                      <div className="flex justify-between">
                        <dt className="text-muted-foreground">Location</dt>
                        <dd className="font-medium">{job.location}</dd>
                      </div>
                      <div className="flex justify-between">
                        <dt className="text-muted-foreground">Experience</dt>
                        <dd className="font-medium">{job.experience}</dd>
                      </div>
                    </dl>
                  </div>

                  <div className="flex gap-4">
                    <Button variant="outline" className="flex-1" asChild>
                      <a href="/job-description.pdf" download>
                        <Download className="mr-2 h-4 w-4" />
                        Download JD
                      </a>
                    </Button>
                    <Button variant="outline" className="flex-1">
                      <Share2 className="mr-2 h-4 w-4" />
                      Share
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </Container>
    </div>
  )
}
