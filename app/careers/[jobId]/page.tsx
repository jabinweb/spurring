import { jobs } from "@/data/jobs"
import { notFound } from "next/navigation"
import { JobDetails } from "@/components/jobs/job-details"

export async function generateStaticParams() {
  return jobs.map((job) => ({
    jobId: job.id,
  }))
}

export const dynamicParams = false
export const dynamic = 'force-static'

export default function JobPage({ params }: { params: { jobId: string } }) {
  const job = jobs.find((j) => j.id === params.jobId)

  if (!job) {
    notFound()
  }

  return <JobDetails job={job} />
}
