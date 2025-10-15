import apiClient from "./axios"

// Authentication and authorization utilities
export interface User {
  _id?: string
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
  expiresAt?: string
}

export const authApi = {
  async login(username: string, password: string): Promise<AuthSession> {
    try {
      const response = await apiClient.post("/auth/login", { username, password })
      const data = response.data

      // Store token in localStorage
      if (typeof window !== "undefined") {
        localStorage.setItem("token", data.token)
      }

      return {
        user: {
          id: data._id,
          _id: data._id,
          username: data.username,
          email: data.email,
          role: data.role,
          name: data.name,
          avatar: data.avatar,
          createdAt: data.createdAt,
          lastLogin: data.lastLogin,
        },
        token: data.token,
      }
    } catch (error: any) {
      throw new Error(error.response?.data?.message || "Login failed")
    }
  },

  async register(username: string, email: string, password: string, name: string): Promise<AuthSession> {
    try {
      const response = await apiClient.post("/auth/register", { username, email, password, name })
      const data = response.data

      // Store token in localStorage
      if (typeof window !== "undefined") {
        localStorage.setItem("token", data.token)
      }

      return {
        user: {
          id: data._id,
          _id: data._id,
          username: data.username,
          email: data.email,
          role: data.role,
          name: data.name,
          avatar: data.avatar,
          createdAt: data.createdAt,
          lastLogin: data.lastLogin,
        },
        token: data.token,
      }
    } catch (error: any) {
      throw new Error(error.response?.data?.message || "Registration failed")
    }
  },

  async logout(): Promise<void> {
    if (typeof window !== "undefined") {
      localStorage.removeItem("token")
    }
  },

  async validateSession(token: string): Promise<User | null> {
    try {
      const response = await apiClient.get("/auth/validate")
      const data = response.data

      if (data.valid && data.user) {
        return {
          id: data.user._id,
          _id: data.user._id,
          username: data.user.username,
          email: data.user.email,
          role: data.user.role,
          name: data.user.name,
          avatar: data.user.avatar,
          createdAt: data.user.createdAt,
          lastLogin: data.user.lastLogin,
        }
      }
      return null
    } catch (error) {
      return null
    }
  },

  async getMe(): Promise<User | null> {
    try {
      const response = await apiClient.get("/auth/me")
      const data = response.data

      return {
        id: data._id,
        _id: data._id,
        username: data.username,
        email: data.email,
        role: data.role,
        name: data.name,
        avatar: data.avatar,
        createdAt: data.createdAt,
        lastLogin: data.lastLogin,
      }
    } catch (error) {
      return null
    }
  },

  async getUsers(): Promise<User[]> {
    try {
      const response = await apiClient.get("/admin/users")
      return response.data.map((user: any) => ({
        id: user._id,
        _id: user._id,
        username: user.username,
        email: user.email,
        role: user.role,
        name: user.name,
        avatar: user.avatar,
        createdAt: user.createdAt,
        lastLogin: user.lastLogin,
      }))
    } catch (error: any) {
      throw new Error(error.response?.data?.message || "Failed to fetch users")
    }
  },

  async updateUserRole(userId: string, role: "admin" | "editor" | "viewer"): Promise<User> {
    try {
      const response = await apiClient.put(`/admin/users/${userId}/role`, { role })
      const data = response.data

      return {
        id: data._id,
        _id: data._id,
        username: data.username,
        email: data.email,
        role: data.role,
        name: data.name,
        avatar: data.avatar,
        createdAt: data.createdAt,
        lastLogin: data.lastLogin,
      }
    } catch (error: any) {
      throw new Error(error.response?.data?.message || "Failed to update user role")
    }
  },

  async deleteUser(userId: string): Promise<void> {
    try {
      await apiClient.delete(`/admin/users/${userId}`)
    } catch (error: any) {
      throw new Error(error.response?.data?.message || "Failed to delete user")
    }
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
