
export interface PluginManifest {
  name: string;
  version: string;
  description?: string;
  author?: string;
  entryPoint: string;
  permissions?: string[];
  dependencies?: Record<string, string>;
}

export interface PluginContext {
  storage: {
    get: (key: string) => Promise<any>;
    set: (key: string, value: any) => Promise<void>;
  };
  network: {
    fetch: (url: string, options?: RequestInit) => Promise<Response>;
  };
  logger: {
    log: (...args: any[]) => void;
    warn: (...args: any[]) => void;
    error: (...args: any[]) => void;
  };
  config: Record<string, any>;
}

export interface Plugin {
  name: string;
  version: string;
  initialize: (context: PluginContext) => Promise<void>;
  shutdown?: () => Promise<void>;
  [key: string]: any;
}

export interface LoadedPlugin extends Plugin {
  _loaded: boolean;
  _context: PluginContext | null;
}
