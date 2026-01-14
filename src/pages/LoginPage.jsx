"use client"

import { useNavigate, Link } from "react-router-dom"
import { useAuth } from "../context/AuthContext"
import { AuthForm } from "../components/AuthForm"
import "./AuthPages.css"

export default function LoginPage() {
  const navigate = useNavigate()
  const { login, loading, error } = useAuth()

  const handleLogin = async (formData) => {
    await login(formData.email, formData.password)
    navigate("/dashboard")
  }

  const loginFields = [
    {
      name: "email",
      label: "Email",
      type: "email",
      placeholder: "your@email.com",
      required: true,
    },
    {
      name: "password",
      label: "Password",
      type: "password",
      placeholder: "Enter your password",
      required: true,
    },
  ]

  return (
    <div className="auth-page">
      <AuthForm
        title="Login"
        fields={loginFields}
        buttonLabel="Sign In"
        onSubmit={handleLogin}
        loading={loading}
        error={error}
      />
      <div className="auth-footer">
        <p>
          Don't have an account? <Link to="/register">Sign up here</Link>
        </p>
      </div>
    </div>
  )
}
