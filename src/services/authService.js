import axios from "axios"

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:3001/api"

// Create axios instance with default config
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
})

// Add token to requests
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token")
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => Promise.reject(error),
)

// Handle response errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem("token")
    }
    return Promise.reject(error)
  },
)

export const authService = {
  register: (name, email, password, confirmPassword) =>
    api.post("/auth/register", { name, email, password, confirmPassword }),

  login: (email, password) => api.post("/auth/login", { email, password }),

  getCurrentUser: () => api.get("/auth/me"),

  logout: () => {
    localStorage.removeItem("token")
    return api.get("/auth/logout")
  },
}
