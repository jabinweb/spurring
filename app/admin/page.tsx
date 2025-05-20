import { adminMiddleware } from "./middleware"
import { Session } from "next-auth"
import { AdminSidebar } from "@/components/admin/sidebar"
import prisma from "@/lib/db"
import { Users, MessageSquare, BarChart } from "lucide-react"
import { FormResponse, DashboardStats } from "@/types/form"

export async function getDashboardStats() {
  const [userCount, formResponses] = await Promise.all([
    prisma.user.count(),
    prisma.formResponse.findMany({
      orderBy: { createdAt: 'desc' }
    })
  ]) as [number, FormResponse[]]

  const contactFormCount = formResponses.filter((r: FormResponse) => r.formType === 'contact').length
  const getStartedCount = formResponses.filter((r: FormResponse) => r.formType === 'getStarted').length

  return {
    totalUsers: userCount,
    totalResponses: formResponses.length,
    contactResponses: contactFormCount,
    getStartedResponses: getStartedCount,
    recentResponses: formResponses.slice(0, 5)
  }
}


export default async function AdminPage() {
  const [session, stats]: [Session, DashboardStats] = await Promise.all([
    adminMiddleware(),
    getDashboardStats()
  ])

  if (!session?.user) return null

  const statCards = [
    { title: "Total Users", value: stats.totalUsers, icon: Users },
    { title: "Contact Form", value: stats.contactResponses, icon: MessageSquare },
    { title: "Get Started", value: stats.getStartedResponses, icon: BarChart },
  ]

  return (
    <div className="flex min-h-screen bg-background">
      <AdminSidebar />
      <main className="flex-1">
        <div className="max-w-5xl mx-auto p-8">
          <header className="mb-8 pb-4 border-b">
            <h1 className="text-3xl font-bold">Dashboard</h1>
            <p className="text-muted-foreground mt-2">
              Welcome back, {session.user.email}
            </p>
          </header>

          <div className="grid md:grid-cols-3 gap-6">
            {statCards.map(({ title, value, icon: Icon }) => (
              <div key={title} className="p-6 bg-card rounded-lg border">
                <div className="flex items-center gap-2">
                  <Icon className="h-5 w-5 text-primary" />
                  <h3 className="font-medium text-muted-foreground">{title}</h3>
                </div>
                <p className="text-2xl font-bold mt-2">{value}</p>
              </div>
            ))}
          </div>

          {stats.recentResponses.length > 0 && (
            <div className="mt-8">
              <h2 className="text-xl font-semibold mb-4">Recent Responses</h2>
              <div className="space-y-4">
                {stats.recentResponses.map((response: FormResponse) => (
                  <div key={response.id} className="p-4 bg-card rounded-lg border">
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="font-medium">{response.data.email}</p>
                        <p className="text-sm text-muted-foreground">
                          {response.formType === 'contact' ? 'Contact Form' : 'Get Started Form'}
                        </p>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {new Date(response.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  )
}
