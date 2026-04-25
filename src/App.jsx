import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import ReloadRedirect from "./components/ReloadRedirect";
import Booking from "./components/booking/Booking";

// Layouts
import PublicLayout from "./layouts/PublicLayout";
import AuthLayout from "./layouts/AuthLayout";
import DashboardLayout from "./layouts/DashboardLayout";
import AdminLayout from "./layouts/AdminLayout";

// Pages
import Home from "./pages/public/Home";
import Services from "./pages/public/ServicesPage";
import Login from "./pages/auth/Login";
import Signup from "./pages/auth/Signup";
import UserDashboard from "./pages/dashboard/UserDashboard";
import AdminDashboard from "./pages/admin/AdminDashboard";

import ProtectedRoute from "./routes/ProtectedRoute";
import RoleProtectedRoute from "./routes/RoleProtectedRoute";

import useScrollHandler from "./hooks/useScrollHandler";

/* 🔥 Wrapper for scroll logic */
const AppContent = () => {
  useScrollHandler();

  return (
    <ReloadRedirect>
      <Routes>

        {/* 🌐 PUBLIC ROUTES */}
        <Route element={<PublicLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/services" element={<Services />} />
          <Route path="/booking" element={<Booking />} />
        </Route>

        {/* 🔐 AUTH ROUTES */}
        <Route element={<AuthLayout />}>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Route>

        {/* 👤 USER */}
        <Route
          element={
            <ProtectedRoute>
              <DashboardLayout />
            </ProtectedRoute>
          }
        >
          <Route path="/dashboard" element={<UserDashboard />} />
        </Route>

        {/* 👑 ADMIN */}
        <Route
          element={
            <ProtectedRoute>
              <RoleProtectedRoute allowedRoles={["ADMIN"]}>
                <AdminLayout />
              </RoleProtectedRoute>
            </ProtectedRoute>
          }
        >
          <Route path="/admin" element={<AdminDashboard />} />
        </Route>

        {/* ❌ FALLBACK */}
        <Route path="*" element={<Navigate to="/" replace />} />

      </Routes>
    </ReloadRedirect>
  );
};

/* ✅ MAIN APP */
function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}

export default App;