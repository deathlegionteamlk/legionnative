
import React from 'react';
import { ButtonProps } from './types';

interface PressState {
  pressed: boolean;
  hovered: boolean;
}

export const Button = React.memo(function Button({
  title,
  style,
  className,
  disabled = false,
  color = '#007AFF',
  onPress,
  onLongPress,
  accessibilityLabel,
  testID,
  ...props
}: ButtonProps) {
  const [pressState, setPressState] = React.useState<PressState>({
    pressed: false,
    hovered: false,
  });

  const handlePressIn = React.useCallback(() => {
    setPressState(prev => ({ ...prev, pressed: true }));
  }, []);

  const handlePressOut = React.useCallback(() => {
    setPressState(prev => ({ ...prev, pressed: false }));
  }, []);

  const handleMouseEnter = React.useCallback(() => {
    setPressState(prev => ({ ...prev, hovered: true }));
  }, []);

  const handleMouseLeave = React.useCallback(() => {
    setPressState(prev => ({ ...prev, hovered: false }));
  }, []);

  const handleClick = React.useCallback(() => {
    if (!disabled && onPress) {
      onPress();
    }
  }, [disabled, onPress]);

  const handleContextMenu = React.useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    if (!disabled && onLongPress) {
      onLongPress();
    }
  }, [disabled, onLongPress]);

  
  const buttonStyle = React.useMemo(() => {
    const baseStyle: React.CSSProperties = {
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      paddingHorizontal: 16,
      paddingVertical: 12,
      backgroundColor: disabled ? '#cccccc' : color,
      borderRadius: 8,
      borderWidth: 0,
      cursor: disabled ? 'not-allowed' : 'pointer',
      opacity: disabled ? 0.5 : 1,
      transform: pressState.pressed ? 'scale(0.98)' : 'scale(1)',
      transition: 'all 0.15s ease-out',
      boxShadow: pressState.hovered && !disabled
        ? `0 4px 12px ${color}40`
        : 'none',
      ...(style as any),
    };
    return baseStyle;
  }, [color, disabled, pressState, style]);

  const textStyle: React.CSSProperties = {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
  };

  return (
    <button
      style={buttonStyle}
      className={className}
      data-testid={testID}
      disabled={disabled}
      aria-label={accessibilityLabel || title}
      aria-disabled={disabled}
      onClick={handleClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onMouseDown={handlePressIn}
      onMouseUp={handlePressOut}
      onMouseLeave={handlePressOut}
      onContextMenu={handleContextMenu}
      onTouchStart={handlePressIn}
      onTouchEnd={handlePressOut}
      {...(props as any)}
    >
      <span style={textStyle}>{title}</span>
    </button>
  );
});

Button.displayName = 'Button';
