/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

import { Platform } from "react-native";

export const colors = {
  brand: {
    white: "#FFFFFF",
    black: "#11171A",
  },

  primary: {
    coral: "#B56F59",
    sand: "#D8B26E",
    green: "#6C835B",
    teal: "#6AC0CA",
    navy: "#253A4A",
  },

  text: {
    primary: "#11171A",
    secondary: "#253A4A",
    inverse: "#FFFFFF",
  },

  background: {
    main: "#FFFFFF",
    card: "#FFFFFF",
    muted: "#F5F5F5",
  },

  status: {
    success: "#6C835B",
    warning: "#D8B26E",
    danger: "#B56F59",
    info: "#6AC0CA",
  },
};

export const Fonts = Platform.select({
  ios: {
    /** iOS `UIFontDescriptorSystemDesignDefault` */
    sans: "system-ui",
    /** iOS `UIFontDescriptorSystemDesignSerif` */
    serif: "ui-serif",
    /** iOS `UIFontDescriptorSystemDesignRounded` */
    rounded: "ui-rounded",
    /** iOS `UIFontDescriptorSystemDesignMonospaced` */
    mono: "ui-monospace",
  },
  default: {
    sans: "normal",
    serif: "serif",
    rounded: "normal",
    mono: "monospace",
  },
  web: {
    sans: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
    serif: "Georgia, 'Times New Roman', serif",
    rounded:
      "'SF Pro Rounded', 'Hiragino Maru Gothic ProN', Meiryo, 'MS PGothic', sans-serif",
    mono: "SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace",
  },
});
