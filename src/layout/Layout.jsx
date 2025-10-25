import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import { Footer7 } from "./Footer";

const Layout = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow">
        <Outlet /> {/* Nested routes will render here */}
      </main>
      <Footer7 />
    </div>
  );
};

export default Layout;
