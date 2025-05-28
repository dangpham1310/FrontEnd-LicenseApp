import { FC, useCallback, useState } from 'react';
import { UploadIcon } from './icons';

interface FileUploadAreaProps {
  onFileSelect: (file: File) => void;
}

const FileUploadArea: FC<FileUploadAreaProps> = ({ onFileSelect }) => {
  const [isDragging, setIsDragging] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const validateFile = (file: File): string | null => {
    const maxSize = 500 * 1024 * 1024; // 500MB
    const allowedTypes = ['video/mp4', 'video/avi', 'video/quicktime']; // MP4, AVI, MOV

    if (!allowedTypes.includes(file.type)) {
      return 'Định dạng file không được hỗ trợ. Vui lòng chọn file MP4, AVI hoặc MOV.';
    }

    if (file.size > maxSize) {
      return 'File vượt quá kích thước cho phép (500MB).';
    }

    return null;
  };

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    setError(null);

    const files = Array.from(e.dataTransfer.files);
    const videoFile = files.find(file => file.type.startsWith('video/'));
    
    if (!videoFile) {
      setError('Vui lòng chọn file video.');
      return;
    }

    const validationError = validateFile(videoFile);
    if (validationError) {
      setError(validationError);
      return;
    }

    onFileSelect(videoFile);
  }, [onFileSelect]);

  const handleFileSelect = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setError(null);
    const files = e.target.files;
    if (files && files.length > 0) {
      const file = files[0];
      const validationError = validateFile(file);
      if (validationError) {
        setError(validationError);
        return;
      }
      onFileSelect(file);
    }
  }, [onFileSelect]);

  return (
    <div className="space-y-2">
      <div
        className={`relative border-2 border-dashed rounded-lg p-8 text-center
          ${isDragging ? 'border-primary bg-primary/5' : 'border-gray-300 hover:border-primary/50'}
          ${error ? 'border-red-500' : ''}
          transition-colors duration-200`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <input
          type="file"
          accept="video/mp4,video/avi,video/quicktime"
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
          onChange={handleFileSelect}
          aria-label="Upload video file"
        />
        <div className="flex flex-col items-center">
          <UploadIcon className="w-12 h-12 text-gray-400 mb-4" />
          <p className="text-lg font-medium text-gray-700">
            Kéo thả video vào đây hoặc click để chọn file
          </p>
          <p className="mt-2 text-sm text-gray-500">
            Hỗ trợ các định dạng: MP4, AVI, MOV (tối đa 500MB)
          </p>
        </div>
      </div>
      {error && (
        <p className="text-sm text-red-500">{error}</p>
      )}
    </div>
  );
};

export default FileUploadArea; 