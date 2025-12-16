"use client";

import { useEffect, useState } from "react";
import { Footer } from "@/components/Footer";

export default function LogosPage() {
  const [baseUrl, setBaseUrl] = useState("https://gruby.app");

  useEffect(() => {
    // Get the base URL (works in both dev and production)
    setBaseUrl(
      process.env.NEXT_PUBLIC_APP_URL ||
        (typeof window !== "undefined"
          ? window.location.origin
          : "https://gruby.app"),
    );
  }, []);

  const logos = [
    {
      name: "Icon PNG",
      url: `${baseUrl}/logos/gruby-icon.png`,
      format: "PNG",
      recommended: true,
      description: "Recommended for Kroger API and most integrations",
    },
    {
      name: "Icon SVG",
      url: `${baseUrl}/logos/gruby-icon.svg`,
      format: "SVG",
      recommended: false,
      description: "Scalable vector format for web use",
    },
    {
      name: "Full Logo SVG",
      url: `${baseUrl}/logos/gruby-logo.svg`,
      format: "SVG",
      recommended: false,
      description: "Complete logo with text for headers and branding",
    },
  ];

  return (
    <div className="flex min-h-screen flex-col bg-white">
      <div className="mx-auto max-w-4xl flex-grow px-6 py-16">
        <div className="mb-12 text-center">
          <h1 className="mb-4 text-4xl font-bold text-gray-900">
            Gruby Logo URLs
          </h1>
          <p className="text-xl text-gray-600">
            Direct links to all logo assets
          </p>
        </div>

        <div className="space-y-6">
          {logos.map((logo, index) => (
            <div
              key={index}
              className={`rounded-lg border-2 p-6 ${
                logo.recommended
                  ? "border-[#FF1E00] bg-red-50"
                  : "border-gray-200 bg-white"
              }`}
            >
              {logo.recommended && (
                <div className="mb-3">
                  <span className="inline-block rounded bg-[#FF1E00] px-3 py-1 text-xs font-semibold text-white">
                    RECOMMENDED
                  </span>
                </div>
              )}

              <div className="mb-3 flex items-start justify-between gap-4">
                <div>
                  <h3 className="mb-1 text-xl font-semibold text-gray-900">
                    {logo.name}
                  </h3>
                  <p className="text-sm text-gray-600">{logo.description}</p>
                </div>
                <span className="rounded bg-gray-100 px-3 py-1 text-sm font-medium text-gray-500">
                  {logo.format}
                </span>
              </div>

              <div className="rounded border border-gray-200 bg-white p-4">
                <code className="break-all text-sm text-gray-900">
                  {logo.url}
                </code>
              </div>

              <div className="mt-4 flex gap-3">
                <button
                  onClick={() => {
                    navigator.clipboard.writeText(logo.url);
                    alert("URL copied to clipboard!");
                  }}
                  className="rounded-lg bg-gray-900 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-gray-800"
                >
                  Copy URL
                </button>
                <a
                  href={logo.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-lg bg-gray-100 px-4 py-2 text-sm font-medium text-gray-900 transition-colors hover:bg-gray-200"
                >
                  Open in New Tab
                </a>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 rounded-lg border border-blue-200 bg-blue-50 p-6">
          <h3 className="mb-2 text-lg font-semibold text-gray-900">
            💡 For Kroger API Integration
          </h3>
          <p className="mb-3 text-gray-700">
            Use the <strong>Icon PNG</strong> URL above. It's optimized for API
            integrations and works best with external services.
          </p>
          <code className="block break-all rounded border border-blue-200 bg-white p-3 text-sm text-gray-900">
            {baseUrl}/logos/gruby-icon.png
          </code>
        </div>
      </div>
      <Footer />
    </div>
  );
}
