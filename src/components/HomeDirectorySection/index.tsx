'use client'

import Image from 'next/image'
import Link from 'next/link'
import { type ReactNode, useEffect, useMemo, useState } from 'react'

import { type CarouselApi, Carousel, CarouselContent, CarouselItem } from '@/components/ui/carousel'
import { cn } from '@/lib/utils'

export type DirectoryCard = {
  id: string
  name: string
  imageUrl: string
  imageAlt: string
}

type DirectoryPanel = {
  title: ReactNode
  description: string
  href: string
}

type HomeDirectorySectionProps = {
  shops: DirectoryCard[]
  gastronomy: DirectoryCard[]
  shopsPanel: DirectoryPanel
  gastronomyPanel: DirectoryPanel
}

type DirectoryRowProps = {
  items: DirectoryCard[]
  panel: DirectoryPanel
  panelSide: 'left' | 'right'
  interval: number
}

function useAutoplay(api: CarouselApi | undefined, interval: number) {
  useEffect(() => {
    if (!api || api.scrollSnapList().length <= 1) {
      return
    }

    const autoplay = window.setInterval(() => {
      if (api.canScrollNext()) {
        api.scrollNext()
      } else {
        api.scrollTo(0)
      }
    }, interval)

    return () => window.clearInterval(autoplay)
  }, [api, interval])
}

function DirectoryCardItem({ href, item }: { href: string; item: DirectoryCard }) {
  return (
    <Link
      href={href}
      className="group relative block h-full min-h-[230px] overflow-hidden bg-[#151817] text-white sm:min-h-[260px] lg:h-[467px] lg:min-h-0"
      aria-label={`Ver ${item.name}`}
    >
      <article className="h-full">
        <Image
          src={item.imageUrl}
          alt={item.imageAlt}
          fill
          sizes="(min-width: 1280px) 20vw, (min-width: 768px) 33vw, 80vw"
          unoptimized
          className="object-cover transition duration-500 group-hover:scale-[1.03]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 p-5 sm:p-6">
          <h3 className="text-sm font-bold leading-none text-white">{item.name}</h3>
          <p className="mt-2 text-[0.6875rem] font-medium leading-none text-white/85">
            Ver informações {'->'}
          </p>
        </div>
      </article>
    </Link>
  )
}

function IntroPanel({ panel, side }: { panel: DirectoryPanel; side: 'left' | 'right' }) {
  return (
    <div
      className={cn(
        'relative z-10 flex min-h-[230px] flex-col justify-center px-8 py-10 text-white sm:min-h-[260px] sm:px-12 lg:absolute lg:inset-y-0 lg:h-[467px] lg:min-h-0 lg:px-14 xl:px-20',
        side === 'left'
          ? 'bg-[linear-gradient(90deg,#212322_63.22%,rgba(33,35,34,0.71)_79.71%,rgba(33,35,34,0)_94.48%)] lg:left-0 lg:w-[min(825px,60vw)]'
          : 'bg-[linear-gradient(270deg,#212322_63.22%,rgba(33,35,34,0.71)_79.71%,rgba(33,35,34,0)_94.48%)] lg:right-0 lg:w-[min(980px,70vw)]',
      )}
    >
      <div
        className={cn('max-w-[360px]', side === 'right' && 'lg:ml-auto lg:text-left max-w-[520px]')}
      >
        {panel.title}
        <p className="mt-1 text-xl font-extralight leading-none text-white/45 sm:text-4xl">
          {panel.description}
        </p>
        <Link
          href={panel.href}
          className="mt-9 inline-flex gap-2 text-lg leading-none text-white/90 transition hover:text-white"
        >
          Ver mais
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="29"
            height="21"
            viewBox="0 0 29 21"
            fill="none"
          >
            <g clipPath="url(#clip0_2061_266)">
              <path
                d="M21.5 6.47101L25.5 10.5L21.5 14.5M25.5 10.5L4.5 10.5"
                stroke="white"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </g>
            <defs>
              <clipPath id="clip0_2061_266">
                <rect
                  width="21"
                  height="29"
                  fill="white"
                  transform="translate(29 1.26763e-06) rotate(90)"
                />
              </clipPath>
            </defs>
          </svg>
        </Link>
      </div>
    </div>
  )
}

function DirectoryRow({ items, panel, panelSide, interval }: DirectoryRowProps) {
  const [api, setApi] = useState<CarouselApi>()
  const carouselItems = useMemo(() => {
    if (items.length >= 6) {
      return items
    }

    return [...items, ...items, ...items].slice(0, Math.max(items.length, 6))
  }, [items])

  useAutoplay(api, interval)

  if (!items.length) {
    return null
  }

  return (
    <div className="relative overflow-hidden bg-[#151817] lg:h-[467px]">
      <IntroPanel panel={panel} side={panelSide} />

      <Carousel
        setApi={setApi}
        opts={{
          align: 'start',
          loop: carouselItems.length > 1,
        }}
        className="w-full lg:h-[467px]"
      >
        <CarouselContent className="-ml-0 lg:h-[467px]">
          {carouselItems.map((item, index) => (
            <CarouselItem
              key={`${item.id}-${index}`}
              className="basis-[82%] pl-0 sm:basis-1/2 md:basis-1/3 lg:h-[467px] lg:basis-1/5"
            >
              <DirectoryCardItem href={panel.href} item={item} />
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </div>
  )
}

export function HomeDirectorySection({
  shops,
  gastronomy,
  shopsPanel,
  gastronomyPanel,
}: HomeDirectorySectionProps) {
  if (!shops.length && !gastronomy.length) {
    return null
  }

  return (
    <section className=" py-10 sm:py-14 lg:py-20">
      <div className="w-full max-w-[1920px] mx-auto">
        <div className="overflow-hidden">
          <DirectoryRow items={shops} panel={shopsPanel} panelSide="left" interval={3600} />
          <DirectoryRow
            items={gastronomy}
            panel={gastronomyPanel}
            panelSide="right"
            interval={4200}
          />
        </div>
      </div>
    </section>
  )
}
