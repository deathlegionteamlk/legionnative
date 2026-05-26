
import React from 'react';
import { TextProps } from './types';

const defaultStyle: React.CSSProperties = {
  display: 'inline',
  boxSizing: 'border-box',
};

export const Text = React.memo(function Text({
  style,
  className,
  children,
  testID,
  accessible,
  accessibilityLabel,
  numberOfLines,
  ellipsizeMode,
  selectable = true,
  onPress,
  onLongPress,
  ...props
}: TextProps) {
  const convertedStyle = React.useMemo(() => convertStyle(style), [style]);

  
  const lineClampStyle = numberOfLines ? {
    display: '-webkit-box',
    WebkitLineClamp: numberOfLines,
    WebkitBoxOrient: 'vertical' as const,
    overflow: 'hidden',
    textOverflow: ellipsizeMode === 'clip' ? 'clip' : 'ellipsis',
  } : {};

  const handleClick = React.useCallback(() => {
    if (onPress) {
      onPress();
    }
  }, [onPress]);

  const handleContextMenu = React.useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    if (onLongPress) {
      onLongPress();
    }
  }, [onLongPress]);

  return (
    <span
      style={{ 
        ...defaultStyle, 
        ...convertedStyle, 
        ...lineClampStyle,
        userSelect: selectable ? 'text' : 'none',
        cursor: onPress || onLongPress ? 'pointer' : 'default',
      }}
      className={className}
      data-testid={testID}
      role={accessibilityLabel ? 'text' : undefined}
      aria-label={accessibilityLabel}
      aria-hidden={accessible === false}
      onClick={handleClick}
      onContextMenu={handleContextMenu}
      {...(props as any)}
    >
      {children}
    </span>
  );
});

function convertStyle(style?: any): React.CSSProperties {
  if (!style) {
    return {};
  }

  if (Array.isArray(style)) {
    return style.reduce((acc, s) => ({ ...acc, ...convertStyle(s) }), {});
  }

  const css: React.CSSProperties = {};

  
  if (style.color) css.color = style.color;
  if (style.fontSize !== undefined) css.fontSize = normalizeValue(style.fontSize, 'px');
  if (style.fontWeight) css.fontWeight = style.fontWeight;
  if (style.fontStyle) css.fontStyle = style.fontStyle;
  if (style.fontFamily) css.fontFamily = style.fontFamily;
  if (style.textAlign) css.textAlign = style.textAlign;
  if (style.lineHeight !== undefined) css.lineHeight = normalizeValue(style.lineHeight);
  if (style.letterSpacing !== undefined) css.letterSpacing = normalizeValue(style.letterSpacing);
  if (style.textDecorationLine) {
    css.textDecoration = style.textDecorationLine;
  }
  if (style.textTransform) css.textTransform = style.textTransform;
  
  
  if (style.display) css.display = style.display;
  if (style.flex !== undefined) css.flex = style.flex.toString();
  if (style.margin !== undefined) css.margin = normalizeValue(style.margin);
  if (style.padding !== undefined) css.padding = normalizeValue(style.padding);
  if (style.opacity !== undefined) css.opacity = style.opacity;

  return css;
}

function normalizeValue(value: any, defaultUnit: string = ''): string {
  if (typeof value === 'number') {
    return `${value}${defaultUnit}`;
  }
  return value;
}

Text.displayName = 'Text';
