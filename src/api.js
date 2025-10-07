import axios from "axios"
import useAuthStore from "@/store/authStore"

const API = axios.create({
  baseURL: "http://localhost:5000/api",
})

API.interceptors.request.use((req) => {
  const token = useAuthStore.getState().token
  if (token) {
    req.headers.Authorization = `Bearer ${token}`
  }
  return req
})

export default API
