import { auth } from "@/auth"
import { redirect } from "next/navigation"
import { getFirstAdmin } from "@/lib/db"

export async function adminMiddleware() {
  const session = await auth()
  
  if (!session?.user) {
    // Check if any admin exists
    const hasAdmin = await getFirstAdmin()
    
    if (!hasAdmin) {
      redirect("/admin/setup")
    }
    redirect("/login")
  }
  
  // TODO: Add check for isAdmin once we implement roles
  return session
}
