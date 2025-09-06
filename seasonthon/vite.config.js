import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    open: true,
  },
  build: {
    outDir: "dist",
  },
  // 🔥 새로고침/직접 URL 접근 시 index.html 반환
  optimizeDeps: {},
  esbuild: {},
});
