import { AdminSidebar } from "@/components/admin/sidebar"
import { Card, CardHeader, CardContent } from "@/components/ui/card"
import { formatDate, formatMessage } from "@/lib/utils"
import prisma from "@/lib/db"
import { notFound } from "next/navigation"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"
import { ResponseActions } from "@/components/responses/response-actions"
import styles from '@/styles/print.module.css'
import { FormResponse } from "@/types/form"

export default async function ResponsePage(props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  const response = await prisma.formResponse.findUnique({
    where: { id: params.id }
  }) as FormResponse | null

  if (!response) return notFound()

  // Type assertion for data
  const data = response.data as { email: string; firstName?: string; name?: string }

  const mailtoLink = `mailto:${data.email}?subject=RE: ${
    response.formType === 'contact' ? 'Contact Form' : 'Get Started Form'
  } Submission&body=Dear ${data.firstName || data.name || 'User'},`

  const renderField = (key: string, value: any) => {
    if (key === 'createdAt' || key === 'id') return null
    if (typeof value === 'object') return null

    return (
      (<div key={key} className="py-3">
        <dt className="text-sm font-medium text-muted-foreground capitalize">
          {key.replace(/([A-Z])/g, ' $1').trim()}
        </dt>
        <dd className="mt-1 text-sm">
          {key === 'message' ? (
            <div dangerouslySetInnerHTML={{ __html: formatMessage(value) }} />
          ) : (
            value
          )}
        </dd>
      </div>)
    );
  }

  return (
    <div className="flex min-h-screen">
      <AdminSidebar className={styles.hiddenOnPrint} />
      <main className="flex-1 p-8">
        <div className="max-w-3xl mx-auto">
          <div className={`flex justify-between items-center mb-6 ${styles.hiddenOnPrint}`}>
            <Link 
              href="/admin/responses" 
              className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Responses
            </Link>

            <ResponseActions response={response as FormResponse} />
          </div>

          <Card className={styles.printContent}>
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <h1 className="text-2xl font-bold">
                    {response.formType === 'contact' ? 'Contact' : 'Get Started'} Form Response
                  </h1>
                  <p className="text-sm text-muted-foreground mt-1">
                    Submitted {formatDate(response.createdAt)}
                  </p>
                </div>
                <span className="inline-flex items-center rounded-md bg-primary/10 px-2 py-1 text-xs font-medium capitalize">
                  {response.formType}
                </span>
              </div>
            </CardHeader>
            <CardContent>
              <dl className="divide-y">
                {Object.entries(response.data).map(([key, value]) => 
                  renderField(key, value)
                )}
              </dl>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}
