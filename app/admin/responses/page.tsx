"use client"

import { AdminSidebar } from "@/components/admin/sidebar"
import { Card } from "@/components/ui/card"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { useState, useEffect } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { EyeIcon } from "lucide-react"
import Link from "next/link"

interface FormData {
  firstName?: string
  lastName?: string
  name?: string
  email: string
  message?: string
  [key: string]: any // For other dynamic form fields
}

interface FormResponse {
  id: string
  formType: 'contact' | 'getStarted'
  data: FormData
  createdAt: string
}

interface ResponsesTableProps {
  responses: FormResponse[]
  loading: boolean
  filter: 'all' | 'contact' | 'getStarted'
}

const formatDate = (date: string) => {
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })
}

export default function ResponsesPage() {
  const [responses, setResponses] = useState<FormResponse[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchResponses()
  }, [])

  const fetchResponses = async () => {
    try {
      const res = await fetch("/api/forms")
      const data = await res.json()
      setResponses(data)
    } catch (error) {
      console.error("Error fetching responses:", error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex min-h-screen">
      <AdminSidebar />
      <main className="flex-1 p-8">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-2xl font-bold mb-6">Form Responses</h1>
          
          <Tabs defaultValue="all">
            <TabsList>
              <TabsTrigger value="all">All Responses</TabsTrigger>
              <TabsTrigger value="contact">Contact Form</TabsTrigger>
              <TabsTrigger value="getStarted">Get Started Form</TabsTrigger>
            </TabsList>

            <TabsContent value="all" className="mt-6">
              <ResponsesTable 
                responses={responses} 
                loading={loading} 
                filter="all" 
              />
            </TabsContent>
            
            <TabsContent value="contact" className="mt-6">
              <ResponsesTable 
                responses={responses.filter(r => r.formType === 'contact')} 
                loading={loading}
                filter="contact"
              />
            </TabsContent>

            <TabsContent value="getStarted" className="mt-6">
              <ResponsesTable 
                responses={responses.filter(r => r.formType === 'getStarted')} 
                loading={loading}
                filter="getStarted"
              />
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  )
}

function ResponsesTable({ responses, loading, filter }: ResponsesTableProps) {
  if (loading) return <div>Loading...</div>
  if (!responses.length) return <div>No responses found.</div>

  const truncateMessage = (message?: string) => {
    if (!message) return ''
    return message.length > 100 ? `${message.slice(0, 100)}...` : message
  }

  return (
    <Card>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Date</TableHead>
            <TableHead>Form Type</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Message</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {responses.map((response) => (
            <TableRow key={response.id}>
              <TableCell>{formatDate(response.createdAt)}</TableCell>
              <TableCell className="capitalize">{response.formType}</TableCell>
              <TableCell>
                {response.data.firstName 
                  ? `${response.data.firstName} ${response.data.lastName}`
                  : response.data.name}
              </TableCell>
              <TableCell>{response.data.email}</TableCell>
              <TableCell className="max-w-xs">
                <p className="truncate text-sm text-muted-foreground">
                  {truncateMessage(response.data.message)}
                </p>
              </TableCell>
              <TableCell>
                <Button variant="ghost" size="sm" asChild>
                  <Link href={`/admin/responses/${response.id}`}>
                    <EyeIcon className="h-4 w-4 mr-2" />
                    View
                  </Link>
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Card>
  )
}
