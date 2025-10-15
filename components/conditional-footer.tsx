"use client"

import { usePathname } from "next/navigation"
import { BlogFooter } from "./blog-footer"

export function ConditionalFooter() {
  const pathname = usePathname()
  
  const isAdminPage = pathname.startsWith('/admin')
  const isEditorPage = pathname.startsWith('/editor')
  
  if (isAdminPage || isEditorPage) {
    return null
  }
  
  return <BlogFooter />
}
