"use client"

import { Navigate } from "react-router-dom"
import { useSelector } from "react-redux"

export const ProtectedRoute = ({ children }) => {
  const { user, loading } = useSelector((state) => state.auth)

  if (loading) {
    return (
      <div style={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "100vh" }}>
        <div>Loading...</div>
      </div>
    )
  }

  if (!user) {
    return <Navigate to="/login" replace />
  }

  return children
}
