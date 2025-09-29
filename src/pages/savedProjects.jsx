import { Play } from 'lucide-react';

const SavedRemixesProjects = () => {
  const projects = [
    {
      id: 1,
      title: "Midnight Confessions",
      artist: "@midnightmelody",
      cover: "bg-gradient-to-br from-purple-500 to-pink-500"
    },
    {
      id: 2,
      title: "Lost in the Moment",
      artist: "@saxophonegrand",
      cover: "bg-gradient-to-br from-blue-500 to-purple-500"
    },
    {
      id: 3,
      title: "Late Night Thoughts",
      artist: "@grandpianofesta",
      cover: "bg-gradient-to-br from-green-500 to-blue-500"
    },
    {
      id: 4,
      title: "Chill by the Window",
      artist: "@klarnettdream",
      cover: "bg-gradient-to-br from-pink-500 to-purple-500"
    },
    {
      id: 5,
      title: "Deep in Reflection",
      artist: "@klarnettdream",
      cover: "bg-gradient-to-br from-blue-400 to-pink-400"
    },
    {
      id: 6,
      title: "Slow Motion Memories",
      artist: "@klarnettdream",
      cover: "bg-gradient-to-br from-cyan-500 to-purple-500"
    }
  ];

  return (
    <div className="m-4 px-10 py-2">
      <div className="">
        {/* Header */}
        <h1 className="text-2xl font-semibold text-gray-900 mb-8">Saved Remixes / Projects</h1>
        
        {/* Projects List */}
        <div className="space-y-4">
          {projects.map((project) => (
            <div
              key={project.id}
              className="flex items-center space-x-4 p-4 rounded-xl hover:bg-gray-50 transition-colors duration-200 cursor-pointer group"
            >
              {/* Album Cover */}
              <div className={`w-14 h-14 rounded-xl ${project.cover} flex items-center justify-center shadow-sm group-hover:shadow-md transition-shadow duration-200 flex-shrink-0`}>
                <div className="w-6 h-6 bg-white/20 rounded-full flex items-center justify-center">
                  <div className="w-2 h-2 bg-white rounded-full"></div>
                </div>
              </div>
              
              {/* Project Info */}
              <div className="flex-1 min-w-0">
                <h3 className="text-base font-medium text-gray-900 truncate">
                  {project.title}
                </h3>
                <p className="text-sm text-gray-500 truncate">
                  {project.artist}
                </p>
              </div>

              {/* Play Button (appears on hover) */}
              <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex-shrink-0">
                <button className="w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center hover:bg-blue-700 transition-colors duration-200 shadow-md">
                  <Play className="w-4 h-4 ml-0.5" fill="currentColor" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SavedRemixesProjects;