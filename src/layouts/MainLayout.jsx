import React, { useEffect, useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import Navbar from "../components/Navbar.jsx";
import Footer from "../components/Footer.jsx";
import ConnectFab from "../components/ConnectFab.jsx";

const MainLayout = () => {
  const location = useLocation();
  const [showLogoSplash, setShowLogoSplash] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  useEffect(() => {
    setShowLogoSplash(true);
    const timer = setTimeout(() => setShowLogoSplash(false), 2000);
    return () => clearTimeout(timer);
  }, [location.pathname]);

  return (
    <div className="min-h-screen bg-base-100 flex flex-col text-base-content">
      <div className={`logo-splash ${showLogoSplash ? "logo-splash--visible" : ""}`}>
        <img
          key={location.pathname}
          src="/Virendra_Logo.png"
          alt="Virendra logo"
          className="logo-splash__logo"
        />
      </div>
      <Navbar />
      <main className="flex-grow">
        <Outlet />
      </main>
      <Footer />
      <ConnectFab />
    </div>
  );
};

export default MainLayout;
