import { useParams, useNavigate } from "react-router-dom"
import { useState } from "react"
import API from "@/api"

export default function ResetPasswordPage() {
  const { token } = useParams()
  const [password, setPassword] = useState("")
  const [message, setMessage] = useState("")
  const navigate = useNavigate()

  const handleReset = async (e) => {
    e.preventDefault()
    try {
      const res = await API.post(`/auth/reset-password/${token}`, { password })
      setMessage(res.data.message || "Password reset successful.")

      // redirect to login after 2s
      setTimeout(() => {
        navigate("/login")
      }, 2000)
    } catch (err) {
      setMessage(err.response?.data?.message || "Something went wrong.")
    }
  }

  return (
    <form
      onSubmit={handleReset}
      className="w-96 mx-auto mt-20 p-6 bg-white rounded-lg shadow-lg flex flex-col gap-4"
    >
      <h2 className="text-2xl font-bold text-center">Reset Password</h2>

      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Enter new password"
        required
        className="border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      <button
        type="submit"
        className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 rounded transition"
      >
        Reset
      </button>

      {message && (
        <p className="text-sm text-center mt-2 text-gray-600">{message}</p>
      )}
    </form>
  )
}
