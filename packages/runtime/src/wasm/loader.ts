
import type { Plugin } from './types';

export async function loadPlugin(wasmUrl: string): Promise<Plugin> {
  try {
    
    if (typeof WebAssembly === 'undefined') {
      throw new Error('WebAssembly is not supported in this environment');
    }

    
    const response = await fetch(wasmUrl);
    if (!response.ok) {
      throw new Error(`Failed to fetch WASM module: ${response.status}`);
    }

    const wasmBytes = await response.arrayBuffer();
    
    
    const { instance } = await WebAssembly.instantiate(wasmBytes, {
      env: {
        
        memory: new WebAssembly.Memory({ initial: 256 }),
        table: new WebAssembly.Table({ initial: 0, element: 'anyfunc' }),
        
        
        log: (ptr: number, len: number) => {
          const bytes = new Uint8Array((instance.exports.memory as WebAssembly.Memory).buffer, ptr, len);
          const text = new TextDecoder().decode(bytes);
          console.log('[WASM Plugin]', text);
        },
        
        
        storage_get: () => 0,
        storage_set: () => 0,
        
        
        fetch_get: () => 0,
      },
    });

    
    const plugin = {
      name: (instance.exports.plugin_name as any) ? 
        readString(instance, (instance.exports.plugin_name as any)()) : 'unknown',
      version: (instance.exports.plugin_version as any) ?
        readString(instance, (instance.exports.plugin_version as any)()) : '1.0.0',
      
      async initialize(context: any): Promise<void> {
        if (typeof instance.exports.plugin_init === 'function') {
          (instance.exports.plugin_init as any)();
        }
      },
      
      
      ...(instance.exports as Record<string, any>),
    };

    return plugin as Plugin;
  } catch (error) {
    console.error('Failed to load WASM plugin:', error);
    throw error;
  }
}

function readString(instance: WebAssembly.Instance, ptr: number): string {
  const memory = instance.exports.memory as WebAssembly.Memory;
  const bytes = new Uint8Array(memory.buffer);
  
  
  let end = ptr;
  while (bytes[end] !== 0) {
    end++;
  }
  
  return new TextDecoder().decode(bytes.slice(ptr, end));
}
