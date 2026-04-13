// src/App.jsx

import { Routes, Route, Navigate } from "react-router-dom";
import { ThemeProvider as MuiThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider, useTheme } from "./context/ThemeContext";
import { lightTheme, darkTheme } from "./theme";
import "./App.css";

/* ===================== Public ===================== */

import OnboardPage from "./pages/OnboardPage.jsx";
import RegisterPage from "./pages/RegisterPage.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import ForgotPasswordPage from "./pages/ForgotPasswordPage.jsx";
import NewPassword from "./pages/NewPassword.jsx";

import DatasetsPage from "./pages/public/dataset/DatasetsPage.jsx";
import DatasetInfo from "./pages/public/dataset/DatasetInfo.jsx";
import TradePage from "./pages/public/trade/TradePage.jsx";

import BudgetPage from "./pages/public/budget/BudgetPage.jsx";
import ProjectPage from "./pages/public/project/ProjectPage.jsx";
import FundsPage from "./pages/public/funds/FundsPage.jsx";
import AnalysisPage from "./pages/public/analysis/AnalysisPage.jsx";
import ReportsPage from "./pages/public/reports/ReportsPage.jsx";
/* ===================== User Profile ===================== */

import UserProfile from "./pages/profile/UserProfile";

/* ===================== Dashboards ===================== */

import BuyerDashboard from "./pages/dashboard/BuyerDashboard";
import SellerDashboard from "./pages/dashboard/SellerDashboard";
import EditorDashboard from "./pages/dashboard/EditorDashboard";
import AdminDashboard from "./pages/dashboard/AdminDashboard";
import ViewerDashboard from "./pages/dashboard/ViewerDashboard";

/* ===================== Admin Sub-pages ===================== */
import AdminUsersPage from "./pages/dashboard/admin/UsersPage";
import AdminDatasetsPage from "./pages/dashboard/admin/DatasetsPage";
import AdminRevenueReportsPage from "./pages/dashboard/admin/RevenueReportsPage";
import SettingsPage from "./pages/dashboard/components/SettingsPage";

/* ===================== Editor Sub-pages ===================== */
import EditorReviewsPage from "./pages/dashboard/editor/ReviewsPage";
import EditorApprovalsPage from "./pages/dashboard/editor/ApprovalsPage";
import EditorModerationPage from "./pages/dashboard/editor/ModerationPage";
import EditorRevenueAnalyticsPage from "./pages/dashboard/editor/RevenueAnalyticsPage";

/* ===================== Buyer Sub-pages ===================== */
import BuyerPurchasesPage from "./pages/dashboard/buyer/PurchasesPage";
import BuyerWishlistPage from "./pages/dashboard/buyer/WishlistPage";
import BuyerRecommendationsPage from "./pages/dashboard/buyer/RecommendationsPage";
import BuyerBudgetTrackerPage from "./pages/dashboard/buyer/BudgetTrackerPage";
import BuyerRequestsPage from "./pages/dashboard/buyer/RequestsPage";

/* ===================== Seller Sub-pages ===================== */
import SellerListingsPage from "./pages/dashboard/seller/ListingsPage";
import SellerSalesPendingPage from "./pages/dashboard/seller/SalesPendingPage";
import SellerSalesAnalyticsPage from "./pages/dashboard/seller/SalesAnalyticsPage";
import SellerInventoryPage from "./pages/dashboard/seller/InventoryPage";
import SellerAdvertisementsPage from "./pages/dashboard/seller/AdvertisementsPage";
import SellerCustomerChatsPage from "./pages/dashboard/seller/CustomerChatsPage";
import SellerBidsPage from "./pages/dashboard/seller/BidsPage";

/* ===================== Viewer Sub-pages ===================== */
import ViewerBookmarksPage from "./pages/dashboard/viewer/BookmarksPage";
import ViewerBrowsePage from "./pages/dashboard/viewer/BrowsePage";
import ViewerHistoryPage from "./pages/dashboard/viewer/HistoryPage";
import ViewerReportsPage from "./pages/dashboard/viewer/ReportsPage";

/* ===================== Logout ===================== */

import LogoutPage from "./pages/LogoutPage.jsx";

/* ===================== Routes ===================== */

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/onboard" replace />} />

      <Route path="/onboard" element={<OnboardPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/forgot-password" element={<ForgotPasswordPage />} />
      <Route path="/reset-password" element={<NewPassword />} />
      <Route path="/public/datasets" element={<DatasetsPage />} />
      <Route path="/dataset-info/:id" element={<DatasetInfo />} />
      <Route path="/public/trade" element={<TradePage />} />
      <Route path="/public/budget" element={<BudgetPage />} />
      <Route path="/public/project" element={<ProjectPage />} />
      <Route path="/public/funds" element={<FundsPage />} />
      <Route path="/public/analysis" element={<AnalysisPage />} />
      <Route path="/public/reports" element={<ReportsPage />} />

      <Route path="/profile" element={<UserProfile />} />

      <Route path="/dashboard/buyer" element={<BuyerDashboard />} />
      <Route path="/dashboard/buyer/requests" element={<BuyerRequestsPage />} />
      <Route path="/dashboard/buyer/purchases" element={<BuyerPurchasesPage />} />
      <Route path="/dashboard/buyer/wishlist" element={<BuyerWishlistPage />} />
      <Route path="/dashboard/buyer/recommendations" element={<BuyerRecommendationsPage />} />
      <Route path="/dashboard/buyer/budget" element={<BuyerBudgetTrackerPage />} />

      <Route path="/dashboard/seller" element={<SellerDashboard />} />
      <Route path="/dashboard/seller/bids" element={<SellerBidsPage />} />
      <Route path="/dashboard/seller/listings" element={<SellerListingsPage />} />
      <Route path="/dashboard/seller/pending" element={<SellerSalesPendingPage />} />
      <Route path="/dashboard/seller/analytics" element={<SellerSalesAnalyticsPage />} />
      <Route path="/dashboard/seller/inventory" element={<SellerInventoryPage />} />
      <Route path="/dashboard/seller/ads" element={<SellerAdvertisementsPage />} />
      <Route path="/dashboard/seller/chats" element={<SellerCustomerChatsPage />} />

      <Route path="/dashboard/editor" element={<EditorDashboard />} />
      <Route path="/dashboard/editor/reviews" element={<EditorReviewsPage />} />
      <Route path="/dashboard/editor/approvals" element={<EditorApprovalsPage />} />
      <Route path="/dashboard/editor/moderation" element={<EditorModerationPage />} />
      <Route path="/dashboard/editor/analytics" element={<EditorRevenueAnalyticsPage />} />
      <Route path="/dashboard/editor/settings" element={<SettingsPage role="editor" />} />

      <Route path="/dashboard/admin" element={<AdminDashboard />} />
      <Route path="/dashboard/admin/users" element={<AdminUsersPage />} />
      <Route path="/dashboard/admin/datasets" element={<AdminDatasetsPage />} />
      <Route path="/dashboard/admin/revenue" element={<AdminRevenueReportsPage />} />
      <Route path="/dashboard/admin/settings" element={<SettingsPage role="admin" />} />

      <Route path="/dashboard/viewer" element={<ViewerDashboard />} />
      <Route path="/dashboard/viewer/bookmarks" element={<ViewerBookmarksPage />} />
      <Route path="/dashboard/viewer/browse" element={<ViewerBrowsePage />} />
      <Route path="/dashboard/viewer/history" element={<ViewerHistoryPage />} />
      <Route path="/dashboard/viewer/reports" element={<ViewerReportsPage />} />

      <Route path="/logout" element={<LogoutPage />} />

      <Route
        path="*"
        element={<div style={{ padding: 24 }}>Page not found</div>}
      />
    </Routes>
  );
}

function AppWithTheme() {
  const { isDarkMode } = useTheme();
  const theme = isDarkMode ? darkTheme : lightTheme;

  return (
    <MuiThemeProvider theme={theme}>
      <CssBaseline />
      <AppRoutes />
    </MuiThemeProvider>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <AppWithTheme />
    </ThemeProvider>
  );
}
