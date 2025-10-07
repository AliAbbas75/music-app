import API from "../api"
import useAuthStore from "@/store/authStore"

// Signup
export const signup = async (userData) => {
  const res = await API.post("/auth/register", userData)
  const { token, user } = res.data
  useAuthStore.getState().login(user, token)  // <-- store in Zustand
  return res.data
}

// Login
export const login = async (userData) => {
  const res = await API.post("/auth/login", userData)
  const { token, user } = res.data
  useAuthStore.getState().login(user, token)  // <-- store in Zustand
  return res.data
}

// Logout
export const logout = () => {
  useAuthStore.getState().logout()
}
