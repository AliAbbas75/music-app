import { useEffect, useState, useRef } from "react";
import { Play, Pause, Loader2 } from "lucide-react";
import API from "@/api";

const SavedRemixesProjects = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [playingId, setPlayingId] = useState(null);
  const [loadingId, setLoadingId] = useState(null); // 🔥 Spinner control
  const audioRef = useRef(null);

  useEffect(() => {
    const fetchAudioFiles = async () => {
      try {
        const res = await API.get("/audio/user");

        const remixesOnly = res.data
          .filter((a) => a.isRemix)
          .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

        const apiBase =
          API.defaults?.baseURL ||
          import.meta.env.VITE_API_BASE ||
          "http://localhost:5000/api";

        const apiHost = apiBase.replace(/\/api\/?$/, "");

        const formatted = remixesOnly.map((a) => ({
          id: a.id,
          title: a.title || `${a.originalName || "Untitled"} (Remix)`,
          isRemix: a.isRemix,
          artist: "@you",
          streamUrl: `${apiHost}/api/audio/${a.id}/stream`,
          createdAt: a.createdAt,
        }));

        setProjects(formatted);
      } catch (err) {
        console.error("Failed to fetch audio files:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchAudioFiles();

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  const handlePlay = async (projectId) => {
    try {
      const project = projects.find((p) => p.id === projectId);

      // If the same song is playing — pause it
      if (playingId === projectId && audioRef.current) {
        audioRef.current.pause();
        setPlayingId(null);
        return;
      }

      // Stop previous song if another is playing
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
      }

      // 🔥 Show spinner while fetching audio blob
      setLoadingId(projectId);

      const res = await API.get(project.streamUrl, { responseType: "blob" });
      const blobUrl = URL.createObjectURL(res.data);

      const audio = new Audio(blobUrl);
      audioRef.current = audio;

      // After fetch, stop spinner and start playback
      setLoadingId(null);
      setPlayingId(projectId);

      audio.play();

      // Cleanup on end
      audio.onended = () => setPlayingId(null);
      audio.onerror = () => {
        console.error("Audio error");
        setPlayingId(null);
      };
    } catch (err) {
      console.error("Audio playback error:", err);
      setLoadingId(null);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-40 text-muted-foreground">
        <Loader2 className="w-6 h-6 animate-spin mr-2" />
        Loading your remixes...
      </div>
    );
  }

  if (projects.length === 0) {
    return (
      <div className="text-center text-muted-foreground py-8">
        No saved remixes yet.
      </div>
    );
  }

  return (
    <div className="px-4 sm:px-8 py-4">
      <h1 className="text-xl sm:text-2xl font-semibold text-muted-foreground mb-6 sm:mb-8">
        Saved Remixes / Projects
      </h1>

      <div className="space-y-3 sm:space-y-4">
        {projects.map((project) => (
          <div
            key={project.id}
            className="flex items-center justify-between p-4 sm:p-5 text-muted-foreground hover:text-black rounded-xl hover:bg-gray-50 transition-colors duration-200 cursor-pointer group"
          >
            {/* Left Section */}
            <div className="flex items-center space-x-4 min-w-0">
              {/* Album Art */}
              <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-gradient-to-br from-indigo-500 to-blue-500 flex items-center justify-center shadow-sm group-hover:shadow-md transition-shadow duration-200 flex-shrink-0">
                <div className="w-6 h-6 bg-white/20 rounded-full flex items-center justify-center">
                  <div className="w-2 h-2 bg-white rounded-full"></div>
                </div>
              </div>

              {/* Info */}
              <div className="flex-1 min-w-0">
                <h3 className="text-sm sm:text-base font-medium truncate">
                  {project.title}
                </h3>
                <p className="text-xs sm:text-sm text-muted-foreground truncate">
                  {project.artist}
                </p>
              </div>
            </div>

            {/* Play/Pause/Spinner Button */}
            <div className="opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity duration-200 flex-shrink-0 ml-3">
              <button
                onClick={() => handlePlay(project.id)}
                disabled={loadingId === project.id}
                className={`w-9 h-9 sm:w-10 sm:h-10 rounded-full flex items-center justify-center transition-colors duration-200 shadow-md ${
                  playingId === project.id
                    ? "bg-green-600 hover:bg-green-700 text-white"
                    : "bg-blue-600 hover:bg-blue-700 text-white"
                }`}
              >
                {loadingId === project.id ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : playingId === project.id ? (
                  <Pause className="w-4 h-4" fill="currentColor" />
                ) : (
                  <Play className="w-4 h-4 ml-0.5" fill="currentColor" />
                )}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SavedRemixesProjects;
