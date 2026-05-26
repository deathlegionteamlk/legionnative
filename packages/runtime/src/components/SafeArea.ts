import React from 'react';
import { SafeAreaProps } from './types';
import { useSafeArea } from '../hooks/useSafeArea';

export const SafeArea = React.memo(function SafeArea({
  style,
  children,
  edges = ['top', 'bottom', 'left', 'right'],
  mode = 'padding',
  ...props
}: SafeAreaProps) {
  const insets = useSafeArea();

  const safeStyle = React.useMemo(() => {
    const baseStyle: React.CSSProperties = {
      ...(style as any),
    };

    if (mode === 'padding') {
      if (edges.includes('top')) baseStyle.paddingTop = (baseStyle.paddingTop || 0) + insets.top;
      if (edges.includes('bottom')) baseStyle.paddingBottom = (baseStyle.paddingBottom || 0) + insets.bottom;
      if (edges.includes('left')) baseStyle.paddingLeft = (baseStyle.paddingLeft || 0) + insets.left;
      if (edges.includes('right')) baseStyle.paddingRight = (baseStyle.paddingRight || 0) + insets.right;
    } else {
      if (edges.includes('top')) baseStyle.marginTop = (baseStyle.marginTop || 0) + insets.top;
      if (edges.includes('bottom')) baseStyle.marginBottom = (baseStyle.marginBottom || 0) + insets.bottom;
      if (edges.includes('left')) baseStyle.marginLeft = (baseStyle.marginLeft || 0) + insets.left;
      if (edges.includes('right')) baseStyle.marginRight = (baseStyle.marginRight || 0) + insets.right;
    }

    return baseStyle;
  }, [style, edges, mode, insets]);

  return (
    <div style={safeStyle} {...(props as any)}>
      {children}
    </div>
  );
});

SafeArea.displayName = 'SafeArea';
