import { useState as reactUseState } from 'react';

export function useState<S>(initialState: S | (() => S)): [S, (update: S | ((prev: S) => S)) => void] {
  return reactUseState(initialState);
}
