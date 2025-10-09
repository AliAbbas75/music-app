import { useState } from "react";
import { ChevronDown, Music, Sparkles, X } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import useAudioStore from "@/store/audioStore";

const AIRemixGenerator = () => {
  const {
    setAudioFile,
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
  } = useAudioStore();

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

  // Handle file input
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) setAudioFile(file);
    console.log("Uploaded File: ", file);
  };

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
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                    selectedStyles.includes(style.label)
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
            >
              <X className="h-4 w-4 inline" />
              <span>Clear</span>
            </Button>
            <Button
              className="bg-blue-600 text-white max-w-40 rounded-xl font-medium hover:bg-blue-700 transition-colors flex items-center justify-center gap-2 p-4"
            >
              <Sparkles className="h-4 w-4" />
              <span>Create</span>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AIRemixGenerator;
