
import React from 'react';
import { AppConfig, AppState, PerformanceMetrics } from './types';
import { EventEmitter, globalEmitter } from './EventEmitter';
import { StateManager, createState } from './StateManager';
import { PluginManager } from '../wasm/PluginManager';

interface AppContext {
  config: AppConfig;
  state: AppState;
  emitter: EventEmitter;
  pluginManager: PluginManager;
}


let appContext: AppContext | null = null;

export function getAppContext(): AppContext {
  if (!appContext) {
    throw new Error('LegionApp not initialized. Call LegionApp.start() first.');
  }
  return appContext;
}

export class LegionApp {
  private config: AppConfig;
  private stateManager: StateManager<AppState>;
  private emitter: EventEmitter;
  private pluginManager: PluginManager;
  private isInitialized: boolean = false;
  private startTime: number = 0;
  private renderContainer: HTMLElement | null = null;

  constructor(config: AppConfig) {
    this.config = {
      debug: process.env.NODE_ENV === 'development',
      hotReload: process.env.NODE_ENV === 'development',
      ...config,
    };

    this.emitter = new EventEmitter();
    
    
    this.stateManager = createState<AppState>({
      lifecycle: 'initializing',
      currentRoute: config.initialRoute || null,
      isOnline: navigator.onLine,
      colorScheme: this.getColorScheme(),
      memoryUsage: 0,
      performance: {
        ttfr: 0,
        fps: 60,
        jsHeapSize: 0,
        renderTime: 0,
      },
    }, {
      name: 'app',
      debug: this.config.debug,
      persist: false,
    });

    this.pluginManager = new PluginManager();

    
    this.setupNetworkListeners();
    
    
    this.setupMemoryMonitoring();

    
    appContext = {
      config: this.config,
      state: this.stateManager.getState(),
      emitter: this.emitter,
      pluginManager: this.pluginManager,
    };
  }

  async start(container?: HTMLElement | string): Promise<void> {
    this.startTime = performance.now();

    try {
      
      if (this.config.plugins) {
        await this.pluginManager.loadPlugins(this.config.plugins);
      }

      
      if (container) {
        this.renderContainer = typeof container === 'string'
          ? document.querySelector(container)
          : container;
      }

      
      this.stateManager.setState({ lifecycle: 'ready' });

      
      this.emitter.emit('lifecycle', { type: 'mount', timestamp: Date.now() });

      
      await this.render();

      
      this.isInitialized = true;

      
      const ttfr = performance.now() - this.startTime;
      this.stateManager.setState({
        lifecycle: 'active',
        performance: {
          ...this.stateManager.get('performance'),
          ttfr,
        },
      });

      if (this.config.debug) {
        console.log(`[LegionApp] Initialized in ${ttfr.toFixed(2)}ms`);
      }

      
      this.emitter.emit('ready', { ttfr });
    } catch (error) {
      console.error('[LegionApp] Failed to start:', error);
      this.stateManager.setState({ lifecycle: 'suspended' });
      throw error;
    }
  }

  private async render(): Promise<void> {
    const MainComponent = this.config.main;
    
    
    if (!this.renderContainer) {
      this.renderContainer = document.getElementById('root') || document.createElement('div');
      if (!this.renderContainer.id) {
        this.renderContainer.id = 'root';
        document.body.appendChild(this.renderContainer);
      }
    }

    
    const AppWrapper = React.createElement(
      AppProvider,
      { app: this },
      React.createElement(MainComponent)
    );

    
    if (typeof ReactDOM !== 'undefined' && 'createRoot' in ReactDOM) {
      const root = ReactDOM.createRoot(this.renderContainer);
      root.render(AppWrapper);
    } else if (typeof ReactDOM !== 'undefined' && 'render' in ReactDOM) {
      
      ReactDOM.render(AppWrapper, this.renderContainer);
    } else {
      console.warn('[LegionApp] ReactDOM not found. Rendering skipped.');
    }
  }

  getState(): AppState {
    return this.stateManager.getState();
  }

  subscribe(listener: (state: AppState) => void): () => void {
    return this.stateManager.subscribe(listener);
  }

  getEmitter(): EventEmitter {
    return this.emitter;
  }

  getPluginManager(): PluginManager {
    return this.pluginManager;
  }

  getConfig(): AppConfig {
    return this.config;
  }

  isReady(): boolean {
    return this.isInitialized;
  }

  async reload(): Promise<void> {
    if (!this.isInitialized) {
      return;
    }

    this.emitter.emit('reload', { timestamp: Date.now() });
    
    
    await this.render();
  }

  unmount(): void {
    this.stateManager.setState({ lifecycle: 'suspended' });
    this.emitter.emit('lifecycle', { type: 'unmount', timestamp: Date.now() });
    this.emitter.removeAllListeners();
    this.stateManager.clearListeners();
    this.pluginManager.unloadAll();
    this.isInitialized = false;
  }

  private getColorScheme(): 'light' | 'dark' {
    if (typeof window === 'undefined') {
      return 'light';
    }

    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      return 'dark';
    }

    return 'light';
  }

  private setupNetworkListeners(): void {
    if (typeof window === 'undefined') {
      return;
    }

    window.addEventListener('online', () => {
      this.stateManager.setState({ isOnline: true });
      this.emitter.emit('network', { isOnline: true });
    });

    window.addEventListener('offline', () => {
      this.stateManager.setState({ isOnline: false });
      this.emitter.emit('network', { isOnline: false });
    });
  }

  private setupMemoryMonitoring(): void {
    if (typeof window === 'undefined' || !('performance' in window)) {
      return;
    }

    
    setInterval(() => {
      const memory = (performance as any).memory;
      if (memory) {
        const jsHeapSize = Math.round(memory.usedJSHeapSize / 1048576); 
        this.stateManager.batch({
          memoryUsage: jsHeapSize,
          performance: {
            ...this.stateManager.get('performance'),
            jsHeapSize,
          },
        });
      }
    }, 5000); 
  }

  static async start(config: AppConfig, container?: HTMLElement | string): Promise<LegionApp> {
    const app = new LegionApp(config);
    await app.start(container);
    return app;
  }

  static onHotUpdate(callback: () => void): void {
    if (appContext) {
      appContext.emitter.on('hot-update', callback);
    }
  }
}

const AppContext = React.createContext<AppContext | null>(null);

interface AppProviderProps {
  app: LegionApp;
  children: React.ReactNode;
}

function AppProvider({ app, children }: AppProviderProps) {
  const [state, setState] = React.useState(app.getState());

  React.useEffect(() => {
    const unsubscribe = app.subscribe(setState);
    return unsubscribe;
  }, [app]);

  const context = React.useMemo<AppContext>(() => ({
    config: app.getConfig(),
    state,
    emitter: app.getEmitter(),
    pluginManager: app.getPluginManager(),
  }), [app, state]);

  return React.createElement(AppContext.Provider, { value: context }, children);
}

export function useAppContext(): AppContext {
  const context = React.useContext(AppContext);
  if (!context) {
    throw new Error('useAppContext must be used within AppProvider');
  }
  return context;
}

export function useAppState(): AppState {
  const context = useAppContext();
  return context.state;
}
