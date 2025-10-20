import axios from "axios"
import useAuthStore from "@/store/authStore"

// Prefer an environment-configured API base URL, fall back to Railway production domain,
// then to localhost for local development. This keeps a single source of truth.
const DEFAULT_API_HOST = "https://deployment-production-5b5d.up.railway.app";
// Vite exposes env vars on import.meta.env and requires the VITE_ prefix for user vars.
const API_BASE = import.meta.env.VITE_API_BASE || `${DEFAULT_API_HOST}/api`;

const API = axios.create({
  baseURL: API_BASE,
})

API.interceptors.request.use((req) => {
  const token = useAuthStore.getState().token
  if (token) {
    req.headers.Authorization = `Bearer ${token}`
  }
  return req
})

export default API
