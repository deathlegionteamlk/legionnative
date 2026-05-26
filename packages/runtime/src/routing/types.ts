
export interface RouteConfig {
  path: string;
  component: React.ComponentType<any>;
  name: string;
  params?: Record<string, any>;
  options?: NavigationOptions;
}

export interface NavigationOptions {
  title?: string;
  headerShown?: boolean;
  animation?: 'fade' | 'slide' | 'scale' | 'none';
  gestureEnabled?: boolean;
}

export interface RouteParams {
  [key: string]: any;
}

export interface NavigationState {
  routes: RouteRecord[];
  index: number;
}

export interface RouteRecord {
  key: string;
  name: string;
  params?: RouteParams;
}
