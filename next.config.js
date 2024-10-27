/**
 * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation. This is especially useful
 * for Docker builds.
 */
// Import env.js using dynamic import
import('./src/env.js');

import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

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
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
  transpilePackages: ["geist", '@mui/x-date-pickers', '@mui/material', '@mui/system', '@emotion/react', '@emotion/styled'],
  webpack: (config) => {
    if (config.resolve && config.resolve.alias) {
      config.resolve.alias['~'] = path.join(__dirname, 'src');
    }
    return config;
  },
};

export default config;
