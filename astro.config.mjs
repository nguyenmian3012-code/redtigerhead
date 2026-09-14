import { defineConfig } from "astro/config";

export default defineConfig({
  site: "https://redtigerhead.com",
  output: "static",
  trailingSlash: "always",
  build: {
    format: "directory"
  },
  vite: {
    server: {
      host: "0.0.0.0",
      allowedHosts: ["terminal.local"]
    }
  }
});
