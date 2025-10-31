import { BlogHeader } from "@/components/blog-header"
import { CategoryCard } from "@/components/category-card"
import { blogApi } from "@/lib/api"


  export const dynamic = "force-dynamic"
  export const fetchCache = "force-no-store"
  export const revalidate = 0;

export default async function CategoriesPage() {
  let categories: any[] = []

  try {
    categories = await blogApi.getCategories();
  } catch (e) {
    categories = []
  }



  return (
    <div className="min-h-screen bg-background">
      <BlogHeader />

      <main className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-2xl md:text-4xl font-bold text-foreground mb-4 text-balance">Browse by Category</h1>
            <p className="text-base md:text-xl text-muted-foreground text-pretty">
              Explore pieces organized by topics and themes
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {categories.map((category) => (
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
  description: "Browse publications by category - Poetry & Prose, Faith & Spirituality, Culture & Society",
}
