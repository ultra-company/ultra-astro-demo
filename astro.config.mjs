// @ts-check
import { defineConfig } from "astro/config";
import react from "@astrojs/react";

export default defineConfig({
  // Add React integration
  integrations: [react()],
  output: "static",
  // Optimizations for Cloudflare Pages
  build: {
    format: "file",
    assets: "_astro"
  },
  // For better performance and SEO
  compressHTML: true,
  // Do not enforce any trailing slash behavior to avoid conflicts with Cloudflare
  trailingSlash: "ignore",
  // Base URL - update with your production domain
  site: "https://ultra-astro-demo.pages.dev",
});
