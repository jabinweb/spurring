import { AdminSidebar } from "@/components/admin/sidebar"
import { ProfileForm } from "@/components/forms/profile-form"
import { PasswordForm } from "@/components/forms/password-form"
import { adminMiddleware } from "../middleware"
import { Session } from "next-auth"

export default async function ProfilePage() {
  const session = await adminMiddleware() as Session & {
    user: {
      id: string
      email: string
      name?: string | null
      isAdmin: boolean
    }
  }
  if (!session?.user) return null

  return (
    <div className="flex min-h-screen bg-background">
      <AdminSidebar />
      <main className="flex-1 p-8">
        <div className="max-w-2xl mx-auto">
          <h1 className="text-3xl font-bold mb-8">Profile Settings</h1>
          
          <div className="space-y-12">
            <ProfileForm user={session.user} />
            <PasswordForm user={session.user} />
          </div>
        </div>
      </main>
    </div>
  )
}
