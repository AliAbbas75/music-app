import { Button } from "@/components/ui/button"
import useAuthStore from "@/store/authStore"
import { useNavigate } from "react-router-dom"

export default function SignOutButton() {
  const logout = useAuthStore((state) => state.logout)
  const navigate = useNavigate()

  const handleSignOut = () => {
    logout()            // clear user + token from store/localStorage
    navigate("/login")  // send back to login
  }

  return (
    <Button variant="outline" onClick={handleSignOut}>
      Sign Out
    </Button>
  )
}
