import { adminMiddleware } from "./middleware"
import { Session } from "next-auth"
import { AdminSidebar } from "@/components/admin/sidebar"

export default async function AdminPage() {
  const session: Session = await adminMiddleware()

  if (!session?.user) {
    return null
  }

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
            {/* Example stat cards */}
            {["Total Users", "Active Projects", "Revenue"].map((title) => (
              <div key={title} className="p-6 bg-card rounded-lg border">
                <h3 className="font-medium text-muted-foreground">{title}</h3>
                <p className="text-2xl font-bold mt-2">0</p>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  )
}
