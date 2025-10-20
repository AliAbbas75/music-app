import { create } from "zustand"
import { persist } from "zustand/middleware"

// Derive auth base from centralized API base. Keep fallback to localhost auth path.
// Don't import API here to avoid circular dependency during module initialization.
// Derive auth base from environment first, then fall back to the production host or localhost.
const DEFAULT_API_HOST = "https://deployment-production-5b5d.up.railway.app";
const API_BASE = import.meta.env.VITE_API_BASE || `${DEFAULT_API_HOST}/api`;
const API_HOST = API_BASE.replace(/\/api\/?$/, '');
const API_URL = `${API_HOST}/api/auth`;

const useAuthStore = create(
  persist(
    (set, get) => ({
      user: null,
      token: null,

      login: (user, token) => set({ user, token }),
      logout: () => set({ user: null, token: null }),
      setUser: (user) => set({ user }),

      fetchUser: async () => {
        const token = get().token
        if (!token) return
        try {
          const res = await fetch(`${API_URL}/auth`, {
            method: "GET",
            headers: { "Authorization": `Bearer ${token}` },
            credentials: "include",
          })
          const data = await res.json()
          if (!res.ok) throw new Error(data.msg || "Failed to fetch user")
          set({ user: data.user })
          return data.user
        } catch (err) {
          console.error("Fetch user error:", err.message)
          set({ user: null, token: null })
        }
      },

      signup: async (username, email, password) => {
        try {
          const res = await fetch(`${API_URL}/register`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ username, email, password }),
          })
          const data = await res.json()
          if (!res.ok) throw new Error(data.msg || "Signup failed")
          set({ user: data.user, token: data.token })
          return { success: true, user: data.user }
        } catch (err) {
          console.error("Signup error:", err.message)
          return { success: false, error: err.message }
        }
      },

      // 🧨 NEW: delete account
      deleteAccount: async () => {
        try {
          const res = await API.delete("/user/delete")
          if (res.status === 200) {
            set({ user: null, token: null })
            localStorage.removeItem("auth-storage")
            return { success: true }
          } else {
            return { success: false, error: res.data?.msg || "Delete failed" }
          }
        } catch (err) {
          console.error("Delete account error:", err.message)
          return { success: false, error: err.message }
        }
      },
    }),
    { name: "auth-storage" }
  )
)

export default useAuthStore
