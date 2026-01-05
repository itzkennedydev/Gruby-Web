import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://gruby.app';
  const currentDate = new Date().toISOString();

  // Main pages with high priority
  const mainPages = [
    {
      url: baseUrl,
      lastModified: currentDate,
      changeFrequency: 'weekly' as const,
      priority: 1,
    },
    {
      url: `${baseUrl}/support`,
      lastModified: currentDate,
      changeFrequency: 'monthly' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/faq`,
      lastModified: currentDate,
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    },
  ];

  // Legal and policy pages
  const legalPages = [
    'privacy',
    'terms',
    'cookies',
    'eula',
    'community-guidelines',
    'acceptable-use',
    'data-retention',
    'third-party-services',
    'messaging-policy',
    'content-licensing',
    'gatherings-terms',
    'location-services',
    'dmca',
    'accessibility',
  ].map((page) => ({
    url: `${baseUrl}/${page}`,
    lastModified: currentDate,
    changeFrequency: 'monthly' as const,
    priority: 0.5,
  }));

  // Media and brand pages
  const brandPages = [
    {
      url: `${baseUrl}/media-kit`,
      lastModified: currentDate,
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    },
    {
      url: `${baseUrl}/logos`,
      lastModified: currentDate,
      changeFrequency: 'monthly' as const,
      priority: 0.5,
    },
  ];

  return [...mainPages, ...brandPages, ...legalPages];
}
