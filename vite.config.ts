import { defineConfig } from "vite";

// base "./" so the built site works from any GitHub Pages subpath.
export default defineConfig({
  base: "./",
  test: { globals: true },
});
