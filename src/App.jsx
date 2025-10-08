// src/App.jsx
import "@/index.css";
import React, { useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useDispatch } from "react-redux";
import { onAuthStateChanged } from "firebase/auth";
import { ToastContainer } from "react-toastify";
import Layout from "@/layout/Layout";
import AppRoutes from "@/layout/AppRoutes";
import AuthPage from "@/SignIn/SignInPage";
import { auth } from "@/firebase/firebaseConfig";
import { setUser, logout } from "@/authSlice/authSlice";
import "react-toastify/dist/ReactToastify.css";
import DemoPlanTrip from "@/plan-trip/planTrip";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        dispatch(setUser(user));
      } else {
        dispatch(logout());
      }
    });
    return () => unsubscribe();
  }, [dispatch]);

  return (
    <BrowserRouter>
      <Routes>
        {/* Authentication route */}
        <Route path="/auth" element={<AuthPage />} />

        {/* Fullscreen PlanTrip route (no Layout, no Navbar/Footer) */}
        <Route path="/plan-trip" element={<DemoPlanTrip />} />

        {/* All other routes inside Layout */}
        <Route
          path="*"
          element={
            <Layout>
              <AppRoutes />
            </Layout>
          }
        />
      </Routes>

      <ToastContainer />
    </BrowserRouter>
  );
}

export default App;
