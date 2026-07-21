import { cache } from 'react'
import { getPayload } from 'payload'

import { getStartOfTodayInSaoPauloISOString } from '@/lib/date'
import configPromise from '@payload-config'

export const getPayloadClient = cache(() => getPayload({ config: configPromise }))

export const getHomeGlobal = cache(async () => {
  const payload = await getPayloadClient()

  return payload.findGlobal({ slug: 'home', depth: 1 })
})

export const getFooterGlobal = cache(async () => {
  const payload = await getPayloadClient()

  return payload.findGlobal({ slug: 'footer', depth: 1 })
})

export const getContactGlobal = cache(async () => {
  const payload = await getPayloadClient()

  return payload.findGlobal({ slug: 'contact', depth: 1 })
})

export const getEventsPageGlobal = cache(async () => {
  const payload = await getPayloadClient()

  return payload.findGlobal({ slug: 'events-page', depth: 1 })
})

export const getGastronomyPageGlobal = cache(async () => {
  const payload = await getPayloadClient()

  return payload.findGlobal({ slug: 'gastronomy-page', depth: 1 })
})

export const getGeneralSettingsGlobal = cache(async () => {
  const payload = await getPayloadClient()

  return payload.findGlobal({ slug: 'general-settings', depth: 1 })
})

export const getShopsAndServicesPageGlobal = cache(async () => {
  const payload = await getPayloadClient()

  return payload.findGlobal({ slug: 'shops-and-services-page', depth: 1 })
})

export const getLegalPageBySlug = cache(async (slug: string) => {
  const payload = await getPayloadClient()

  const result = await payload.find({
    collection: 'legal-pages',
    depth: 1,
    limit: 1,
    where: {
      slug: {
        equals: slug,
      },
    },
  })

  return result.docs[0] || null
})

export const getLegalPages = cache(async () => {
  const payload = await getPayloadClient()

  return payload.find({
    collection: 'legal-pages',
    depth: 1,
    limit: 100,
    sort: 'title',
  })
})

export const getGastronomyItems = cache(async (limit: number) => {
  const payload = await getPayloadClient()

  return payload.find({
    collection: 'gastronomy',
    depth: 1,
    limit,
    sort: 'name',
  })
})

export const getGalleryItems = cache(async (limit: number) => {
  const payload = await getPayloadClient()

  return payload.find({
    collection: 'gallery',
    depth: 1,
    limit,
    sort: '-date',
  })
})

export const getShopsAndServicesItems = cache(async (limit: number) => {
  const payload = await getPayloadClient()

  return payload.find({
    collection: 'shops-and-services',
    depth: 1,
    limit,
    sort: 'name',
  })
})

export const getUpcomingEvents = cache(async (limit?: number) => {
  const payload = await getPayloadClient()

  return payload.find({
    collection: 'events',
    depth: 1,
    ...(typeof limit === 'number' ? { limit } : {}),
    sort: 'date',
    where: {
      date: {
        greater_than_equal: getStartOfTodayInSaoPauloISOString(),
      },
    },
  })
})
