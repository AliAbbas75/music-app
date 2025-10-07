import { useState } from 'react';
import { Camera, User as UserIcon } from 'lucide-react';
import API from "@/api"; // axios instance
import useAuthStore from "@/store/authStore";

const ProfileSettings = () => {
  const { user, setUser } = useAuthStore(); // user + updater from store

  const [imageFile, setImageFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState(user?.username || "");
  const [email, setEmail] = useState(user?.email || "");

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setPreview(URL.createObjectURL(file)); // local preview
    }
  };

  const handleUpload = async () => {
    if (!imageFile) return alert("Please select an image first.");
    setLoading(true);

    const formData = new FormData();
    formData.append("profileImage", imageFile);

    try {
      const { data } = await API.post("/user/upload-profile", formData, {
        headers: { "Content-Type": "multipart/form-data" },
        withCredentials: true,
      });

      // ✅ update Zustand user with new image URL
      setUser({
        ...user,
        profileImage: data.profileImage,
      });


      setPreview(null);
      setImageFile(null);
    } catch (err) {
      console.error(err);
      alert("Error uploading image");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex">
      <div className="flex-1 p-8">
        <div className="max-w-2xl">
          <h2 className="text-2xl font-semibold text-accent-foreground mb-8">Profile</h2>

          <div className="space-y-6">
            {/* Avatar Section */}
            {console.log(user.profileImage)}
            <div>
              <label className="block text-sm font-medium text-accent-foreground mb-3">
                Avatar
              </label>
              <div className="flex items-center space-x-4">
                <div className="relative">
                  <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-accent-foreground bg-background flex items-center justify-center">
                    {preview ? (
                      <img
                        src={preview}
                        alt="preview"
                        className="w-full h-full object-cover"
                      />
                    ) : user?.profileImage ? (
                      <img
                        src={`${user?.profileImage?.url || "/default.jpg"}`}
                        alt="avatar"
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <UserIcon className="h-8 w-8 text-gray-400" />
                    )}
                  </div>
                  <label
                    htmlFor="file-upload"
                    className="absolute -bottom-1 -right-1 w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center hover:bg-blue-700 cursor-pointer"
                  >
                    <Camera className="h-3 w-3" />
                  </label>
                  <input
                    id="file-upload"
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="hidden"
                  />
                </div>

                <div>
                  {preview && (
                    <div className="mt-2">
                      <p className="text-xs text-accent-foreground">Preview:</p>
                      <img
                        src={preview}
                        alt="preview"
                        width={150}
                        className="rounded border mt-1"
                      />
                    </div>
                  )}

                  <button
                    onClick={handleUpload}
                    disabled={loading || !imageFile}
                    className="bg-blue-500 text-white px-4 py-2 mt-2 rounded disabled:opacity-50"
                  >
                    {loading ? "Uploading..." : "Upload"}
                  </button>
                </div>
              </div>
              <p className="text-xs text-accent-foreground mt-1">
                At least 800x800 px recommended. JPG, PNG, or GIF allowed.
              </p>
            </div>

            {/* Name Field */}
            <div>
              <label className="block text-sm font-medium text-accent-foreground mb-2">
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
              <label className="block text-sm font-medium text-accent-foreground mb-2">
                Email
              </label>
              <input
                type="email"
                value={email}
                disabled
                className="w-full px-4 py-3 border border-gray-200 rounded-lg bg-background cursor-not-allowed"
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
