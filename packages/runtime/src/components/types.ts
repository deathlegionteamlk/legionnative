
import React from 'react';

export interface StyleProps {
  
  display?: 'flex' | 'none' | 'block';
  flex?: number;
  flexDirection?: 'row' | 'column' | 'row-reverse' | 'column-reverse';
  flexWrap?: 'wrap' | 'nowrap' | 'wrap-reverse';
  justifyContent?: 'flex-start' | 'flex-end' | 'center' | 'space-between' | 'space-around' | 'space-evenly';
  alignItems?: 'flex-start' | 'flex-end' | 'center' | 'stretch' | 'baseline';
  alignContent?: 'flex-start' | 'flex-end' | 'center' | 'space-between' | 'space-around' | 'stretch';
  position?: 'relative' | 'absolute';
  top?: number | string;
  right?: number | string;
  bottom?: number | string;
  left?: number | string;
  
  
  width?: number | string;
  height?: number | string;
  minWidth?: number | string;
  minHeight?: number | string;
  maxWidth?: number | string;
  maxHeight?: number | string;
  
  
  margin?: number | string;
  marginTop?: number | string;
  marginRight?: number | string;
  marginBottom?: number | string;
  marginLeft?: number | string;
  marginHorizontal?: number | string;
  marginVertical?: number | string;
  padding?: number | string;
  paddingTop?: number | string;
  paddingRight?: number | string;
  paddingBottom?: number | string;
  paddingLeft?: number | string;
  paddingHorizontal?: number | string;
  paddingVertical?: number | string;
  
  
  borderWidth?: number;
  borderTopWidth?: number;
  borderRightWidth?: number;
  borderBottomWidth?: number;
  borderLeftWidth?: number;
  borderColor?: string;
  borderRadius?: number | string;
  borderTopLeftRadius?: number | string;
  borderTopRightRadius?: number | string;
  borderBottomLeftRadius?: number | string;
  borderBottomRightRadius?: number | string;
  borderStyle?: 'solid' | 'dashed' | 'dotted' | 'none';
  
  
  backgroundColor?: string;
  backgroundImage?: string;
  opacity?: number;
  
  
  color?: string;
  fontSize?: number | string;
  fontWeight?: 'normal' | 'bold' | '100' | '200' | '300' | '400' | '500' | '600' | '700' | '800' | '900';
  fontStyle?: 'normal' | 'italic';
  fontFamily?: string;
  textAlign?: 'left' | 'center' | 'right' | 'justify';
  lineHeight?: number | string;
  letterSpacing?: number | string;
  textDecorationLine?: 'none' | 'underline' | 'line-through' | 'underline line-through';
  textTransform?: 'none' | 'uppercase' | 'lowercase' | 'capitalize';
  
  
  shadowColor?: string;
  shadowOffset?: { width: number; height: number };
  shadowOpacity?: number;
  shadowRadius?: number;
  elevation?: number; 
  
  
  transform?: Array<{
    rotate?: string;
    rotateX?: string;
    rotateY?: string;
    rotateZ?: string;
    scale?: number;
    scaleX?: number;
    scaleY?: number;
    translateX?: number | string;
    translateY?: number | string;
    skewX?: string;
    skewY?: string;
  }>;
  
  
  overflow?: 'visible' | 'hidden' | 'scroll';
  zIndex?: number;
}

export interface ComponentProps {
  style?: StyleProps | StyleProps[];
  className?: string;
  children?: React.ReactNode;
  testID?: string;
  accessible?: boolean;
  accessibilityLabel?: string;
  accessibilityHint?: string;
  accessibilityRole?: string;
  accessibilityState?: Record<string, any>;
  onPress?: () => void;
  onLongPress?: () => void;
  hitSlop?: { top: number; right: number; bottom: number; left: number };
}

export interface ViewProps extends ComponentProps {
  collapsable?: boolean;
  needsOffscreenAlphaCompositing?: boolean;
  pointerEvents?: 'box-none' | 'none' | 'box-only' | 'auto';
  removeClippedSubviews?: boolean;
}

export interface TextProps extends ComponentProps {
  numberOfLines?: number;
  ellipsizeMode?: 'head' | 'middle' | 'tail' | 'clip';
  selectable?: boolean;
  suppressHighlighting?: boolean;
  adjustsFontSizeToFit?: boolean;
  minimumFontScale?: number;
  allowFontScaling?: boolean;
  textBreakStrategy?: 'simple' | 'highQuality' | 'balanced';
}

export interface ImageProps extends ComponentProps {
  source: { uri?: string; default?: number } | number;
  alt?: string;
  resizeMode?: 'cover' | 'contain' | 'stretch' | 'repeat' | 'center';
  resizeMethod?: 'auto' | 'resize' | 'scale';
  fadeDuration?: number;
  blurRadius?: number;
  progressiveRenderingEnabled?: boolean;
  loadingIndicatorSource?: number;
  onLoad?: (event: { nativeEvent: { width: number; height: number } }) => void;
  onError?: (event: { nativeEvent: { error: string } }) => void;
  onProgress?: (event: { nativeEvent: { loaded: number; total: number } }) => void;
}

export interface ScrollViewProps extends ComponentProps {
  horizontal?: boolean;
  showsHorizontalScrollIndicator?: boolean;
  showsVerticalScrollIndicator?: boolean;
  contentContainerStyle?: StyleProps;
  scrollEnabled?: boolean;
  nestedScrollEnabled?: boolean;
  alwaysBounceVertical?: boolean;
  alwaysBounceHorizontal?: boolean;
  bounces?: boolean;
  decelerationRate?: 'normal' | 'fast' | number;
  directionalLockEnabled?: boolean;
  disableIntervalMomentum?: boolean;
  indicatorStyle?: 'default' | 'black' | 'white';
  invertStickyHeaders?: boolean;
  keyboardDismissMode?: 'none' | 'on-drag' | 'interactive';
  keyboardShouldPersistTaps?: 'always' | 'never' | 'handled';
  overScrollMode?: 'auto' | 'always' | 'never';
  pagingEnabled?: boolean;
  persistentScrollbar?: boolean;
  snapToAlignment?: 'start' | 'center' | 'end';
  snapToEnd?: boolean;
  snapToInterval?: number;
  snapToOffsets?: number[];
  stickyHeaderIndices?: number[];
  zoomEnabled?: boolean;
  onScroll?: (event: { nativeEvent: { contentOffset: { x: number; y: number }; contentSize: { width: number; height: number }; layoutMeasurement: { width: number; height: number } } }) => void;
  onScrollBeginDrag?: () => void;
  onScrollEndDrag?: () => void;
  onContentSizeChange?: (width: number, height: number) => void;
  refreshControl?: React.ReactNode;
}

export interface ButtonProps extends ComponentProps {
  title: string;
  disabled?: boolean;
  color?: string;
  accessibilityLabel?: string;
  hasTVPreferredFocus?: boolean;
  tvParallaxProperties?: {
    enabled?: boolean;
    tiltAngle?: number;
    magnification?: number;
    pressMagnitude?: number;
    pressDuration?: number;
    pauseDelay?: number;
  };
}

export interface TextInputProps extends ComponentProps {
  value?: string;
  defaultValue?: string;
  placeholder?: string;
  placeholderTextColor?: string;
  editable?: boolean;
  maxLength?: number;
  multiline?: boolean;
  numberOfLines?: number;
  secureTextEntry?: boolean;
  passwordRules?: string;
  keyboardType?: 'default' | 'email-address' | 'numeric' | 'phone-pad' | 'number-pad' | 'decimal-pad' | 'url' | 'web-search' | 'ascii-capable' | 'numbers-and-punctuation' | 'name-phone-pad' | 'twitter' | 'unicode' | 'visible-password';
  returnKeyType?: 'done' | 'go' | 'google' | 'join' | 'next' | 'route' | 'search' | 'send' | 'yahoo' | 'emergency-call';
  autoCapitalize?: 'none' | 'sentences' | 'words' | 'characters';
  autoCorrect?: boolean;
  autoFocus?: boolean;
  blurOnSubmit?: boolean;
  clearButtonMode?: 'never' | 'while-editing' | 'unless-editing' | 'always';
  clearTextOnFocus?: boolean;
  enablesReturnKeyAutomatically?: boolean;
  keyboardAppearance?: 'default' | 'light' | 'dark';
  onSubmitEditing?: (event: { nativeEvent: { text: string } }) => void;
  onChange?: (event: { nativeEvent: { text: string } }) => void;
  onChangeText?: (text: string) => void;
  onFocus?: (event: { nativeEvent: { text: string } }) => void;
  onBlur?: (event: { nativeEvent: { text: string } }) => void;
  onKeyPress?: (event: { nativeEvent: { key: string } }) => void;
  selection?: { start: number; end?: number };
  selectTextOnFocus?: boolean;
  selectionColor?: string;
  textAlign?: 'left' | 'center' | 'right' | 'justify';
  textAlignVertical?: 'top' | 'center' | 'bottom';
  inputAccessoryViewID?: string;
  caretHidden?: boolean;
  contextMenuHidden?: boolean;
  showSoftInputOnFocus?: boolean;
  dataDetectorTypes?: 'phoneNumber' | 'link' | 'address' | 'calendarEvent' | 'none' | 'all';
  textContentType?: 'none' | 'URL' | 'addressCity' | 'addressCityAndState' | 'addressState' | 'countryName' | 'creditCardNumber' | 'emailAddress' | 'familyName' | 'fullStreetAddress' | 'givenName' | 'jobTitle' | 'location' | 'middleName' | 'name' | 'namePrefix' | 'nameSuffix' | 'nickname' | 'organizationName' | 'postalCode' | 'streetAddressLine1' | 'streetAddressLine2' | 'sublocality' | 'telephoneNumber' | 'username' | 'password' | 'newPassword' | 'oneTimeCode' | 'birthdate' | 'birthdateDay' | 'birthdateMonth' | 'birthdateYear';
  autoComplete?: 'off' | 'username' | 'password' | 'email' | 'name' | 'tel' | 'address-line1' | 'address-line2' | 'address-city' | 'address-state' | 'address-postal-code' | 'address-country' | 'cc-number' | 'cc-given-name' | 'cc-family-name' | 'cc-exp' | 'cc-exp-month' | 'cc-exp-year' | 'cc-csc' | 'organization' | 'photo' | 'url' | 'gender' | 'bday' | 'bday-day' | 'bday-month' | 'bday-year' | 'honorific-prefix' | 'honorific-suffix' | 'nickname' | 'additional-name' | 'name-prefix' | 'name-suffix' | 'street-address' | 'country-name' | 'postal-code' | 'country' | 'language' | 'sex' | 'tel-country-code' | 'tel-national' | 'tel-area-code' | 'tel-local' | 'tel-extension' | 'impp' | 'organization-title';
}

export interface SafeAreaProps extends ComponentProps {
  edges?: ('top' | 'bottom' | 'left' | 'right')[];
  mode?: 'padding' | 'margin';
  insets?: {
    top?: number;
    bottom?: number;
    left?: number;
    right?: number;
  };
}

export interface AnimatedProps extends ComponentProps {
  useNativeDriver?: boolean;
  interpolation?: 'linear' | 'ease-in' | 'ease-out' | 'ease-in-out';
}


export interface AnimationConfig {
  toValue: number | { x: number; y: number };
  duration?: number;
  delay?: number;
  easing?: (value: number) => number;
  iterations?: number;
  useNativeDriver?: boolean;
}

export interface SpringConfig {
  toValue: number | { x: number; y: number };
  stiffness?: number;
  damping?: number;
  mass?: number;
  initialVelocity?: number;
  restDisplacementThreshold?: number;
  restSpeedThreshold?: number;
  useNativeDriver?: boolean;
}

export interface DecayConfig {
  velocity: number | { x: number; y: number };
  deceleration?: number;
  useNativeDriver?: boolean;
}
