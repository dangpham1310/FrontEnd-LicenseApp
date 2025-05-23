import Link from 'next/link';

const Header = () => {
  return (
    <header className="fixed top-0 left-0 right-0 bg-white shadow-sm z-50">
      <div className="container mx-auto px-4 h-16">
        <div className="flex items-center justify-between h-full">
          <Link 
            href="/" 
            className="text-xl font-bold text-blue-600 hover:text-blue-700 transition-colors"
            aria-label="Trang chủ Video Extractor"
          >
            Video Extractor
          </Link>
          
          <nav className="flex items-center space-x-4">
            <button
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              aria-label="Tải lên video mới"
            >
              Tải lên Video
            </button>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header; 