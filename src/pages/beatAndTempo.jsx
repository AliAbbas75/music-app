import { useState, useRef } from "react";
import { ChevronDown, X, Music } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/Button";
import useAudioStore from "@/store/audioStore";

const BeatTempoControl = () => {
  const { bpm, setBpm } = useAudioStore();
  const [bpmRange, setBpmRange] = useState([60, 180]);
  const lastTapRef = useRef(0);
  const tapIntervals = useRef([]);

  // ─── Handle BPM Dropdown ───────────────────────────────
  const handleBpmSelect = (e) => {
    const value = parseInt(e.target.value);
    if (!isNaN(value)) setBpm(value);
  };

  // ─── Handle Range Slider ───────────────────────────────
  const handleSliderChange = (e) => {
    setBpm(Number(e.target.value));
  };

  // ─── Handle Tap Tempo ──────────────────────────────────
  const handleTapTempo = () => {
    const now = Date.now();
    if (lastTapRef.current) {
      const interval = now - lastTapRef.current;
      tapIntervals.current.push(interval);
      if (tapIntervals.current.length > 5) tapIntervals.current.shift(); // Keep last 5 taps

      const avgInterval =
        tapIntervals.current.reduce((a, b) => a + b, 0) /
        tapIntervals.current.length;
      const newBpm = Math.min(200, Math.max(60, Math.round(60000 / avgInterval)));
      setBpm(newBpm);
    }
    lastTapRef.current = now;
  };

  // ─── Handle Clear ──────────────────────────────────────
  const handleClear = () => {
    setBpm(120);
    setBpmRange([60, 180]);
    tapIntervals.current = [];
    lastTapRef.current = 0;
  };

  return (
    <div className="m-4 px-10 py-2">
      <div className="w-full">
        {/* Header */}
        <Card className="my-4 px-2">
          <h1 className="text-2xl font-semibold text-accent-foreground">
            Beat & Tempo Control
          </h1>
        </Card>

        <div className="space-y-6">
          {/* Current BPM Section */}
          <div>
            <label className="block text-sm font-medium text-muted-foreground mb-3">
              Current BPM
            </label>
            <div className="relative">
              <select
                className="w-full px-4 py-3 pr-10 border rounded-xl bg-muted text-muted-foreground focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none"
                value={`${bpm} BPM`}
                onChange={handleBpmSelect}
              >
                {[60, 70, 80, 90, 100, 110, 120, 130, 140, 150].map((option) => (
                  <option key={option} value={option}>
                    {option} BPM
                  </option>
                ))}
              </select>
              <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground pointer-events-none" />
            </div>
          </div>

          {/* BPM Slider Section */}
          <div>
            <label className="block text-sm font-medium text-muted-foreground mb-3">
              Adjust BPM ({bpm} BPM)
            </label>
            <input
              type="range"
              min={bpmRange[0]}
              max={bpmRange[1]}
              value={bpm}
              onChange={handleSliderChange}
              className="w-full h-2 bg-muted rounded-lg appearance-none cursor-pointer accent-blue-600"
            />
            <div className="flex justify-between text-xs text-muted-foreground mt-2">
              <span>{bpmRange[0]} BPM</span>
              <span>{bpmRange[1]} BPM</span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center space-x-3 pt-4">
            <Button
              onClick={handleClear}
              className="font-medium transition-colors rounded-full flex items-center py-2 px-6 gap-2"
            >
              <X className="h-4 w-4" />
              <span>Clear</span>
            </Button>

            <Button
              onClick={handleTapTempo}
              className="bg-blue-600 text-white rounded-full font-medium hover:bg-blue-700 py-2 px-6 gap-2 transition-colors flex items-center space-x-2 shadow-sm"
            >
              <Music className="h-4 w-4" />
              <span>Tap Tempo</span>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BeatTempoControl;
