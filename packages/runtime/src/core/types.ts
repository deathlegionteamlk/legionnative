
export interface AppConfig {
  name: string;
  
  main: React.ComponentType<any>;
  
  debug?: boolean;
  
  plugins?: string[];
  
  navigation?: NavigationConfig;
  
  lifecycle: 'initializing' | 'ready' | 'active' | 'background' | 'suspended';
  
  isOnline: boolean;
  
  memoryUsage: number;
  
  ttfr: number;
  
  jsHeapSize: number;
  
