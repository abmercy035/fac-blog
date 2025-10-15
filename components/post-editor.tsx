"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { adminApi } from "@/lib/admin-api"
import { blogApi } from "@/lib/api"
import { useAuth } from "@/hooks/use-auth"
import type { Author, Category } from "@/lib/blog-data"
import { MarkdownRenderer } from "@/components/markdown-renderer"
import { MarkdownGuide } from "@/components/markdown-guide"
import { Save, Eye, X, Plus } from "lucide-react"

interface PostEditorProps {
  postId?: string
  mode: "create" | "edit"
}

export function PostEditor({ postId, mode }: PostEditorProps) {
  const { user } = useAuth()
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)

  const [authors, setAuthors] = useState<Author[]>([])
  const [categories, setCategories] = useState<Category[]>([])

  const [title, setTitle] = useState("")
  const [content, setContent] = useState("")
  const [excerpt, setExcerpt] = useState("")
  const [selectedAuthor, setSelectedAuthor] = useState<Author | null>(null)
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null)
  const [tags, setTags] = useState<string[]>([])
  const [newTag, setNewTag] = useState("")
  const [isPublished, setIsPublished] = useState(true)
  const [featuredImage, setFeaturedImage] = useState("")
  const [slug, setSlug] = useState("")

  useEffect(() => {
    const loadData = async () => {
      try {
        const [authorsData, categoriesData] = await Promise.all([
          blogApi.getAuthors(),
          blogApi.getCategories(),
        ])
        setAuthors(authorsData)
        setCategories(categoriesData)
      } catch (err) {
        console.error("Failed to load authors and categories:", err)
      }
    }
    loadData()
  }, [])

  useEffect(() => {
    if (mode === "edit" && postId) {
      const loadPost = async () => {
        setLoading(true)
        try {
          const post = await blogApi.getPostById(postId)
          if (post) {
            setTitle(post.title)
            setContent(post.content)
            setExcerpt(post.excerpt)
            setSelectedAuthor(post.author)
            setSelectedCategory(post.category)
            setTags(post.tags)
            setIsPublished(post.isPublished)
            setFeaturedImage(post.featuredImage)
            setSlug(post.slug)
          }
        } catch (err) {
          setError("Failed to load post")
        } finally {
          setLoading(false)
        }
      }
      loadPost()
    } else if (authors.length > 0) {
      const currentAuthor = authors.find((a) => a.email === user?.email) || authors[0]
      setSelectedAuthor(currentAuthor)
    }
  }, [mode, postId, user, authors])

  useEffect(() => {
    if (mode === "create" && title) {
      const generatedSlug = title
        .toLowerCase()
        .replace(/[^a-z0-9\s-]/g, "")
        .replace(/\s+/g, "-")
        .replace(/-+/g, "-")
        .trim()
      setSlug(generatedSlug)
    }
  }, [title, mode])

  const addTag = () => {
    if (newTag.trim() && !tags.includes(newTag.trim())) {
      setTags([...tags, newTag.trim()])
      setNewTag("")
    }
  }

  const removeTag = (tagToRemove: string) => {
    setTags(tags.filter((tag) => tag !== tagToRemove))
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault()
      addTag()
    }
  }

  const validateForm = () => {
    if (!title.trim()) return "Title is required"
    if (!content.trim()) return "Content is required"
    if (!excerpt.trim()) return "Excerpt is required"
    if (!selectedCategory) return "Category is required"
    if (!selectedAuthor) return "Author is required"
    if (!slug.trim()) return "Slug is required"
    return null
  }

  const handleSave = async (publish = false) => {
    const validationError = validateForm()
    if (validationError) {
      setError(validationError)
      return
    }

    setSaving(true)
    setError(null)

    try {
      const postData = {
        title: title.trim(),
        content: content.trim(),
        excerpt: excerpt.trim(),
        author: selectedAuthor!,
        category: selectedCategory!,
        tags,
        isPublished: publish,
        slug: slug.trim(),
        featuredImage: featuredImage || "/placeholder.jpg",
      }

      if (mode === "create") {
        await adminApi.createPost(postData)
        setSuccess("Post created successfully!")
        setTimeout(() => router.push("/admin/posts"), 1500)
      } else if (postId) {
        await adminApi.updatePost(postId, { ...postData, isPublished: publish })
        setSuccess("Post updated successfully!")
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to save post")
    } finally {
      setSaving(false)
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" />
      </div>
    )
  }

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">{mode === "create" ? "Create New Post" : "Edit Post"}</h1>
          <p className="text-muted-foreground">
            {mode === "create" ? "Write and publish a new blog post" : "Make changes to your post"}
          </p>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline" onClick={() => router.back()}>
            Cancel
          </Button>
          <Button onClick={() => handleSave(false)} disabled={saving}>
            <Save className="h-4 w-4 mr-2" />
            Save Draft
          </Button>
          <Button onClick={() => handleSave(true)} disabled={saving}>
            {saving ? "Publishing..." : "Publish"}
          </Button>
        </div>
      </div>

      {error && (
        <Alert variant="destructive">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {success && (
        <Alert>
          <AlertDescription>{success}</AlertDescription>
        </Alert>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Post Content</CardTitle>
              <CardDescription>Write your blog post content using Markdown</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="title">Title</Label>
                <Input
                  id="title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Enter post title..."
                  className="text-lg"
                />
              </div>

              <div>
                <Label htmlFor="excerpt">Excerpt</Label>
                <Textarea
                  id="excerpt"
                  value={excerpt}
                  onChange={(e) => setExcerpt(e.target.value)}
                  placeholder="Brief description of your post..."
                  rows={3}
                />
              </div>

              <MarkdownGuide />

              <Tabs defaultValue="write" className="w-full">
                <TabsList>
                  <TabsTrigger value="write">Write</TabsTrigger>
                  <TabsTrigger value="preview">
                    <Eye className="h-4 w-4 mr-2" />
                    Preview
                  </TabsTrigger>
                </TabsList>
                <TabsContent value="write">
                  <Textarea
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    placeholder="Write your post content in Markdown..."
                    rows={20}
                    className="font-mono"
                  />
                </TabsContent>
                <TabsContent value="preview">
                  <div className="border rounded-lg p-4 min-h-[500px] bg-background">
                    <MarkdownRenderer content={content || "Nothing to preview yet..."} />
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Post Settings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="category">Category</Label>
                <Select
                  value={selectedCategory?._id || selectedCategory?.id || ""}
                  onValueChange={(value) => {
                    const category = categories.find((c) => (c._id || c.id) === value)
                    setSelectedCategory(category || null)
                  }}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((category) => (
                      <SelectItem key={category._id || category.id} value={category._id || category.id}>
                        {category.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="slug">URL Slug</Label>
                <Input id="slug" value={slug} onChange={(e) => setSlug(e.target.value)} placeholder="post-url-slug" />
              </div>

              <div>
                <Label htmlFor="featuredImage">Featured Image URL</Label>
                <Input
                  id="featuredImage"
                  value={featuredImage}
                  onChange={(e) => setFeaturedImage(e.target.value)}
                  placeholder="https://example.com/image.jpg"
                />
              </div>

              <div className="flex items-center space-x-2 hidden">
                <Switch id="published" checked={isPublished} onCheckedChange={setIsPublished} />
                <Label htmlFor="published">Save as Draft</Label>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Tags</CardTitle>
              <CardDescription>Add tags to help categorize your post</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex space-x-2">
                <Input
                  value={newTag}
                  onChange={(e) => setNewTag(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Add a tag..."
                />
                <Button onClick={addTag} size="sm">
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
              <div className="flex flex-wrap gap-2">
                {tags.map((tag) => (
                  <Badge key={tag} variant="secondary" className="flex items-center space-x-1">
                    <span>{tag}</span>
                    <button onClick={() => removeTag(tag)} className="cursor-pointer ml-1 hover:text-destructive">
                      <X className="h-3 w-3 md:h-4 md:w-4" />
                    </button>
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
