import { MetadataRoute } from "next"
import { siteConfig } from "@/lib/site-config"

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
	const baseUrl = siteConfig.url

	let blogPosts: any[] = []
	let categories: any[] = []
	let authors: any[] = []

	try {
		const API_BASE = process.env.BACKEND_URL || 'http://localhost:5000/api'

		const [postsResponse, categoriesResponse, authorsResponse] = await Promise.all([
			fetch(`${API_BASE}/posts?limit=100`).then(res => res.ok ? res.json() : { posts: [] }),
			fetch(`${API_BASE}/categories`).then(res => res.ok ? res.json() : []),
			fetch(`${API_BASE}/authors`).then(res => res.ok ? res.json() : [])
		])

		blogPosts = postsResponse.posts || postsResponse
		categories = categoriesResponse
		authors = authorsResponse
	} catch (error) {
		console.error('Error fetching sitemap data:', error)
	}

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

	const postPages = blogPosts
		.filter((post) => post.isPublished)
		.map((post) => ({
			url: `${baseUrl}/posts/${post.slug}`,
			lastModified: new Date(post.updatedAt),
			changeFrequency: "weekly" as const,
			priority: 0.9,
		}))

	const categoryPages = categories.map((category) => ({
		url: `${baseUrl}/categories/${category.slug}`,
		lastModified: new Date(),
		changeFrequency: "weekly" as const,
		priority: 0.7,
	}))

	const authorPages = authors.map((author) => ({
		url: `${baseUrl}/author/${author.username}`,
		lastModified: new Date(),
		changeFrequency: "monthly" as const,
		priority: 0.6,
	}))

	return [...staticPages, ...postPages, ...categoryPages, ...authorPages]
}
