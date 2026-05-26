import React, { useRef, useEffect, useCallback } from 'react';
import { AnimatedProps, AnimationConfig, SpringConfig } from './types';
import { View } from './View';

interface AnimatedValue {
  value: number;
  listeners: Set<(value: number) => void>;
}

export function createAnimatedValue(initialValue: number = 0): AnimatedValue {
  return {
    value: initialValue,
    listeners: new Set(),
  };
}

export const Animated = {
  Value: createAnimatedValue,

  timing(config: AnimationConfig) {
    return (value: AnimatedValue) => {
      return new Promise<void>((resolve) => {
        const start = performance.now();
        const fromValue = value.value;
        const toValue = typeof config.toValue === 'number' ? config.toValue : config.toValue.x || 0;
        const duration = config.duration || 300;

        const animate = () => {
          const now = performance.now();
          const progress = Math.min((now - start) / duration, 1);
          
          
          const eased = config.easing 
            ? config.easing(progress)
            : easeInOut(progress);

          value.value = fromValue + (toValue - fromValue) * eased;
          value.listeners.forEach(listener => listener(value.value));

          if (progress < 1) {
            requestAnimationFrame(animate);
          } else {
            resolve();
          }
        };

        requestAnimationFrame(animate);
      });
    };
  },

  spring(config: SpringConfig) {
    return (value: AnimatedValue) => {
      
      return Animated.timing({ ...config, duration: 500 })(value);
    };
  },
};

function easeInOut(t: number): number {
  return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
}


export const AnimatedView = React.memo(function AnimatedView({
  animatedStyle,
  ...props
}: AnimatedProps & { animatedStyle?: Record<string, AnimatedValue> }) {
  const [, forceUpdate] = React.useReducer(x => x + 1, 0);
  const refs = useRef<Map<string, () => void>>(new Map());

  useEffect(() => {
    if (!animatedStyle) return;

    
    Object.entries(animatedStyle).forEach(([key, animValue]) => {
      const unsubscribe = () => {
        animValue.listeners.delete(forceUpdate);
      };

      animValue.listeners.add(forceUpdate);
      refs.current.set(key, unsubscribe);
    });

    return () => {
      refs.current.forEach(unsub => unsub());
      refs.current.clear();
    };
  }, [animatedStyle]);

  const style = React.useMemo(() => {
    if (!animatedStyle) return props.style;

    const resolved: any = { ...(props.style as any) };
    Object.entries(animatedStyle).forEach(([key, animValue]) => {
      resolved[key] = animValue.value;
    });
    return resolved;
  }, [animatedStyle, props.style]);

  return React.createElement(View, { ...props, style });
});
