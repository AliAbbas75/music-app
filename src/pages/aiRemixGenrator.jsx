import { useState } from "react";
import { ChevronDown, Music, Sparkles, X, Loader2 } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import useAudioStore from "@/store/audioStore";
import API from "@/api"; // ✅ axios instance with auth headers
import ProcessingModal from "@/components/processingModal";
import { useNavigate } from "react-router-dom";

const AIRemixGenerator = () => {
  const {
    setTitle,
    setDescription,
    setSelectedCategory,
    setSelectedStyles,
    audioFile,
    title,
    description,
    selectedCategory,
    selectedStyles,
    clearAudioSession,
    uploadedAudio
  } = useAudioStore();

  const [loading, setLoading] = useState(false);
  const [creatingRemix, setCreatingRemix] = useState(false);
  const [uploading, setUploading] = useState(false); // ✅ new state
  const setAudioFile = useAudioStore((state) => state.setAudioFile);
  const setUploadedAudio = useAudioStore((state) => state.setUploadedAudio);
  const [completed, setCompleted] = useState(false);
  const [remixProgress, setRemixProgress] = useState(0);
  const [progressMessage, setProgressMessage] = useState('');
  const navigate = useNavigate();

  const styleOptions = [
    { id: "edm", label: "EDM" },
    { id: "lofi", label: "Lo-Fi" },
    { id: "rock", label: "Rock Remix" },
    { id: "jazz", label: "Jazz Fusion" },
  ];

  const categories = [
    "Rhymes & Realities",
    "Pop & Electronic",
    "Rock & Alternative",
    "Hip Hop & R&B",
    "Classical & Jazz",
    "World Music",
  ];

  // ─── File Change ──────────────────────────────────────────────
  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setAudioFile(file);
    e.target.value = "";

    console.log("🎵 Selected file:", { name: file.name, type: file.type, size: file.size });

    try {
      setUploading(true); // ✅ show uploading modal

      const formData = new FormData();
      formData.append("audio", file);

      const res = await API.post("/audio/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
        onUploadProgress: (progressEvent) => {
          const percent = Math.round((progressEvent.loaded * 100) / progressEvent.total);
          console.log(`Upload progress: ${percent}%`);
        },
      });

      console.log("✅ Upload success:", res.data.audio);
      setUploadedAudio(res.data);
    } catch (err) {
      console.error("❌ Upload failed:", err);
      alert("Upload failed. Check backend logs.");
    } finally {
      setUploading(false); // ✅ hide uploading modal
    }
  };

  // ─── Create Remix ─────────────────────────────────────────────
  const handleCreateRemix = async () => {
    try {
      if (!uploadedAudio?.audio.id) {
        alert("Please upload the song first before remixing.");
        return;
      }
      if (!selectedStyles.length) {
        alert("Please select a remix style.");
        return;
      }

      const style = selectedStyles[0];
      const fileId = uploadedAudio.audio.id;

      setCreatingRemix(true);
      setCompleted(false);
      setRemixProgress(0);
      setProgressMessage('Starting remix...');

      console.log(`🎵 Starting remix for fileId=${fileId}, style=${style}`);

      const res = await API.post(
        `/audio/${fileId}/remix`,
        { title },
        { params: { style } }
      );

      console.log("✅ Remix job started:", res.data);
      const jobId = res.data.job.jobId;

      const result = await pollRemixProgress(jobId);

      console.log("✅ Remix completed:", result);
      setCreatingRemix(false);
      setCompleted(true);
      navigate("/saved");
    } catch (error) {
      console.error("❌ Remix creation failed:", error);
      alert(`Remix failed: ${error.message}`);
      setCreatingRemix(false);
      setRemixProgress(0);
    }
  };

  const pollRemixProgress = async (jobId) => {
    let attempts = 0;
    const maxAttempts = 120;
    const pollInterval = 10000;

    return new Promise((resolve, reject) => {
      const interval = setInterval(async () => {
        attempts++;

        try {
          const response = await API.get(`/audio/remix-job/${jobId}/status`);
          const status = response.data;

          console.log(`📊 Poll ${attempts}: ${status.status} - ${status.progress}%`);

          if (status.progress !== undefined) setRemixProgress(status.progress);
          if (status.progressMessage) setProgressMessage(status.progressMessage);

          if (status.status === 'completed') {
            clearInterval(interval);
            setRemixProgress(100);
            setProgressMessage('Remix completed!');
            resolve(status);
          }

          if (status.status === 'failed') {
            clearInterval(interval);
            reject(new Error(status.error || 'Remix failed'));
          }

          if (attempts >= maxAttempts) {
            clearInterval(interval);
            reject(new Error('Remix timed out after 10 minutes'));
          }

        } catch (error) {
          console.error('❌ Polling error:', error);
          clearInterval(interval);
          reject(error);
        }
      }, pollInterval);
    });
  };

  // ─── Render ──────────────────────────────────────────────────
  return (
    <div className="px-10 py-2 m-4">
      <div className="w-full">
        <Card className="my-4 px-2">
          <h1 className="text-2xl font-semibold text-accent-foreground">
            AI Remix Generator
          </h1>
        </Card>

        <div className="space-y-6">
          {/* Song Description */}
          <div>
            <label className="block text-sm font-medium text-muted-foreground mb-3">
              Song Description
            </label>
            <div className="relative">
              <Sparkles className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
              <textarea
                className="w-full pl-10 pr-4 py-3 border rounded-xl resize-none h-24 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="e.g. Create an upbeat pop song..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>
          </div>

          {/* Style Options */}
          <div>
            <label className="block text-sm font-medium text-muted-foreground mb-3">
              Style Options
            </label>
            <div className="flex flex-wrap gap-2">
              {styleOptions.map((style) => (
                <button
                  key={style.id}
                  onClick={() =>
                    setSelectedStyles(
                      selectedStyles.includes(style.label)
                        ? selectedStyles.filter((s) => s !== style.label)
                        : [...selectedStyles, style.label]
                    )
                  }
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${selectedStyles.includes(style.label)
                    ? "bg-blue-600 text-white"
                    : "bg-white text-gray-600 border border-gray-200 hover:border-gray-300"
                    }`}
                >
                  {style.label}
                </button>
              ))}
            </div>
          </div>

          {/* Categories */}
          <div>
            <label className="block text-sm font-medium text-muted-foreground mb-3">
              Categories
            </label>
            <div className="relative">
              <select
                className="w-full px-4 py-3 pr-10 border rounded-xl bg-muted text-muted-foreground focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none"
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
              >
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
              <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400 pointer-events-none" />
            </div>
          </div>

          {/* Add Media */}
          <div>
            <label className="block text-sm font-medium text-muted-foreground mb-3">
              Add Media
            </label>
            <div className="flex items-center space-x-3 p-3 bg-background rounded-xl border">
              <Music className="h-5 w-5 text-muted-foreground" />
              {audioFile ? (
                <>
                  <span className="text-sm text-muted-foreground flex-1">
                    {audioFile.name}
                  </span>
                  <button
                    onClick={() => setAudioFile(null)}
                    className="w-6 h-6 bg-gray-100 rounded-full flex items-center justify-center hover:bg-gray-200 transition-colors"
                  >
                    <X className="h-3 w-3 text-gray-500" />
                  </button>
                </>
              ) : (
                <input
                  type="file"
                  accept="audio/*"
                  onChange={handleFileChange}
                  className="text-sm text-muted-foreground flex-1"
                />
              )}
            </div>
          </div>

          {/* Title */}
          <div>
            <label className="block text-sm font-medium text-muted-foreground mb-3">
              Title
            </label>
            <input
              type="text"
              className="w-full px-4 py-3 border rounded-xl placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Enter Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>

          {/* Action Buttons */}
          <div className="flex items-center space-x-3 pt-4">
            <Button
              onClick={clearAudioSession}
              className="bg-muted text-muted-foreground border rounded-full hover:text-gray-800 font-medium transition-colors gap-2 p-4"
              disabled={loading}
            >
              <X className="h-4 w-4 inline" />
              <span>Clear</span>
            </Button>
            <Button
              onClick={handleCreateRemix}
              disabled={loading}
              className="bg-blue-600 text-white max-w-40 rounded-xl font-medium hover:bg-blue-700 transition-colors flex items-center justify-center gap-2 p-4"
            >
              {loading ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  <span>Processing...</span>
                </>
              ) : (
                <>
                  <Sparkles className="h-4 w-4" />
                  <span>Create</span>
                </>
              )}
            </Button>
          </div>

          {creatingRemix && <ProcessingModal completed={completed} />}

          {/* ✅ Uploading Modal */}
          {uploading && (
            <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
              <div className="bg-white dark:bg-neutral-900 rounded-2xl p-6 flex flex-col items-center space-y-3 shadow-xl">
                <Loader2 className="h-6 w-6 animate-spin text-blue-600" />
                <p className="text-sm font-medium text-muted-foreground">
                  Uploading audio file...
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AIRemixGenerator;
