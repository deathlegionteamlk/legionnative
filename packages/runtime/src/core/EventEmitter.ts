
type EventCallback<T = any> = (data: T) => void;
type UnsubscribeFn = () => void;

export class EventEmitter {
  private events: Map<string, Set<EventCallback>>;
  private maxListeners: number;

  constructor(maxListeners: number = 100) {
    this.events = new Map();
    this.maxListeners = maxListeners;
  }

  on<T>(event: string, callback: EventCallback<T>): UnsubscribeFn {
    if (!this.events.has(event)) {
      this.events.set(event, new Set());
    }

    const listeners = this.events.get(event)!;
    
    
    if (listeners.size >= this.maxListeners) {
      console.warn(`EventEmitter: Max listeners (${this.maxListeners}) reached for event "${event}"`);
    }

    listeners.add(callback as EventCallback);

    
    return () => {
      listeners.delete(callback as EventCallback);
      if (listeners.size === 0) {
        this.events.delete(event);
      }
    };
  }

  once<T>(event: string, callback: EventCallback<T>): UnsubscribeFn {
    const wrappedCallback: EventCallback<T> = (data) => {
      unsubscribe();
      callback(data);
    };

    const unsubscribe = this.on(event, wrappedCallback);
    return unsubscribe;
  }

  emit<T>(event: string, data?: T): void {
    const listeners = this.events.get(event);
    
    if (!listeners || listeners.size === 0) {
      return;
    }

    
    queueMicrotask(() => {
      for (const listener of listeners) {
        try {
          listener(data);
        } catch (error) {
          console.error(`EventEmitter: Error in listener for event "${event}":`, error);
        }
      }
    });
  }

  off(event: string): void {
    this.events.delete(event);
  }

  removeAllListeners(): void {
    this.events.clear();
  }

  listenerCount(event: string): number {
    return this.events.get(event)?.size ?? 0;
  }

  eventNames(): string[] {
    return Array.from(this.events.keys());
  }

  hasListeners(event: string): boolean {
    const listeners = this.events.get(event);
    return listeners !== undefined && listeners.size > 0;
  }
}


export const globalEmitter = new EventEmitter();
