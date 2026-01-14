"use client"

import { useNavigate } from "react-router-dom"
import { useAuth } from "../context/AuthContext"
import "./DashboardPage.css"

export default function DashboardPage() {
  const navigate = useNavigate()
  const { user, logout } = useAuth()

  const handleLogout = () => {
    logout()
    navigate("/login")
  }

  return (
    <div className="dashboard">
      <nav className="dashboard-nav">
        <div className="nav-brand">Dashboard</div>
        <button className="logout-button" onClick={handleLogout}>
          Logout
        </button>
      </nav>

      <main className="dashboard-content">
        <div className="welcome-card">
          <h1>Welcome, {user?.name}!</h1>
          <p>You are successfully logged in to the application.</p>
        </div>

        <div className="user-info-card">
          <h2>User Information</h2>
          <div className="info-grid">
            <div className="info-item">
              <label>Name</label>
              <p>{user?.name}</p>
            </div>
            <div className="info-item">
              <label>Email</label>
              <p>{user?.email}</p>
            </div>
            <div className="info-item">
              <label>User ID</label>
              <p>{user?.id}</p>
            </div>
            <div className="info-item">
              <label>Member Since</label>
              <p>{new Date(user?.createdAt).toLocaleDateString()}</p>
            </div>
          </div>
        </div>

        <div className="features-section">
          <h2>Features</h2>
          <div className="features-grid">
            <div className="feature-card">
              <h3>Protected Routes</h3>
              <p>This dashboard is protected and only accessible to logged-in users.</p>
            </div>
            <div className="feature-card">
              <h3>JWT Authentication</h3>
              <p>Your session is secured with JWT tokens stored in localStorage.</p>
            </div>
            <div className="feature-card">
              <h3>User Context</h3>
              <p>User data is managed globally using React Context API.</p>
            </div>
            <div className="feature-card">
              <h3>API Integration</h3>
              <p>Axios is configured with interceptors for secure API calls.</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
