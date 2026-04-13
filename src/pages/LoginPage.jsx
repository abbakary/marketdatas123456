import React, { useEffect, useState, useCallback, useMemo } from "react";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";

// ---- Assets ----
import logo from "../assets/dali-data-logo.png";
import banner1 from "../assets/banner1.png";

// ---- Icons ----
import { Mail, Lock, Eye, EyeOff, Search, ChevronLeft } from "lucide-react";

// ---- MUI ----
import {
  Box,
  Typography,
  TextField,
  Button,
  Checkbox,
  FormControlLabel,
  Link,
  IconButton,
  InputAdornment,
  Divider,
  Paper,
  InputBase,
  Stack,
} from "@mui/material";

// ---- Utils ----
import { getDashboardPath } from "../utils/roleRedirect";
import { validateMockCredentials } from "../utils/mockCredentials";

// ---- Backend ----
const API_BASE = import.meta.env?.VITE_API_BASE || "http://127.0.0.1:8000";
const TOKEN_KEY = "dali-token";
const USER_KEY = "dali-user";

// ---- Utils ----
import { useThemeColors } from "../utils/useThemeColors";

// ---- Tags from onboard ----
const marketplaceTags = [
  "Administrative",
  "Mining",
  "Sensors",
  "Satellite Images",
  "Rivers",
  "Tourism",
  "Health",
  "Agriculture",
  "Weather",
  "Forestry",
  "Transport",
  "Hydrology",
  "Topography",
  "Land Use",
  "Population",
  "Education",
  "Energy",
  "Markets",
  "Boundaries",
  "Climate",
  "Water",
  "Roads",
  "Buildings",
  "Soils",
  "Urban Planning",
  "Geology",
  "Environment",
  "Disaster Risk",
  "Biodiversity",
  "Census",
  "Public Safety",
  "Marine",
  "Infrastructure",
  "Telecommunication",
  "Drainage",
  "Real Estate",
  "Investment",
  "Meteorology",
  "Natural Resources",
  "Livestock",
  "Fisheries",
  "Demography",
  "Elections",
  "Waste Management",
  "Groundwater",
  "Wetlands",
  "Navigation",
  "Logistics",
  "Economic Zones",
  "Public Services",
  "Renewable Energy",
  "Air Quality",
  "Pollution",
  "Cartography",
  "Geospatial AI",
  "Drone Mapping",
  "Elevation Models",
  "Land Cover",
  "Urban Growth",
];

// ---- Toast helper ----
const toast = (icon, title) => {
  Swal.fire({
    toast: true,
    position: "top-end",
    icon,
    title,
    timer: 3000,
    showConfirmButton: false,
  });
};

// ---- Axios instance ----
const api = axios.create({
  baseURL: API_BASE,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

export default function LoginPage() {
  const navigate = useNavigate();
  const {
    bg,
    bgPanel,
    text,
    textMuted,
    textLight,
    border,
    borderLight,
    orange,
    teal,
    darkBg,
  } = useThemeColors();

  // Theme-aware color constants
  const DALI_BG = darkBg;
  const DALI_PANEL = bgPanel;
  const DALI_ACCENT = teal;
  const DALI_BORDER = borderLight;
  const DALI_TITLE_GRADIENT = `linear-gradient(90deg,${teal},${orange})`;
  const DALI_PANEL_GLASS = bgPanel;

  const [form, setForm] = useState({
    email: "",
    password: "",
    remember: true,
  });

  const [loading, setLoading] = useState(false);
  const [showPw, setShowPw] = useState(false);
  const [isFormExpanded, setIsFormExpanded] = useState(false);

  // ---- Onboard content state ----
  const [searchRef, setSearchRef] = useState("");
  const [currentSlide, setCurrentSlide] = useState(0);
  const [animateKey, setAnimateKey] = useState(0);

  const groupedTags = useMemo(() => {
    const chunkSize = 12;
    const groups = [];

    for (let i = 0; i < marketplaceTags.length; i += chunkSize) {
      groups.push(marketplaceTags.slice(i, i + chunkSize));
    }

    return groups;
  }, []);

  useEffect(() => {
    const token =
      localStorage.getItem(TOKEN_KEY) || sessionStorage.getItem(TOKEN_KEY);

    const user =
      localStorage.getItem(USER_KEY) || sessionStorage.getItem(USER_KEY);

    if (!token || !user) return;

    try {
      const parsedUser = JSON.parse(user);
      const redirectPath = getDashboardPath(parsedUser?.role);
      navigate(redirectPath, { replace: true });
    } catch (error) {
      console.error("Invalid stored user data:", error);
    }
  }, [navigate]);

  useEffect(() => {
    if (groupedTags.length <= 1) return;

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % groupedTags.length);
    }, 3500);

    return () => clearInterval(interval);
  }, [groupedTags.length]);

  useEffect(() => {
    setAnimateKey((prev) => prev + 1);
  }, [currentSlide]);

  const openLoginPanel = () => {
    setIsFormExpanded(true);
  };

  const collapsePanel = () => {
    setIsFormExpanded(false);
  };

  const handleSearch = useCallback(() => {
    if (!searchRef.trim()) {
      toast("error", "Please enter a search keyword");
      return;
    }

    toast("success", `Searching for "${searchRef.trim()}"`);
  }, [searchRef]);

  const handleSearchKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const clearStoredAuth = () => {
    localStorage.removeItem(TOKEN_KEY);
    sessionStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USER_KEY);
    sessionStorage.removeItem(USER_KEY);
  };

  const validateForm = () => {
    if (!form.email.trim()) {
      toast("error", "Email is required");
      return false;
    }

    if (!form.password.trim()) {
      toast("error", "Password is required");
      return false;
    }

    if (form.password.length < 6) {
      toast("error", "Password must be at least 6 characters");
      return false;
    }

    if (form.password.length > 72) {
      toast("error", "Password must not exceed 72 characters");
      return false;
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    try {
      setLoading(true);

      const normalizedEmail = form.email.trim().toLowerCase();

      // Check for mock credentials first
      const mockUser = validateMockCredentials(normalizedEmail, form.password);

      if (mockUser) {
        // Use mock credentials
        clearStoredAuth();

        const storage = form.remember ? localStorage : sessionStorage;
        const mockToken = `mock_token_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
        storage.setItem(TOKEN_KEY, mockToken);
        storage.setItem(USER_KEY, JSON.stringify(mockUser));
        window.dispatchEvent(new Event("auth:updated"));

        const redirectPath = getDashboardPath(mockUser?.role);
        toast("success", `Welcome ${mockUser.name}! (${mockUser.role})`);
        navigate(redirectPath, { replace: true });
        return;
      }

      // If not a mock credential, try real API
      const loginRes = await api.post("/auth/login", {
        email: normalizedEmail,
        password: form.password,
      });

      const token = loginRes?.data?.access_token;

      if (!token) {
        throw new Error("No access token returned from login API");
      }

      clearStoredAuth();

      const storage = form.remember ? localStorage : sessionStorage;
      storage.setItem(TOKEN_KEY, token);

      let meData = null;

      try {
        const meRes = await api.get("/auth/me", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        meData = meRes?.data || null;
      } catch (meError) {
        const detail = meError?.response?.data?.detail;

        meData = {
          email: normalizedEmail,
          role: "viewer",
          status: "pending",
        };

        if (detail && String(detail).toLowerCase().includes("not active")) {
          toast(
            "info",
            "Login successful, but account is still pending activation",
          );
        }
      }

      storage.setItem(USER_KEY, JSON.stringify(meData));
      window.dispatchEvent(new Event("auth:updated"));

      const redirectPath = getDashboardPath(meData?.role);

      toast("success", "Welcome to DALI Data Portal");
      navigate(redirectPath, { replace: true });
    } catch (err) {
      console.error("Login error:", err);

      const message =
        err?.response?.data?.detail ||
        err?.response?.data?.message ||
        err?.message ||
        "Invalid email or password";

      toast("error", message);
    } finally {
      setLoading(false);
    }
  };

  const textFieldSx = {
    "& .MuiInputLabel-root": {
      color: "rgba(255,255,255,0.92)",
    },
    "& .MuiInputLabel-root.Mui-focused": {
      color: DALI_ACCENT,
    },
    "& .MuiOutlinedInput-root": {
      color: "#fff",
      borderRadius: 2,
      backgroundColor: DALI_BG,
      "& input": {
        color: "#fff",
      },
      "& fieldset": {
        borderColor: "rgba(255,255,255,0.22)",
      },
      "&:hover fieldset": {
        borderColor: "rgba(94,196,195,0.70)",
      },
      "&.Mui-focused fieldset": {
        borderColor: DALI_ACCENT,
      },
    },
    "& .MuiFormHelperText-root": {
      color: "rgba(255,255,255,0.75)",
    },
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        bgcolor: DALI_BG,
        fontFamily: "'Poppins', sans-serif",
        "@keyframes fadeUp": {
          "0%": {
            opacity: 0,
            transform: "translateY(28px)",
          },
          "100%": {
            opacity: 1,
            transform: "translateY(0)",
          },
        },
        "@keyframes fadeUpSoft": {
          "0%": {
            opacity: 0,
            transform: "translateY(18px)",
          },
          "100%": {
            opacity: 1,
            transform: "translateY(0)",
          },
        },
        "@keyframes portalGlow": {
          "0%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
          "100%": { backgroundPosition: "0% 50%" },
        },
      }}
    >
      <Box sx={{ display: "flex", minHeight: "100vh", flexWrap: "nowrap" }}>
        {/* LEFT CONTENT */}
        <Box
          sx={{
            flex: 1,
            minWidth: 0,
            minHeight: "100vh",
            position: "relative",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            overflow: "hidden",
          }}
        >
          <Box
            sx={{
              position: "absolute",
              inset: 0,
              backgroundImage: `url(${banner1})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              transform: "scale(1.03)",
            }}
          />

          <Box
            sx={{
              position: "absolute",
              inset: 0,
              background:
                "linear-gradient(180deg, rgba(4,18,29,0.58), rgba(4,18,29,0.90))",
            }}
          />

          <Box
            sx={{
              position: "relative",
              width: "100%",
              maxWidth: 960,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              px: { xs: 2, md: 3 },
              py: 4,
              color: "#fff",
            }}
          >
            <Typography
              sx={{
                fontWeight: 700,
                fontSize: { xs: "28px", sm: "40px", md: "54px" },
                lineHeight: 1.1,
                textAlign: "center",
                mb: 1.5,
                textShadow: "0 10px 30px rgba(0,0,0,0.18)",
                background: DALI_TITLE_GRADIENT,
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              Dali Data Portal
            </Typography>

            <Typography
              sx={{
                color: "rgba(255,255,255,0.82)",
                fontSize: { xs: "14px", md: "17px" },
                textAlign: "center",
                maxWidth: 760,
                mb: 4,
              }}
            >
              A trusted data marketplace platform
            </Typography>

            <Box
              sx={{
                width: "100%",
                maxWidth: 680,
                borderRadius: "999px",
                p: "2px",
                background: `linear-gradient(120deg, ${DALI_ACCENT}, transparent, ${DALI_ACCENT}, transparent)`,
                backgroundSize: "300% 300%",
                animation: "portalGlow 6s linear infinite",
              }}
            >
              <Paper
                elevation={0}
                sx={{
                  height: 60,
                  display: "flex",
                  alignItems: "center",
                  borderRadius: "999px",
                  px: 1.2,
                  bgcolor: DALI_PANEL_GLASS,
                  border: `1px solid ${DALI_BORDER}`,
                  backdropFilter: "blur(10px)",
                }}
              >
                <InputBase
                  fullWidth
                  value={searchRef}
                  onChange={(e) => setSearchRef(e.target.value)}
                  onKeyDown={handleSearchKeyDown}
                  placeholder="Search datasets, sectors, or keywords..."
                  sx={{
                    pl: 2,
                    color: "#fff",
                    fontSize: "16px",
                    "& input::placeholder": {
                      color: "rgba(255,255,255,0.65)",
                      opacity: 1,
                    },
                  }}
                />

                <IconButton
                  onClick={handleSearch}
                  sx={{
                    mr: 0.5,
                    width: 44,
                    height: 44,
                    bgcolor: DALI_ACCENT,
                    color: DALI_BG,
                    "&:hover": {
                      bgcolor: "#4eb3b1",
                    },
                  }}
                >
                  <Search size={18} />
                </IconButton>
              </Paper>
            </Box>

            <Box
              sx={{
                mt: 4,
                width: "100%",
                maxWidth: 960,
                minHeight: 160,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Stack
                key={animateKey}
                direction="row"
                flexWrap="wrap"
                justifyContent="center"
                gap={1.5}
                sx={{ maxWidth: 860 }}
              >
                {groupedTags[currentSlide]?.map((tag, index) => (
                  <Box
                    key={`${tag}-${index}`}
                    onClick={() => setSearchRef(tag)}
                    sx={{
                      px: 2.2,
                      py: 1.1,
                      borderRadius: "999px",
                      cursor: "pointer",
                      fontSize: "13px",
                      fontWeight: 500,
                      color: "#fff",
                      bgcolor: "rgba(255,255,255,0.08)",
                      border: "1px solid rgba(97,197,195,0.35)",
                      backdropFilter: "blur(8px)",
                      transition: "all 0.25s ease",
                      userSelect: "none",
                      opacity: 0,
                      animation: "fadeUp 0.65s ease forwards",
                      animationDelay: `${index * 0.07}s`,
                      "&:hover": {
                        transform: "translateY(-2px)",
                        bgcolor: "rgba(97,197,195,0.18)",
                        border: "1px solid rgba(97,197,195,0.60)",
                      },
                    }}
                  >
                    {tag}
                  </Box>
                ))}
              </Stack>

              <Stack
                direction="row"
                justifyContent="center"
                alignItems="center"
                spacing={1}
                sx={{ mt: 3, animation: "fadeUpSoft 0.6s ease" }}
              >
                {groupedTags.map((_, index) => (
                  <Box
                    key={index}
                    onClick={() => setCurrentSlide(index)}
                    sx={{
                      width: currentSlide === index ? 22 : 9,
                      height: 9,
                      borderRadius: "999px",
                      cursor: "pointer",
                      bgcolor:
                        currentSlide === index
                          ? DALI_ACCENT
                          : "rgba(255,255,255,0.35)",
                      transition: "all 0.3s ease",
                    }}
                  />
                ))}
              </Stack>
            </Box>

            <Stack
              direction={{ xs: "column", sm: "row" }}
              spacing={2}
              sx={{
                mt: 5,
                width: "100%",
                maxWidth: 320,
                justifyContent: "center",
              }}
            >
              <Button
                fullWidth
                variant="outlined"
                onClick={() => navigate("/public/home")}
                sx={{
                  borderRadius: "999px",
                  py: 1.4,
                  color: "#fff",
                  borderColor: "rgba(255,255,255,0.28)",
                  textTransform: "none",
                  fontWeight: 600,
                  fontSize: "15px",
                  "&:hover": {
                    borderColor: DALI_ACCENT,
                    bgcolor: "rgba(255,255,255,0.05)",
                  },
                }}
              >
                Guest
              </Button>

              <Button
                fullWidth
                variant="contained"
                onClick={openLoginPanel}
                sx={{
                  borderRadius: "999px",
                  py: 1.4,
                  bgcolor: DALI_ACCENT,
                  color: DALI_BG,
                  textTransform: "none",
                  fontWeight: 700,
                  fontSize: "15px",
                  boxShadow: "0 10px 25px rgba(97,197,195,0.25)",
                  "&:hover": {
                    bgcolor: "#4eb3b1",
                  },
                }}
              >
                Login
              </Button>
            </Stack>
          </Box>
        </Box>

        {/* RIGHT COLLAPSIBLE PANEL */}
        <Box
          sx={{
            width: {
              xs: isFormExpanded ? "100%" : "84px",
              md: isFormExpanded ? "420px" : "84px",
            },
            minWidth: {
              xs: isFormExpanded ? "100%" : "84px",
              md: isFormExpanded ? "420px" : "84px",
            },
            maxWidth: {
              xs: isFormExpanded ? "100%" : "84px",
              md: isFormExpanded ? "420px" : "84px",
            },
            minHeight: "100vh",
            display: "flex",
            flexDirection: "column",
            bgcolor: DALI_PANEL,
            position: "relative",
            borderLeft: "1px solid rgba(255,255,255,0.06)",
            transition: "all 0.35s ease",
            overflow: "hidden",
          }}
        >
          {!isFormExpanded ? (
            <Box
              sx={{
                flex: 1,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                py: 2,
              }}
            >
              <IconButton
                onClick={openLoginPanel}
                sx={{
                  mt: 1,
                  color: "#fff",
                  border: "1px solid rgba(255,255,255,0.10)",
                  bgcolor: "rgba(255,255,255,0.04)",
                  "&:hover": {
                    bgcolor: "rgba(255,255,255,0.08)",
                  },
                }}
              >
                <ChevronLeft
                  size={18}
                  style={{ transform: "rotate(180deg)" }}
                />
              </IconButton>

              <Box
                sx={{
                  flex: 1,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  width: "100%",
                }}
              >
                <Typography
                  sx={{
                    fontSize: 10,
                    fontWeight: 600,
                    color: "rgba(255,255,255,0.22)",
                    letterSpacing: "1.8px",
                    userSelect: "none",
                    whiteSpace: "nowrap",
                    transform: "rotate(-90deg)",
                  }}
                >
                  DALI DATA PORTAL
                </Typography>
              </Box>

              <Box sx={{ height: 48 }} />
            </Box>
          ) : (
            <Box
              sx={{
                flex: 1,
                display: "flex",
                flexDirection: "column",
                px: 3,
                py: 4,
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  alignItems: "flex-start",
                  justifyContent: "space-between",
                  mb: 2,
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "flex-start",
                  }}
                >
                  <Box
                    component="img"
                    src={logo}
                    alt="Dali Data Portal"
                    sx={{ height: 44, objectFit: "contain", mb: 1 }}
                  />
                  <Typography
                    sx={{
                      color: "#fff",
                      fontSize: 18,
                      fontWeight: 900,
                      lineHeight: 1.1,
                    }}
                  >
                    Sign in
                  </Typography>
                  <Typography
                    sx={{
                      color: "rgba(255,255,255,0.62)",
                      fontSize: 12,
                      mt: 0.5,
                    }}
                  >
                    Access your DALI account
                  </Typography>
                </Box>

                <IconButton
                  onClick={collapsePanel}
                  sx={{
                    color: "#fff",
                    border: "1px solid rgba(255,255,255,0.10)",
                    bgcolor: "rgba(255,255,255,0.04)",
                    "&:hover": {
                      bgcolor: "rgba(255,255,255,0.08)",
                    },
                  }}
                >
                  <ChevronLeft size={18} />
                </IconButton>
              </Box>

              <Divider sx={{ borderColor: "rgba(255,255,255,0.12)", mb: 2 }} />

              <Box component="form" onSubmit={handleSubmit}>
                <TextField
                  fullWidth
                  label="Email"
                  name="email"
                  type="email"
                  value={form.email}
                  onChange={handleChange}
                  margin="normal"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Mail size={18} color={DALI_ACCENT} />
                      </InputAdornment>
                    ),
                  }}
                  sx={textFieldSx}
                />

                <TextField
                  fullWidth
                  label="Password"
                  name="password"
                  type={showPw ? "text" : "password"}
                  value={form.password}
                  onChange={handleChange}
                  margin="normal"
                  helperText="Password must be 6 to 72 characters"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Lock size={18} color={DALI_ACCENT} />
                      </InputAdornment>
                    ),
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          onClick={() => setShowPw((prev) => !prev)}
                          edge="end"
                          sx={{ color: DALI_ACCENT }}
                        >
                          {showPw ? <EyeOff size={18} /> : <Eye size={18} />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                  sx={textFieldSx}
                />

                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    mt: 1,
                    gap: 1,
                    flexWrap: "wrap",
                  }}
                >
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={form.remember}
                        onChange={handleChange}
                        name="remember"
                        sx={{
                          color: "rgba(255,255,255,0.60)",
                          "&.Mui-checked": { color: DALI_ACCENT },
                        }}
                      />
                    }
                    label={
                      <Typography
                        sx={{ fontSize: 14, opacity: 0.9, color: "#fff" }}
                      >
                        Remember me
                      </Typography>
                    }
                  />

                  <Link
                    component={RouterLink}
                    to="/forgot-password"
                    underline="none"
                    sx={{ color: DALI_ACCENT, fontWeight: 800, fontSize: 14 }}
                  >
                    Forgot?
                  </Link>
                </Box>

                <Button
                  type="submit"
                  fullWidth
                  disabled={loading}
                  sx={{
                    mt: 2.5,
                    height: 48,
                    borderRadius: 2,
                    fontWeight: 900,
                    textTransform: "none",
                    bgcolor: DALI_ACCENT,
                    color: "#04121D",
                    boxShadow: "0 12px 24px rgba(94,196,195,0.15)",
                    "&:hover": {
                      bgcolor: "#49b2b1",
                    },
                    "&.Mui-disabled": {
                      bgcolor: "rgba(94,196,195,0.5)",
                      color: "#04121D",
                    },
                  }}
                >
                  {loading ? "Signing in..." : "Sign in"}
                </Button>

                <Typography
                  sx={{
                    textAlign: "center",
                    mt: 2,
                    fontSize: 12,
                    opacity: 0.7,
                    color: "#fff",
                  }}
                >
                  © {new Date().getFullYear()} Dali Data Portal
                </Typography>

                <Divider sx={{ borderColor: "rgba(255,255,255,0.12)", my: 2 }} />

                <Typography
                  sx={{
                    fontSize: 11,
                    fontWeight: 600,
                    color: "rgba(255,255,255,0.6)",
                    textTransform: "uppercase",
                    mb: 1.5,
                    letterSpacing: "0.5px",
                  }}
                >
                  Demo Credentials
                </Typography>

                <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
                  <Box
                    onClick={() => {
                      setForm({ email: "viewer@demo.com", password: "demo123", remember: true });
                    }}
                    sx={{
                      p: 1.2,
                      borderRadius: 1,
                      backgroundColor: "rgba(94,196,195,0.10)",
                      border: "1px solid rgba(94,196,195,0.25)",
                      cursor: "pointer",
                      transition: "all 0.25s",
                      "&:hover": {
                        backgroundColor: "rgba(94,196,195,0.20)",
                        borderColor: "rgba(94,196,195,0.50)",
                      },
                    }}
                  >
                    <Typography sx={{ fontSize: 11, fontWeight: 600, color: "#fff" }}>
                      Viewer
                    </Typography>
                    <Typography sx={{ fontSize: 10, color: "rgba(255,255,255,0.6)", mt: 0.3 }}>
                      viewer@demo.com
                    </Typography>
                  </Box>

                  <Box
                    onClick={() => {
                      setForm({ email: "buyer@demo.com", password: "demo123", remember: true });
                    }}
                    sx={{
                      p: 1.2,
                      borderRadius: 1,
                      backgroundColor: "rgba(94,196,195,0.10)",
                      border: "1px solid rgba(94,196,195,0.25)",
                      cursor: "pointer",
                      transition: "all 0.25s",
                      "&:hover": {
                        backgroundColor: "rgba(94,196,195,0.20)",
                        borderColor: "rgba(94,196,195,0.50)",
                      },
                    }}
                  >
                    <Typography sx={{ fontSize: 11, fontWeight: 600, color: "#fff" }}>
                      Buyer
                    </Typography>
                    <Typography sx={{ fontSize: 10, color: "rgba(255,255,255,0.6)", mt: 0.3 }}>
                      buyer@demo.com
                    </Typography>
                  </Box>

                  <Box
                    onClick={() => {
                      setForm({ email: "seller@demo.com", password: "demo123", remember: true });
                    }}
                    sx={{
                      p: 1.2,
                      borderRadius: 1,
                      backgroundColor: "rgba(94,196,195,0.10)",
                      border: "1px solid rgba(94,196,195,0.25)",
                      cursor: "pointer",
                      transition: "all 0.25s",
                      "&:hover": {
                        backgroundColor: "rgba(94,196,195,0.20)",
                        borderColor: "rgba(94,196,195,0.50)",
                      },
                    }}
                  >
                    <Typography sx={{ fontSize: 11, fontWeight: 600, color: "#fff" }}>
                      Seller
                    </Typography>
                    <Typography sx={{ fontSize: 10, color: "rgba(255,255,255,0.6)", mt: 0.3 }}>
                      seller@demo.com
                    </Typography>
                  </Box>

                  <Box
                    onClick={() => {
                      setForm({ email: "editor@demo.com", password: "demo123", remember: true });
                    }}
                    sx={{
                      p: 1.2,
                      borderRadius: 1,
                      backgroundColor: "rgba(94,196,195,0.10)",
                      border: "1px solid rgba(94,196,195,0.25)",
                      cursor: "pointer",
                      transition: "all 0.25s",
                      "&:hover": {
                        backgroundColor: "rgba(94,196,195,0.20)",
                        borderColor: "rgba(94,196,195,0.50)",
                      },
                    }}
                  >
                    <Typography sx={{ fontSize: 11, fontWeight: 600, color: "#fff" }}>
                      Editor
                    </Typography>
                    <Typography sx={{ fontSize: 10, color: "rgba(255,255,255,0.6)", mt: 0.3 }}>
                      editor@demo.com
                    </Typography>
                  </Box>

                  <Box
                    onClick={() => {
                      setForm({ email: "admin@demo.com", password: "demo123", remember: true });
                    }}
                    sx={{
                      p: 1.2,
                      borderRadius: 1,
                      backgroundColor: "rgba(94,196,195,0.10)",
                      border: "1px solid rgba(94,196,195,0.25)",
                      cursor: "pointer",
                      transition: "all 0.25s",
                      "&:hover": {
                        backgroundColor: "rgba(94,196,195,0.20)",
                        borderColor: "rgba(94,196,195,0.50)",
                      },
                    }}
                  >
                    <Typography sx={{ fontSize: 11, fontWeight: 600, color: "#fff" }}>
                      Admin
                    </Typography>
                    <Typography sx={{ fontSize: 10, color: "rgba(255,255,255,0.6)", mt: 0.3 }}>
                      admin@demo.com
                    </Typography>
                  </Box>

                  <Typography
                    sx={{
                      fontSize: 9,
                      color: "rgba(255,255,255,0.5)",
                      mt: 1,
                      textAlign: "center",
                    }}
                  >
                    Password: demo123 (for all demo accounts)
                  </Typography>
                </Box>
              </Box>
            </Box>
          )}
        </Box>
      </Box>
    </Box>
  );
}
