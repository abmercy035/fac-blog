import { BlogHeader } from "@/components/blog-header"
import { AuthorCard } from "@/components/author-card"
import { blogApi } from "@/lib/api"

export default async function AuthorsPage() {
  const authors = await blogApi.getAuthors()

  const authorsWithPostCounts = await Promise.all(
    authors.map(async (author) => {
      const {posts} = await blogApi.getPostsByAuthor(author.username)
      return {
        ...author,
        postCount: posts.length,
      }
    }),
  )

  return (
    <div className="min-h-screen bg-background">
      <BlogHeader />

      <main className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-foreground mb-4 text-balance">Meet The Author</h1>
            <p className="text-xl text-muted-foreground text-pretty">
              Talented writer sharing her expertise and insights
            </p>
          </div>

          <div className="grid grid-cols-1 gap-8">
            {authorsWithPostCounts.map((author) => (
              <AuthorCard key={author.id} author={author} postCount={author.postCount} />
            ))}
          </div>
        </div>
      </main>
    </div>
  )
}

export const metadata = {
  title: "Author | FAC",
  description: "Meet the talented author behind FAC's insightful articles",
}
