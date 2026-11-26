/**
 * Centralized Color Palette for Portfolio
 * 
 * This file contains all colors used throughout the application
 * organized by semantic meaning and theme variants.
 */

export const colors = {
  // Base colors
  white: '#FFFFFF',
  black: '#09090B',
  transparent: 'transparent',

  // Neutral palette — Romellyenyi monochrome foundation
  neutral: {
    25: '#FAFAFA',
    50: '#F4F4F5',
    100: '#E4E4E7',
    200: '#D4D4D8',
    300: '#A1A1AA',
    400: '#71717A',
    500: '#52525B',
    600: '#3F3F46',
    700: '#27272A',
    800: '#18181B',
    900: '#09090B',
  },

  // Compatibility aliases for existing components during incremental migration
  pink: {
    25: '#FAFAFA',
    50: '#F4F4F5',
    100: '#E4E4E7',
    200: '#D4D4D8',
    300: '#A1A1AA',
    400: '#71717A',
    500: '#52525B',
    600: '#3F3F46',
    700: '#27272A',
    800: '#18181B',
    900: '#09090B',
  },

  // Dark theme colors
  dark: {
    50: '#FAFAFA',
    100: '#F4F4F5',
    200: '#E4E4E7',
    300: '#D4D4D8',
    400: '#A1A1AA',
    500: '#71717A',
    600: '#52525B',
    700: '#27272A',
    800: '#18181B',
    900: '#09090B',
    950: '#09090B',
  },

  // Semantic colors
  background: {
    light: {
      primary: '#FFFFFF',
      secondary: '#F4F4F5',
      gradient: '#FFFFFF',
      gradientEnd: '#FFFFFF',
      overlay: 'rgba(255, 255, 255, 0.72)',
      // Section-specific gradients - mostly white with very light pink brush at edges
      sections: {
        about: '#FFFFFF',
        skills: '#FFFFFF',
        projects: '#FFFFFF',
        experience: '#FFFFFF',
        certifications: '#FFFFFF',
      },
    },
    dark: {
      primary: '#09090B',
      secondary: '#18181B',
      gradient: '#09090B',
      gradientEnd: '#09090B',
      overlay: 'rgba(9, 9, 11, 0.72)',
      // Dark mode sections maintain consistent dark background
      sections: {
        about: '#09090B',
        skills: '#09090B',
        projects: '#09090B',
        experience: '#09090B',
        certifications: '#09090B',
      },
    },
  },

  // Text colors
  text: {
    light: {
      primary: '#09090B',
      secondary: '#52525B',
      tertiary: '#71717A',
      accent: '#52525B',
      pink: '#09090B',
    },
    dark: {
      primary: '#FAFAFA',
      secondary: '#A1A1AA',
      tertiary: '#71717A',
      accent: '#A1A1AA',
      pink: '#FAFAFA',
    },
  },

  // Interactive elements
  interactive: {
    light: {
      primary: '#F4F4F5',
      hover: '#E4E4E7',
      active: '#D4D4D8',
      focus: '#09090B',
    },
    dark: {
      primary: '#18181B',
      hover: '#27272A',
      active: '#3F3F46',
      focus: '#FAFAFA',
    },
  },

  // Navigation specific
  navigation: {
    light: {
      background: 'rgba(255, 255, 255, 0.82)',
      backgroundScrolled: 'rgba(255, 255, 255, 0.94)',
      border: 'rgba(228, 228, 231, 0.72)',
      borderScrolled: '#E4E4E7',
      shadow: 'rgba(9, 9, 11, 0.04)',
      shadowScrolled: 'rgba(9, 9, 11, 0.08)',
      mobile: 'rgba(255, 255, 255, 0.96)',
    },
    dark: {
      background: 'rgba(9, 9, 11, 0.82)',
      backgroundScrolled: 'rgba(9, 9, 11, 0.94)',
      border: 'rgba(39, 39, 42, 0.72)',
      borderScrolled: '#27272A',
      shadow: 'rgba(0, 0, 0, 0.16)',
      shadowScrolled: 'rgba(0, 0, 0, 0.32)',
      mobile: 'rgba(9, 9, 11, 0.96)',
    },
  },

  // Button variants
  button: {
    primary: {
      light: { background: '#09090B', text: '#FFFFFF', hover: '#27272A', shadow: 'rgba(9, 9, 11, 0.12)' },
      dark: { background: '#FAFAFA', text: '#09090B', hover: '#E4E4E7', shadow: 'rgba(0, 0, 0, 0.32)' },
    },
    secondary: {
      light: { background: '#F4F4F5', text: '#09090B', border: '#E4E4E7', hover: '#E4E4E7' },
      dark: { background: '#18181B', text: '#FAFAFA', border: '#27272A', hover: '#27272A' },
    },
    outline: {
      light: { background: 'transparent', text: '#09090B', border: '#E4E4E7', hover: '#F4F4F5' },
      dark: { background: 'transparent', text: '#FAFAFA', border: '#27272A', hover: '#18181B' },
    },
  },

  // Card colors
  card: {
    light: { background: '#FFFFFF', border: '#E4E4E7', shadow: 'rgba(9, 9, 11, 0.06)' },
    dark: { background: '#18181B', border: '#27272A', shadow: 'rgba(0, 0, 0, 0.28)' },
  },

  // Special effects
  effects: {
    glow: 'rgba(113, 113, 122, 0.20)',
    dropShadow: 'rgba(9, 9, 11, 0.12)',
    textShadow: 'rgba(9, 9, 11, 0.12)',
    blur: 'rgba(255, 255, 255, 0.10)',
  },

  // Utility colors
  utility: {
    success: '#16A34A',
    warning: '#A16207',
    error: '#DC2626',
    info: '#52525B',
    neutral: '#71717A',
  },

  // Special colors
  special: {
    dragMe: '#09090B',
    aurora: {
      dark: '#27272A',
      light: { 1: '#F4F4F5', 2: '#E4E4E7', 3: '#FAFAFA' },
    },
  },
} as const;

// Type definitions for better TypeScript support
type ColorTheme = 'light' | 'dark';
type ColorVariant = keyof typeof colors;

export type { ColorTheme, ColorVariant };

// Helper function to get theme-specific colors
export const getThemeColors = (theme: ColorTheme) => ({
  background: colors.background[theme],
  text: colors.text[theme],
  interactive: colors.interactive[theme],
  navigation: colors.navigation[theme],
  button: {
    primary: colors.button.primary[theme],
    secondary: colors.button.secondary[theme],
    outline: colors.button.outline[theme],
  },
  card: colors.card[theme],
});