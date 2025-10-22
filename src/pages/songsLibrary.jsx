import { Card } from "@/components/ui/card";

const SongsLibrary = () => {
    const songs = [
        {
            id: 1,
            title: "Midnight Confessions",
            artist: "@midnightmelody",
            cover: "bg-gradient-to-br from-purple-500 to-pink-500"
        },
        {
            id: 2,
            title: "Lost in the Moment",
            artist: "@saxophonegrand",
            cover: "bg-gradient-to-br from-blue-500 to-purple-500"
        },
        {
            id: 3,
            title: "Late Night Thoughts",
            artist: "@grandpianofesta",
            cover: "bg-gradient-to-br from-green-500 to-blue-500"
        },
        {
            id: 4,
            title: "Chill by the Window",
            artist: "@klarnettdream",
            cover: "bg-gradient-to-br from-pink-500 to-purple-500"
        },
        {
            id: 5,
            title: "Deep in Reflection",
            artist: "@klarnettdream",
            cover: "bg-gradient-to-br from-blue-400 to-pink-400"
        },
        {
            id: 6,
            title: "Slow Motion Memories",
            artist: "@klarnettdream",
            cover: "bg-gradient-to-br from-cyan-500 to-purple-500"
        }
    ];

    const tabs = [
        { id: 'local', label: 'Local Files', active: true },
        { id: 'spotify', label: 'Spotify', active: false },
        { id: 'apple', label: 'Apple Music', active: false },
        { id: 'upload', label: 'Upload', active: false }
    ];

    return (
        <div className="min-h-screen px-4 sm:px-6 md:px-10 py-4">
            {/* Header */}
            <Card className="my-4 px-3 sm:px-4 py-3">
                <h1 className="text-xl sm:text-2xl font-semibold text-accent-foreground text-center sm:text-left">
                    Song Library
                </h1>
            </Card>

            <div className="w-full">
                {/* Tabs */}
                <div className="flex flex-wrap gap-2 sm:gap-3 justify-center sm:justify-start mb-6 sm:mb-8">
                    {tabs.map((tab) => (
                        <button
                            key={tab.id}
                            className={`px-4 sm:px-6 py-2 rounded-full text-sm font-medium transition-all duration-200 ${tab.active
                                    ? "bg-blue-600 text-white shadow-sm"
                                    : "bg-muted text-accent-foreground hover:text-gray-900 hover:bg-gray-100"
                                }`}
                        >
                            {tab.label}
                        </button>
                    ))}
                </div>

                {/* Song List */}
                <div className="space-y-3 text-muted-foreground">
                    {songs.map((song) => (
                        <div
                            key={song.id}
                            className="flex items-center justify-between gap-3 sm:gap-4 p-3 sm:p-4 bg-background rounded-xl transition-colors hover:text-neutral-900 hover:bg-gray-200 duration-200 cursor-pointer group"
                        >
                            {/* Album Cover */}
                            <div
                                className={`w-12 h-12 sm:w-14 sm:h-14 rounded-xl ${song.cover} flex items-center justify-center shadow-sm group-hover:shadow-md transition-shadow duration-200 flex-shrink-0`}
                            >
                                <div className="w-6 h-6 bg-white/20 rounded-full flex items-center justify-center">
                                    <div className="w-2 h-2 bg-white rounded-full"></div>
                                </div>
                            </div>

                            {/* Song Info */}
                            <div className="flex-1 min-w-0">
                                <h3 className="text-sm sm:text-base font-medium truncate">
                                    {song.title}
                                </h3>
                                <p className="text-xs sm:text-sm text-muted-foreground truncate">
                                    {song.artist}
                                </p>
                            </div>

                            {/* Play Button */}
                            <div className="opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity duration-200 flex-shrink-0">
                                <button className="w-8 h-8 sm:w-9 sm:h-9 bg-blue-600 text-white rounded-full flex items-center justify-center hover:bg-blue-700 transition-colors duration-200">
                                    <svg
                                        className="w-4 h-4 ml-0.5"
                                        fill="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path d="M8 5v14l11-7z" />
                                    </svg>
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>

    );
};

export default SongsLibrary;