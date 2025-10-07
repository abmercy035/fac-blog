import Link from "next/link"
import { Folder, ArrowRight } from "lucide-react"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import type { Category } from "@/lib/blog-data"

interface CategoryCardProps {
  category: Category
  postCount?: number
}

export function CategoryCard({ category, postCount }: CategoryCardProps) {
  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow duration-300 bg-card border-border">
      <CardContent className="p-6">
        <div className="flex items-start space-x-4 mb-4">
          <div className="p-3 bg-primary/10 rounded-lg">
            <Folder className="h-6 w-6 text-primary" />
          </div>
          <div className="flex-1">
            <Link href={`/categories/${category.slug}`}>
              <h3 className="text-xl font-semibold text-foreground hover:text-primary transition-colors mb-2">
                {category.name}
              </h3>
            </Link>
            <p className="text-muted-foreground text-pretty">{category.description}</p>
          </div>
        </div>

        {postCount !== undefined && (
          <Badge variant="secondary" className="mb-4">
            {postCount} {postCount === 1 ? "post" : "posts"}
          </Badge>
        )}
      </CardContent>

      <CardFooter className="px-6 py-4 bg-muted/30">
        <Link href={`/categories/${category.slug}`} className="w-full">
          <Button variant="outline" className="w-full bg-transparent">
            View Posts
            <ArrowRight className="h-4 w-4 ml-2" />
          </Button>
        </Link>
      </CardFooter>
    </Card>
  )
}
