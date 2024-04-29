import { defineConfig } from "vite";
import { svelte } from "@sveltejs/vite-plugin-svelte";
import { VitePWA } from "vite-plugin-pwa";

// https://vitejs.dev/config/
export default defineConfig({
  base: "/cartier",
  plugins: [
    svelte(),
    VitePWA({
      includeAssets: ["cartier.svg", "apple-touch-icon.png", "mask-icon.svg"],
      manifest: {
        name: "Cartier Manager",
        short_name: "Cartier",
        description: "Free spotify playlist downloader and manager for mobile",
        theme_color: "#030712",
        icons: [
          {
            src: "pwa-512x512.png",
            sizes: "512x512",
            type: "image/png",
          },
          {
            src: "pwa-192x192.png",
            sizes: "192x192",
            type: "image/png",
          },
        ],
      },
      workbox: {
        globPatterns: ["**/*.{js,css,html,ico,png,svg,ttf}"],
      },

      registerType: "autoUpdate",
      strategies: "generateSW",
      devOptions: {
        enabled: true,
      },
    }),
  ],
});
