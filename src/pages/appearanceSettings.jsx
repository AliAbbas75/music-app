import { useState } from 'react';
import { User, Lock, Bell, Palette, Trash2 } from 'lucide-react';

const AppearanceSettings = () => {
    const [selectedTheme, setSelectedTheme] = useState('light');
    const [language, setLanguage] = useState('Value');

    const sidebarItems = [
        { id: 'profile', icon: User, label: 'Profile', active: false },
        { id: 'password', icon: Lock, label: 'Password', active: false },
        { id: 'notifications', icon: Bell, label: 'Notifications', active: false },
        { id: 'appearance', icon: Palette, label: 'Appearance', active: true }
    ];

    const themes = [
        {
            id: 'light',
            name: 'Light',
            preview: (
                <div className="w-full h-16 bg-white rounded-lg border border-gray-200 p-3 flex flex-col space-y-1">
                    <div className="h-2 bg-blue-500 rounded w-16"></div>
                    <div className="h-1.5 bg-gray-300 rounded w-12"></div>
                    <div className="h-1.5 bg-gray-300 rounded w-8"></div>
                </div>
            )
        },
        {
            id: 'dark',
            name: 'Dark',
            preview: (
                <div className="w-full h-16 bg-gray-900 rounded-lg border border-gray-700 p-3 flex flex-col space-y-1">
                    <div className="h-2 bg-blue-500 rounded w-16"></div>
                    <div className="h-1.5 bg-gray-600 rounded w-12"></div>
                    <div className="h-1.5 bg-gray-600 rounded w-8"></div>
                </div>
            )
        },
        {
            id: 'system',
            name: 'System',
            preview: (
                <div className="w-full h-16 bg-gradient-to-r from-white to-gray-900 rounded-lg border border-gray-300 p-3 flex flex-col space-y-1">
                    <div className="h-2 bg-blue-500 rounded w-16"></div>
                    <div className="h-1.5 bg-gray-400 rounded w-12"></div>
                    <div className="h-1.5 bg-gray-400 rounded w-8"></div>
                </div>
            )
        }
    ];

    return (
        <div className="min-h-screen bg-gray-50 flex">
            {/* Sidebar */}
            {/* Main Content */}
            <div className="flex-1 p-8">
                <div className="max-w-2xl">
                    <h2 className="text-2xl font-semibold text-gray-900 mb-8">Appearance</h2>

                    <div className="space-y-8">
                        {/* Theme Section */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-4">
                                Theme
                            </label>
                            <div className="grid grid-cols-3 gap-4">
                                {themes.map((theme) => (
                                    <button
                                        key={theme.id}
                                        onClick={() => setSelectedTheme(theme.id)}
                                        className={`relative p-3 rounded-xl border-2 transition-all ${selectedTheme === theme.id
                                                ? 'border-blue-500 bg-blue-50'
                                                : 'border-gray-200 bg-white hover:border-gray-300'
                                            }`}
                                    >
                                        {theme.preview}
                                        <div className="mt-3 text-center">
                                            <span className={`text-sm font-medium ${selectedTheme === theme.id ? 'text-blue-700' : 'text-gray-700'
                                                }`}>
                                                {theme.name}
                                            </span>
                                        </div>
                                        {selectedTheme === theme.id && (
                                            <div className="absolute top-2 right-2 w-4 h-4 bg-blue-500 rounded-full flex items-center justify-center">
                                                <div className="w-1.5 h-1.5 bg-white rounded-full"></div>
                                            </div>
                                        )}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Language Section */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Language
                            </label>
                            <input
                                type="text"
                                value={language}
                                onChange={(e) => setLanguage(e.target.value)}
                                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            />
                        </div>

                        {/* Save Changes Button */}
                        <div className="pt-4">
                            <button className="bg-blue-600 text-white px-8 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors">
                                Save Changes
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AppearanceSettings;