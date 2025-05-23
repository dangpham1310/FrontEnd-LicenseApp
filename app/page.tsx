'use client';

import { useState } from 'react';
import Header from './components/Header';
// import Sidebar from './components/Sidebar'; // Xóa Sidebar
import VideoPlayer from './components/VideoPlayer';
import ModelSelector from '../../src/components/ModelSelector'; // Import ModelSelector

interface Model {
  id: string;
  name: string;
  description: string;
}

interface VehicleOption {
  id: string;
  name: string;
}

const initialModels: Model[] = [
  {
    id: 'phuongtien',
    name: 'Phương tiện',
    description: 'Chọn các loại phương tiện để phân tích'
  },
  {
    id: 'tuychinh',
    name: 'Tuỳ chỉnh',
    description: 'Các tùy chọn nhận diện nâng cao'
  }
];

const vehicleOptions: VehicleOption[] = [
  { id: 'chon_tat_ca_xe', name: 'Chọn tất cả' },
  { id: 'xemay', name: 'Xe máy' },
  { id: 'xebuyt', name: 'Buýt' },
  { id: 'oto', name: 'Ô tô' },
  { id: 'xedap', name: 'Đạp' },
  // Thêm các loại xe khác nếu cần
];

export default function Home() {
  const [videoSrc, setVideoSrc] = useState<string>();
  const [selectedModel, setSelectedModel] = useState<Model>(initialModels[0]);
  const [selectedVehicles, setSelectedVehicles] = useState<string[]>([]);

  const handleModelSelect = (model: Model) => {
    setSelectedModel(model);
    setSelectedVehicles([]); // Reset lựa chọn xe khi đổi model
  };

  const handleVehicleChange = (vehicleId: string) => {
    setSelectedVehicles((prev) =>
      prev.includes(vehicleId) ? prev.filter((id) => id !== vehicleId) : [...prev, vehicleId]
    );
  };

  const handleSelectAllVehicles = (isChecked: boolean) => {
    if (isChecked) {
      // Chọn tất cả trừ 'chon_tat_ca_xe'
      setSelectedVehicles(vehicleOptions.filter(v => v.id !== 'chon_tat_ca_xe').map(option => option.id));
    } else {
      setSelectedVehicles([]);
    }
  };

  // Đồng bộ trạng thái "Chọn tất cả" với các lựa chọn xe
  const isAllVehiclesSelected = vehicleOptions.filter(v => v.id !== 'chon_tat_ca_xe').every(v => selectedVehicles.includes(v.id)) && selectedVehicles.length > 0;

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <div className="flex flex-1 pt-16">
        {/* <Sidebar /> */} {/* Xóa Sidebar */}
        <aside className="w-72 bg-gray-50 border-r border-gray-200 min-h-screen p-4 space-y-6">
          <div>
            <h2 className="text-lg font-semibold mb-2 text-gray-800">Chọn Model Phân Tích</h2>
            <ModelSelector selectedModel={selectedModel} onModelSelect={handleModelSelect} />
          </div>

          {selectedModel.id === 'phuongtien' && (
            <div className="border-t border-gray-200 pt-4">
              <h3 className="text-md font-semibold mb-3 text-gray-700">Chọn Loại Phương Tiện</h3>
              <div className="space-y-2">
                {vehicleOptions.map((option) => (
                  <label key={option.id} className="flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      className="rounded border-gray-300 text-blue-600 focus:ring-blue-500 h-4 w-4"
                      checked={
                        option.id === 'chon_tat_ca_xe' 
                          ? isAllVehiclesSelected
                          : selectedVehicles.includes(option.id)
                      }
                      onChange={() => {
                        if (option.id === 'chon_tat_ca_xe') {
                          handleSelectAllVehicles(!isAllVehiclesSelected);
                        } else {
                          handleVehicleChange(option.id);
                        }
                      }}
                      aria-labelledby={`vehicle-label-${option.id}`}
                    />
                    <span id={`vehicle-label-${option.id}`} className="ml-2 text-sm text-gray-700">
                      {option.name}
                    </span>
                  </label>
                ))}
              </div>
            </div>
          )}

          {/* Khu vực cho các tùy chọn của model 'tuychinh' có thể thêm ở đây sau */}
          {selectedModel.id === 'tuychinh' && (
            <div className="border-t border-gray-200 pt-4">
              <h3 className="text-md font-semibold mb-3 text-gray-700">Tùy Chọn Nâng Cao</h3>
              {/* 
                Ví dụ: Lấy lại logic từ Sidebar cũ nếu cần 
                Hiện tại để trống hoặc thêm các tùy chọn mới cho 'Tuỳ chỉnh'
              */}
              <p className="text-sm text-gray-500">Các tùy chọn cho model này sẽ được cập nhật sau.</p>
            </div>
          )}
        </aside>

        <main className="flex-1 p-6 bg-gray-100">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-2xl font-bold mb-6">
              Trích Xuất Nội Dung Video
            </h1>
            <VideoPlayer src={videoSrc} />
            
            {/* Khu vực kết quả */}
            <div className="mt-6 bg-white rounded-lg shadow p-4">
              <h2 className="text-lg font-semibold mb-4">
                Kết Quả Trích Xuất
              </h2>
              <div className="text-gray-600">
                {videoSrc ? (
                  <p>Đang xử lý video...</p>
                ) : (
                  <p>Vui lòng tải lên video để bắt đầu trích xuất</p>
                )}
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
} 