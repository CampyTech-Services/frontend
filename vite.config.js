import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import legacy from "@vitejs/plugin-legacy";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    legacy({
      targets: ["defaults", "not IE 11"],
    }),
  ],
  server: {
    allowedHosts: ["frontend-et7k.onrender.com", ".onrender.com"],
  },
  preview: {
    allowedHosts: ["frontend-et7k.onrender.com", ".onrender.com"],
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
