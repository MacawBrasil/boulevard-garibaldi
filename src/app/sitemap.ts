import type { MetadataRoute } from 'next'

import {
  getContactGlobal,
  getEventsPageGlobal,
  getGastronomyPageGlobal,
  getHomeGlobal,
  getShopsAndServicesPageGlobal,
} from '@/lib/payload-data'
import { getSiteURL } from '@/lib/seo'

export const revalidate = 300

type SitemapRoute = {
  changeFrequency: NonNullable<MetadataRoute.Sitemap[number]['changeFrequency']>
  lastModified?: string | null
  pathname: string
  priority: number
  shouldIndex?: boolean | null
}

function getURL(pathname: string) {
  const siteURL = getSiteURL().replace(/\/$/, '')

  return pathname === '/' ? siteURL : `${siteURL}${pathname}`
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [home, gastronomyPage, eventsPage, shopsAndServicesPage, contact] = await Promise.all([
    getHomeGlobal(),
    getGastronomyPageGlobal(),
    getEventsPageGlobal(),
    getShopsAndServicesPageGlobal(),
    getContactGlobal(),
  ])

  const routes: SitemapRoute[] = [
    {
      pathname: '/',
      lastModified: home.updatedAt,
      changeFrequency: 'weekly',
      priority: 1,
      shouldIndex: !home.seo?.noIndex,
    },
    {
      pathname: '/gastronomia',
      lastModified: gastronomyPage.updatedAt,
      changeFrequency: 'weekly',
      priority: 0.8,
      shouldIndex: !gastronomyPage.seo?.noIndex,
    },
    {
      pathname: '/eventos',
      lastModified: eventsPage.updatedAt,
      changeFrequency: 'daily',
      priority: 0.8,
      shouldIndex: !eventsPage.seo?.noIndex,
    },
    {
      pathname: '/lojas-e-servicos',
      lastModified: shopsAndServicesPage.updatedAt,
      changeFrequency: 'weekly',
      priority: 0.8,
      shouldIndex: !shopsAndServicesPage.seo?.noIndex,
    },
    {
      pathname: '/como-chegar',
      lastModified: contact.updatedAt,
      changeFrequency: 'monthly',
      priority: 0.7,
      shouldIndex: !contact.seo?.noIndex,
    },
  ]

  return routes
    .filter((route) => route.shouldIndex)
    .map(({ changeFrequency, lastModified, pathname, priority }) => ({
      url: getURL(pathname),
      lastModified: lastModified ? new Date(lastModified) : new Date(),
      changeFrequency,
      priority,
    }))
}
