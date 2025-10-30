import { notFound } from "next/navigation"
import Link from "next/link"
import { ArrowLeft, Folder } from "lucide-react"
import { blogApi } from "../../../lib/api"
import { siteConfig } from "../../../lib/site-config"
import { Metadata } from "next"
import { BlogHeader } from "../../../components/blog-header"
import { Button } from "../../../components/ui/button"
import { Badge } from "../../../components/ui/badge"
import { BlogPostCard } from "../../../components/blog-post-card"

interface CategoryPageServerProps {
  params: { slug: string },
  searchParams?: { page?: string }
}

interface CategoryPageProps {
  params: {
    slug: string
  }
}

export const dynamic = "force-dynamic"
export const fetchCache = "force-no-store"
export const revalidate = 0; 

export async function generateMetadata({ params, searchParams }: CategoryPageServerProps): Promise<Metadata> {
  const category = await blogApi.getCategory(params.slug)
  if (!category) {
    return {}
  }
  const pageNum = searchParams?.page ? parseInt(searchParams.page) : 1;
  const pageSuffix = pageNum > 1 ? ` | Page ${pageNum}` : "";
  return {
    title: `${category.name}${pageSuffix}`,
    description: `${category.description}${pageNum > 1 ? ` (Page ${pageNum})` : ""}`,
    openGraph: {
      title: `${category.name}${pageSuffix} | FAC Categories`,
      description: `${category.description}${pageNum > 1 ? ` (Page ${pageNum})` : ""}`,
      url: `${siteConfig.url}/categories/${category.slug}${pageNum > 1 ? `?page=${pageNum}` : ""}`,
    },
  }
}


export default async function CategoryPage({ params }: CategoryPageProps) {
  const category = await blogApi.getCategory(params.slug)
  if (!category) {
    notFound()
  }
  // Get paginated posts
  const { posts, total, page, pages } = await blogApi.getPostsByCategory(params.slug, 1, 10)
  return (
    <div className="min-h-screen bg-background">
      <BlogHeader />
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <Link href="/categories">
            <Button variant="ghost" size="sm">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Categories
            </Button>
          </Link>
        </div>
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <div className="flex items-center justify-center mb-6">
              <div className="p-4 bg-primary/10 rounded-lg">
                <Folder className="h-8 w-8 text-primary" />
              </div>
            </div>
            <h1 className="text-2xl md:text-4xl font-bold text-foreground mb-4 text-balance">{category.name}</h1>
            <p className="text-base md:text-xl text-muted-foreground mb-6 max-w-2xl mx-auto text-pretty">{category.description}</p>
            <Badge variant="secondary" className="text-base px-4 py-2 text-xs md:text-base">
              {total} {total === 1 ? "publication" : "publications"}
            </Badge>
          </div>
          <section>
            {posts.length > 0 ? (
          <> 
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
                {posts.map((post) => (
                  <BlogPostCard key={post._id || post.id} post={post} />
                ))}
              </div>
                 <div className="flex justify-center gap-4 mt-8">
    <Link href={`/categories/${params.slug}?page=${page - 1}`}>
      <Button disabled={page <= 1}>Previous</Button>
    </Link>
    <span>Page {page} of {pages}</span>
    <Link href={`/categories/${params.slug}?page=${page + 1}`}>
      <Button disabled={page >= pages}>Next</Button>
    </Link>
  </div>
  </>
            ) : (
              <div className="text-center py-12">
                <p className="text-muted-foreground text-lg">No publications in this category yet.</p>
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
