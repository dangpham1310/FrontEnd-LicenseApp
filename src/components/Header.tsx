import { FC } from 'react';
import {
  BellIcon,
  ChatAltIcon,
  UserCircleIcon,
  SettingsIcon,
} from "./icons";

const Header: FC = () => {
  return (
    <header className="bg-white shadow-sm fixed top-0 left-0 right-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <h1 className="text-2xl font-bold text-primary">Video Extractor</h1>
          </div>
          
          <div className="flex items-center space-x-4">
            <button
              className="p-2 rounded-full hover:bg-gray-100 transition-colors duration-200"
              aria-label="Thông báo"
            >
              <BellIcon className="w-6 h-6 text-gray-600" />
            </button>
            
            <button
              className="p-2 rounded-full hover:bg-gray-100 transition-colors duration-200"
              aria-label="Trò chuyện"
            >
              <ChatAltIcon className="w-6 h-6 text-gray-600" />
            </button>
            
            <button
              className="p-2 rounded-full hover:bg-gray-100 transition-colors duration-200"
              aria-label="Cài đặt"
            >
              <SettingsIcon className="w-6 h-6 text-gray-600" />
            </button>

            <div className="flex items-center space-x-3 ml-4 pl-4 border-l border-gray-200">
              <UserCircleIcon className="w-8 h-8" />
              <div className="hidden md:block">
                <div className="text-sm font-medium text-gray-700">Người dùng</div>
                <div className="text-xs text-gray-500">user@example.com</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header; 