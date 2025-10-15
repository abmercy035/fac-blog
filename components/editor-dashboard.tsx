"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { adminApi } from "@/lib/admin-api"
import { useAuth } from "@/hooks/use-auth"
import type { BlogPost } from "@/lib/blog-data"
import { formatDistanceToNow } from "date-fns"
import { Plus, Edit, Eye, FileText, Clock, CheckCircle } from "lucide-react"

export function EditorDashboard() {
  const { user } = useAuth()
  const [posts, setPosts] = useState<BlogPost[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const allPosts = await adminApi.getAllPosts()
        const userPosts =
          user?.role === "admin" ? allPosts : allPosts.filter((post) => post.author.email === user?.email)
        setPosts(userPosts)
      } catch (error) {
        console.error("Failed to fetch posts:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchPosts()
  }, [user])

  const publishedPosts = posts.filter((post) => post.isPublished)
  const draftPosts = posts.filter((post) => !post.isPublished)

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold">My Posts</h1>
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            New Post
          </Button>
        </div>
        <div className="grid gap-4">
          {[...Array(3)].map((_, i) => (
            <Card key={i}>
              <CardHeader>
                <div className="h-6 bg-muted rounded animate-pulse mb-2" />
                <div className="h-4 bg-muted rounded animate-pulse w-2/3" />
              </CardHeader>
            </Card>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">My Posts</h1>
          <p className="text-muted-foreground">Manage your blog content</p>
        </div>
        <Button asChild>
          <Link href="/editor/new">
            <Plus className="h-4 w-4 mr-2" />
            New Post
          </Link>
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Posts</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{posts.length}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Published</CardTitle>
            <CheckCircle className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{publishedPosts.length}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Drafts</CardTitle>
            <Clock className="h-4 w-4 text-orange-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{draftPosts.length}</div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4">
        {posts.map((post) => (
          <Card key={post._id || post.id}>
            <CardHeader>
              <div className="flex justify-between items-start">
                <div className="space-y-2">
                  <CardTitle className="text-xl">{post.title}</CardTitle>
                  <CardDescription className="line-clamp-2">{post.excerpt}</CardDescription>
                  <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                    <span>{formatDistanceToNow(new Date(post.publishedAt), { addSuffix: true })}</span>
                    <Badge variant={post.isPublished ? "default" : "secondary"}>
                      {post.isPublished ? "Published" : "Draft"}
                    </Badge>
                    <Badge variant="outline">{post.category.name}</Badge>
                  </div>
                </div>
                <div className="flex space-x-2">
                  {post.isPublished && (
                    <Button variant="outline" size="sm" asChild>
                      <Link href={`/posts/${post.slug}`}>
                        <Eye className="h-4 w-4" />
                      </Link>
                    </Button>
                  )}
                  <Button variant="outline" size="sm" asChild>
                    <Link href={`/admin/posts/${post._id || post.id}/edit`}>
                      <Edit className="h-4 w-4" />
                    </Link>
                  </Button>
                </div>
              </div>
            </CardHeader>
          </Card>
        ))}

        {posts.length === 0 && (
          <Card>
            <CardContent className="text-center py-8">
              <FileText className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground mb-4">You haven't created any posts yet</p>
              <Button asChild>
                <Link href="/editor/new">
                  <Plus className="h-4 w-4 mr-2" />
                  Create Your First Post
                </Link>
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
