import { Navigate } from "react-router-dom"
import useAuthStore from "@/store/authStore"

export default function ProtectedRoute({ children }) {
  const { user, token } = useAuthStore()

  // If no token, redirect to login
  if (!token) {
    return <Navigate to="/login" replace />
  }

  // Otherwise render the protected page
  return children
}
