import { FC, useState } from 'react';
import { VideoListItem } from '../../types/videoProcessed';
import { MagnifyingGlassIcon as SearchIcon, TrashIcon, PlayIcon, ClockIcon, ExclamationCircleIcon } from '@heroicons/react/24/outline';

interface VideoListSidebarProps {
  videos: VideoListItem[];
  selectedVideoId?: string;
  onSelectVideo: (id: string) => void;
  onDeleteVideo?: (id: string) => void; // Optional for now
}

const VideoListSidebar: FC<VideoListSidebarProps> = ({
  videos,
  selectedVideoId,
  onSelectVideo,
  onDeleteVideo
}) => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredVideos = videos.filter(video => 
    video.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusIcon = (status: VideoListItem['status']) => {
    switch (status) {
      case 'Hoàn tất':
        return <PlayIcon className="h-4 w-4 text-green-500 mr-1.5 flex-shrink-0" />;
      case 'Đang xử lý':
        return <ClockIcon className="h-4 w-4 text-yellow-500 mr-1.5 flex-shrink-0" />;
      case 'Lỗi':
        return <ExclamationCircleIcon className="h-4 w-4 text-red-500 mr-1.5 flex-shrink-0" />;
      default:
        return null;
    }
  };

  return (
    <aside className="w-80 bg-gray-50 border-r border-gray-200 flex flex-col h-full">
      {/* Search Bar */}
      <div className="p-4 border-b border-gray-200">
        <div className="relative">
          <input
            type="text"
            placeholder="Nhập tên..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
          />
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <SearchIcon className="h-5 w-5 text-gray-400" />
          </div>
        </div>
      </div>

      {/* Video List */}
      <div className="flex-grow overflow-y-auto">
        {filteredVideos.length === 0 && (
          <p className="p-4 text-sm text-gray-500">Không tìm thấy video.</p>
        )}
        {filteredVideos.map((video) => (
          <div
            key={video.id}
            onClick={() => onSelectVideo(video.id)}
            className={`p-3 border-b border-gray-200 cursor-pointer hover:bg-gray-100 ${
              selectedVideoId === video.id ? 'bg-blue-50 border-l-4 border-blue-500' : ''
            }`}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => e.key === 'Enter' && onSelectVideo(video.id)}
            aria-pressed={selectedVideoId === video.id}
          >
            <div className="flex items-start space-x-3">
              {/* Placeholder for Thumbnail */}
              <div className="w-24 h-14 bg-gray-300 rounded flex-shrink-0 flex items-center justify-center">
                {video.thumbnailUrl ? (
                    <img src={video.thumbnailUrl} alt={video.name} className="w-full h-full object-cover rounded" />
                ) : (
                    <PlayIcon className="h-6 w-6 text-gray-500" />
                )}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-800 truncate" title={video.name}>
                  {video.name}
                </p>
                <div className="flex items-center text-xs text-gray-500 mt-1">
                  {getStatusIcon(video.status)}
                  <span>{video.status}</span>
                </div>
                <p className="text-xs text-gray-500 mt-0.5">{video.processedDate}</p>
              </div>
              {onDeleteVideo && (
                <button 
                    onClick={(e) => { 
                        e.stopPropagation(); // Prevent triggering onSelectVideo
                        onDeleteVideo(video.id); 
                    }}
                    className="text-gray-400 hover:text-red-500 p-1 rounded-full flex-shrink-0"
                    aria-label={`Xóa video ${video.name}`}
                >
                  <TrashIcon className="h-5 w-5" />
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </aside>
  );
};

export default VideoListSidebar; 