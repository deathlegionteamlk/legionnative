

export { LegionApp } from './core/LegionApp';
export { EventEmitter } from './core/EventEmitter';
export { StateManager } from './core/StateManager';
export type { AppConfig, AppState } from './core/types';


export { View } from './components/View';
export { Text } from './components/Text';
export { Image } from './components/Image';
export { ScrollView } from './components/ScrollView';
export { Button } from './components/Button';
export { TextInput } from './components/TextInput';
export { SafeArea } from './components/SafeArea';
export { Animated } from './components/Animated';
export type { ComponentProps, StyleProps } from './components/types';


export { Router } from './routing/Router';
export { useNavigation } from './routing/useNavigation';
export { useRoute } from './routing/useRoute';
export { Link } from './routing/Link';
export type { RouteConfig, NavigationOptions } from './routing/types';


export { Storage } from './native/Storage';
export { Network } from './native/Network';
export { Camera } from './native/Camera';
export { FileSystem } from './native/FileSystem';
export { Clipboard } from './native/Clipboard';
export { DeviceInfo } from './native/DeviceInfo';
export type { NativeModule } from './native/types';


export { PluginManager } from './wasm/PluginManager';
export { loadPlugin } from './wasm/loader';
export type { Plugin, PluginContext } from './wasm/types';


export { useState } from './hooks/useState';
export { useEffect } from './hooks/useEffect';
export { useContext } from './hooks/useContext';
export { useCallback } from './hooks/useCallback';
export { useMemo } from './hooks/useMemo';
export { useRef } from './hooks/useRef';
export { useReducer } from './hooks/useReducer';
export { useFocus } from './hooks/useFocus';
export { useKeyboard } from './hooks/useKeyboard';
export { useSafeArea } from './hooks/useSafeArea';
export { useColorScheme } from './hooks/useColorScheme';


export { createApp } from './core/createApp';
export { registerComponent } from './core/registry';
export { hotReload } from './core/hotReload';

import { LegionApp } from './core/LegionApp';
export default LegionApp;
