import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import HomePage from "./HomePage";
import PageNotFound from "./PageNotFound";
import AuthPage from "@/SignIn/SignInPage";
import Dashboard from "@/dashboard/Dashboard";
import ExplorePage from "@/dashboard/ExplorePage";
import DemoPlanTrip from "@/plan-trip/planTrip";
import Layout from "./Layout";
import DashboardLayout from "@/dashboard/DashboardLayout";

const AppRoutes = () => {
  const user = useSelector((state) => state.auth.user);

  return (
    <Routes>
      {/* Public routes with Layout */}
      <Route element={<Layout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/plan-trip" element={<DemoPlanTrip />} />
        <Route path="/user-profile" element={<HomePage />} />
      </Route>

      {/* Auth route */}
      <Route
        path="/auth"
        element={user ? <Navigate to="/user-profile" replace /> : <AuthPage />}
      />

      {/* Dashboard routes */}
      {user && (
        <Route path="/dashboard" element={<DashboardLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="explore" element={<ExplorePage />} />
        </Route>
      )}

      {/* Redirect unauthenticated users */}
      {!user && (
        <Route path="/dashboard/*" element={<Navigate to="/auth" replace />} />
      )}

      {/* 404 fallback */}
      <Route path="*" element={<PageNotFound />} />
    </Routes>
  );
};

export default AppRoutes;
