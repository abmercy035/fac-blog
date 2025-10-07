import { blogPosts, comments, subscribers, type BlogPost, type Comment, type Subscriber } from "./blog-data"
import { users } from "./auth"

// Simulate API delay
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

export const adminApi = {
  // Post management
  async getAllPosts(): Promise<BlogPost[]> {
    await delay(300)
    return [...blogPosts]
  },

  async createPost(
    postData: Omit<BlogPost, "id" | "publishedAt" | "updatedAt" | "likes" | "commentsCount">,
  ): Promise<BlogPost> {
    await delay(500)
    const newPost: BlogPost = {
      ...postData,
      id: Date.now().toString(),
      publishedAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      likes: 0,
      commentsCount: 0,
    }
    blogPosts.push(newPost)
    return newPost
  },

  async updatePost(id: string, updates: Partial<BlogPost>): Promise<BlogPost> {
    await delay(400)
    const postIndex = blogPosts.findIndex((p) => p.id === id)
    if (postIndex === -1) {
      throw new Error("Post not found")
    }
    blogPosts[postIndex] = {
      ...blogPosts[postIndex],
      ...updates,
      updatedAt: new Date().toISOString(),
    }
    return blogPosts[postIndex]
  },

  async deletePost(id: string): Promise<void> {
    await delay(300)
    const postIndex = blogPosts.findIndex((p) => p.id === id)
    if (postIndex === -1) {
      throw new Error("Post not found")
    }
    blogPosts.splice(postIndex, 1)
    // Also remove related comments
    const commentIndices = comments.map((c, i) => (c.postId === id ? i : -1)).filter((i) => i !== -1)
    commentIndices.reverse().forEach((i) => comments.splice(i, 1))
  },

  // Comment management
  async getAllComments(): Promise<Comment[]> {
    await delay(300)
    return [...comments]
  },

  async deleteComment(id: string): Promise<void> {
    await delay(300)
    const commentIndex = comments.findIndex((c) => c.id === id)
    if (commentIndex === -1) {
      throw new Error("Comment not found")
    }
    const comment = comments[commentIndex]
    comments.splice(commentIndex, 1)

    // Update post comment count
    const post = blogPosts.find((p) => p.id === comment.postId)
    if (post && post.commentsCount > 0) {
      post.commentsCount -= 1
    }
  },

  async updateComment(id: string, content: string): Promise<Comment> {
    await delay(400)
    const commentIndex = comments.findIndex((c) => c.id === id)
    if (commentIndex === -1) {
      throw new Error("Comment not found")
    }
    comments[commentIndex].content = content
    return comments[commentIndex]
  },

  // Analytics
  async getStats(): Promise<{
    totalPosts: number
    totalComments: number
    totalUsers: number
    totalLikes: number
    recentActivity: Array<{
      type: "post" | "comment"
      title: string
      date: string
      author: string
    }>
  }> {
    await delay(200)
    const totalLikes = blogPosts.reduce((sum, post) => sum + post.likes, 0)
    const recentActivity = [
      ...blogPosts.slice(-3).map((post) => ({
        type: "post" as const,
        title: post.title,
        date: post.publishedAt,
        author: post.author.name,
      })),
      ...comments.slice(-3).map((comment) => ({
        type: "comment" as const,
        title: `Comment on post`,
        date: comment.createdAt,
        author: comment.author,
      })),
    ].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())

    return {
      totalPosts: blogPosts.length,
      totalComments: comments.length,
      totalUsers: users.length,
      totalLikes,
      recentActivity: recentActivity.slice(0, 5),
    }
  },

  // Subscriber management
  async getAllSubscribers(): Promise<Subscriber[]> {
    await delay(300)
    return [...subscribers]
  },

  async updateSubscriber(id: string, updates: Partial<Subscriber>): Promise<Subscriber> {
    await delay(400)
    const subscriberIndex = subscribers.findIndex((s) => s.id === id)
    if (subscriberIndex === -1) {
      throw new Error("Subscriber not found")
    }
    subscribers[subscriberIndex] = {
      ...subscribers[subscriberIndex],
      ...updates,
    }
    return subscribers[subscriberIndex]
  },

  async deleteSubscriber(id: string): Promise<void> {
    await delay(300)
    const subscriberIndex = subscribers.findIndex((s) => s.id === id)
    if (subscriberIndex === -1) {
      throw new Error("Subscriber not found")
    }
    subscribers.splice(subscriberIndex, 1)
  },

  async toggleSubscriberAlert(id: string): Promise<Subscriber> {
    await delay(300)
    const subscriberIndex = subscribers.findIndex((s) => s.id === id)
    if (subscriberIndex === -1) {
      throw new Error("Subscriber not found")
    }
    subscribers[subscriberIndex].receiveNewPostAlerts = !subscribers[subscriberIndex].receiveNewPostAlerts
    return subscribers[subscriberIndex]
  },

  async bulkUpdateSubscribers(
    ids: string[],
    updates: Partial<Subscriber>,
  ): Promise<Subscriber[]> {
    await delay(500)
    const updatedSubscribers: Subscriber[] = []

    ids.forEach((id) => {
      const subscriberIndex = subscribers.findIndex((s) => s.id === id)
      if (subscriberIndex !== -1) {
        subscribers[subscriberIndex] = {
          ...subscribers[subscriberIndex],
          ...updates,
        }
        updatedSubscribers.push(subscribers[subscriberIndex])
      }
    })

    return updatedSubscribers
  },

  async bulkDeleteSubscribers(ids: string[]): Promise<void> {
    await delay(500)
    ids.forEach((id) => {
      const subscriberIndex = subscribers.findIndex((s) => s.id === id)
      if (subscriberIndex !== -1) {
        subscribers.splice(subscriberIndex, 1)
      }
    })
  },

  async sendBulkEmail(
    subscriberIds: string[],
    subject: string,
    message: string,
  ): Promise<{ success: boolean; sentCount: number }> {
    await delay(1000)
    // Simulate email sending
    const activeSubscribers = subscribers.filter(
      (s) => subscriberIds.includes(s.id) && s.isActive,
    )

    // In a real app, this would send emails via an email service
    console.log(`Sending email to ${activeSubscribers.length} subscribers`)
    console.log(`Subject: ${subject}`)
    console.log(`Message: ${message}`)

    return {
      success: true,
      sentCount: activeSubscribers.length,
    }
  },
}
