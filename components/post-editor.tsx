"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
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
  const [bannerFile, setBannerFile] = useState<File | null>(null)
  const [bannerPreview, setBannerPreview] = useState<string | null>(null)
  const [uploadProgress, setUploadProgress] = useState<number | null>(null)
  const [uploading, setUploading] = useState(false)

  const fileInputRef = useRef<HTMLInputElement | null>(null)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0] ?? null
    setBannerFile(f)
    setBannerPreview(f ? URL.createObjectURL(f) : null)
  }

  const uploadToCloudinaryUnsigned = (file: File) => {
    return new Promise<{ url: string }>((resolve, reject) => {
      const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME
      const uploadPreset = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET
      if (!cloudName || !uploadPreset) {
        return reject(new Error("Cloudinary not configured"))
      }
      const url = `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`
      const fd = new FormData()
      fd.append("file", file)
      fd.append("upload_preset", uploadPreset)

      const xhr = new XMLHttpRequest()
      xhr.open("POST", url)
      xhr.upload.onprogress = (event) => {
        if (event.lengthComputable) {
          setUploadProgress(Math.round((event.loaded / event.total) * 100))
        }
      }
      xhr.onload = () => {
        setUploading(false)
        setUploadProgress(null)
        if (xhr.status >= 200 && xhr.status < 300) {
          try {
            const resp = JSON.parse(xhr.responseText)
            resolve({ url: resp.secure_url })
          } catch (err) {
            reject(err)
          }
        } else {
          reject(new Error(`Upload failed: ${xhr.status}`))
        }
      }
      xhr.onerror = () => {
        setUploading(false)
        setUploadProgress(null)
        reject(new Error("Upload error"))
      }
      setUploading(true)
      xhr.send(fd)
    })
  }

  const uploadToCloudinarySigned = async (file: File): Promise<{ url: string }> => {
    try {
      const signRes = await blogApi.uploadBanner()
      const { signature, timestamp, apiKey, cloudName } = signRes

      if (!signature || !timestamp || !apiKey || !cloudName) {
        throw new Error("Invalid signature response from server")
      }

      const url = `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`
      const fd = new FormData()
      fd.append("file", file)
      fd.append("api_key", apiKey)
      fd.append("timestamp", String(timestamp))
      fd.append("signature", signature)

      const resp = await fetch(url, { method: "POST", body: fd })
      if (!resp.ok) {
        const text = await resp.text().catch(() => "")
        throw new Error(`Upload failed: ${resp.status} ${text}`)
      }
      const data = await resp.json()
      return { url: data.secure_url }
    } catch (err) {
      throw new Error(err instanceof Error ? err.message : "Failed to upload (signed)")
    }
  }

  const handleUploadClick = async () => {
    if (!bannerFile) return
    try {
      setUploading(true)
      let result: { url: any }

      const hasUnsignedPreset = Boolean(process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET)
      if (hasUnsignedPreset) {
        result = await uploadToCloudinarySigned(bannerFile)
      } else {
        result = await uploadToCloudinarySigned(bannerFile)
      }

      // Save the returned image url into the editor state so it persists on save
      setFeaturedImage(result.url)
      setBannerPreview(result.url)
    } catch (err) {
      console.error(err)
      setError(err instanceof Error ? err.message : 'Upload failed')
    } finally {
      setUploading(false)
      setUploadProgress(null)
    }
  }

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
            setBannerPreview(post.featuredImage || null)
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

  // keep bannerPreview in sync when featuredImage changes (e.g., after upload)
  useEffect(() => {
    if (featuredImage) setBannerPreview(featuredImage)
  }, [featuredImage])

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

      console.debug('[post-editor] saving postData:', postData)

      if (mode === "create") {
        await adminApi.createPost(postData)
        await fetch('/api/revalidate', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ path: `/posts/${postData.slug}` }),
        })
        setSuccess("Post created successfully!")
        setTimeout(() => router.push("/admin/posts"), 1500)
      } else if (postId) {
        await adminApi.updatePost(postId, { ...postData, isPublished: publish })
        await fetch('/api/revalidate', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ path: `/posts/${postData.slug}` }),
        })
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
                <button
                  type="button"
                  className="btn text-sm bg-muted cursor-pointer rounded p-2 mt-2"
                  onClick={() => fileInputRef.current?.click()}
                >
                  Choose media from your computer
                </button>
              </div>

              <div className="mb-4">
                <label className="block mb-2 font-medium">Banner image</label>
                <div className="flex flex-col gap-2 items-center">
                  <div className="flex w-full flex-col">
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/*"
                      onChange={handleFileChange}
                      className="hidden"
                      id="banner-file-input"
                    />

                  </div>
                  <div className="flex w-full flex-col gap-4">
                    {bannerPreview && (
                      <img src={bannerPreview} alt="banner preview" className="max-h-26 object-cover rounded" />
                    )}

                    <button
                      type="button"
                      disabled={!bannerFile || uploading}
                      onClick={handleUploadClick}
                      className="btn bg-primary cursor-pointer max-w-40 mx-auto rounded text-gray-200 p-2"
                    >
                      {uploading ? `Uploading ${uploadProgress ?? ""}%` : "Upload as Banner"}
                    </button>

                  </div>
                </div>

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
