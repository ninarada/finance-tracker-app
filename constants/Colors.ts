/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

const tintColorLight = '#0a7ea4';
const tintColorDark = '#fff';

export const Colors = {
  light: {
    text: '#11181C',
    background: '#fff',
    tint: tintColorLight,
    icon: '#687076',
    tabIconDefault: '#687076',
    tabIconSelected: tintColorLight,

    primary: '#007AFF',
    secondary: '#34C759',
    accent: '#FF3B30',
    success: '#28a745',
    warning: '#FFC107',
    error: '#DC3545',
    card: '#f8f9fa',
  },
  dark: {
    text: '#ECEDEE',
    background: '#151718',
    tint: tintColorDark,
    icon: '#9BA1A6',
    tabIconDefault: '#9BA1A6',
    tabIconSelected: tintColorDark,

    primary: '#0A84FF',
    secondary: '#30D158',
    accent: '#FF453A',
    success: '#4CAF50',
    warning: '#FF9500',
    error: '#FF3B30',
    card: '#1C1C1E',
  },
};
