import { useState, useEffect } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import {
  LayoutDashboard, Users, Database, DollarSign, Settings, FileCheck, BarChart3,
  ShoppingCart, Heart, ListChecks, Package, Eye, Bookmark, History, FileText,
  Menu, X, LogOut, Bell, Search, ChevronDown, ChevronRight, User, Zap, Send,
} from 'lucide-react';
import { useThemeColors } from '../../../utils/useThemeColors';
import logo from '../../../assets/dali-data-logo.png';

const TOKEN_KEY = 'dali-token';
const USER_KEY = 'dali-user';

const roleNavItems = {
  admin: [
    { label: 'Overview', href: '/dashboard/admin', icon: LayoutDashboard },
    { label: 'User Management', href: '/dashboard/admin/users', icon: Users },
    { label: 'Datasets', href: '/dashboard/admin/datasets', icon: Database },
    { label: 'Revenue Reports', href: '/dashboard/admin/revenue', icon: DollarSign },
    { label: 'Settings', href: '/dashboard/admin/settings', icon: Settings },
  ],
  editor: [
    { label: 'Overview', href: '/dashboard/editor', icon: LayoutDashboard },
    { label: 'Review Queue', href: '/dashboard/editor/reviews', icon: FileCheck },
    { label: 'Approvals', href: '/dashboard/editor/approvals', icon: ListChecks },
    { label: 'Moderation', href: '/dashboard/editor/moderation', icon: Eye },
    { label: 'Revenue Analytics', href: '/dashboard/editor/analytics', icon: BarChart3 },
    { label: 'Settings', href: '/dashboard/editor/settings', icon: Settings },
  ],
  seller: [
    { label: 'Overview', href: '/dashboard/seller', icon: LayoutDashboard },
    { label: 'Bids & Opportunities', href: '/dashboard/seller/bids', icon: Zap },
    { label: 'Sales Pending', href: '/dashboard/seller/pending', icon: FileCheck },
    { label: 'My Listings', href: '/dashboard/seller/listings', icon: Package },
    { label: 'Sales Analytics', href: '/dashboard/seller/analytics', icon: BarChart3 },
    { label: 'Inventory', href: '/dashboard/seller/inventory', icon: Database },
    { label: 'Advertisements', href: '/dashboard/seller/ads', icon: FileText },
    { label: 'Customer Chats', href: '/dashboard/seller/chats', icon: Users },
  ],
  buyer: [
    { label: 'Overview', href: '/dashboard/buyer', icon: LayoutDashboard },
    { label: 'Project Requests', href: '/dashboard/buyer/requests', icon: Send },
    { label: 'Purchases', href: '/dashboard/buyer/purchases', icon: ShoppingCart },
    { label: 'Wishlist', href: '/dashboard/buyer/wishlist', icon: Heart },
    { label: 'Recommendations', href: '/dashboard/buyer/recommendations', icon: ListChecks },
    { label: 'Budget Tracker', href: '/dashboard/buyer/budget', icon: DollarSign },
  ],
  viewer: [
    { label: 'Overview', href: '/dashboard/viewer', icon: LayoutDashboard },
    { label: 'Browse Datasets', href: '/dashboard/viewer/browse', icon: Database },
    { label: 'Bookmarks', href: '/dashboard/viewer/bookmarks', icon: Bookmark },
    { label: 'View History', href: '/dashboard/viewer/history', icon: History },
    { label: 'Reports', href: '/dashboard/viewer/reports', icon: FileText },
  ],
};

const themeColors = {
  header: "#FF8C00", // Vibrant Orange
  toolbar: "#20B2AA", // Teal
  sidebar: "#04121D", // Dark Blue (from DARK_BG in LogoutPage)
  background: "#F8FAFC",
  accent: "#FF8C00",
  secondary: "#20B2AA",
  text: "#334155",
  activeBg: "linear-gradient(135deg, #FF8C00 0%, #FFA500 100%)",
  activeText: "#FFFFFF",
  sidebarText: "rgba(255, 255, 255, 0.7)",
  sidebarActiveText: "#FFFFFF"
};

const roleStyles = {
  admin: { primary: "#FF8C00", secondary: "#FFF7ED" },
  editor: { primary: "#8B5CF6", secondary: "#F5F3FF" },
  seller: { primary: "#10B981", secondary: "#F0FDF4" },
  buyer: { primary: "#3B82F6", secondary: "#EFF6FF" },
  viewer: { primary: "#64748B", secondary: "#F8FAFC" },
};

const roleTitles = {
  admin: 'Admin Dashboard', editor: 'Editor Dashboard', seller: 'Seller Dashboard',
  buyer: 'Buyer Dashboard', viewer: 'Viewer Dashboard',
};

export default function DashboardLayout({ children, role }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const themeColors = useThemeColors();

  const user = (() => {
    try { return JSON.parse(localStorage.getItem(USER_KEY) || 'null'); } catch { return null; }
  })();

  const navItems = roleNavItems[role] || roleNavItems.viewer;
  const colors = {
    header: "#FF8C00", // Vibrant Orange
    toolbar: "#20B2AA", // Teal
    sidebar: themeColors.bgPanel,
    background: themeColors.bg,
    accent: "#FF8C00",
    secondary: "#20B2AA",
    text: themeColors.text,
    activeBg: "linear-gradient(135deg, #FF8C00 0%, #FFA500 100%)",
    activeText: "#FFFFFF",
    sidebarText: themeColors.isDarkMode ? "rgba(255, 255, 255, 0.7)" : "rgba(0, 0, 0, 0.6)",
    sidebarActiveText: "#FFFFFF",
    sidebarBorder: themeColors.isDarkMode ? "rgba(255, 255, 255, 0.1)" : "#e2e8f0",
    sidebarBg: themeColors.isDarkMode ? "#1E293B" : "#FFFFFF"
  };
  const currentRoleStyle = roleStyles[role] || roleStyles.viewer;
  const title = roleTitles[role] || 'Dashboard';

  const handleLogout = () => {
    navigate('/logout');
  };

  return (
    <div style={{ minHeight: '100vh', backgroundColor: colors.background, color: colors.text, transition: 'all 0.3s ease' }}>
      <style>{`
        @keyframes slideIn {
          from { opacity: 0; transform: translateX(20px); }
          to { opacity: 1; transform: translateX(0); }
        }
        .nav-item {
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          position: relative;
          overflow: hidden;
        }
        .nav-item:hover {
          transform: translateX(-4px);
        }
        .nav-item::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: rgba(255, 255, 255, 0.1);
          transform: scaleX(0);
          transform-origin: right;
          transition: transform 0.3s ease;
          z-index: 0;
        }
        .nav-item:hover::before {
          transform: scaleX(1);
        }
        .active-nav-item {
          box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
        }
        @media (min-width: 1024px) {
          .lg-sidebar { transform: translateX(0) !important; }
          .lg-main { padding-right: 256px !important; }
          .lg-menu-btn { display: none !important; }
        }
      `}</style>

      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          onClick={() => setSidebarOpen(false)}
          style={{ position: 'fixed', inset: 0, zIndex: 40, background: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(4px)', transition: 'all 0.3s' }}
        />
      )}

      {/* Sidebar - Right Side */}
      <aside style={{
        position: 'fixed', top: 0, right: 0, zIndex: 50, height: '100%', width: 256,
        background: colors.sidebarBg,
        borderLeft: `1px solid ${colors.sidebarBorder}`,
        transform: sidebarOpen ? 'translateX(0)' : 'translateX(100%)',
        transition: 'transform 0.4s cubic-bezier(0.4, 0, 0.2, 1), background-color 0.3s ease',
        display: 'flex', flexDirection: 'column',
        boxShadow: themeColors.isDarkMode ? '-10px 0 30px rgba(0,0,0,0.3)' : '-10px 0 30px rgba(0,0,0,0.03)',
      }}
        className="lg-sidebar"
      >
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: 72, padding: '0 20px', borderBottom: `1px solid ${colors.sidebarBorder}`, backgroundColor: colors.sidebarBg, transition: 'all 0.3s ease' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <Link to="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', transition: 'transform 0.2s', '&:hover': { transform: 'scale(1.05)' } }}>
              <img src={logo} alt="DaliData Logo" style={{ height: 36, width: 'auto', objectFit: 'contain', display: 'block' }} />
            </Link>
          </div>
          <button onClick={() => setSidebarOpen(false)} style={{ backgroundColor: colors.card, border: `1px solid ${colors.border}`, color: colors.textMuted, cursor: 'pointer', padding: 6, borderRadius: 10, display: 'flex', transition: 'all 0.2s' }}
            onMouseEnter={e => { e.currentTarget.style.color = '#ef4444'; e.currentTarget.style.borderColor = '#fee2e2'; }}
            onMouseLeave={e => { e.currentTarget.style.color = colors.textMuted; e.currentTarget.style.borderColor = colors.border; }}
          >
            <X size={18} />
          </button>
        </div>

        <nav style={{ padding: '20px 16px', flex: 1, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: 6 }}>
          {navItems.map((item, index) => {
            const isActive = location.pathname === item.href;
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                to={item.href}
                onClick={() => setSidebarOpen(false)}
                className={`nav-item ${isActive ? 'active-nav-item' : ''}`}
                style={{
                  display: 'flex', alignItems: 'center', gap: 12, padding: '12px 16px',
                  borderRadius: 14, fontSize: 14, fontWeight: isActive ? 700 : 500, textDecoration: 'none',
                  background: isActive ? currentRoleStyle.primary : 'transparent',
                  color: isActive ? '#fff' : colors.sidebarText,
                  animation: `slideIn 0.4s ease forwards ${index * 0.05}s`,
                  opacity: 0,
                  zIndex: 1,
                  transition: 'all 0.3s ease'
                }}
              >
                <div style={{
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  width: 32, height: 32, borderRadius: 10,
                  background: isActive ? 'rgba(255,255,255,0.2)' : `${currentRoleStyle.primary}10`,
                  color: isActive ? '#fff' : currentRoleStyle.primary,
                  transition: 'all 0.3s'
                }}>
                  <Icon size={18} />
                </div>
                <span style={{ flex: 1 }}>{item.label}</span>
                {isActive && <ChevronRight size={14} color="#fff" />}
              </Link>
            );
          })}
        </nav>

        {/* Sidebar Footer - User Account */}
        <div style={{ padding: 20, borderTop: `1px solid ${colors.sidebarBorder}`, backgroundColor: themeColors.isDarkMode ? '#1a1f3a' : '#f8fafc', borderBottomRightRadius: 0, transition: 'all 0.3s ease' }}>
           <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 20 }}>
              <div style={{
                 width: 48, height: 48, borderRadius: 16,
                 background: currentRoleStyle.primary, color: '#fff',
                 display: 'flex', alignItems: 'center', justifyContent: 'center',
                 fontWeight: 800, fontSize: 18,
                 boxShadow: `0 8px 16px ${currentRoleStyle.primary}30`,
                 border: `3px solid ${themeColors.isDarkMode ? '#1E293B' : '#fff'}`
              }}>
                 {user?.name ? user.name.split(' ').map(n => n[0]).join('').toUpperCase() : role[0].toUpperCase()}
              </div>
              <div style={{ overflow: 'hidden' }}>
                 <div style={{ fontSize: 15, fontWeight: 800, color: colors.text, whiteSpace: 'nowrap', textOverflow: 'ellipsis' }}>{user?.name || 'User'}</div>
                 <div style={{ 
                    display: 'inline-block', fontSize: 10, fontWeight: 700, 
                    color: currentRoleStyle.primary, background: `${currentRoleStyle.primary}15`,
                    padding: '2px 8px', borderRadius: 6, textTransform: 'uppercase', letterSpacing: '0.05em',
                    marginTop: 2
                 }}>
                    {role}
                 </div>
              </div>
           </div>
           
           <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
              <button
                onClick={() => { setSidebarOpen(false); navigate('/profile'); }}
                style={{
                  display: 'flex', alignItems: 'center', gap: 12, width: '100%', padding: '10px 14px',
                  backgroundColor: themeColors.isDarkMode ? '#2d3748' : '#f1f5f9', border: `1px solid ${colors.border}`, cursor: 'pointer', fontSize: 13,
                  color: colors.text, borderRadius: 12, fontWeight: 600, transition: 'all 0.2s',
                  boxShadow: themeColors.isDarkMode ? '0 2px 4px rgba(0,0,0,0.2)' : '0 2px 4px rgba(0,0,0,0.02)'
                }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = currentRoleStyle.primary; e.currentTarget.style.color = currentRoleStyle.primary; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = colors.border; e.currentTarget.style.color = colors.text; }}
              >
                <User size={18} /> Profile Details
              </button>
              <button
                onClick={handleLogout}
                style={{ 
                  display: 'flex', alignItems: 'center', gap: 12, width: '100%', padding: '10px 14px', 
                  background: 'none', border: '1px solid transparent', cursor: 'pointer', fontSize: 13, 
                  color: '#ef4444', borderRadius: 12, fontWeight: 700, transition: 'all 0.2s' 
                }}
                onMouseEnter={e => { e.currentTarget.style.background = '#fef2f2'; e.currentTarget.style.borderColor = '#fee2e2'; }}
                onMouseLeave={e => { e.currentTarget.style.background = 'none'; e.currentTarget.style.borderColor = 'transparent'; }}
              >
                <LogOut size={18} /> Sign Out
              </button>
           </div>
        </div>
      </aside>

      {/* Desktop Sidebar always visible style is already in the <style> tag above */}

      {/* Main content */}
      <div className="lg-main" style={{ paddingRight: 0, transition: 'padding 0.3s ease' }}>
        {/* Header */}
        <header style={{
          position: 'sticky', top: 0, zIndex: 30,
          background: themeColors.isDarkMode ? '#1a1f2e' : colors.header,
          boxShadow: themeColors.isDarkMode ? '0 4px 20px rgba(0,0,0,0.3)' : '0 4px 20px rgba(255,140,0,0.15)',
          borderBottom: themeColors.isDarkMode ? `1px solid ${themeColors.border}` : 'none',
          transition: 'all 0.3s ease'
        }}>
          <div style={{ display: 'flex', height: 72, alignItems: 'center', justifyContent: 'space-between', padding: '0 32px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
              <button
                className="lg-menu-btn"
                onClick={() => setSidebarOpen(true)}
                style={{ background: themeColors.isDarkMode ? 'rgba(255,255,255,0.1)' : 'rgba(255,255,255,0.15)', border: 'none', color: themeColors.isDarkMode ? themeColors.text : '#fff', cursor: 'pointer', padding: 10, borderRadius: 12, display: 'flex', transition: 'all 0.3s ease' }}
              >
                <Menu size={22} />
              </button>
              <h1 style={{ fontSize: 24, fontWeight: 800, color: themeColors.isDarkMode ? themeColors.text : '#fff', margin: 0, letterSpacing: '-0.03em', transition: 'color 0.3s ease' }}>{title}</h1>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
              {/* Search */}
              <div style={{ display: 'flex', alignItems: 'center', background: themeColors.isDarkMode ? 'rgba(255,255,255,0.08)' : 'rgba(255,255,255,0.12)', borderRadius: 14, padding: '10px 20px', gap: 12, border: `1px solid ${themeColors.isDarkMode ? 'rgba(255,255,255,0.1)' : 'rgba(255,255,255,0.1)'}`, transition: 'all 0.2s' }}>
                <Search size={18} color={themeColors.isDarkMode ? 'rgba(255,255,255,0.6)' : 'rgba(255,255,255,0.9)'} />
                <input
                  placeholder="Search dashboard..."
                  style={{ background: 'transparent', border: 'none', color: themeColors.isDarkMode ? themeColors.text : '#fff', fontSize: 14, outline: 'none', width: 200, fontWeight: 500, transition: 'all 0.3s ease' }}
                />
              </div>

              {/* Notifications */}
              <div style={{ position: 'relative' }}>
                <button style={{ background: themeColors.isDarkMode ? 'rgba(255,255,255,0.08)' : 'rgba(255,255,255,0.12)', border: 'none', color: themeColors.isDarkMode ? themeColors.text : '#fff', cursor: 'pointer', padding: 10, borderRadius: 12, display: 'flex', transition: 'all 0.2s' }}>
                  <Bell size={22} />
                </button>
                <span style={{
                  position: 'absolute', top: -4, right: -4, width: 20, height: 20,
                  background: '#ef4444', borderRadius: '50%', fontSize: 11, fontWeight: 800,
                  display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff',
                  border: `3px solid ${themeColors.isDarkMode ? '#1a1f2e' : '#FF8C00'}`, boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
                }}>3</span>
              </div>
            </div>
          </div>

          {/* Subheader */}
          <div style={{ height: 52, background: themeColors.isDarkMode ? colors.background : colors.toolbar, display: 'flex', alignItems: 'center', padding: '0 32px', boxShadow: themeColors.isDarkMode ? `inset 0 1px 0 ${themeColors.border}` : 'inset 0 2px 10px rgba(0,0,0,0.05)', transition: 'all 0.3s ease' }}>
             <div style={{ display: 'flex', alignItems: 'center', gap: 24 }}>
                <Link to={location.pathname} style={{ color: themeColors.isDarkMode ? themeColors.text : '#fff', fontSize: 14, fontWeight: 700, textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 8, background: themeColors.isDarkMode ? themeColors.bgSecondary : 'rgba(255,255,255,0.15)', padding: '6px 14px', borderRadius: 10, transition: 'all 0.3s ease' }}>
                   <LayoutDashboard size={16} /> Overview
                </Link>
                <div style={{ width: 1, height: 20, background: themeColors.isDarkMode ? themeColors.border : 'rgba(255,255,255,0.2)', transition: 'all 0.3s ease' }} />
                <span style={{ color: themeColors.isDarkMode ? themeColors.textMuted : 'rgba(255,255,255,0.9)', fontSize: 13, fontWeight: 600, letterSpacing: '0.01em', transition: 'color 0.3s ease' }}>
                   Platform / <span style={{ textTransform: 'capitalize', color: themeColors.isDarkMode ? themeColors.text : 'rgba(255,255,255,0.9)' }}>{role}</span> / {location.pathname.split('/').pop().split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')}
                </span>
             </div>
          </div>
        </header>

        {/* Page content */}
        <main style={{ padding: '32px', width: '100%', boxSizing: 'border-box', maxWidth: '1600px', margin: '0 auto', backgroundColor: colors.background, transition: 'all 0.3s ease' }}>
          {children}
        </main>
      </div>
    </div>
  );
}
