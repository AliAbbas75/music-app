import { create } from "zustand";
import { persist } from "zustand/middleware";

const DEFAULT_API_HOST = "https://deployment-production-5b5d.up.railway.app";
const API_BASE = import.meta.env.VITE_API_BASE || `${DEFAULT_API_HOST}/api`;
const API_HOST = API_BASE.replace(/\/api\/?$/, "");
const API_URL = `${API_HOST}/api/auth`;

let logoutTimer = null;

const useAuthStore = create(
  persist(
    (set, get) => ({
      user: null,
      token: null,
      loginTime: null, // 🕒 time when user logged in
      sessionDuration: 60 * 60 * 1000, // ⏱️ 1 hour (change to 10 * 1000 for testing)

      // 🟢 LOGIN
      login: (user, token) => {
        const loginTime = Date.now();
        const expiryTime = loginTime + get().sessionDuration;

        set({ user, token, loginTime });

        if (logoutTimer) clearTimeout(logoutTimer);

        const remainingTime = expiryTime - Date.now();
        logoutTimer = setTimeout(() => {
          console.log("⏰ Session expired — auto-logging out.");
          get().logout();
        }, remainingTime);

        console.log(`✅ Logged in. Session expires in ${remainingTime / 1000}s.`);
      },

      // 🔴 LOGOUT
      logout: () => {
        if (logoutTimer) clearTimeout(logoutTimer);
        logoutTimer = null;
        set({ user: null, token: null, loginTime: null });
        localStorage.removeItem("auth-storage");
        console.log("🚪 Logged out.");
      },

      // ♻️ RESTORE SESSION (runs on app reload)
      restoreSession: () => {
        const { user, loginTime, sessionDuration } = get();
        if (!user || !loginTime) return;

        const expiryTime = loginTime + sessionDuration;
        const remainingTime = expiryTime - Date.now();

        if (remainingTime > 0) {
          console.log(`♻️ Restored session. ${Math.ceil(remainingTime / 1000)}s left.`);
          if (logoutTimer) clearTimeout(logoutTimer);
          logoutTimer = setTimeout(() => {
            console.log("⏰ Session expired (after reload) — auto-logout.");
            get().logout();
          }, remainingTime);
        } else {
          console.log("⚠️ Session already expired — logging out.");
          get().logout();
        }
      },

      // 🟡 Fetch user info
      fetchUser: async () => {
        const token = get().token;
        if (!token) return;

        try {
          const res = await fetch(`${API_URL}/auth`, {
            method: "GET",
            headers: { Authorization: `Bearer ${token}` },
            credentials: "include",
          });
          const data = await res.json();
          if (!res.ok) throw new Error(data.msg || "Failed to fetch user");

          set({ user: data.user });
          return data.user;
        } catch (err) {
          console.error("Fetch user error:", err.message);
          get().logout();
        }
      },

      // 🧩 Signup
      signup: async (username, email, password) => {
        try {
          const res = await fetch(`${API_URL}/register`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ username, email, password }),
          });

          const data = await res.json();
          if (!res.ok) throw new Error(data.msg || "Signup failed");

          get().login(data.user, data.token);
          return { success: true, user: data.user };
        } catch (err) {
          console.error("Signup error:", err.message);
          return { success: false, error: err.message };
        }
      },

      // 🗑️ Delete Account
      deleteAccount: async () => {
        try {
          const res = await fetch(`${API_URL}/user/delete`, {
            method: "DELETE",
            headers: { Authorization: `Bearer ${get().token}` },
          });

          if (res.status === 200) {
            get().logout();
            return { success: true };
          } else {
            const data = await res.json();
            return { success: false, error: data?.msg || "Delete failed" };
          }
        } catch (err) {
          console.error("Delete account error:", err.message);
          return { success: false, error: err.message };
        }
      },
    }),
    {
      name: "auth-storage",
      onRehydrateStorage: () => (state) => {
        // ⏳ Once hydrated from localStorage, restart the session timer
        setTimeout(() => {
          if (state?.restoreSession) state.restoreSession();
        }, 100);
      },
    }
  )
);

export default useAuthStore;
