import { FC, useState, useEffect } from 'react';
import HeaderNav from '../components/video-processed/HeaderNav';
import VideoListSidebar from '../components/video-processed/VideoListSidebar';
import FilterControls from '../components/video-processed/FilterControls';
import MediaGrid from '../components/video-processed/MediaGrid';
import InspectorPanel from '../components/video-processed/InspectorPanel';
import { VideoListItem, MediaGridItem, ObjectDetails } from '../types/videoProcessed';

// Mock Data - Sẽ được thay thế bằng API call sau này
const mockVideos: VideoListItem[] = [
  {
    id: 'video1',
    name: 'Clip_gioithieu_kiemsaotravao.mp4',
    thumbnailUrl: 'https://via.placeholder.com/150x84.png?text=Video+1',
    status: 'Hoàn tất',
    processedDate: '2025-05-21 20:25:22',
  },
  {
    id: 'video2',
    name: 'CG.10.Ngã 4 Láng Biển_2025-04-22_10:00:01',
    thumbnailUrl: 'https://via.placeholder.com/150x84.png?text=Video+2',
    status: 'Đang xử lý',
    processedDate: '2025-04-23 09:49:13',
  },
  {
    id: 'video3',
    name: 'Hẻm Nhị Tì - nhà tổ trưởng 150/3_2025-03-05_17:10:00',
    thumbnailUrl: 'https://via.placeholder.com/150x84.png?text=Video+3',
    status: 'Hoàn tất',
    processedDate: '2025-03-06 14:39:42',
  },
  {
    id: 'video4',
    name: 'MT.08.Tỉnh ủy (Đường 30/4)_2025-02-18_01:00:03',
    thumbnailUrl: 'https://via.placeholder.com/150x84.png?text=Video+4',
    status: 'Hoàn tất',
    processedDate: '2025-02-18 09:09:57',
  },
  {
    id: 'video5',
    name: 'CA-MTO.02.Lê Văn Phẩm - QL 60 - 2 (Hướng vào nội ô Mỹ Tho)_2025-02-17_12:00:00',
    thumbnailUrl: 'https://via.placeholder.com/150x84.png?text=Video+5',
    status: 'Lỗi',
    processedDate: '2025-02-17 14:00:00',
  }
];

const mockMediaItems: MediaGridItem[] = Array.from({ length: 18 }, (_, i) => ({
  id: `obj${i + 1}`,
  thumbnailUrl: `https://picsum.photos/seed/obj${i+1}/300/200`,
  type: Math.random() > 0.3 ? 'object' : 'video', // Randomly assign type
}));

const mockObjectDetailData: { [key: string]: ObjectDetails } = {
  obj1: { 
    id: 'obj1', 
    imageUrl: 'https://picsum.photos/seed/obj1/400/225', 
    timestamp: '17/12/2024 14:43:16', 
    objectType: 'Xe máy', 
    licensePlate: 'RECOGNIZE-FAIL', 
    color: 'Unknown', 
    attributes: 'Không có dữ liệu' 
  },
  // ... add more mock details for other obj IDs as needed
};

const VideoProcessedPage: FC = () => {
  const [selectedVideoId, setSelectedVideoId] = useState<string | undefined>(mockVideos[0]?.id);
  const [currentMediaItems, setCurrentMediaItems] = useState<MediaGridItem[]>(mockMediaItems);
  const [selectedObject, setSelectedObject] = useState<ObjectDetails | null>(null);
  const [isInspectorOpen, setIsInspectorOpen] = useState(false);

  const handleSelectVideo = (id: string) => {
    setSelectedVideoId(id);
    // TODO: Fetch and update media items based on selected video
    // For now, just re-use mock data or slightly alter it to show change
    const newMockItems = mockMediaItems.map(item => ({ ...item, id: `${id}-${item.id.split('-').pop()}`})).slice(0, Math.floor(Math.random() * 10) + 5);
    setCurrentMediaItems(newMockItems);
    setSelectedObject(null); // Clear selected object when video changes
    setIsInspectorOpen(false);
    console.log(`Selected video: ${id}`);
  };

  const handleSearch = (filters: any) => {
    console.log("Performing search with filters:", filters);
    // TODO: Implement actual filtering logic
    // For demo, shuffle and slice current items
    const shuffled = [...currentMediaItems].sort(() => 0.5 - Math.random());
    setCurrentMediaItems(shuffled.slice(0, Math.floor(Math.random() * currentMediaItems.length) + 1));
    setSelectedObject(null);
    setIsInspectorOpen(false);
  };

  const handleSelectItemFromGrid = (itemId: string) => {
    console.log(`Selected item from grid: ${itemId}`);
    // Simulate fetching object details
    const detailKey = itemId.startsWith('video') ? itemId.split('-')[1] : itemId;
    const details = mockObjectDetailData[detailKey] || 
                    { 
                      id: itemId, 
                      imageUrl: `https://picsum.photos/seed/${detailKey}/400/225`, 
                      timestamp: '18/12/2024 10:30:00', 
                      objectType: 'Xe ô tô', 
                      licensePlate: '65A-12345', 
                      color: 'Trắng', 
                      attributes: 'Đang di chuyển' 
                    };
    setSelectedObject(details);
    setIsInspectorOpen(true);
  };

  const handleCloseInspector = () => {
    setIsInspectorOpen(false);
    setSelectedObject(null);
  };
  
  // Handle initial selection if videos exist
  useEffect(() => {
    if (mockVideos.length > 0 && !selectedVideoId) {
      setSelectedVideoId(mockVideos[0].id);
    }
  }, [selectedVideoId]);

  return (
    <div className="h-screen flex flex-col bg-gray-100">
      <HeaderNav />
      <div className="flex flex-1 overflow-hidden">
        <VideoListSidebar 
          videos={mockVideos} 
          selectedVideoId={selectedVideoId}
          onSelectVideo={handleSelectVideo}
          // onDeleteVideo={(id) => console.log(`Delete video ${id}`)}
        />
        <main className="flex-1 flex flex-col overflow-hidden">
          <FilterControls onSearch={handleSearch} />
          <MediaGrid items={currentMediaItems} onSelectItem={handleSelectItemFromGrid} />
        </main>
        {isInspectorOpen && selectedObject && (
            <InspectorPanel 
                objectDetails={selectedObject} 
                onClose={handleCloseInspector} 
                // Dummy props for timeline nav
                hasNext={true} 
                hasPrev={true}
                onNextFrame={() => console.log('Next frame')}
                onPrevFrame={() => console.log('Prev frame')}
            />
        )}
      </div>
    </div>
  );
};

export default VideoProcessedPage; 