import { Box, Typography, TextField, Chip, InputAdornment, Button } from "@mui/material";
import { X, Search } from "lucide-react";
import { useTheme } from "../../../context/ThemeContext";

const PRIMARY_COLOR = "#61C5C3";

export default function FiltersPanel({
  isOpen,
  onClose,
  filters,
  onFiltersChange,
  onApply,
  onClear,
}) {
  const { isDarkMode } = useTheme();
  const handleTagSearch = (value) => {
    onFiltersChange({
      ...filters,
      tagSearch: value,
    });
  };

  const handleCountryToggle = (country) => {
    const currentCountries = filters.countries || [];
    const updated = currentCountries.includes(country)
      ? currentCountries.filter(c => c !== country)
      : [...currentCountries, country];
    onFiltersChange({
      ...filters,
      countries: updated,
    });
  };

  const handleLicenseToggle = (license) => {
    const currentLicenses = filters.licenses || [];
    const updated = currentLicenses.includes(license)
      ? currentLicenses.filter(l => l !== license)
      : [...currentLicenses, license];
    onFiltersChange({
      ...filters,
      licenses: updated,
    });
  };

  const handleUsabilityToggle = (rating) => {
    const currentRatings = filters.usabilityRatings || [];
    const updated = currentRatings.includes(rating)
      ? currentRatings.filter(r => r !== rating)
      : [...currentRatings, rating];
    onFiltersChange({
      ...filters,
      usabilityRatings: updated,
    });
  };

  const handleVotedForToggle = (tag) => {
    const currentTags = filters.votedFor || [];
    const updated = currentTags.includes(tag)
      ? currentTags.filter(t => t !== tag)
      : [...currentTags, tag];
    onFiltersChange({
      ...filters,
      votedFor: updated,
    });
  };

  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <Box
          onClick={onClose}
          sx={{
            position: "fixed",
            inset: 0,
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            zIndex: 9998,
          }}
        />
      )}

      {/* Filter Panel */}
      <Box
        sx={{
          position: "fixed",
          right: 0,
          top: 0,
          height: "100vh",
          width: { xs: "100%", sm: 420 },
          backgroundColor: isDarkMode ? "#1E293B" : "#fff",
          boxShadow: isOpen ? "-4px 0 16px rgba(0, 0, 0, 0.15)" : "none",
          transform: isOpen ? "translateX(0)" : "translateX(100%)",
          transition: "transform 0.3s ease-in-out, background-color 0.3s ease",
          zIndex: 9999,
          overflowY: "auto",
          "&::-webkit-scrollbar": {
            width: "6px",
          },
          "&::-webkit-scrollbar-track": {
            backgroundColor: isDarkMode ? "#334155" : "#f1f1f1",
          },
          "&::-webkit-scrollbar-thumb": {
            backgroundColor: isDarkMode ? "#64748b" : "#888",
            borderRadius: "3px",
            "&:hover": {
              backgroundColor: isDarkMode ? "#94A3B8" : "#555",
            },
          },
        }}
      >
        {/* Header */}
        <Box
          sx={{
            p: 2.5,
            borderBottom: `1px solid ${isDarkMode ? "#334155" : "#e5e7eb"}`,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            position: "sticky",
            top: 0,
            backgroundColor: isDarkMode ? "#1E293B" : "#fff",
            zIndex: 10,
          }}
        >
          <Typography sx={{ fontSize: "1.2rem", fontWeight: 700, color: isDarkMode ? "#F1F5F9" : "#111827" }}>
            Filters
          </Typography>
          <Box
            onClick={onClose}
            sx={{
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: 32,
              height: 32,
              borderRadius: "50%",
              backgroundColor: isDarkMode ? "#334155" : "#f3f4f6",
              transition: "background-color 0.2s",
              color: isDarkMode ? "#CBD5E1" : "#111827",
              "&:hover": {
                backgroundColor: isDarkMode ? "#475569" : "#e5e7eb",
              },
            }}
          >
            <X size={18} />
          </Box>
        </Box>

        {/* Content */}
        <Box sx={{ p: 2.5 }}>
          {/* Tags Section */}
          <Box sx={{ mb: 3 }}>
            <Typography
              sx={{
                fontSize: "0.85rem",
                fontWeight: 700,
                color: isDarkMode ? "#F1F5F9" : "#111827",
                textTransform: "uppercase",
                letterSpacing: "0.5px",
                mb: 1.5,
              }}
            >
              Tags
            </Typography>
            <TextField
              fullWidth
              placeholder="Search"
              value={filters.tagSearch || ""}
              onChange={(e) => handleTagSearch(e.target.value)}
              variant="outlined"
              size="small"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Search size={16} color={isDarkMode ? "#94A3B8" : "#6b7280"} />
                  </InputAdornment>
                ),
              }}
              sx={{
                "& .MuiOutlinedInput-root": {
                  borderRadius: "8px",
                  fontSize: "0.9rem",
                  backgroundColor: isDarkMode ? "#334155" : "#fff",
                  color: isDarkMode ? "#F1F5F9" : "#111827",
                  borderColor: isDarkMode ? "#475569" : "#e5e7eb",
                  "& fieldset": {
                    borderColor: isDarkMode ? "#475569" : "#e5e7eb",
                  },
                  "&:hover fieldset": {
                    borderColor: isDarkMode ? "#64748b" : "#d1d5db",
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: PRIMARY_COLOR,
                  },
                },
                "& .MuiOutlinedInput-input::placeholder": {
                  color: isDarkMode ? "#94A3B8" : "#9ca3af",
                  opacity: 1,
                },
              }}
            />
          </Box>

          {/* File Size Section */}
          <Box sx={{ mb: 3 }}>
            <Typography
              sx={{
                fontSize: "0.85rem",
                fontWeight: 700,
                color: isDarkMode ? "#F1F5F9" : "#111827",
                textTransform: "uppercase",
                letterSpacing: "0.5px",
                mb: 1.5,
              }}
            >
              File Size
            </Typography>
            <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
              <TextField
                placeholder="Min"
                value={filters.minSize || ""}
                onChange={(e) =>
                  onFiltersChange({ ...filters, minSize: e.target.value })
                }
                variant="outlined"
                size="small"
                sx={{
                  flex: 1,
                  "& .MuiOutlinedInput-root": {
                    borderRadius: "8px",
                    backgroundColor: isDarkMode ? "#334155" : "#fff",
                    color: isDarkMode ? "#F1F5F9" : "#111827",
                    borderColor: isDarkMode ? "#475569" : "#e5e7eb",
                    "& fieldset": {
                      borderColor: isDarkMode ? "#475569" : "#e5e7eb",
                    },
                    "&:hover fieldset": {
                      borderColor: isDarkMode ? "#64748b" : "#d1d5db",
                    },
                  },
                  "& .MuiOutlinedInput-input::placeholder": {
                    color: isDarkMode ? "#94A3B8" : "#9ca3af",
                    opacity: 1,
                  },
                }}
              />
              <Box sx={{ px: 1 }}>
                <Typography sx={{ fontSize: "0.9rem", color: isDarkMode ? "#94A3B8" : "#6b7280" }}>
                  to
                </Typography>
              </Box>
              <TextField
                placeholder="Max"
                value={filters.maxSize || ""}
                onChange={(e) =>
                  onFiltersChange({ ...filters, maxSize: e.target.value })
                }
                variant="outlined"
                size="small"
                sx={{
                  flex: 1,
                  "& .MuiOutlinedInput-root": {
                    borderRadius: "8px",
                    backgroundColor: isDarkMode ? "#334155" : "#fff",
                    color: isDarkMode ? "#F1F5F9" : "#111827",
                    borderColor: isDarkMode ? "#475569" : "#e5e7eb",
                    "& fieldset": {
                      borderColor: isDarkMode ? "#475569" : "#e5e7eb",
                    },
                    "&:hover fieldset": {
                      borderColor: isDarkMode ? "#64748b" : "#d1d5db",
                    },
                  },
                  "& .MuiOutlinedInput-input::placeholder": {
                    color: isDarkMode ? "#94A3B8" : "#9ca3af",
                    opacity: 1,
                  },
                }}
              />
              <Box
                sx={{
                  px: 1.5,
                  py: 0.8,
                  backgroundColor: isDarkMode ? "#334155" : "#f3f4f6",
                  borderRadius: "6px",
                  fontSize: "0.85rem",
                  color: isDarkMode ? "#94A3B8" : "#6b7280",
                  whiteSpace: "nowrap",
                }}
              >
                MB
              </Box>
            </Box>
          </Box>

          {/* Country/Region Section */}
          <Box sx={{ mb: 3 }}>
            <Typography
              sx={{
                fontSize: "0.85rem",
                fontWeight: 700,
                color: isDarkMode ? "#F1F5F9" : "#111827",
                textTransform: "uppercase",
                letterSpacing: "0.5px",
                mb: 1.5,
              }}
            >
              Country/Region
            </Typography>
            <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap" }}>
              {[
                "United States",
                "Canada",
                "United Kingdom",
                "India",
                "Australia",
                "Germany",
                "France",
                "Japan",
                "Brazil",
                "Nigeria",
                "Mexico",
                "South Africa",
                "Singapore",
                "China",
                "Netherlands",
              ].map((country) => (
                <Chip
                  key={country}
                  label={country}
                  onClick={() => handleCountryToggle(country)}
                  variant={
                    (filters.countries || []).includes(country)
                      ? "filled"
                      : "outlined"
                  }
                  sx={{
                    backgroundColor: (filters.countries || []).includes(country)
                      ? PRIMARY_COLOR
                      : isDarkMode ? "#334155" : "transparent",
                    color: (filters.countries || []).includes(country)
                      ? "#fff"
                      : isDarkMode ? "#CBD5E1" : "#374151",
                    borderColor: isDarkMode ? "#475569" : "#d1d5db",
                    fontWeight: 500,
                    fontSize: "0.85rem",
                    height: 32,
                    "&:hover": {
                      backgroundColor: (filters.countries || []).includes(
                        country
                      )
                        ? PRIMARY_COLOR
                        : isDarkMode ? "#475569" : "#f3f4f6",
                    },
                  }}
                />
              ))}
            </Box>
          </Box>

          {/* Licenses Section */}
          <Box sx={{ mb: 3 }}>
            <Typography
              sx={{
                fontSize: "0.85rem",
                fontWeight: 700,
                color: isDarkMode ? "#F1F5F9" : "#111827",
                textTransform: "uppercase",
                letterSpacing: "0.5px",
                mb: 1.5,
              }}
            >
              Licenses
            </Typography>
            <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap" }}>
              {["Creative Commons", "GPL", "Open Database", "Other"].map(
                (license) => (
                  <Chip
                    key={license}
                    label={license}
                    onClick={() => handleLicenseToggle(license)}
                    variant={
                      (filters.licenses || []).includes(license)
                        ? "filled"
                        : "outlined"
                    }
                    sx={{
                      backgroundColor: (filters.licenses || []).includes(
                        license
                      )
                        ? PRIMARY_COLOR
                        : isDarkMode ? "#334155" : "transparent",
                      color: (filters.licenses || []).includes(license)
                        ? "#fff"
                        : isDarkMode ? "#CBD5E1" : "#374151",
                      borderColor: isDarkMode ? "#475569" : "#d1d5db",
                      fontWeight: 500,
                      fontSize: "0.85rem",
                      height: 32,
                      "&:hover": {
                        backgroundColor: (filters.licenses || []).includes(
                          license
                        )
                          ? PRIMARY_COLOR
                          : isDarkMode ? "#475569" : "#f3f4f6",
                      },
                    }}
                  />
                )
              )}
            </Box>
          </Box>

          {/* Usability Rating Section */}
          <Box sx={{ mb: 3 }}>
            <Typography
              sx={{
                fontSize: "0.85rem",
                fontWeight: 700,
                color: isDarkMode ? "#F1F5F9" : "#111827",
                textTransform: "uppercase",
                letterSpacing: "0.5px",
                mb: 1.5,
              }}
            >
              Usability Rating
            </Typography>
            <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap" }}>
              {["8.00 or higher", "9.00 or higher", "10.00"].map((rating) => (
                <Chip
                  key={rating}
                  label={rating}
                  onClick={() => handleUsabilityToggle(rating)}
                  variant={
                    (filters.usabilityRatings || []).includes(rating)
                      ? "filled"
                      : "outlined"
                  }
                  sx={{
                    backgroundColor: (filters.usabilityRatings || []).includes(
                      rating
                    )
                      ? PRIMARY_COLOR
                      : "transparent",
                    color: (filters.usabilityRatings || []).includes(rating)
                      ? "#fff"
                      : "#374151",
                    borderColor: "#d1d5db",
                    fontWeight: 500,
                    fontSize: "0.85rem",
                    height: 32,
                    "&:hover": {
                      backgroundColor: (filters.usabilityRatings || []).includes(
                        rating
                      )
                        ? PRIMARY_COLOR
                        : "#f3f4f6",
                    },
                  }}
                />
              ))}
            </Box>
          </Box>

          {/* Highly Voted For Section */}
          <Box sx={{ mb: 3 }}>
            <Typography
              sx={{
                fontSize: "0.85rem",
                fontWeight: 700,
                color: "#111827",
                textTransform: "uppercase",
                letterSpacing: "0.5px",
                mb: 1.5,
              }}
            >
              Highly Voted For
            </Typography>
            <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap" }}>
              {[
                "Learning",
                "Research",
                "Application",
                "Well-documented",
                "Well-maintained",
                "Clean data",
                "Original",
                "High-quality notebooks",
                "LLM Fine-Tuning",
              ].map((tag) => (
                <Chip
                  key={tag}
                  label={tag}
                  onClick={() => handleVotedForToggle(tag)}
                  variant={
                    (filters.votedFor || []).includes(tag)
                      ? "filled"
                      : "outlined"
                  }
                  sx={{
                    backgroundColor: (filters.votedFor || []).includes(tag)
                      ? PRIMARY_COLOR
                      : "transparent",
                    color: (filters.votedFor || []).includes(tag)
                      ? "#fff"
                      : "#374151",
                    borderColor: "#d1d5db",
                    fontWeight: 500,
                    fontSize: "0.85rem",
                    height: 32,
                    "&:hover": {
                      backgroundColor: (filters.votedFor || []).includes(tag)
                        ? PRIMARY_COLOR
                        : "#f3f4f6",
                    },
                  }}
                />
              ))}
            </Box>
          </Box>
        </Box>

        {/* Footer */}
        <Box
          sx={{
            p: 2.5,
            borderTop: `1px solid ${isDarkMode ? "#334155" : "#e5e7eb"}`,
            display: "flex",
            gap: 2,
            position: "sticky",
            bottom: 0,
            backgroundColor: isDarkMode ? "#1E293B" : "#fff",
            zIndex: 10,
          }}
        >
          <Button
            fullWidth
            onClick={onClear}
            sx={{
              backgroundColor: isDarkMode ? "#334155" : "#f3f4f6",
              color: isDarkMode ? "#CBD5E1" : "#374151",
              fontWeight: 600,
              fontSize: "0.95rem",
              textTransform: "none",
              py: 1.2,
              borderRadius: "8px",
              transition: "all 0.2s",
              "&:hover": {
                backgroundColor: isDarkMode ? "#475569" : "#e5e7eb",
              },
            }}
          >
            Clear
          </Button>
          <Button
            fullWidth
            onClick={onApply}
            sx={{
              backgroundColor: PRIMARY_COLOR,
              color: "#fff",
              fontWeight: 600,
              fontSize: "0.95rem",
              textTransform: "none",
              py: 1.2,
              borderRadius: "8px",
              transition: "all 0.2s",
              "&:hover": {
                backgroundColor: "#52b0ad",
              },
            }}
          >
            Apply
          </Button>
        </Box>
      </Box>
    </>
  );
}
