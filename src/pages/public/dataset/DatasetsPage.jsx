import { useState, useEffect, useMemo, useRef } from "react";
import { useNavigate } from "react-router-dom";
import {
  Typography,
  Card,
  CardContent,
  TextField,
  Box,
  IconButton,
  InputAdornment,
  Chip,
  Select,
  MenuItem,
  Zoom,
} from "@mui/material";
import {
  Search,
  SlidersHorizontal,
  TrendingUp,
  MoreVertical,
  ChevronUp,
  Calendar,
  FileIcon,
  HardDrive,
  Download,
  X,
  Grid3x3,
  List,
  ChevronDown,
} from "lucide-react";
import PageLayout from "../components/PageLayout";
import CategorySidebar, { categoriesData } from "../components/CategorySidebar";
import FiltersPanel from "../components/FiltersPanel";
import { useThemeColors } from "../../../utils/useThemeColors";

const PRIMARY_COLOR = "#61C5C3";

export default function DatasetsPage() {
  const themeColors = useThemeColors();

  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [isFiltersPanelOpen, setIsFiltersPanelOpen] = useState(false);
  const [viewType, setViewType] = useState("grid"); // "grid" or "list"
  const [sortBy, setSortBy] = useState("hotness"); // sorting option
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [filters, setFilters] = useState({
    tagSearch: "",
    minSize: "",
    maxSize: "",
    countries: [],
    licenses: [],
    usabilityRatings: [],
    votedFor: [],
  });
  const [appliedFilters, setAppliedFilters] = useState({ ...filters });
  const [loadedCount, setLoadedCount] = useState(12); // Number of datasets initially loaded
  const [showBackToTop, setShowBackToTop] = useState(false);
  const itemsPerLoad = 12; // Number of datasets to load per "Load more" click
  const loadMoreRef = useRef(null); // Reference for Intersection Observer
  const datasetsTopRef = useRef(null);

  const recentQueries = [
    "Social Media Impact on Teen Mental Health",
    "How AI is Changing Student Life",
    "E-Commerce Behavior Analysis",
    "Machine Learning Models",
    "Data Science Trends 2024",
  ];

  const recentlyViewed = [
    {
      title: "Social Media Impact on Teen Mental Health",
      subtitle: "Analysis of social media effects on adolescent mental wellbeing and psychological health outcomes",
      image: "https://images.unsplash.com/photo-1552820728-8ac41f1ce891?auto=format&fit=crop&w=100&q=80",
    },
    {
      title: "How AI is Changing Student Life",
      subtitle: "Comprehensive study on AI adoption in educational institutions and student learning patterns",
      image: "https://images.unsplash.com/photo-1556228578-8c89e6adf883?auto=format&fit=crop&w=100&q=80",
    },
    {
      title: "E-Commerce Behavior Dataset",
      subtitle: "Consumer behavior analysis and purchasing patterns in online retail environments",
      image: "https://images.unsplash.com/photo-1460925895917-adf4e5d1baaa?auto=format&fit=crop&w=100&q=80",
    },
  ];

  const relatedTags = [
    "machine learning",
    "neural networks",
    "data analysis",
    "computer vision",
    "NLP",
    "deep learning",
    "artificial intelligence",
    "predictive modeling"
  ];

  const sortOptions = [
    { value: "hotness", label: "Hotness" },
    { value: "most-voted", label: "Most Votes" },
    { value: "new", label: "New" },
    { value: "updated", label: "Updated" },
    { value: "visibility", label: "Visibility" },
    { value: "most-downloaded", label: "Most Downloaded" },
    { value: "most-notebooks", label: "Most Notebooks" },
  ];

  // Comprehensive demo datasets for all categories and subcategories
  const generateDemoDatasets = () => {
    const datasetTemplates = [
      { title: "Comprehensive Analysis and Trends", votes: 38, downloads: "1,035", usability: "10.0" },
      { title: "Data Patterns and Insights Report", votes: 43, downloads: "1,464", usability: "10.0" },
      { title: "Behavioral Analysis and Modeling", votes: 49, downloads: "1,621", usability: "10.0" },
      { title: "Predictive Models and Forecasting", votes: 35, downloads: "892", usability: "9.8" },
      { title: "Classification and Clustering Study", votes: 52, downloads: "2,156", usability: "10.0" },
      { title: "Sentiment Analysis and NLP Pipeline", votes: 28, downloads: "418", usability: "9.5" },
      { title: "Feature Engineering and Selection", votes: 41, downloads: "742", usability: "10.0" },
      { title: "Time Series Analysis Dataset", votes: 67, downloads: "3,214", usability: "9.9" },
      { title: "Statistical Analysis and Correlations", votes: 45, downloads: "892", usability: "9.7" },
      { title: "Performance Optimization Study", votes: 54, downloads: "1,543", usability: "9.8" },
    ];

    const authors = [
      "Muhammad Shahzad", "Tanzeela Aftab", "Asif Zaman", "Ahmed Khan", "Kanchana1990",
      "Eman Fatima", "Mansehaj Preet", "Dr. Sarah Chen", "Alex Rodriguez", "Emma Thompson",
      "Dr. Michael Hassan", "Robert Chen", "Sarah Johnson", "David Kumar", "Emily Wilson",
    ];

    const countries = [
      "United States", "Canada", "United Kingdom", "India", "Australia",
      "Germany", "France", "Japan", "Brazil", "Nigeria",
      "Mexico", "South Africa", "Singapore", "China", "Netherlands",
    ];

    const images = [
      "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1614680376573-df3480f0c6ff?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1516110833967-0b5442fabffd?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1505228395891-9a51e7e86e81?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1460925895917-adf4e5d1baaa?auto=format&fit=crop&w=900&q=80",
    ];

    const categorySubcategoryMap = [
      { category: "Computer Science", subcategories: ["Data Science", "Artificial Intelligence", "Cybersecurity", "Machine Learning", "Computer Vision", "NLP"] },
      { category: "Agriculture and Environment", subcategories: ["Agriculture", "Fisheries", "Forestry", "Environment & Climate"] },
      { category: "Trade and Industry", subcategories: ["Trade & Commerce", "Import", "Export", "Manufacturing", "Industrial Development"] },
      { category: "Infrastructure and Transport", subcategories: ["Air Transport", "Marine Transport", "Land Transport", "Public Transport", "Logistics & Supply Chain", "Construction"] },
      { category: "Social Services", subcategories: ["Health", "Pharmaceuticals", "Education", "Research & Innovation", "Sports"] },
      { category: "Economics", subcategories: ["Energy Economics"] },
      { category: "Entertainment", subcategories: ["Music Analytics"] },
      { category: "Healthcare", subcategories: ["Medical AI"] },
      { category: "ICT and Digital Economy", subcategories: ["ICT / Telecommunications", "Digital Economy / Technology"] },
      { category: "Finance and Investment", subcategories: ["Finance & Banking", "Insurance"] },
      { category: "Natural Resources and Energy", subcategories: ["Energy (Electricity, Oil, Gas, Renewables)", "Mining", "Natural Resources"] },
      { category: "Governance and Public Sector", subcategories: ["Defense", "Security / Police", "Justice / Legal", "Public Administration", "Local Government"] },
      { category: "Urban Development and Housing", subcategories: ["Urban Development", "Real Estate / Housing", "Rural Development"] },
      { category: "Tourism and Culture", subcategories: ["Tourism", "Hospitality", "Culture and Arts"] },
    ];

    let id = 1;
    const datasets = [];

    categorySubcategoryMap.forEach(({ category, subcategories }) => {
      subcategories.forEach((subcategory) => {
        for (let i = 0; i < 6; i++) {
          const template = datasetTemplates[(id - 1) % datasetTemplates.length];
          const author = authors[(id - 1) % authors.length];
          const image = images[(id - 1) % images.length];

          datasets.push({
            id,
            title: `${template.title} - ${subcategory}`,
            author,
            category,
            subcategory,
            country: countries[id % countries.length],
            usability: template.usability,
            updated: `Updated ${(id % 30) + 1} days ago`,
            files: `${((id % 5) + 1)} File${((id % 5) + 1) > 1 ? "s" : ""} (CSV)`,
            size: `${(id * 47) % 500 + 10} kB`,
            downloads: `${parseInt(template.downloads.replace(/,/g, "")) + (id * 100)} downloads`,
            votes: template.votes + id,
            notebooks: (id % 15) + 1,
            image,
            price: ((id * 19) % 500 + 10).toFixed(2), // Price in USD
            trend: `+${(id % 30) + 5}%`,
            trendUp: true,
            avatars: [
              `https://i.pravatar.cc/40?img=${(id % 150) + 1}`,
              `https://i.pravatar.cc/40?img=${((id + 1) % 150) + 1}`,
            ],
          });
          id++;
        }
      });
    });

    return datasets;
  };

  // Generate once (theme toggles shouldn't regenerate thousands of rows)
  const trendingDatasets = useMemo(() => generateDemoDatasets(), []);

  // Reset loaded count when search, category, or sorting changes
  useEffect(() => {
    setLoadedCount(itemsPerLoad);
  }, [search, selectedCategory, sortBy, appliedFilters]);

  const handleLoadMore = () => {
    setLoadedCount((prev) => prev + itemsPerLoad);
  };

  const handleApplyFilters = () => {
    setAppliedFilters({ ...filters });
    setIsFiltersPanelOpen(false);
  };

  const handleClearFilters = () => {
    const clearedFilters = {
      tagSearch: "",
      minSize: "",
      maxSize: "",
      countries: [],
      licenses: [],
      usabilityRatings: [],
      votedFor: [],
    };
    setFilters(clearedFilters);
    setAppliedFilters(clearedFilters);
  };

  const filteredDatasets = trendingDatasets
    .filter((dataset) => {
      const matchesSearch =
        dataset.title.toLowerCase().includes(search.toLowerCase()) ||
        dataset.author.toLowerCase().includes(search.toLowerCase());

      if (!matchesSearch) return false;

      // If no category is selected, show all datasets
      if (!selectedCategory) {
        // Apply country filter
        if (appliedFilters.countries.length > 0) {
          return appliedFilters.countries.includes(dataset.country);
        }
        return true;
      }

      // If a specific subcategory is selected, match by subcategory
      if (selectedCategory.selectedSubcategory) {
        const matchesCategory =
          dataset.category === selectedCategory.name &&
          dataset.subcategory === selectedCategory.selectedSubcategory.name;

        if (!matchesCategory) return false;

        // Apply country filter
        if (appliedFilters.countries.length > 0) {
          return appliedFilters.countries.includes(dataset.country);
        }
        return true;
      }

      // If only main category is selected, match by category
      const matchesCategory = dataset.category === selectedCategory.name;

      if (!matchesCategory) return false;

      // Apply country filter
      if (appliedFilters.countries.length > 0) {
        return appliedFilters.countries.includes(dataset.country);
      }
      return true;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case "most-voted":
          return b.votes - a.votes;
        case "most-downloaded": {
          const aDownloads = parseInt(a.downloads.replace(/,/g, ""));
          const bDownloads = parseInt(b.downloads.replace(/,/g, ""));
          return bDownloads - aDownloads;
        }
        case "visibility":
          return parseFloat(b.usability) - parseFloat(a.usability);
        case "new":
          return b.id - a.id;
        case "updated":
          return a.id - b.id;
        case "most-notebooks":
          return (b.notebooks || 0) - (a.notebooks || 0);
        case "hotness":
        default:
          const heatA = a.votes * parseFloat(a.usability);
          const heatB = b.votes * parseFloat(b.usability);
          return heatB - heatA;
      }
    });

  // Intersection Observer for infinite scroll
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        // When the load more button comes into view, automatically load more
        if (entries[0].isIntersecting && loadedCount < filteredDatasets.length) {
          setLoadedCount((prev) => prev + itemsPerLoad);
        }
      },
      {
        root: null,
        rootMargin: "100px", // Start loading 100px before element comes into view
        threshold: 0.1,
      }
    );

    if (loadMoreRef.current) {
      observer.observe(loadMoreRef.current);
    }

    return () => {
      if (loadMoreRef.current) {
        observer.unobserve(loadMoreRef.current);
      }
    };
  }, [loadedCount, filteredDatasets.length]);

  useEffect(() => {
    const onScroll = () => {
      setShowBackToTop(window.scrollY > 380);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleBackToTop = () => {
    if (datasetsTopRef.current) {
      datasetsTopRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
      return;
    }
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <PageLayout>
      <Box
        sx={{
          minHeight: "100vh",
          backgroundColor: themeColors.bg,
          py: 4,
          position: "relative",
          transition: "background-color 0.3s ease",
        }}
      >
        <Box
          ref={datasetsTopRef}
          sx={{
            position: "relative",
            width: "100%",
            px: { xs: 2, md: 3, lg: 4 },
          }}
        >
          {/* Search Bar with Dynamic Placeholder */}
          <Box sx={{ mb: 3, position: "relative" }}>
            {(() => {
              let placeholderText = "Search datasets";
              let datasetCount = trendingDatasets.length;

              if (selectedCategory?.selectedSubcategory) {
                const filtered = trendingDatasets.filter(
                  (d) =>
                    d.category === selectedCategory.name &&
                    d.subcategory === selectedCategory.selectedSubcategory.name
                );
                datasetCount = filtered.length;
                placeholderText = `Search ${datasetCount} dataset${datasetCount !== 1 ? "s" : ""}`;
              } else if (selectedCategory) {
                const filtered = trendingDatasets.filter(
                  (d) => d.category === selectedCategory.name
                );
                datasetCount = filtered.length;
                placeholderText = `Search ${datasetCount} dataset${datasetCount !== 1 ? "s" : ""}`;
              }

              return (
                <TextField
                  fullWidth
                  placeholder={placeholderText}
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  onFocus={() => setIsSearchFocused(true)}
                  onBlur={() => setTimeout(() => setIsSearchFocused(false), 200)}
                  variant="outlined"
                  sx={{
                    backgroundColor: themeColors.card,
                    borderRadius: "10px",
                    transition: "background-color 0.3s ease",
                    "& .MuiOutlinedInput-root": {
                      borderRadius: "10px",
                      height: 50,
                      fontSize: "0.95rem",
                    },
                  }}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Search size={20} color={themeColors.text} />
                      </InputAdornment>
                    ),
                    endAdornment: (
                      <InputAdornment position="end">
                        <Box
                          onClick={() => setIsFiltersPanelOpen(true)}
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            gap: 1,
                            fontWeight: 600,
                            color: PRIMARY_COLOR,
                            cursor: "pointer",
                            transition: "opacity 0.2s",
                            "&:hover": {
                              opacity: 0.8,
                            },
                          }}
                        >
                          <SlidersHorizontal size={18} />
                          <Typography
                            fontWeight={600}
                            sx={{ fontSize: "0.9rem", color: PRIMARY_COLOR }}
                          >
                            Filters
                          </Typography>
                        </Box>
                      </InputAdornment>
                    ),
                  }}
                />
              );
            })()}

            {/* Search Dropdown */}
            {isSearchFocused && (
              <Box
                sx={{
                  position: "absolute",
                  top: "calc(100% + 8px)",
                  left: 0,
                  right: 0,
                  backgroundColor: themeColors.card,
                  border: `1px solid ${themeColors.border}`,
                  borderRadius: "12px",
                  boxShadow: themeColors.isDarkMode ? "0 8px 24px rgba(0, 0, 0, 0.3)" : "0 8px 24px rgba(0, 0, 0, 0.1)",
                  zIndex: 100,
                  overflow: "hidden",
                  transition: "background-color 0.3s ease",
                }}
              >
                {/* Recent Queries */}
                <Box sx={{ borderBottom: `1px solid ${themeColors.border}` }}>
                  <Typography
                    sx={{
                      px: 2.5,
                      pt: 2,
                      pb: 1,
                      fontSize: "0.85rem",
                      fontWeight: 700,
                      color: themeColors.textMuted,
                      textTransform: "uppercase",
                      letterSpacing: "0.5px",
                    }}
                  >
                    Recent Queries
                  </Typography>
                  {recentQueries.map((query, idx) => (
                    <Box
                      key={idx}
                      onClick={() => setSearch(query)}
                      sx={{
                        px: 2.5,
                        py: 1.2,
                        display: "flex",
                        alignItems: "center",
                        gap: 1.5,
                        cursor: "pointer",
                        transition: "background-color 0.2s",
                        "&:hover": {
                          backgroundColor: themeColors.hoverBg,
                        },
                      }}
                    >
                      <Box sx={{ fontSize: "1rem" }}>⏱️</Box>
                      <Typography sx={{ fontSize: "0.9rem", color: themeColors.text }}>
                        {query}
                      </Typography>
                    </Box>
                  ))}
                </Box>

                {/* Recently Viewed */}
                <Box sx={{ borderBottom: `1px solid ${themeColors.border}` }}>
                  <Typography
                    sx={{
                      px: 2.5,
                      pt: 2,
                      pb: 1,
                      fontSize: "0.85rem",
                      fontWeight: 700,
                      color: themeColors.textMuted,
                      textTransform: "uppercase",
                      letterSpacing: "0.5px",
                    }}
                  >
                    Recently Viewed
                  </Typography>
                  {recentlyViewed.map((item, idx) => (
                    <Box
                      key={idx}
                      sx={{
                        px: 2.5,
                        py: 1.5,
                        display: "flex",
                        gap: 1.5,
                        cursor: "pointer",
                        transition: "background-color 0.2s",
                        "&:hover": {
                          backgroundColor: themeColors.hoverBg,
                        },
                      }}
                    >
                      <Box
                        sx={{
                          width: 50,
                          height: 50,
                          borderRadius: "8px",
                          backgroundImage: `url(${item.image})`,
                          backgroundSize: "cover",
                          backgroundPosition: "center",
                          flexShrink: 0,
                        }}
                      />
                      <Box sx={{ flex: 1, minWidth: 0 }}>
                        <Typography
                          sx={{
                            fontSize: "0.9rem",
                            fontWeight: 600,
                            color: themeColors.text,
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            whiteSpace: "nowrap",
                          }}
                        >
                          {item.title}
                        </Typography>
                        <Typography
                          sx={{
                            fontSize: "0.8rem",
                            color: themeColors.textMuted,
                            mt: 0.3,
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            whiteSpace: "nowrap",
                          }}
                        >
                          {item.subtitle}
                        </Typography>
                      </Box>
                    </Box>
                  ))}
                </Box>

                {/* Related Tags */}
                <Box sx={{ p: 2.5 }}>
                  <Typography
                    sx={{
                      fontSize: "0.85rem",
                      fontWeight: 700,
                      color: themeColors.textMuted,
                      textTransform: "uppercase",
                      letterSpacing: "0.5px",
                      mb: 1,
                    }}
                  >
                    Related Tags
                  </Typography>
                  <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap" }}>
                    {relatedTags.map(
                      (tag) => (
                        <Chip
                          key={tag}
                          label={tag}
                          size="small"
                          onClick={() => setSearch(tag)}
                          sx={{
                            backgroundColor: themeColors.bgSecondary,
                            color: themeColors.text,
                            fontSize: "0.8rem",
                            height: 28,
                            "&:hover": {
                              backgroundColor: themeColors.hoverBg,
                              cursor: "pointer",
                            },
                          }}
                        />
                      )
                    )}
                  </Box>
                </Box>
              </Box>
            )}
          </Box>

          {/* Main Content Grid */}
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: {
                xs: "1fr",
                md: "300px minmax(0, 1fr)",
              },
              gap: { xs: 2, md: 5 },
              position: "relative",
              alignItems: "start",
            }}
          >
            {/* Sidebar */}
            <CategorySidebar
              selectedCategory={selectedCategory}
              onCategorySelect={setSelectedCategory}
            />

            {/* Main Content */}
            <Box sx={{ pl: { md: 1 } }}>
              {/* Header with Trending Datasets Title */}
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  mb: 3,
                  gap: 2,
                  flexWrap: "wrap",
                }}
              >
                <Box sx={{ display: "flex", alignItems: "center", gap: 1.2 }}>
                  <TrendingUp size={24} color={themeColors.text} strokeWidth={2.5} />
                  <Typography
                    sx={{
                      fontSize: "1.1rem",
                      fontWeight: 700,
                      color: themeColors.text,
                    }}
                  >
                    Trending Datasets
                  </Typography>
                </Box>

                {/* Sorting + view controls (always visible) */}
                <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                  <Select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: 1,
                      px: 1.5,
                      py: 0.8,
                      backgroundColor: themeColors.bgSecondary,
                      borderRadius: "8px",
                      cursor: "pointer",
                      border: `1px solid ${themeColors.border}`,
                      fontSize: "0.9rem",
                      fontWeight: 600,
                      color: themeColors.text,
                      transition: "all 0.2s",
                      minWidth: "140px",
                      height: 40,
                      "& .MuiOutlinedInput-notchedOutline": { border: "none" },
                      "&:hover": { backgroundColor: themeColors.hoverBg },
                      "&.Mui-focused": { backgroundColor: themeColors.hoverBg, outline: "none" },
                      "& .MuiSvgIcon-root": { color: themeColors.textMuted },
                    }}
                  >
                    {sortOptions.map((option) => (
                      <MenuItem key={option.value} value={option.value}>
                        {option.label}
                      </MenuItem>
                    ))}
                  </Select>

                  <Box
                    sx={{
                      display: "flex",
                      gap: 0.5,
                      backgroundColor: themeColors.bgSecondary,
                      borderRadius: "8px",
                      padding: "4px",
                      border: `1px solid ${themeColors.border}`,
                    }}
                  >
                    <Box
                      onClick={() => setViewType("grid")}
                      sx={{
                        p: 0.8,
                        borderRadius: "6px",
                        backgroundColor: viewType === "grid" ? themeColors.card : "transparent",
                        border: viewType === "grid" ? `1px solid ${themeColors.border}` : "none",
                        cursor: "pointer",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        transition: "all 0.2s",
                        "&:hover": { backgroundColor: themeColors.hoverBg },
                      }}
                      title="Grid View"
                    >
                      <Grid3x3 size={18} color={viewType === "grid" ? PRIMARY_COLOR : themeColors.textMuted} />
                    </Box>
                    <Box
                      onClick={() => setViewType("list")}
                      sx={{
                        p: 0.8,
                        borderRadius: "6px",
                        backgroundColor: viewType === "list" ? themeColors.card : "transparent",
                        border: viewType === "list" ? `1px solid ${themeColors.border}` : "none",
                        cursor: "pointer",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        transition: "all 0.2s",
                        "&:hover": { backgroundColor: themeColors.hoverBg },
                      }}
                      title="List View"
                    >
                      <List size={18} color={viewType === "list" ? PRIMARY_COLOR : themeColors.textMuted} />
                    </Box>
                  </Box>
                </Box>
              </Box>

              {/* Category  Row - Always show with "All Datasets" visible by default */}
              <Box
                sx={{
                  display: "flex",
                  gap: 1.2,
                  flexWrap: "wrap",
                  mb: 4,
                  alignItems: "center",
                }}
              >
                {/* "All Datasets" row - Always visible */}
                <Chip
                  label="All Datasets"
                  onClick={() => setSelectedCategory(null)}
                  variant={!selectedCategory ? "filled" : "outlined"}
                  sx={{
                    borderRadius: "6px",
                    fontSize: "0.85rem",
                    height: 32,
                    px: 1.5,
                    backgroundColor: !selectedCategory ? PRIMARY_COLOR : themeColors.card,
                    color: !selectedCategory ? "#fff" : themeColors.text,
                    borderColor: themeColors.border,
                    fontWeight: 600,
                    "&:hover": {
                      backgroundColor: !selectedCategory
                        ? PRIMARY_COLOR
                        : themeColors.hoverBg,
                    },
                  }}
                />

                {/* Main Category row - Shows when category is selected */}
                {selectedCategory && (
                  <Chip
                    label={selectedCategory.name}
                    onClick={() => {
                      setSelectedCategory({
                        ...selectedCategory,
                        selectedSubcategory: null,
                      });
                    }}
                    variant={
                      selectedCategory && !selectedCategory.selectedSubcategory
                        ? "filled"
                        : "outlined"
                    }
                    onDelete={() => setSelectedCategory(null)}
                    deleteIcon={<X size={14} />}
                    sx={{
                      borderRadius: "6px",
                      fontSize: "0.85rem",
                      height: 32,
                      px: 1.5,
                      backgroundColor:
                        selectedCategory && !selectedCategory.selectedSubcategory
                          ? PRIMARY_COLOR
                          : themeColors.card,
                      color:
                        selectedCategory && !selectedCategory.selectedSubcategory
                          ? "#fff"
                          : themeColors.text,
                      borderColor: themeColors.border,
                      fontWeight: 600,
                      "&:hover": {
                        backgroundColor:
                          selectedCategory &&
                          !selectedCategory.selectedSubcategory
                            ? PRIMARY_COLOR
                            : themeColors.hoverBg,
                      },
                    }}
                  />
                )}

                {/* Subcategory rows - Dynamically appear when category is selected */}
                {selectedCategory &&
                  selectedCategory.subcategories &&
                  selectedCategory.subcategories.map((subcategory) => (
                    <Chip
                      key={subcategory.id}
                      label={subcategory.name}
                      onClick={() => {
                        setSelectedCategory({
                          ...selectedCategory,
                          selectedSubcategory: subcategory,
                        });
                      }}
                      variant={
                        selectedCategory.selectedSubcategory?.id ===
                        subcategory.id
                          ? "filled"
                          : "outlined"
                      }
                      onDelete={
                        selectedCategory.selectedSubcategory?.id ===
                        subcategory.id
                          ? () => {
                              setSelectedCategory({
                                ...selectedCategory,
                                selectedSubcategory: null,
                              });
                            }
                          : undefined
                      }
                      deleteIcon={
                        selectedCategory.selectedSubcategory?.id ===
                        subcategory.id ? (
                          <X size={14} />
                        ) : undefined
                      }
                      sx={{
                        borderRadius: "6px",
                        fontSize: "0.85rem",
                        height: 32,
                        px: 1.5,
                        backgroundColor:
                          selectedCategory.selectedSubcategory?.id ===
                          subcategory.id
                            ? PRIMARY_COLOR
                            : themeColors.card,
                        color:
                          selectedCategory.selectedSubcategory?.id ===
                          subcategory.id
                            ? "#fff"
                            : themeColors.text,
                        borderColor: themeColors.border,
                        fontWeight: 500,
                        "&:hover": {
                          backgroundColor:
                            selectedCategory.selectedSubcategory?.id ===
                            subcategory.id
                              ? PRIMARY_COLOR
                              : themeColors.hoverBg,
                        },
                      }}
                    />
                  ))}
              </Box>

              {/* Datasets Grid/List */}
              <Box
                sx={{
                  display: viewType === "grid" ? "grid" : "flex",
                  gridTemplateColumns:
                    viewType === "grid"
                      ? {
                          xs: "1fr",
                          sm: "repeat(2, 1fr)",
                          lg: "repeat(3, 1fr)",
                        }
                      : undefined,
                  flexDirection: viewType === "list" ? "column" : undefined,
                  gap: 3,
                }}
              >
                {filteredDatasets.length > 0 ? (
                  filteredDatasets.slice(0, loadedCount).map((dataset) => (
                    <DatasetCard
                      key={dataset.id}
                      dataset={dataset}
                      viewType={viewType}
                    />
                  ))
                ) : (
                  <Box
                    sx={{
                      gridColumn: viewType === "grid" ? "1 / -1" : undefined,
                      textAlign: "center",
                      py: 6,
                      width: "100%",
                    }}
                  >
                    <Typography
                      sx={{
                        fontSize: "1rem",
                        color: themeColors.textMuted,
                        fontWeight: 500,
                      }}
                    >
                      No datasets found in this category
                    </Typography>
                  </Box>
                )}
              </Box>

              {/* Load More Button */}
              {filteredDatasets.length > loadedCount && (
                <Box
                  ref={loadMoreRef}
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    mt: 5,
                    mb: 2,
                  }}
                >
                  <Box
                    onClick={handleLoadMore}
                    sx={{
                      px: 3.5,
                      py: 1.2,
                      backgroundColor: PRIMARY_COLOR,
                      color: "#fff",
                      borderRadius: "8px",
                      fontWeight: 600,
                      fontSize: "0.95rem",
                      cursor: "pointer",
                      transition: "all 0.2s ease",
                      border: `2px solid ${PRIMARY_COLOR}`,
                      "&:hover": {
                        backgroundColor: "#50ada8",
                        transform: "translateY(-2px)",
                        boxShadow: "0 6px 16px rgba(97, 197, 195, 0.2)",
                      },
                      "&:active": {
                        transform: "translateY(0)",
                      },
                    }}
                  >
                    Load More
                  </Box>
                </Box>
              )}
            </Box>
          </Box>
        </Box>
      </Box>

      {/* Filters Panel */}
      <FiltersPanel
        isOpen={isFiltersPanelOpen}
        onClose={() => setIsFiltersPanelOpen(false)}
        filters={filters}
        onFiltersChange={setFilters}
        onApply={handleApplyFilters}
        onClear={handleClearFilters}
      />

      <Zoom in={showBackToTop}>
        <Box
          onClick={handleBackToTop}
          role="button"
          aria-label="Back to top"
          sx={{
            position: "fixed",
            right: { xs: 16, md: 24 },
            bottom: { xs: 18, md: 28 },
            width: 52,
            height: 52,
            borderRadius: "50%",
            background: "linear-gradient(135deg, #61C5C3, #3aa7a4)",
            color: "#fff",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
            zIndex: 1300,
            boxShadow: "0 10px 24px rgba(58, 167, 164, 0.45)",
            transition: "transform 0.25s ease, box-shadow 0.25s ease",
            animation: "floatPulse 2.1s ease-in-out infinite",
            "@keyframes floatPulse": {
              "0%": { transform: "translateY(0)" },
              "50%": { transform: "translateY(-4px)" },
              "100%": { transform: "translateY(0)" },
            },
            "&:hover": {
              transform: "translateY(-3px) scale(1.06)",
              boxShadow: "0 14px 30px rgba(58, 167, 164, 0.5)",
            },
          }}
        >
          <ChevronUp size={22} />
        </Box>
      </Zoom>
    </PageLayout>
  );
}

function DatasetCard({ dataset, viewType = "grid" }) {
  const navigate = useNavigate();
  const themeColors = useThemeColors();

  const handleOpenDataset = () => {
    navigate(`/dataset-info/${dataset.id}`, {
      state: {
        dataset,
      },
    });
  };

  // List view layout
  if (viewType === "list") {
    return (
      <Box
        sx={{
          display: "flex",
          gap: 2,
          padding: 2.5,
          backgroundColor: themeColors.card,
          border: `1px solid ${themeColors.border}`,
          borderRadius: "12px",
          transition: "all 0.3s ease",
          alignItems: "stretch",
          "&:hover": {
            boxShadow: themeColors.isDarkMode ? "0 10px 24px rgba(97, 197, 195, 0.2)" : "0 10px 24px rgba(97, 197, 195, 0.12)",
            borderColor: PRIMARY_COLOR,
          },
        }}
      >
        {/* Image Thumbnail */}
        <Box
          sx={{
            width: 100,
            height: 100,
            borderRadius: "8px",
            backgroundImage: `url(${dataset.image})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            flexShrink: 0,
            cursor: "pointer",
            transition: "all 0.2s",
            "&:hover": {
              boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
            },
          }}
          onClick={handleOpenDataset}
        />

        {/* Content */}
        <Box sx={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
          {/* Title and Info */}
          <Box>
            <Box sx={{ display: "flex", alignItems: "flex-start", gap: 1, mb: 1 }}>
              <Typography
                onClick={handleOpenDataset}
                sx={{
                  fontSize: "0.95rem",
                  fontWeight: 700,
                  color: themeColors.text,
                  cursor: "pointer",
                  transition: "color 0.2s ease",
                  flex: 1,
                  "&:hover": {
                    color: PRIMARY_COLOR,
                  },
                }}
              >
                {dataset.title}
              </Typography>
              <IconButton size="small" sx={{ minWidth: 32 }}>
                <MoreVertical size={16} />
              </IconButton>
            </Box>

            <Typography sx={{ fontSize: "0.85rem", color: themeColors.textMuted, mb: 1 }}>
              {dataset.author} · Updated {dataset.updated.replace("Updated ", "")}
            </Typography>

            <Typography sx={{ fontSize: "0.8rem", color: themeColors.text }}>
              Visibility <b>{dataset.usability}</b> · {dataset.files} ({dataset.size}) · {dataset.downloads} · {dataset.votes} notebooks
            </Typography>
          </Box>

          {/* Footer Info */}
          <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, mt: 1, justifyContent: "space-between" }}>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 0.3,
                padding: "4px 8px",
                backgroundColor: themeColors.bgSecondary,
                borderRadius: "4px",
                fontSize: "0.8rem",
                color: themeColors.text,
              }}
            >
              <ChevronUp size={14} />
              <span>{dataset.votes}</span>
            </Box>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 0.5,
                padding: "6px 12px",
                backgroundColor: themeColors.isDarkMode ? "rgba(97, 197, 195, 0.15)" : "#e6f7f6",
                borderRadius: "6px",
                fontSize: "0.85rem",
                fontWeight: 600,
                color: PRIMARY_COLOR,
              }}
            >
              <span>${dataset.price} USD</span>
            </Box>
          </Box>
        </Box>
      </Box>
    );
  }

  // Grid view layout (original)
  return (
    <Card
      sx={{
        borderRadius: "12px",
        overflow: "hidden",
        backgroundColor: themeColors.card,
        border: `1px solid ${themeColors.border}`,
        boxShadow: "none",
        transition: "all 0.3s ease",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        "&:hover": {
          transform: "translateY(-4px)",
          boxShadow: themeColors.isDarkMode ? "0 10px 24px rgba(97, 197, 195, 0.2)" : "0 10px 24px rgba(97, 197, 195, 0.12)",
          borderColor: PRIMARY_COLOR,
        },
      }}
    >
      {/* Image Section */}
      <Box
        sx={{
          height: 130, // Reduced from 160
          backgroundImage: `url(${dataset.image})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          position: "relative",
          "&::after": {
            content: '""',
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "rgba(0,0,0,0)",
            transition: "backgroundColor 0.2s ease",
          },
          "&:hover::after": {
            backgroundColor: "rgba(0,0,0,0.1)",
          },
        }}
      >
        {/* Trending Badge */}
        {dataset.trend && (
          <Box
            sx={{
              position: "absolute",
              top: 10,
              left: 10,
              display: "flex",
              alignItems: "center",
              gap: 1,
              backgroundColor: "rgba(22, 22, 22, 0.85)",
              backdropFilter: "blur(4px)",
              padding: "4px 10px",
              borderRadius: "20px",
              zIndex: 2,
              border: "1px solid rgba(255, 255, 255, 0.1)",
            }}
          >
            <TrendingUp size={14} color="#4ade80" />
            <Box
              sx={{
                width: "1.5px",
                height: "12px",
                backgroundColor: "#4ade80",
                mx: 0.2,
              }}
            />
            <Typography
              sx={{
                fontSize: "0.75rem",
                fontWeight: 800,
                color: "#4ade80",
                letterSpacing: "0.02em",
              }}
            >
              {dataset.trend}
            </Typography>
          </Box>
        )}
      </Box>

      <CardContent sx={{ p: 2, flex: 1, display: "flex", flexDirection: "column" }}>
        {/* Title and Menu */}
        <Box
          sx={{
            display: "flex",
            alignItems: "flex-start",
            justifyContent: "space-between",
            gap: 1,
            mb: 1.5,
          }}
        >
          <Typography
            onClick={handleOpenDataset}
            sx={{
              fontSize: "0.98rem",
              fontWeight: 700,
              lineHeight: 1.4,
              color: themeColors.text,
              cursor: "pointer",
              display: "-webkit-box",
              WebkitLineClamp: 2,
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
              transition: "color 0.2s ease",
              "&:hover": {
                color: PRIMARY_COLOR,
              },
            }}
          >
            {dataset.title}
          </Typography>

          <IconButton size="small" sx={{ mt: -0.5, minWidth: 32 }}>
            <MoreVertical size={16} />
          </IconButton>
        </Box>

        {/* Author */}
        <Typography
          sx={{
            fontSize: "0.85rem",
            color: themeColors.text,
            fontWeight: 500,
            mb: 1.2,
          }}
        >
          {dataset.author}
        </Typography>

        {/* Visibility and Updated */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 0.8,
            mb: 1.5,
            fontSize: "0.8rem",
            color: themeColors.textMuted,
          }}
        >
          <Typography sx={{ fontSize: "inherit" }}>
            Visibility <b style={{ color: themeColors.text }}>{dataset.usability}</b>
          </Typography>
          <Box sx={{ display: "flex", alignItems: "center", gap: 0.4 }}>
            <Calendar size={14} />
            <Typography sx={{ fontSize: "inherit" }}>{dataset.updated}</Typography>
          </Box>
        </Box>

        {/* File Details - Flattened to one line */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 1.2,
            mb: 1.5,
            pb: 1.5,
            borderBottom: `1px solid ${themeColors.border}`,
            whiteSpace: "nowrap",
            overflow: "hidden",
            width: "100%",
            flexWrap: "wrap",
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center", gap: 0.6 }}>
            <FileIcon size={14} color={PRIMARY_COLOR} />
            <Typography sx={{ fontSize: "0.75rem", color: themeColors.textMuted, fontWeight: 500 }}>
              {dataset.files}
            </Typography>
          </Box>
          <Box sx={{ width: 4, height: 4, borderRadius: "50%", backgroundColor: themeColors.border, flexShrink: 0 }} />
          <Box sx={{ display: "flex", alignItems: "center", gap: 0.6 }}>
            <HardDrive size={14} color={PRIMARY_COLOR} />
            <Typography sx={{ fontSize: "0.75rem", color: themeColors.textMuted, fontWeight: 500 }}>
              {dataset.size}
            </Typography>
          </Box>
          <Box sx={{ width: 4, height: 4, borderRadius: "50%", backgroundColor: themeColors.border, flexShrink: 0 }} />
          <Box sx={{ display: "flex", alignItems: "center", gap: 0.6 }}>
            <Download size={14} color={PRIMARY_COLOR} />
            <Typography sx={{ fontSize: "0.75rem", color: themeColors.textMuted, fontWeight: 500 }}>
              {dataset.downloads}
            </Typography>
          </Box>
        </Box>
      </CardContent>

      {/* Footer */}
      <Box
        sx={{
          px: 2.5,
          py: 1.5,
          borderTop: `1px solid ${themeColors.border}`,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          backgroundColor: themeColors.bgSecondary,
          transition: "all 0.3s ease",
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            border: `1px solid ${themeColors.border}`,
            borderRadius: "6px",
            overflow: "hidden",
            backgroundColor: themeColors.card,
            transition: "all 0.3s ease",
          }}
        >
          <Box
            sx={{
              px: 1,
              py: 0.4,
              display: "flex",
              alignItems: "center",
              borderRight: `1px solid ${themeColors.border}`,
              color: themeColors.text,
            }}
          >
            <ChevronUp size={14} />
          </Box>

          <Box sx={{ px: 1.2, py: 0.3 }}>
            <Typography
              sx={{
                fontSize: "0.8rem",
                fontWeight: 700,
                color: themeColors.text,
              }}
            >
              {dataset.votes}
            </Typography>
          </Box>
        </Box>

        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 0.6,
            padding: "6px 12px",
            backgroundColor: themeColors.isDarkMode ? "rgba(97, 197, 195, 0.15)" : "#e6f7f6",
            borderRadius: "6px",
            fontSize: "0.85rem",
            fontWeight: 700,
            color: PRIMARY_COLOR,
            transition: "all 0.3s ease",
          }}
        >
          <span>${dataset.price} USD</span>
        </Box>
      </Box>
    </Card>
  );
}
