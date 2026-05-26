
export interface NativeModule {
  name: string;
  isAvailable: boolean;
}

export interface StorageOptions {
  encrypted?: boolean;
}

export interface NetworkStatus {
  isConnected: boolean;
  type: 'wifi' | 'cellular' | 'none' | 'unknown';
}

export interface CameraOptions {
  quality?: number;
  facing?: 'front' | 'back';
  flash?: 'on' | 'off' | 'auto';
}

export interface ImageResult {
  uri: string;
  width: number;
  height: number;
  type: string;
}

export interface FileInfo {
  name: string;
  path: string;
  size: number;
  type: string;
  modifiedAt: number;
}
