import Link from "next/link"
import { Button } from "@/components/ui/button"
import { BlogHeader } from "@/components/blog-header"

export default function NotFound() {
  return (
    <div className="min-h-screen bg-background">
      <BlogHeader />
      <div className="container mx-auto px-4 py-20 text-center">
        <h1 className="text-6xl font-bold text-foreground mb-4">404</h1>
        <h2 className="text-2xl font-semibold text-muted-foreground mb-6">Post Not Found</h2>
        <p className="text-muted-foreground mb-8 max-w-md mx-auto">
          The blog post you're looking for doesn't exist or has been moved.
        </p>
        <Link href="/">
          <Button size="lg">Back to Home</Button>
        </Link>
      </div>
    </div>
  )
}
