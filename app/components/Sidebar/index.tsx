import { useState } from 'react';

interface Option {
  id: string;
  name: string;
}

const modelOptions: Option[] = [
  { id: 'phuongtien', name: 'Phương Tiện' },
  { id: 'tuychinh', name: 'Tuỳ Chỉnh' },
];

const phuongTienOptions: Option[] = [
  { id: 'chon_tat_ca_pt', name: 'Chọn tất cả' },
  { id: 'khong_non', name: 'Không nón' },
  { id: 'co_non', name: 'Có nón' },
  { id: 'non_den', name: 'Nón đen' },
  { id: 'non_xanh_nuoc_bien', name: 'Nón xanh nước biển' },
  { id: 'non_xanh_luc', name: 'Nón xanh lục' },
  { id: 'non_xam', name: 'Nón xám' },
];

const tuyChinhOptions: Option[] = [
  { id: 'chon_tat_ca_tc', name: 'Chọn tất cả' },
  { id: 'nhandien_bienso', name: 'Biển số' },
  { id: 'nhandien_dac_trung_con_nguoi', name: 'Nhận diện đặc trưng con người' },
];

const Sidebar = () => {
  const [selectedModel, setSelectedModel] = useState<string>(modelOptions[0].id);
  const [selectedPhuongTienOptions, setSelectedPhuongTienOptions] = useState<string[]>([]);
  const [selectedTuyChinhOptions, setSelectedTuyChinhOptions] = useState<string[]>([]);

  const handleModelChange = (modelId: string) => {
    setSelectedModel(modelId);
  };

  const handlePhuongTienOptionChange = (optionId: string) => {
    setSelectedPhuongTienOptions((prev) =>
      prev.includes(optionId) ? prev.filter((id) => id !== optionId) : [...prev, optionId]
    );
  };

  const handleTuyChinhOptionChange = (optionId: string) => {
    setSelectedTuyChinhOptions((prev) =>
      prev.includes(optionId) ? prev.filter((id) => id !== optionId) : [...prev, optionId]
    );
  };

  const handleSelectAllPhuongTien = (isChecked: boolean) => {
    if (isChecked) {
      setSelectedPhuongTienOptions(phuongTienOptions.map(option => option.id));
    } else {
      setSelectedPhuongTienOptions([]);
    }
  };

  const handleSelectAllTuyChinh = (isChecked: boolean) => {
    if (isChecked) {
      setSelectedTuyChinhOptions(tuyChinhOptions.map(option => option.id));
    } else {
      setSelectedTuyChinhOptions([]);
    }
  };

  return (
    <aside className="w-64 bg-white border-r border-gray-200 min-h-screen pt-16">
      <div className="p-4">
        <h2 className="text-lg font-semibold mb-4">Cài Đặt</h2>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Chọn Model
            </label>
            <select
              value={selectedModel}
              onChange={(e) => handleModelChange(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {modelOptions.map((option) => (
                <option key={option.id} value={option.id}>
                  {option.name}
                </option>
              ))}
            </select>
          </div>

          {selectedModel === 'phuongtien' && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Tùy Chọn Phương Tiện
              </label>
              <div className="space-y-2">
                {phuongTienOptions.map((option) => (
                  <label key={option.id} className="flex items-center">
                    <input
                      type="checkbox"
                      checked={selectedPhuongTienOptions.includes(option.id)}
                      onChange={() => {
                        if (option.id === 'chon_tat_ca_pt') {
                          handleSelectAllPhuongTien(!selectedPhuongTienOptions.includes('chon_tat_ca_pt'));
                        } else {
                          handlePhuongTienOptionChange(option.id);
                        }
                      }}
                      className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                    <span className="ml-2 text-sm text-gray-600">
                      {option.name}
                    </span>
                  </label>
                ))}
              </div>
            </div>
          )}

          {selectedModel === 'tuychinh' && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Tùy Chỉnh
              </label>
              <div className="space-y-2">
                 {tuyChinhOptions.map((option) => (
                  <label key={option.id} className="flex items-center">
                    <input
                      type="checkbox"
                       checked={selectedTuyChinhOptions.includes(option.id)}
                       onChange={() => {
                        if (option.id === 'chon_tat_ca_tc') {
                          handleSelectAllTuyChinh(!selectedTuyChinhOptions.includes('chon_tat_ca_tc'));
                        } else {
                          handleTuyChinhOptionChange(option.id);
                        }
                      }}
                      className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                    <span className="ml-2 text-sm text-gray-600">
                      {option.name}
                    </span>
                  </label>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </aside>
  );
};

export default Sidebar; 