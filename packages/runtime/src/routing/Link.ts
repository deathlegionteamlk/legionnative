import React from 'react';
import { useNavigation } from './useNavigation';

interface LinkProps {
  to: string;
  params?: Record<string, any>;
  children: React.ReactNode;
  style?: React.CSSProperties;
  className?: string;
}

export function Link({ to, params, children, style, className }: LinkProps) {
  const navigation = useNavigation();

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    navigation.navigate(to, params);
  };

  return (
    <a
      href={`#${to}`}
      onClick={handleClick}
      style={{ textDecoration: 'none', cursor: 'pointer', ...style }}
      className={className}
    >
      {children}
    </a>
  );
}
