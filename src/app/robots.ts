import type { MetadataRoute } from 'next'
import { siteConfig } from '@/config/site'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        disallow: ['/dashboard', '/_next'],
      },
    ],
    sitemap: `${siteConfig.url}/sitemap.xml`,
  }
}
