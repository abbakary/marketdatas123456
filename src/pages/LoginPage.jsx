import React, { useEffect, useState } from "react";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";

import logo from "../assets/logo1.png";
import icon12 from "../assets/icon12.png";

import {
  Mail, Lock, Eye, EyeOff,
  User, Phone, Briefcase, Shield, Activity,
} from "lucide-react";

import {
  Box, Typography, TextField, Button, Checkbox, FormControlLabel,
  Link, IconButton, InputAdornment, Divider, Paper,
} from "@mui/material";

import { getDashboardPath } from "../utils/roleRedirect";
import { validateMockCredentials } from "../utils/mockCredentials";
import { useThemeColors } from "../utils/useThemeColors";

const API_BASE = import.meta.env?.VITE_API_BASE || "http://127.0.0.1:8000";
const TOKEN_KEY = "dali-token";
const USER_KEY  = "dali-user";

const api = axios.create({
  baseURL: API_BASE,
  headers: { "Content-Type": "application/json", Accept: "application/json" },
});

const toast = (icon, title) =>
  Swal.fire({ toast: true, position: "top-end", icon, title, timer: 3000, showConfirmButton: false });

const DEMO_ACCOUNTS = [
  { label: "Viewer",  email: "viewer@demo.com" },
  { label: "Buyer",   email: "buyer@demo.com"  },
  { label: "Seller",  email: "seller@demo.com" },
  { label: "Editor",  email: "editor@demo.com" },
  { label: "Admin",   email: "admin@demo.com"  },
];

const REGISTRATION_STEPS = [
  {
    icon: <User size={17} color="#F68822" strokeWidth={2} />,
    title: "Create your account",
    desc: "Enter your name, email and choose a secure password",
  },
  {
    icon: <Phone size={17} color="#F68822" strokeWidth={2} />,
    title: "Verify your email",
    desc: "Click the confirmation link we send to your inbox",
  },
  {
    icon: <Briefcase size={17} color="#F68822" strokeWidth={2} />,
    title: "Set up your profile",
    desc: "Add your organisation details and select your role",
  },
  {
    icon: <Shield size={17} color="#F68822" strokeWidth={2} />,
    title: "Choose your plan",
    desc: "Pick a subscription that fits your data access needs",
  },
  {
    icon: <Activity size={17} color="#F68822" strokeWidth={2} />,
    title: "Access your data",
    desc: "Browse datasets, manage requests and subscriptions",
  },
];

export default function LoginPage() {
  const navigate = useNavigate();
  const { isDarkMode, text, textMuted, border, teal } = useThemeColors();

  const ACCENT = teal;

  const leftBg      = isDarkMode ? "rgba(4,18,29,0.97)" : "#04121D";
  const stepTitle   = "#62C6C4";
  const stepDesc    = "rgba(98,198,196,0.55)";
  const stepIconBg  = "rgba(246,136,34,0.12)";
  const stepIconBdr = "rgba(246,136,34,0.35)";

  const cardBg    = isDarkMode ? "rgba(7,26,41,0.96)" : "#ffffff";
  const cardText  = isDarkMode ? "#fff" : text;
  const cardMuted = isDarkMode ? "rgba(255,255,255,0.65)" : textMuted;
  const inputBg   = isDarkMode ? "rgba(4,18,29,0.85)" : "#fafafa";
  const inputText = isDarkMode ? "#fff" : text;
  const inputLbl  = isDarkMode ? "rgba(255,255,255,0.80)" : textMuted;
  const inputBdr  = isDarkMode ? "rgba(255,255,255,0.20)" : border;

  const textFieldSx = {
    "& .MuiInputLabel-root": { color: inputLbl },
    "& .MuiInputLabel-root.Mui-focused": { color: ACCENT },
    "& .MuiOutlinedInput-root": {
      color: inputText,
      borderRadius: 2,
      backgroundColor: inputBg,
      "& input": { color: inputText },
      "& fieldset": { borderColor: inputBdr },
      "&:hover fieldset": { borderColor: "rgba(94,196,195,0.70)" },
      "&.Mui-focused fieldset": { borderColor: ACCENT },
    },
    "& .MuiFormHelperText-root": { color: cardMuted },
  };

  const [form, setForm]       = useState({ email: "", password: "", remember: true });
  const [loading, setLoading] = useState(false);
  const [showPw, setShowPw]   = useState(false);

  useEffect(() => {
    const token = localStorage.getItem(TOKEN_KEY) || sessionStorage.getItem(TOKEN_KEY);
    const user  = localStorage.getItem(USER_KEY)  || sessionStorage.getItem(USER_KEY);
    if (!token || !user) return;
    try { navigate(getDashboardPath(JSON.parse(user)?.role), { replace: true }); } catch {}
  }, [navigate]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm(p => ({ ...p, [name]: type === "checkbox" ? checked : value }));
  };

  const clearStoredAuth = () => {
    [TOKEN_KEY, USER_KEY].forEach(k => {
      localStorage.removeItem(k);
      sessionStorage.removeItem(k);
    });
  };

  const validateForm = () => {
    if (!form.email.trim())        { toast("error", "Email is required");                      return false; }
    if (!form.password.trim())     { toast("error", "Password is required");                   return false; }
    if (form.password.length < 6)  { toast("error", "Password must be at least 6 characters"); return false; }
    if (form.password.length > 72) { toast("error", "Password must not exceed 72 characters"); return false; }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    try {
      setLoading(true);
      const email    = form.email.trim().toLowerCase();
      const mockUser = validateMockCredentials(email, form.password);
      if (mockUser) {
        clearStoredAuth();
        const storage = form.remember ? localStorage : sessionStorage;
        storage.setItem(TOKEN_KEY, `mock_token_${Date.now()}`);
        storage.setItem(USER_KEY, JSON.stringify(mockUser));
        window.dispatchEvent(new Event("auth:updated"));
        toast("success", `Welcome ${mockUser.name}! (${mockUser.role})`);
        navigate(getDashboardPath(mockUser?.role), { replace: true });
        return;
      }
      const { data } = await api.post("/auth/login", { email, password: form.password });
      const token    = data?.access_token;
      if (!token) throw new Error("No access token returned");
      clearStoredAuth();
      const storage = form.remember ? localStorage : sessionStorage;
      storage.setItem(TOKEN_KEY, token);
      let meData = null;
      try {
        const me = await api.get("/auth/me", { headers: { Authorization: `Bearer ${token}` } });
        meData   = me?.data || null;
      } catch {
        meData = { email, role: "viewer", status: "pending" };
      }
      storage.setItem(USER_KEY, JSON.stringify(meData));
      window.dispatchEvent(new Event("auth:updated"));
      toast("success", "Welcome to DALI Data Portal");
      navigate(getDashboardPath(meData?.role), { replace: true });
    } catch (err) {
      toast("error", err?.response?.data?.detail || err?.message || "Invalid email or password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{
        minHeight:      "100vh",
        bgcolor:        isDarkMode ? "#020c14" : "#f0f4f8",
        fontFamily:     "'Poppins', sans-serif",
        display:        "flex",
        alignItems:     "center",
        justifyContent: "center",
        p:              3,
        "@keyframes fadeUp": {
          "0%":   { opacity: 0, transform: "translateY(22px)" },
          "100%": { opacity: 1, transform: "translateY(0)"    },
        },
        "@keyframes fadeIn":    { "0%": { opacity: 0 }, "100%": { opacity: 1 } },
        "@keyframes floatSoft": {
          "0%,100%": { transform: "translateY(0)"    },
          "50%":     { transform: "translateY(-4px)" },
        },
        animation: "fadeIn 0.45s ease",
      }}
    >
      <Paper
        elevation={0}
        sx={{
          width:         "100%",
          maxWidth:      940,
          borderRadius:  4,
          overflow:      "hidden",
          display:       "flex",
          flexDirection: { xs: "column", md: "row" },
          boxShadow:     isDarkMode
            ? "0 28px 64px rgba(0,0,0,0.65)"
            : "0 28px 64px rgba(0,0,0,0.18)",
        }}
      >
        {/* ══════════════════════════════
            LEFT — Registration steps
        ══════════════════════════════ */}
        <Box
          sx={{
            width:          { xs: "100%", md: "42%" },
            bgcolor:        leftBg,
            p:              4,
            display:        "flex",
            flexDirection:  "column",
            justifyContent: "center",
            opacity:        0,
            animation:      "fadeUp 0.7s ease forwards",
            animationDelay: "0.08s",
          }}
        >
          <Typography
            sx={{
              color:         "#62C6C4",
              fontSize:      13,
              fontWeight:    800,
              letterSpacing: "1px",
              textTransform: "uppercase",
              mb:            0.6,
            }}
          >
            Get Started
          </Typography>
          <Typography sx={{ color: "rgba(98,198,196,0.55)", fontSize: 11.5, mb: 3.5 }}>
            Create your account in 5 easy steps
          </Typography>

          {REGISTRATION_STEPS.map(({ icon, title, desc }, i) => (
            <Box
              key={title}
              sx={{
                display:        "flex",
                alignItems:     "flex-start",
                gap:            1.6,
                mb:             i < REGISTRATION_STEPS.length - 1 ? 2.6 : 0,
                opacity:        0,
                animation:      "fadeUp 0.6s ease forwards",
                animationDelay: `${0.18 + i * 0.07}s`,
              }}
            >
              <Box
                sx={{
                  width:          36,
                  height:         36,
                  borderRadius:   "50%",
                  bgcolor:        stepIconBg,
                  border:         `1.5px solid ${stepIconBdr}`,
                  display:        "flex",
                  alignItems:     "center",
                  justifyContent: "center",
                  flexShrink:     0,
                  mt:             "1px",
                }}
              >
                {icon}
              </Box>
              <Box sx={{ flex: 1 }}>
                <Typography sx={{ color: stepTitle, fontSize: 13, fontWeight: 800, lineHeight: 1.3, mb: 0.3 }}>
                  {title}
                </Typography>
                <Typography sx={{ color: stepDesc, fontSize: 11, lineHeight: 1.55 }}>
                  {desc}
                </Typography>
              </Box>
            </Box>
          ))}
        </Box>

        {/* ══════════════════════════════
            RIGHT — Login form
        ══════════════════════════════ */}
        <Box
          sx={{
            width:          { xs: "100%", md: "58%" },
            bgcolor:        cardBg,
            p:              4,
            display:        "flex",
            flexDirection:  "column",
            justifyContent: "center",
          }}
        >
          {/* Logo — centred */}
          <Box
            sx={{
              display:        "flex",
              flexDirection:  "column",
              alignItems:     "center",
              textAlign:      "center",
              mb:             2.5,
              opacity:        0,
              animation:      "fadeUp 0.7s ease forwards",
              animationDelay: "0.10s",
            }}
          >
            <Box
              component="img"
              src={logo}
              alt="Dali Data"
              sx={{
                height:    48,
                objectFit: "contain",
                mb:        1,
                filter:    isDarkMode
                  ? "drop-shadow(0 8px 18px rgba(0,0,0,0.4))"
                  : "drop-shadow(0 8px 18px rgba(0,0,0,0.15))",
              }}
            />
            <Typography sx={{ color: cardText, fontSize: 19, fontWeight: 950, lineHeight: 1.2 }}>
              Sign in
            </Typography>
            <Typography sx={{ color: cardMuted, fontSize: 12, mt: 0.5 }}>
              Access your DALI account to manage datasets, subscriptions, and requests.
            </Typography>
          </Box>

          <Divider sx={{ borderColor: isDarkMode ? "rgba(255,255,255,0.10)" : "rgba(15,23,42,0.08)", mb: 2 }} />

          {/* Form */}
          <Box
            component="form"
            onSubmit={handleSubmit}
            sx={{
              display:        "flex",
              flexDirection:  "column",
              gap:            1,
              opacity:        0,
              animation:      "fadeUp 0.7s ease forwards",
              animationDelay: "0.18s",
            }}
          >
            <TextField
              fullWidth
              label="Email"
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Mail size={17} color={ACCENT} />
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
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Lock size={17} color={ACCENT} />
                  </InputAdornment>
                ),
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={() => setShowPw(p => !p)} edge="end" sx={{ color: ACCENT }}>
                      {showPw ? <EyeOff size={17} /> : <Eye size={17} />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              sx={textFieldSx}
            />

            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mt: 0.2, gap: 1, flexWrap: "wrap" }}>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={form.remember}
                    onChange={handleChange}
                    name="remember"
                    sx={{ color: cardMuted, "&.Mui-checked": { color: ACCENT } }}
                  />
                }
                label={<Typography sx={{ fontSize: 13, color: cardText }}>Remember me</Typography>}
              />
              <Link component={RouterLink} to="/forgot-password" underline="none"
                sx={{ color: ACCENT, fontWeight: 900, fontSize: 13.5 }}>
                Forgot?
              </Link>
            </Box>

            <Button
              type="submit"
              fullWidth
              disabled={loading}
              sx={{
                mt:            0.5,
                height:        46,
                borderRadius:  2.5,
                fontWeight:    950,
                textTransform: "none",
                bgcolor:       ACCENT,
                color:         "#04121D",
                boxShadow:     "0 12px 28px rgba(94,196,195,0.22)",
                "&:hover":        { bgcolor: "#49b2b1" },
                "&.Mui-disabled": { bgcolor: "rgba(94,196,195,0.45)", color: "#04121D" },
              }}
            >
              {loading ? "Signing in…" : "Sign in"}
            </Button>

            

            <Typography sx={{ textAlign: "center", mt: 1, fontSize: 11, opacity: 0.65, color: cardMuted }}>
              © {new Date().getFullYear()} Dali Data Portal
            </Typography>

            <Divider sx={{ borderColor: isDarkMode ? "rgba(255,255,255,0.10)" : "rgba(15,23,42,0.08)", my: 1 }} />

            <Typography sx={{ fontSize: 10.5, fontWeight: 800, color: cardMuted, textTransform: "uppercase", mb: 0.5, letterSpacing: "0.5px" }}>
              Demo Credentials
            </Typography>

            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.8 }}>
              {DEMO_ACCOUNTS.map(({ label, email }, i) => (
                <Box
                  key={email}
                  onClick={() => setForm({ email, password: "demo123", remember: true })}
                  sx={{
                    px:              1.1,
                    py:              0.6,
                    borderRadius:    2,
                    cursor:          "pointer",
                    fontSize:        11.5,
                    fontWeight:      800,
                    color:           cardText,
                    backgroundColor: isDarkMode ? "rgba(255,255,255,0.06)" : "rgba(2,6,23,0.04)",
                    border:          isDarkMode ? "1px solid rgba(255,255,255,0.12)" : "1px solid rgba(15,23,42,0.10)",
                    transition:      "all 0.2s ease",
                    opacity:         0,
                    animation:       "fadeUp 0.6s ease forwards",
                    animationDelay:  `${0.34 + i * 0.04}s`,
                    "&:hover": {
                      transform:       "translateY(-1px)",
                      borderColor:     "rgba(97,197,195,0.60)",
                      backgroundColor: isDarkMode ? "rgba(97,197,195,0.14)" : "rgba(97,197,195,0.10)",
                    },
                  }}
                  title={email}
                >
                  {label}
                </Box>
              ))}
            </Box>

            <Typography sx={{ fontSize: 9.5, color: cardMuted, mt: 0.8, textAlign: "center" }}>
              Password: <b>demo123</b> (for all demo accounts)
            </Typography>
          </Box>
        </Box>
      </Paper>
    </Box>
  );
}