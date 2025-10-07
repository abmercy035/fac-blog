import {
  type BlogPost,
  type Comment,
  type Author,
  type Category,
  blogPosts,
  comments,
  authors,
  categories,
} from "./blog-data"

// Simulate API delay
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

export const blogApi = {
  // Posts
  async getPosts(page = 1, limit = 10): Promise<{ posts: BlogPost[]; total: number }> {
    await delay(300)
    const start = (page - 1) * limit
    const end = start + limit
    return {
      posts: blogPosts.slice(start, end),
      total: blogPosts.length,
    }
  },

  async getPost(slug: string): Promise<BlogPost | null> {
    await delay(200)
    return blogPosts.find((post) => post.slug === slug) || null
  },

  async getPostById(id: string): Promise<BlogPost | null> {
    await delay(200)
    return blogPosts.find((post) => post.id === id) || null
  },

  async getPostsByCategory(categorySlug: string): Promise<BlogPost[]> {
    await delay(300)
    return blogPosts.filter((post) => post.category.slug === categorySlug)
  },

  async getPostsByAuthor(authorId: string): Promise<BlogPost[]> {
    await delay(300)
    return blogPosts.filter((post) => post.author.id === authorId)
  },

  async searchPosts(query: string): Promise<BlogPost[]> {
    await delay(400)
    const lowercaseQuery = query.toLowerCase()
    return blogPosts.filter(
      (post) =>
        post.title.toLowerCase().includes(lowercaseQuery) ||
        post.content.toLowerCase().includes(lowercaseQuery) ||
        post.tags.some((tag) => tag.toLowerCase().includes(lowercaseQuery)),
    )
  },

  async likePost(postId: string): Promise<{ likes: number }> {
    await delay(200)
    const post = blogPosts.find((p) => p.id === postId)
    if (post) {
      post.likes += 1
      return { likes: post.likes }
    }
    throw new Error("Post not found")
  },

  // Comments
  async getComments(postId: string): Promise<Comment[]> {
    await delay(300)
    return comments.filter((comment) => comment.postId === postId)
  },

  async addComment(postId: string, author: string, email: string, content: string): Promise<Comment> {
    await delay(400)
    const newComment: Comment = {
      id: Date.now().toString(),
      postId,
      author,
      email,
      content,
      createdAt: new Date().toISOString(),
    }
    comments.push(newComment)

    // Update comment count
    const post = blogPosts.find((p) => p.id === postId)
    if (post) {
      post.commentsCount += 1
    }

    return newComment
  },

  // Authors
  async getAuthors(): Promise<Author[]> {
    await delay(200)
    return authors
  },

  async getAuthor(id: string): Promise<Author | null> {
    await delay(200)
    return authors.find((author) => author.id === id) || null
  },

  // Categories
  async getCategories(): Promise<Category[]> {
    await delay(200)
    return categories
  },

  async getCategory(slug: string): Promise<Category | null> {
    await delay(200)
    return categories.find((category) => category.slug === slug) || null
  },
}
