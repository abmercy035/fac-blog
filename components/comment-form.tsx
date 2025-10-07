"use client"

import type React from "react"

import { useState } from "react"
import { Send } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { blogApi } from "@/lib/api"
import type { Comment } from "@/lib/blog-data"

interface CommentFormProps {
  postId: string
  onCommentAdded: (comment: Comment) => void
}

export function CommentForm({ postId, onCommentAdded }: CommentFormProps) {
  const [author, setAuthor] = useState("")
  const [email, setEmail] = useState("")
  const [content, setContent] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!author.trim() || !email.trim() || !content.trim()) {
      return
    }

    setIsSubmitting(true)
    try {
      const newComment = await blogApi.addComment(postId, author.trim(), email.trim(), content.trim())
      onCommentAdded(newComment)

      // Reset form
      setAuthor("")
      setEmail("")
      setContent("")
    } catch (error) {
      console.error("Failed to add comment:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl">Leave a Comment</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Input
                placeholder="Your name"
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
                required
                disabled={isSubmitting}
              />
            </div>
            <div>
              <Input
                type="email"
                placeholder="Your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                disabled={isSubmitting}
              />
            </div>
          </div>

          <Textarea
            placeholder="Write your comment..."
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
            disabled={isSubmitting}
            rows={4}
            className="resize-none"
          />

          <Button type="submit" disabled={isSubmitting || !author.trim() || !email.trim() || !content.trim()}>
            {isSubmitting ? (
              "Posting..."
            ) : (
              <>
                <Send className="h-4 w-4 mr-2" />
                Post Comment
              </>
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
