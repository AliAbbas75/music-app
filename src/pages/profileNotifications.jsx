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
        <div className="min-h-screen bg-background p-6">
            <div className="max-w-3xl mx-auto">
                <div className="flex items-center justify-between mb-6">
                    <h1 className="text-2xl font-semibold text-accent-foreground">Notifications</h1>

                    {notifications.length > 0 && (
                        <Button
                            size="sm"
                            variant="outline"
                            onClick={markAllAsRead}
                            className="text-sm"
                        >
                            Mark all as read
                        </Button>
                    )}
                </div>

                {loading ? (
                    <div className="text-gray-500 text-center">Loading notifications...</div>
                ) : notifications.length === 0 ? (
                    <div className="text-gray-500 text-center">No notifications yet.</div>
                ) : (
                    <div className="space-y-4">
                        {notifications.map((n) => {
                            const { icon: Icon, color, bg } = ICON_MAP[n.type] || ICON_MAP.default;
                            return (
                                <div
                                    key={n._id}
                                    className={`bg-white rounded-xl p-4 hover:shadow-md transition-all duration-200 cursor-pointer border ${n.read ? "border-gray-100 opacity-70" : "border-blue-100"
                                        }`}
                                >
                                    {!n.read && <span className="w-2 h-2 bg-blue-500 rounded-full ml-1" />}

                                    <div className="flex items-start space-x-4">
                                        <div
                                            className={`${bg} w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0`}
                                        >
                                            <Icon className={`w-5 h-5 ${color}`} />
                                        </div>

                                        <div className="flex-1 min-w-0">
                                            <div className="flex items-start justify-between mb-2">
                                                <h3 className="text-sm font-medium text-gray-900 pr-4">
                                                    {n.message}
                                                </h3>
                                                <div className="flex items-center gap-2">
                                                    <span className="text-xs text-gray-500 whitespace-nowrap">
                                                        {new Date(n.createdAt).toLocaleString()}
                                                    </span>
                                                    {!n.read && (
                                                        <button
                                                            onClick={(e) => {
                                                                e.stopPropagation();
                                                                markOneAsRead(n._id);
                                                            }}
                                                            className="text-xs text-blue-500 hover:text-blue-700"
                                                        >
                                                            <Check className="w-4 h-4" />
                                                        </button>
                                                    )}
                                                </div>
                                            </div>
                                            {n.metadata?.audioId && (
                                                <p className="text-xs text-gray-600">
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
