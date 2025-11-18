import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import HomePage from "./HomePage";
import PageNotFound from "./PageNotFound";
import AuthPage from "@/SignIn/SignInPage";
import Dashboard from "@/dashboard/Dashboard";
import ExplorePage from "@/dashboard/ExplorePage";
import Layout from "./Layout";
import DashboardLayout from "@/dashboard/DashboardLayout";
import MyTripsPage from "@/naz-button-daily/MyTripsPage";

const AppRoutes = () => {
  const user = useSelector((state) => state.auth.user);

  return (
    <Routes>
      {/* Public routes with Layout */}
      <Route element={<Layout />}>
        <Route path="/" element={<HomePage />} />
        {/* <Route path="/plan-trip" element={<TripListItem />} /> */}
        {/* <Route path="/my-trips" element={<MyTripsPage />} /> */}

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
          {/* /dashboard/mytrips <-- NEW NESTED ROUTE */}
          <Route path="mytrips" element={<MyTripsPage />} />
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
