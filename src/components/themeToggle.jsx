import { Moon, Sun } from "lucide-react"
import useThemeStore from "@/store/themeStore"

export default function ThemeToggle() {
  const { theme, toggleTheme } = useThemeStore()

  return (
    <button onClick={toggleTheme} className="p-2 rounded">
      {theme === "dark" ? <Sun /> : <Moon />}
    </button>
  )
}
