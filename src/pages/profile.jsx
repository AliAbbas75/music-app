import React, { useState } from 'react';
import { UserIcon, LockIcon, BellIcon, PaletteIcon, Trash2Icon, UploadIcon } from 'lucide-react';
import { NavLink, Outlet } from 'react-router-dom';

const Profile = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('mail@gmail.com');
    const [activeTab, setActiveTab] = useState('profile');

    const navigationItems = [
        { id: 'profile', label: 'Profile', icon: <UserIcon />, active: true, url: "/profile" },
        { id: 'password', label: 'Password', icon: <LockIcon />, active: false, url: "/profile/change-password" },
        { id: 'notifications', label: 'Notifications', icon: <BellIcon />, active: false, url: "/profile/notifications" },
        { id: 'appearance', label: 'Appearance', icon: <PaletteIcon />, active: false, url: "/profile/appearance" }
    ];

    return (
        <div className="min-h-screen bg-gray-50 flex">
            {/* Sidebar */}
            <div className="w-64 bg-white min-h-screen p-6">
                <h1 className="text-xl font-semibold text-gray-900 mb-8">Profile</h1>

                <nav className="space-y-2">
                    {navigationItems.map((item) => (
                        <NavLink
                            key={item.title}
                            to={item.url}
                            end // use end here so each link is active only on its exact URL
                            className={({ isActive }) =>
                                `flex items-center gap-3 h-12 px-4 rounded-md transition-colors ${isActive
                                    ? "bg-blue-500 text-white"
                                    : "text-gray-700 hover:bg-gray-100"
                                }`
                            }
                        >
                            {item.label}
                        </NavLink>
                    ))}
                </nav>

                <div className="mt-8 pt-8 border-t border-gray-200">
                    <button className="flex items-center space-x-3 px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg text-sm font-medium transition-colors">
                        <Trash2Icon className="h-4 w-4" />
                        <span>Delete account</span>
                    </button>
                </div>
            </div>

            {/* Main content */}
            <div className="flex-1 p-6">
                <Outlet />
            </div>
        </div>
    );
};

export default Profile;

