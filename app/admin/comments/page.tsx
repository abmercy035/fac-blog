"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { adminApi } from "@/lib/admin-api"
import type { Comment } from "@/lib/blog-data"
import { formatDistanceToNow } from "date-fns"
import { Trash2, Edit, Mail } from "lucide-react"
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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"

export default function AdminCommentsPage() {
  const [comments, setComments] = useState<Comment[]>([])
  const [loading, setLoading] = useState(true)
  const [deletingId, setDeletingId] = useState<string | null>(null)
  const [editingComment, setEditingComment] = useState<Comment | null>(null)
  const [editContent, setEditContent] = useState("")
  const [editDialogOpen, setEditDialogOpen] = useState(false)

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const data = await adminApi.getAllComments()
        setComments(data)
      } catch (error) {
        console.error("Failed to fetch comments:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchComments()
  }, [])

  const handleDelete = async (id: string) => {
    setDeletingId(id)
    try {
      await adminApi.deleteComment(id)
      setComments(comments.filter((comment) => (comment._id || comment.id) !== id))
    } catch (error) {
      console.error("Failed to delete comment:", error)
    } finally {
      setDeletingId(null)
    }
  }

  const handleEdit = async () => {
    if (!editingComment) return

    try {
      const commentId = editingComment._id || editingComment.id
      const updatedComment = await adminApi.updateComment(commentId, editContent)
      setComments(comments.map((c) => ((c._id || c.id) === (updatedComment._id || updatedComment.id) ? updatedComment : c)))
      setEditingComment(null)
      setEditContent("")
      setEditDialogOpen(false) 
    } catch (error) {
      console.error("Failed to update comment:", error)
    }
  }

  const openEditDialog = (comment: Comment) => {
    setEditingComment(comment)
    setEditContent(comment.content)
    setEditDialogOpen(true)
  }

  const closeEditDialog = () => {
    setEditingComment(null)
    setEditContent("")
    setEditDialogOpen(false)
  }

  if (loading) {
    return (
      <div className="space-y-6">
        <h1 className="text-3xl font-bold">Comments</h1>
        <div className="grid gap-4">
          {[...Array(3)].map((_, i) => (
            <Card key={i}>
              <CardHeader>
                <div className="h-4 bg-muted rounded animate-pulse mb-2" />
                <div className="h-16 bg-muted rounded animate-pulse" />
              </CardHeader>
            </Card>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Comments</h1>
        <p className="text-muted-foreground">Moderate user comments</p>
      </div>

      <div className="grid gap-4">
        {comments.map((comment) => (
          <Card key={comment._id || comment.id}>
            <CardHeader>
              <div className="flex justify-between items-start">
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <CardTitle className="text-lg">{comment.author}</CardTitle>
                    <div className="flex items-center text-sm text-muted-foreground">
                      <Mail className="h-3 w-3 mr-1" />
                      {comment.email}
                    </div>
                  </div>
                  <CardDescription>
                    {formatDistanceToNow(new Date(comment.createdAt), { addSuffix: true })}
                  </CardDescription>
                </div>
                <div className="flex space-x-2">
                  <Dialog open={editDialogOpen} onOpenChange={setEditDialogOpen}>
                    <DialogTrigger asChild>
                      <Button variant="outline" size="sm" onClick={() => openEditDialog(comment)}>
                        <Edit className="h-4 w-4" />
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Edit Comment</DialogTitle>
                        <DialogDescription>Make changes to the comment content.</DialogDescription>
                      </DialogHeader>
                      <div className="space-y-4">
                        <div>
                          <Label htmlFor="content">Content</Label>
                          <Textarea
                            id="content"
                            value={editContent}
                            onChange={(e) => setEditContent(e.target.value)}
                            rows={4}
                          />
                        </div>
                      </div>
                      <DialogFooter>
                        <Button variant="outline" onClick={closeEditDialog}>
                          Cancel
                        </Button>
                        <Button onClick={handleEdit}>Save Changes</Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button variant="outline" size="sm" disabled={deletingId === (comment._id || comment.id)}>
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>Delete Comment</AlertDialogTitle>
                        <AlertDialogDescription>
                          Are you sure you want to delete this comment by {comment.author}? This action cannot be
                          undone.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction
                          onClick={() => handleDelete(comment._id || comment.id)}
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
              <p className="text-sm leading-relaxed">{comment.content}</p>
            </CardContent>
          </Card>
        ))}

        {comments.length === 0 && (
          <Card>
            <CardContent className="text-center py-8">
              <p className="text-muted-foreground">No comments found</p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
