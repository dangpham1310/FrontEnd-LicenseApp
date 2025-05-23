import { FC, useState } from 'react';
// Sử dụng import cụ thể hơn cho Heroicons v2+
import { BellIcon, ChatBubbleLeftEllipsisIcon as ChatAlt2Icon, UserCircleIcon, Cog6ToothIcon as CogIcon, Bars3Icon as MenuIcon, MagnifyingGlassIcon as SearchIcon, ChevronDownIcon, EllipsisVerticalIcon as DotsVerticalIcon } from '@heroicons/react/24/outline';

const HeaderNav: FC = () => {
  const [searchTerm, setSearchTerm] = useState('');

  // Dữ liệu giả cho dropdown menu
  const menuItems = [
    { name: 'ADMIN', subItems: ['Quản lý người dùng', 'Cài đặt hệ thống'] },
    { name: 'VMS', subItems: ['Danh sách camera', 'Bản đồ camera'] },
    { name: 'TRAFSEC', subItems: ['Giám sát giao thông', 'Cảnh báo vi phạm'] },
    { name: 'FACEREC', subItems: ['Nhận diện khuôn mặt', 'Danh sách truy nã'] },
    { name: 'MAP', subItems: ['Bản đồ tổng quan'] },
  ];

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo and Main Navigation */}
          <div className="flex items-center space-x-8">
            <div className="flex-shrink-0">
              {/* Placeholder for Logo */}
              <img 
                className="h-8 w-auto" 
                src="https://tailwindui.com/img/logos/workflow-logo-indigo-600-mark-gray-800-text.svg" 
                alt="VNPT Smartcam"
              />
            </div>
            <nav className="hidden md:flex space-x-4">
              {menuItems.map((item) => (
                <div key={item.name} className="relative group">
                  <button className="text-gray-500 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium flex items-center">
                    {item.name}
                    {item.subItems && item.subItems.length > 0 && (
                      <ChevronDownIcon className="ml-1 h-4 w-4" />
                    )}
                  </button>
                  {item.subItems && item.subItems.length > 0 && (
                    <div className="absolute left-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-20">
                      <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
                        {item.subItems.map(subItem => (
                          <a
                            key={subItem}
                            href="#"
                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                            role="menuitem"
                          >
                            {subItem}
                          </a>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ))}
              <button className="text-gray-500 hover:text-gray-900 px-3 py-2">
                <DotsVerticalIcon className="h-5 w-5" />
              </button>
            </nav>
          </div>

          {/* Right side icons - User, Notifications etc. */}
          <div className="flex items-center space-x-4">
            <button className="text-gray-400 hover:text-gray-500 p-1 rounded-full">
              <span className="sr-only">View notifications</span>
              <BellIcon className="h-6 w-6" aria-hidden="true" />
              {/* Badge for notifications */}
              <span className="absolute top-3 right-[calc(theme(spacing.16)_*_2)] inline-flex items-center justify-center px-1.5 py-0.5 text-xs font-bold leading-none text-red-100 bg-red-600 rounded-full">
                77
              </span>
            </button>
            <button className="text-gray-400 hover:text-gray-500 p-1 rounded-full">
              <span className="sr-only">Messages</span>
              <ChatAlt2Icon className="h-6 w-6" aria-hidden="true" />
            </button>
            <button className="text-gray-400 hover:text-gray-500 p-1 rounded-full">
              <span className="sr-only">Settings</span>
              <CogIcon className="h-6 w-6" aria-hidden="true" />
            </button>
            <div className="relative">
              <button className="flex text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                <span className="sr-only">Open user menu</span>
                {/* Placeholder for user avatar */}
                <UserCircleIcon className="h-8 w-8 text-gray-600" /> 
              </button>
              {/* User dropdown menu - can be added later */}
            </div>
            
            {/* Mobile menu button */}
            <div className="md:hidden flex items-center">
              <button type="button" className="text-gray-500 hover:text-gray-600 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
                <span className="sr-only">Open main menu</span>
                <MenuIcon className="h-6 w-6" aria-hidden="true" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default HeaderNav; 