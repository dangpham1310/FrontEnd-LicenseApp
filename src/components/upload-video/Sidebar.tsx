import React, { FC, useState, useRef, useEffect } from 'react';
import FileUploadArea from "../FileUploadArea"; // Cập nhật đường dẫn
import ModelSelector from './ModelSelector'; // Đường dẫn đúng vì ModelSelector sẽ ở cùng cấp
import { Model } from '../../types'; // Đường dẫn này có thể cần điều chỉnh
import { RefreshIcon } from "../icons"; // Cập nhật đường dẫn

interface Option {
  id: string;
  name: string;
}

const vehicleOptionsData: Option[] = [
  { id: 'chon_tat_ca_xe', name: 'Chọn tất cả' },
  { id: 'xemay', name: 'Xe máy' },
  { id: 'xebuyt', name: 'Xe Buýt' },
  { id: 'oto', name: 'Xe Ô tô' },
  { id: 'xedap', name: 'Xe Đạp' },
];

const phuongTienFeatureOptionsData: Option[] = [
  { id: 'feat_connguoi', name: 'Nhận diện con người' },
  { id: 'feat_bienso', name: 'Nhận diện biển số' },
  { id: 'feat_mauxe', name: 'Nhận diện màu xe hơi' },
];

// Dữ liệu cho tùy chọn con của "Nhận diện con người"
const humanOptionsData: Option[] = [
  { id: 'human_all', name: 'Chọn tất cả (con người)' },
  { id: 'khong_non', name: 'Không nón' },
  { id: 'co_non', name: 'Có nón' },
  { id: 'non_den', name: 'Nón đen' },
  { id: 'non_xanh_nuoc_bien', name: 'Nón xanh nước biển' },
  { id: 'non_do', name: 'Nón đỏ' },
];

// Dữ liệu cho tùy chọn con của "Nhận diện biển số"
const licensePlateOptionsData: Option[] = [
  { id: 'plate_all', name: 'Chọn tất cả (biển số)' },
  { id: 'bien_so', name: 'Biển số' }, 
];

interface SidebarProps {
  selectedModel: Model;
  onModelSelect: (model: Model) => void;
  onFileSelect: (file: File) => void;
}

const Sidebar: FC<SidebarProps> = ({ selectedModel, onModelSelect, onFileSelect }) => {
  const [selectedVehicles, setSelectedVehicles] = useState<string[]>([]);
  const [selectedPtFeatures, setSelectedPtFeatures] = useState<string[]>([]);
  const [isFeatureDropdownOpen, setIsFeatureDropdownOpen] = useState<boolean>(false);
  const featureDropdownRef = useRef<HTMLDivElement>(null);

  // State cho các tùy chọn con
  const [selectedHumanOptions, setSelectedHumanOptions] = useState<string[]>([]);
  const [selectedLicensePlateOptions, setSelectedLicensePlateOptions] = useState<string[]>([]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (featureDropdownRef.current && !featureDropdownRef.current.contains(event.target as Node)) {
        setIsFeatureDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [featureDropdownRef]);

  // useEffect để reset tùy chọn con khi feature cha bị bỏ chọn
  useEffect(() => {
    if (!selectedPtFeatures.includes('feat_connguoi')) {
      setSelectedHumanOptions([]);
    }
    if (!selectedPtFeatures.includes('feat_bienso')) {
      setSelectedLicensePlateOptions([]);
    }
  }, [selectedPtFeatures]);

  const handleProcess = () => {
    console.log("Processing started...");
    console.log("Selected Model:", selectedModel);
    if (selectedModel.id === 'phuongtien') {
      console.log("Selected Vehicles:", selectedVehicles);
      console.log("Selected PhuongTien Features:", selectedPtFeatures);
      if (selectedPtFeatures.includes('feat_connguoi')) {
        console.log("Selected Human Options:", selectedHumanOptions);
      }
      if (selectedPtFeatures.includes('feat_bienso')) {
        console.log("Selected License Plate Options:", selectedLicensePlateOptions);
      }
    }
  };

  const handleUploadLinkClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    console.log("Tải video lên link clicked");
  };

  const handleVehicleChange = (vehicleId: string) => {
    setSelectedVehicles((prev) =>
      prev.includes(vehicleId) ? prev.filter((id) => id !== vehicleId) : [...prev, vehicleId]
    );
  };

  const handleSelectAllVehicles = (isChecked: boolean) => {
    if (isChecked) {
      setSelectedVehicles(vehicleOptionsData.filter(v => v.id !== 'chon_tat_ca_xe').map(option => option.id));
    } else {
      setSelectedVehicles([]);
    }
  };
  const isAllVehiclesSelected = vehicleOptionsData.filter(v => v.id !== 'chon_tat_ca_xe').every(v => selectedVehicles.includes(v.id)) && selectedVehicles.length > 0;

  const handlePtFeatureToggle = (featureId: string) => {
    setSelectedPtFeatures((prev) =>
      prev.includes(featureId) ? prev.filter((id) => id !== featureId) : [...prev, featureId]
    );
  };
  
  const getSelectedFeaturesDisplayText = () => {
    if (selectedPtFeatures.length === 0) return "Chọn tính năng...";
    return selectedPtFeatures
      .map(id => phuongTienFeatureOptionsData.find(opt => opt.id === id)?.name)
      .filter(name => name)
      .join(", ");
  };

  // Handlers cho Human Options
  const handleHumanOptionChange = (optionId: string) => {
    setSelectedHumanOptions((prev) =>
      prev.includes(optionId) ? prev.filter((id) => id !== optionId) : [...prev, optionId]
    );
  };
  const handleSelectAllHumanOptions = (isChecked: boolean) => {
    if (isChecked) {
      setSelectedHumanOptions(humanOptionsData.filter(opt => opt.id !== 'human_all').map(option => option.id));
    } else {
      setSelectedHumanOptions([]);
    }
  };
  const isAllHumanOptionsSelected = humanOptionsData.filter(opt => opt.id !== 'human_all').every(opt => selectedHumanOptions.includes(opt.id)) && selectedHumanOptions.length > 0;

  // Handlers cho License Plate Options
  const handleLicensePlateOptionChange = (optionId: string) => {
    setSelectedLicensePlateOptions((prev) =>
      prev.includes(optionId) ? prev.filter((id) => id !== optionId) : [...prev, optionId]
    );
  };
  const handleSelectAllLicensePlateOptions = (isChecked: boolean) => {
    if (isChecked) {
      setSelectedLicensePlateOptions(licensePlateOptionsData.filter(opt => opt.id !== 'plate_all').map(option => option.id));
    } else {
      setSelectedLicensePlateOptions([]);
    }
  };
  const isAllLicensePlateOptionsSelected = licensePlateOptionsData.filter(opt => opt.id !== 'plate_all').every(opt => selectedLicensePlateOptions.includes(opt.id)) && selectedLicensePlateOptions.length > 0;

  // Helper function to render a list of checkbox options
  const renderCheckboxOptions = (
    options: Option[], 
    selectedOptions: string[], 
    handleOptionChange: (id: string) => void, 
    handleSelectAll: (isChecked: boolean) => void, 
    isAllSelected: boolean, 
    selectAllId: string,
    ariaLabelPrefix: string
  ) => {
    return (
      <div className="space-y-1.5 mt-2">
        {options.map((option) => (
          <label key={option.id} className="flex items-center cursor-pointer p-1 rounded hover:bg-gray-100">
            <input
              type="checkbox"
              className="rounded border-gray-300 text-blue-600 focus:ring-blue-500 h-4 w-4"
              checked={
                option.id === selectAllId
                  ? isAllSelected
                  : selectedOptions.includes(option.id)
              }
              onChange={() => {
                if (option.id === selectAllId) {
                  handleSelectAll(!isAllSelected);
                } else {
                  handleOptionChange(option.id);
                }
              }}
              aria-labelledby={`${ariaLabelPrefix}-${option.id}`}
            />
            <span id={`${ariaLabelPrefix}-${option.id}`} className="ml-2 text-sm text-gray-600">
              {option.name}
            </span>
          </label>
        ))}
      </div>
    );
  };

  return (
    <aside className="w-80 bg-white border-r border-gray-200 fixed top-16 left-0 bottom-0 overflow-y-auto">
      <div className="p-6 flex flex-col h-full">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-xl font-semibold text-gray-800">Video Extractor</h1>
          <button
            onClick={handleUploadLinkClick}
            className="flex items-center text-sm text-blue-600 hover:text-blue-800 font-medium"
            aria-label="Tải video mới hoặc làm mới danh sách"
          >
            <RefreshIcon className="mr-1 h-4 w-4" />
            Tải video lên
          </button>
        </div>

        <FileUploadArea onFileSelect={onFileSelect} />
        
        <div className="mt-4">
            <h2 className="text-base font-medium text-gray-700 mb-1">Chọn Model Phân Tích</h2>
            <ModelSelector
              selectedModel={selectedModel}
              onModelSelect={(model) => {
                onModelSelect(model); 
                setSelectedVehicles([]);
                setSelectedPtFeatures([]);
                setIsFeatureDropdownOpen(false);
              }}
            />
        </div>

        {selectedModel.id === 'phuongtien' && (
            <>
              <div className="border-t border-gray-200 pt-4 mt-4">
                <h3 className="text-sm font-semibold mb-2 text-gray-700">Chọn Loại Phương Tiện</h3>
                {renderCheckboxOptions(
                  vehicleOptionsData, 
                  selectedVehicles, 
                  handleVehicleChange, 
                  handleSelectAllVehicles, 
                  isAllVehiclesSelected, 
                  'chon_tat_ca_xe',
                  'vehicle-opt'
                )}
              </div>

              <div className="border-t border-gray-200 pt-4 mt-4">
                <h3 className="text-sm font-semibold mb-2 text-gray-700">Chọn Tính Năng Nhận Diện</h3>
                <div className="relative" ref={featureDropdownRef}>
                  <button
                    type="button"
                    className="relative w-full bg-white border border-gray-300 rounded-md shadow-sm pl-3 pr-10 py-2 text-left cursor-pointer focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    onClick={() => setIsFeatureDropdownOpen(!isFeatureDropdownOpen)}
                    aria-haspopup="listbox"
                    aria-expanded={isFeatureDropdownOpen}
                  >
                    <span className="block truncate">{getSelectedFeaturesDisplayText()}</span>
                    <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                      <svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                        <path fillRule="evenodd" d="M10 3a1 1 0 01.707.293l3 3a1 1 0 01-1.414 1.414L10 5.414 7.707 7.707a1 1 0 01-1.414-1.414l3-3A1 1 0 0110 3zm-3.707 9.293a1 1 0 011.414 0L10 14.586l2.293-2.293a1 1 0 011.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
                      </svg>
                    </span>
                  </button>
                  {isFeatureDropdownOpen && (
                    <div className="absolute z-10 mt-1 w-full bg-white shadow-lg max-h-60 rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm">
                      {phuongTienFeatureOptionsData.map((feature) => (
                        <label key={feature.id} className="text-gray-900 cursor-pointer select-none relative py-2 pl-3 pr-9 flex items-center hover:bg-gray-100">
                          <input
                            type="checkbox"
                            className="rounded border-gray-300 text-blue-600 focus:ring-blue-500 h-4 w-4 mr-3"
                            checked={selectedPtFeatures.includes(feature.id)}
                            onChange={() => handlePtFeatureToggle(feature.id)}
                          />
                          {feature.name}
                          {selectedPtFeatures.includes(feature.id) && (
                            <span className="absolute inset-y-0 right-0 flex items-center pr-4 text-blue-600">
                              <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                              </svg>
                            </span>
                          )}
                        </label>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* Conditional rendering for sub-options based on selected features */}
              {selectedPtFeatures.includes('feat_connguoi') && (
                <div className="border-t border-gray-200 pt-4 mt-4">
                  <h3 className="text-sm font-semibold mb-2 text-gray-700">Chi tiết Nhận diện Con người</h3>
                  {renderCheckboxOptions(
                    humanOptionsData, 
                    selectedHumanOptions, 
                    handleHumanOptionChange, 
                    handleSelectAllHumanOptions, 
                    isAllHumanOptionsSelected, 
                    'human_all',
                    'human-opt'
                  )}
                </div>
              )}

              {selectedPtFeatures.includes('feat_bienso') && (
                <>
                  <hr className="my-3 border-gray-300" />
                  <div className="pt-1">
                    <h3 className="text-sm font-semibold mb-2 text-gray-700">Chi tiết Nhận diện Biển số</h3>
                    {renderCheckboxOptions(
                      licensePlateOptionsData, 
                      selectedLicensePlateOptions, 
                      handleLicensePlateOptionChange, 
                      handleSelectAllLicensePlateOptions, 
                      isAllLicensePlateOptionsSelected, 
                      'plate_all',
                      'plate-opt'
                    )}
                  </div>
                </>
              )}
            </>
          )}
        {/* Nút xử lý tạm thời */}
        {/* <div className="mt-auto pt-6">
          <button 
            onClick={handleProcess}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2.5 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors duration-150"
          >
            Bắt đầu trích xuất
          </button>
        </div> */}
      </div>
    </aside>
  );
};

export default Sidebar; 