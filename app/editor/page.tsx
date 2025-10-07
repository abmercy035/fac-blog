"use client"

import { ProtectedRoute } from "@/components/protected-route"
import { EditorDashboard } from "@/components/editor-dashboard"
import { permissions } from "@/lib/auth"

export default function EditorPage() {
  return (
    <ProtectedRoute requiredPermission={permissions.canCreatePosts}>
      <div className="container mx-auto py-8">
        <EditorDashboard />
      </div>
    </ProtectedRoute>
  )
}
