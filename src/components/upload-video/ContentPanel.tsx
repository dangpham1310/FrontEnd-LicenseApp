import { FC, useState, useRef, useEffect, MouseEvent, useCallback } from 'react';
import { PlayIcon } from '../icons'; // Cập nhật đường dẫn

interface Point {
  x: number; // Relative coordinate (0 to 1)
  y: number; // Relative coordinate (0 to 1)
}

// Giả sử Model type được import hoặc định nghĩa ở đâu đó nếu ContentPanelProps cần nó
// interface Model { id: string; name: string; description: string; }

interface ContentPanelProps {
  videoFile: File | null;
  // selectedModel: Model; // Tạm thời bỏ selectedModel khỏi props nếu ContentPanel không trực tiếp dùng
                        // Nếu dùng thì phải đảm bảo nó được truyền từ VideoExtractorPage
}

const ContentPanel: FC<ContentPanelProps> = ({ videoFile /*, selectedModel*/ }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // ROI States
  const [isDrawingRoi, setIsDrawingRoi] = useState<boolean>(false);
  const [roiPoints, setRoiPoints] = useState<Point[]>([]);

  // Direction States
  const [isDrawingDirection, setIsDrawingDirection] = useState<boolean>(false);
  const [directionPoints, setDirectionPoints] = useState<Point[]>([]);

  // --- Refactored ROI Drawing Logic ---
  const drawRoiOnCanvas = useCallback((ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement, points: Point[]) => {
    if (points.length === 0) return;

    const canvasWidth = canvas.width;
    const canvasHeight = canvas.height;

    // Default style for points
    ctx.fillStyle = '#FF0000'; // Red for points
    points.forEach(point => {
      ctx.beginPath();
      ctx.arc(point.x * canvasWidth, point.y * canvasHeight, 3, 0, 2 * Math.PI);
      ctx.fill();
    });

    if (points.length > 1) {
      ctx.beginPath();
      ctx.moveTo(points[0].x * canvasWidth, points[0].y * canvasHeight);
      for (let i = 1; i < points.length; i++) {
        ctx.lineTo(points[i].x * canvasWidth, points[i].y * canvasHeight);
      }

      if (points.length === 4) {
        ctx.closePath();
        ctx.fillStyle = 'rgba(255, 0, 0, 0.2)';
        ctx.fill();

        ctx.save();
        ctx.clip();
        ctx.strokeStyle = 'rgba(255, 0, 0, 0.4)';
        ctx.lineWidth = 1;
        const spacing = 7;
        for (let i = -canvasHeight; i < canvasWidth; i += spacing) {
          ctx.beginPath();
          ctx.moveTo(i, 0);
          ctx.lineTo(i + canvasHeight, canvasHeight);
          ctx.stroke();
        }
        ctx.restore();

        ctx.strokeStyle = '#FF0000';
        ctx.lineWidth = 2;
        ctx.stroke();
      } else {
        ctx.strokeStyle = '#FF0000';
        ctx.lineWidth = 2;
        ctx.stroke();
      }
    }
  }, []);

  // --- Direction Drawing Logic ---
  const drawDirectionOnCanvas = useCallback((ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement, points: Point[]) => {
    if (points.length === 0) return;

    const canvasWidth = canvas.width;
    const canvasHeight = canvas.height;

    ctx.strokeStyle = '#007bff'; // Blue for direction
    ctx.fillStyle = '#007bff';
    ctx.lineWidth = 2.5; // Slightly thicker line for direction

    const p1Abs = { x: points[0].x * canvasWidth, y: points[0].y * canvasHeight };

    // Draw first point (optional, could be just for visual feedback while drawing)
    ctx.beginPath();
    ctx.arc(p1Abs.x, p1Abs.y, 3, 0, 2 * Math.PI);
    ctx.fill();

    if (points.length === 2) {
      const p2Abs = { x: points[1].x * canvasWidth, y: points[1].y * canvasHeight };

      // Draw line
      ctx.beginPath();
      ctx.moveTo(p1Abs.x, p1Abs.y);
      ctx.lineTo(p2Abs.x, p2Abs.y);
      ctx.stroke();

      // Draw arrowhead
      const angle = Math.atan2(p2Abs.y - p1Abs.y, p2Abs.x - p1Abs.x);
      const headLength = 12; // pixels, length of arrowhead

      ctx.beginPath();
      ctx.moveTo(p2Abs.x, p2Abs.y);
      ctx.lineTo(
        p2Abs.x - headLength * Math.cos(angle - Math.PI / 6),
        p2Abs.y - headLength * Math.sin(angle - Math.PI / 6)
      );
      ctx.moveTo(p2Abs.x, p2Abs.y); // Move back to the tip for the other side
      ctx.lineTo(
        p2Abs.x - headLength * Math.cos(angle + Math.PI / 6),
        p2Abs.y - headLength * Math.sin(angle + Math.PI / 6)
      );
      ctx.stroke();
    }
  }, []);

  // Combined drawing function
  const redrawCanvasContents = useCallback(() => {
    const video = videoRef.current;
    const canvas = canvasRef.current;

    if (!canvas || !video) return;

    if (video.clientWidth > 0 && video.clientHeight > 0) {
      if (canvas.width !== video.clientWidth || canvas.height !== video.clientHeight) {
        canvas.width = video.clientWidth;
        canvas.height = video.clientHeight;
      }
    } else {
      const ctx = canvas.getContext('2d');
      if (ctx && (canvas.width > 0 || canvas.height > 0)) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
      }
      return;
    }

    if (canvas.width === 0 || canvas.height === 0) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    drawRoiOnCanvas(ctx, canvas, roiPoints);
    drawDirectionOnCanvas(ctx, canvas, directionPoints);

  }, [roiPoints, directionPoints, drawRoiOnCanvas, drawDirectionOnCanvas]);

  // Main effect for drawing when data changes
  useEffect(() => {
    if (videoFile) {
      redrawCanvasContents();
    } else {
      const canvas = canvasRef.current;
      if (canvas && (canvas.width > 0 || canvas.height > 0)) {
        const ctx = canvas.getContext('2d');
        ctx?.clearRect(0, 0, canvas.width, canvas.height);
      }
    }
  }, [videoFile, roiPoints, directionPoints, redrawCanvasContents]);

  // Effect for ResizeObserver
  useEffect(() => {
    const video = videoRef.current;
    const canvas = canvasRef.current;
    if (!video || !canvas || !videoFile) return;

    const setCanvasDimensionsAndDraw = () => {
      if (video.clientWidth > 0 && video.clientHeight > 0) {
        if (canvas.width !== video.clientWidth) canvas.width = video.clientWidth;
        if (canvas.height !== video.clientHeight) canvas.height = video.clientHeight;
        redrawCanvasContents();
      }
    };
    
    requestAnimationFrame(setCanvasDimensionsAndDraw);
    const resizeObserver = new ResizeObserver(() => {
        requestAnimationFrame(setCanvasDimensionsAndDraw);
    });
    resizeObserver.observe(video);
    return () => resizeObserver.disconnect();
  }, [videoFile, redrawCanvasContents]);
  
  const handleToggleDrawingRoi = () => {
    const newIsDrawingRoi = !isDrawingRoi;
    setIsDrawingRoi(newIsDrawingRoi);
    if (newIsDrawingRoi) {
      setIsDrawingDirection(false); // Turn off direction drawing
      setRoiPoints([]); // Clear ROI points to start new ROI
    } else {
      // If finishing ROI drawing, and it has less than 4 points, consider it cancelled.
      if (roiPoints.length > 0 && roiPoints.length < 4) {
        // setRoiPoints([]); // Or let user complete later? For now, keep points unless they start new.
      }
    }
    requestAnimationFrame(redrawCanvasContents); // Redraw to reflect mode change or point clearing
  };

  const handleClearRoi = () => {
    setRoiPoints([]);
    setIsDrawingRoi(false);
    requestAnimationFrame(redrawCanvasContents);
  };

  const handleToggleDrawingDirection = () => {
    const newIsDrawingDirection = !isDrawingDirection;
    setIsDrawingDirection(newIsDrawingDirection);
    if (newIsDrawingDirection) {
      setIsDrawingRoi(false); // Turn off ROI drawing
      setDirectionPoints([]); // Clear old direction points
    } else {
      // If finishing and only 1 point was made, clear it (cancelled)
      if (directionPoints.length === 1) {
        setDirectionPoints([]);
      }
    }
    requestAnimationFrame(redrawCanvasContents);
  };

  const handleClearDirection = () => {
    setDirectionPoints([]);
    setIsDrawingDirection(false);
    requestAnimationFrame(redrawCanvasContents);
  };

  const handleVideoAreaClick = (event: MouseEvent<HTMLDivElement>) => {
    if (!videoRef.current || !canvasRef.current) return;
    const video = videoRef.current;
    const videoRect = video.getBoundingClientRect();
    
    // Check if click is within video element bounds
    if (event.clientX < videoRect.left || event.clientX > videoRect.right || 
        event.clientY < videoRect.top || event.clientY > videoRect.bottom) {
      return; // Click was outside the video area
    }

    const clickX = event.clientX - videoRect.left;
    const clickY = event.clientY - videoRect.top;

    const x = clickX / videoRect.width; // videoRect.width should be clientWidth
    const y = clickY / videoRect.height; // videoRect.height should be clientHeight

    if (isDrawingRoi) {
      if (roiPoints.length < 4) {
        setRoiPoints(prevPoints => [...prevPoints, { x, y }]);
        if (roiPoints.length === 3) { // 3 points already, this click is the 4th
          setIsDrawingRoi(false); // Auto-finish ROI drawing
        }
      }
    } else if (isDrawingDirection) {
      if (directionPoints.length < 2) {
        setDirectionPoints(prevPoints => [...prevPoints, { x, y }]);
        if (directionPoints.length === 1) { // 1 point already, this click is the 2nd
          setIsDrawingDirection(false); // Auto-finish direction drawing
        }
      }
    }
    requestAnimationFrame(redrawCanvasContents);
  };

  useEffect(() => {
    if (videoFile && videoRef.current) {
      videoRef.current.src = URL.createObjectURL(videoFile);
      videoRef.current.onloadedmetadata = () => {
        if (videoRef.current) {
          videoRef.current.play().catch(error => console.warn("Autoplay was prevented:", error));
          requestAnimationFrame(() => {
            redrawCanvasContents();
          });
        }
      };
      // Reset ROI and Direction when a new video is loaded
      setRoiPoints([]);
      setDirectionPoints([]);
      setIsDrawingRoi(false);
      setIsDrawingDirection(false);
    } else if (!videoFile && videoRef.current) {
      videoRef.current.src = '';
      URL.revokeObjectURL(videoRef.current.src); // Clean up previous object URL
      setRoiPoints([]);
      setDirectionPoints([]);
      setIsDrawingRoi(false);
      setIsDrawingDirection(false);
      requestAnimationFrame(redrawCanvasContents); // Clear canvas
    }

    return () => {
      if (videoRef.current && videoRef.current.src) {
        URL.revokeObjectURL(videoRef.current.src);
      }
    };
  }, [videoFile, redrawCanvasContents]);

  const roiButtonText = roiPoints.length === 4 ? "Vẽ lại ROI" : (isDrawingRoi ? "Hoàn thành vẽ ROI" : "Bắt đầu vẽ ROI");
  const directionButtonText = directionPoints.length === 2 ? "Vẽ lại hướng" : (isDrawingDirection ? "Hoàn thành vẽ hướng" : "Vẽ chiều hướng đi");


  return (
    <main className="flex-1 p-6 bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-md w-full h-full flex flex-col">
        {videoFile ? (
          <div className="relative w-full flex-grow" onClick={handleVideoAreaClick}>
            <video
              ref={videoRef}
              className="w-full h-full object-contain bg-black"
              autoPlay
              muted
              onPlay={() => requestAnimationFrame(redrawCanvasContents)}
              onPause={() => requestAnimationFrame(redrawCanvasContents)}
            >
              Trình duyệt của bạn không hỗ trợ thẻ video.
            </video>
            <canvas
              ref={canvasRef}
              className="absolute top-0 left-0 w-full h-full pointer-events-none"
              style={{ zIndex: 10 }}
            />
          </div>
        ) : (
          <div className="flex-grow flex flex-col items-center justify-center text-gray-500 border-2 border-dashed border-gray-300 rounded-md">
            <PlayIcon className="w-24 h-24 mb-4 opacity-50" />
            <p className="text-lg">Chưa có video nào được chọn.</p>
            <p className="text-sm">Vui lòng chọn video từ thanh bên trái để bắt đầu.</p>
          </div>
        )}
        <div className="pt-4 flex flex-wrap gap-2 justify-center">
          <button
            onClick={handleToggleDrawingRoi}
            disabled={isDrawingDirection}
            className={`px-4 py-2 text-sm font-medium rounded-md transition-colors
              ${isDrawingRoi
                ? 'bg-red-500 hover:bg-red-600 text-white'
                : 'bg-gray-200 hover:bg-gray-300 text-gray-700'}
              disabled:opacity-50 disabled:cursor-not-allowed
            `}
            aria-pressed={isDrawingRoi}
          >
            {roiButtonText}
          </button>
          <button
            onClick={handleClearRoi}
            disabled={roiPoints.length === 0 || isDrawingRoi}
            className="px-4 py-2 text-sm font-medium rounded-md bg-gray-200 hover:bg-gray-300 text-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            Xóa ROI
          </button>
          <button
            onClick={handleToggleDrawingDirection}
            disabled={isDrawingRoi}
            className={`px-4 py-2 text-sm font-medium rounded-md transition-colors
              ${isDrawingDirection
                ? 'bg-blue-500 hover:bg-blue-600 text-white'
                : 'bg-gray-200 hover:bg-gray-300 text-gray-700'}
              disabled:opacity-50 disabled:cursor-not-allowed
            `}
            aria-pressed={isDrawingDirection}
          >
            {directionButtonText}
          </button>
          <button
            onClick={handleClearDirection}
            disabled={directionPoints.length === 0 || isDrawingDirection}
            className="px-4 py-2 text-sm font-medium rounded-md bg-gray-200 hover:bg-gray-300 text-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            Xóa Hướng
          </button>
        </div>
      </div>
    </main>
  );
};

export default ContentPanel; 