import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { getBase } from "./scripts/config.mjs";

// "npm run dev"   -> served from "/"
// "npm run build" -> built for the GitHub Pages sub-folder (see scripts/config.mjs)
export default defineConfig(({ command }) => ({
  base: command === "build" ? getBase() : "/",
  plugins: [react()],
  build: {
    outDir: "dist",
    sourcemap: false,
    target: "es2019",
  },
}));
