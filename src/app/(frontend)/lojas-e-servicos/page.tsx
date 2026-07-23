import Image from 'next/image'
import Link from 'next/link'

import { Footer } from '@/components/Footer'
import { HomeLocationCta } from '@/components/HomeLocationCta'
import { InternalPageBackground } from '@/components/InternalPageBackground'
import { Navbar } from '@/components/Navbar'
import {
  getFooterGlobal,
  getGeneralSettingsGlobal,
  getHomeGlobal,
  getShopsAndServicesItems,
  getShopsAndServicesPageGlobal,
} from '@/lib/payload-data'
import { buildSEOMetadata } from '@/lib/seo'
import { normalizePhoneHref, normalizePhoneNumber } from '@/lib/utils'

import type { Media, ShopsAndService } from '@/payload-types'
import { RichText } from '@/components/RichText'
import type { Metadata } from 'next'

export const revalidate = 300

export async function generateMetadata(): Promise<Metadata> {
  const page = await getShopsAndServicesPageGlobal()

  return buildSEOMetadata(page.seo, {
    fallbackDescription: page.description,
    fallbackTitle: 'Lojas e Serviços | Boulevard Garibaldi',
    pathname: '/lojas-e-servicos',
  })
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

function getWhatsappUrl(phone: string, message?: string | null) {
  const params = message ? `?text=${encodeURIComponent(message)}` : ''

  return `https://wa.me/${normalizePhoneNumber(phone)}${params}`
}

function getSocialLinkHref(link: ShopsAndService['socialLinks'][number]) {
  if (!link.isWhatsappNumber) {
    return link.url
  }

  const whatsappNumber = normalizePhoneNumber(link.url)

  return whatsappNumber ? `https://wa.me/${whatsappNumber}` : link.url
}

function SocialLinkBadge({ link }: { link: ShopsAndService['socialLinks'][number] }) {
  const iconUrl = getMediaURL(link.icon)
  const href = getSocialLinkHref(link)

  if (!iconUrl) {
    return null
  }

  return (
    <Link
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex size-10 items-center justify-center transition hover:opacity-75"
      aria-label={link.title}
    >
      <Image
        src={iconUrl}
        alt=""
        width={40}
        height={40}
        unoptimized
        className="size-10 object-contain"
      />
    </Link>
  )
}

function ShopCard({ item }: { item: ShopsAndService }) {
  const image = typeof item.image === 'string' ? null : item.image
  const imageUrl = getMediaURL(image)
  const phoneHref = normalizePhoneHref(item.phone)

  return (
    <article className="overflow-hidden rounded-[18px] bg-white shadow-none transition hover:-translate-y-1 hover:shadow-[0_18px_40px_rgba(33,35,34,0.14)] lg:h-[695px]">
      <div className="relative h-[360px] overflow-hidden rounded-[18px] bg-[#dedbd4] lg:h-[430px]">
        {imageUrl ? (
          <Image
            src={imageUrl}
            alt={image?.alt || item.name}
            fill
            sizes="(min-width: 1280px) 455px, (min-width: 768px) 50vw, 100vw"
            unoptimized
            className="object-cover"
          />
        ) : null}

        <div className="absolute inset-0 bg-gradient-to-t from-[#212322]/80 via-[#212322]/15 to-transparent" />

        <div className="absolute inset-x-0 bottom-[24px] px-[15px] text-white">
          <h2 className="text-[clamp(2.75rem,7vw,3.875rem)] font-bold leading-none tracking-normal">
            {item.name}
          </h2>
          <div className="mt-3 flex flex-wrap items-center gap-5">
            <span className="inline-flex min-h-8 items-center justify-center rounded-full border border-white px-5 py-2 text-xs font-normal uppercase leading-none">
              {item.category}
            </span>
            <span className="text-lg font-normal uppercase leading-none">{item.room}</span>
          </div>
        </div>
      </div>

      <div className="flex flex-col px-[26px] pb-6 pt-6 lg:h-[265px]">
        <div className="text-[clamp(1rem,2vw,1.375rem)] font-normal uppercase leading-[1.8] tracking-[-0.04em] text-[#212322] lg:leading-[40px]">
          <p>De segunda a sexta {item.openingHours.weekdays}</p>
          <p>Sábado {item.openingHours.saturday}</p>
        </div>

        {phoneHref ? (
          <a
            className="mt-3 text-[clamp(1.75rem,4vw,2.375rem)] font-bold leading-[1.15] text-[#874230] transition hover:text-[#212322] lg:leading-[50px]"
            href={phoneHref}
          >
            {item.phone}
          </a>
        ) : (
          <p className="mt-3 text-[clamp(1.75rem,4vw,2.375rem)] font-bold leading-[1.15] text-[#874230] lg:leading-[50px]">
            {item.phone}
          </p>
        )}

        {item.socialLinks.length ? (
          <div className="mt-auto flex gap-4 pt-5">
            {item.socialLinks.map((link) => (
              <SocialLinkBadge key={link.id || link.url} link={link} />
            ))}
          </div>
        ) : null}
      </div>
    </article>
  )
}

function FloatingWhatsapp({ phone, message }: { phone: string; message?: string | null }) {
  return (
    <Link
      href={getWhatsappUrl(phone, message)}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-5 right-5 z-50 inline-flex size-14 items-center justify-center rounded-full bg-white shadow-[0_8px_22px_rgba(0,0,0,0.28)] transition hover:scale-105 md:bottom-[26px] md:size-[78px] lg:right-12"
      aria-label="Abrir WhatsApp"
    >
      <svg xmlns="http://www.w3.org/2000/svg" className="size-full" viewBox="0 0 78 78" fill="none">
        <circle cx="39" cy="39" r="39" fill="white" />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M18.2209 58.8752C18.1793 59.0256 18.1779 59.1843 18.2169 59.3354C18.2559 59.4865 18.3339 59.6245 18.443 59.7357C18.5522 59.8468 18.6886 59.9271 18.8385 59.9684C18.9884 60.0097 19.1465 60.0105 19.2968 59.9709L29.475 57.3005C32.7042 59.0565 36.3186 59.9766 39.9911 59.9775H40C52.12 59.9775 61.9999 50.1166 61.9999 37.9933C62.0074 35.1023 61.442 32.2387 60.3368 29.5691C59.2316 26.8995 57.6085 24.4772 55.5621 22.4432C53.5192 20.3926 51.0925 18.7676 48.4218 17.6618C45.7511 16.5561 42.8889 15.9913 40 16.0001C27.8799 16.0001 18 25.8611 18 37.9822C18 41.8392 19.0118 45.6274 20.9383 48.9699L18.2209 58.8752ZM33.0275 27.4669C33.4318 27.478 33.8803 27.5002 34.3067 28.4494C34.5894 29.0816 35.0644 30.246 35.4533 31.1953C35.7559 31.9338 36.0034 32.5415 36.0652 32.6658C36.2088 32.9496 36.295 33.2757 36.1094 33.6594L36.0476 33.788C35.8973 34.0985 35.7913 34.3203 35.5394 34.6087L35.2235 34.9857C35.0357 35.2164 34.8479 35.4426 34.6889 35.6023C34.4039 35.8862 34.11 36.1923 34.437 36.7601C34.764 37.3279 35.9128 39.1954 37.6073 40.7014C38.8467 41.8236 40.2688 42.7238 41.8116 43.3629C41.9662 43.4294 42.0914 43.4856 42.1871 43.5315C42.7549 43.8154 43.0929 43.771 43.4199 43.3895C43.7491 43.0058 44.8405 41.7283 45.2249 41.1605C45.5961 40.5927 45.976 40.6814 46.5019 40.8766C47.0277 41.074 49.8246 42.4513 50.3924 42.733L50.7083 42.8883C51.1038 43.0768 51.3711 43.2077 51.486 43.3984C51.6274 43.6402 51.6274 44.7735 51.159 46.1087C50.6774 47.4395 48.3599 48.717 47.3105 48.8146L47.0122 48.8501C46.049 48.9654 44.8294 49.1163 40.4816 47.3974C35.1219 45.2814 31.5848 40.0338 30.8712 38.9714L30.7541 38.8028L30.7431 38.7851C30.4161 38.3481 28.4256 35.6755 28.4256 32.9164C28.4256 30.277 29.7224 28.9019 30.3123 28.2764L30.4161 28.1655C30.6071 27.949 30.8403 27.7742 31.1015 27.6521C31.3626 27.53 31.6459 27.4632 31.9339 27.4558C32.3161 27.4558 32.7005 27.4558 33.0275 27.4669Z"
          fill="#0DC600"
        />
      </svg>
    </Link>
  )
}

export default async function ShopsAndServicesPage() {
  const [page, home, footer, generalSettings, shopsResult] = await Promise.all([
    getShopsAndServicesPageGlobal(),
    getHomeGlobal(),
    getFooterGlobal(),
    getGeneralSettingsGlobal(),
    getShopsAndServicesItems(100),
  ])

  const logo = typeof footer.brand?.logo === 'string' ? null : footer.brand?.logo
  const logoUrl = getMediaURL(logo)
  const logoAlt = logo?.alt || 'Boulevard Garibaldi'
  const bannerImage = typeof home.banner.image === 'string' ? null : home.banner.image
  const bannerImageUrl = getMediaURL(bannerImage)
  const pageBackground = typeof page.background === 'string' ? null : page.background
  const pageBackgroundUrl = getMediaURL(pageBackground)

  return (
    <>
      <section className="relative h-[430px] overflow-hidden bg-[#212322] text-white md:h-[522px]">
        {pageBackgroundUrl ? (
          <Image
            src={pageBackgroundUrl}
            alt={pageBackground?.alt || ''}
            fill
            priority
            sizes="100vw"
            unoptimized
            className="object-cover"
          />
        ) : null}

        <div className="absolute inset-0 bg-[#212322]/35" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#212322]/95  to-transparent" />

        <Navbar hasBackgroundImage logoAlt={logoAlt} logoUrl={logoUrl} />

        <div className="layout-container relative z-10 flex h-full flex-col pt-28 md:pt-[203px]">
          <nav className="flex items-center gap-1 text-sm uppercase leading-none text-white">
            <Link href="/" className="font-normal transition hover:opacity-75">
              Home
            </Link>
            <span>|</span>
            <span className="font-bold">Lojas e Serviços</span>
          </nav>

          <div className="mt-12 text-center md:mt-[72px]">
            <h1 className="text-[clamp(3rem,7vw,4.625rem)] font-bold leading-none tracking-normal">
              Lojas <span className="font-extralight">&</span> Serviços
            </h1>
            <p className="mt-5 text-[clamp(1.125rem,2.5vw,1.75rem)] font-normal leading-normal">
              {page.description}
            </p>
          </div>
        </div>

        {generalSettings.whatsapp.enabled ? (
          <FloatingWhatsapp
            phone={generalSettings.whatsapp.phone}
            message={generalSettings.whatsapp.message}
          />
        ) : null}
      </section>

      <main className="relative overflow-hidden bg-[#f4f4f4] text-[#212322]">
        <InternalPageBackground />

        <section className="relative px-5 pb-[60px] pt-[60px] sm:px-8 lg:px-5">
          <div className="mx-auto w-full max-w-[1880px]">
            {shopsResult.docs.length ? (
              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">
                {shopsResult.docs.map((item) => (
                  <ShopCard key={item.id} item={item} />
                ))}
              </div>
            ) : (
              <p className="mt-12 text-lg text-[#212322]/70">
                Nenhuma loja ou serviço cadastrado no momento.
              </p>
            )}
          </div>
        </section>
      </main>

      <section className="bg-white py-10 px-5">
        <div className="max-w-[740px] mx-auto">
          <p className="text-center text-3xl text-[#212322] font-bold leading-9">
            {page.group.title}
          </p>
          <RichText
            data={page.group.description}
            className="mt-5 leading-tight text-xl tracking-tight text-[#212322]   "
          />
        </div>
      </section>

      {bannerImageUrl ? (
        <HomeLocationCta
          title={home.banner.title}
          ctaLabel={home.banner.cta}
          ctaUrl={home.banner.ctaLink}
          imageUrl={bannerImageUrl}
          imageAlt={bannerImage?.alt || home.banner.title}
        />
      ) : null}

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
        legalDocuments={footer.legalDocuments?.items}
      />
    </>
  )
}
