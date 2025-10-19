import { useRef } from "react";
import { Button } from "@/components/ui/button";
import useAudioStore from "@/store/audioStore";
import API from "@/api"; // your axios instance

const ImportSongButton = () => {
  const fileInputRef = useRef(null);

  // Zustand store actions
  const setAudioFile = useAudioStore((state) => state.setAudioFile);
  const setUploadedAudio = useAudioStore((state) => state.setUploadedAudio);

  const handleButtonClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // ✅ Update store with local file reference (for waveform, playback, etc.)
    setAudioFile(file);

    // Reset input so the same file can be re-uploaded
    e.target.value = "";

    // Log details
    console.log("🎵 Selected file:", { name: file.name, type: file.type, size: file.size });

    // ✅ Upload to backend
    try {
      const formData = new FormData();
      formData.append("audio", file);

      const res = await API.post("/audio/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      console.log("✅ Upload success:", res.data.audio);

      // ✅ Save backend info (fileId, path, etc.)
      setUploadedAudio(res.data);
    } catch (err) {
      console.error("❌ Upload failed:", err);
      alert("Upload failed. Check backend logs.");
    }
  };

  return (
    <>
      <input
        type="file"
        accept="audio/*"
        ref={fileInputRef}
        onChange={handleFileChange}
        style={{ display: "none" }}
      />
      <Button
        onClick={handleButtonClick}
        className="bg-background h-14 rounded-full border-2 text-lg text-accent-foreground"
      >
        Import Song ⬇️
      </Button>
    </>
  );
};

export default ImportSongButton;
