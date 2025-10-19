import { useState } from "react";
import useAuthStore from "@/store/authStore";

export default function DeleteAccountModal({ isOpen, onClose }) {
  const { deleteAccount } = useAuthStore();
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null; // ⛔ Prevent rendering when closed

  const handleDelete = async () => {
    setLoading(true);
    const result = await deleteAccount();
    setLoading(false);

    if (result.success) {
      alert("Your account has been deleted.");
      window.location.href = "/";
    } else {
      alert(result.error || "Failed to delete account.");
    }
    onClose(); // Close modal after action
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
      <div className="bg-white dark:bg-gray-900 p-6 rounded-2xl shadow-xl w-[90%] max-w-sm text-center">
        <h2 className="text-lg font-semibold mb-3 text-gray-900 dark:text-gray-100">
          Confirm Account Deletion
        </h2>
        <p className="text-gray-600 dark:text-gray-300 mb-5 text-sm">
          This action <b>cannot be undone</b>. Are you sure you want to delete your account?
        </p>
        <div className="flex justify-center gap-3">
          <button
            onClick={handleDelete}
            disabled={loading}
            className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 disabled:opacity-50"
          >
            {loading ? "Deleting..." : "Yes, Delete"}
          </button>
          <button
            onClick={onClose}
            className="bg-gray-300 dark:bg-gray-700 text-gray-900 dark:text-gray-100 px-4 py-2 rounded hover:bg-gray-400 dark:hover:bg-gray-600"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
