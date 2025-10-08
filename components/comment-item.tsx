import { formatDistanceToNow } from "date-fns"
import { User } from "lucide-react"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import type { Comment } from "@/lib/blog-data"

interface CommentItemProps {
  comment: Comment
}

export function CommentItem({ comment }: CommentItemProps) {
  return (
    <div className="flex space-x-4 p-4 border border-border rounded-lg bg-card/50">
      <Avatar className="h-10 w-10">
        <AvatarFallback>
          <User className="h-5 w-5" />
        </AvatarFallback>
      </Avatar>

      <div className="flex-1">
        <div className="flex items-center space-x-2 mb-2">
          <h4 className="font-semibold text-foreground text-sm md:text-base">{comment.author}</h4>
          <span className="text-xs md:text-sm text-muted-foreground">
            {formatDistanceToNow(new Date(comment.createdAt), { addSuffix: true })}
          </span>
        </div>

        <p className="text-muted-foreground text-pretty leading-relaxed text-sm md:text-base">{comment.content}</p>

        {comment.replies && comment.replies.length > 0 && (
          <div className="mt-4 space-y-4 pl-4 border-l-2 border-border">
            {comment.replies.map((reply) => (
              <CommentItem key={reply.id} comment={reply} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
