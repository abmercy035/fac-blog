"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { useSearchParams } from "next/navigation"
import { Search } from "lucide-react"
import { BlogHeader } from "@/components/blog-header"
import { BlogPostCard } from "@/components/blog-post-card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { blogApi } from "@/lib/api"
import type { BlogPost } from "@/lib/blog-data"

export default function SearchPage() {
  const searchParams = useSearchParams()
  const initialQuery = searchParams.get("q") || ""

  const [query, setQuery] = useState(initialQuery)
  const [results, setResults] = useState<BlogPost[]>([])
  const [loading, setLoading] = useState(false)
  const [hasSearched, setHasSearched] = useState(false)

  useEffect(() => {
    if (initialQuery) {
      performSearch(initialQuery)
    }
  }, [initialQuery])

  const performSearch = async (searchQuery: string) => {
    if (searchQuery.trim().length < 2) return

    setLoading(true)
    setHasSearched(true)
    try {
      const searchResults = await blogApi.searchPosts(searchQuery.trim())
      setResults(searchResults)
    } catch (error) {
      console.error("Search failed:", error)
      setResults([])
    } finally {
      setLoading(false)
    }
  }

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    performSearch(query)
  }

  return (
    <div className="min-h-screen bg-background">
      <BlogHeader />

      <main className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-foreground mb-6 text-balance">Search Posts</h1>
            <p className="text-xl text-muted-foreground mb-8 text-pretty">
              Find articles by title, content, tags, or author
            </p>

            <form onSubmit={handleSearch} className="max-w-2xl mx-auto">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5" />
                <Input
                  placeholder="Search for posts, topics, or technologies..."
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  className="pl-12 pr-24 h-12 text-lg"
                />
                <Button
                  type="submit"
                  className="absolute right-2 top-1/2 transform -translate-y-1/2"
                  disabled={loading || query.trim().length < 2}
                >
                  {loading ? "Searching..." : "Search"}
                </Button>
              </div>
            </form>
          </div>

          {/* Search Results */}
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="animate-pulse">
                  <div className="bg-muted rounded-lg h-48 mb-4"></div>
                  <div className="bg-muted rounded h-6 mb-2"></div>
                  <div className="bg-muted rounded h-4 mb-2"></div>
                  <div className="bg-muted rounded h-4 w-3/4"></div>
                </div>
              ))}
            </div>
          ) : hasSearched ? (
            results.length > 0 ? (
              <div>
                <h2 className="text-2xl font-semibold text-foreground mb-8">
                  Found {results.length} {results.length === 1 ? "result" : "results"} for "{query}"
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {results.map((post) => (
                    <BlogPostCard key={post.id} post={post} />
                  ))}
                </div>
              </div>
            ) : (
              <div className="text-center py-12">
                <Search className="h-16 w-16 text-muted-foreground mx-auto mb-6" />
                <h2 className="text-2xl font-semibold text-foreground mb-4">No results found</h2>
                <p className="text-muted-foreground mb-8 max-w-md mx-auto">
                  We couldn't find any posts matching "{query}". Try different keywords or browse our categories.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button variant="outline" onClick={() => setQuery("")}>
                    Clear Search
                  </Button>
                  <Button asChild>
                    <a href="/categories">Browse Categories</a>
                  </Button>
                </div>
              </div>
            )
          ) : (
            <div className="text-center py-12">
              <Search className="h-16 w-16 text-muted-foreground mx-auto mb-6" />
              <h2 className="text-2xl font-semibold text-foreground mb-4">Start your search</h2>
              <p className="text-muted-foreground">Enter a search term above to find relevant posts</p>
            </div>
          )}
        </div>
      </main>
    </div>
  )
}
