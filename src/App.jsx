import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import { ProtectedRoute } from "./components/ProtectedRoute"
import LoginPage from "./pages/LoginPage"
import RegisterPage from "./pages/RegisterPage"
import DashboardPage from "./pages/DashboardPage"
import "./App.css"
import { useEffect } from "react"
import { useDispatch } from "react-redux"
import { checkAuth } from "./store/slices/authSlice"

function App() {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(checkAuth())
  }, [dispatch])

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <DashboardPage />
            </ProtectedRoute>
          }
        />
        <Route path="/" element={<LoginPage />} />
      </Routes>
    </Router>
  )
}

export default App
