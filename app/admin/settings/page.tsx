import { AdminSidebar } from "@/components/admin/sidebar"
import { EmailSettingsForm } from "@/components/settings/email-settings-form"

export default async function SettingsPage() {
  return (
    <div className="flex min-h-screen">
      <AdminSidebar />
      <main className="flex-1 p-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold mb-8">Settings</h1>
          <EmailSettingsForm />
        </div>
      </main>
    </div>
  )
}
