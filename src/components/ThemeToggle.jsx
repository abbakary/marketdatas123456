import React from "react";
import { IconButton } from "@mui/material";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "../context/ThemeContext";

export function ThemeToggle() {
  const { isDarkMode, toggleTheme } = useTheme();

  return (
    <IconButton
      onClick={toggleTheme}
      title={isDarkMode ? "Switch to light mode" : "Switch to dark mode"}
      sx={{
        color: "var(--text-dark)",
        backgroundColor: "var(--hover-bg)",
        "&:hover": {
          backgroundColor: "var(--border-color)",
        },
        transition: "all 0.3s ease",
      }}
    >
      {isDarkMode ? (
        <Sun size={20} color="var(--primary-orange)" />
      ) : (
        <Moon size={20} color="var(--primary-orange)" />
      )}
    </IconButton>
  );
}

export default ThemeToggle;
