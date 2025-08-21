"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { motion } from "framer-motion"
import { ArrowRight, MapPin, Clock, Briefcase } from "lucide-react"
import Link from "next/link"
import { Job } from "@/types/job"

interface JobCardProps {
  job: Job
  index: number
}

export function JobCard({ job, index }: JobCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
    >
      <Card className="group hover:shadow-lg transition-all duration-300">
        <CardContent className="p-6">
          <div className="flex flex-col gap-4">
            <Badge className="w-fit">{job.type}</Badge>
            <h3 className="text-xl font-semibold group-hover:text-primary transition-colors">
              {job.title}
            </h3>
            <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4" />
                {job.location}
              </div>
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4" />
                {job.experience}
              </div>
              <div className="flex items-center gap-2">
                <Briefcase className="h-4 w-4" />
                {job.type}
              </div>
            </div>
            <p className="text-muted-foreground line-clamp-2">
              {job.description}
            </p>
            <Button className="w-full mt-4" asChild>
              <Link href={`/careers/${job.id}`}>
                <span>View Details</span>
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
