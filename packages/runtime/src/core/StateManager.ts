
import { EventEmitter } from './EventEmitter';

type Listener<T> = (state: T) => void;
type UnsubscribeFn = () => void;

interface StateManagerOptions {
  name?: string;
  persist?: boolean;
  storageKey?: string;
  debug?: boolean;
}

export class StateManager<T extends Record<string, any>> {
  private state: T;
  private listeners: Set<Listener<T>>;
  private emitter: EventEmitter;
  private options: StateManagerOptions;
  private batchQueue: Partial<T> | null = null;
  private isBatching: boolean = false;
  private version: number = 0;

  constructor(initialState: T, options: StateManagerOptions = {}) {
    this.state = initialState;
    this.listeners = new Set();
    this.emitter = new EventEmitter();
    this.options = {
      name: 'default',
      persist: false,
      debug: false,
      ...options,
    };

    
    if (this.options.persist && typeof window !== 'undefined') {
      this.loadPersistedState();
    }
  }

  getState(): T {
    return this.state;
  }

  get<K extends keyof T>(key: K): T[K] {
    return this.state[key];
  }

  subscribe(listener: Listener<T>): UnsubscribeFn {
    this.listeners.add(listener);
    
    
    listener(this.state);

    return () => {
      this.listeners.delete(listener);
    };
  }

  setState(updates: Partial<T> | ((prev: T) => Partial<T>)): void {
    const newState = typeof updates === 'function' 
      ? updates(this.state)
      : updates;

    if (this.isBatching) {
      
      if (!this.batchQueue) {
        this.batchQueue = {};
      }
      Object.assign(this.batchQueue, newState);
      return;
    }

    this.applyUpdate(newState);
  }

  batch(updates: Partial<T> | ((prev: T) => Partial<T>)): void {
    if (this.isBatching) {
      
      const newState = typeof updates === 'function' 
        ? updates(this.state)
        : updates;
      if (!this.batchQueue) {
        this.batchQueue = {};
      }
      Object.assign(this.batchQueue, newState);
      return;
    }

    this.isBatching = true;
    
    try {
      const newState = typeof updates === 'function' 
        ? updates(this.state)
        : updates;
      
      if (!this.batchQueue) {
        this.batchQueue = {};
      }
      Object.assign(this.batchQueue, newState);
      
      
      queueMicrotask(() => this.flushBatch());
    } catch (error) {
      this.isBatching = false;
      this.batchQueue = null;
      throw error;
    }
  }

  private flushBatch(): void {
    if (this.batchQueue && Object.keys(this.batchQueue).length > 0) {
      this.applyUpdate(this.batchQueue);
    }
    this.batchQueue = null;
    this.isBatching = false;
  }

  private applyUpdate(updates: Partial<T>): void {
    const prevState = this.state;
    this.state = { ...this.state, ...updates };
    this.version++;

    if (this.options.debug) {
      console.log(`[StateManager:${this.options.name}] Update v${this.version}`, {
        prev: prevState,
        next: this.state,
        updates,
      });
    }

    
    if (this.options.persist) {
      this.persistState();
    }

    
    this.notifyListeners();
  }

  private notifyListeners(): void {
    
    queueMicrotask(() => {
      for (const listener of this.listeners) {
        try {
          listener(this.state);
        } catch (error) {
          console.error(`[StateManager] Error in listener:`, error);
        }
      }
      
      
      this.emitter.emit('change', this.state);
    });
  }

  reset(initialState: T): void {
    this.state = initialState;
    this.version++;
    this.notifyListeners();
  }

  select<K extends keyof T>(key: K): T[K] {
    return this.state[key];
  }

  watch<K extends keyof T>(key: K, listener: (value: T[K]) => void): UnsubscribeFn {
    let lastValue = this.state[key];

    const wrappedListener = (newState: T) => {
      const newValue = newState[key];
      if (newValue !== lastValue) {
        lastValue = newValue;
        listener(newValue);
      }
    };

    return this.subscribe(wrappedListener);
  }

  private persistState(): void {
    if (typeof window === 'undefined' || !this.options.storageKey) {
      return;
    }

    try {
      const serialized = JSON.stringify(this.state);
      window.localStorage.setItem(this.options.storageKey, serialized);
    } catch (error) {
      console.warn(`[StateManager] Failed to persist state:`, error);
    }
  }

  private loadPersistedState(): void {
    if (typeof window === 'undefined' || !this.options.storageKey) {
      return;
    }

    try {
      const serialized = window.localStorage.getItem(this.options.storageKey);
      if (serialized) {
        const persisted = JSON.parse(serialized);
        this.state = { ...this.state, ...persisted };
      }
    } catch (error) {
      console.warn(`[StateManager] Failed to load persisted state:`, error);
    }
  }

  getVersion(): number {
    return this.version;
  }

  clearListeners(): void {
    this.listeners.clear();
  }
}

export function createState<T extends Record<string, any>>(
  initialState: T,
  options?: StateManagerOptions
): StateManager<T> {
  return new StateManager(initialState, options);
}


const globalStates = new Map<string, StateManager<any>>();

export function registerGlobalState(name: string, state: StateManager<any>): void {
  globalStates.set(name, state);
}

export function getGlobalState(name: string): StateManager<any> | undefined {
  return globalStates.get(name);
}
