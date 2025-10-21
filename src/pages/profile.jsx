import { useEffect, useState } from 'react';
import {
  UserIcon,
  LockIcon,
  BellIcon,
  PaletteIcon,
  Trash2Icon,
  MenuIcon,
  XIcon,
} from 'lucide-react';
import { NavLink, Outlet } from 'react-router-dom';
import useThemeStore from '@/store/themeStore';
import DeleteAccountModal from '@/components/deleteModal';

const Profile = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const theme = useThemeStore((state) => state.theme);
  const [pageTheme, setTheme] = useState(theme);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  useEffect(() => {
    setTheme(theme);
  }, [theme]);

  const navigationItems = [
    { id: 'profile', label: 'Profile', icon: <UserIcon />, url: '/profile' },
    { id: 'password', label: 'Password', icon: <LockIcon />, url: '/profile/change-password' },
    { id: 'notifications', label: 'Notifications', icon: <BellIcon />, url: '/profile/notifications' },
    { id: 'appearance', label: 'Appearance', icon: <PaletteIcon />, url: '/profile/appearance' },
  ];

  return (
    <div className="min-h-screen bg-background flex flex-col md:flex-row overflow-x-hidden">
      {/* ─── Mobile Header ─────────────────────────────── */}
      <div className="flex items-center justify-between p-4 border-b md:hidden">
        <h1 className="text-lg font-semibold text-accent-foreground">Profile</h1>
        <button
          onClick={() => setIsSidebarOpen((prev) => !prev)}
          className="p-2 rounded-md border hover:bg-muted transition-colors"
        >
          {isSidebarOpen ? (
            <XIcon className="w-5 h-5 text-muted-foreground" />
          ) : (
            <MenuIcon className="w-5 h-5 text-muted-foreground" />
          )}
        </button>
      </div>

      {/* ─── Sidebar ─────────────────────────────── */}
      <aside
        className={`${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } md:translate-x-0 fixed md:static inset-y-0 left-0 z-50 w-64 bg-background border-r md:border-none p-6 transform transition-transform duration-300 ease-in-out`}
      >
        <h1 className="text-xl font-semibold text-accent-foreground mb-8 hidden md:block">
          Profile
        </h1>

        <nav className="space-y-2">
          {navigationItems.map((item) => (
            <NavLink
              key={item.label}
              to={item.url}
              end
              onClick={() => setIsSidebarOpen(false)} // auto-close on mobile
              className={({ isActive }) =>
                `flex items-center gap-3 h-12 px-4 rounded-md transition-colors ${
                  isActive
                    ? `bg-blue-500 ${
                        pageTheme === 'light'
                          ? 'text-white'
                          : 'text-accent-foreground'
                      }`
                    : 'text-accent-foreground hover:bg-gray-100 hover:text-black'
                }`
              }
            >
              {item.icon}
              <span>{item.label}</span>
            </NavLink>
          ))}
        </nav>

        {/* Delete Account Button */}
        <div className="mt-8 pt-8 border-t border-gray-200">
          <button
            onClick={() => setIsDeleteModalOpen(true)}
            className="flex items-center space-x-3 px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg text-sm font-medium transition-colors w-full"
          >
            <Trash2Icon className="h-4 w-4" />
            <span>Delete account</span>
          </button>
        </div>
      </aside>

      {/* ─── Overlay for Mobile ─────────────────────────────── */}
      {isSidebarOpen && (
        <div
          onClick={() => setIsSidebarOpen(false)}
          className="fixed inset-0 bg-black/40 md:hidden z-40"
        />
      )}

      {/* ─── Main Content ─────────────────────────────── */}
      <main className="flex-1 p-4 sm:p-6 md:p-8 overflow-y-auto">
        <Outlet />
      </main>

      {/* ─── Delete Account Modal ─────────────────────────────── */}
      <DeleteAccountModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
      />
    </div>
  );
};

export default Profile;
