import { defineConfig } from "astro/config";
import solidJs from "@astrojs/solid-js";
import db from "@astrojs/db";
import tailwind from "@tailwindcss/vite";

// https://astro.build/config
export default defineConfig({
  integrations: [db(), solidJs()],
  vite: {
    plugins: [tailwind()],
  },
});
