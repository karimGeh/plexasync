import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  root: ".", // default value
  resolve: {
    alias: {
      api: "/src/api",
      assets: "/src/assets",
      components: "/src/components",
      conf: "/src/conf",
      layouts: "/src/layouts",
      pages: "/src/pages",
      routes: "/src/routes",
      store: "/src/store",
      utils: "/src/utils",
      styles: "/src/styles",
      // resources: "/src/resources",
      // services: "/src/services",
    },
  },
});
