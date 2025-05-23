import { FC } from 'react';
import { ObjectDetails } from '../../types/videoProcessed';
import {
  XMarkIcon as XIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  PlayIcon,
  ArrowDownTrayIcon as DownloadIcon,
  ShareIcon,
  PencilIcon
} from '@heroicons/react/24/outline';

interface InspectorPanelProps {
  objectDetails: ObjectDetails | null;
  onClose: () => void;
  // Props for timeline navigation if multiple frames/clips for one object
  onPrevFrame?: () => void;
  onNextFrame?: () => void;
  hasNext?: boolean;
  hasPrev?: boolean;
}

const InspectorPanel: FC<InspectorPanelProps> = ({
  objectDetails,
  onClose,
  onPrevFrame,
  onNextFrame,
  hasNext,
  hasPrev,
}) => {
  if (!objectDetails) {
    return (
      <aside className="w-96 bg-white border-l border-gray-200 p-6 flex flex-col items-center justify-center text-center text-gray-500 h-full">
        <PencilIcon className="h-12 w-12 mb-3 text-gray-400" />
        <p className="text-sm">Chọn một đối tượng từ lưới kết quả để xem thông tin chi tiết.</p>
      </aside>
    );
  }

  const timelinePlaceholders = Array(12).fill(0); // For the small timeline dots

  return (
    <aside className="w-96 bg-white border-l border-gray-200 flex flex-col h-full">
      {/* Header with Title and Close button */}
      <div className="p-4 border-b border-gray-200 flex items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-900">Thông tin đối tượng</h3>
        <button 
          onClick={onClose} 
          className="text-gray-400 hover:text-gray-600 p-1 rounded-full"
          aria-label="Đóng chi tiết"
        >
          <XIcon className="h-6 w-6" />
        </button>
      </div>

      {/* Main Content Area */}
      <div className="flex-grow p-4 space-y-4 overflow-y-auto">
        {/* Image/Video Display Area */}
        <div className="relative aspect-video bg-gray-900 rounded-lg overflow-hidden mb-2">
          {objectDetails.imageUrl || objectDetails.videoUrl ? (
            <img 
              src={objectDetails.imageUrl || 'https://via.placeholder.com/400x225.png?text=Object+View'} 
              alt={`Đối tượng ${objectDetails.id}`}
              className="w-full h-full object-contain"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <PlayIcon className="h-12 w-12 text-gray-500" />
            </div>
          )
          }
          {/* Video Controls (if it's a video) and navigation for multiple frames */}
          <div className="absolute inset-0 flex items-center justify-between px-2">
            <button 
                className={`p-1.5 bg-black bg-opacity-40 text-white rounded-full hover:bg-opacity-60 ${!hasPrev ? 'opacity-50 cursor-not-allowed' : ''}`}
                onClick={onPrevFrame}
                disabled={!hasPrev}
                aria-label="Khung hình trước"
            >
                <ChevronLeftIcon className="h-5 w-5"/>
            </button>
            <button 
                className={`p-1.5 bg-black bg-opacity-40 text-white rounded-full hover:bg-opacity-60 ${!hasNext ? 'opacity-50 cursor-not-allowed' : ''}`}
                onClick={onNextFrame}
                disabled={!hasNext}
                aria-label="Khung hình sau"
            >
                <ChevronRightIcon className="h-5 w-5"/>
            </button>
          </div>
          {/* Timestamp overlay */}
          <div className="absolute top-2 right-2 bg-black bg-opacity-60 text-white text-xs px-1.5 py-0.5 rounded">
            {objectDetails.timestamp}
          </div>
        </div>
        
        {/* Mini Timeline / Frame Selector */}
        <div className="flex items-center justify-center space-x-1.5 py-2">
            {timelinePlaceholders.map((_, index) => (
                <button 
                    key={index} 
                    className={`h-2 w-2 rounded-full ${index === 5 ? 'bg-blue-500 scale-125' : 'bg-gray-300 hover:bg-gray-400'} transition-all`}
                    aria-label={`Chọn khung hình ${index + 1}`}
                />
            ))}
        </div>

        {/* Details Section */}
        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-gray-500">Thời gian:</span>
            <span className="text-gray-800 font-medium">{objectDetails.timestamp}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500">Loại đối tượng:</span>
            <span className="text-gray-800 font-medium">{objectDetails.objectType}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500">Biển số:</span>
            <span className={`text-gray-800 font-medium ${objectDetails.licensePlate === 'RECOGNIZE-FAIL' ? 'text-red-500' : ''}`}>
              {objectDetails.licensePlate || 'N/A'}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500">Màu xe:</span>
            <span className="text-gray-800 font-medium">{objectDetails.color || 'Unknown'}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500">Thuộc tính:</span>
            <span className="text-gray-800 font-medium">{objectDetails.attributes || 'Không có dữ liệu'}</span>
          </div>
        </div>
      </div>

      {/* Action Buttons at the bottom */}
      <div className="p-4 border-t border-gray-200 flex items-center justify-end space-x-3">
        <button className="px-3 py-1.5 border border-gray-300 rounded-md text-sm text-gray-700 hover:bg-gray-50 flex items-center">
          <DownloadIcon className="h-4 w-4 mr-1.5" />
          Tải xuống
        </button>
        <button className="px-3 py-1.5 border border-gray-300 rounded-md text-sm text-gray-700 hover:bg-gray-50 flex items-center">
          <ShareIcon className="h-4 w-4 mr-1.5" />
          Chia sẻ
        </button>
      </div>
    </aside>
  );
};

export default InspectorPanel; 