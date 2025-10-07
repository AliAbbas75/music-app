import { create } from "zustand"
import { persist } from "zustand/middleware"

const API_URL = "http://localhost:5000/api/auth" // adjust to your backend route

const useAuthStore = create(
  persist(
    (set,get) => ({
      user: null,
      token: null,

      login: (user, token) => set({ user, token }),
      logout: () => set({ user: null, token: null }),
      
      // 🔹 set user (for updating profile image, name, etc.)
      setUser: (user) => set({ user }),

      fetchUser: async () => {
        const token = get().token
        if (!token) return

        try {
          const res = await fetch(`${API_URL}/auth`, {
            method: "GET",
            headers: {
              "Authorization": `Bearer ${token}`,
            },
            credentials: "include",
          })

          const data = await res.json()

          if (!res.ok) {
            throw new Error(data.msg || "Failed to fetch user")
          }

          set({ user: data.user })
          return data.user
        } catch (err) {
          console.error("Fetch user error:", err.message)
          set({ user: null, token: null }) // optional: clear invalid session
        }
      },

      // 🔥 New signup function
      signup: async (username, email, password) => {
        try {
          const res = await fetch(`${API_URL}/register`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ username, email, password }),
          })

          const data = await res.json()

          if (!res.ok) {
            throw new Error(data.msg || "Signup failed")
          }

          // Store user + token in Zustand
          set({ user: data.user, token: data.token })

          return { success: true, user: data.user }
        } catch (err) {
          console.error("Signup error:", err.message)
          return { success: false, error: err.message }
        }
      },
    }),
    {
      name: "auth-storage",
    }
  )
)

export default useAuthStore
