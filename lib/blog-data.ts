export interface Author {
  _id?: string
  id: string
  name: string
  username: string
  title: string
  bio: string
  email: string
  avatar: string
  social: {
    linkedin?: string
    facebook?: string
    email?: string
  }
}

export interface Category {
  _id?: string
  id: string
  name: string
  description: string
  slug: string
}

export interface BlogPost {
  _id?: string
  id: string
  title: string
  content: string
  excerpt: string
  author: Author
  category: Category
  tags: string[]
  publishedAt: string
  updatedAt: string
  isPublished: boolean
  slug: string
  featuredImage: string
  likes: number
  commentsCount: number
}

export interface Comment {
  _id?: string
  id: string
  postId: string
  author: string
  email: string
  content: string
  createdAt: string
  isApproved?: boolean
  replies?: Comment[]
}

export interface Subscriber {
  _id?: string
  id: string
  email: string
  name?: string
  subscribedAt: string
  isActive: boolean
  receiveNewPostAlerts: boolean
  source: string // e.g., "homepage", "post", "footer"
}

 
