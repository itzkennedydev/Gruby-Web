/**
 * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation. This is especially useful
 * for Docker builds.
 */
await import("./src/env.js");

/** @type {import("next").NextConfig} */
const config = {
  reactStrictMode: true,

  /**
   * If you are using `appDir` then you must comment the below `i18n` config out.
   *
   * @see https://github.com/vercel/next.js/issues/41980
   */
  i18n: {
    locales: ["en"],
    defaultLocale: "en",
  },
  images: {
    domains: ['images.unsplash.com', "di8mcd92ly4ww.cloudfront.net", "www.google.com", 'scontent-ord5-1.xx.fbcdn.net'],
  },
  transpilePackages: ["geist", '@mui/x-date-pickers', '@mui/material', '@mui/system', '@emotion/react', '@emotion/styled'],
};

export default config;
