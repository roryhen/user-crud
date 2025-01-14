import { defineConfig } from "astro/config";

import db from "@astrojs/db";

import tailwind from "@astrojs/tailwind";

import solidJs from "@astrojs/solid-js";

// https://astro.build/config
export default defineConfig({
  integrations: [db(), tailwind(), solidJs()],
});
