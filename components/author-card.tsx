import Link from "next/link"
import { User, Twitter, Github, Linkedin } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import type { Author } from "@/lib/blog-data"

interface AuthorCardProps {
  author: Author
  postCount?: number
}

export function AuthorCard({ author, postCount }: AuthorCardProps) {
  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow duration-300">
      <CardContent className="p-6">
        <div className="flex items-start space-x-4">
          <Avatar className="h-16 w-16">
            <AvatarImage src={author.avatar || "/placeholder.svg"} alt={author.name} />
            <AvatarFallback>
              <User className="h-8 w-8" />
            </AvatarFallback>
          </Avatar>

          <div className="flex-1">
            <Link href={`/authors/${author.id}`}>
              <h3 className="text-xl font-semibold text-foreground hover:text-primary transition-colors mb-2">
                {author.name}
              </h3>
            </Link>

            <p className="text-muted-foreground mb-4 text-pretty">{author.bio}</p>

            {postCount !== undefined && (
              <p className="text-sm text-muted-foreground mb-4">
                {postCount} {postCount === 1 ? "post" : "posts"} published
              </p>
            )}

            <div className="flex items-center space-x-3">
              {author.social.twitter && (
                <a
                  href={`https://twitter.com/${author.social.twitter.replace("@", "")}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  <Twitter className="h-4 w-4" />
                </a>
              )}
              {author.social.github && (
                <a
                  href={`https://github.com/${author.social.github}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  <Github className="h-4 w-4" />
                </a>
              )}
              {author.social.linkedin && (
                <a
                  href={`https://linkedin.com/in/${author.social.linkedin}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  <Linkedin className="h-4 w-4" />
                </a>
              )}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
