
import type { CameraOptions, ImageResult } from './types';

class CameraClass {
  async requestPermissions(): Promise<'granted' | 'denied' | 'undetermined'> {
    try {
      const result = await navigator.permissions.query({ name: 'camera' as PermissionName });
      if (result.state === 'granted') return 'granted';
      if (result.state === 'denied') return 'denied';
      return 'undetermined';
    } catch {
      return 'undetermined';
    }
  }

  async takePicture(options?: CameraOptions): Promise<ImageResult> {
    
    throw new Error('Camera.takePicture requires native implementation');
  }

  async recordVideo(options?: CameraOptions): Promise<{ uri: string; duration: number }> {
    throw new Error('Camera.recordVideo requires native implementation');
  }

  async checkIfCameraAvailable(): Promise<boolean> {
    try {
      const devices = await navigator.mediaDevices.enumerateDevices();
      return devices.some(device => device.kind === 'videoinput');
    } catch {
      return false;
    }
  }

  async getAvailableCameras(): Promise<Array<{ id: string; name: string; facing: 'front' | 'back' }>> {
    try {
      const devices = await navigator.mediaDevices.enumerateDevices();
      const cameras = devices.filter(d => d.kind === 'videoinput');
      return cameras.map((cam, index) => ({
        id: cam.deviceId || `camera-${index}`,
        name: cam.label || `Camera ${index + 1}`,
        facing: index === 0 ? 'back' : 'front',
      }));
    } catch {
      return [];
    }
  }
}

export const Camera = new CameraClass();
