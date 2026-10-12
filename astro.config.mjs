// @ts-check
import { defineConfig } from "astro/config";

export default defineConfig({
  site: "https://noa-marchionni.fr",

  // URL convention: every page URL ends with a slash (/fr/, /work/example/).
  trailingSlash: "always",
  build: {
    format: "directory",
  },

  i18n: {
    defaultLocale: "en",
    locales: ["en", "fr"],
    routing: {
      prefixDefaultLocale: false,
    },
  },
});
