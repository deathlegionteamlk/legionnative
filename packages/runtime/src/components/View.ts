
import React from 'react';
import { ViewProps } from './types';


const defaultStyle: React.CSSProperties = {
  display: 'flex',
  boxSizing: 'border-box',
};

export const View = React.memo(function View({
  style,
  className,
  children,
  testID,
  accessible,
  accessibilityLabel,
  accessibilityRole,
  onPress,
  onLongPress,
  hitSlop,
  collapsable,
  pointerEvents,
  ...props
}: ViewProps) {
  
  const convertedStyle = React.useMemo(() => convertStyle(style), [style]);

  
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
    <div
      style={{ ...defaultStyle, ...convertedStyle }}
      className={className}
      data-testid={testID}
      role={accessibilityRole || 'region'}
      aria-label={accessibilityLabel}
      aria-hidden={accessible === false}
      onClick={handleClick}
      onContextMenu={handleContextMenu}
      {...(props as any)}
    >
      {children}
    </div>
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

  
  if (style.display) css.display = style.display;
  if (style.flex !== undefined) css.flex = typeof style.flex === 'number' ? style.flex.toString() : style.flex;
  if (style.flexDirection) css.flexDirection = style.flexDirection;
  if (style.flexWrap) css.flexWrap = style.flexWrap;
  if (style.justifyContent) {
    css.justifyContent = style.justifyContent;
  }
  if (style.alignItems) css.alignItems = style.alignItems;
  if (style.alignContent) css.alignContent = style.alignContent;
  if (style.position) css.position = style.position;
  
  
  if (style.top !== undefined) css.top = normalizeValue(style.top);
  if (style.right !== undefined) css.right = normalizeValue(style.right);
  if (style.bottom !== undefined) css.bottom = normalizeValue(style.bottom);
  if (style.left !== undefined) css.left = normalizeValue(style.left);
  
  
  if (style.width !== undefined) css.width = normalizeValue(style.width);
  if (style.height !== undefined) css.height = normalizeValue(style.height);
  if (style.minWidth !== undefined) css.minWidth = normalizeValue(style.minWidth);
  if (style.minHeight !== undefined) css.minHeight = normalizeValue(style.minHeight);
  if (style.maxWidth !== undefined) css.maxWidth = normalizeValue(style.maxWidth);
  if (style.maxHeight !== undefined) css.maxHeight = normalizeValue(style.maxHeight);
  
  
  if (style.margin !== undefined) css.margin = normalizeValue(style.margin);
  if (style.marginTop !== undefined) css.marginTop = normalizeValue(style.marginTop);
  if (style.marginRight !== undefined) css.marginRight = normalizeValue(style.marginRight);
  if (style.marginBottom !== undefined) css.marginBottom = normalizeValue(style.marginBottom);
  if (style.marginLeft !== undefined) css.marginLeft = normalizeValue(style.marginLeft);
  if (style.padding !== undefined) css.padding = normalizeValue(style.padding);
  if (style.paddingTop !== undefined) css.paddingTop = normalizeValue(style.paddingTop);
  if (style.paddingRight !== undefined) css.paddingRight = normalizeValue(style.paddingRight);
  if (style.paddingBottom !== undefined) css.paddingBottom = normalizeValue(style.paddingBottom);
  if (style.paddingLeft !== undefined) css.paddingLeft = normalizeValue(style.paddingLeft);
  
  
  if (style.borderWidth !== undefined) css.borderWidth = `${style.borderWidth}px`;
  if (style.borderColor) css.borderColor = style.borderColor;
  if (style.borderRadius !== undefined) css.borderRadius = normalizeValue(style.borderRadius);
  if (style.borderStyle) css.borderStyle = style.borderStyle;
  
  
  if (style.backgroundColor) css.backgroundColor = style.backgroundColor;
  if (style.backgroundImage) css.backgroundImage = style.backgroundImage;
  if (style.opacity !== undefined) css.opacity = style.opacity;
  
  
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
  
  
  if (style.shadowColor) {
    css.boxShadow = `0 2px 4px ${style.shadowColor}`;
  }
  if (style.zIndex !== undefined) css.zIndex = style.zIndex;
  if (style.overflow) css.overflow = style.overflow;
  
  
  if (style.transform) {
    const transformValue = style.transform
      .map((t: any) => {
        if (t.rotate) return `rotate(${t.rotate})`;
        if (t.scale) return `scale(${t.scale})`;
        if (t.translateX) return `translateX(${normalizeValue(t.translateX)})`;
        if (t.translateY) return `translateY(${normalizeValue(t.translateY)})`;
        return '';
      })
      .filter(Boolean)
      .join(' ');
    
    if (transformValue) {
      css.transform = transformValue;
    }
  }

  return css;
}

function normalizeValue(value: any, defaultUnit: string = ''): string {
  if (typeof value === 'number') {
    return `${value}${defaultUnit || 'px'}`;
  }
  return value;
}


View.displayName = 'View';
