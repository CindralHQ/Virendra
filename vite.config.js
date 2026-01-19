import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  base: "/",           // ✅ MUST be here (not inside plugins)
  plugins: [
    react(),           // React 19 support 
    tailwindcss()      // Tailwind plugin
  ],
});
