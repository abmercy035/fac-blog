"use client"

import Link from "next/link"
import { Facebook, Twitter, Instagram, Mail, Linkedin } from "lucide-react"
import { useEffect, useState } from "react"
import { blogApi } from "@/lib/api"
import type { Category } from "@/lib/blog-data"

export function BlogFooter() {
  const currentYear = new Date().getFullYear()
  const [categories, setCategories] = useState<Category[]>([])

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
  return (
    <footer className="bg-foreground text-background border-t border-border mt-16">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="space-y-4">
            <Link href="/" className="text-xl md:text-3xl font-bold">
              FAC
            </Link>
            <p className="text-xs md:text-sm text-background/80">
Faith Meets Art, Redefining Culture

            </p>
            <div className="flex space-x-4 pt-2">
              <a href="https://web.facebook.com/victory.atet" className="hover:text-primary transition-colors" aria-label="Facebook">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="https://www.linkedin.com/in/victory-atet-writes" className="hover:text-primary transition-colors" aria-label="Linkedin">
                <Linkedin className="h-5 w-5" />
              </a>
              <a href="mailto:victoryatet@gmail.com" className="hover:text-primary transition-colors" aria-label="Email">
                <Mail className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Categories */}
          <div>
            <h3 className="font-bold text-sm md:text-lg mb-4">Categories</h3>
            <ul className="space-y-2">
             <li>
                  <Link 
                    href={`/categories/poetry-prose`}
                    className="text-sm text-background/80 hover:text-primary transition-colors"
                  >
                    Poetry & Prose
                  </Link>
                </li>
             <li>
                  <Link 
                    href={`/categories/faith-spirituality`}
                    className="text-sm text-background/80 hover:text-primary transition-colors"
                  >
                    Faith & Spirituality
                  </Link>
                </li>
             <li>
                  <Link 
                    href={`/categories/culture-society`}
                    className="text-sm text-background/80 hover:text-primary transition-colors"
                  >
                    Culture & Society
                  </Link>
                </li>
             <li>
                  <Link 
                    href={`/categories/`}
                    className="text-sm text-background/80 hover:text-primary transition-colors"
                  >
                    
                  </Link>
                </li>
             <li>
                  <Link 
                    href={`/categories/essays-reviews`}
                    className="text-sm text-background/80 hover:text-primary transition-colors"
                  >
                    Essays & Reviews
                  </Link>
                </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="font-bold ttext-sm md:ext-lg mb-4">Services</h3>
            <ul className="space-y-2">
              <li>
                <Link 
                  href="/services"
                  className="text-sm text-background/80 hover:text-primary transition-colors"
                >
                  Writing & Content Creation
                </Link>
              </li>
              <li>
                <Link 
                  href="/services"
                  className="text-sm text-background/80 hover:text-primary transition-colors"
                >
                  Editorial & Proofreading
                </Link>
              </li>
              <li>
                <Link 
                  href="/services"
                  className="text-sm text-background/80 hover:text-primary transition-colors"
                >
                  Creative Strategy Consulting
                </Link>
              </li>
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-bold text-sm md:text-lg mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link 
                  href="/"
                  className="text-sm text-background/80 hover:text-primary transition-colors"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link 
                  href="/about"
                  className="text-sm text-background/80 hover:text-primary transition-colors"
                >
                  About
                </Link>
              </li>
              <li>
                <Link 
                  href="/author/victory-atet"
                  className="text-sm text-background/80 hover:text-primary transition-colors"
                >
                  Author
                </Link>
              </li>
              <li>
                <Link 
                  href="/search"
                  className="text-sm text-background/80 hover:text-primary transition-colors"
                >
                  Search
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-background/20 mt-8 pt-8 text-center text-xs md:text-sm text-background/70">
          <p>&copy; {currentYear} FAC - Faith, Art & Culture. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
