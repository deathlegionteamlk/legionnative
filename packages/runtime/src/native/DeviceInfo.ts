
interface DeviceInfoType {
  brand: string;
  model: string;
  systemName: string;
  systemVersion: string;
  version: string;
  buildNumber: string;
  deviceType: 'phone' | 'tablet' | 'desktop';
  isEmulator: boolean;
  maxMemory: number;
  usedMemory: number;
  freeDiskStorage: number;
  totalDiskCapacity: number;
  batteryLevel: number;
  batteryState: 'unknown' | 'unplugged' | 'charging' | 'full';
  isAirplaneMode: boolean;
  isLocationEnabled: boolean;
  isWiFiEnabled: boolean;
  screen: {
    width: number;
    height: number;
    scale: number;
    fontScale: number;
  };
}

class DeviceInfoClass {
  private info: Partial<DeviceInfoType> | null = null;

  async getInfo(): Promise<DeviceInfoType> {
    if (this.info) {
      return this.info as DeviceInfoType;
    }

    const screen = {
      width: window.innerWidth,
      height: window.innerHeight,
      scale: window.devicePixelRatio || 1,
      fontScale: 1,
    };

    this.info = {
      brand: 'Web',
      model: navigator.platform,
      systemName: navigator.platform,
      systemVersion: navigator.userAgent,
      version: '1.0.0',
      buildNumber: '1',
      deviceType: this.getDeviceType(),
      isEmulator: false,
      maxMemory: 512,
      usedMemory: 0,
      freeDiskStorage: 0,
      totalDiskCapacity: 0,
      batteryLevel: -1,
      batteryState: 'unknown' as const,
      isAirplaneMode: false,
      isLocationEnabled: true,
      isWiFiEnabled: navigator.onLine,
      screen,
    };

    return this.info as DeviceInfoType;
  }

  private getDeviceType(): 'phone' | 'tablet' | 'desktop' {
    const width = window.innerWidth;
    if (width < 768) return 'phone';
    if (width < 1024) return 'tablet';
    return 'desktop';
  }

  async getUniqueId(): Promise<string> {
    
    let id = localStorage.getItem('@legion_device_id');
    if (!id) {
      id = `web_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
      localStorage.setItem('@legion_device_id', id);
    }
    return id;
  }

  async getIpAddress(): Promise<string> {
    
    return '0.0.0.0';
  }

  async getMacAddress(): Promise<string> {
    
    return '00:00:00:00:00:00';
  }

  async getCarrier(): Promise<string> {
    return 'Unknown';
  }

  async getPhoneNumber(): Promise<string> {
    
    return '';
  }

  async getCountry(): Promise<string> {
    return Intl.DateTimeFormat().resolvedOptions().locale.split('-')[1] || 'US';
  }

  async getLocale(): Promise<string> {
    return navigator.language;
  }

  async getFontSize(): Promise<number> {
    return 14;
  }

  async getFreeDiskStorage(): Promise<number> {
    
    if ('storage' in navigator && 'estimate' in navigator.storage) {
      const estimate = await (navigator.storage as any).estimate();
      return estimate.quota - estimate.usage;
    }
    return 0;
  }

  async getTotalDiskCapacity(): Promise<number> {
    if ('storage' in navigator && 'estimate' in navigator.storage) {
      const estimate = await (navigator.storage as any).estimate();
      return estimate.quota;
    }
    return 0;
  }
}

export const DeviceInfo = new DeviceInfoClass();
