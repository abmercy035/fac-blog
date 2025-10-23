"use client"

import { useAuth } from "@/hooks/use-auth"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { SidebarTrigger } from "@/components/ui/sidebar"
import Link from "next/link"
import { Home } from "lucide-react"

export function AdminHeader() {
  const { user } = useAuth()

  if (!user) return null

  return (
    <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="flex h-16 items-center justify-between px-6">
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <SidebarTrigger className="md:hidden" />
            <Button variant="ghost" size="sm" asChild>
              <Link href="/">
                <Home className="h-4 w-4 mr-2" />
                View Site
              </Link>
            </Button>
          </div>
        </div>

        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-3">
            <div className="text-right">
              <p className="text-sm font-medium">{user.name}</p>
              <div className="flex items-center space-x-2">
                <Badge variant={user.role === "admin" ? "default" : "secondary"} className="text-xs">
                  {user.role}
                </Badge>
              </div>
            </div>
            <Avatar className="h-8 w-8">
              <AvatarImage src={user.avatar || "https://res.cloudinary.com/ddf2kzsyy/image/upload/c_crop,w_3800,h_3800,g_auto/v1761227574/_EN_0193_1_to2gtg.webp"} alt={user.name} />
              <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
            </Avatar>
          </div>
        </div>
      </div>
    </header>
  )
}
