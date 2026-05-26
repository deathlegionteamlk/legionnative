import { useEffect as reactUseEffect } from 'react';

export function useEffect(effect: () => void | (() => void), deps?: any[]): void {
  reactUseEffect(effect, deps);
}
