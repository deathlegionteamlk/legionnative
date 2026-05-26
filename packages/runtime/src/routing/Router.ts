import React, { createContext, useContext, useMemo } from 'react';
import type { RouteConfig, NavigationOptions } from './types';

interface RouterContextValue {
  currentRoute: string | null;
  navigate: (name: string, params?: any) => void;
  goBack: () => void;
  replace: (name: string, params?: any) => void;
  setOptions: (options: NavigationOptions) => void;
}

const RouterContext = createContext<RouterContextValue | null>(null);

interface RouterProps {
  initialRoute?: string;
  routes: RouteConfig[];
  children: React.ReactNode;
}

export function Router({ initialRoute = 'home', routes, children }: RouterProps) {
  const [currentRoute, setCurrentRoute] = React.useState<string | null>(initialRoute);
  const [params, setParams] = React.useState<any>({});
  const [options, setOptionsState] = React.useState<NavigationOptions>({});

  const navigate = React.useCallback((name: string, newParams?: any) => {
    setCurrentRoute(name);
    if (newParams) setParams(newParams);
  }, []);

  const goBack = React.useCallback(() => {
    
    setCurrentRoute(initialRoute);
    setParams({});
  }, [initialRoute]);

  const replace = React.useCallback((name: string, newParams?: any) => {
    setCurrentRoute(name);
    if (newParams) setParams(newParams);
  }, []);

  const setOptions = React.useCallback((newOptions: NavigationOptions) => {
    setOptionsState(prev => ({ ...prev, ...newOptions }));
  }, []);

  const value = useMemo(() => ({
    currentRoute,
    navigate,
    goBack,
    replace,
    setOptions,
  }), [currentRoute, navigate, goBack, replace, setOptions]);

  const ActiveComponent = useMemo(() => {
    const route = routes.find(r => r.name === currentRoute);
    return route?.component || null;
  }, [routes, currentRoute]);

  return (
    <RouterContext.Provider value={value}>
      {ActiveComponent ? React.createElement(ActiveComponent, { ...params, navigation: value }) : null}
      {children}
    </RouterContext.Provider>
  );
}

export function useRouter(): RouterContextValue {
  const context = useContext(RouterContext);
  if (!context) {
    throw new Error('useRouter must be used within Router');
  }
  return context;
}
