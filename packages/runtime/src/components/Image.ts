
import React from 'react';
import { ImageProps } from './types';

interface LocalImageState {
  loaded: boolean;
  error: boolean;
  width: number | null;
  height: number | null;
}

export const Image = React.memo(function Image({
  source,
  style,
  className,
  alt = '',
  resizeMode = 'cover',
  onLoad,
  onError,
  onProgress,
  blurRadius = 0,
  fadeDuration = 300,
  testID,
  accessible,
  accessibilityLabel,
  ...props
}: ImageProps) {
  const [state, setState] = React.useState<LocalImageState>({
    loaded: false,
    error: false,
    width: null,
    height: null,
  });

  
  const uri = React.useMemo(() => {
    if (typeof source === 'string') {
      return source;
    }
    if (typeof source === 'number') {
      
      return source.toString();
    }
    return source.uri || '';
  }, [source]);

  
  const convertedStyle = React.useMemo(() => convertStyle(style, resizeMode), [style, resizeMode]);

  const handleLoad = React.useCallback((e: React.SyntheticEvent<HTMLImageElement>) => {
    const img = e.currentTarget;
    setState({
      loaded: true,
      error: false,
      width: img.naturalWidth,
      height: img.naturalHeight,
    });

    if (onLoad) {
      onLoad({
        nativeEvent: {
          width: img.naturalWidth,
          height: img.naturalHeight,
        },
      });
    }
  }, [onLoad]);

  const handleError = React.useCallback(() => {
    setState(prev => ({ ...prev, error: true, loaded: false }));
    
    if (onError) {
      onError({
        nativeEvent: {
          error: 'Failed to load image',
        },
      });
    }
  }, [onError]);

  const imageStyle: React.CSSProperties = {
    ...convertedStyle,
    opacity: state.loaded ? 1 : 0,
    transition: `opacity ${fadeDuration}ms ease-in-out`,
    filter: blurRadius > 0 ? `blur(${blurRadius}px)` : 'none',
  };

  return (
    <div
      style={{
        ...imageStyle,
        position: 'relative',
        overflow: 'hidden',
        backgroundColor: state.loaded ? 'transparent' : '#f0f0f0',
      }}
      className={className}
      data-testid={testID}
      role="img"
      aria-label={accessibilityLabel || alt}
      aria-hidden={accessible === false}
      {...(props as any)}
    >
      {uri && (
        <img
          src={uri}
          alt={alt}
          onLoad={handleLoad}
          onError={handleError}
          style={{
            width: '100%',
            height: '100%',
            objectFit: getResizeMode(resizeMode),
          }}
          loading="lazy"
          decoding="async"
        />
      )}
      
      {/* Loading placeholder */}
      {!state.loaded && !state.error && (
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
          <div style={{
            width: 24,
            height: 24,
            border: '2px solid #e0e0e0',
            borderTopColor: '#999',
            borderRadius: '50%',
            animation: 'spin 1s linear infinite',
          }} />
        </div>
      )}
      
      {/* Error placeholder */}
      {state.error && (
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#f5f5f5',
          color: '#999',
        }}>
          ⚠️
        </div>
      )}
    </div>
  );
});

function convertStyle(style: any, resizeMode: string): React.CSSProperties {
  if (!style) {
    return {};
  }

  if (Array.isArray(style)) {
    return style.reduce((acc, s) => ({ ...acc, ...convertStyle(s, resizeMode) }), {});
  }

  const css: React.CSSProperties = {};

  if (style.width !== undefined) css.width = normalizeValue(style.width);
  if (style.height !== undefined) css.height = normalizeValue(style.height);
  if (style.borderRadius !== undefined) css.borderRadius = normalizeValue(style.borderRadius);
  if (style.opacity !== undefined) css.opacity = style.opacity;
  if (style.transform) css.transform = style.transform;

  return css;
}

function getResizeMode(mode: string): string {
  switch (mode) {
    case 'contain':
      return 'contain';
    case 'stretch':
      return 'stretch';
    case 'repeat':
      return 'repeat';
    case 'center':
      return 'center';
    case 'cover':
    default:
      return 'cover';
  }
}

function normalizeValue(value: any): string {
  if (typeof value === 'number') {
    return `${value}px`;
  }
  return value;
}

Image.displayName = 'Image';
