"use client"

import { useNavigate, Link } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { register } from "../store/slices/authSlice"
import { AuthForm } from "../components/AuthForm"
import "./AuthPages.css"

export default function RegisterPage() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { loading, error } = useSelector((state) => state.auth)

  const handleRegister = async (formData) => {
    await dispatch(register(formData)).unwrap()
    navigate("/dashboard")
  }

  const registerFields = [
    {
      name: "name",
      label: "Full Name",
      type: "text",
      placeholder: "John Doe",
      required: true,
    },
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
      placeholder: "Minimum 6 characters",
      required: true,
    },
    {
      name: "confirmPassword",
      label: "Confirm Password",
      type: "password",
      placeholder: "Confirm your password",
      required: true,
    },
  ]

  return (
    <div className="auth-page">
      <AuthForm
        title="Create Account"
        fields={registerFields}
        buttonLabel="Sign Up"
        onSubmit={handleRegister}
        loading={loading}
        error={error}
      />
      <div className="auth-footer">
        <p>
          Already have an account? <Link to="/login">Sign in here</Link>
        </p>
      </div>
    </div>
  )
}
