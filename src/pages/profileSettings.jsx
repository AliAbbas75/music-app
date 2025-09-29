import  { useState } from 'react';
import { User, Lock, Bell, Palette, Trash2, Camera } from 'lucide-react';
import avatarImg from "@/assets/avatar.png"

const ProfileSettings = () => {
  const [name, setName] = useState('Value');
  const [email, setEmail] = useState('mail@gmail.com');

  const sidebarItems = [
    { id: 'profile', icon: User, label: 'Profile', active: true },
    { id: 'password', icon: Lock, label: 'Password', active: false },
    { id: 'notifications', icon: Bell, label: 'Notifications', active: false },
    { id: 'appearance', icon: Palette, label: 'Appearance', active: false }
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}

      {/* Main Content */}
      <div className="flex-1 p-8">
        <div className="max-w-2xl">
          <h2 className="text-2xl font-semibold text-gray-900 mb-8">Profile</h2>

          <div className="space-y-6">
            {/* Avatar Section */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Avatar
              </label>
              <div className="flex items-center space-x-4">
                <div className="relative">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-orange-400 to-red-500 flex items-center justify-center">
                    <div className='flex w-full h-full'><img src= {avatarImg} alt="" /></div>
                  </div>
                  <button className="absolute -bottom-1 -right-1 w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center hover:bg-blue-700 transition-colors">
                    <Camera className="h-3 w-3" />
                  </button>
                </div>
                <div>
                  <button className="text-blue-600 hover:text-blue-700 font-medium text-sm">
                    Upload new image
                  </button>
                  <p className="text-xs text-gray-500 mt-1">
                    At least 800x800 px recommended. JPG or PNG and GIF is allowed.
                  </p>
                </div>
              </div>
            </div>

            {/* Name Field */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Name
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            {/* Email Field */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            {/* Update Button */}
            <div className="pt-4">
              <button className="bg-blue-600 text-white px-8 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors">
                Update
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileSettings;