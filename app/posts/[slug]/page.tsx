import { notFound } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { Calendar, Clock, ArrowLeft } from "lucide-react"
import { BlogHeader } from "@/components/blog-header"
import { ShareButtons } from "@/components/share-buttons"
import { LikeButton } from "@/components/like-button"
import { MarkdownRenderer } from "@/components/markdown-renderer"
import { CommentsSection } from "@/components/comments-section"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { blogApi } from "@/lib/api"
import { siteConfig } from "@/lib/site-config"
import { Metadata } from "next"

interface PostPageProps {
  params: {
    slug: string
  }
}

export async function generateMetadata({ params }: PostPageProps): Promise<Metadata> {
  const post = await blogApi.getPost(params.slug)

  if (!post) {
    return {}
  }

  const publishedTime = new Date(post.publishedAt).toISOString()
  const modifiedTime = new Date(post.updatedAt).toISOString()
  const url = `${siteConfig.url}/posts/${post.slug}`

  return {
    title: post.title,
    description: post.excerpt,
    keywords: [...post.tags, post.category.name, "faith", "art", "culture"],
    authors: [{ name: post.author.name }],
    alternates: {
      canonical: url,
    },
    openGraph: {
      type: "article",
      url,
      title: post.title,
      description: post.excerpt,
      publishedTime,
      modifiedTime,
      authors: [post.author.name],
      tags: post.tags,
      images: [
        {
          url: post.featuredImage,
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.excerpt,
      images: [post.featuredImage],
      creator: "@fac_blog",
    },
  }
}

export default async function PostPage({ params }: PostPageProps) {
  const post = await blogApi.getPost(params.slug)

  if (!post) {
    notFound()
  }

  const readingTime = Math.ceil(post.content.split(" ").length / 200)

  // Structured data for blog post
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.excerpt,
    image: post.featuredImage,
    datePublished: post.publishedAt,
    dateModified: post.updatedAt,
    author: {
      "@type": "Person",
      name: post.author.name,
      url: `${siteConfig.url}/author/${post.author.id}`,
    },
    publisher: {
      "@type": "Organization",
      name: siteConfig.name,
      logo: {
        "@type": "ImageObject",
        url: `${siteConfig.url}/placeholder-logo.png`,
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${siteConfig.url}/posts/${post.slug}`,
    },
    keywords: post.tags.join(", "),
    articleSection: post.category.name,
    wordCount: post.content.split(" ").length,
    timeRequired: `PT${readingTime}M`,
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="min-h-screen bg-background">
        <BlogHeader />

      <main className="container mx-auto px-4 py-8">
        {/* Back Button */}
        <div className="mb-8">
          <Link href="/">
            <Button variant="ghost" size="sm">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Posts
            </Button>
          </Link>
        </div>

        <article className="max-w-4xl mx-auto">
          {/* Hero Section */}
          <div className="mb-8">
            <div className="flex items-center space-x-4 text-sm text-muted-foreground mb-4">
              <Badge variant="secondary" className="bg-primary/90 text-primary-foreground">
                {post.category.name}
              </Badge>
              <div className="flex items-center space-x-1">
                <Calendar className="h-4 w-4" />
                <span>{new Date(post.publishedAt).toLocaleDateString()}</span>
              </div>
              <div className="flex items-center space-x-1">
                <Clock className="h-4 w-4" />
                <span>{readingTime} min read</span>
              </div>
            </div>

            <h1 className="text-5xl font-bold text-foreground mb-6 text-balance">{post.title}</h1>

            <p className="text-xl text-muted-foreground mb-8 text-pretty leading-relaxed">{post.excerpt}</p>

            {/* Author Info */}
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center space-x-4">
                <Avatar className="h-12 w-12">
                  <AvatarImage src={post.author.avatar || "/placeholder.svg"} alt={post.author.name} />
                  <AvatarFallback>
                    {post.author.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <Link href={`/author/${post.author.username}`}>
                    <h3 className="font-semibold text-foreground hover:text-primary transition-colors">
                      {post.author.name}
                    </h3>
                  </Link>
                  <p className="text-sm text-muted-foreground">{post.author.bio}</p>
                </div>
              </div>

              <div className="flex items-center space-x-4">
                <LikeButton postId={post.id} initialLikes={post.likes} />
                <ShareButtons title={post.title} url={`/posts/${post.slug}`} excerpt={post.excerpt} />
              </div>
            </div>

            {/* Featured Image */}
            <div className="relative h-96 rounded-lg overflow-hidden mb-8">
              <Image
                src={post.featuredImage || "/placeholder.svg"}
                alt={post.title}
                fill
                className="object-cover"
                priority
              />
            </div>
          </div>

          {/* Content */}
          <div className="mb-12">
            <MarkdownRenderer content={post.content} />
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-8">
            {post.tags.map((tag) => (
              <Badge key={tag} variant="outline">
                {tag}
              </Badge>
            ))}
          </div>

          {/* Author Card */}
          <Card className="mb-12">
            <CardContent className="p-6">
              <div className="flex items-start space-x-4">
                <Avatar className="h-16 w-16">
                  <AvatarImage src={post.author.avatar || "/placeholder.svg"} alt={post.author.name} />
                  <AvatarFallback>
                    {post.author.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-foreground mb-2">About {post.author.name}</h3>
                  <p className="text-muted-foreground mb-4 text-pretty">{post.author.bio}</p>
                  <div className="flex space-x-4">
               
                    {post.author.social.facebook && (
                      <a
                        href={`https://facebook.com/${post.author.social.facebook}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary hover:underline"
                      >
                        Facebook
                      </a>
                    )}
                    {post.author.social.linkedin && (
                      <a
                        href={`https://linkedin.com/in/${post.author.social.linkedin}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary hover:underline"
                      >
                        LinkedIn
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <CommentsSection postId={post.id} initialCommentsCount={post.commentsCount} />
        </article>
      </main>
      </div>
    </>
  )
}

export async function generateStaticParams() {
  // In a real app, you'd fetch all post slugs from your API
  return [
    { slug: "when-faith-finds-a-canvas" },
    { slug: "the-sacred-in-the-ordinary" },
    { slug: "the-art-of-worship" },
    { slug: "culture-without-wonder" },
    { slug: "faith-in-a-skeptical-world" },
    { slug: "intersection-faith-art-culture" },
  ]
}
