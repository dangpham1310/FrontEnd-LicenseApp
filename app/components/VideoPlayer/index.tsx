interface VideoPlayerProps {
  src?: string;
}

const VideoPlayer = ({ src }: VideoPlayerProps) => {
  if (!src) {
    return (
      <div className="w-full aspect-video bg-gray-100 rounded-lg flex items-center justify-center">
        <p className="text-gray-500">
          Chưa có video nào được tải lên
        </p>
      </div>
    );
  }

  return (
    <div className="w-full aspect-video bg-black rounded-lg overflow-hidden">
      <video
        src={src}
        className="w-full h-full object-contain"
        controlsList="nodownload"
        aria-label="Video player"
        autoPlay
        muted
      >
        Trình duyệt của bạn không hỗ trợ phát video.
      </video>
    </div>
  );
};

export default VideoPlayer; 