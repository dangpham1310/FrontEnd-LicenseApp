export interface Model {
  id: string;
  name: string;
  description: string;
}

export interface VideoExtractionSettings {
  autoDetectScenes: boolean;
  analyzeAudio: boolean;
  detectText: boolean;
  outputFormat: 'json' | 'csv' | 'txt';
}

export interface ExtractionResult {
  timestamp: number;
  type: 'scene' | 'audio' | 'text';
  content: string;
  confidence: number;
} 