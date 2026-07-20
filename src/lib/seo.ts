import type { Metadata } from 'next'

import type { Media } from '@/payload-types'

type SeoData = {
  title?: string | null
  description?: string | null
  image?: Media | string | null
  noIndex?: boolean | null
}

type BuildSEOMetadataOptions = {
  fallbackDescription?: string
  fallbackTitle?: string
  pathname?: string
}

export function getSiteURL() {
  const configuredURL =
    process.env.NEXT_PUBLIC_SITE_URL ||
    process.env.NEXT_PUBLIC_VERCEL_URL ||
    process.env.VERCEL_PROJECT_PRODUCTION_URL ||
    process.env.VERCEL_URL ||
    'http://localhost:3000'

  if (configuredURL.startsWith('http://') || configuredURL.startsWith('https://')) {
    return configuredURL
  }

  return `https://${configuredURL}`
}

function getMediaURL(media?: Media | string | null) {
  if (!media || typeof media === 'string') {
    return null
  }

  if (media.url) {
    return media.url
  }

  if (media.filename) {
    return `/api/media/file/${encodeURIComponent(media.filename)}`
  }

  return null
}

function getAbsoluteURL(pathOrURL: string) {
  if (pathOrURL.startsWith('http://') || pathOrURL.startsWith('https://')) {
    return pathOrURL
  }

  return new URL(pathOrURL, getSiteURL()).toString()
}

export function buildSEOMetadata(
  seo?: SeoData | null,
  { fallbackDescription, fallbackTitle = 'Boulevard Garibaldi', pathname }: BuildSEOMetadataOptions = {},
): Metadata {
  const title = seo?.title || fallbackTitle
  const description = seo?.description || fallbackDescription
  const imageURL = getMediaURL(seo?.image)
  const canonicalURL = pathname ? getAbsoluteURL(pathname) : undefined

  return {
    metadataBase: new URL(getSiteURL()),
    title,
    description,
    alternates: canonicalURL
      ? {
          canonical: canonicalURL,
        }
      : undefined,
    openGraph: {
      title,
      description,
      type: 'website',
      url: canonicalURL,
      images: imageURL
        ? [
            {
              url: getAbsoluteURL(imageURL),
            },
          ]
        : undefined,
    },
    robots: seo?.noIndex
      ? {
          follow: false,
          index: false,
        }
      : undefined,
    twitter: {
      card: imageURL ? 'summary_large_image' : 'summary',
      title,
      description,
      images: imageURL ? [getAbsoluteURL(imageURL)] : undefined,
    },
  }
}
