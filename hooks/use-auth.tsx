"use client"

import { createContext, useContext, useEffect, useState, type ReactNode } from "react"
import { authApi, type User } from "@/lib/auth"

interface AuthContextType {
  user: User | null
  login: (username: string, password: string) => Promise<void>
  logout: () => Promise<void>
  loading: boolean
  error: string | null
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const token = localStorage.getItem("auth_token")
    if (token) {
      authApi
        .validateSession(token)
        .then((user) => {
          if (user) {
            setUser(user)
          } else {
            localStorage.removeItem("auth_token")
          }
        })
        .catch(() => {
          localStorage.removeItem("auth_token")
        })
        .finally(() => setLoading(false))
    } else {
      setLoading(false)
    }
  }, [])

  const login = async (username: string, password: string) => {
    try {
      setError(null)
      setLoading(true)
      const session = await authApi.login(username, password)
      localStorage.setItem("auth_token", session.token)
      setUser(session.user)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Login failed")
      throw err
    } finally {
      setLoading(false)
    }
  }

  const logout = async () => {
    try {
      const token = localStorage.getItem("auth_token")
      if (token) {
        await authApi.logout()
        localStorage.removeItem("auth_token")
      }
      setUser(null)
    } catch (err) {
      console.error("Logout error:", err)
    }
  }

  return <AuthContext.Provider value={{ user, login, logout, loading, error }}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
