import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import App from "./App.jsx";
import { ProductProvider } from "./context/ProductContext.jsx";
import { ThemeProvider } from "./context/ThemeContext.jsx";
import { EnquiryCartProvider } from "./context/EnquiryCartContext.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <ThemeProvider>
        <EnquiryCartProvider>
          <ProductProvider>
            <App />
          </ProductProvider>
        </EnquiryCartProvider>
      </ThemeProvider>
    </BrowserRouter>
  </StrictMode>
);
