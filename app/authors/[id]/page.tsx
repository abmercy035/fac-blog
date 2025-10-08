import { notFound } from "next/navigation"
import Link from "next/link"
import { ArrowLeft, Twitter, Github, Linkedin, Mail, Facebook } from "lucide-react"
import { BlogHeader } from "@/components/blog-header"
import { BlogPostCard } from "@/components/blog-post-card"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { blogApi } from "@/lib/api"

interface AuthorPageProps {
  params: {
    id: string
  }
}

export default async function AuthorPage({ params }: AuthorPageProps) {
  const author = await blogApi.getAuthor(params.id)

  if (!author) {
    notFound()
  }

  const posts = await blogApi.getPostsByAuthor(params.id)

  return (
    <div className="min-h-screen bg-background">
      <BlogHeader />

      <main className="container mx-auto px-4 py-8">
        {/* Back Button */}
        <div className="mb-8">
          <Link href="/authors">
            <Button variant="ghost" size="sm">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Authors
            </Button>
          </Link>
        </div>

        <div className="max-w-4xl mx-auto">
          {/* Author Profile */}
          <div className="text-center mb-12">
            <Avatar className="h-32 w-32 mx-auto mb-6">
              <AvatarImage src={author.avatar || "/placeholder.svg"} alt={author.name} />
              <AvatarFallback className="text-2xl">
                {author.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </AvatarFallback>
            </Avatar>

            <h1 className="text-4xl font-bold text-foreground mb-4 text-balance">{author.name}</h1>

            <p className="text-xl text-muted-foreground mb-6 max-w-2xl mx-auto text-pretty">{author.bio}</p>

            <div className="flex items-center justify-center space-x-6 mb-8">
              <a
                href={`mailto:${author.email}`}
                className="flex items-center space-x-2 text-muted-foreground hover:text-primary transition-colors"
              >
                <Mail className="h-4 w-4" />
                <span>Email</span>
              </a>

              {author.social.twitter && (
                <a
                  href={`https://twitter.com/${author.social.twitter.replace("@", "")}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-2 text-muted-foreground hover:text-primary transition-colors"
                >
                  <Twitter className="h-4 w-4" />
                  <span>Twitter</span>
                </a>
              )}

              {author.social.facebook && (
                <a
                  href={`https://web.facebook.com/${author.social.facebook}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-2 text-muted-foreground hover:text-primary transition-colors"
                >
                  <Facebook className="h-4 w-4" />
                  <span>Facebook</span>
                </a>
              )}

              {author.social.linkedin && (
                <a
                  href={`https://linkedin.com/in/${author.social.linkedin}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-2 text-muted-foreground hover:text-primary transition-colors"
                >
                  <Linkedin className="h-4 w-4" />
                  <span>LinkedIn</span>
                </a>
              )}
            </div>

            <p className="text-muted-foreground">
              {posts.length} {posts.length === 1 ? "article" : "articles"} published
            </p>
          </div>

          {/* Author's Posts */}
          <section>
            <h2 className="text-3xl font-semibold text-foreground mb-8">Articles by {author.name}</h2>

            {posts.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {posts.map((post) => (
                  <BlogPostCard key={post.id} post={post} />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-muted-foreground text-lg">No articles published yet.</p>
              </div>
            )}
          </section>
        </div>
      </main>
    </div>
  )
}

export async function generateStaticParams() {
  const authors = await blogApi.getAuthors()
  return authors.map((author) => ({
    id: author.id,
  }))
}

export async function generateMetadata({ params }: AuthorPageProps) {
  const author = await blogApi.getAuthor(params.id)

  if (!author) {
    return {
      title: "Author Not Found",
    }
  }

  return {
    title: `${author.name} | TechBlog Authors`,
    description: author.bio,
  }
}
