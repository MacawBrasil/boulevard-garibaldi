import { revalidatePath } from 'next/cache'

import type {
  CollectionAfterChangeHook,
  CollectionAfterDeleteHook,
  GlobalAfterChangeHook,
} from 'payload'

const publicPaths = ['/', '/gastronomia', '/eventos', '/lojas-e-servicos', '/como-chegar'] as const
const sitemapPath = '/sitemap.xml'

const globalPaths = {
  contact: ['/como-chegar'],
  'events-page': ['/', '/eventos'],
  footer: publicPaths,
  'gastronomy-page': ['/gastronomia'],
  'general-settings': ['/gastronomia', '/eventos', '/lojas-e-servicos', '/como-chegar'],
  home: ['/', '/gastronomia', '/lojas-e-servicos'],
  'shops-and-services-page': ['/lojas-e-servicos'],
} satisfies Record<string, readonly string[]>

const collectionPaths = {
  events: ['/', '/eventos'],
  gallery: ['/eventos'],
  gastronomy: ['/', '/gastronomia'],
  media: publicPaths,
  'shops-and-services': ['/', '/lojas-e-servicos'],
} satisfies Record<string, readonly string[]>

function getPaths(map: Record<string, readonly string[]>, slug: string) {
  return map[slug] || publicPaths
}

function getCollectionPaths(slug: string) {
  return getPaths(collectionPaths, slug)
}

function revalidateFrontendPaths(paths: readonly string[]) {
  const pathsToRevalidate = [...new Set([...paths, sitemapPath])]

  pathsToRevalidate.forEach((path) => {
    revalidatePath(path)
  })
}

export const revalidateGlobalPaths: GlobalAfterChangeHook = ({ doc, global, req }) => {
  if (req.context.disableRevalidate) {
    return doc
  }

  const paths = getPaths(globalPaths, global.slug)
  req.payload.logger.info(
    `Revalidating frontend paths for global "${global.slug}": ${paths.join(', ')}`,
  )
  revalidateFrontendPaths(paths)

  return doc
}

export const revalidateCollectionPaths: CollectionAfterChangeHook = ({ collection, doc, req }) => {
  if (req.context.disableRevalidate) {
    return doc
  }

  const paths = getCollectionPaths(collection.slug)
  req.payload.logger.info(
    `Revalidating frontend paths for collection "${collection.slug}": ${paths.join(', ')}`,
  )
  revalidateFrontendPaths(paths)

  return doc
}

export const revalidateDeletedCollectionPaths: CollectionAfterDeleteHook = ({
  collection,
  doc,
  req,
}) => {
  if (req.context.disableRevalidate) {
    return doc
  }

  const paths = getCollectionPaths(collection.slug)
  req.payload.logger.info(
    `Revalidating frontend paths after delete in collection "${collection.slug}": ${paths.join(
      ', ',
    )}`,
  )
  revalidateFrontendPaths(paths)

  return doc
}
