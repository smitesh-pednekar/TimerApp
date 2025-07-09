import { StyleSheet, Platform, StatusBar, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

export const COLORS = {
  // Primary palette
  primary: '#6C63FF',
  primaryLight: '#8B85FF',
  primaryDark: '#5A52E8',
  
  // Secondary colors
  secondary: '#FF6B6B',
  success: '#4ECDC4',
  warning: '#FFE66D',
  danger: '#FF6B6B',
  
  // Neutral colors
  background: '#F8F9FA',
  surface: '#FFFFFF',
  surfaceLight: '#F1F3F4',
  
  // Text colors
  textPrimary: '#2D3748',
  textSecondary: '#718096',
  textMuted: '#A0AEC0',
  textWhite: '#FFFFFF',
  
  // Status colors
  running: '#48BB78',
  paused: '#ED8936',
  completed: '#9F7AEA',
  stopped: '#718096',
  
  // Gradients
  gradientStart: '#667eea',
  gradientEnd: '#764ba2',
  
  // Shadows
  shadowColor: '#000000',
  shadowLight: 'rgba(0, 0, 0, 0.1)',
  shadowMedium: 'rgba(0, 0, 0, 0.15)',
};

export const SIZES = {
  // Spacing
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
  
  // Font sizes
  fontXs: 12,
  fontSm: 14,
  fontMd: 16,
  fontLg: 18,
  fontXl: 20,
  fontXxl: 24,
  fontTitle: 28,
  fontHero: 32,
  
  // Border radius
  radiusXs: 4,
  radiusSm: 8,
  radiusMd: 12,
  radiusLg: 16,
  radiusXl: 24,
  radiusRound: 50,
  
  // Dimensions
  buttonHeight: 48,
  inputHeight: 52,
  cardMinHeight: 120,
  
  // Screen dimensions
  screenWidth: width,
  screenHeight: height,
};

export const SHADOWS = {
  light: {
    shadowColor: COLORS.shadowColor,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  medium: {
    shadowColor: COLORS.shadowColor,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 4,
  },
  heavy: {
    shadowColor: COLORS.shadowColor,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.2,
    shadowRadius: 16,
    elevation: 8,
  },
};

export const globalStyles = StyleSheet.create({
  // Layout
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
  
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  
  centerContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  
  rowSpaceBetween: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  
  // Cards
  card: {
    backgroundColor: COLORS.surface,
    borderRadius: SIZES.radiusMd,
    padding: SIZES.md,
    marginVertical: SIZES.sm,
    ...SHADOWS.medium,
  },
  
  cardElevated: {
    backgroundColor: COLORS.surface,
    borderRadius: SIZES.radiusLg,
    padding: SIZES.lg,
    marginVertical: SIZES.md,
    ...SHADOWS.heavy,
  },
  
  // Typography
  heroText: {
    fontSize: SIZES.fontHero,
    fontWeight: '800',
    color: COLORS.textPrimary,
    letterSpacing: -0.5,
  },
  
  titleText: {
    fontSize: SIZES.fontTitle,
    fontWeight: '700',
    color: COLORS.textPrimary,
    letterSpacing: -0.3,
  },
  
  headingText: {
    fontSize: SIZES.fontXl,
    fontWeight: '600',
    color: COLORS.textPrimary,
  },
  
  bodyText: {
    fontSize: SIZES.fontMd,
    color: COLORS.textPrimary,
    lineHeight: 24,
  },
  
  captionText: {
    fontSize: SIZES.fontSm,
    color: COLORS.textSecondary,
  },
  
  mutedText: {
    fontSize: SIZES.fontSm,
    color: COLORS.textMuted,
  },
  
  // Buttons
  button: {
    height: SIZES.buttonHeight,
    backgroundColor: COLORS.primary,
    borderRadius: SIZES.radiusMd,
    paddingHorizontal: SIZES.lg,
    justifyContent: 'center',
    alignItems: 'center',
    ...SHADOWS.light,
  },
  
  buttonText: {
    fontSize: SIZES.fontMd,
    fontWeight: '600',
    color: COLORS.textWhite,
  },
  
  buttonSecondary: {
    backgroundColor: COLORS.success,
  },
  
  buttonWarning: {
    backgroundColor: COLORS.warning,
  },
  
  buttonDanger: {
    backgroundColor: COLORS.danger,
  },
  
  // Inputs
  input: {
    height: SIZES.inputHeight,
    backgroundColor: COLORS.surface,
    borderRadius: SIZES.radiusMd,
    paddingHorizontal: SIZES.md,
    fontSize: SIZES.fontMd,
    color: COLORS.textPrimary,
    borderWidth: 1,
    borderColor: COLORS.surfaceLight,
    ...SHADOWS.light,
  },
  
  inputFocused: {
    borderColor: COLORS.primary,
    borderWidth: 2,
  },
});
