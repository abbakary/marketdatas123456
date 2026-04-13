import { useTheme } from "../context/ThemeContext";

export function useThemeColors() {
  const { isDarkMode } = useTheme();

  // Light theme colors
  const lightColors = {
    bg: "#F5F7FA",
    bgPanel: "#FFFFFF",
    bgSecondary: "#F9FAFB",
    text: "#1A202C",
    textLight: "rgba(255, 255, 255, 0.92)",
    textMuted: "#4A5568",
    border: "#E5E7EB",
    borderLight: "rgba(255, 255, 255, 0.22)",
    card: "#FFFFFF",
    hoverBg: "#F9FAFB",
  };

  // Dark theme colors
  const darkColors = {
    bg: "#0F172A",
    bgPanel: "#071A29",
    bgSecondary: "#334155",
    text: "#F1F5F9",
    textLight: "rgba(255, 255, 255, 0.82)",
    textMuted: "#CBD5E1",
    border: "#334155",
    borderLight: "rgba(255, 255, 255, 0.14)",
    card: "#1E293B",
    hoverBg: "#334155",
  };

  // Primary colors (same for both)
  const primaryColors = {
    orange: "#FF8C00",
    teal: "#20B2AA",
    darkBg: "#04121D",
  };

  const colors = isDarkMode ? darkColors : lightColors;

  return {
    ...colors,
    ...primaryColors,
    isDarkMode,
  };
}
