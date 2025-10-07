"use client"

import { useState } from "react"
import { Heart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { blogApi } from "@/lib/api"

interface LikeButtonProps {
  postId: string
  initialLikes: number
}

export function LikeButton({ postId, initialLikes }: LikeButtonProps) {
  const [likes, setLikes] = useState(initialLikes)
  const [isLiked, setIsLiked] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const handleLike = async () => {
    if (isLoading) return

    setIsLoading(true)
    try {
      const { likes: newLikes } = await blogApi.likePost(postId)
      setLikes(newLikes)
      setIsLiked(!isLiked)
    } catch (error) {
      console.error("Failed to like post:", error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Button
      variant={isLiked ? "default" : "outline"}
      size="sm"
      onClick={handleLike}
      disabled={isLoading}
      className={isLiked ? "bg-red-500 hover:bg-red-600 text-white" : ""}
    >
      <Heart className={`h-4 w-4 mr-2 ${isLiked ? "fill-current" : ""}`} />
      {likes}
    </Button>
  )
}
