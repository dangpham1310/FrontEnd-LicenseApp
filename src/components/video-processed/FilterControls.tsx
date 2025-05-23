import { FC, useState } from 'react';
import { MagnifyingGlassIcon as SearchIcon, FunnelIcon as FilterIcon, ChevronDownIcon, PencilIcon } from '@heroicons/react/24/outline';

interface FilterControlsProps {
  onSearch?: (filters: any) => void; // Callback for when search is triggered
}

const FilterControls: FC<FilterControlsProps> = ({ onSearch }) => {
  // Mock state for filter values - to be expanded
  const [input1, setInput1] = useState('');
  const [licensePlate, setLicensePlate] = useState('');
  const [selectedColor, setSelectedColor] = useState('');
  const [filterB, setFilterB] = useState('');
  const [filterK, setFilterK] = useState('');
  const [showType, setShowType] = useState('');
  const [selectedThuoc, setSelectedThuoc] = useState('');

  const handleSearchClick = () => {
    if (onSearch) {
      onSearch({
        input1,
        licensePlate,
        selectedColor,
        filterB,
        filterK,
        showType,
        selectedThuoc,
      });
    }
    console.log("Search triggered with filters:", { input1, licensePlate, selectedColor, filterB, filterK, showType, selectedThuoc });
  };

  const colors = ["Chọn màu", "Đen", "Trắng", "Xám", "Đỏ", "Xanh dương", "Vàng"]; // Example colors
  const displayTypes = ["Hiển thị t...", "Tất cả", "Phương tiện", "Người"];
  const thuocTypes = ["Chọn thuốc...", "Có mũ", "Không mũ", "Áo dài tay"];

  return (
    <div className="p-4 bg-white border-b border-gray-200">
      <div className="flex flex-wrap items-center gap-3">
        {/* Bộ lọc icon and text */}
        <button className="flex items-center text-sm text-gray-700 hover:text-blue-600 font-medium">
          <FilterIcon className="h-5 w-5 mr-1.5 text-blue-500" />
          Bộ lọc
        </button>

        {/* Input fields and dropdowns */}
        <div className="relative flex-grow sm:flex-grow-0 sm:w-40">
          <input 
            type="text" 
            placeholder="Nhập ..."
            value={input1} 
            onChange={e => setInput1(e.target.value)}
            className="w-full pl-8 pr-2 py-1.5 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
          />
          <SearchIcon className="h-4 w-4 text-gray-400 absolute left-2 top-1/2 -translate-y-1/2" />
        </div>

        <div className="relative flex-grow sm:flex-grow-0 sm:w-40">
          <input 
            type="text" 
            placeholder="Biển số"
            value={licensePlate} 
            onChange={e => setLicensePlate(e.target.value)}
            className="w-full pl-8 pr-2 py-1.5 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
          />
          <SearchIcon className="h-4 w-4 text-gray-400 absolute left-2 top-1/2 -translate-y-1/2" />
        </div>

        <div className="relative flex-grow sm:flex-grow-0 sm:w-36">
          <select 
            value={selectedColor} 
            onChange={e => setSelectedColor(e.target.value)}
            className="w-full pl-2 pr-8 py-1.5 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 appearance-none bg-white"
          >
            {colors.map(color => <option key={color} value={color === "Chọn màu" ? "" : color}>{color}</option>)}
          </select>
          <ChevronDownIcon className="h-4 w-4 text-gray-400 absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none" />
        </div>

        <button className="flex items-center text-sm text-gray-700 hover:text-blue-600">
            <PencilIcon className="h-4 w-4 mr-1 text-blue-500" />
            Vẽ luật
        </button>

        {/* B...K filters - assuming they are text inputs or simple selects for now */}
        <input 
            type="text" 
            placeholder="B ... K ..."
            value={filterB}
            onChange={e => setFilterB(e.target.value)}
            className="w-full sm:w-32 px-2 py-1.5 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
        />
        
        <div className="relative flex-grow sm:flex-grow-0 sm:w-36">
          <select 
            value={showType} 
            onChange={e => setShowType(e.target.value)}
            className="w-full pl-2 pr-8 py-1.5 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 appearance-none bg-white"
          >
            {displayTypes.map(type => <option key={type} value={type === displayTypes[0] ? "" : type}>{type}</option>)} 
          </select>
          <ChevronDownIcon className="h-4 w-4 text-gray-400 absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none" />
        </div>

        <div className="relative flex-grow sm:flex-grow-0 sm:w-36">
          <select 
            value={selectedThuoc} 
            onChange={e => setSelectedThuoc(e.target.value)}
            className="w-full pl-2 pr-8 py-1.5 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 appearance-none bg-white"
          >
            {thuocTypes.map(type => <option key={type} value={type === thuocTypes[0] ? "" : type}>{type}</option>)} 
          </select>
          <ChevronDownIcon className="h-4 w-4 text-gray-400 absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none" />
        </div>

        {/* Search Button */}
        <button 
          onClick={handleSearchClick}
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-1.5 rounded-md text-sm font-medium flex items-center"
        >
          <SearchIcon className="h-4 w-4 mr-1.5" />
          Tìm kiếm
        </button>
      </div>
    </div>
  );
};

export default FilterControls; 