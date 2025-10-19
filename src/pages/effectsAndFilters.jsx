import { ChevronDown, Sparkles, X } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import useAudioStore from "@/store/audioStore";
import AudioProcessor from "@/components/audioProcessor"; // adjust import path
import API from "@/api";
import SuccessModal from "@/components/SuccessModal";
import { useState } from "react";

const RemixWorkspace = () => {
  const {
    effects,
    setEffects,
    selectedCategory,
    toggleEffect,
    setSelectedCategory,
    clearAudioSession,
    exportHandler
  } = useAudioStore();

  const timelineOptions = [
    "Waveform view of track",
    "Grid view",
    "Piano roll",
    "Arrangement view",
  ];

  const categories = [
    "Rhymes & Realities",
    "Pop & Electronic",
    "Rock & Alternative",
    "Hip Hop & R&B",
    "Classical & Jazz",
    "World Music",
  ];

  const effectOptions = [
    { id: "echo", label: "Echo" },
    { id: "reverb", label: "Reverb" },
    { id: "distortion", label: "Distortion" },
    { id: "autotune", label: "Auto-Tune" },
    { id: "lowpass", label: "Low-Pass Filter" },
  ];
  const [showSuccessModal, setShowSuccessModal] = useState(false);


  // In effectsAndFilters.jsx (RemixWorkspace)
  const handleApply = async () => {
    try {
      const { audioFile, audioBuffer, bpm } = useAudioStore.getState();

      // Validate audio file existence
      if (!audioFile) {
        alert("Please select an audio file in the AI Remix Generator page first");
        return;
      }

      // Validate audio buffer (processed audio)
      if (!audioBuffer) {
        alert("Please wait for the audio to be processed before applying effects");
        return;
      }

      // Validate export handler
      if (!exportHandler) {
        alert("Audio processor is not ready. Please ensure the audio is loaded correctly");
        return;
      }

      // Generate the remix file
      const remixFile = await exportHandler();
      if (!remixFile) {
        alert("Failed to generate remix file. Please try again");
        return;
      }

      // Create and validate FormData
      const formData = new FormData();

      console.log("File in Effects page after apply click: ", remixFile)
      // Ensure the File object is properly created and added
      if (!(remixFile instanceof File)) {
        throw new Error("Invalid remix file format");
      }

      // Log the file details before append
      console.log("File to upload:", {
        name: remixFile.name,
        type: remixFile.type,
        size: remixFile.size
      });

      // Append file with explicit filename
      formData.append("audio", remixFile, remixFile.name);
      formData.append("isRemix", "true");
      formData.append("bpm", bpm?.toString() || "120");

      // Log FormData contents
      for (let pair of formData.entries()) {
        console.log(pair[0], pair[1]);
      }

      // Remove Content-Type header - let the browser set it with the boundary
      const res = await API.post("/audio/upload", formData, {
        headers: {
          // Remove Content-Type header to let browser set it with boundary
        },
      });

      if (!res.data) {
        throw new Error("No response data from server");
      }

      console.log("✅ Remix uploaded:", res.data);
      setShowSuccessModal(true);
    } catch (err) {
      console.error("❌ Remix upload failed:", err);
      // Log detailed error information
      if (err.response) {
        console.error("Response data:", err.response.data);
        console.error("Response status:", err.response.status);
        console.error("Response headers:", err.response.headers);
      }

      // Show appropriate error message
      if (err.response?.data?.msg) {
        alert(`Upload failed: ${err.response.data.msg}`);
      } else {
        alert("Upload failed. Please ensure you have selected an audio file and applied effects before uploading.");
      }
    }
  };


  return (
    <div className="m-4 px-10 py-2">
      <div className="w-full">
        {/* Header */}
        <Card className="my-4 px-2">
          <h1 className="text-2xl font-semibold text-accent-foreground">
            Effects & Filters
          </h1>
        </Card>

        <div className="space-y-8">
          {/* Category Selection */}
          <div>
            <label className="block text-sm font-medium text-muted-foreground mb-3">
              Category
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

          {/* Effects & Filters Section */}
          <div>
            <h2 className="text-lg font-semibold text-muted-foreground mb-4">
              Effects & Filters
            </h2>
            <div className="flex flex-wrap gap-2">
              {effectOptions.map((effect) => (
                <button
                  key={effect.id}
                  onClick={() => toggleEffect(effect.id)}
                  className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-200 ${Array.isArray(effects) && effects.includes(effect.id)
                    ? "bg-blue-600 text-white shadow-sm"
                    : "bg-muted text-muted-foreground border hover:border-gray-300 hover:bg-gray-50"
                    }`}
                >
                  {effect.label}
                </button>
              ))}


            </div>
          </div>

          {/* Audio Processing Section */}
          <div>
            <AudioProcessor />
          </div>

          {/* Action Buttons */}
          <div className="flex items-center space-x-3 pt-8">
            <Button
              onClick={clearAudioSession}
              className="bg-muted text-muted-foreground border rounded-full hover:text-gray-800 font-medium transition-colors gap-2 p-4"
            >
              <X className="h-4 w-4 inline" />
              <span>Clear</span>
            </Button>

            <Button
              onClick={handleApply}
              className="bg-blue-600 text-white max-w-40 rounded-xl font-medium hover:bg-blue-700 transition-colors flex items-center justify-center gap-2 p-4"
            >
              <Sparkles className="h-4 w-4" />
              <span>Apply</span>
            </Button>
          </div>

          {/* Success Modal */}
          {showSuccessModal && (
            <SuccessModal
              onClose={() => setShowSuccessModal(false)}
            />
          )}

        </div>
      </div>
    </div>
  );
};

export default RemixWorkspace;
