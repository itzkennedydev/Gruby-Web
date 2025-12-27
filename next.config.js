/**
 * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation. This is especially useful
 * for Docker builds.
 */
// Import env.js using dynamic import
import("./src/env.js");

import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/** @type {import("next").NextConfig} */
const config = {
  reactStrictMode: true,

  // Enable modern JavaScript features
  modularizeImports: {
    "@mui/material": {
      transform: "@mui/material/{{member}}",
    },
    "@mui/icons-material": {
      transform: "@mui/icons-material/{{member}}",
    },
    "lucide-react": {
      transform: "lucide-react/dist/esm/icons/{{kebabCase member}}",
    },
  },

  /**
   * If you are using `appDir` then you must comment the below `i18n` config out.
   *
   * @see https://github.com/vercel/next.js/issues/41980
   */
  i18n: {
    locales: ["en"],
    defaultLocale: "en",
  },
  // Headers for Universal Links and App Links
  async headers() {
    const headers = [
      {
        // apple-app-site-association for iOS Universal Links
        source: "/.well-known/apple-app-site-association",
        headers: [
          {
            key: "Content-Type",
            value: "application/json",
          },
        ],
      },
      {
        // assetlinks.json for Android App Links
        source: "/.well-known/assetlinks.json",
        headers: [
          {
            key: "Content-Type",
            value: "application/json",
          },
        ],
      },
    ];

    // In development, disable caching for images and static assets
    if (process.env.NODE_ENV !== "production") {
      headers.push({
        source: "/:path*.(jpg|jpeg|png|gif|svg|webp|avif)",
        headers: [
          {
            key: "Cache-Control",
            value: "no-cache, no-store, must-revalidate",
          },
        ],
      });
    }

    return headers;
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
    ],
    formats: ["image/avif", "image/webp"],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    // Development: cache for 60 seconds, Production: cache for 1 year
    minimumCacheTTL: process.env.NODE_ENV === "production" ? 31536000 : 60,
    loader: "default",
    dangerouslyAllowSVG: true,
    contentDispositionType: "attachment",
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },
  experimental: {
    serverComponentsExternalPackages: [
      "firebase-admin",
      "@google-cloud/firestore",
      "@opentelemetry/api",
      "@opentelemetry/instrumentation",
      "@opentelemetry/sdk-trace-base",
    ],
  },
  transpilePackages: [
    "geist",
    "@mui/x-date-pickers",
    "@mui/material",
    "@mui/system",
    "@emotion/react",
    "@emotion/styled",
  ],
  webpack: (config) => {
    if (config.resolve && config.resolve.alias) {
      config.resolve.alias["~"] = path.join(__dirname, "src");
    }
    return config;
  },
};

export default config;
