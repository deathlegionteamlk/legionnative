import { useState, useEffect } from 'react';

interface KeyboardInfo {
  isVisible: boolean;
  height: number;
}

export function useKeyboard(): KeyboardInfo {
  const [keyboard, setKeyboard] = useState<KeyboardInfo>({
    isVisible: false,
    height: 0,
  });

  useEffect(() => {
    
    const handleFocusIn = () => {
      setKeyboard({ isVisible: true, height: 250 });
    };

    const handleFocusOut = () => {
      setKeyboard({ isVisible: false, height: 0 });
    };

    window.addEventListener('focusin', handleFocusIn);
    window.addEventListener('focusout', handleFocusOut);

    return () => {
      window.removeEventListener('focusin', handleFocusIn);
      window.removeEventListener('focusout', handleFocusOut);
    };
  }, []);

  return keyboard;
}
