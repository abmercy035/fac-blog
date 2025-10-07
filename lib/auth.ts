// Authentication and authorization utilities
export interface User {
  id: string
  username: string
  email: string
  role: "admin" | "editor" | "viewer"
  name: string
  avatar?: string
  createdAt: string
  lastLogin?: string
}

export interface AuthSession {
  user: User
  token: string
  expiresAt: string
}

// Mock users for demo - in production, this would be in a database
export const users: User[] = [
  {
    id: "1",
    username: "admin",
    email: "admin@techblog.com",
    role: "admin",
    name: "Admin User",
    avatar: "/professional-woman-developer.png",
    createdAt: "2024-01-01T00:00:00Z",
    lastLogin: "2024-01-20T10:00:00Z",
  },
  {
    id: "2",
    username: "editor1",
    email: "editor@techblog.com",
    role: "editor",
    name: "John Editor",
    avatar: "/professional-man-developer.png",
    createdAt: "2024-01-01T00:00:00Z",
    lastLogin: "2024-01-19T15:30:00Z",
  },
]

// Mock sessions storage
let sessions: AuthSession[] = []

// Simulate API delay
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

export const authApi = {
  async login(username: string, password: string): Promise<AuthSession> {
    await delay(500)

    // Simple password check - in production, use proper hashing
    const validCredentials = [
      { username: "admin", password: "admin123" },
      { username: "editor1", password: "editor123" },
    ]

    const credential = validCredentials.find((c) => c.username === username && c.password === password)
    if (!credential) {
      throw new Error("Invalid credentials")
    }

    const user = users.find((u) => u.username === username)
    if (!user) {
      throw new Error("User not found")
    }

    const session: AuthSession = {
      user: { ...user, lastLogin: new Date().toISOString() },
      token: `token_${Date.now()}_${Math.random()}`,
      expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(), // 24 hours
    }

    sessions.push(session)
    return session
  },

  async logout(token: string): Promise<void> {
    await delay(200)
    sessions = sessions.filter((s) => s.token !== token)
  },

  async validateSession(token: string): Promise<User | null> {
    await delay(100)
    const session = sessions.find((s) => s.token === token && new Date(s.expiresAt) > new Date())
    return session?.user || null
  },

  async getUsers(): Promise<User[]> {
    await delay(300)
    return users
  },

  async updateUserRole(userId: string, role: "admin" | "editor" | "viewer"): Promise<User> {
    await delay(400)
    const user = users.find((u) => u.id === userId)
    if (!user) {
      throw new Error("User not found")
    }
    user.role = role
    return user
  },

  async deleteUser(userId: string): Promise<void> {
    await delay(300)
    const index = users.findIndex((u) => u.id === userId)
    if (index === -1) {
      throw new Error("User not found")
    }
    users.splice(index, 1)
  },
}

// Permission checks
export const permissions = {
  canManageUsers: (user: User) => user.role === "admin",
  canManagePosts: (user: User) => ["admin", "editor"].includes(user.role),
  canManageComments: (user: User) => user.role === "admin",
  canCreatePosts: (user: User) => ["admin", "editor"].includes(user.role),
  canEditAllPosts: (user: User) => user.role === "admin",
  canDeletePosts: (user: User) => user.role === "admin",
}
