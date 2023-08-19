import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  base: "/frontend-4-contest-2-august/",
  plugins: [react()],
});
