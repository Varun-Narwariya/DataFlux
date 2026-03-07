import { BrowserRouter, Routes, Route } from "react-router-dom";

import { ToolsPage, ToolPage, DashboardPage } from "@/pages";
import { LoginPage, SignupPage } from "@/features/auth";

import MainLayout from "@/layouts/MainLayout";
import ToolLayout from "@/layouts/ToolLayout";
import AuthLayout from "@/layouts/AuthLayout";

function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>

        {/* Main public pages */}
        <Route element={<MainLayout />}>
          <Route path="/" element={<ToolsPage />} />
        </Route>

        {/* Tool pages */}
        <Route element={<ToolLayout />}>
          <Route path="/tool/:toolSlug" element={<ToolPage />} />
        </Route>

        {/* Auth pages */}
        <Route element={<AuthLayout />}>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
        </Route>

        {/* Dashboard */}
        <Route element={<MainLayout />}>
          <Route path="/dashboard" element={<DashboardPage />} />
        </Route>

      </Routes>
    </BrowserRouter>
  );
}

export default AppRouter;