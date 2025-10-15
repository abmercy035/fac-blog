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
  
  const [email, setEmail] = useState("")
  const [subscribing, setSubscribing] = useState(false)
  const [subscriptionMessage, setSubscriptionMessage] = useState("")

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

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!email.trim()) {
      setSubscriptionMessage("Please enter a valid email address")
      return
    }

    setSubscribing(true)
    setSubscriptionMessage("")

    try {
      await blogApi.subscribe(email.trim(), undefined, "homepage")
      setSubscriptionMessage("Successfully subscribed! Thank you for joining our community.")
      setEmail("")
    } catch (error: any) {
      if (error.message.includes("already subscribed") || error.message.includes("duplicate") || error.message.includes("exists")) {
        setSubscriptionMessage("This email is already subscribed to our newsletter.")
      } else {
        setSubscriptionMessage("Failed to subscribe. Please try again later.")
      }
      console.error("Subscription error:", error)
    } finally {
      setSubscribing(false)
      setTimeout(() => setSubscriptionMessage(""), 5000)
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <BlogHeader />

      <main className="container mx-auto px-4 py-12">
        {/* Hero Section */}
        <section className="text-center mb-16">
          <h1 className="text-3xl md:text-5xl font-bold text-foreground mb-12 text-balance">Faith, Art and Culture</h1>
          
          {/* Welcome Message */}
          <div className="max-w-6xl mx-auto space-y-6 text-left">
            <p className="text-base md:text-lg text-foreground leading-relaxed">
              Welcome to Faith, Art, and Culture (FAC) — a blog where ideas, convictions, and creativity meet.  
              This space was born out of the need to speak not just from inspiration but with intention.
            </p>

            <p className="text-base md:text-lg text-muted-foreground leading-relaxed">
              In a world shaped by noise, I believe in the quiet power of thoughtful writing. Here, you will find 
              poetry that speaks to the soul, essays that ask necessary questions, and reflections that wrestle with 
              faith, identity, and cultural norms.
            </p>

            <p className="text-base md:text-lg text-muted-foreground leading-relaxed">
              FAC is more than a platform. It's a perspective that values clarity over confusion, insight over 
              impression, and truth over trend.
            </p>

            <p className="text-base md:text-lg text-muted-foreground leading-relaxed italic">
              Whether you're here to read, reflect, or rethink, I hope these words find you where you are, 
              and maybe help move you a little further.
            </p>
          </div>
        </section>

        {/* Subscribe Section */}
        <section className="max-w-4xl mx-auto mb-16">
          <form className="flex gap-3" onSubmit={handleSubscribe}>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="flex-1 md:px-6 px-4 md:py- py-2 bg-secondary border-2 border-border text-background placeholder:text-background focus:outline-none focus:border-primary text-sm md:text-base"
              style={{ borderRadius: '0.5rem' }}
              required
              disabled={subscribing}
            />
            <button
              type="submit"
              disabled={subscribing}
              className="px-4 md:px-8 md:py- py-2 bg-foreground text-background hover:opacity-90 transition-opacity text-sm md:text-base cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
              style={{ borderRadius: '0.5rem' }}
            >
              {subscribing ? "Subscribing..." : "Subscribe"}
            </button>
          </form>
          
          {/* Subscription Message */}
          {subscriptionMessage && (
            <div className={`mt-4 p-3 rounded-md text-sm text-center ${
              subscriptionMessage.includes("Successfully") 
                ? "bg-green-100 text-green-800 border border-green-200"
                : subscriptionMessage.includes("already subscribed")
                ? "bg-yellow-100 text-yellow-800 border border-yellow-200"
                : "bg-red-100 text-red-800 border border-red-200"
            }`}>
              {subscriptionMessage}
            </div>
          )}
        </section>

        {/* Featured Posts Grid */}
        <section>
          <h2 className="text-2xl md:text-3xl font-semibold text-foreground mb-8">Latest Posts</h2>

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
              {/* Featured Section - Only render if there are 1-3 posts */}
              {posts.length >= 1 && posts.length >= 3 && (
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

              {/* Rest of the posts in 2 columns - show all posts if more than 3 */}
              {posts.length >= 3 && posts && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4 mb-4">
                  {posts.map((post, index) => (
                    index >= 3 &&
                    <BlogPostCard key={post._id || post.id} post={post} />
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
