// src/layout/AppRoutes.jsx
import React from "react";
import { Routes, Route } from "react-router-dom";
import HomePage from './HomePage';
import PageNotFound from './PageNotFound';
import AuthPage from '@/SignIn/SignInPage';
import Dashboard from '@/dashboard/Dashboard';

const AppRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/auth" element={<AuthPage />} />
            {/* Catch-All Route for 404 Page */}
            <Route path="*" element={<PageNotFound />} />
        </Routes>
    );
}

export default AppRoutes;