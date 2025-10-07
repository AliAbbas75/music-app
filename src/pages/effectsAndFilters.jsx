import React, { useState } from 'react';
import { ChevronDown, Sparkles, X } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const RemixWorkspace = () => {
  const [selectedTimeline, setSelectedTimeline] = useState('Waveform view of track');
  const [selectedLayers, setSelectedLayers] = useState(['Vocals']);
  const [selectedEffects, setSelectedEffects] = useState(['Echo']);

  const timelineOptions = [
    'Waveform view of track',
    'Grid view',
    'Piano roll',
    'Arrangement view'
  ];

  const layerOptions = [
    { id: 'vocals', label: 'Vocals', selected: true },
    { id: 'drums', label: 'Drums', selected: false },
    { id: 'bass', label: 'Bass', selected: false },
    { id: 'synths', label: 'Synths', selected: false }
  ];

  const effectOptions = [
    { id: 'echo', label: 'Echo', selected: true },
    { id: 'reverb', label: 'Reverb', selected: false },
    { id: 'distortion', label: 'Distortion', selected: false },
    { id: 'autotune', label: 'Auto-Tune', selected: false },
    { id: 'lowpass', label: 'Low-Pass Filter', selected: false }
  ];

  const toggleLayer = (layerId) => {
    // Toggle layer selection logic
    const updatedLayers = layerOptions.map(layer =>
      layer.id === layerId ? { ...layer, selected: !layer.selected } : layer
    );
  };

  const toggleEffect = (effectId) => {
    // Toggle effect selection logic
    const updatedEffects = effectOptions.map(effect =>
      effect.id === effectId ? { ...effect, selected: !effect.selected } : effect
    );
  };

  return (
    <div className="m-4 px-10 py-2">
      <div className="w-full">
        {/* Header */}
        <Card className={"my-4 px-2"}>
          <h1 className="text-2xl font-semibold text-accent-foreground">Effects & Filters</h1>
        </Card>

        <div className="space-y-8">
          {/* Timeline Section */}
          <div>
            <label className="block text-sm font-medium text-muted-foreground mb-3">
              Timeline
            </label>
            <div className="relative">
              <select
                className="w-full px-4 py-3 pr-10 border  rounded-xl bg-muted text-muted-foreground focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none"
                value={selectedTimeline}
                onChange={(e) => setSelectedTimeline(e.target.value)}
              >
                {timelineOptions.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
              <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400 pointer-events-none" />
            </div>
          </div>

          {/* Layers Section */}
          <div>
            <label className="block text-sm font-medium text-muted-foreground mb-3">
              Layers
            </label>
            <div className="flex flex-wrap gap-2">
              {layerOptions.map((layer) => (
                <button
                  key={layer.id}
                  onClick={() => toggleLayer(layer.id)}
                  className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-200 ${layer.selected
                    ? 'bg-blue-600 text-white shadow-sm'
                    : 'bg-muted text-muted-foreground border hover:border-gray-300 hover:bg-gray-50'
                    }`}
                >
                  {layer.label}
                </button>
              ))}
            </div>
          </div>

          {/* Effects & Filters Section */}
          <div>
            <h2 className="text-lg font-semibold text-muted-foreground mb-4">Effects & Filters</h2>

            <div>
              <label className="block text-sm font-medium text-muted-foreground mb-3">
                Effects
              </label>
              <div className="flex flex-wrap gap-2">
                {effectOptions.map((effect) => (
                  <button
                    key={effect.id}
                    onClick={() => toggleEffect(effect.id)}
                    className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-200 ${effect.selected
                      ? 'bg-blue-600 text-white shadow-sm'
                      : 'bg-muted text-muted-foreground border hover:border-gray-300 hover:bg-gray-50'
                      }`}
                  >
                    {effect.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center space-x-3 pt-8">
            <Button className="bg-muted text-muted-foreground border rounded-full hover:text-gray-800 font-medium transition-colors gap-2 p-4">
              <X className="h-4 w-4 inline" />
              <span>Clear</span>
            </Button>
            <Button className="bg-blue-600 text-white max-w-40 rounded-xl font-medium hover:bg-blue-700 transition-colors flex items-center justify-center gap-2 p-4">
              <Sparkles className="h-4 w-4" />
              <span>Create</span>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RemixWorkspace;