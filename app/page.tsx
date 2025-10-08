"use client"

import { useEffect, useState } from "react"
import { BlogHeader } from "@/components/blog-header"
import { BlogPostCard } from "@/components/blog-post-card"
import { Button } from "@/components/ui/button"
import type { BlogPost } from "@/lib/blog-data"
import { blogApi } from "@/lib/api"

export default function HomePage() {
  const [posts, setPosts] = useState<BlogPost[]>([])
  const [loading, setLoading] = useState(true)
  const [page, setPage] = useState(1)
  const [hasMore, setHasMore] = useState(true)

  useEffect(() => {
    loadPosts()
  }, [])

  const loadPosts = async () => {
    try {
      setLoading(true)
      const { posts: newPosts, total } = await blogApi.getPosts(page, 6)
      setPosts(newPosts)
      setHasMore(newPosts.length < total)
    } catch (error) {
      console.error("Failed to load posts:", error)
    } finally {
      setLoading(false)
    }
  }

  const loadMore = async () => {
    try {
      const nextPage = page + 1
      const { posts: newPosts } = await blogApi.getPosts(nextPage, 6)
      setPosts((prev) => [...prev, ...newPosts])
      setPage(nextPage)
      setHasMore(newPosts.length === 6)
    } catch (error) {
      console.error("Failed to load more posts:", error)
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <BlogHeader />

      <main className="container mx-auto px-4 py-12">
        {/* Hero Section */}
        <section className="text-center mb-12">
          <h1 className="text-5xl font-bold text-foreground mb-6 text-balance">Faith, Art and Culture</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto text-pretty leading-relaxed">
Faith Meets Art, Rredefining Culture </p>
        </section>

        {/* Subscribe Section */}
        <section className="max-w-xl mx-auto mb-16">
          <form className="flex gap-3" onSubmit={(e) => e.preventDefault()}>
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-6 py-4 bg-secondary border-2 border-border text-background placeholder:text-background focus:outline-none focus:border-primary text-lg"
              style={{ borderRadius: '0.5rem' }}
              required
            />
            <button
              type="submit"
              className="px-8 py-4 bg-foreground text-background font-bold hover:opacity-90 transition-opacity text-lg"
              style={{ borderRadius: '0.5rem' }}
            >
              Subscribe
            </button>
          </form>
        </section>

        {/* Featured Posts Grid */}
        <section>
          <h2 className="text-3xl font-semibold text-foreground mb-8">Latest Posts</h2>

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
          ) : (
            <>
              {/* Featured Section - First 3 posts */}
              {posts.length > 0 && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 mb-4 md:items-start">
                  {/* First post */}
                  <div className="h-full">
                    <BlogPostCard post={posts[0]} featured />
                  </div>
                  
                  {/* Two posts stacked on the right - flex to distribute space */}
                  <div className="flex flex-col gap-4 h-full">
                    {posts[1] && (
                      <div className="flex-1 min-h-0">
                        <BlogPostCard post={posts[1]} />
                      </div>
                    )}
                    {posts[2] && (
                      <div className="flex-1 min-h-0">
                        <BlogPostCard post={posts[2]} />
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Rest of the posts in 2 columns */}
              {posts.length > 3 && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4 mb-4">
                  {posts.slice(3).map((post) => (
                    <BlogPostCard key={post.id} post={post} />
                  ))}
                </div>
              )}

              {hasMore && (
                <div className="text-center">
                  <Button onClick={loadMore} size="lg" variant="outline">
                    Load More Posts
                  </Button>
                </div>
              )}
            </>
          )}
        </section>
      </main>
    </div>
  )
}
