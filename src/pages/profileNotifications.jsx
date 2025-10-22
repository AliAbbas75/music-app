import { useEffect } from "react";
import { Music, Heart, MessageCircle, TrendingUp, Zap, Check } from "lucide-react";
import useNotificationStore from "@/store/notificationStore";
import { Button } from "@/components/ui/button";

const ICON_MAP = {
  remix_created: { icon: Music, color: "text-red-500", bg: "bg-red-50" },
  audio_uploaded: { icon: Zap, color: "text-blue-500", bg: "bg-blue-50" },
  like: { icon: Heart, color: "text-pink-500", bg: "bg-pink-50" },
  comment: { icon: MessageCircle, color: "text-cyan-500", bg: "bg-cyan-50" },
  milestone: { icon: TrendingUp, color: "text-green-500", bg: "bg-green-50" },
  default: { icon: Zap, color: "text-gray-500", bg: "bg-gray-50" },
};

export default function Notifications() {
  const { notifications, fetchNotifications, loading, markAllAsRead, markOneAsRead } =
    useNotificationStore();

  useEffect(() => {
    fetchNotifications();
  }, []);

  return (
    <div className="min-h-screen bg-background px-4 sm:px-6 py-6">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-6">
          <h1 className="text-xl sm:text-2xl font-semibold text-accent-foreground text-center sm:text-left truncate">
            Notifications
          </h1>

          {notifications.length > 0 && (
            <Button
              size="sm"
              variant="outline"
              onClick={markAllAsRead}
              className="text-sm self-center sm:self-auto"
            >
              Mark all as read
            </Button>
          )}
        </div>

        {/* Loading / Empty states */}
        {loading ? (
          <div className="text-gray-500 text-center py-10">Loading notifications...</div>
        ) : notifications.length === 0 ? (
          <div className="text-gray-500 text-center py-10">No notifications yet.</div>
        ) : (
          <div className="space-y-4">
            {notifications.map((n) => {
              const { icon: Icon, color, bg } = ICON_MAP[n.type] || ICON_MAP.default;
              return (
                <div
                  key={n._id}
                  className={`bg-white rounded-xl p-4 sm:p-5 hover:shadow-md transition-all duration-200 cursor-pointer border
                    ${n.read ? "border-gray-100 opacity-70" : "border-blue-100"}
                  `}
                >
                  <div className="flex items-start gap-3 sm:gap-4">
                    {/* Icon */}
                    <div className={`${bg} w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0`}>
                      <Icon className={`w-5 h-5 ${color}`} />
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-2">
                        <h3 className="text-sm font-medium text-gray-900 leading-snug break-words overflow-hidden">
                          {n.message}
                        </h3>

                        <div className="flex items-center gap-2 flex-shrink-0">
                          <span className="text-xs text-gray-500 whitespace-nowrap">
                            {new Date(n.createdAt).toLocaleString()}
                          </span>

                          {!n.read && (
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                markOneAsRead(n._id);
                              }}
                              className="text-blue-500 hover:text-blue-700 transition"
                              title="Mark as read"
                            >
                              <Check className="w-4 h-4" />
                            </button>
                          )}
                        </div>
                      </div>

                      {/* Optional metadata */}
                      {n.metadata?.audioId && (
                        <p className="text-xs text-gray-600 truncate">
                          Audio ID: {n.metadata.audioId}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
