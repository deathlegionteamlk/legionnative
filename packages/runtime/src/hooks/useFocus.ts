import { useState, useEffect } from 'react';

export function useFocus(): boolean {
  const [isFocused, setIsFocused] = useState(true);

  useEffect(() => {
    
    const handleFocus = () => setIsFocused(true);
    const handleBlur = () => setIsFocused(false);

    
    document.addEventListener('visibilitychange', () => {
      if (document.hidden) {
        handleBlur();
      } else {
        handleFocus();
      }
    });

    return () => {
      document.removeEventListener('visibilitychange', () => {});
    };
  }, []);

  return isFocused;
}
