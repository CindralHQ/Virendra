import React, { useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import Navbar from "../components/Navbar.jsx";
import Footer from "../components/Footer.jsx";
import ConnectFab from "../components/ConnectFab.jsx";
import EnquiryCartDrawer from "../components/EnquiryCartDrawer.jsx";

const MainLayout = () => {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <div className="min-h-screen bg-base-100 flex flex-col text-base-content">
      <div key={location.pathname} className="logo-splash logo-splash--animate">
        <img
          src="/Logo.png"
          alt="Virendra logo"
          className="logo-splash__logo"
        />
      </div>
      <Navbar />
      <main className="flex-grow">
        <Outlet />
      </main>
      <Footer />
      <EnquiryCartDrawer />
      <ConnectFab />
    </div>
  );
};

export default MainLayout;
