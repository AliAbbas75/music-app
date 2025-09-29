import { useState } from 'react';
import { ChevronDown, X, Music } from 'lucide-react';

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
        <div className="mb-8">
          <h1 className="text-2xl font-semibold text-gray-900 mb-2">Beat & Tempo Control</h1>
        </div>

        <div className="space-y-6">
          {/* Current BPM Section */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Current BPM
            </label>
            <div className="relative">
              <select
                className="w-full px-4 py-3 pr-10 border border-gray-200 rounded-xl bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none"
                value={currentBPM}
                onChange={(e) => setCurrentBPM(e.target.value)}
              >
                {bpmOptions.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
              <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400 pointer-events-none" />
            </div>
          </div>

          {/* Slider Section */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Slider
            </label>
            <div className="relative">
              <select
                className="w-full px-4 py-3 pr-10 border border-gray-200 rounded-xl bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none"
                value={bpmRange}
                onChange={(e) => setBpmRange(e.target.value)}
              >
                {bpmRangeOptions.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
              <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400 pointer-events-none" />
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center space-x-3 pt-4">
            <button className="px-6 py-2 text-gray-600 hover:text-gray-800 font-medium transition-colors flex items-center space-x-2">
              <X className="h-4 w-4" />
              <span>Clear</span>
            </button>
            <button className="bg-blue-600 text-white px-8 py-3 rounded-xl font-medium hover:bg-blue-700 transition-colors flex items-center space-x-2 shadow-sm">
              <Music className="h-4 w-4" />
              <span>Tap Tempo</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BeatTempoControl;