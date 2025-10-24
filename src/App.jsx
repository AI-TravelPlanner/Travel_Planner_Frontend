import "@/index.css";
import React, { useEffect, useState } from "react";
import { BrowserRouter } from "react-router-dom";
import { useDispatch } from "react-redux";
import { onAuthStateChanged } from "firebase/auth";
import { ToastContainer } from "react-toastify";

import AppRoutes from "@/layout/AppRoutes";
import { auth } from "@/firebase/firebaseConfig";
import { setUser, logout } from "@/authSlice/authSlice";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const dispatch = useDispatch();
  const [isAuthReady, setIsAuthReady] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        dispatch(setUser(user));
      } else {
        dispatch(logout());
      }
      setIsAuthReady(true);
    });

    return () => unsubscribe();
  }, [dispatch]);

  if (!isAuthReady) return null;

  return (
    <BrowserRouter>
      <AppRoutes />
      <ToastContainer />
    </BrowserRouter>
  );
}

export default App;
