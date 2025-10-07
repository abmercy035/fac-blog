"use client"

import type React from "react"

import { ProtectedRoute } from "@/components/protected-route"
import { AdminSidebar } from "@/components/admin-sidebar"
import { AdminHeader } from "@/components/admin-header"
import { permissions } from "@/lib/auth"

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ProtectedRoute requiredPermission={(user) => permissions.canManagePosts(user) || permissions.canManageUsers(user)}>
      <div className="flex h-screen bg-background">
        <div className="w-64 flex-shrink-0">
          <AdminSidebar />
        </div>
        <div className="flex-1 flex flex-col overflow-hidden">
          <AdminHeader />
          <main className="flex-1 overflow-y-auto p-6">{children}</main>
        </div>
      </div>
    </ProtectedRoute>
  )
}
