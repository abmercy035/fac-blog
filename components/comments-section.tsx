"use client"

import { useEffect, useState } from "react"
import { MessageCircle } from "lucide-react"
import { CommentForm } from "./comment-form"
import { CommentItem } from "./comment-item"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import type { Comment } from "@/lib/blog-data"
import { blogApi } from "@/lib/api"

interface CommentsSectionProps {
  postId: string
  initialCommentsCount: number
}

export function CommentsSection({ postId, initialCommentsCount }: CommentsSectionProps) {
  const [comments, setComments] = useState<Comment[]>([])
  const [loading, setLoading] = useState(true)
  const [commentsCount, setCommentsCount] = useState(initialCommentsCount)

  useEffect(() => {
    loadComments()
  }, [postId])

  const loadComments = async () => {
    try {
      setLoading(true)
      const fetchedComments = await blogApi.getComments(postId)
      setComments(fetchedComments)
      setCommentsCount(fetchedComments.length)
    } catch (error) {
      console.error("Failed to load comments:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleCommentAdded = (newComment: Comment) => {
    setComments((prev) => [...prev, newComment])
    setCommentsCount((prev) => prev + 1)
  }

  return (
    <div className="space-y-8">
      {/* Comments List */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <MessageCircle className="h-5 w-5" />
            <span>Comments ({commentsCount})</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="space-y-4">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="animate-pulse">
                  <div className="flex space-x-4">
                    <div className="bg-muted rounded-full h-10 w-10"></div>
                    <div className="flex-1 space-y-2">
                      <div className="bg-muted rounded h-4 w-1/4"></div>
                      <div className="bg-muted rounded h-4 w-3/4"></div>
                      <div className="bg-muted rounded h-4 w-1/2"></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : comments.length > 0 ? (
            <div className="space-y-6">
              {comments.map((comment) => (
                <CommentItem key={comment.id} comment={comment} />
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <MessageCircle className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground">No comments yet. Be the first to share your thoughts!</p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Comment Form */}
      <CommentForm postId={postId} onCommentAdded={handleCommentAdded} />
    </div>
  )
}
