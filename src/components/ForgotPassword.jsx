import { useState } from "react"
import { useNavigate } from "react-router-dom"
import API from "@/api" // centralized axios instance

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("")
  const [message, setMessage] = useState("")
  const navigate = useNavigate()

  const handleForgotPassword = async (e) => {
    e.preventDefault()
    try {
      const res = await API.post("/auth/forgot-password", { email })
      setMessage(res.data.message || "Reset link sent to your email.")

      if (res.data.token) {
        // navigate to reset page with token
        navigate(`/reset-password/?token=${res.data.token}`)
      }
    } catch (err) {
      setMessage(err.response?.data?.message || "Something went wrong.")
    }
  }

  return (
    <div className="flex items-center justify-center h-screen">
      <form
        onSubmit={handleForgotPassword}
        className="p-6 bg-white rounded shadow-md w-96"
      >
        <h2 className="text-xl font-bold mb-4">Forgot Password</h2>
        <input
          type="email"
          className="border w-full p-2 mb-3"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded w-full"
        >
          Send Reset Link
        </button>
        {message && <p className="mt-3 text-sm">{message}</p>}
      </form>
    </div>
  )
}
