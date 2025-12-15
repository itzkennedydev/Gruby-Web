'use client';

import { useEffect, useState } from 'react';

export default function LogosPage() {
  const [baseUrl, setBaseUrl] = useState('https://gruby.app');

  useEffect(() => {
    // Get the base URL (works in both dev and production)
    setBaseUrl(
      process.env.NEXT_PUBLIC_APP_URL || 
      (typeof window !== 'undefined' ? window.location.origin : 'https://gruby.app')
    );
  }, []);

  const logos = [
    {
      name: 'Icon PNG',
      url: `${baseUrl}/logos/gruby-icon.png`,
      format: 'PNG',
      recommended: true,
      description: 'Recommended for Kroger API and most integrations',
    },
    {
      name: 'Icon SVG',
      url: `${baseUrl}/logos/gruby-icon.svg`,
      format: 'SVG',
      recommended: false,
      description: 'Scalable vector format for web use',
    },
    {
      name: 'Full Logo SVG',
      url: `${baseUrl}/logos/gruby-logo.svg`,
      format: 'SVG',
      recommended: false,
      description: 'Complete logo with text for headers and branding',
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-4xl mx-auto px-6 py-16">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Gruby Logo URLs</h1>
          <p className="text-xl text-gray-600">
            Direct links to all logo assets
          </p>
        </div>

        <div className="space-y-6">
          {logos.map((logo, index) => (
            <div
              key={index}
              className={`border-2 rounded-lg p-6 ${
                logo.recommended
                  ? 'border-[#FF1E00] bg-red-50'
                  : 'border-gray-200 bg-white'
              }`}
            >
              {logo.recommended && (
                <div className="mb-3">
                  <span className="inline-block bg-[#FF1E00] text-white text-xs font-semibold px-3 py-1 rounded">
                    RECOMMENDED
                  </span>
                </div>
              )}
              
              <div className="flex items-start justify-between gap-4 mb-3">
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-1">
                    {logo.name}
                  </h3>
                  <p className="text-gray-600 text-sm">{logo.description}</p>
                </div>
                <span className="text-sm font-medium text-gray-500 bg-gray-100 px-3 py-1 rounded">
                  {logo.format}
                </span>
              </div>

              <div className="bg-white border border-gray-200 rounded p-4">
                <code className="text-sm text-gray-900 break-all">{logo.url}</code>
              </div>

              <div className="mt-4 flex gap-3">
                <button
                  onClick={() => {
                    navigator.clipboard.writeText(logo.url);
                    alert('URL copied to clipboard!');
                  }}
                  className="px-4 py-2 bg-gray-900 text-white rounded-lg text-sm font-medium hover:bg-gray-800 transition-colors"
                >
                  Copy URL
                </button>
                <a
                  href={logo.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 bg-gray-100 text-gray-900 rounded-lg text-sm font-medium hover:bg-gray-200 transition-colors"
                >
                  Open in New Tab
                </a>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 bg-blue-50 border border-blue-200 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            💡 For Kroger API Integration
          </h3>
          <p className="text-gray-700 mb-3">
            Use the <strong>Icon PNG</strong> URL above. It's optimized for API integrations and works best with external services.
          </p>
          <code className="block bg-white border border-blue-200 rounded p-3 text-sm text-gray-900 break-all">
            {baseUrl}/logos/gruby-icon.png
          </code>
        </div>
      </div>
    </div>
  );
}

