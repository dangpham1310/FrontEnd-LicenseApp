export interface VideoListItem {
  id: string;
  name: string;
  thumbnailUrl?: string; // Optional: path to a placeholder image or actual thumbnail
  status: "Hoàn tất" | "Đang xử lý" | "Lỗi";
  processedDate: string;
  duration?: string; // e.g., "00:17:10:00"
}

export interface MediaGridItem {
  id: string;
  thumbnailUrl: string; // Path to a placeholder image or actual thumbnail
  type?: "video" | "object"; // To differentiate if needed
  // Add other properties if items in the grid have more data, e.g., timestamp from video
}

export interface ObjectDetails {
  id: string;
  imageUrl?: string; // Image/video frame of the object
  videoUrl?: string; // If it's a video clip
  timestamp: string; // e.g., "17/12/2024 14:43:16"
  objectType: string; // e.g., "Xe máy"
  licensePlate?: string; // e.g., "RECOGNIZE-FAIL" or actual plate
  color?: string; // e.g., "Unknown" or actual color
  attributes?: string; // e.g., "Không có dữ liệu"
  // Add other relevant details
} 