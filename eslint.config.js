import eslintPluginAstro from "eslint-plugin-astro";
import stylistic from "@stylistic/eslint-plugin";

export default [
  stylistic.configs["recommended-flat"],
  ...eslintPluginAstro.configs.recommended,
];
