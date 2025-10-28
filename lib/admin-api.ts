import apiClient from "./axios"
import type { BlogPost, Comment, Subscriber } from "./blog-data"

export const adminApi = {

  async getAllPosts(): Promise<BlogPost[]> {
    try {
      const response = await apiClient.get("/admin/posts")
      return response.data
    } catch (error: any) {
      throw new Error(error.response?.data?.message || "Failed to fetch posts")
    }
  },

  async createPost(postData: any): Promise<BlogPost> {
    try {
      const response = await apiClient.post("/posts", postData)
      return response.data
    } catch (error: any) {
      throw new Error(error.response?.data?.message || "Failed to create post")
    }
  },

  async updatePost(id: string, updates: Partial<BlogPost>): Promise<BlogPost> {
    try {
      const response = await apiClient.put(`/posts/${id}`, updates);
      return response.data

    } catch (error: any) {
      throw new Error(error.response?.data?.message || "Failed to update post")
    }
  },

  async deletePost(id: string): Promise<void> {
    try {
      await apiClient.delete(`/posts/${id}`)
    } catch (error: any) {
      throw new Error(error.response?.data?.message || "Failed to delete post")
    }
  },

  async getAllComments(): Promise<Comment[]> {
    try {
      const response = await apiClient.get("/admin/comments")
      return response.data
    } catch (error: any) {
      throw new Error(error.response?.data?.message || "Failed to fetch comments")
    }
  },

  async deleteComment(id: string): Promise<void> {
    try {
      await apiClient.delete(`/comments/${id}`)
    } catch (error: any) {
      throw new Error(error.response?.data?.message || "Failed to delete comment")
    }
  },

  async updateComment(id: string, content: string): Promise<Comment> {
    try {
      const response = await apiClient.put(`/comments/${id}`, { content })
      return response.data
    } catch (error: any) {
      throw new Error(error.response?.data?.message || "Failed to update comment")
    }
  },

  async approveComment(id: string): Promise<Comment> {
    try {
      const response = await apiClient.put(`/comments/${id}/approve`)
      return response.data
    } catch (error: any) {
      throw new Error(error.response?.data?.message || "Failed to approve comment")
    }
  },

  async getStats(): Promise<{
    totalPosts: number
    publishedPosts: number
    draftPosts: number
    totalComments: number
    pendingComments: number
    totalUsers: number
    totalSubscribers: number
    totalLikes: number
    recentActivity: Array<{
      type: "post" | "comment"
      title: string
      date: string
      author: string
    }>
  }> {
    try {
      const response = await apiClient.get("/admin/stats")
      return response.data
    } catch (error: any) {
      throw new Error(error.response?.data?.message || "Failed to fetch stats")
    }
  },

  async getAllSubscribers(): Promise<Subscriber[]> {
    try {
      const response = await apiClient.get("/subscribers")
      return response.data
    } catch (error: any) {
      throw new Error(error.response?.data?.message || "Failed to fetch subscribers")
    }
  },

  async updateSubscriber(id: string, updates: Partial<Subscriber>): Promise<Subscriber> {
    try {
      const response = await apiClient.put(`/subscribers/${id}`, updates)
      return response.data
    } catch (error: any) {
      throw new Error(error.response?.data?.message || "Failed to update subscriber")
    }
  },

  async deleteSubscriber(id: string): Promise<void> {
    try {
      await apiClient.delete(`/subscribers/${id}`)
    } catch (error: any) {
      throw new Error(error.response?.data?.message || "Failed to delete subscriber")
    }
  },

  async toggleSubscriberAlert(id: string, alert: boolean): Promise<Subscriber> {
    try {
      const response = await apiClient.put(`/subscribers/${id}`, {
        receiveNewPostAlerts: !alert
      })
      return response.data
    } catch (error: any) {
      throw new Error(error.response?.data?.message || "Failed to toggle subscriber alert")
    }
  },

  async bulkUpdateSubscribers(ids: string[], updates: Partial<Subscriber>): Promise<Subscriber[]> {
    try {
      const promises = ids.map(id => apiClient.put(`/subscribers/${id}`, updates))
      const responses = await Promise.all(promises)

      return responses.map(r => r.data)
    }
    catch (error: any) {
      throw new Error(error.response?.data?.message || "Failed to bulk update subscribers")
    }
  },

  async bulkDeleteSubscribers(ids: string[]): Promise<void> {
    try {
      const promises = ids.map(id => apiClient.delete(`/subscribers/${id}`))
      await Promise.all(promises)
    } catch (error: any) {
      throw new Error(error.response?.data?.message || "Failed to bulk delete subscribers")
    }
  },

  async sendBulkEmail(
    subscriberIds: string[],
    subject: string,
    message: string,
  ): Promise<{ success: boolean; sentCount: number }> {
    console.log(`Sending email to ${subscriberIds.length} subscribers`)
    console.log(`Subject: ${subject}`)
    console.log(`Message: ${message}`)

    return {
      success: true,
      sentCount: subscriberIds.length,
    }
  },
}
