import { BlogHeader } from "@/components/blog-header"
import { CategoryCard } from "@/components/category-card"
import { blogApi } from "@/lib/api"

export default async function CategoriesPage() {
  const categories = await blogApi.getCategories()

  // Get post counts for each category
  const categoriesWithPostCounts = await Promise.all(
    categories.map(async (category) => {
      const posts = await blogApi.getPostsByCategory(category.slug)
      return {
        ...category,
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
            <h1 className="text-4xl font-bold text-foreground mb-4 text-balance">Browse by Category</h1>
            <p className="text-xl text-muted-foreground text-pretty">
              Explore articles organized by topics and technologies
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {categoriesWithPostCounts.map((category) => (
              <CategoryCard key={category.id} category={category} postCount={category.postCount} />
            ))}
          </div>
        </div>
      </main>
    </div>
  )
}

export const metadata = {
  title: "Categories | FAC",
  description: "Browse articles by category - Frontend, Backend, DevOps and more",
}
