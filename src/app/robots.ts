import type { MetadataRoute } from 'next'

import { getSiteURL } from '@/lib/seo'

export default function robots(): MetadataRoute.Robots {
  const siteURL = getSiteURL().replace(/\/$/, '')

  return {
    rules: {
      userAgent: '*',
      allow: ['/', '/api/media/file/'],
      disallow: ['/admin/', '/api/', '/my-route/'],
    },
    sitemap: `${siteURL}/sitemap.xml`,
    host: siteURL,
  }
}
