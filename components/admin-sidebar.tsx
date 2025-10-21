"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { useAuth } from "@/hooks/use-auth"
import { permissions } from "@/lib/auth"
import { LayoutDashboard, FileText, MessageSquare, Users, LogOut, PenTool, Shield, Mail } from "lucide-react"
import { useSidebar } from "@/components/ui/sidebar"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription } from "@/components/ui/sheet"

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

  // Try to read sidebar context; provider may be absent in some pages
  let sidebarCtx = null
  try {
    sidebarCtx = useSidebar()
  } catch (e) {
    sidebarCtx = null
  }

  const isMobile = sidebarCtx?.isMobile ?? false
  const open = sidebarCtx?.open ?? true
  const openMobile = sidebarCtx?.openMobile ?? false
  const setOpenMobile = sidebarCtx?.setOpenMobile

  const content = (
    <div className="flex flex-col h-full bg-card  border">
      <div className="p-6">
        <h2 className="text-lg font-semibold text-secondary-foreground">Admin Panel</h2>
        <p className="text-sm text-muted-foreground">Welcome, {user.name}</p>
      </div>

      <nav className="flex-1 px-4 space-y-2">
        {allowedNavItems.map((item) => {
          const Icon = item.icon
          const isActive = pathname === item.href

          const btnClass = cn(
            'w-full justify-start text-secondary-foreground',
            isActive && 'bg-secondary text-secondary-foreground'
          )

          return (
            <Link key={item.href} href={item.href}>
              <Button
                variant={isActive ? 'secondary' : 'ghost'}
                className={btnClass}
              >
                <Icon className="h-4 w-4 mr-3 text-secondary-foreground" />
                <span className={cn('flex-1', !open && 'hidden')}>{item.title}</span>
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
          <span className={cn(!open && 'hidden')}>Logout</span>
        </Button>
      </div>
    </div>
  )

  if (isMobile) {
    return (
      <Sheet open={openMobile} onOpenChange={setOpenMobile}>
        <SheetContent side="left" className="w-72">
          <SheetHeader>
            <SheetTitle>Admin</SheetTitle>
            <SheetDescription className="text-gray-300">Admin navigation</SheetDescription>
          </SheetHeader>
          {content}
        </SheetContent>
      </Sheet>
    )
  }

  return <div className={cn(open ? 'w-full h-full' : 'w-full')}>{content}</div>
}
