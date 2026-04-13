import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box, Container, Typography, TextField, InputAdornment, Card, CardContent,
  Chip, Slider, LinearProgress,
} from "@mui/material";
import {
  Search, DollarSign, ChevronUp, Calendar, FileIcon, HardDrive, Download,
  MoreVertical, TrendingUp, ShoppingCart, Heart, Filter, SlidersHorizontal,
  CheckCircle, Star,
} from "lucide-react";
import PageLayout from "../components/PageLayout";
import { useThemeColors } from "../../../utils/useThemeColors";

const budgetDatasets = [
  { id: 1, title: "Global Climate Data 2024", author: "GreenData Inc.", category: "Agriculture and Environment", usability: "10.0", updated: "Updated 2 days ago", files: "3 Files (CSV)", size: "2.5 GB", downloads: "1,245 downloads", votes: 48, image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=900&q=80", price: 299, rating: 4.8, license: "CC BY 4.0", tier: "Standard" },
  { id: 2, title: "Financial Markets Analysis", author: "FinTech Solutions", category: "Finance and Investment", usability: "9.8", updated: "Updated 5 days ago", files: "2 Files (CSV)", size: "1.8 GB", downloads: "892 downloads", votes: 35, image: "https://images.unsplash.com/photo-1460925895917-adf4e5d1baaa?auto=format&fit=crop&w=900&q=80", price: 599, rating: 4.9, license: "CC BY 4.0", tier: "Premium" },
  { id: 3, title: "Healthcare Patient Records", author: "MedData Corp", category: "Social Services", usability: "9.5", updated: "Updated 1 day ago", files: "4 Files (JSON)", size: "5.2 GB", downloads: "0 downloads", votes: 0, image: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=900&q=80", price: 899, rating: 4.7, license: "Research Only", tier: "Enterprise" },
  { id: 4, title: "AI Training Dataset - Images", author: "AIDataHub", category: "Computer Science", usability: "10.0", updated: "Updated 3 days ago", files: "5 Files (Images)", size: "15 GB", downloads: "2,100 downloads", votes: 67, image: "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?auto=format&fit=crop&w=900&q=80", price: 899, rating: 4.9, license: "CC BY 4.0", tier: "Enterprise" },
  { id: 5, title: "Crop Yield Data 2024", author: "AgriResearch", category: "Agriculture and Environment", usability: "9.2", updated: "Updated 10 days ago", files: "2 Files (CSV)", size: "340 MB", downloads: "0 downloads", votes: 0, image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=900&q=80", price: 199, rating: 4.5, license: "Open Data", tier: "Basic" },
  { id: 6, title: "Urban Development Stats", author: "CityData Labs", category: "Urban Development and Housing", usability: "9.7", updated: "Updated 7 days ago", files: "3 Files (CSV)", size: "1.2 GB", downloads: "560 downloads", votes: 29, image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=900&q=80", price: 349, rating: 4.5, license: "CC BY 4.0", tier: "Standard" },
  { id: 7, title: "Social Media Analytics 2024", author: "SocialMetrics", category: "ICT and Digital Economy", usability: "9.6", updated: "Updated 6 days ago", files: "4 Files (CSV)", size: "1.2 GB", downloads: "1,102 downloads", votes: 44, image: "https://images.unsplash.com/photo-1516110833967-0b5442fabffd?auto=format&fit=crop&w=900&q=80", price: 349, rating: 4.7, license: "CC BY 4.0", tier: "Standard" },
  { id: 8, title: "Energy Consumption Patterns", author: "EnergyStats", category: "Natural Resources and Energy", usability: "9.8", updated: "Updated 8 days ago", files: "5 Files (CSV)", size: "4.2 GB", downloads: "678 downloads", votes: 38, image: "https://images.unsplash.com/photo-1556228578-8c89e6adf883?auto=format&fit=crop&w=900&q=80", price: 449, rating: 4.6, license: "Open Data", tier: "Standard" },
];

const pricingTiers = [
  { name: "Basic", price: "$200/month", color: "#22c55e", features: ["Email notifications only", "Single user license", "Basic support", "30-day access"] },
  { name: "Standard", price: "$5000/month", color: "#3b82f6", features: ["Up to 5 users", "Multiple formats", "Priority support", "Unlimited access", "API access"] },
  { name: "Premium", price: "$15000/month", color: "#8b5cf6", features: ["Up to 20 users", "All formats", "Dedicated support", "Unlimited access", "API + webhooks", "Custom exports"] },
  { name: "Enterprise", price: "$3000/month", color: "#f59e0b", features: ["Unlimited users", "All formats", "24/7 support", "Unlimited access", "Full API suite", "Custom integrations", "SLA guarantee"] },
];

export default function BudgetPage() {
  const navigate = useNavigate();
  const themeColors = useThemeColors();
  const PRIMARY = themeColors.teal;

  const [search, setSearch] = useState("");
  const [budgetRange, setBudgetRange] = useState([0, 1000]);
  const [selectedTier, setSelectedTier] = useState("All");
  const [cart, setCart] = useState([]);
  const [wishlist, setWishlist] = useState([]);

  const tiers = ["All", "Basic", "Standard", "Premium", "Enterprise"];

  const filtered = budgetDatasets.filter(d => {
    const ms = d.title.toLowerCase().includes(search.toLowerCase()) || d.author.toLowerCase().includes(search.toLowerCase());
    const mp = d.price >= budgetRange[0] && d.price <= budgetRange[1];
    const mt = selectedTier === "All" || d.tier === selectedTier;
    return ms && mp && mt;
  });

  const cartTotal = cart.reduce((s, id) => s + (budgetDatasets.find(d => d.id === id)?.price || 0), 0);

  const toggleCart = (id) => setCart(prev => prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]);
  const toggleWishlist = (id) => setWishlist(prev => prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]);

  const tierColor = { Basic: "#22c55e", Standard: "#3b82f6", Premium: "#8b5cf6", Enterprise: "#f59e0b" };

  return (
    <PageLayout>
      <Box sx={{ minHeight: "100vh", backgroundColor: "var(--bg-gray)", py: 4 }}>
        <Container maxWidth="xl">
          {/* Header */}
          <Box sx={{ mb: 4 }}>
            <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, mb: 1 }}>
              <DollarSign size={28} color={PRIMARY} />
              <Typography sx={{ fontSize: "1.8rem", fontWeight: 800, color: "var(--text-dark)" }}>Budget Planner</Typography>
            </Box>
            <Typography sx={{ color: "var(--text-muted)", fontSize: "1rem" }}>
              Find datasets that fit your budget. Compare pricing tiers and plan your data purchases.
            </Typography>
          </Box>

          {/* Cart Summary */}
          {cart.length > 0 && (
            <Card sx={{ borderRadius: 2, border: `2px solid ${PRIMARY}`, boxShadow: "none", mb: 3, backgroundColor: `${PRIMARY}15` }}>
              <CardContent sx={{ p: 2, display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 2 }}>
                <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
                  <ShoppingCart size={20} color={PRIMARY} />
                  <Typography sx={{ fontWeight: 700, color: "var(--text-dark)" }}>{cart.length} dataset{cart.length > 1 ? "s" : ""} in cart</Typography>
                </Box>
                <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                  <Typography sx={{ fontSize: "1.2rem", fontWeight: 800, color: PRIMARY }}>Total: ${cartTotal.toLocaleString()}</Typography>
                  <Box sx={{ px: 2.5, py: 1, backgroundColor: PRIMARY, borderRadius: "8px", cursor: "pointer" }}>
                    <Typography sx={{ color: "#fff", fontWeight: 700, fontSize: "0.9rem" }}>Checkout</Typography>
                  </Box>
                </Box>
              </CardContent>
            </Card>
          )}

          {/* Search */}
          <TextField fullWidth placeholder="Search datasets by name, author, category..." value={search} onChange={e => setSearch(e.target.value)} variant="outlined"
            sx={{ mb: 3, backgroundColor: "var(--bg-white)", borderRadius: "10px", "& .MuiOutlinedInput-root": { borderRadius: "10px", height: 50 } }}
            InputProps={{ startAdornment: <InputAdornment position="start"><Search size={20} color="var(--text-muted)" /></InputAdornment> }}
          />

          <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", md: "280px 1fr" }, gap: 4, alignItems: "start" }}>
            {/* Sidebar Filters */}
            <Box>
              {/* Budget Slider */}
              <Card sx={{ borderRadius: 2, border: `1px solid var(--border-color)`, boxShadow: "none", mb: 2 }}>
                <CardContent sx={{ p: 2.5 }}>
                  <Typography sx={{ fontWeight: 700, color: "var(--text-dark)", mb: 2 }}>Budget Range</Typography>
                  <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
                    <Typography sx={{ fontSize: "0.85rem", color: "var(--text-muted)" }}>${budgetRange[0]}</Typography>
                    <Typography sx={{ fontSize: "0.85rem", color: "var(--text-muted)" }}>${budgetRange[1]}</Typography>
                  </Box>
                  <Slider value={budgetRange} onChange={(_, v) => setBudgetRange(v)} min={0} max={1000} step={50}
                    sx={{ color: PRIMARY, "& .MuiSlider-thumb": { backgroundColor: PRIMARY }, "& .MuiSlider-track": { backgroundColor: PRIMARY } }}
                  />
                  <Typography sx={{ fontSize: "0.8rem", color: "var(--text-muted)", mt: 1 }}>{filtered.length} datasets in range</Typography>
                </CardContent>
              </Card>

              {/* Tier Filter */}
              <Card sx={{ borderRadius: 2, border: `1px solid var(--border-color)`, boxShadow: "none", mb: 2 }}>
                <CardContent sx={{ p: 2.5 }}>
                  <Typography sx={{ fontWeight: 700, color: "var(--text-dark)", mb: 1.5 }}>Pricing Tier</Typography>
                  <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
                    {tiers.map(t => (
                      <Box key={t} onClick={() => setSelectedTier(t)} sx={{ display: "flex", alignItems: "center", gap: 1.5, p: 1.2, borderRadius: 1.5, cursor: "pointer", backgroundColor: selectedTier === t ? "#e6f7f6" : "transparent", border: selectedTier === t ? `1px solid ${PRIMARY}` : "1px solid transparent", "&:hover": { backgroundColor: "var(--hover-bg)" } }}>
                        {selectedTier === t && <CheckCircle size={14} color={PRIMARY} />}
                        <Typography sx={{ fontSize: "0.9rem", fontWeight: selectedTier === t ? 600 : 400, color: selectedTier === t ? PRIMARY : "var(--text-dark)" }}>{t}</Typography>
                      </Box>
                    ))}
                  </Box>
                </CardContent>
              </Card>

              {/* Subscription Plans */}
              <Card sx={{ borderRadius: 2, border: `1px solid var(--border-color)`, boxShadow: "none" }}>
                <CardContent sx={{ p: 2.5 }}>
                  <Typography sx={{ fontWeight: 700, color: "var(--text-dark)", mb: 1.5 }}>Subscription Plans</Typography>
                  <Typography sx={{ fontSize: "0.75rem", color: "var(--text-muted)", mb: 2 }}>Choose a plan that works for you</Typography>
                  {pricingTiers.map(tier => (
                    <Box key={tier.name} sx={{ mb: 2, p: 1.5, borderRadius: 1.5, backgroundColor: `${tier.color}15`, border: `1px solid ${tier.color}40` }}>
                      <Box sx={{ display: "flex", justifyContent: "space-between", mb: 0.8, alignItems: "center" }}>
                        <Typography sx={{ fontWeight: 700, color: tier.color, fontSize: "0.9rem" }}>{tier.name}</Typography>
                        <Typography sx={{ fontSize: "0.75rem", fontWeight: 700, color: tier.color }}>{tier.price}</Typography>
                      </Box>
                      {tier.features.slice(0, 3).map(f => (
                        <Box key={f} sx={{ display: "flex", alignItems: "center", gap: 0.8, mb: 0.3 }}>
                          <CheckCircle size={11} color={tier.color} />
                          <Typography sx={{ fontSize: "0.75rem", color: "var(--text-dark)" }}>{f}</Typography>
                        </Box>
                      ))}
                    </Box>
                  ))}
                </CardContent>
              </Card>
            </Box>

            {/* Dataset Cards */}
            <Box>
              <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2 }}>
                <Typography sx={{ fontWeight: 700, color: "var(--text-dark)" }}>{filtered.length} datasets found</Typography>
                <Box sx={{ display: "flex", gap: 1 }}>
                  {["Price: Low", "Price: High", "Rating", "Popular"].map(s => (
                    <Chip key={s} label={s} size="small" variant="outlined" sx={{ fontSize: "0.78rem", cursor: "pointer", "&:hover": { backgroundColor: "var(--hover-bg)" } }} />
                  ))}
                </Box>
              </Box>

              <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", sm: "repeat(2,1fr)", xl: "repeat(3,1fr)" }, gap: 2.5 }}>
                {filtered.map(d => (
                  <BudgetDatasetCard key={d.id} dataset={d} inCart={cart.includes(d.id)} inWishlist={wishlist.includes(d.id)}
                    onCart={() => toggleCart(d.id)} onWishlist={() => toggleWishlist(d.id)}
                    onOpen={() => navigate(`/dataset-info/${d.id}`, { state: { dataset: d } })}
                    tierColor={tierColor[d.tier]}
                  />
                ))}
              </Box>

              {filtered.length === 0 && (
                <Box sx={{ textAlign: "center", py: 8 }}>
                  <DollarSign size={48} color="var(--border-color)" style={{ margin: "0 auto 16px" }} />
                  <Typography sx={{ color: "var(--text-muted)" }}>No datasets match your budget criteria</Typography>
                </Box>
              )}
            </Box>
          </Box>
        </Container>
      </Box>
    </PageLayout>
  );
}

function BudgetDatasetCard({ dataset, inCart, inWishlist, onCart, onWishlist, onOpen, tierColor }) {
  return (
    <Card sx={{ borderRadius: "12px", overflow: "hidden", border: `1px solid var(--border-color)`, boxShadow: "none", transition: "all 0.3s ease", cursor: "pointer", "&:hover": { transform: "translateY(-4px)", boxShadow: "0 10px 24px rgba(97,197,195,0.12)", borderColor: PRIMARY } }}>
      <Box sx={{ height: 150, backgroundImage: `url(${dataset.image})`, backgroundSize: "cover", backgroundPosition: "center", position: "relative" }} onClick={onOpen}>
        <Box sx={{ position: "absolute", top: 8, left: 8, px: 1, py: 0.3, borderRadius: 1, backgroundColor: tierColor || "var(--text-muted)" }}>
          <Typography sx={{ fontSize: "0.7rem", fontWeight: 700, color: "#fff" }}>{dataset.tier}</Typography>
        </Box>
        <Box sx={{ position: "absolute", top: 8, right: 8, display: "flex", gap: 0.8 }}>
          <Box onClick={e => { e.stopPropagation(); onWishlist(); }} sx={{ p: 0.8, borderRadius: "50%", backgroundColor: "rgba(0,0,0,0.5)", cursor: "pointer", display: "flex" }}>
            <Heart size={14} color={inWishlist ? "#f87171" : "#fff"} fill={inWishlist ? "#f87171" : "none"} />
          </Box>
        </Box>
      </Box>

      <CardContent sx={{ p: 2 }} onClick={onOpen}>
        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 1, mb: 0.8 }}>
          <Typography sx={{ fontSize: "0.92rem", fontWeight: 700, color: "var(--text-dark)", lineHeight: 1.4, display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden" }}>{dataset.title}</Typography>
          <MoreVertical size={15} color="var(--text-muted)" style={{ flexShrink: 0 }} />
        </Box>
        <Typography sx={{ fontSize: "0.82rem", color: "var(--text-dark)", fontWeight: 500, mb: 0.8 }}>{dataset.author}</Typography>
        <Box sx={{ display: "flex", alignItems: "center", gap: 0.8, mb: 1.2, fontSize: "0.75rem", color: "var(--text-muted)" }}>
          <span>Usability <b style={{ color: "var(--text-dark)" }}>{dataset.usability}</b></span>
          <Box sx={{ width: 3, height: 3, borderRadius: "50%", backgroundColor: "var(--border-color)" }} />
          <Calendar size={11} /><span>{dataset.updated}</span>
        </Box>

        <Box sx={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 0.6, mb: 1.5, pb: 1.5, borderBottom: `1px solid var(--border-color)` }}>
          {[{ icon: <FileIcon size={12} color={PRIMARY} />, label: dataset.files }, { icon: <HardDrive size={12} color={PRIMARY} />, label: dataset.size }, { icon: <Download size={12} color={PRIMARY} />, label: dataset.downloads }].map((item, i) => (
            <Box key={i} sx={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 0.3, p: 0.6, borderRadius: 1, backgroundColor: "var(--bg-secondary)" }}>
              {item.icon}
              <Typography sx={{ fontSize: "0.62rem", color: "var(--text-muted)", textAlign: "center", lineHeight: 1.2 }}>{item.label}</Typography>
            </Box>
          ))}
        </Box>

        <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <Box sx={{ display: "flex", alignItems: "center", border: `1px solid var(--border-color)`, borderRadius: "6px", overflow: "hidden" }}>
            <Box sx={{ px: 0.8, py: 0.3, borderRight: `1px solid var(--border-color)`, display: "flex", alignItems: "center" }}><ChevronUp size={12} /></Box>
            <Box sx={{ px: 1, py: 0.3 }}><Typography sx={{ fontSize: "0.75rem", fontWeight: 700 }}>{dataset.votes}</Typography></Box>
          </Box>
          <Typography sx={{ fontSize: "1rem", fontWeight: 800, color: PRIMARY }}>${dataset.price}</Typography>
        </Box>

        <Box onClick={e => { e.stopPropagation(); onCart(); }} sx={{ mt: 1.5, py: 1, borderRadius: "8px", backgroundColor: inCart ? "#e6f7f6" : PRIMARY, display: "flex", alignItems: "center", justifyContent: "center", gap: 1, cursor: "pointer", border: `1px solid ${PRIMARY}` }}>
          <ShoppingCart size={14} color={inCart ? PRIMARY : "#fff"} />
          <Typography sx={{ fontSize: "0.85rem", fontWeight: 600, color: inCart ? PRIMARY : "#fff" }}>{inCart ? "Remove from Cart" : "Add to Cart"}</Typography>
        </Box>
      </CardContent>
    </Card>
  );
}
