import { Star, Sparkles } from 'lucide-react';
export default function SuccessModal ({ isOpen = true, onClose }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-3xl p-8 max-w-md w-full relative shadow-2xl">
        {/* Decorative Elements */}
        <div className="absolute top-6 left-8 text-orange-400 text-2xl">✨</div>
        <div className="absolute top-8 right-12 text-blue-400 text-xl">★</div>
        <div className="absolute top-12 left-16 text-blue-500 text-sm">✦</div>
        <div className="absolute top-16 right-20 text-orange-300 text-xs">◆</div>
        
        {/* Success Icon */}
        <div className="flex justify-center mb-6 relative">
          {/* Dotted circle background */}
          <div className="absolute w-32 h-32 border-2 border-dashed border-blue-200 rounded-full"></div>
          
          {/* Main icon container */}
          <div className="relative">
            <div className="w-24 h-24 bg-blue-600 rounded-full flex items-center justify-center shadow-lg">
              <Star className="w-12 h-12 text-white fill-white" />
            </div>
            
            {/* Small decorative elements around icon */}
            <div className="absolute -top-2 -left-2 text-blue-500 text-lg">✧</div>
            <div className="absolute -bottom-2 -right-2 text-orange-400 text-sm">✦</div>
            <div className="absolute top-1/2 -left-6 text-blue-400 text-xs">◇</div>
            <div className="absolute top-1/2 -right-6 text-orange-300 text-xs">◆</div>
          </div>
        </div>

        {/* Confetti-like elements at bottom of icon */}
        <div className="flex justify-center mb-8 relative">
          <div className="flex space-x-1">
            <div className="w-1 h-1 bg-blue-400 rounded-full"></div>
            <div className="w-1.5 h-1.5 bg-orange-400 rounded-full"></div>
            <div className="w-1 h-1 bg-blue-300 rounded-full"></div>
            <div className="w-1 h-1 bg-orange-300 rounded-full"></div>
            <div className="w-1.5 h-1.5 bg-blue-500 rounded-full"></div>
          </div>
        </div>

        {/* Title */}
        <h2 className="text-2xl font-bold text-gray-900 text-center mb-8">
          Successfully! Create Remix
        </h2>

        {/* Button */}
        <button
          onClick={onClose}
          className="w-full bg-blue-600 text-white font-semibold py-4 px-6 rounded-2xl hover:bg-blue-700 transition-colors duration-200 shadow-lg hover:shadow-xl"
        >
          Let's Go!
        </button>
      </div>
    </div>
  )
};