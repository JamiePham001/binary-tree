import globals from "globals";
import pluginJs from "@eslint/js";
import eslintConfigPrettier from "eslint-config-prettier";


/** @type {import('eslint').Linter.Config[]} */
export default [
  {languageOptions: { globals: globals.browser }},
  pluginJs.configs.recommended,
  eslintConfigPrettier,
  {
    "extends": ["airbnb", "prettier"], // Use "airbnb-base" if not using React
    "rules": {
      // Add or override rules here if needed
    }
  }
];