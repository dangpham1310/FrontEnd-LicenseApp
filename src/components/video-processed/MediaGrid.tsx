import { FC } from 'react';
import { MediaGridItem } from '../../types/videoProcessed';
import { PlayIcon, DocumentMagnifyingGlassIcon as DocumentSearchIcon } from '@heroicons/react/24/outline';

interface MediaGridProps {
  items: MediaGridItem[];
  onSelectItem: (id: string) => void; // To select an item and show details in InspectorPanel
}

const MediaGrid: FC<MediaGridProps> = ({ items, onSelectItem }) => {
  if (items.length === 0) {
    return (
      <div className="flex-grow flex flex-col items-center justify-center text-gray-500 p-8">
        <DocumentSearchIcon className="h-16 w-16 mb-4" />
        <p className="text-lg">Không có kết quả nào.</p>
        <p className="text-sm">Vui lòng thử lại với bộ lọc khác hoặc tải lên video mới.</p>
      </div>
    );
  }

  return (
    <div className="p-4 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 flex-grow overflow-y-auto">
      {items.map((item) => (
        <div 
          key={item.id}
          className="group relative aspect-w-16 aspect-h-9 bg-gray-200 rounded-lg overflow-hidden cursor-pointer shadow hover:shadow-md transition-shadow"
          onClick={() => onSelectItem(item.id)}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => e.key === 'Enter' && onSelectItem(item.id)}
          aria-label={`Xem chi tiết ${item.id}`}
        >
          <img 
            src={item.thumbnailUrl || 'https://via.placeholder.com/300x200.png?text=No+Image'} 
            alt={`Kết quả ${item.id}`}
            className="w-full h-full object-cover group-hover:opacity-80 transition-opacity"
          />
          {/* Overlay icon or info - e.g. play button for video, or magnify for object */}
          <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-20 opacity-0 group-hover:opacity-100 transition-opacity">
            {item.type === 'video' ? (
                <PlayIcon className="h-10 w-10 text-white" />
            ) : (
                <DocumentSearchIcon className="h-10 w-10 text-white" />
            )}
          </div>
          {/* Optional: display some brief info on the card itself */}
          {/* <div className="absolute bottom-0 left-0 right-0 p-1.5 bg-black bg-opacity-50 text-white text-xs truncate">
            ID: {item.id}
          </div> */}
        </div>
      ))}
    </div>
  );
};

export default MediaGrid; 