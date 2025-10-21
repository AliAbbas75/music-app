import { LoginForm } from "@/components/login-form";
import { Button } from "@/components/ui/button";
import useAuthStore from "@/store/authStore";
import { Link } from "react-router-dom";

export default function LoginPage() {
  const { token, user } = useAuthStore();

  if (token) {
    return (
      <div className="flex items-center justify-center w-full min-h-dvh overflow-hidden bg-white">
        <div className="text-center px-4">
          <h1 className="text-2xl font-bold">You are already logged in</h1>
          <p className="text-muted-foreground mt-2">
            Welcome back, {user?.email || "User"} 👋
          </p>
          <Link to="/dashboard">
            <Button className="mt-4">Home</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="flex w-full min-h-dvh overflow-hidden bg-white">
      <div className="grid grid-cols-1 md:grid-cols-2 w-full min-h-dvh">
        {/* Left Image Section - Hidden on tablets and below */}
        <div className="hidden md:flex items-center justify-center w-full h-full overflow-hidden">
          <img
            className="w-full h-full object-cover object-center"
            src="src/assets/Onboarding.png"
            alt="Onboarding"
            draggable={false}
          />
        </div>

        {/* Right Login Section */}
        <div className="flex items-center justify-center w-full h-full px-6 py-10 sm:px-8">
          <LoginForm />
        </div>
      </div>
    </div>
  );
}
