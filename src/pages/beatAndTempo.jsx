import { useState } from 'react';
import { ChevronDown, X, Music } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/Button';

const BeatTempoControl = () => {
  const [currentBPM, setCurrentBPM] = useState('Current BPM');
  const [bpmRange, setBpmRange] = useState('80 → 200 BPM');

  const bpmOptions = [
    'Current BPM',
    '60 BPM',
    '70 BPM',
    '80 BPM',
    '90 BPM',
    '100 BPM',
    '110 BPM',
    '120 BPM',
    '130 BPM',
    '140 BPM',
    '150 BPM'
  ];

  const bpmRangeOptions = [
    '80 → 200 BPM',
    '60 → 120 BPM',
    '100 → 140 BPM',
    '120 → 180 BPM',
    '140 → 200 BPM'
  ];

  return (
    <div className="m-4 px-10 py-2">
      <div className="w-full">
        {/* Header */}
        <Card className={"my-4 px-2"}>
          <h1 className="text-2xl font-semibold text-accent-foreground">Beat & Tempo Control </h1>
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
                value={currentBPM}
                onChange={(e) => setCurrentBPM(e.target.value)}
              >
                {bpmOptions.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
              <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground pointer-events-none" />
            </div>
          </div>

          {/* Slider Section */}
          <div>
            <label className="block text-sm font-medium text-muted-foreground mb-3">
              Slider
            </label>
            <div className="relative">
              <select
                className="w-full px-4 py-3 pr-10 border rounded-xl bg-muted text-muted-foreground focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none"
                value={bpmRange}
                onChange={(e) => setBpmRange(e.target.value)}
              >
                {bpmRangeOptions.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
              <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground pointer-events-none" />
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center space-x-3 pt-4">
            <Button className=" font-medium transition-colors rounded-full flex items-center py-2 px-6 gap-2">
              <X className="h-4 w-4" />
              <span>Clear</span>
            </Button>
            <Button className="bg-blue-600 text-white rounded-full font-medium hover:bg-blue-700 py-2 px-6 gap-2 transition-colors flex items-center space-x-2 shadow-sm">
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