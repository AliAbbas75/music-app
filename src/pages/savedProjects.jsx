import { useEffect, useState, useRef } from "react";
import { Play, Pause, Loader2 } from "lucide-react";
import API from "@/api";

const SavedRemixesProjects = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [playingId, setPlayingId] = useState(null);
  const audioRef = useRef(null); // persistent audio instance

  useEffect(() => {
    const fetchAudioFiles = async () => {
      try {
        const res = await API.get("/audio/user");
        console.log("Data\n", res.data);

        // ✅ Filter only remixes and sort by newest first
        const remixesOnly = res.data
          .filter(a => a.isRemix)
          .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

        const formatted = remixesOnly.map(a => ({
          id: a.id,
          title: a.title || `${a.originalName || "Untitled"} (Remix)`,
          isRemix: a.isRemix,
          artist: "@you",
          streamUrl: `http://localhost:5000/api/audio/${a.id}/stream`,
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
  }, []);

  const handlePlay = async (projectId) => {
    try {
      const project = projects.find(p => p.id === projectId);

      // ✅ If same audio is already playing → pause it
      if (playingId === projectId && audioRef.current) {
        audioRef.current.pause();
        setPlayingId(null);
        return;
      }

      // ✅ If another audio is playing → stop it first
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
      }

      // ✅ Fetch full audio file (blob)
      const res = await API.get(project.streamUrl, { responseType: "blob" });
      const blobUrl = URL.createObjectURL(res.data);

      const audio = new Audio(blobUrl);
      audioRef.current = audio;
      setPlayingId(projectId);

      audio.play();

      // ✅ Cleanup when finished
      audio.onended = () => {
        setPlayingId(null);
      };
    } catch (err) {
      console.error("Audio playback error:", err);
    }
  };

  // ---- UI ----
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
    <div className=" px-8 py-2">
      <h1 className="text-2xl font-semibold text-muted-foreground mb-8">
        Saved Remixes / Projects
      </h1>

      <div className="space-y-4">
        {projects.map((project) => (
          <div
            key={project.id}
            className="flex items-center space-x-4 p-4 text-muted-foreground hover:text-black rounded-xl hover:bg-gray-50 transition-colors duration-200 cursor-pointer group"
          >
            {/* Album Art */}
            <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-indigo-500 to-blue-500 flex items-center justify-center shadow-sm group-hover:shadow-md transition-shadow duration-200 flex-shrink-0">
              <div className="w-6 h-6 bg-white/20 rounded-full flex items-center justify-center">
                <div className="w-2 h-2 bg-white rounded-full"></div>
              </div>
            </div>

            {/* Info */}
            <div className="flex-1 min-w-0">
              <h3 className="text-base font-medium truncate">{project.title}</h3>
              <p className="text-sm text-muted-foreground truncate">{project.artist}</p>
            </div>

            {/* Play/Pause Button */}
            <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex-shrink-0">
              <button
                onClick={() => handlePlay(project.id)}
                className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors duration-200 shadow-md ${
                  playingId === project.id
                    ? "bg-green-600 hover:bg-green-700 text-white"
                    : "bg-blue-600 hover:bg-blue-700 text-white"
                }`}
              >
                {playingId === project.id ? (
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
