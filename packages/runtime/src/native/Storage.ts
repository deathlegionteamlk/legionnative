
import type { StorageOptions } from './types';

class StorageClass {
  private prefix = '@legion:';

  async setItem(key: string, value: string, options?: StorageOptions): Promise<void> {
    const fullKey = this.prefix + key;
    
    if (options?.encrypted) {
      
      console.warn('Encryption not implemented in web version');
    }
    
    try {
      window.localStorage.setItem(fullKey, value);
    } catch (error) {
      throw new Error(`Failed to store ${key}: ${error}`);
    }
  }

  async getItem(key: string, options?: StorageOptions): Promise<string | null> {
    const fullKey = this.prefix + key;
    
    try {
      return window.localStorage.getItem(fullKey);
    } catch (error) {
      throw new Error(`Failed to retrieve ${key}: ${error}`);
    }
  }

  async removeItem(key: string): Promise<void> {
    const fullKey = this.prefix + key;
    window.localStorage.removeItem(fullKey);
  }

  async clear(): Promise<void> {
    
    const keys = Object.keys(window.localStorage).filter(k => k.startsWith(this.prefix));
    keys.forEach(key => window.localStorage.removeItem(key));
  }

  async getAllKeys(): Promise<string[]> {
    const keys = Object.keys(window.localStorage)
      .filter(k => k.startsWith(this.prefix))
      .map(k => k.replace(this.prefix, ''));
    return keys;
  }

  async multiGet(keys: string[]): Promise<[string, string | null][]> {
    const results: [string, string | null][] = [];
    for (const key of keys) {
      const value = await this.getItem(key);
      results.push([key, value]);
    }
    return results;
  }

  async multiSet(keyValuePairs: [string, string][]): Promise<void> {
    for (const [key, value] of keyValuePairs) {
      await this.setItem(key, value);
    }
  }

  async mergeItem(key: string, updates: Record<string, any>): Promise<void> {
    const existing = await this.getItem(key);
    const merged = existing 
      ? { ...JSON.parse(existing), ...updates }
      : updates;
    await this.setItem(key, JSON.stringify(merged));
  }
}

export const Storage = new StorageClass();
