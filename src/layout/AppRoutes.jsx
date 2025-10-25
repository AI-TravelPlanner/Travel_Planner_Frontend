import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import HomePage from "./HomePage";
import PageNotFound from "./PageNotFound";
import AuthPage from "@/SignIn/SignInPage";
import Dashboard from "@/dashboard/Dashboard";
import DemoPlanTrip from "@/plan-trip/planTrip";
import Layout from "./Layout";

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

      {/* Auth route — redirect logged-in users to /user-profile */}
      <Route
        path="/auth"
        element={user ? <Navigate to="/user-profile" replace /> : <AuthPage />}
      />

      {/* Protected route */}
      <Route
        path="/dashboard"
        element={user ? <Dashboard /> : <Navigate to="/auth" replace />}
      />

      {/* 404 fallback */}
      <Route path="*" element={<PageNotFound />} />
    </Routes>
  );
};

export default AppRoutes;
