import { notFound } from "next/navigation"
import Link from "next/link"
import { ArrowLeft, Folder } from "lucide-react"
import { BlogHeader } from "@/components/blog-header"
import { BlogPostCard } from "@/components/blog-post-card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { blogApi } from "@/lib/api"
import { siteConfig } from "@/lib/site-config"
import { Metadata } from "next"

interface CategoryPageProps {
  params: {
    slug: string
  }
}

export async function generateMetadata({ params }: CategoryPageProps): Promise<Metadata> {
  const category = await blogApi.getCategory(params.slug)

  if (!category) {
    return {}
  }

  return {
    title: category.name,
    description: category.description,
    openGraph: {
      title: `${category.name} | FAC Categories`,
      description: category.description,
      url: `${siteConfig.url}/categories/${category.slug}`,
    },
  }
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const category = await blogApi.getCategory(params.slug)

  if (!category) {
    notFound()
  }

  const posts = await blogApi.getPostsByCategory(params.slug)

  return (
    <div className="min-h-screen bg-background">
      <BlogHeader />

      <main className="container mx-auto px-4 py-8">
        {/* Back Button */}
        <div className="mb-8">
          <Link href="/categories">
            <Button variant="ghost" size="sm">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Categories
            </Button>
          </Link>
        </div>

        <div className="max-w-4xl mx-auto">
          {/* Category Header */}
          <div className="text-center mb-12">
            <div className="flex items-center justify-center mb-6">
              <div className="p-4 bg-primary/10 rounded-lg">
                <Folder className="h-8 w-8 text-primary" />
              </div>
            </div>

            <h1 className="text-2xl md:text-4xl font-bold text-foreground mb-4 text-balance">{category.name}</h1>

            <p className="text-base md:text-xl text-muted-foreground mb-6 max-w-2xl mx-auto text-pretty">{category.description}</p>

            <Badge variant="secondary" className="text-base px-4 py-2 text-xs md:text-base">
              {posts.length} {posts.length === 1 ? "article" : "articles"}
            </Badge>
          </div>

          {/* Category Posts */}
          <section>
            {posts.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
                {posts.map((post) => (
                  <BlogPostCard key={post.id} post={post} />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-muted-foreground text-lg">No articles in this category yet.</p>
              </div>
            )}
          </section>
        </div>
      </main>
    </div>
  )
}

export async function generateStaticParams() {
  const categories = await blogApi.getCategories()
  return categories.map((category) => ({
    slug: category.slug,
  }))
}
