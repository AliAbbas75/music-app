import React from "react";
import { ChevronDown, Sparkles, X } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import useAudioStore from "@/store/audioStore";
import AudioProcessor from "@/components/AudioProcessor"; // adjust import path

const RemixWorkspace = () => {
  const {
    effects,
    setEffects,
    selectedCategory,
    toggleEffect,
    setSelectedCategory,
    clearAudioSession,
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

  // ──────────────────────────────────────────────
  // Toggle effect in Zustand store
  // const toggleEffect = (effectId) => {
  //   setEffects((prev) =>
  //     prev.includes(effectId)
  //       ? prev.filter((e) => e !== effectId)
  //       : [...prev, effectId]
  //   );
  // };

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
              {/* {effectOptions.map((effect) => {
                const activeEffects = Array.isArray(effects) ? effects : [];
                const isActive = activeEffects.includes(effect.id);

                return (
                  <button
                    key={effect.id}
                    onClick={() => toggleEffect(effect.id)}
                    className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-200 ${isActive
                        ? "bg-blue-600 text-white shadow-sm"
                        : "bg-muted text-muted-foreground border hover:border-gray-300 hover:bg-gray-50"
                      }`}
                  >
                    {effect.label}
                  </button>
                );
              })} */}

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
            <Button className="bg-blue-600 text-white max-w-40 rounded-xl font-medium hover:bg-blue-700 transition-colors flex items-center justify-center gap-2 p-4">
              <Sparkles className="h-4 w-4" />
              <span>Apply</span>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RemixWorkspace;
