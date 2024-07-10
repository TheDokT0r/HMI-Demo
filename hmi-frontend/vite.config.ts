import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],

  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src/"),
    },
  },

  build: {
    chunkSizeWarningLimit: Math.min(), // In JS, Math.min() = infinity, while Math.max() = -infinity... I sure do love JS!
  },
});
