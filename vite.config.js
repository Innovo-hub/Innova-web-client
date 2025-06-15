import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    https: false, // Ensure this is false
    proxy: {
      "/api": {
        target: "https://innova-hub.premiumasp.net",
        changeOrigin: true,
        secure: false,
      },
    },
  },
});
