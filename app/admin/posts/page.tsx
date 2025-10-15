"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { adminApi } from "@/lib/admin-api"
import type { BlogPost } from "@/lib/blog-data"
import { formatDistanceToNow } from "date-fns"
import { Plus, Edit, Trash2, Eye, Heart, MessageSquare } from "lucide-react"
import Link from "next/link"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

export default function AdminPostsPage() {
  const [posts, setPosts] = useState<BlogPost[]>([])
  const [loading, setLoading] = useState(true)
  const [deletingId, setDeletingId] = useState<string | null>(null)

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const data = await adminApi.getAllPosts()
        setPosts(data)
      } catch (error) {
        console.error("Failed to fetch posts:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchPosts()
  }, [])

  const handleDelete = async (id: string) => {
    setDeletingId(id)
    try {
      await adminApi.deletePost(id)
      setPosts(posts.filter((post) => (post._id || post.id) !== id))
    } catch (error) {
      console.error("Failed to delete post:", error)
    } finally {
      setDeletingId(null)
    }
  }

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold">Posts</h1>
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
          <h1 className="text-3xl font-bold">Posts</h1>
          <p className="text-muted-foreground">Manage your blog posts</p>
        </div>
        <Button asChild>
          <Link href="/admin/posts/new">
            <Plus className="h-4 w-4 mr-2" />
            New Post
          </Link>
        </Button>
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
                    <span>by {post.author?.name}</span>
                    {post.publishedAt ? (
                      <span>  {post.publishedAt
    ? formatDistanceToNow(new Date(post.publishedAt), { addSuffix: true })
    : "Unpublished"}</span>
                    ) : (
                      <span>Not published yet</span>
                    )}
                    <Badge variant={post?.isPublished ? "default" : "secondary"}>
                      {post?.isPublished ? "Published" : "Draft"}
                    </Badge>
                  </div>
                </div>
                <div className="flex space-x-2">
                  <Button variant="outline" size="sm" asChild>
                    <Link href={`/posts/${post.slug}`}>
                      <Eye className="h-4 w-4" />
                    </Link>
                  </Button>
                  <Button variant="outline" size="sm" asChild>
                    <Link href={`/admin/posts/${post._id || post.id}/edit`}>
                      <Edit className="h-4 w-4" />
                    </Link>
                  </Button>
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button variant="outline" size="sm" disabled={deletingId === (post._id || post.id)}>
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>Delete Post</AlertDialogTitle>
                        <AlertDialogDescription>
                          Are you sure you want to delete "{post.title}"? This action cannot be undone.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction
                          onClick={() => handleDelete(post._id || post.id)}
                          className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                        >
                          Delete
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex items-center space-x-6 text-sm text-muted-foreground">
                <div className="flex items-center space-x-1">
                  <Heart className="h-4 w-4" />
                  <span>{post.likes}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <MessageSquare className="h-4 w-4" />
                  <span>{post.commentsCount}</span>
                </div>
                <Badge variant="outline">{post.category.name}</Badge>
                <div className="flex space-x-1">
                  {post.tags.slice(0, 3).map((tag) => (
                    <Badge key={tag} variant="outline" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                  {post.tags.length > 3 && <span className="text-xs">+{post.tags.length - 3} more</span>}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
