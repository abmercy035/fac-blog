"use client"

import { useState } from "react"
import Link from "next/link"
import { Menu, Home, Folder, Users, Info } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { SearchDialog } from "./search-dialog"

export function MobileNav() {
  const [open, setOpen] = useState(false)

  const navItems = [
    { href: "/", label: "Home", icon: Home },
    { href: "/categories", label: "Categories", icon: Folder },
    { href: "/authors", label: "Authors", icon: Users },
    { href: "/about", label: "About", icon: Info },
  ]

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="md:hidden cursor-pointer">
          <Menu className="h-6 w-6" />
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="w-100">
        <SheetHeader>
          <SheetTitle>Navigation</SheetTitle>
        </SheetHeader>

        <div className="mt-8 space-y-6 px-4 cursor-pointer">
          {/* Search */}
          <div>
            <h3 className="text-sm font-medium text-muted-foreground mb-3">Search</h3>
            <SearchDialog
              trigger={
                <Button variant="outline" className="w-full justify-start bg-transparent">
                  <Menu className="h-6 w-6 mr-2  cursor-pointer" />
                  Search posts...
                </Button>
              }
            />
          </div>

          {/* Navigation Links */}
          <div>
            <h3 className="text-sm font-medium text-muted-foreground mb-3">Menu</h3>
            <nav className="space-y-2">
              {navItems.map((item) => {
                const Icon = item.icon
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className="flex items-center space-x-3 px-3 py-2 rounded-lg text-foreground hover:bg-muted transition-colors"
                  >
                    <Icon className="h-4 w-4" />
                    <span>{item.label}</span>
                  </Link>
                )
              })}
            </nav>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  )
}
