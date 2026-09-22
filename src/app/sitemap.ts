import { MetadataRoute } from 'next'
import { appUrl } from "@/lib/app-config";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = appUrl
  
  const staticRoutes = [
    '',
    '/dmca',
    '/awards',
    '/categories',
    '/companies',
    '/people',
    '/search',
    '/privacy',
    '/terms',
    '/about',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'daily' as const,
    priority: route === '' ? 1 : 0.8,
  }))

  return [
    ...staticRoutes,
  ]
}
