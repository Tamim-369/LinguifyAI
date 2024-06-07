import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

export default defineConfig({
  server: {
    proxy: {
      "/api": "http://localhost:3001",
    },
  },
  plugins: [react()],
  build: {
    rollupOptions: {
      output: {
        manualChunks: (id) => {
          if (id.includes("node_modules")) {
            return "vendor";
          }
        },
      },
    },
    chunkSizeWarningLimit: 500, // Set the warning limit to 500 kB
    minify: "esbuild",
    brotliSize: false, // Disable brotli size calculation
    cssCodeSplit: true, // Enable CSS code splitting
    sourcemap: false, // Disable source map generation
    target: "esnext", // Use modern JavaScript target
  },
});
