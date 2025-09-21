import React from 'react'
import { Routes, Route } from "react-router-dom";
import HomePage from './HomePage';
import PageNotFound from './PageNotFound';

const AppRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={<HomePage />} />
            {/* Catch-All Route for 404 Page */}
            <Route path="*" element={<PageNotFound />} />
        </Routes>
    );
}


export default AppRoutes