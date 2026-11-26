import { useDarkMode } from '../contexts/useDarkMode';
import { colors, getThemeColors } from '../styles/colors';
import type { ColorTheme } from '../styles/colors';

/** Custom hook exposing centralized, theme-aware design tokens. */
export const useThemeColors = () => {
  const { isDarkMode } = useDarkMode();
  const theme: ColorTheme = isDarkMode ? 'dark' : 'light';
  const themeColors = getThemeColors(theme);

  return {
    ...themeColors,
    colors,
    theme,
    isDarkMode,

    primary: themeColors.text.primary,
    secondary: themeColors.text.secondary,
    accent: themeColors.text.tertiary,

    textPrimary: themeColors.text.primary,
    textSecondary: themeColors.text.secondary,
    textMuted: themeColors.text.tertiary,
    bgPrimary: themeColors.background.primary,
    bgSecondary: themeColors.background.secondary,
    surface: isDarkMode ? colors.dark[800] : colors.white,
    surfaceElevated: isDarkMode ? colors.dark[700] : colors.neutral[100],
    border: isDarkMode ? '#27272A' : '#E4E4E7',
    focusRing: isDarkMode ? '#FAFAFA' : '#09090B',

    background: {
      ...themeColors.background,
      gradient: colors.background[theme].gradient,
      gradientEnd: colors.background[theme].gradientEnd,
      sections: colors.background[theme].sections,
    },

    hover: themeColors.interactive.hover,
    active: themeColors.interactive.active,
    focus: themeColors.interactive.focus,
    effects: colors.effects,
  };
};

export const withAlpha = (color: string, alpha: number): string => {
  const hex = color.replace('#', '');
  const r = parseInt(hex.substring(0, 2), 16);
  const g = parseInt(hex.substring(2, 4), 16);
  const b = parseInt(hex.substring(4, 6), 16);

  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
};

export const getColorVariants = (baseColor: string) => ({
  base: baseColor,
  hover: withAlpha(baseColor, 0.8),
  active: withAlpha(baseColor, 0.9),
  disabled: withAlpha(baseColor, 0.5),
  subtle: withAlpha(baseColor, 0.1),
  muted: withAlpha(baseColor, 0.6),
});