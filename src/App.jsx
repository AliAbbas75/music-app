import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/app-sidebar"
import './App.css'
import { SearchForm } from '@/components/search-form'
import Dashboard from './pages/dashboard';
import { Routes, Route } from "react-router-dom";
import SongsLibrary from "./pages/songsLibrary";
import AIRemixGenerator from "./pages/aiRemixGenrator";
import RemixWorkspace from "./pages/effectsAndFilters";
import Profile from "./pages/profile";
import ProtectedRoute from "@/components/ProtectedRoute"
import PasswordSettings from "./pages/profilePassword";
import AppearanceSettings from "./pages/appearanceSettings";
import BeatTempoControl from "./pages/beatAndTempo";
import SavedRemixesProjects from "./pages/savedProjects";
import LoginPage from "./pages/loginPage";
import { BellIcon, ChevronDown, User2Icon } from "lucide-react";
import ProfileSettings from "./pages/profileSettings";
import Notifications from "./pages/profileNotifications";
import avatarImg from "@/assets/Ellipse 22.png"
import SignOutButton from "./components/SignOutButton";
import ForgotPasswordPage from "./components/ForgotPassword";
import ResetPasswordPage from "./components/ResetPassword";
import RegisterPage from "./pages/registerPage";
import ThemeToggle from "./components/themeToggle";
import useThemeStore from "./store/themeStore";
import { useEffect } from "react";
// Layout with Sidebar
function AppLayout() {
  return (
    <SidebarProvider>
      <AppSidebar className={"shadow-2xl"} />
      <SidebarInset>
        <header className="flex h-20 bg-background items-center gap-2 border-b px-4 shadow-2xl w-full justify-between">
          <SidebarTrigger />
          <SearchForm className=" me-auto flex w-[60%] h-full items-center py-5" />
          <div className="size-10 rounded-full bg-background border flex items-center justify-center"><BellIcon className="text-muted-foreground" /></div>
          <div className="h-10 rounded-full bg-background border flex items-center p-2 gap-2 justify-evenly"><img src={avatarImg} /><p>Account</p> <ChevronDown className="text-muted-foreground size-3" /></div>
          <SignOutButton />
          <ThemeToggle/>
        </header>

        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/songs" element={<SongsLibrary />} />
          <Route path="/airemix" element={<AIRemixGenerator />} />
          <Route path="/effects" element={<RemixWorkspace />} />
          <Route path="/beat" element={<BeatTempoControl />} />
          <Route path="/saved" element={<SavedRemixesProjects />} />
          <Route path="/profile" element={<Profile />}>
            <Route index element={<ProfileSettings />} />
            <Route path="change-password" element={<PasswordSettings />} />
            <Route path="notifications" element={<Notifications />} />
            <Route path="appearance" element={<AppearanceSettings />} />
          </Route>

        </Routes>
      </SidebarInset>
    </SidebarProvider>
  )
}

// Top-level routing
export default function App() {
  const { theme, setTheme } = useThemeStore()

  // when app mounts, apply stored theme
  useEffect(() => {
    setTheme(theme)
  }, [theme, setTheme])
  return (
    <Routes>
      {/* Auth route with NO sidebar */}
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/forgot-password" element={<ForgotPasswordPage />} />
      <Route path="/reset-password/:token" element={<ResetPasswordPage />} />

      {/* Everything else uses sidebar */}
      <Route path="/*" element={
        <ProtectedRoute>
          <AppLayout />
        </ProtectedRoute>
      } />
    </Routes>
  )
}
