import { FC, useState, useCallback } from 'react';
import Header from '../Header';
// Giả sử Header không di chuyển cùng, nếu có thì cần sửa đường dẫn
// import Header from './Header'; 
// Các component này sẽ nằm cùng cấp trong thư mục upload-video
import Sidebar from './Sidebar'; 
import ContentPanel from './ContentPanel';
import FloatingActionButton from '../FloatingActionButton';
// Giả sử FloatingActionButton không di chuyển cùng, nếu có thì cần sửa đường dẫn
// import FloatingActionButton from './FloatingActionButton'; 
import { Model } from '../../types'; // Đường dẫn này có thể cần điều chỉnh nếu types.ts không ở src/types

const defaultModel: Model = {
  id: 'phuongtien',
  name: 'Phương tiện',
  description: 'Chọn các loại phương tiện để phân tích'
};

const VideoExtractorPage: FC = () => {
  const [selectedModel, setSelectedModel] = useState<Model>(defaultModel);
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleModelSelect = useCallback((model: Model) => {
    setSelectedModel(model);
  }, []);

  const handleFileSelect = useCallback((file: File) => {
    setVideoFile(file);
  }, []);

  const handleExtractClick = useCallback(() => {
    if (!videoFile) return;
    
    setIsProcessing(true);
    // TODO: Implement actual video processing logic
    setTimeout(() => {
      setIsProcessing(false);
    }, 3000);
  }, [videoFile]);

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="flex pt-16"> {/* Giả sử Header cao 16 (h-16 = 4rem = 64px, pt-16 = 4rem = 64px) */}
        <Sidebar
          selectedModel={selectedModel}
          onModelSelect={handleModelSelect}
          onFileSelect={handleFileSelect}
        />
        <div className="flex-1 ml-80"> {/* Sidebar width is w-80 (20rem = 320px) */}
          <ContentPanel videoFile={videoFile} />
        </div>
      </div>
      <FloatingActionButton
        onClick={handleExtractClick}
        isProcessing={isProcessing}
      />
    </div>
  );
};

export default VideoExtractorPage; 