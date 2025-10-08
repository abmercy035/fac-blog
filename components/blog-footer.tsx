import Link from "next/link"
import { Facebook, Twitter, Instagram, Mail } from "lucide-react"
import { categories } from "@/lib/blog-data"

export function BlogFooter() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-foreground text-background border-t border-border mt-16">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="space-y-4">
            <Link href="/" className="text-3xl font-bold">
              FAC
            </Link>
            <p className="text-sm text-background/80">
Faith Meets Art, Rredefining Culture

            </p>
            <div className="flex space-x-4 pt-2">
              <a href="#" className="hover:text-primary transition-colors" aria-label="Facebook">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="hover:text-primary transition-colors" aria-label="Twitter">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="hover:text-primary transition-colors" aria-label="Instagram">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="hover:text-primary transition-colors" aria-label="Email">
                <Mail className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Categories */}
          <div>
            <h3 className="font-bold text-lg mb-4">Categories</h3>
            <ul className="space-y-2">
              {categories.map((category) => (
                <li key={category.id}>
                  <Link 
                    href={`/categories/${category.slug}`}
                    className="text-sm text-background/80 hover:text-primary transition-colors"
                  >
                    {category.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="font-bold text-lg mb-4">Services</h3>
            <ul className="space-y-2">
              <li>
                <Link 
                  href="/services/counselling"
                  className="text-sm text-background/80 hover:text-primary transition-colors"
                >
                  Counselling
                </Link>
              </li>
              <li>
                <Link 
                  href="/services/writing"
                  className="text-sm text-background/80 hover:text-primary transition-colors"
                >
                  Writing
                </Link>
              </li>
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-bold text-lg mb-4">Quick Links</h3>
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
                  href="/authors"
                  className="text-sm text-background/80 hover:text-primary transition-colors"
                >
                  Authors
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
        <div className="border-t border-background/20 mt-8 pt-8 text-center text-sm text-background/70">
          <p>&copy; {currentYear} FAC - Faith, Art & Culture. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
