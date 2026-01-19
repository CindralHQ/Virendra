import React from "react";
import { Route, Routes } from "react-router-dom";
import ProductInfo from "./components/Product/ProductInfo/ProductInfo.jsx";
import MainLayout from "./layouts/MainLayout.jsx";
import Home from "./pages/Home.jsx";
import About from "./pages/About.jsx";
import Products from "./pages/Products.jsx";
import Contact from "./pages/Contact.jsx";
import CategoryProducts from "./components/Product/ProductCatalogue/CategoryProducts.jsx";
import BrandGuidelines from "./pages/BrandGuidelines.jsx";

function App() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/products" element={<Products />} />
        <Route path="/product/:id" element={<ProductInfo />} />
        <Route path="/products/:category" element={<CategoryProducts />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/brand-guidelines" element={<BrandGuidelines />} />
      </Route>
    </Routes>
  );
}

export default App;
