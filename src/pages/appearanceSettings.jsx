import { useState } from 'react';
import useThemeStore from '@/store/themeStore';

const AppearanceSettings = () => {
  const { theme, setTheme } = useThemeStore();   // directly use zustand store
  const [language, setLanguage] = useState('Value');

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
    <div className="min-h-screen bg-background flex">
      <div className="flex-1 p-8">
        <div className="max-w-2xl">
          <h2 className="text-2xl font-semibold text-accent-foreground mb-8">Appearance</h2>

          <div className="space-y-8">
            {/* Theme Section */}
            <div>
              <label className="block text-sm font-medium text-accent-foreground mb-4">
                Theme
              </label>
              <div className="grid grid-cols-3 gap-4">
                {themes.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setTheme(item.id)}
                    className={`relative p-3 rounded-xl border-2 transition-all ${
                      theme === item.id
                        ? "border-blue-500 bg-blue-50"
                        : "border-muted bg-muted hover:border-gray-300"
                    }`}
                  >
                    {item.preview}
                    <div className="mt-3 text-center">
                      <span
                        className={`text-sm font-medium ${
                          theme === item.id ? "text-blue-700" : "text-muted-foreground"
                        }`}
                      >
                        {item.name}
                      </span>
                    </div>
                    {theme === item.id && (
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
