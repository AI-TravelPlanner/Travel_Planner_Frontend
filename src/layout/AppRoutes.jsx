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
      {/* Public route with Layout */}
      <Route element={<Layout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/plan-trip" element={<DemoPlanTrip />} />
        <Route path="/user-profile" element={<HomePage />} />
      </Route>

      {/* Auth route without Layout */}
      <Route
        path="/auth"
        element={user ? <Navigate to="/dashboard" /> : <AuthPage />}
      />

      {/* Protected Dashboard route */}
      <Route
        path="/dashboard"
        element={user ? <Dashboard /> : <Navigate to="/auth" />}
      />

      {/* Catch-all */}
      <Route path="*" element={<PageNotFound />} />
    </Routes>
  );
};

export default AppRoutes;
