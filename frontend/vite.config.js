import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  define: {
    // 'import.meta.env': {} is better to prevent undefined 'process.env' errors
    "import.meta.env": {},
  },
});
