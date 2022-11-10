/** @format */

import react from "@vitejs/plugin-react";
import * as path from "path";
import { defineConfig } from "vite";
import ssr from "vite-plugin-ssr/plugin";
import svgrPlugin from "vite-plugin-svgr";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), svgrPlugin({ svgrOptions: { icon: true } })],
  resolve: {
    alias: {
      "#pages": path.resolve(__dirname, "src", "pages"),
      "#assets": path.resolve(__dirname, "src", "assets"),
      "#styles": path.resolve(__dirname, "src", "styles"),
      "#routers": path.resolve(__dirname, "src", "routers"),
      "#store": path.resolve(__dirname, "src", "store/index"),
      "#components": path.resolve(__dirname, "src", "components/index"),
      "#reducers": path.resolve(__dirname, "src", "store/reducers/index"),
    },
  },
});
