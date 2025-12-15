'use client';

import Image from 'next/image';
import { Footer } from '@/components/Footer';

export default function MediaKitPage() {
  // Always use the public URL for logo links (not localhost)
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://gruby.app';

  const logos = [
    {
      name: 'Icon (PNG)',
      description: 'Square app icon - Best for app stores, social media, and small spaces',
      url: '/logos/gruby-icon.png',
      format: 'PNG',
      size: '1024x1024',
      usage: 'App icons, favicons, social media profiles',
      fullUrl: `${baseUrl}/logos/gruby-icon.png`,
    },
    {
      name: 'Icon (SVG)',
      description: 'Scalable vector icon - Perfect for web and print at any size',
      url: '/logos/gruby-icon.svg',
      format: 'SVG',
      size: 'Scalable',
      usage: 'Web, print, high-resolution displays',
      fullUrl: `${baseUrl}/logos/gruby-icon.svg`,
    },
    {
      name: 'Full Logo (SVG)',
      description: 'Complete Gruby logo with text - Use for headers and branding',
      url: '/logos/gruby-logo.svg',
      format: 'SVG',
      size: 'Scalable',
      usage: 'Website headers, marketing materials, presentations',
      fullUrl: `${baseUrl}/logos/gruby-logo.svg`,
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-6xl mx-auto px-6 py-16">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-gray-900 mb-4">Gruby Media Kit</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Brand assets, logos, and guidelines for press and marketing use
          </p>
        </div>

        {/* Brand Colors */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Brand Colors</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="rounded-lg p-4">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-20 h-20 rounded-lg bg-[#FF1E00]"></div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900">Gruby Red</h3>
                  <p className="text-gray-600">#FF1E00</p>
                  <p className="text-gray-600">RGB: 255, 30, 0</p>
                </div>
              </div>
              <p className="text-sm text-gray-500">Primary brand color for buttons, links, and key brand elements</p>
            </div>
            <div className="rounded-lg p-4">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-20 h-20 rounded-lg bg-[#E01A00]"></div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900">Gruby Red Dark</h3>
                  <p className="text-gray-600">#E01A00</p>
                  <p className="text-gray-600">RGB: 224, 26, 0</p>
                </div>
              </div>
              <p className="text-sm text-gray-500">Hover states and darker variants of primary actions</p>
            </div>
            <div className="rounded-lg p-4">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-20 h-20 rounded-lg bg-[#222222]"></div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900">Charcoal</h3>
                  <p className="text-gray-600">#222222</p>
                  <p className="text-gray-600">RGB: 34, 34, 34</p>
                </div>
              </div>
              <p className="text-sm text-gray-500">Primary text color, headings, and dark UI elements</p>
            </div>
            <div className="rounded-lg p-4">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-20 h-20 rounded-lg bg-[#717171]"></div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900">Slate</h3>
                  <p className="text-gray-600">#717171</p>
                  <p className="text-gray-600">RGB: 113, 113, 113</p>
                </div>
              </div>
              <p className="text-sm text-gray-500">Secondary text, icons, and medium emphasis elements</p>
            </div>
            <div className="rounded-lg p-4">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-20 h-20 rounded-lg bg-[#F7F7F7] border border-gray-300"></div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900">Cloud</h3>
                  <p className="text-gray-600">#F7F7F7</p>
                  <p className="text-gray-600">RGB: 247, 247, 247</p>
                </div>
              </div>
              <p className="text-sm text-gray-500">Light backgrounds, subtle surfaces, and card backgrounds</p>
            </div>
            <div className="rounded-lg p-4">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-20 h-20 rounded-lg bg-[#EBEBEB] border border-gray-300"></div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900">Mist</h3>
                  <p className="text-gray-600">#EBEBEB</p>
                  <p className="text-gray-600">RGB: 235, 235, 235</p>
                </div>
              </div>
              <p className="text-sm text-gray-500">Borders, dividers, and subtle separators</p>
            </div>
          </div>
        </section>

        {/* Logo Downloads */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Logo Downloads</h2>
          <div className="space-y-8">
            {logos.map((logo, index) => (
              <div key={index} className="border border-gray-200 rounded-lg p-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  {/* Preview */}
                  <div className="flex items-center justify-center bg-gray-50 rounded-lg p-8 min-h-[200px]">
                    {logo.format === 'PNG' ? (
                      <Image
                        src={logo.url}
                        alt={logo.name}
                        width={200}
                        height={200}
                        className="object-contain"
                        unoptimized
                        priority
                      />
                    ) : (
                      <img
                        src={logo.url}
                        alt={logo.name}
                        className="max-w-full max-h-[200px] object-contain"
                        style={{ width: '200px', height: 'auto' }}
                      />
                    )}
                  </div>

                  {/* Details */}
                  <div>
                    <h3 className="text-2xl font-semibold text-gray-900 mb-2">{logo.name}</h3>
                    <p className="text-gray-600 mb-4">{logo.description}</p>
                    
                    <div className="space-y-2 mb-6">
                      <div className="flex gap-4">
                        <span className="font-medium text-gray-700">Format:</span>
                        <span className="text-gray-600">{logo.format}</span>
                      </div>
                      <div className="flex gap-4">
                        <span className="font-medium text-gray-700">Size:</span>
                        <span className="text-gray-600">{logo.size}</span>
                      </div>
                      <div className="flex gap-4">
                        <span className="font-medium text-gray-700">Best for:</span>
                        <span className="text-gray-600">{logo.usage}</span>
                      </div>
                    </div>

                    {/* Direct URL */}
                    <div className="bg-gray-50 rounded-lg p-4 mb-4">
                      <p className="text-xs font-medium text-gray-500 mb-2">Direct URL:</p>
                      <code className="text-sm text-gray-900 break-all">{logo.fullUrl}</code>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-3">
                      <a
                        href={logo.url}
                        download
                        className="flex-1 bg-[#FF1E00] text-white px-6 py-3 rounded-lg font-semibold hover:bg-[#E01A00] transition-colors text-center"
                      >
                        Download {logo.format}
                      </a>
                      <button
                        onClick={() => {
                          navigator.clipboard.writeText(logo.fullUrl);
                          alert('URL copied to clipboard!');
                        }}
                        className="px-6 py-3 bg-white border border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-50 transition-colors"
                      >
                        Copy URL
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Brand Guidelines */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Brand Guidelines</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="border border-gray-200 rounded-lg p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">✅ Do</h3>
              <ul className="space-y-2 text-gray-600">
                <li>• Use the logo on white or light backgrounds</li>
                <li>• Maintain minimum clear space around the logo</li>
                <li>• Use the icon for small spaces (app icons, favicons)</li>
                <li>• Use the full logo for headers and marketing materials</li>
                <li>• Keep the logo proportional when resizing</li>
              </ul>
            </div>
            <div className="border border-gray-200 rounded-lg p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">❌ Don't</h3>
              <ul className="space-y-2 text-gray-600">
                <li>• Don't distort or stretch the logo</li>
                <li>• Don't change the colors</li>
                <li>• Don't place on busy backgrounds</li>
                <li>• Don't rotate or tilt the logo</li>
                <li>• Don't add effects or filters</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Additional Resources */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Additional Resources</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="border border-gray-200 rounded-lg p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Typography</h3>
              <p className="text-gray-600 mb-4">Gruby uses clean, modern typography for all communications.</p>
              <div className="space-y-2">
                <p className="text-lg font-semibold">Headings</p>
                <p className="text-base">Body text should be clear and readable</p>
                <p className="text-sm text-gray-500">Small text for captions and metadata</p>
              </div>
            </div>
            <div className="border border-gray-200 rounded-lg p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Spacing Guidelines</h3>
              <p className="text-gray-600 mb-4">Maintain clear space around logos equal to at least 50% of the logo height.</p>
              <div className="bg-gray-50 p-4 rounded">
                <p className="text-sm text-gray-600">
                  Minimum clear space: 50% of logo height<br/>
                  Preferred clear space: 100% of logo height
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </div>
  );
}

