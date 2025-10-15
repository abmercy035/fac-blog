import apiClient from "./axios"
import type { BlogPost, Comment, Author, Category } from "./blog-data"

export const blogApi = {

  async getPosts(page = 1, limit = 10): Promise<{ posts: BlogPost[]; total: number; pages: number }> {
    try {
      const response = await apiClient.get(`/posts?page=${page}&limit=${limit}`)
      console.log(response)
      return response.data
    } catch (error: any) {
      throw new Error(error.response?.data?.message || "Failed to fetch posts")
    }
  },

  async getPost(slug: string): Promise<BlogPost | null> {
    try {
      const response = await apiClient.get(`/posts/${slug}`)
      return response.data
    } catch (error: any) {
      if (error.response?.status === 404) return null
      throw new Error(error.response?.data?.message || "Failed to fetch post")
    }
  },

  async getPostById(id: string): Promise<BlogPost | null> {
    try {
      const response = await apiClient.get(`/posts/id/${id}`)
      return response.data
    } catch (error: any) {
      if (error.response?.status === 404) return null
      throw new Error(error.response?.data?.message || "Failed to fetch post")
    }
  },

  async getPostsByCategory(categorySlug: string): Promise<BlogPost[]> {
    try {
      const response = await apiClient.get(`/posts/category/${categorySlug}`)
      return response.data
    } catch (error: any) {
      throw new Error(error.response?.data?.message || "Failed to fetch posts by category")
    }
  },

  async getPostsByAuthor(authorId: string): Promise<BlogPost[]> {
    try {
      const response = await apiClient.get(`/posts/author/${authorId}`)
      return response.data
    } catch (error: any) {
      throw new Error(error.response?.data?.message || "Failed to fetch posts by author")
    }
  },

  async searchPosts(query: string): Promise<BlogPost[]> {
    try {
      const response = await apiClient.get(`/posts/search?q=${encodeURIComponent(query)}`)
      return response.data
    } catch (error: any) {
      throw new Error(error.response?.data?.message || "Failed to search posts")
    }
  },

  async likePost(postId: string): Promise<{ likes: number }> {
    try {
      const response = await apiClient.post(`/posts/${postId}/like`)
      return response.data
    } catch (error: any) {
      throw new Error(error.response?.data?.message || "Failed to like post")
    }
  },

  async getComments(postId: string): Promise<Comment[]> {
    try {
      const response = await apiClient.get(`/comments/${postId}`)
      return response.data
    } catch (error: any) {
      throw new Error(error.response?.data?.message || "Failed to fetch comments")
    }
  },

  async addComment(postId: string, author: string, email: string, content: string): Promise<Comment> {
    try {
      const response = await apiClient.post("/comments", {
        postId,
        author,
        email,
        content,
      })
      return response.data
    } catch (error: any) {
      throw new Error(error.response?.data?.message || "Failed to add comment")
    }
  },

  async getAuthors(): Promise<Author[]> {
    try {
      const response = await apiClient.get("/authors")
      return response.data
    } catch (error: any) {
      throw new Error(error.response?.data?.message || "Failed to fetch authors")
    }
  },

  async getAuthor(username: string): Promise<Author | null> {
    try {
      const response = await apiClient.get(`/authors/${username}`)
      return response.data
    } catch (error: any) {
      if (error.response?.status === 404) return null
      throw new Error(error.response?.data?.message || "Failed to fetch author")
    }
  },

  async getCategories(): Promise<Category[]> {
    try {
      const response = await apiClient.get("/categories")
      return response.data
    } catch (error: any) {
      throw new Error(error.response?.data?.message || "Failed to fetch categories")
    }
  },

  async getCategory(slug: string): Promise<Category | null> {
    try {
      const response = await apiClient.get(`/categories/${slug}`)
      return response.data
    } catch (error: any) {
      if (error.response?.status === 404) return null
      throw new Error(error.response?.data?.message || "Failed to fetch category")
    }
  },

  async subscribe(email: string, name?: string, source?: string): Promise<void> {
    try {
      await apiClient.post("/subscribers", { email, name, source })
    } catch (error: any) {
      throw new Error(error.response?.data?.message || "Failed to subscribe")
    }
  },

  async unsubscribe(email: string): Promise<void> {
    try {
      await apiClient.post("/subscribers/unsubscribe", { email })
    } catch (error: any) {
      throw new Error(error.response?.data?.message || "Failed to unsubscribe")
    }
  },
}
