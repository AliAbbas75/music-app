import { create } from "zustand";
import { persist } from "zustand/middleware";
import API from "@/api";

const useNotificationStore = create(
  persist(
    (set, get) => ({
      notifications: [],
      loading: false,
      error: null,

      fetchNotifications: async () => {
        try {
          set({ loading: true });
          const res = await API.get("/notifications");
          set({ notifications: res.data.notifications || [], loading: false });
        } catch (err) {
          console.error("Error fetching notifications:", err);
          set({ error: err.message, loading: false });
        }
      },

      markAllAsRead: async () => {
        try {
          await API.put("/notifications/mark-read");
          // Update locally without refetching
          set({
            notifications: get().notifications.map((n) => ({
              ...n,
              read: true,
            })),
          });
        } catch (err) {
          console.error("Error marking all as read:", err);
        }
      },

      markOneAsRead: async (id) => {
        try {
          await API.put(`/notifications/${id}/mark-read`);
          set({
            notifications: get().notifications.map((n) =>
              n._id === id ? { ...n, read: true } : n
            ),
          });
        } catch (err) {
          console.error("Error marking notification as read:", err);
        }
      },

      addNotification: (n) =>
        set({ notifications: [n, ...get().notifications] }),

      clearNotifications: () => set({ notifications: [] }),
    }),
    {
      name: "notification-storage",
      partialize: (state) => ({ notifications: state.notifications }),
    }
  )
);

export default useNotificationStore;
