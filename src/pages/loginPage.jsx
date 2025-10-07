import { LoginForm } from "@/components/login-form"
import { Button } from "@/components/ui/button"
import useAuthStore from "@/store/authStore"
import { Link } from "react-router-dom"

export default function LoginPage() {
    const { token, user } = useAuthStore()

    if (token) {
        // Show a message screen instead of login form
        return (
            <div className="flex items-center justify-center w-full h-screen">
                <div className="text-center">
                    <h1 className="text-2xl font-bold">You are already logged in</h1>
                    <p className="text-muted-foreground mt-2">
                        Welcome back, {user?.email || "User"} 👋
                    </p>
                    {<Link to={"/dashboard"}><Button>Home</Button></Link>}
                </div>
            </div>
        )
    }

    // Normal login layout
    return (
        <div className="grid grid-cols-2 w-full h-screen overflow-hidden">
            <div className="flex items-center justify-center w-full">
                <img
                    className="w-full h-full object-cover"
                    src="src/assets/Photo.png"
                    alt="img"
                />
            </div>
            <div className="flex items-center justify-center w-full">
                <LoginForm />
            </div>
        </div>
    )
}
