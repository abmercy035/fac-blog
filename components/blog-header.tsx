"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Search, ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { SearchDialog } from "./search-dialog"
import { MobileNav } from "./mobile-nav"
import { cn } from "@/lib/utils"
import { useEffect, useState } from "react"
import { blogApi } from "@/lib/api"
import type { Category } from "@/lib/blog-data"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export function BlogHeader() {
  const pathname = usePathname()
  const [categories, setCategories] = useState<Category[]>([
    {
      id: "1",
      name: 'Poetry & Prose',
      description: 'Original poems and lyrical prose exploring humanity, spirituality, emotion, and imagination',
      slug: 'poetry-prose'
    },
    {
      id: "2",
      name: 'Faith & Spirituality',
      description: 'Faith based writing, spiritual reflections, and critical views on religion and belief systems',
      slug: 'faith-spirituality'
    },
    {
      id: "3",
      name: 'Culture & Society',
      description: 'Explorations of societal trends, cultural values, and the tensions between tradition and modernity',
      slug: 'culture-society'
    },
    {
      id: "4",
      name: 'Essays & Reviews',
      description: 'Analytical pieces, cultural critique, social commentary, personal insights, and media/book reviews',
      slug: 'essays-reviews'
    }
  ])

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const data = await blogApi.getCategories()
        setCategories(data)
      } catch (error) {
        console.error("Failed to fetch categories:", error)
      }
    }
    fetchCategories()
  }, [])

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
                  <DropdownMenuItem key={category._id || category.id} asChild>
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
                  <Button variant="outline" className="md:w-64 justify-start text-muted-foreground bg-transparent cursor-pointer">
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
