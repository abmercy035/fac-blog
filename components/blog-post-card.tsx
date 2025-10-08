import Link from "next/link"
import Image from "next/image"
import { Heart, MessageCircle, Calendar, User } from "lucide-react"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import type { BlogPost } from "@/lib/blog-data"

interface BlogPostCardProps {
  post: BlogPost
  featured?: boolean
}

export function BlogPostCard({ post, featured = false }: BlogPostCardProps) {
  if (featured) {
    return (
      <Card className="overflow-hidden shadow-none transition-all duration-300 bg-transparent border-0 h-full flex flex-col">
        <div className="relative w-full h-[50%] min-h-[250px] overflow-hidden flex-shrink-0">
          <Image
            src={post.featuredImage || "/placeholder.svg"}
            alt={post.title}
            fill
            className="object-cover transition-transform duration-300 hover:scale-105"
          />
          {/* <div className="absolute top-4 left-4">
            <Badge variant="secondary" className="bg-primary/90 text-primary-foreground font-serif text-base">
              {post.category.name}
            </Badge>
          </div> */}
        </div>

        <CardContent className="p-6 pt-8 flex-grow flex flex-col">
          <div className="flex items-center space-x-6 text-lg text-muted-foreground mb-5 font-serif">
            <div className="flex items-center space-x-2 md:text-base text-sm">
              <User className="h-5 w-5" />
              <span>{post.author.name}</span>
            </div>
            <div className="flex items-center space-x-2 md:text-base text-sm">
              <Calendar className="h-5 w-5" />
              <span>{new Date(post.publishedAt).toLocaleDateString()}</span>
            </div>
          </div>

          <Link href={`/posts/${post.slug}`}>
            <h3 className="md:text-5xl text-xl font-bold text-foreground mb-6 hover:text-primary transition-colors leading-tight">
              {post.title}
            </h3>
          </Link>

          <p className="md:text-xl text-base text-muted-foreground mb-6 leading-relaxed flex-grow">{post.excerpt}</p>

          <div className="flex flex-wrap gap-3">
            {post.tags.slice(0, 3).map((tag) => (
              <Badge key={tag} variant="outline" className="md:text-base text-sm py-1 px-3">
                {tag}
              </Badge>
            ))}
          </div>
        </CardContent>

        <CardFooter className="px-6 pb-6 pt-0 bg-transparent flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-primary">
              <Heart className="h-4 w-4 mr-1" />
              {post.likes}
            </Button>
            <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-primary">
              <MessageCircle className="h-4 w-4 mr-1" />
              {post.commentsCount}
            </Button>
          </div>

          <Link href={`/posts/${post.slug}`}>
            <Button variant="outline" size="sm">
              Read More
            </Button>
          </Link>
        </CardFooter>
      </Card>
    )
  }

  // Horizontal layout for non-featured cards
  return (
    <Card className="overflow-hidden shadow-none transition-all duration-300 bg-transparent border-0 h-full flex flex-row">
      <div className="relative aspect-square md:w-2/5 w-2/6 flex-shrink-0">
        <Image
          src={post.featuredImage || "/placeholder.svg"}
          alt={post.title}
          fill
          className="object-cover transition-transform duration-300 hover:scale-105"
        />
        {/* <div className="absolute top-4 left-4">
          <Badge variant="secondary" className="bg-primary/90 text-primary-foreground font-serif text-sm">
            {post.category.name}
          </Badge>
        </div> */}
      </div>

      <CardContent className="md:p-5 p-2 flex-grow flex flex-col justify-between">
        <div>
          <Link href={`/posts/${post.slug}`}>
            <h3 className="md:text-2xl text-lg font-bold text-foreground mb-3 hover:text-primary transition-colors line-clamp-2 leading-tight">
              {post.title}
            </h3>
          </Link>

          <p className="text-muted-foreground text-sm mb-4 line-clamp-2 leading-relaxed">{post.excerpt}</p>
        </div>

        <div className="flex flex-wrap gap-2">
          {post.tags.slice(0, 3).map((tag) => (
            <Badge key={tag} variant="outline" className="md:text-sm text-xs">
              {tag}
            </Badge>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
