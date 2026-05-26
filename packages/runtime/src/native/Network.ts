
import type { NetworkStatus } from './types';

class NetworkClass {
  private listeners: Set<(status: NetworkStatus) => void> = new Set();

  constructor() {
    this.setupListeners();
  }

  private setupListeners(): void {
    if (typeof window === 'undefined') return;

    window.addEventListener('online', () => this.emitStatus());
    window.addEventListener('offline', () => this.emitStatus());
  }

  private getConnectionType(): 'wifi' | 'cellular' | 'none' | 'unknown' {
    if (!navigator.onLine) return 'none';
    
    const connection = (navigator as any).connection;
    if (connection) {
      if (connection.effectiveType === 'wifi') return 'wifi';
      if (['2g', '3g', '4g'].includes(connection.effectiveType)) return 'cellular';
    }
    
    return 'unknown';
  }

  private emitStatus(): void {
    const status = this.getStatus();
    this.listeners.forEach(listener => listener(status));
  }

  getStatus(): NetworkStatus {
    return {
      isConnected: navigator.onLine,
      type: this.getConnectionType(),
    };
  }

  addListener(callback: (status: NetworkStatus) => void): () => void {
    this.listeners.add(callback);
    
    callback(this.getStatus());
    
    return () => {
      this.listeners.delete(callback);
    };
  }

  async fetch(url: string, options?: RequestInit): Promise<Response> {
    return fetch(url, options);
  }

  async get<T>(url: string, options?: RequestInit): Promise<T> {
    const response = await this.fetch(url, options);
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    return response.json();
  }

  async post<T>(url: string, data: any, options?: RequestInit): Promise<T> {
    const response = await this.fetch(url, {
      ...options,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...options?.headers,
      },
      body: JSON.stringify(data),
    });
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    return response.json();
  }
}

export const Network = new NetworkClass();
