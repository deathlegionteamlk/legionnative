import { useState, useEffect } from 'react';

type ColorScheme = 'light' | 'dark';

export function useColorScheme(): ColorScheme {
  const [colorScheme, setColorScheme] = useState<ColorScheme>('light');

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    
    const updateScheme = () => {
      setColorScheme(mediaQuery.matches ? 'dark' : 'light');
    };

    updateScheme();
    mediaQuery.addEventListener('change', updateScheme);

    return () => mediaQuery.removeEventListener('change', updateScheme);
  }, []);

  return colorScheme;
}
