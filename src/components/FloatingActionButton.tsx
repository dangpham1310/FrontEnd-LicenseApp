import { FC } from 'react';

interface FloatingActionButtonProps {
  onClick: () => void;
  isProcessing?: boolean;
}

const FloatingActionButton: FC<FloatingActionButtonProps> = ({
  onClick,
  isProcessing = false
}) => {
  return (
    <button
      onClick={onClick}
      disabled={isProcessing}
      className={`fixed bottom-8 right-8 px-6 py-3 rounded-full shadow-lg
        flex items-center space-x-2 transition-all duration-200
        ${
          isProcessing
            ? 'bg-gray-400 cursor-not-allowed'
            : 'bg-primary hover:bg-primary/90'
        }`}
    >
      {isProcessing ? (
        <>
          <svg
            className="animate-spin h-5 w-5 text-white"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            ></path>
          </svg>
          <span className="text-white font-medium">Đang xử lý...</span>
        </>
      ) : (
        <>
          <svg
            className="w-5 h-5 text-white"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z"
              clipRule="evenodd"
            />
          </svg>
          <span className="text-white font-medium">Bắt đầu trích xuất</span>
        </>
      )}
    </button>
  );
};

export default FloatingActionButton; 