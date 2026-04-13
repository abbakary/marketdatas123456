import { createTheme } from "@mui/material/styles";

const lightTheme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#FF8C00", // Vibrant Orange
      contrastText: "#FFFFFF",
    },
    secondary: {
      main: "#20B2AA", // Teal
      contrastText: "#FFFFFF",
    },
    background: {
      default: "#F5F7FA",
      paper: "#FFFFFF",
    },
    text: {
      primary: "#1A202C",
      secondary: "#4A5568",
    },
    divider: "#E5E7EB",
  },

  typography: {
    fontFamily: "Poppins, sans-serif",
    h1: {
      fontWeight: 700,
    },
    h2: {
      fontWeight: 600,
    },
    button: {
      textTransform: "none",
      fontWeight: 500,
    },
  },

  shape: {
    borderRadius: 10,
  },
});

const darkTheme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#FF8C00", // Vibrant Orange
      contrastText: "#FFFFFF",
    },
    secondary: {
      main: "#20B2AA", // Teal
      contrastText: "#FFFFFF",
    },
    background: {
      default: "#0F172A", // Dark blue-gray
      paper: "#1E293B", // Slightly lighter than default
    },
    text: {
      primary: "#F1F5F9", // Light text for dark background
      secondary: "#CBD5E1", // Lighter muted text
    },
    divider: "#334155",
    error: {
      main: "#EF4444",
    },
    warning: {
      main: "#F59E0B",
    },
    info: {
      main: "#3B82F6",
    },
    success: {
      main: "#10B981",
    },
  },

  typography: {
    fontFamily: "Poppins, sans-serif",
    h1: {
      fontWeight: 700,
    },
    h2: {
      fontWeight: 600,
    },
    button: {
      textTransform: "none",
      fontWeight: 500,
    },
  },

  shape: {
    borderRadius: 10,
  },

  components: {
    MuiCard: {
      styleOverrides: {
        root: {
          backgroundImage: "none",
        },
      },
    },
  },
});

export { lightTheme, darkTheme };
export default lightTheme;
