import { MetadataRoute } from "next"
import { blogPosts, categories, authors } from "@/lib/blog-data"
import { siteConfig } from "@/lib/site-config"

export default function sitemap(): MetadataRoute.Sitemap {
	const baseUrl = siteConfig.url

	// Static pages
	const staticPages = [
		{
			url: baseUrl,
			lastModified: new Date(),
			changeFrequency: "daily" as const,
			priority: 1,
		},
		{
			url: `${baseUrl}/about`,
			lastModified: new Date(),
			changeFrequency: "monthly" as const,
			priority: 0.8,
		},
		{
			url: `${baseUrl}/categories`,
			lastModified: new Date(),
			changeFrequency: "weekly" as const,
			priority: 0.8,
		},
		{
			url: `${baseUrl}/author`,
			lastModified: new Date(),
			changeFrequency: "weekly" as const,
			priority: 0.7,
		},
		{
			url: `${baseUrl}/search`,
			lastModified: new Date(),
			changeFrequency: "weekly" as const,
			priority: 0.6,
		},
		{
			url: `${baseUrl}/services`,
			lastModified: new Date(),
			changeFrequency: "monthly" as const,
			priority: 0.8,
		},
	]

	// Blog posts
	const postPages = blogPosts
		.filter((post) => post.isPublished)
		.map((post) => ({
			url: `${baseUrl}/posts/${post.slug}`,
			lastModified: new Date(post.updatedAt),
			changeFrequency: "weekly" as const,
			priority: 0.9,
		}))

	// Categories
	const categoryPages = categories.map((category) => ({
		url: `${baseUrl}/categories/${category.slug}`,
		lastModified: new Date(),
		changeFrequency: "weekly" as const,
		priority: 0.7,
	}))

	// Authors
	const authorPages = authors.map((author) => ({
		url: `${baseUrl}/author/${author.username}`,
		lastModified: new Date(),
		changeFrequency: "monthly" as const,
		priority: 0.6,
	}))

	return [...staticPages, ...postPages, ...categoryPages, ...authorPages]
}
