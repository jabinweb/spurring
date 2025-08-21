import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { LayoutDashboard, Users, Mail, Settings, LogOut, UserCircle } from "lucide-react"
import Link from "next/link"
import { logoutAction } from "@/app/auth/actions"

interface AdminSidebarProps {
  className?: string
}

const navItems = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/users", label: "Users", icon: Users },
  { href: "/admin/responses", label: "Responses", icon: Mail },
  { href: "/admin/profile", label: "Profile", icon: UserCircle },
  { href: "/admin/settings", label: "Settings", icon: Settings },
]

export function AdminSidebar({ className }: AdminSidebarProps) {
  return (
    <div className={cn("min-h-screen w-64 border-r bg-muted/10", className)}>
      <div className="p-6">
        <h2 className="text-lg font-semibold mb-6">Admin Panel</h2>
        <nav className="space-y-2">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="flex items-center gap-2 px-3 py-2 text-sm rounded-md hover:bg-accent transition-colors">
              <item.icon className="w-4 h-4" />
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
      <div className="absolute bottom-0 w-64 p-6 border-t">
        <form action={logoutAction}>
          <Button variant="ghost" className="w-full justify-start" type="submit">
            <LogOut className="w-4 h-4 mr-2" />
            Logout
          </Button>
        </form>
      </div>
    </div>
  );
}
