import React from 'react';
import { TextInputProps } from './types';

export const TextInput = React.memo(function TextInput({
  style,
  value,
  defaultValue,
  placeholder,
  placeholderTextColor = '#999',
  editable = true,
  multiline = false,
  secureTextEntry = false,
  keyboardType = 'text',
  autoCapitalize = 'sentences',
  autoFocus = false,
  onChangeText,
  onChange,
  onFocus,
  onBlur,
  onSubmitEditing,
  ...props
}: TextInputProps) {
  const convertedStyle = React.useMemo(() => convertStyle(style), [style]);

  const handleChange = React.useCallback((e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const text = e.target.value;
    if (onChangeText) onChangeText(text);
    if (onChange) onChange({ nativeEvent: { text } });
  }, [onChangeText, onChange]);

  const handleFocus = React.useCallback((e: React.FocusEvent) => {
    if (onFocus) onFocus({ nativeEvent: { text: value || '' } });
  }, [onFocus, value]);

  const handleBlur = React.useCallback((e: React.FocusEvent) => {
    if (onBlur) onBlur({ nativeEvent: { text: value || '' } });
  }, [onBlur, value]);

  const handleSubmit = React.useCallback((e: React.FormEvent) => {
    e.preventDefault();
    if (onSubmitEditing) onSubmitEditing({ nativeEvent: { text: value || '' } });
  }, [onSubmitEditing, value]);

  const Component = multiline ? 'textarea' : 'input';
  const inputType = getHtmlInputType(keyboardType);

  return (
    <Component
      style={{
        ...convertedStyle,
        color: convertedStyle.color || '#000',
        fontSize: convertedStyle.fontSize || 16,
        padding: convertedStyle.padding || 8,
        borderWidth: convertedStyle.borderWidth || 1,
        borderColor: convertedStyle.borderColor || '#ccc',
        borderRadius: convertedStyle.borderRadius || 4,
      }}
      value={value}
      defaultValue={defaultValue}
      placeholder={placeholder}
      disabled={!editable}
      type={secureTextEntry ? 'password' : inputType}
      autoCapitalize={autoCapitalize}
      autoFocus={autoFocus}
      onChange={handleChange}
      onFocus={handleFocus}
      onBlur={handleBlur}
      onSubmit={handleSubmit}
      {...(props as any)}
    />
  );
});

function convertStyle(style: any): React.CSSProperties {
  if (!style) return {};
  if (Array.isArray(style)) {
    return style.reduce((acc, s) => ({ ...acc, ...convertStyle(s) }), {});
  }
  return style as React.CSSProperties;
}

function getHtmlInputType(keyboardType: string): string {
  switch (keyboardType) {
    case 'email-address': return 'email';
    case 'numeric':
    case 'phone-pad': return 'tel';
    case 'url': return 'url';
    default: return 'text';
  }
}

TextInput.displayName = 'TextInput';
