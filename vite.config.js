import { defineConfig } from "vite";

export default defineConfig({
  base: "./",

  build: {
    outDir: "dist",
    emptyOutDir: true,

    rollupOptions: {
      output: {
        entryFileNames: "assets/main.js",

        chunkFileNames: "assets/[name].js",

        assetFileNames: (assetInfo) => {
          if (assetInfo.name?.endsWith(".css")) {
            return "assets/main.css";
          }

          return "assets/[name][extname]";
        }
      }
    }
  }
});