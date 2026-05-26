import React from 'react';
import { ScrollViewProps } from './types';

export const ScrollView = React.memo(function ScrollView({
  style,
  children,
  horizontal = false,
  showsHorizontalScrollIndicator = true,
  showsVerticalScrollIndicator = true,
  contentContainerStyle,
  ...props
}: ScrollViewProps) {
  const convertedStyle = React.useMemo(() => convertStyle(style), [style]);

  return (
    <div
      style={{
        overflow: 'auto',
        flexDirection: horizontal ? 'row' : 'column',
        WebkitOverflowScrolling: 'touch',
        ...convertedStyle,
      }}
      {...(props as any)}
    >
      <div style={contentContainerStyle as React.CSSProperties}>
        {children}
      </div>
    </div>
  );
});

function convertStyle(style: any): React.CSSProperties {
  if (!style) return {};
  if (Array.isArray(style)) {
    return style.reduce((acc, s) => ({ ...acc, ...convertStyle(s) }), {});
  }
  const css: React.CSSProperties = {};
  if (style.flex !== undefined) css.flex = style.flex.toString();
  if (style.width !== undefined) css.width = normalizeValue(style.width);
  if (style.height !== undefined) css.height = normalizeValue(style.height);
  return css;
}

function normalizeValue(value: any): string {
  return typeof value === 'number' ? `${value}px` : value;
}

ScrollView.displayName = 'ScrollView';
