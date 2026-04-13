/**
 * Theme-aware style utilities
 * These objects should be used with the useTheme hook to provide dynamic theme colors
 */

export const createThemeStyles = (colors) => ({
  // Card styles
  card: {
    backgroundColor: colors.bgPanel || colors.card,
    border: `1px solid ${colors.border}`,
    borderRadius: 12,
    boxShadow: `0 4px 12px ${colors.isDarkMode ? "rgba(0,0,0,0.3)" : "rgba(0,0,0,0.1)"}`,
    padding: 24,
  },

  // Input styles
  input: {
    backgroundColor: colors.bgSecondary || colors.inputBg,
    border: `1px solid ${colors.border}`,
    borderRadius: 8,
    color: colors.text,
    padding: "8px 12px",
  },

  // Text styles
  headingPrimary: {
    fontSize: 32,
    fontWeight: 800,
    color: colors.text,
    margin: 0,
  },

  headingSecondary: {
    fontSize: 24,
    fontWeight: 700,
    color: colors.text,
    margin: 0,
  },

  textPrimary: {
    color: colors.text,
    fontSize: 16,
    fontWeight: 500,
  },

  textSecondary: {
    color: colors.textMuted,
    fontSize: 14,
    fontWeight: 400,
  },

  // Button styles
  buttonPrimary: {
    backgroundColor: colors.orange,
    color: "white",
    border: "none",
    borderRadius: 8,
    padding: "10px 20px",
    fontWeight: 600,
    cursor: "pointer",
    transition: "all 0.3s ease",
  },

  buttonSecondary: {
    backgroundColor: colors.bgSecondary,
    color: colors.text,
    border: `1px solid ${colors.border}`,
    borderRadius: 8,
    padding: "10px 20px",
    fontWeight: 600,
    cursor: "pointer",
    transition: "all 0.3s ease",
  },

  // Status badge styles
  badgeSuccess: {
    backgroundColor: "rgba(16, 185, 129, 0.1)",
    color: "#10B981",
    border: "1px solid rgba(16, 185, 129, 0.3)",
    padding: "4px 12px",
    borderRadius: 4,
    fontSize: 12,
    fontWeight: 600,
  },

  badgeWarning: {
    backgroundColor: "rgba(245, 158, 11, 0.1)",
    color: "#F59E0B",
    border: "1px solid rgba(245, 158, 11, 0.3)",
    padding: "4px 12px",
    borderRadius: 4,
    fontSize: 12,
    fontWeight: 600,
  },

  badgeError: {
    backgroundColor: "rgba(239, 68, 68, 0.1)",
    color: "#EF4444",
    border: "1px solid rgba(239, 68, 68, 0.3)",
    padding: "4px 12px",
    borderRadius: 4,
    fontSize: 12,
    fontWeight: 600,
  },

  // Divider styles
  divider: {
    borderColor: colors.border,
    borderWidth: "1px 0 0 0",
    margin: "16px 0",
  },

  // Container styles
  container: {
    backgroundColor: colors.bg,
    color: colors.text,
    minHeight: "100vh",
    transition: "all 0.3s ease",
  },

  content: {
    backgroundColor: colors.bgPanel,
    borderRadius: 12,
    padding: 24,
    marginBottom: 16,
  },

  // Table styles
  tableHeader: {
    backgroundColor: colors.bgSecondary,
    color: colors.text,
    fontWeight: 600,
  },

  tableRow: {
    borderColor: colors.border,
    color: colors.text,
  },

  tableHover: {
    backgroundColor: colors.bgSecondary,
    cursor: "pointer",
  },
});

export default createThemeStyles;
