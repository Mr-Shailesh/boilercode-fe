"use client"

import { createContext, useContext, useState, useEffect } from "react"
import { authService } from "../services/authService"

const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  // Check if user is already logged in on mount
  useEffect(() => {
    const token = localStorage.getItem("token")
    if (token) {
      checkAuth()
    } else {
      setLoading(false)
    }
  }, [])

  const checkAuth = async () => {
    try {
      setLoading(true)
      const response = await authService.getCurrentUser()
      setUser(response.data.data)
      setError(null)
    } catch (err) {
      console.error("Auth check failed:", err)
      localStorage.removeItem("token")
      setUser(null)
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  const login = async (email, password) => {
    try {
      setError(null)
      const response = await authService.login(email, password)
      const { token, ...userData } = response.data.data

      localStorage.setItem("token", token)
      setUser(userData)

      return { success: true, data: userData }
    } catch (err) {
      const message = err.response?.data?.message || err.message
      setError(message)
      throw err
    }
  }

  const register = async (name, email, password, confirmPassword) => {
    try {
      setError(null)
      const response = await authService.register(name, email, password, confirmPassword)
      const { token, ...userData } = response.data.data

      localStorage.setItem("token", token)
      setUser(userData)

      return { success: true, data: userData }
    } catch (err) {
      const message = err.response?.data?.message || err.message
      setError(message)
      throw err
    }
  }

  const logout = () => {
    localStorage.removeItem("token")
    setUser(null)
    setError(null)
  }

  return (
    <AuthContext.Provider value={{ user, loading, error, login, register, logout, checkAuth }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider")
  }
  return context
}
