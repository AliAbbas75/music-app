import { Music, Heart, MessageCircle, TrendingUp, Zap } from 'lucide-react';

export default function Notifications() {
    const notifications = [
        {
            id: 1,
            icon: Music,
            iconBg: 'bg-red-50',
            iconColor: 'text-red-500',
            title: 'Your remix "Summer Vibes" has been successfully saved!',
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua',
            time: 'Now',
            type: 'success'
        },
        {
            id: 2,
            icon: Heart,
            iconBg: 'bg-blue-50',
            iconColor: 'text-blue-500',
            title: 'DJ Ayaan liked your remix "Electro Drop"',
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua',
            time: '9:00 AM',
            type: 'like'
        },
        {
            id: 3,
            icon: MessageCircle,
            iconBg: 'bg-cyan-50',
            iconColor: 'text-cyan-500',
            title: 'New comment on "Lo-Fi Dreams": "This beat is fire!"',
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua',
            time: '1 Oct 2022',
            type: 'comment'
        },
        {
            id: 4,
            icon: TrendingUp,
            iconBg: 'bg-red-50',
            iconColor: 'text-red-500',
            title: 'Your remix "Midnight Flow" reached 1,000 plays!',
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua',
            time: '20 Sep 2022',
            type: 'milestone'
        },
        {
            id: 5,
            icon: Zap,
            iconBg: 'bg-blue-50',
            iconColor: 'text-blue-500',
            title: 'AI Remix Generator finished processing your track.',
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua',
            time: '1 Sep 2022',
            type: 'processing'
        }
    ];
    return (
        <div className="min-h-screen bg-gray-50 p-6">
            <div className="max-w-3xl mx-auto">
                <h1 className="text-2xl font-semibold text-gray-900 mb-6">Notifications</h1>

                <div className="space-y-4">
                    {notifications.map((notification) => {
                        const Icon = notification.icon;
                        return (
                            <div
                                key={notification.id}
                                className="bg-white rounded-xl p-4 hover:shadow-md transition-shadow duration-200 cursor-pointer"
                            >
                                <div className="flex items-start space-x-4">
                                    {/* Icon */}
                                    <div className={`${notification.iconBg} w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0`}>
                                        <Icon className={`w-5 h-5 ${notification.iconColor}`} />
                                    </div>

                                    {/* Content */}
                                    <div className="flex-1 min-w-0">
                                        <div className="flex items-start justify-between mb-2">
                                            <h3 className="text-sm font-medium text-gray-900 pr-4">
                                                {notification.title}
                                            </h3>
                                            <span className="text-xs text-gray-500 whitespace-nowrap">
                                                {notification.time}
                                            </span>
                                        </div>
                                        <p className="text-sm text-gray-600 leading-relaxed">
                                            {notification.description}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    )
}