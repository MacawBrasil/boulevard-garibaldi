import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'

import { Footer } from '@/components/Footer'
import { InternalPageBackground } from '@/components/InternalPageBackground'
import { Navbar } from '@/components/Navbar'
import { RichText } from '@/components/RichText'
import { getFooterGlobal, getLegalPageBySlug, getLegalPages } from '@/lib/payload-data'
import { buildSEOMetadata } from '@/lib/seo'

import type { Media } from '@/payload-types'

export const revalidate = 300

type LegalPageRouteProps = {
  params: Promise<{
    slug: string
  }>
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

export async function generateStaticParams() {
  const result = await getLegalPages()

  return result.docs.map((page) => ({
    slug: page.slug,
  }))
}

export async function generateMetadata({ params }: LegalPageRouteProps): Promise<Metadata> {
  const { slug } = await params
  const page = await getLegalPageBySlug(slug)

  if (!page) {
    return {}
  }

  return buildSEOMetadata(page.seo, {
    fallbackDescription: page.seo?.description || page.title,
    fallbackTitle: `${page.title} | Boulevard Garibaldi`,
    pathname: `/${page.slug}`,
  })
}

export default async function LegalPage({ params }: LegalPageRouteProps) {
  const { slug } = await params
  const [page, footer, legalPages] = await Promise.all([
    getLegalPageBySlug(slug),
    getFooterGlobal(),
    getLegalPages(),
  ])

  if (!page) {
    notFound()
  }

  const logo = typeof footer.brand?.logo === 'string' ? null : footer.brand?.logo
  const logoUrl = getMediaURL(logo)
  const logoAlt = logo?.alt || 'Boulevard Garibaldi'

  return (
    <>
      <Navbar logoAlt={logoAlt} logoUrl={logoUrl} />

      <main className="relative overflow-hidden bg-[#f4f4f4] text-[#212322]">
        <InternalPageBackground />

        <section className="relative pb-20 pt-6 lg:pb-28">
          <div className="layout-container">
            <nav className="flex items-center gap-1 text-sm uppercase leading-none text-[#212322]">
              <Link href="/" className="font-normal transition hover:opacity-75">
                Home
              </Link>
              <span>|</span>
              <span className="font-bold">{page.title}</span>
            </nav>

            <article className="mx-auto mt-12 max-w-[920px]">
              <h1 className="text-[clamp(2.75rem,7vw,4.625rem)] font-bold leading-none tracking-normal">
                {page.title}
              </h1>

              <RichText data={page.content} className="legal-rich-text mt-10" />
            </article>
          </div>
        </section>
      </main>

      <Footer
        logoUrl={logoUrl}
        logoAlt={logoAlt}
        address={footer.brand.address}
        openingHoursTitle={footer.openingHours.title}
        openingHours={footer.openingHours.items}
        contactsTitle={footer.contacts.title}
        contacts={footer.contacts.items}
        socialTitle={footer.social.title}
        socialLinks={footer.social.links}
        legalPages={legalPages.docs}
      />
    </>
  )
}
