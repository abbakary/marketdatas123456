import { useRef, useState } from "react";
import { Box, Typography, Paper, Badge } from "@mui/material";
import { ChevronRight } from "lucide-react";
import { createPortal } from "react-dom";
import { useThemeColors } from "../../../utils/useThemeColors";

const PRIMARY_COLOR = "#61C5C3";

export const categoriesData = [
  {
    id: "computer-science",
    name: "Computer Science",
    icon: "💻",
    datasetCount: 7,
    subcategories: [
      { id: "data-science", name: "Data Science", datasetCount: 3 },
      { id: "ai", name: "Artificial Intelligence", datasetCount: 1 },
      { id: "cybersecurity", name: "Cybersecurity", datasetCount: 1 },
      { id: "ml", name: "Machine Learning", datasetCount: 1 },
      { id: "cv", name: "Computer Vision", datasetCount: 1 },
      { id: "nlp", name: "NLP", datasetCount: 1 },
    ],
  },
  {
    id: "agriculture",
    name: "Agriculture and Environment",
    icon: "🌾",
    datasetCount: 24,
    subcategories: [
      { id: "agriculture-sub", name: "Agriculture", datasetCount: 8 },
      { id: "fisheries", name: "Fisheries", datasetCount: 5 },
      { id: "forestry", name: "Forestry", datasetCount: 4 },
      { id: "environment", name: "Environment & Climate", datasetCount: 7 },
    ],
  },
  {
    id: "trade",
    name: "Trade and Industry",
    icon: "🏭",
    datasetCount: 18,
    subcategories: [
      { id: "trade-sub", name: "Trade & Commerce", datasetCount: 5 },
      { id: "import", name: "Import", datasetCount: 3 },
      { id: "export", name: "Export", datasetCount: 3 },
      { id: "manufacturing", name: "Manufacturing", datasetCount: 4 },
      { id: "industrial", name: "Industrial Development", datasetCount: 3 },
    ],
  },
  {
    id: "infrastructure",
    name: "Infrastructure and Transport",
    icon: "🚧",
    datasetCount: 22,
    subcategories: [
      { id: "air-transport", name: "Air Transport", datasetCount: 4 },
      { id: "marine-transport", name: "Marine Transport", datasetCount: 3 },
      { id: "land-transport", name: "Land Transport", datasetCount: 5 },
      { id: "public-transport", name: "Public Transport", datasetCount: 3 },
      { id: "logistics", name: "Logistics & Supply Chain", datasetCount: 4 },
      { id: "construction", name: "Construction", datasetCount: 3 },
    ],
  },
  {
    id: "social",
    name: "Social Services",
    icon: "🏥",
    datasetCount: 20,
    subcategories: [
      { id: "health", name: "Health", datasetCount: 6 },
      { id: "pharmaceuticals", name: "Pharmaceuticals", datasetCount: 3 },
      { id: "education", name: "Education", datasetCount: 5 },
      { id: "research", name: "Research & Innovation", datasetCount: 4 },
      { id: "sports", name: "Sports", datasetCount: 2 },
    ],
  },
  {
    id: "economics",
    name: "Economics",
    icon: "📊",
    datasetCount: 1,
    subcategories: [
      { id: "energy-econ", name: "Energy Economics", datasetCount: 1 },
    ],
  },
  {
    id: "entertainment",
    name: "Entertainment",
    icon: "🎬",
    datasetCount: 1,
    subcategories: [
      { id: "music", name: "Music Analytics", datasetCount: 1 },
    ],
  },
  {
    id: "healthcare",
    name: "Healthcare",
    icon: "⚕️",
    datasetCount: 1,
    subcategories: [
      { id: "medical-ai", name: "Medical AI", datasetCount: 1 },
    ],
  },
  {
    id: "ict",
    name: "ICT and Digital Economy",
    icon: "🖥️",
    datasetCount: 16,
    subcategories: [
      { id: "ict-telecom", name: "ICT / Telecommunications", datasetCount: 8 },
      { id: "digital-economy", name: "Digital Economy / Technology", datasetCount: 8 },
    ],
  },
  {
    id: "finance",
    name: "Finance and Investment",
    icon: "💰",
    datasetCount: 14,
    subcategories: [
      { id: "finance-banking", name: "Finance & Banking", datasetCount: 8 },
      { id: "insurance", name: "Insurance", datasetCount: 6 },
    ],
  },
  {
    id: "energy",
    name: "Natural Resources and Energy",
    icon: "⚡",
    datasetCount: 17,
    subcategories: [
      { id: "energy", name: "Energy (Electricity, Oil, Gas, Renewables)", datasetCount: 8 },
      { id: "mining", name: "Mining", datasetCount: 4 },
      { id: "natural-resources", name: "Natural Resources", datasetCount: 5 },
    ],
  },
  {
    id: "governance",
    name: "Governance and Public Sector",
    icon: "🏛️",
    datasetCount: 19,
    subcategories: [
      { id: "defense", name: "Defense", datasetCount: 3 },
      { id: "security", name: "Security / Police", datasetCount: 4 },
      { id: "justice", name: "Justice / Legal", datasetCount: 3 },
      { id: "public-admin", name: "Public Administration", datasetCount: 5 },
      { id: "local-government", name: "Local Government", datasetCount: 4 },
    ],
  },
  {
    id: "urban",
    name: "Urban Development and Housing",
    icon: "🏙️",
    datasetCount: 12,
    subcategories: [
      { id: "urban-dev", name: "Urban Development", datasetCount: 4 },
      { id: "real-estate", name: "Real Estate / Housing", datasetCount: 5 },
      { id: "rural-dev", name: "Rural Development", datasetCount: 3 },
    ],
  },
  {
    id: "tourism",
    name: "Tourism and Culture",
    icon: "🌍",
    datasetCount: 11,
    subcategories: [
      { id: "tourism-sub", name: "Tourism", datasetCount: 5 },
      { id: "hospitality", name: "Hospitality", datasetCount: 3 },
      { id: "culture", name: "Culture and Arts", datasetCount: 3 },
    ],
  },
];

export default function CategorySidebar({ onCategorySelect, selectedCategory }) {
  const themeColors = useThemeColors();
  const [hoveredCategoryId, setHoveredCategoryId] = useState(null);
  const [hoveredItemPosition, setHoveredItemPosition] = useState(null);
  const closeTimerRef = useRef(null);

  // Derived colors for selected/hover states
  const selectedBgColor = themeColors.isDarkMode ? "rgba(32, 178, 170, 0.15)" : "#e6f7f6";
  const hoverBgColor = themeColors.isDarkMode ? "rgba(32, 178, 170, 0.08)" : "#f0fffe";
  const submenuHoverBg = themeColors.isDarkMode ? "rgba(32, 178, 170, 0.06)" : "#f3fffe";

  const handleSelectCategory = (category) => {
    onCategorySelect({
      ...category,
      selectedSubcategory: null,
    });
  };

  const handleSelectSubcategory = (parentCategory, subcategory) => {
    onCategorySelect({
      ...parentCategory,
      selectedSubcategory: subcategory,
    });
  };

  const hoveredCategory = categoriesData.find(c => c.id === hoveredCategoryId);

  const clearCloseTimer = () => {
    if (closeTimerRef.current) {
      clearTimeout(closeTimerRef.current);
      closeTimerRef.current = null;
    }
  };

  const queueCloseMenu = () => {
    clearCloseTimer();
    closeTimerRef.current = setTimeout(() => {
      setHoveredCategoryId(null);
      setHoveredItemPosition(null);
    }, 180);
  };

  const getSubmenuPosition = () => {
    if (!hoveredItemPosition) return { left: 0, top: 0 };

    const menuWidth = 300;
    const viewportPadding = 12;
    const gap = 12;
    const triggerTop = hoveredItemPosition.top;
    const triggerRight = hoveredItemPosition.right;
    const triggerLeft = hoveredItemPosition.left;
    const itemHeight = hoveredItemPosition.height || 52;
    const subCount = hoveredCategory?.subcategories?.length || 0;
    const estimatedMenuHeight = Math.min(
      Math.max(120, subCount * 46 + 26),
      window.innerHeight - viewportPadding * 2
    );

    const placeLeft = triggerRight + gap + menuWidth > window.innerWidth - viewportPadding;
    let left = placeLeft
      ? triggerLeft - menuWidth - gap
      : triggerRight + gap;

    // Keep submenu aligned to hovered category row.
    let top = triggerTop - Math.max(0, (estimatedMenuHeight - itemHeight) * 0.04);
    const maxTop = window.innerHeight - estimatedMenuHeight - viewportPadding;
    if (top > maxTop) top = maxTop;
    if (top < viewportPadding) top = viewportPadding;
    if (left < viewportPadding) left = viewportPadding;

    return { left, top };
  };

  const submenuPosition = getSubmenuPosition();

  return (
    <Box
      sx={{
        width: {
          xs: "100%",
          md: 320,
        },
        pr: {
          xs: 0,
          md: 1.5,
        },
        mb: {
          xs: 3,
          md: 0,
        },
        alignSelf: "start",
        top: { md: 12 },
        position: { xs: "relative", md: "sticky" },
      }}
    >
      <Paper
        elevation={0}
        sx={{
          backgroundColor: "var(--card-bg)",
          border: "1px solid var(--border-color)",
          borderRadius: "12px",
          overflow: "visible",
          position: "relative",
          transition: "background-color 0.3s ease, border-color 0.3s ease",
        }}
      >
        <Box sx={{ p: 3 }}>
          <Typography
            sx={{
              fontSize: "1.5rem",
              fontWeight: 900,
              background: "linear-gradient(135deg, #61C5C3 0%, #8b5cf6 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
              mb: 2.5,
              transition: "all 0.3s ease",
            }}
          >
            Categories
          </Typography>
        </Box>

        <Box
          sx={{
            overflowX: "visible",
            maxHeight: "calc(100vh - 180px)",
            overflowY: "auto",
            "&::-webkit-scrollbar": {
              width: "6px",
            },
            "&::-webkit-scrollbar-track": {
              background: "transparent",
            },
            "&::-webkit-scrollbar-thumb": {
              background: "var(--text-muted)",
              borderRadius: "3px",
              opacity: 0.4,
            },
            "&::-webkit-scrollbar-thumb:hover": {
              opacity: 0.6,
            },
          }}
        >
          {categoriesData.map((category, idx) => {
            const isSelected =
              selectedCategory?.id === category.id &&
              !selectedCategory?.selectedSubcategory;
            const isHovered = hoveredCategoryId === category.id;

            return (
              <Box key={category.id}>
                <Box
                  onMouseEnter={(e) => {
                    clearCloseTimer();
                    setHoveredCategoryId(category.id);
                    setHoveredItemPosition(e.currentTarget.getBoundingClientRect());
                  }}
                  onMouseLeave={queueCloseMenu}
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 1.5,
                    px: 2.5,
                    py: 1.2,
                    cursor: "pointer",
                    backgroundColor: isSelected ? selectedBgColor : "transparent",
                    borderLeft: isSelected
                      ? `5px solid ${PRIMARY_COLOR}`
                      : "5px solid transparent",
                    transition: "all 0.25s cubic-bezier(0.34, 1.56, 0.64, 1)",
                    "&:hover": {
                      backgroundColor: hoverBgColor,
                      transform: "translateX(4px)",
                      borderLeftColor: isSelected ? PRIMARY_COLOR : "#8b5cf6",
                    },
                  }}
                  onClick={() => handleSelectCategory(category)}
                >
                  <Typography sx={{ fontSize: "1.6rem", flexShrink: 0 }}>
                    {category.icon}
                  </Typography>

                  <Box sx={{ flex: 1, minWidth: 0 }}>
                    <Typography
                      sx={{
                        fontSize: "0.95rem",
                        fontWeight: 800,
                        color: isSelected ? PRIMARY_COLOR : "var(--text-dark)",
                        transition: "color 0.2s ease",
                        letterSpacing: "0.3px",
                      }}
                    >
                      {category.name}
                    </Typography>
                    <Typography
                      sx={{
                        fontSize: "0.8rem",
                        color: isSelected ? PRIMARY_COLOR : "var(--text-muted)",
                        mt: 0.3,
                        fontWeight: 600,
                        transition: "color 0.3s ease",
                      }}
                    >
                      {category.datasetCount} datasets
                    </Typography>
                  </Box>

                  <ChevronRight
                    size={20}
                    style={{
                      color: isSelected ? PRIMARY_COLOR : "#8b5cf6",
                      flexShrink: 0,
                      transition: "color 0.2s ease, transform 0.2s ease",
                    }}
                  />
                </Box>

                {idx < categoriesData.length - 1 && (
                  <Box
                    sx={{
                      mx: 2.5,
                      borderBottom: themeColors.isDarkMode
                        ? `1px solid rgba(97, 197, 195, 0.22)`
                        : `1px solid rgba(97, 197, 195, 0.35)`,
                      opacity: 1,
                    }}
                  />
                )}
              </Box>
            );
          })}
        </Box>

        {/* Hover Submenu - Rendered at Paper level */}
        {hoveredCategory &&
          createPortal(
            <Box
              onMouseEnter={() => {
                clearCloseTimer();
                setHoveredCategoryId(hoveredCategory.id);
              }}
              onMouseLeave={queueCloseMenu}
              sx={{
                position: "fixed",
                left: submenuPosition.left,
                top: submenuPosition.top,
                minWidth: 280,
                maxWidth: 320,
                maxHeight: "calc(100vh - 24px)",
                backgroundColor: "var(--card-bg)",
                border: `1px solid var(--border-color)`,
                borderRadius: "12px",
                boxShadow: themeColors.isDarkMode ? "0 8px 24px rgba(0, 0, 0, 0.4)" : "0 8px 24px rgba(0, 0, 0, 0.1)",
                zIndex: 20000,
                py: 1.2,
                px: 0.5,
                overflowY: "auto",
                overscrollBehavior: "contain",
                animation: "fadeIn 0.2s ease-in-out",
                transition: "background-color 0.3s ease, border-color 0.3s ease",
                "@keyframes fadeIn": {
                  from: {
                    opacity: 0,
                    transform: "translateX(-8px)",
                  },
                  to: {
                    opacity: 1,
                    transform: "translateX(0)",
                  },
                },
              }}
            >
              {hoveredCategory.subcategories.map((subcategory) => {
                const isSubSelected =
                  selectedCategory?.selectedSubcategory?.id ===
                  subcategory.id;

                return (
                  <Box
                    key={subcategory.id}
                    onClick={() =>
                      handleSelectSubcategory(hoveredCategory, subcategory)
                    }
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: 1.2,
                      px: 2.5,
                      py: 1.3,
                      cursor: "pointer",
                      backgroundColor: isSubSelected
                        ? selectedBgColor
                        : "transparent",
                      color: isSubSelected ? PRIMARY_COLOR : "var(--text-muted)",
                      transition: "all 0.15s ease",
                      borderRadius: "8px",
                      mx: 1,
                      "&:hover": {
                        backgroundColor: submenuHoverBg,
                      },
                    }}
                  >
                    <Typography
                      sx={{
                        fontSize: "0.95rem",
                        fontWeight: isSubSelected ? 600 : 500,
                        flex: 1,
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        whiteSpace: "nowrap",
                        color: "inherit",
                      }}
                    >
                      {subcategory.name}
                    </Typography>
                    <Badge
                      badgeContent={subcategory.datasetCount}
                      sx={{
                        "& .MuiBadge-badge": {
                          backgroundColor: isSubSelected
                            ? PRIMARY_COLOR
                            : "#d1d5db",
                          color: isSubSelected ? "#fff" : "#374151",
                          fontSize: "0.7rem",
                          height: 20,
                          minWidth: 20,
                          padding: "0 4px",
                          fontWeight: 700,
                        },
                      }}
                    />
                  </Box>
                );
              })}
            </Box>,
            document.body
          )}
      </Paper>
    </Box>
  );
}
