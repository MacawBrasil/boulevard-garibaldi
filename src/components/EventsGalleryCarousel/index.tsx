'use client'

import Image from 'next/image'

import { Carousel, CarouselContent, CarouselItem, useCarousel } from '@/components/ui/carousel'

export type GalleryCarouselItem = {
  id: string
  title: string
  description: string
  dateLabel: string
  imageUrl: string
  imageAlt: string
}

type EventsGalleryCarouselProps = {
  items: GalleryCarouselItem[]
}

function ArrowLeftIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="35" height="60" viewBox="0 0 35 60" fill="none">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M1.31745 33.1933C0.473825 32.3494 -9.40625e-05 31.205 -9.41668e-05 30.0118C-9.42711e-05 28.8186 0.473825 27.6742 1.31744 26.8303L26.7739 1.37379C27.189 0.943997 27.6856 0.601174 28.2346 0.365334C28.7836 0.12949 29.3741 0.00535628 29.9716 0.000164429C30.5691 -0.00502743 31.1617 0.10883 31.7147 0.335095C32.2678 0.56136 32.7702 0.8955 33.1927 1.31802C33.6152 1.74054 33.9494 2.24296 34.1756 2.796C34.4019 3.34903 34.5158 3.94159 34.5106 4.5391C34.5054 5.1366 34.3812 5.7271 34.1454 6.27612C33.9096 6.82513 33.5667 7.32168 33.1369 7.73679L10.8619 30.0118L33.1369 52.2868C33.9567 53.1355 34.4102 54.2722 34.4 55.4521C34.3897 56.632 33.9165 57.7606 33.0821 58.595C32.2478 59.4293 31.1191 59.9026 29.9393 59.9128C28.7594 59.9231 27.6227 59.4695 26.7739 58.6498L1.31745 33.1933Z"
        fill="currentColor"
      />
    </svg>
  )
}

function ArrowRightIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="35" height="60" viewBox="0 0 35 60" fill="none">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M33.1933 26.7197C34.0369 27.5636 34.5108 28.708 34.5108 29.9012C34.5108 31.0944 34.0369 32.2388 33.1933 33.0827L7.7368 58.5392C7.32169 58.969 6.82514 59.3118 6.27612 59.5477C5.7271 59.7835 5.13661 59.9076 4.5391 59.9128C3.9416 59.918 3.34904 59.8042 2.79601 59.5779C2.24297 59.3516 1.74054 59.0175 1.31802 58.595C0.895501 58.1725 0.561362 57.67 0.335098 57.117C0.108834 56.564 -0.00502227 55.9714 0.000169907 55.3739C0.00536208 54.7764 0.1295 54.1859 0.365341 53.6369C0.601181 53.0879 0.944 52.5913 1.3738 52.1762L23.6488 29.9012L1.3738 7.6262C0.554084 6.77749 0.10051 5.64078 0.110763 4.4609C0.121016 3.28101 0.594275 2.15236 1.42861 1.31802C2.26295 0.483682 3.39161 0.010423 4.57149 0.000170112C5.75138 -0.0100828 6.88809 0.443492 7.7368 1.2632L33.1933 26.7197Z"
        fill="currentColor"
      />
    </svg>
  )
}

function GalleryControls() {
  const { scrollPrev, scrollNext, canScrollPrev, canScrollNext } = useCarousel()

  return (
    <div className="mt-5 flex items-center justify-center gap-5 sm:contents">
      <button
        type="button"
        className="z-10 inline-flex size-12 cursor-pointer items-center justify-center rounded-full bg-[#212322] text-white transition hover:scale-105 disabled:pointer-events-none disabled:cursor-default disabled:opacity-30 sm:absolute sm:bottom-[7%] sm:left-7 sm:h-[96px] sm:w-[72px] sm:rounded-none sm:bg-transparent [&_svg]:h-7 [&_svg]:w-auto sm:[&_svg]:h-[60px]"
        disabled={!canScrollPrev}
        onClick={scrollPrev}
        aria-label="Imagem anterior"
      >
        <ArrowLeftIcon />
      </button>
      <button
        type="button"
        className="z-10 inline-flex size-12 cursor-pointer items-center justify-center rounded-full bg-[#212322] text-white transition hover:scale-105 disabled:pointer-events-none disabled:cursor-default disabled:opacity-30 sm:absolute sm:bottom-[7%] sm:right-7 sm:h-[96px] sm:w-[72px] sm:rounded-none sm:bg-transparent [&_svg]:h-7 [&_svg]:w-auto sm:[&_svg]:h-[60px]"
        disabled={!canScrollNext}
        onClick={scrollNext}
        aria-label="Próxima imagem"
      >
        <ArrowRightIcon />
      </button>
    </div>
  )
}

export function EventsGalleryCarousel({ items }: EventsGalleryCarouselProps) {
  if (!items.length) {
    return null
  }

  return (
    <Carousel
      opts={{
        align: 'start',
        loop: items.length > 1,
      }}
      className="relative"
    >
      <CarouselContent className="-ml-0">
        {items.map((item) => (
          <CarouselItem key={item.id} className="pl-0">
            <article className="bg-[#212322] text-white sm:relative sm:aspect-[1520/750] sm:min-h-[420px] sm:overflow-hidden">
              <div className="relative h-[360px] overflow-hidden sm:absolute sm:inset-0 sm:h-auto">
                <Image
                  src={item.imageUrl}
                  alt={item.imageAlt}
                  fill
                  sizes="(min-width: 1536px) 1520px, 100vw"
                  unoptimized
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-[linear-gradient(0deg,rgba(33,35,34,0.80)_15.71%,rgba(33,35,34,0)_35.84%)]" />
              </div>

              <div className="relative z-20 px-5 py-5 text-left sm:absolute sm:inset-x-0 sm:bottom-[6%] sm:px-[13%] sm:py-0">
                <div className="max-w-[240px] sm:max-w-none">
                  <div className="flex flex-wrap items-baseline gap-3 sm:gap-6">
                    {item.title ? (
                      <h3 className="text-[clamp(1.75rem,3vw,2.357rem)] font-bold leading-normal tracking-normal">
                        {item.title}
                      </h3>
                    ) : null}
                    {item.dateLabel ? (
                      <p className="text-base font-light leading-normal text-white/85">
                        {item.dateLabel}
                      </p>
                    ) : null}
                  </div>

                  {item.description ? (
                    <p className="mt-2 text-[1rem] font-light leading-normal text-white sm:mt-3 sm:max-w-[1123px] sm:text-[clamp(1rem,2vw,1.571rem)]">
                      {item.description}
                    </p>
                  ) : null}
                </div>
              </div>
            </article>
          </CarouselItem>
        ))}
      </CarouselContent>

      <GalleryControls />
    </Carousel>
  )
}
