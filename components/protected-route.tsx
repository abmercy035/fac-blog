"use client"

import type React from "react"

import { useAuth } from "@/hooks/use-auth"
import { useRouter } from "next/navigation"
import { useEffect } from "react"
import type { User } from "@/lib/auth"

interface ProtectedRouteProps {
  children: React.ReactNode
  requiredPermission?: (user: User) => boolean
  fallbackPath?: string
}

export function ProtectedRoute({ children, requiredPermission, fallbackPath = "/login" }: ProtectedRouteProps) {
  const { user, loading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!loading) {
      if (!user) {
        router.push(fallbackPath)
        return
      }

      if (requiredPermission && !requiredPermission(user)) {
        router.push("/unauthorized")
        return
      }
    }
  }, [user, loading, router, requiredPermission, fallbackPath])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" />
      </div>
    )
  }

  if (!user || (requiredPermission && !requiredPermission(user))) {
    return null
  }

  return <>{children}</>
}
