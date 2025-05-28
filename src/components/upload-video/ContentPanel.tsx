import { FC, useState, useRef, useEffect, MouseEvent } from 'react';
import { PlayIcon } from '../icons';

interface Point {
  x: number;
  y: number;
}

interface ContentPanelProps {
  videoFile: File | null;
}

const ContentPanel: FC<ContentPanelProps> = ({ videoFile }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDrawingRoi, setIsDrawingRoi] = useState(false);
  const [isDrawingArrow, setIsDrawingArrow] = useState(false);
  const [roiPoints, setRoiPoints] = useState<Point[]>([]);
  const [arrowPoints, setArrowPoints] = useState<Point[]>([]);

  // Xử lý video
  useEffect(() => {
    const video = videoRef.current;
    if (!video || !videoFile) return;

    const videoUrl = URL.createObjectURL(videoFile);
    video.src = videoUrl;

    return () => {
      URL.revokeObjectURL(videoUrl);
    };
  }, [videoFile]);

  // Vẽ mũi tên
  const drawArrow = (ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement) => {
    if (arrowPoints.length < 1) return;

    const startPoint = {
      x: arrowPoints[0].x * canvas.width,
      y: arrowPoints[0].y * canvas.height
    };

    // Vẽ điểm đầu
    ctx.fillStyle = '#0066cc';
    ctx.beginPath();
    ctx.arc(startPoint.x, startPoint.y, 4, 0, 2 * Math.PI);
    ctx.fill();

    if (arrowPoints.length === 2) {
      const endPoint = {
        x: arrowPoints[1].x * canvas.width,
        y: arrowPoints[1].y * canvas.height
      };

      // Vẽ đường thẳng
      ctx.beginPath();
      ctx.moveTo(startPoint.x, startPoint.y);
      ctx.lineTo(endPoint.x, endPoint.y);
      ctx.strokeStyle = '#0066cc';
      ctx.lineWidth = 2;
      ctx.stroke();

      // Vẽ mũi tên
      const angle = Math.atan2(endPoint.y - startPoint.y, endPoint.x - startPoint.x);
      const headLength = 15; // Độ dài của mũi tên
      const headAngle = Math.PI / 6; // Góc của mũi tên (30 độ)

      // Vẽ hai cạnh của mũi tên
      ctx.beginPath();
      ctx.moveTo(endPoint.x, endPoint.y);
      ctx.lineTo(
        endPoint.x - headLength * Math.cos(angle - headAngle),
        endPoint.y - headLength * Math.sin(angle - headAngle)
      );
      ctx.moveTo(endPoint.x, endPoint.y);
      ctx.lineTo(
        endPoint.x - headLength * Math.cos(angle + headAngle),
        endPoint.y - headLength * Math.sin(angle + headAngle)
      );
      ctx.strokeStyle = '#0066cc';
      ctx.lineWidth = 2;
      ctx.stroke();
    }
  };

  // Vẽ ROI
  const drawRoi = () => {
    const canvas = canvasRef.current;
    const video = videoRef.current;
    if (!canvas || !video) return;

    // Cập nhật kích thước canvas theo video
    canvas.width = video.clientWidth;
    canvas.height = video.clientHeight;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Xóa canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Vẽ các điểm và đường ROI
    if (roiPoints.length > 0) {
      // Vẽ đường nối giữa các điểm
      ctx.beginPath();
      ctx.moveTo(roiPoints[0].x * canvas.width, roiPoints[0].y * canvas.height);
      roiPoints.forEach((point, index) => {
        if (index > 0) {
          ctx.lineTo(point.x * canvas.width, point.y * canvas.height);
        }
      });

      // Nếu đã đủ 4 điểm, vẽ vùng ROI hoàn chỉnh
      if (roiPoints.length === 4) {
        // Đóng path để tạo hình khép kín
        ctx.closePath();

        // Lưu trạng thái canvas hiện tại
        ctx.save();

        // Vẽ fill màu đỏ nhạt cho vùng ROI
        ctx.fillStyle = 'rgba(255, 0, 0, 0.2)';
        ctx.fill();

        // Vẽ viền đỏ đậm
        ctx.strokeStyle = '#FF0000';
        ctx.lineWidth = 2;
        ctx.stroke();

        // Tạo clipping path để các đường gạch chéo chỉ xuất hiện trong vùng ROI
        ctx.clip();

        // Vẽ các đường gạch chéo
        ctx.strokeStyle = 'rgba(255, 0, 0, 0.4)';
        ctx.lineWidth = 1;
        const spacing = 8; // Khoảng cách giữa các đường gạch
        
        // Tính toán kích thước tổng thể để đảm bảo phủ toàn bộ vùng ROI
        const maxDim = Math.max(canvas.width, canvas.height);
        
        // Vẽ các đường gạch chéo từ trái sang phải
        for (let i = -maxDim; i <= maxDim; i += spacing) {
          ctx.beginPath();
          ctx.moveTo(i, 0);
          ctx.lineTo(i + maxDim, maxDim);
          ctx.stroke();
        }

        // Khôi phục trạng thái canvas
        ctx.restore();
      } else {
        // Nếu chưa đủ 4 điểm, chỉ vẽ đường nối
        ctx.strokeStyle = '#FF0000';
        ctx.lineWidth = 2;
        ctx.stroke();
      }

      // Vẽ các điểm
      roiPoints.forEach(point => {
        ctx.fillStyle = '#FF0000';
        ctx.beginPath();
        ctx.arc(point.x * canvas.width, point.y * canvas.height, 4, 0, 2 * Math.PI);
        ctx.fill();
      });
    }

    // Vẽ mũi tên
    drawArrow(ctx, canvas);
  };

  // Xử lý click để vẽ
  const handleClick = (event: MouseEvent<HTMLDivElement>) => {
    if (!videoRef.current || !canvasRef.current) return;
    if (!isDrawingRoi && !isDrawingArrow) return;

    const video = videoRef.current;
    const rect = video.getBoundingClientRect();

    // Tính toán tọa độ tương đối
    const x = (event.clientX - rect.left) / rect.width;
    const y = (event.clientY - rect.top) / rect.height;

    if (isDrawingRoi) {
      if (roiPoints.length < 4) {
        setRoiPoints(prev => [...prev, { x, y }]);
        if (roiPoints.length === 3) {
          setIsDrawingRoi(false);
        }
      }
    } else if (isDrawingArrow) {
      if (arrowPoints.length < 2) {
        setArrowPoints(prev => [...prev, { x, y }]);
        if (arrowPoints.length === 1) {
          setIsDrawingArrow(false);
        }
      }
    }
  };

  // Vẽ lại khi có thay đổi
  useEffect(() => {
    drawRoi();
  }, [roiPoints, arrowPoints]);

  // Vẽ lại khi video resize
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const observer = new ResizeObserver(() => {
      drawRoi();
    });

    observer.observe(video);
    return () => observer.disconnect();
  }, []);

  return (
    <main className="flex-1 p-6 bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-md w-full h-full flex flex-col">
        {videoFile ? (
          <div className="relative w-full flex-grow" onClick={handleClick}>
            <video
              ref={videoRef}
              className="w-full h-full object-contain bg-black"
              controls
              autoPlay
              muted
            >
              Trình duyệt của bạn không hỗ trợ thẻ video.
            </video>
            <canvas
              ref={canvasRef}
              className="absolute top-0 left-0 w-full h-full pointer-events-none"
            />
          </div>
        ) : (
          <div className="flex-grow flex flex-col items-center justify-center text-gray-500 border-2 border-dashed border-gray-300 rounded-md">
            <PlayIcon className="w-24 h-24 mb-4 opacity-50" />
            <p className="text-lg">Chưa có video nào được chọn.</p>
            <p className="text-sm">Vui lòng chọn video từ thanh bên trái để bắt đầu.</p>
          </div>
        )}
        
        <div className="flex space-x-4 mt-4">
          <button
            onClick={() => {
              setIsDrawingRoi(!isDrawingRoi);
              setIsDrawingArrow(false);
              if (!isDrawingRoi) {
                setRoiPoints([]);
              }
            }}
            className={`px-4 py-2 text-sm font-medium rounded-md transition-colors
              ${isDrawingRoi ? 'bg-red-500 text-white' : 'bg-gray-200 text-gray-700'}`}
          >
            {roiPoints.length === 4 ? "Vẽ lại ROI" : (isDrawingRoi ? "Hoàn thành" : "Vẽ ROI")}
          </button>
          
          {roiPoints.length > 0 && (
            <button
              onClick={() => {
                setRoiPoints([]);
                setIsDrawingRoi(false);
              }}
              className="px-4 py-2 text-sm font-medium rounded-md bg-gray-200 text-gray-700"
            >
              Xóa ROI
            </button>
          )}

          <button
            onClick={() => {
              setIsDrawingArrow(!isDrawingArrow);
              setIsDrawingRoi(false);
              if (!isDrawingArrow) {
                setArrowPoints([]);
              }
            }}
            className={`px-4 py-2 text-sm font-medium rounded-md transition-colors
              ${isDrawingArrow ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'}`}
          >
            {arrowPoints.length === 2 ? "Vẽ lại hướng" : (isDrawingArrow ? "Hoàn thành" : "Vẽ hướng")}
          </button>

          {arrowPoints.length > 0 && (
            <button
              onClick={() => {
                setArrowPoints([]);
                setIsDrawingArrow(false);
              }}
              className="px-4 py-2 text-sm font-medium rounded-md bg-gray-200 text-gray-700"
            >
              Xóa hướng
            </button>
          )}
        </div>
      </div>
    </main>
  );
};

export default ContentPanel; 