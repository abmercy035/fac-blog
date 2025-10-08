"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Search, ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { SearchDialog } from "./search-dialog"
import { MobileNav } from "./mobile-nav"
import { cn } from "@/lib/utils"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { categories } from "@/lib/blog-data"

export function BlogHeader() {
  const pathname = usePathname()

  const navItems = [
    { href: "/", label: "Home" },
    { href: "/about", label: "About" },
  ]
  const navItemsEnd = [
    { href: "/author/victory-atet", label: "Author" },
    { href: "/services", label: "Services" },
  ]
  

  return (
    <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="text-3xl font-bold text-foreground mr-8 flex flex-col">
            FAC
            <i className="text-xs text-muted-foreground"> Faith Meets Art, Redefining Culture.</i>
          </Link>

          <nav className="hidden md:flex items-center space-x-8 max-lg:space-x-2">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "transition-colors",
                  pathname === item.href ? "text-primary font-medium" : "text-muted-foreground hover:text-primary",
                )}
              >
                {item.label}
              </Link>
            ))}
                {/* Categories Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger className={cn(
                "flex items-center gap-1 transition-colors outline-none cursor-pointer",
                pathname.startsWith("/categories") ? "text-primary font-medium" : "text-muted-foreground hover:text-primary"
              )}>
                Categories <ChevronDown className="h-4 w-4" />
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                {categories.map((category) => (
                  <DropdownMenuItem key={category.id} asChild>
                    <Link href={`/categories/${category.slug}`} className="cursor-pointer">
                      {category.name}
                    </Link>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
            {navItemsEnd.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "transition-colors",
                  pathname === item.href ? "text-primary font-medium" : "text-muted-foreground hover:text-primary",
                )}
              >
                {item.label}
              </Link>
            ))}

        
          </nav>
 
          <div className="ml-8 flex items-center space-x-4">
            {/* Desktop Search */}
            <div className="hidden sm:block">
              <SearchDialog
                trigger={
                  <Button variant="outline" className="w-64 justify-start text-muted-foreground bg-transparent cursor-pointer">
                    <Search className="h-6 w-6 mr-2" />
                    Search posts...
                  </Button>
                }
              />
            </div>

            {/* Mobile Search */}
            <div className="sm:hidden">
              <SearchDialog
                trigger={
                  <Button variant="ghost" size="icon">
                    <Search className="h-6 w-6" />
                  </Button>
                }
              />
            </div>

            {/* Mobile Navigation */}
            <MobileNav />
          </div>
        </div>
      </div>
    </header>
  )
}
