import Image from 'next/image'
import { getPayload } from 'payload'

import { Footer } from '@/components/Footer'
import { HomeEventsSection, type HomeEventCard } from '@/components/HomeEventsSection'
import { HomeLocationCta } from '@/components/HomeLocationCta'
import { HomeDirectorySection, type DirectoryCard } from '@/components/HomeDirectorySection'
import { Navbar } from '@/components/Navbar'
import { cn } from '@/lib/utils'
import configPromise from '@payload-config'

import type { Event, Gastronomy, Media, ShopsAndService } from '@/payload-types'

export const dynamic = 'force-dynamic'

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

function toDirectoryCard(item: ShopsAndService | Gastronomy): DirectoryCard | null {
  const image = typeof item.image === 'string' ? null : item.image
  const imageUrl = getMediaURL(image)

  if (!imageUrl) {
    return null
  }

  return {
    id: item.id,
    name: item.name,
    imageUrl,
    imageAlt: image?.alt || item.name,
  }
}

const eventDateFormatter = new Intl.DateTimeFormat('pt-BR', {
  day: '2-digit',
  month: 'long',
  timeZone: 'America/Sao_Paulo',
})

const eventDayFormatter = new Intl.DateTimeFormat('pt-BR', {
  day: '2-digit',
  timeZone: 'America/Sao_Paulo',
})

const eventMonthFormatter = new Intl.DateTimeFormat('pt-BR', {
  month: 'short',
  timeZone: 'America/Sao_Paulo',
})

function getTodayStartISOString() {
  const today = new Date()
  today.setHours(0, 0, 0, 0)

  return today.toISOString()
}

function toEventCard(item: Event): HomeEventCard | null {
  const image = typeof item.image === 'string' ? null : item.image
  const imageUrl = getMediaURL(image)

  if (!imageUrl) {
    return null
  }

  const date = new Date(item.date)

  return {
    id: item.id,
    title: item.title,
    description: item.description,
    dayLabel: eventDayFormatter.format(date),
    monthLabel: eventMonthFormatter.format(date).replace('.', '').toUpperCase(),
    timeLabel: `${eventDateFormatter.format(date)} ${item.startTime} às ${item.endTime}`,
    imageUrl,
    imageAlt: image?.alt || item.title,
    ctaLabel: item.cta.label,
    ctaUrl: item.cta.url,
  }
}

export default async function HomePage() {
  const payload = await getPayload({ config: configPromise })
  const [home, footer, shopsPage, gastronomyPage, eventsPage, shopsResult, gastronomyResult, eventsResult] =
    await Promise.all([
      payload.findGlobal({ slug: 'home', depth: 1 }),
      payload.findGlobal({ slug: 'footer', depth: 1 }),
      payload.findGlobal({ slug: 'shops-and-services-page', depth: 1 }),
      payload.findGlobal({ slug: 'gastronomy-page', depth: 1 }),
      payload.findGlobal({ slug: 'events-page', depth: 1 }),
      payload.find({
        collection: 'shops-and-services',
        depth: 1,
        limit: 12,
        sort: 'name',
      }),
      payload.find({
        collection: 'gastronomy',
        depth: 1,
        limit: 12,
        sort: 'name',
      }),
      payload.find({
        collection: 'events',
        depth: 1,
        sort: 'date',
        where: {
          date: {
            greater_than_equal: getTodayStartISOString(),
          },
        },
      }),
    ])

  const heroSlide = home.hero?.slides?.[0]
  const heroImageUrl = getMediaURL(heroSlide?.image)
  const heroMobileImageUrl = getMediaURL(heroSlide?.imageMobile)
  const hasHeroImage = Boolean(heroImageUrl || heroMobileImageUrl)
  const section = home.section
  const sectionImage = typeof section?.image === 'string' ? null : section?.image
  const sectionImageUrl = getMediaURL(sectionImage)
  const logo = typeof footer.brand?.logo === 'string' ? null : footer.brand?.logo
  const logoUrl = getMediaURL(logo)
  const logoAlt = logo?.alt || 'Boulevard Garibaldi'
  const shops = shopsResult.docs.map(toDirectoryCard).filter((item) => item !== null)
  const gastronomy = gastronomyResult.docs.map(toDirectoryCard).filter((item) => item !== null)
  const events = eventsResult.docs.map(toEventCard).filter((item) => item !== null)
  const bannerImage = typeof home.banner.image === 'string' ? null : home.banner.image
  const bannerImageUrl = getMediaURL(bannerImage)

  return (
    <>
      <section className="relative min-h-140 overflow-hidden bg-[#151817] text-white sm:min-h-[620px] lg:min-h-[970px]">
        <Navbar hasBackgroundImage={hasHeroImage} logoAlt={logoAlt} logoUrl={logoUrl} />

        {heroMobileImageUrl ? (
          <Image
            src={heroMobileImageUrl}
            alt=""
            fill
            priority
            sizes="100vw"
            unoptimized
            className="object-cover md:hidden"
          />
        ) : null}

        {heroImageUrl ? (
          <Image
            src={heroImageUrl}
            alt=""
            fill
            priority
            sizes="100vw"
            unoptimized
            className={cn('object-cover', heroMobileImageUrl && 'hidden md:block')}
          />
        ) : null}
      </section>

      <section className=" py-14 text-[#222222] sm:py-18 lg:py-24">
        <div className="layout-container grid items-center gap-8 md:gap-10 lg:grid-cols-[minmax(0,750px)_minmax(0,1fr)] lg:gap-14">
          {sectionImageUrl ? (
            <div className="relative aspect-square w-full overflow-hidden rounded-lg lg:max-w-[750px]">
              <Image
                src={sectionImageUrl}
                alt={sectionImage?.alt || ''}
                fill
                sizes="(min-width: 1024px) 50vw, 100vw"
                unoptimized
                className="object-cover"
              />
            </div>
          ) : null}

          <div className="">
            <h1 className="text-3xl font-bold text-[#212322] sm:text-4xl lg:text-6xl">
              {section.title}
            </h1>

            <p className="mt-5 text-base font-medium leading-[1.6] text-[#212322] sm:text-lg">
              {section.description}
            </p>

            {section.items?.length ? (
              <ul className="mt-9 grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
                {section.items.map((item) => {
                  const icon = typeof item.icon === 'string' ? null : item.icon
                  const iconUrl = getMediaURL(icon)

                  return (
                    <li key={item.id || item.title} className="flex items-center gap-4">
                      {iconUrl ? (
                        <Image
                          src={iconUrl}
                          alt=""
                          width={44}
                          height={44}
                          unoptimized
                          className="size-11 shrink-0 object-contain"
                        />
                      ) : null}

                      <span className="text-sm font-semibold leading-tight text-[#2d2d2d]">
                        {item.title}
                      </span>
                    </li>
                  )
                })}
              </ul>
            ) : null}
          </div>
        </div>
      </section>

      <HomeDirectorySection
        shops={shops}
        gastronomy={gastronomy}
        shopsPanel={{
          title: (
            <h2
              key="shops"
              className="text-4xl leading-[0.95] italic font-extralight tracking-normal sm:text-6xl"
            >
              <strong className="not-italic">Lojas</strong> & serviços
            </h2>
          ),
          description: '',
          href: '/lojas-e-servicos',
        }}
        gastronomyPanel={{
          title: (
            <h2 key="gastronomy" className="text-4xl tracking-normal font-bold sm:text-6xl">
              Gastronomia
            </h2>
          ),
          description: 'Conheça os estabelecimentos',
          href: '/gastronomia',
        }}
      />

      <HomeEventsSection events={events} text={eventsPage.text} />

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
        legalLinks={footer.legalLinks}
      />
    </>
  )
}
