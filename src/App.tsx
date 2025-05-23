import { FC } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import VideoExtractorPage from './components/upload-video/VideoExtractorPage';
import VideoProcessedPage from './pages/VideoProcessedPage'; // Đảm bảo file này tồn tại ở đúng đường dẫn

const App: FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/upload-video" element={<VideoExtractorPage />} />
        <Route path="/video-processed" element={<VideoProcessedPage />} />
        {/* Bạn có thể thêm các Route khác ở đây sau này */}
      </Routes>
    </Router>
  );
};

export default App; 