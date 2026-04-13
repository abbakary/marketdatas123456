import { useEffect, useState } from "react";
import { useNavigate, Link as RouterLink } from "react-router-dom";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  Avatar,
  Menu,
  MenuItem,
  IconButton,
  Divider,
} from "@mui/material";
import {
  Database,
  Menu as MenuIcon,
  DollarSign,
  FolderOpen,
  Wallet,
  BarChart3,
  FileText,
  User,
  LogOut,
  Settings,
  ChevronDown,
  LayoutDashboard,
  Globe,
  Sun,
  Moon,
} from "lucide-react";
import logo from "../../../assets/dali-data-logo.png";
import { useTheme } from "../../../context/ThemeContext";

const PRIMARY_COLOR = "#61C5C3";
const TOKEN_KEY = "dali-token";
const USER_KEY = "dali-user";

/**
 * Get the role-specific dashboard path
 */
const getRoleDashboardPath = (role) => {
  const normalizedRole = String(role || "").trim().toLowerCase();
  const dashboardPaths = {
    admin: "/dashboard/admin",
    editor: "/dashboard/editor",
    seller: "/dashboard/seller",
    buyer: "/dashboard/buyer",
    viewer: "/dashboard/viewer",
  };
  return dashboardPaths[normalizedRole] || "/dashboard/viewer";
};

export default function NavBar() {
  const navigate = useNavigate();
  const { isDarkMode, toggleTheme } = useTheme();

  const [anchorEl, setAnchorEl] = useState(null);
  const [mobileMenu, setMobileMenu] = useState(null);
  const [authUser, setAuthUser] = useState(null);

  const isLoggedIn = Boolean(authUser?.token);

  useEffect(() => {
    loadAuthUser();

    const handleAuthUpdate = () => loadAuthUser();
    window.addEventListener("auth:updated", handleAuthUpdate);

    return () => {
      window.removeEventListener("auth:updated", handleAuthUpdate);
    };
  }, []);

  const loadAuthUser = () => {
    const token =
      localStorage.getItem(TOKEN_KEY) || sessionStorage.getItem(TOKEN_KEY);

    const rawUser =
      localStorage.getItem(USER_KEY) || sessionStorage.getItem(USER_KEY);

    if (!token || !rawUser) {
      setAuthUser(null);
      return;
    }

    try {
      const parsedUser = JSON.parse(rawUser);
      setAuthUser({
        token,
        ...parsedUser,
      });
    } catch (error) {
      console.error("Invalid stored user data:", error);
      setAuthUser(null);
    }
  };

  const handleLogout = () => {
    navigate("/logout", { replace: true });
  };

  const navLinks = [
    { label: "Dataset", path: "/public/datasets", icon: Database },
    { label: "Trade", path: "/public/trade", icon: Globe },
    { label: "Budget", path: "/public/budget", icon: DollarSign },
    { label: "Project", path: "/public/project", icon: FolderOpen },
    { label: "Funds", path: "/public/funds", icon: Wallet },
    { label: "Analysis", path: "/public/analysis", icon: BarChart3 },
    { label: "Report", path: "/public/reports", icon: FileText },
  ];

  const displayName =
    authUser?.full_name ||
    authUser?.name ||
    authUser?.username ||
    authUser?.email ||
    "User";

  const avatarLetter = displayName.charAt(0).toUpperCase();

  return (
    <AppBar
      position="static"
      elevation={0}
      sx={{
        backgroundColor: isDarkMode ? "#1E293B" : "#ffffff",
        borderBottom: `1px solid ${isDarkMode ? "#334155" : "#e5e7eb"}`,
        color: isDarkMode ? "#F1F5F9" : "#111827",
        transition: "all 0.3s ease",
      }}
    >
      <Toolbar
        sx={{
          justifyContent: "space-between",
          minHeight: 64,
          px: { xs: 2, md: 4 },
        }}
      >
        <Box
          component={RouterLink}
          to="/"
          sx={{
            display: "flex",
            alignItems: "center",
            cursor: "pointer",
            textDecoration: "none",
            color: "inherit",
          }}
        >
          <Box
            component="img"
            src={logo}
            alt="Dali Data"
            sx={{
              height: 40,
              width: "auto",
              objectFit: "contain",
            }}
          />
        </Box>

        <Box
          sx={{
            display: { xs: "none", md: "flex" },
            gap: 1.5,
            alignItems: "center",
          }}
        >
          {navLinks.map((item) => {
            const Icon = item.icon;

            return (
              <Button
                key={item.label}
                component={RouterLink}
                to={item.path}
                color="inherit"
                startIcon={<Icon size={16} />}
                sx={{
                  fontSize: "0.85rem",
                  fontWeight: 600,
                  textTransform: "none",
                  borderRadius: "6px",
                  px: 1.5,
                  minWidth: "auto",
                  color: isDarkMode ? "#CBD5E1" : "#111827",
                  "&:hover": {
                    backgroundColor: isDarkMode ? "#334155" : "#f1f5f9",
                    color: PRIMARY_COLOR,
                  },
                }}
              >
                {item.label}
              </Button>
            );
          })}
        </Box>

        <Box
          sx={{
            display: { xs: "none", md: "flex" },
            gap: 1.5,
            alignItems: "center",
          }}
        >
          <IconButton
            onClick={toggleTheme}
            sx={{
              borderRadius: "8px",
              padding: "8px",
              backgroundColor: isDarkMode ? "#334155" : "#f1f5f9",
              color: isDarkMode ? "#fbbf24" : "#f59e0b",
              transition: "all 0.3s ease",
              "&:hover": {
                backgroundColor: isDarkMode ? "#475569" : "#e0e7ff",
                transform: "rotate(20deg)",
              },
            }}
            title={isDarkMode ? "Switch to light mode" : "Switch to dark mode"}
          >
            {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
          </IconButton>

          {isLoggedIn ? (
            <>
              <Box
                onClick={(e) => setAnchorEl(e.currentTarget)}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 1.2,
                  cursor: "pointer",
                  padding: "6px 12px",
                  borderRadius: "12px",
                  backgroundColor: isDarkMode ? "#334155" : "#f8fafc",
                  border: `1px solid ${isDarkMode ? "#475569" : "#e2e8f0"}`,
                  transition: "all 0.2s",
                  "&:hover": {
                    backgroundColor: isDarkMode ? "#475569" : "#f1f5f9",
                    borderColor: PRIMARY_COLOR,
                  },
                }}
              >
                <Avatar
                  sx={{
                    width: 32,
                    height: 32,
                    fontSize: "0.85rem",
                    bgcolor: PRIMARY_COLOR,
                    color: "#fff",
                    fontWeight: 700,
                    boxShadow: "0 2px 4px rgba(97, 197, 195, 0.2)",
                  }}
                >
                  {avatarLetter}
                </Avatar>

                <Box sx={{ display: "flex", flexDirection: "column" }}>
                  <Typography
                    sx={{
                      fontSize: "0.85rem",
                      fontWeight: 700,
                      color: isDarkMode ? "#F1F5F9" : "#1e293b",
                      lineHeight: 1.2,
                    }}
                  >
                    {displayName}
                  </Typography>
                  <Typography
                    sx={{
                      fontSize: "0.7rem",
                      fontWeight: 600,
                      color: PRIMARY_COLOR,
                      textTransform: "uppercase",
                      letterSpacing: "0.02em",
                    }}
                  >
                    {authUser?.role || "Member"}
                  </Typography>
                </Box>
                <ChevronDown size={16} color="#64748b" />
              </Box>

              <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={() => setAnchorEl(null)}
                PaperProps={{
                  sx: {
                    mt: 1.5,
                    minWidth: 220,
                    borderRadius: "12px",
                    boxShadow: "0 10px 25px rgba(0,0,0,0.1)",
                    border: `1px solid ${isDarkMode ? "#334155" : "#f1f5f9"}`,
                    padding: "4px",
                    backgroundColor: isDarkMode ? "#1E293B" : "#ffffff",
                  },
                }}
              >
                <Box sx={{ px: 2, py: 1.5, mb: 0.5, backgroundColor: isDarkMode ? "#334155" : "#f8fafc", borderRadius: "8px" }}>
                  <Typography sx={{ fontSize: "0.85rem", fontWeight: 700, color: isDarkMode ? "#F1F5F9" : "#1e293b" }}>
                    {displayName}
                  </Typography>
                  <Typography sx={{ fontSize: "0.75rem", color: isDarkMode ? "#94A3B8" : "#64748b" }}>
                    {authUser?.email || "Signed in"}
                  </Typography>
                </Box>

                <MenuItem
                  onClick={() => {
                    setAnchorEl(null);
                    const dashboardPath = getRoleDashboardPath(authUser?.role);
                    navigate(dashboardPath);
                  }}
                  sx={{
                    borderRadius: "8px",
                    fontSize: "0.88rem",
                    fontWeight: 500,
                    color: isDarkMode ? "#CBD5E1" : "#475569",
                    py: 1.2,
                    gap: 1.5,
                    "&:hover": { backgroundColor: isDarkMode ? "#334155" : "#f1f5f9", color: PRIMARY_COLOR },
                  }}
                >
                  <LayoutDashboard size={18} />
                  My Dashboard
                </MenuItem>

                <MenuItem
                  onClick={() => {
                    setAnchorEl(null);
                    navigate("/profile");
                  }}
                  sx={{
                    borderRadius: "8px",
                    fontSize: "0.88rem",
                    fontWeight: 500,
                    color: isDarkMode ? "#CBD5E1" : "#475569",
                    py: 1.2,
                    gap: 1.5,
                    "&:hover": { backgroundColor: isDarkMode ? "#334155" : "#f1f5f9", color: PRIMARY_COLOR },
                  }}
                >
                  <User size={18} />
                  Profile Settings
                </MenuItem>

                <Divider sx={{ my: 1, opacity: 0.6 }} />

                <MenuItem
                  onClick={handleLogout}
                  sx={{
                    borderRadius: "8px",
                    fontSize: "0.88rem",
                    fontWeight: 600,
                    color: "#ef4444",
                    py: 1.2,
                    gap: 1.5,
                    "&:hover": { backgroundColor: isDarkMode ? "#7f1d1d" : "#fef2f2" },
                  }}
                >
                  <LogOut size={18} />
                  Sign Out
                </MenuItem>
              </Menu>
            </>
          ) : (
            <>
              <Button
                variant="outlined"
                component={RouterLink}
                to="/login"
                sx={{
                  borderRadius: "6px",
                  textTransform: "none",
                  fontSize: "0.85rem",
                  fontWeight: 600,
                  borderColor: PRIMARY_COLOR,
                  color: PRIMARY_COLOR,
                  px: 2,
                  backgroundColor: isDarkMode ? "transparent" : "transparent",
                  "&:hover": {
                    borderColor: PRIMARY_COLOR,
                    backgroundColor: isDarkMode ? "rgba(97, 197, 195, 0.15)" : "#e6f7f6",
                  },
                }}
              >
                Sign In
              </Button>

              <Button
                variant="contained"
                component={RouterLink}
                to="/register"
                sx={{
                  borderRadius: "6px",
                  textTransform: "none",
                  fontSize: "0.85rem",
                  fontWeight: 700,
                  backgroundColor: PRIMARY_COLOR,
                  color: isDarkMode ? "#04121D" : "#04121D",
                  px: 2,
                  boxShadow: "none",
                  "&:hover": {
                    backgroundColor: "#49b2b1",
                    boxShadow: "none",
                  },
                }}
              >
                Register
              </Button>
            </>
          )}
        </Box>

        <Box
          sx={{
            display: { xs: "flex", md: "none" },
            alignItems: "center",
            gap: 1,
          }}
        >
          <IconButton
            onClick={toggleTheme}
            sx={{
              borderRadius: "8px",
              padding: "8px",
              backgroundColor: isDarkMode ? "#334155" : "#f1f5f9",
              color: isDarkMode ? "#fbbf24" : "#f59e0b",
              transition: "all 0.3s ease",
            }}
            title={isDarkMode ? "Switch to light mode" : "Switch to dark mode"}
          >
            {isDarkMode ? <Sun size={18} /> : <Moon size={18} />}
          </IconButton>

          {isLoggedIn && (
            <Avatar
              sx={{
                width: 28,
                height: 28,
                fontSize: "0.75rem",
                bgcolor: PRIMARY_COLOR,
                color: "#04121D",
                fontWeight: 700,
              }}
            >
              {avatarLetter}
            </Avatar>
          )}

          <IconButton onClick={(e) => setMobileMenu(e.currentTarget)}>
            <MenuIcon size={20} />
          </IconButton>

          <Menu
            anchorEl={mobileMenu}
            open={Boolean(mobileMenu)}
            onClose={() => setMobileMenu(null)}
            PaperProps={{
              sx: {
                backgroundColor: isDarkMode ? "#1E293B" : "#ffffff",
                color: isDarkMode ? "#F1F5F9" : "#111827",
              },
            }}
          >
            {navLinks.map((item) => {
              const Icon = item.icon;

              return (
                <MenuItem
                  key={item.label}
                  onClick={() => {
                    setMobileMenu(null);
                    navigate(item.path);
                  }}
                  sx={{
                    display: "flex",
                    gap: 1,
                    alignItems: "center",
                    color: isDarkMode ? "#CBD5E1" : "#111827",
                    "&:hover": {
                      backgroundColor: isDarkMode ? "#334155" : "#f1f5f9",
                      color: PRIMARY_COLOR,
                    },
                  }}
                >
                  <Icon size={16} />
                  {item.label}
                </MenuItem>
              );
            })}

            {isLoggedIn
              ? [
                  <MenuItem
                    key="dashboard"
                    onClick={() => {
                      setMobileMenu(null);
                      const dashboardPath = getRoleDashboardPath(authUser?.role);
                      navigate(dashboardPath);
                    }}
                    sx={{ display: "flex", gap: 1, alignItems: "center", color: isDarkMode ? "#CBD5E1" : "#111827" }}
                  >
                    <LayoutDashboard size={16} />
                    My Dashboard
                  </MenuItem>,
                  <MenuItem
                    key="profile"
                    onClick={() => {
                      setMobileMenu(null);
                      navigate("/profile");
                    }}
                    sx={{ display: "flex", gap: 1, alignItems: "center", color: isDarkMode ? "#CBD5E1" : "#111827" }}
                  >
                    <User size={16} />
                    Profile
                  </MenuItem>,
                  <MenuItem
                    key="logout"
                    onClick={() => {
                      setMobileMenu(null);
                      handleLogout();
                    }}
                    sx={{ display: "flex", gap: 1, alignItems: "center", color: "#ef4444" }}
                  >
                    <LogOut size={16} />
                    Logout
                  </MenuItem>,
                ]
              : [
                  <MenuItem
                    key="login"
                    onClick={() => {
                      setMobileMenu(null);
                      navigate("/login");
                    }}
                    sx={{ color: isDarkMode ? "#CBD5E1" : "#111827" }}
                  >
                    Sign In
                  </MenuItem>,
                  <MenuItem
                    key="register"
                    onClick={() => {
                      setMobileMenu(null);
                      navigate("/register");
                    }}
                    sx={{ color: isDarkMode ? "#CBD5E1" : "#111827" }}
                  >
                    Register
                  </MenuItem>,
                ]}
          </Menu>
        </Box>
      </Toolbar>
    </AppBar>
  );
}
