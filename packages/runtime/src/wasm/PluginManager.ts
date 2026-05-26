
import type { Plugin, PluginContext, LoadedPlugin, PluginManifest } from './types';

export class PluginManager {
  private plugins: Map<string, LoadedPlugin> = new Map();
  private context: PluginContext;

  constructor() {
    this.context = this.createContext();
  }

  private createContext(): PluginContext {
    return {
      storage: {
        get: async (key: string) => {
          try {
            const value = localStorage.getItem(`@plugin:${key}`);
            return value ? JSON.parse(value) : null;
          } catch {
            return null;
          }
        },
        set: async (key: string, value: any) => {
          localStorage.setItem(`@plugin:${key}`, JSON.stringify(value));
        },
      },
      network: {
        fetch: (url: string, options?: RequestInit) => fetch(url, options),
      },
      logger: {
        log: (...args: any[]) => console.log('[Plugin]', ...args),
        warn: (...args: any[]) => console.warn('[Plugin]', ...args),
        error: (...args: any[]) => console.error('[Plugin]', ...args),
      },
      config: {},
    };
  }

  async loadPlugins(pluginPaths: string[]): Promise<void> {
    for (const path of pluginPaths) {
      try {
        await this.loadPlugin(path);
      } catch (error) {
        console.error(`Failed to load plugin ${path}:`, error);
      }
    }
  }

  async loadPlugin(path: string): Promise<LoadedPlugin> {
    
    if (this.plugins.has(path)) {
      return this.plugins.get(path)!;
    }

    try {
      
      
      const module = await import(/* @vite-ignore */ path);
      const plugin = module.default || module;

      const loadedPlugin: LoadedPlugin = {
        ...plugin,
        _loaded: false,
        _context: null,
      };

      
      if (typeof loadedPlugin.initialize === 'function') {
        await loadedPlugin.initialize(this.context);
      }

      loadedPlugin._loaded = true;
      loadedPlugin._context = this.context;

      this.plugins.set(path, loadedPlugin);
      console.log(`[PluginManager] Loaded plugin: ${plugin.name || path}`);

      return loadedPlugin;
    } catch (error) {
      console.error(`[PluginManager] Failed to load plugin ${path}:`, error);
      throw error;
    }
  }

  getPlugin(nameOrPath: string): LoadedPlugin | undefined {
    
    if (this.plugins.has(nameOrPath)) {
      return this.plugins.get(nameOrPath);
    }

    
    for (const [path, plugin] of this.plugins.entries()) {
      if (plugin.name === nameOrPath) {
        return plugin;
      }
    }

    return undefined;
  }

  getPlugins(): LoadedPlugin[] {
    return Array.from(this.plugins.values());
  }

  async unloadPlugin(nameOrPath: string): Promise<void> {
    const plugin = this.getPlugin(nameOrPath);
    if (!plugin) {
      throw new Error(`Plugin not found: ${nameOrPath}`);
    }

    if (typeof plugin.shutdown === 'function') {
      await plugin.shutdown();
    }

    this.plugins.delete(nameOrPath);
    console.log(`[PluginManager] Unloaded plugin: ${plugin.name || nameOrPath}`);
  }

  async unloadAll(): Promise<void> {
    for (const [path, plugin] of this.plugins.entries()) {
      try {
        await this.unloadPlugin(path);
      } catch (error) {
        console.error(`Failed to unload plugin ${path}:`, error);
      }
    }
  }

  hasPlugin(nameOrPath: string): boolean {
    return this.getPlugin(nameOrPath) !== undefined;
  }

  registerPlugin(name: string, plugin: Plugin): void {
    const loadedPlugin: LoadedPlugin = {
      ...plugin,
      _loaded: true,
      _context: this.context,
    };
    this.plugins.set(name, loadedPlugin);
  }
}
