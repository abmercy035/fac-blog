"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { useAuth } from "@/hooks/use-auth"
import { permissions } from "@/lib/auth"
import { LayoutDashboard, FileText, MessageSquare, Users, LogOut, PenTool, Shield, Mail } from "lucide-react"

const adminNavItems = [
  {
    title: "Dashboard",
    href: "/admin",
    icon: LayoutDashboard,
    permission: () => true,
  },
  {
    title: "Posts",
    href: "/admin/posts",
    icon: FileText,
    permission: permissions.canManagePosts,
  },
  {
    title: "Comments",
    href: "/admin/comments",
    icon: MessageSquare,
    permission: permissions.canManageComments,
  },
  {
    title: "Subscribers",
    href: "/admin/subscribers",
    icon: Mail,
    permission: permissions.canManageUsers,
  },
  {
    title: "Users",
    href: "/admin/users",
    icon: Users,
    permission: permissions.canManageUsers,
  },
  {
    title: "Permissions",
    href: "/admin/users/permissions",
    icon: Shield,
    permission: permissions.canManageUsers,
  },
  {
    title: "Editor",
    href: "/editor",
    icon: PenTool,
    permission: permissions.canCreatePosts,
  },
]

export function AdminSidebar() {
  const pathname = usePathname()
  const { user, logout } = useAuth()

  if (!user) return null

  const allowedNavItems = adminNavItems.filter((item) => item.permission(user))

  return (
    <div className="flex flex-col h-full bg-card border-r">
      <div className="p-6">
        <h2 className="text-lg font-semibold">Admin Panel</h2>
        <p className="text-sm text-muted-foreground">Welcome, {user.name}</p>
      </div>

      <nav className="flex-1 px-4 space-y-2">
        {allowedNavItems.map((item) => {
          const Icon = item.icon
          const isActive = pathname === item.href

          return (
            <Link key={item.href} href={item.href}>
              <Button
                variant={isActive ? "secondary" : "ghost"}
                className={cn("w-full justify-start", isActive && "bg-secondary")}
              >
                <Icon className="h-4 w-4 mr-3" />
                {item.title}
              </Button>
            </Link>
          )
        })}
      </nav>

      <div className="p-4 border-t">
        <Button
          variant="ghost"
          className="w-full justify-start text-destructive hover:text-destructive"
          onClick={logout}
        >
          <LogOut className="h-4 w-4 mr-3" />
          Logout
        </Button>
      </div>
    </div>
  )
}
