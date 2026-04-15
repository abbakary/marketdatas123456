import { useEffect, useMemo, useState } from "react";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";

import logo from "../assets/logo1.png";
import icon12 from "../assets/icon12.png";

import {
  User, Mail, Lock, Eye, EyeOff, Phone, Globe, Briefcase,
} from "lucide-react";

import {
  Box, Typography, TextField, Button, Link, InputAdornment,
  IconButton, Divider, MenuItem, Stack, Paper,
} from "@mui/material";

import { useThemeColors } from "../utils/useThemeColors";

const API_BASE = import.meta.env?.VITE_API_BASE || "http://127.0.0.1:8000";
const TOKEN_KEY = "dali-token";
const USER_KEY  = "dali-user";

const api = axios.create({ baseURL: API_BASE, headers: { "Content-Type": "application/json", Accept: "application/json" } });
const toast = (icon, title) => Swal.fire({ toast: true, position: "top-end", icon, title, timer: 3000, showConfirmButton: false });

const COUNTRIES = [
  { name: "Tanzania",      code: "TZ", dial_code: "+255" },
  { name: "Kenya",         code: "KE", dial_code: "+254" },
  { name: "Uganda",        code: "UG", dial_code: "+256" },
  { name: "Rwanda",        code: "RW", dial_code: "+250" },
  { name: "Burundi",       code: "BI", dial_code: "+257" },
  { name: "South Africa",  code: "ZA", dial_code: "+27"  },
  { name: "Nigeria",       code: "NG", dial_code: "+234" },
  { name: "Ghana",         code: "GH", dial_code: "+233" },
  { name: "United States", code: "US", dial_code: "+1"   },
  { name: "United Kingdom",code: "GB", dial_code: "+44"  },
  { name: "Canada",        code: "CA", dial_code: "+1"   },
  { name: "India",         code: "IN", dial_code: "+91"  },
];

export default function RegisterPage() {
  const navigate = useNavigate();
  const { teal, text, textMuted, isDarkMode } = useThemeColors();

  const ACCENT = teal;

  const [form, setForm] = useState({
    first_name: "", last_name: "", email: "", password: "", confirm_password: "",
    country: "", country_code: "", phone: "", business_type_id: "", role: "buyer",
  });
  const [businessTypes, setBusinessTypes] = useState([]);
  const [businessTypesLoading, setBusinessTypesLoading] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showPw, setShowPw] = useState(false);
  const [showConfirmPw, setShowConfirmPw] = useState(false);

  const fullName = useMemo(() => `${form.first_name} ${form.last_name}`.trim(), [form.first_name, form.last_name]);

  useEffect(() => {
    (async () => {
      try {
        setBusinessTypesLoading(true);
        const res = await api.get("/business-types");
        const raw = res?.data;
        setBusinessTypes(Array.isArray(raw) ? raw : Array.isArray(raw?.data) ? raw.data : Array.isArray(raw?.results) ? raw.results : []);
      } catch { setBusinessTypes([]); }
      finally { setBusinessTypesLoading(false); }
    })();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "country") {
      const c = COUNTRIES.find(c => c.name === value);
      setForm(p => ({ ...p, country: value, country_code: c?.dial_code || "" }));
    } else if (name === "phone") {
      setForm(p => ({ ...p, phone: value.replace(/[^\d]/g, "") }));
    } else {
      setForm(p => ({ ...p, [name]: value }));
    }
  };

  const normalizePhone = () => {
    const local = form.phone.replace(/[^\d]/g, "");
    if (!local) return null;
    if (form.country_code) {
      const code = form.country_code.replace("+", "");
      return `+${code}${local.startsWith("0") ? local.slice(1) : local}`;
    }
    return local;
  };

  const validateForm = () => {
    if (!form.first_name.trim())      { toast("error", "First name is required"); return false; }
    if (!form.last_name.trim())       { toast("error", "Last name is required"); return false; }
    if (!form.email.trim())           { toast("error", "Email is required"); return false; }
    if (!form.password.trim())        { toast("error", "Password is required"); return false; }
    if (!form.confirm_password.trim()){ toast("error", "Please confirm your password"); return false; }
    if (form.password.length < 6)     { toast("error", "Password must be at least 6 characters"); return false; }
    if (form.password.length > 72)    { toast("error", "Password must not exceed 72 characters"); return false; }
    if (form.password !== form.confirm_password) { toast("error", "Passwords do not match"); return false; }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    try {
      setLoading(true);
      const payload = {
        full_name: fullName,
        email: form.email.trim().toLowerCase(),
        password: form.password,
        country: form.country.trim() || null,
        phone: normalizePhone(),
        business_type_id: form.business_type_id ? Number(form.business_type_id) : null,
        role: form.role || "buyer",
      };
      const { data } = await api.post("/auth/register", payload);
      const token = data?.access_token;
      if (!token) throw new Error("No access token returned");
      localStorage.setItem(TOKEN_KEY, token);
      const me = await api.get("/auth/me", { headers: { Authorization: `Bearer ${token}` } });
      localStorage.setItem(USER_KEY, JSON.stringify(me.data || {}));
      toast("success", "Account created successfully");
      navigate("/dashboard", { replace: true });
    } catch (err) {
      toast("error", err?.response?.data?.detail || err?.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ 
      minHeight: "100vh", 
      bgcolor: "#ffffff", 
      display: "flex", 
      alignItems: "center", 
      justifyContent: "center",
      py: 4,
      px: 2
    }}>
      <Paper elevation={0} sx={{ 
        maxWidth: 520, 
        width: "100%", 
        borderRadius: 4,
        p: { xs: 3, sm: 5 },
        boxShadow: "0 20px 35px -10px rgba(0,0,0,0.08), 0 1px 2px rgba(0,0,0,0.02)",
        border: "1px solid #eef2f6"
      }}>
        <Box sx={{ textAlign: "center", mb: 3 }}>
          <Box component="img" src={logo} alt="Dali Data Portal" sx={{ height: 56, objectFit: "contain", mb: 1.5 }} />
          <Typography sx={{ fontSize: 26, fontWeight: 700, color: text, letterSpacing: "-0.3px" }}>
            Create account
          </Typography>
          <Typography sx={{ mt: 1, fontSize: 14, color: textMuted }}>
            Join DALI Data Portal to access and monetize data
          </Typography>
        </Box>

        <Divider sx={{ borderColor: "#eef2f6", mb: 3 }} />

        <Box component="form" onSubmit={handleSubmit}>
          <Stack direction={{ xs: "column", sm: "row" }} spacing={2} sx={{ mb: 0.5 }}>
            <TextField 
              fullWidth 
              label="First Name" 
              name="first_name" 
              value={form.first_name} 
              onChange={handleChange} 
              variant="outlined"
              InputProps={{
                startAdornment: <InputAdornment position="start"><User size={18} color={ACCENT} /></InputAdornment>,
              }}
              sx={{
                '& .MuiOutlinedInput-root': { borderRadius: 2, backgroundColor: '#fafcfc' },
                '& .MuiInputLabel-root': { color: textMuted },
                '& .MuiInputLabel-root.Mui-focused': { color: ACCENT },
                '& .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline': { borderColor: ACCENT, opacity: 0.5 },
                '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: ACCENT, borderWidth: 1.5 },
              }}
            />
            <TextField 
              fullWidth 
              label="Last Name" 
              name="last_name" 
              value={form.last_name} 
              onChange={handleChange} 
              variant="outlined"
              InputProps={{
                startAdornment: <InputAdornment position="start"><User size={18} color={ACCENT} /></InputAdornment>,
              }}
              sx={{
                '& .MuiOutlinedInput-root': { borderRadius: 2, backgroundColor: '#fafcfc' },
                '& .MuiInputLabel-root': { color: textMuted },
                '& .MuiInputLabel-root.Mui-focused': { color: ACCENT },
                '& .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline': { borderColor: ACCENT, opacity: 0.5 },
                '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: ACCENT, borderWidth: 1.5 },
              }}
            />
          </Stack>

          <TextField 
            fullWidth 
            label="Email" 
            name="email" 
            type="email" 
            value={form.email} 
            onChange={handleChange} 
            margin="normal"
            variant="outlined"
            InputProps={{
              startAdornment: <InputAdornment position="start"><Mail size={18} color={ACCENT} /></InputAdornment>,
            }}
            sx={{
              '& .MuiOutlinedInput-root': { borderRadius: 2, backgroundColor: '#fafcfc' },
              '& .MuiInputLabel-root': { color: textMuted },
              '& .MuiInputLabel-root.Mui-focused': { color: ACCENT },
              '& .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline': { borderColor: ACCENT, opacity: 0.5 },
              '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: ACCENT, borderWidth: 1.5 },
            }}
          />

          <TextField 
            fullWidth 
            select 
            label="Country" 
            name="country" 
            value={form.country} 
            onChange={handleChange} 
            margin="normal"
            variant="outlined"
            InputProps={{
              startAdornment: <InputAdornment position="start"><Globe size={18} color={ACCENT} /></InputAdornment>,
            }}
            SelectProps={{ MenuProps: { PaperProps: { sx: { maxHeight: 260 } } } }}
            sx={{
              '& .MuiOutlinedInput-root': { borderRadius: 2, backgroundColor: '#fafcfc' },
              '& .MuiInputLabel-root': { color: textMuted },
              '& .MuiInputLabel-root.Mui-focused': { color: ACCENT },
              '& .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline': { borderColor: ACCENT, opacity: 0.5 },
              '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: ACCENT, borderWidth: 1.5 },
            }}
          >
            <MenuItem value="">Select country</MenuItem>
            {COUNTRIES.map(c => <MenuItem key={c.code} value={c.name}>{c.name}</MenuItem>)}
          </TextField>

          <TextField 
            fullWidth 
            label="Phone Number" 
            name="phone" 
            value={form.phone} 
            onChange={handleChange} 
            margin="normal"
            placeholder="Enter phone number"
            variant="outlined"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1, color: text, pr: 1, borderRight: "1px solid #e2e8f0" }}>
                    <Phone size={18} color={ACCENT} />
                    <Box component="span" sx={{ fontWeight: 500 }}>{form.country_code || "+---"}</Box>
                  </Box>
                </InputAdornment>
              ),
            }}
            sx={{
              '& .MuiOutlinedInput-root': { borderRadius: 2, backgroundColor: '#fafcfc' },
              '& .MuiInputLabel-root': { color: textMuted },
              '& .MuiInputLabel-root.Mui-focused': { color: ACCENT },
              '& .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline': { borderColor: ACCENT, opacity: 0.5 },
              '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: ACCENT, borderWidth: 1.5 },
            }}
          />

          <TextField 
            fullWidth 
            select 
            label="Business Type" 
            name="business_type_id" 
            value={form.business_type_id} 
            onChange={handleChange} 
            margin="normal"
            variant="outlined"
            InputProps={{
              startAdornment: <InputAdornment position="start"><Briefcase size={18} color={ACCENT} /></InputAdornment>,
            }}
            SelectProps={{ MenuProps: { PaperProps: { sx: { maxHeight: 260 } } } }}
            sx={{
              '& .MuiOutlinedInput-root': { borderRadius: 2, backgroundColor: '#fafcfc' },
              '& .MuiInputLabel-root': { color: textMuted },
              '& .MuiInputLabel-root.Mui-focused': { color: ACCENT },
              '& .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline': { borderColor: ACCENT, opacity: 0.5 },
              '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: ACCENT, borderWidth: 1.5 },
            }}
          >
            <MenuItem value="">{businessTypesLoading ? "Loading..." : "Select business type"}</MenuItem>
            {businessTypes.map(item => <MenuItem key={item.id} value={item.id}>{item.name || item.title || `Type ${item.id}`}</MenuItem>)}
          </TextField>

          <TextField 
            fullWidth 
            label="Password" 
            name="password" 
            type={showPw ? "text" : "password"} 
            value={form.password} 
            onChange={handleChange} 
            margin="normal"
            helperText="Password must be 6 to 72 characters"
            variant="outlined"
            InputProps={{
              startAdornment: <InputAdornment position="start"><Lock size={18} color={ACCENT} /></InputAdornment>,
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={() => setShowPw(p => !p)} edge="end" sx={{ color: textMuted }}>
                    {showPw ? <EyeOff size={18} /> : <Eye size={18} />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
            sx={{
              '& .MuiOutlinedInput-root': { borderRadius: 2, backgroundColor: '#fafcfc' },
              '& .MuiInputLabel-root': { color: textMuted },
              '& .MuiInputLabel-root.Mui-focused': { color: ACCENT },
              '& .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline': { borderColor: ACCENT, opacity: 0.5 },
              '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: ACCENT, borderWidth: 1.5 },
              '& .MuiFormHelperText-root': { color: textMuted, fontSize: 12, mt: 0.5 }
            }}
          />

          <TextField 
            fullWidth 
            label="Confirm Password" 
            name="confirm_password" 
            type={showConfirmPw ? "text" : "password"} 
            value={form.confirm_password} 
            onChange={handleChange} 
            margin="normal"
            variant="outlined"
            InputProps={{
              startAdornment: <InputAdornment position="start"><Lock size={18} color={ACCENT} /></InputAdornment>,
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={() => setShowConfirmPw(p => !p)} edge="end" sx={{ color: textMuted }}>
                    {showConfirmPw ? <EyeOff size={18} /> : <Eye size={18} />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
            sx={{
              '& .MuiOutlinedInput-root': { borderRadius: 2, backgroundColor: '#fafcfc' },
              '& .MuiInputLabel-root': { color: textMuted },
              '& .MuiInputLabel-root.Mui-focused': { color: ACCENT },
              '& .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline': { borderColor: ACCENT, opacity: 0.5 },
              '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: ACCENT, borderWidth: 1.5 },
            }}
          />

          <Button 
            type="submit" 
            fullWidth 
            disabled={loading} 
            sx={{ 
              mt: 3, 
              height: 50, 
              borderRadius: 2.5, 
              fontWeight: 700, 
              textTransform: "none", 
              fontSize: 16,
              bgcolor: ACCENT, 
              color: "#fff", 
              boxShadow: `0 4px 12px ${ACCENT}30`,
              "&:hover": { bgcolor: "#49b2b1", boxShadow: `0 6px 16px ${ACCENT}40` }, 
              "&.Mui-disabled": { bgcolor: "rgba(94,196,195,0.5)", color: "#fff" } 
            }}
          >
            {loading ? "Creating account..." : "Create Account"}
          </Button>

          {/* Logo section */}
          <Box
            sx={{
              mt: 2,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Box
              component="img"
              src={icon12}
              alt="Dali icon"
              sx={{
                height: 32,
                width: "auto",
                objectFit: "contain",
                opacity: 0.7,
                transition: "opacity 0.3s ease",
                '&:hover': { opacity: 1 },
              }}
            />
          </Box>

          <Typography sx={{ textAlign: "center", mt: 2, fontSize: 14, color: textMuted }}>
            Already have an account?{" "}
            <Link component={RouterLink} to="/login" underline="none" sx={{ color: ACCENT, fontWeight: 700 }}>Sign in</Link>
          </Typography>

          <Typography sx={{ textAlign: "center", mt: 2, fontSize: 12, color: textMuted, opacity: 0.6 }}>
            © {new Date().getFullYear()} DALI Data Portal
          </Typography>
        </Box>
      </Paper>
    </Box>
  );
}