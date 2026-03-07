import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "../../features/auth/useAuth";

// Pages
import ToolsPage    from "../../pages/ToolsPage";
import ToolPage     from "../../pages/ToolPage";
import DashboardPage from "../../pages/DashboardPage";
import LoginPage    from "../../features/auth/LoginPage";
import SignupPage   from "../../features/auth/SignupPage";

function ProtectedRoute({ children }) {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? children : <Navigate to="/login" replace />;
}

function GuestRoute({ children }) {
  const { isAuthenticated } = useAuth();
  return !isAuthenticated ? children : <Navigate to="/dashboard" replace />;
}

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/"              element={<ToolsPage />} />
        <Route path="/tools"         element={<ToolsPage />} />
        <Route path="/tools/:toolId" element={<ToolPage />} />

        <Route path="/login"  element={<GuestRoute><LoginPage /></GuestRoute>} />
        <Route path="/signup" element={<GuestRoute><SignupPage /></GuestRoute>} />

        <Route path="/dashboard" element={<ProtectedRoute><DashboardPage /></ProtectedRoute>} />

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
