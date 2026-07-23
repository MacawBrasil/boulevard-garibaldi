import Image from 'next/image'
import Link from 'next/link'
import { RichText } from '../RichText'
import { cn } from '@/lib/utils'

export type HomeEventCard = {
  id: string
  title: string
  description: string
  dayLabel: string
  monthLabel: string
  timeLabel: string
  imageUrl: string
  imageAlt: string
  ctaLabel: string
  ctaUrl: string
}

type HomeEventsSectionProps = {
  events: HomeEventCard[]
  text: any
}

export function EventCard({ event }: { event: HomeEventCard }) {
  return (
    <article className="@container group relative aspect-square w-full overflow-hidden rounded-[24px] bg-[#a08769] text-white shadow-none transition-all duration-300 hover:shadow-[-12px_16px_14.95px_rgba(0,0,0,0.25)] focus-within:shadow-[-12px_16px_14.95px_rgba(0,0,0,0.25)]">
      <div className="relative h-[58.933%] overflow-hidden transition-[height] duration-300 md:h-[76%] md:group-hover:h-[58.933%] md:group-focus-within:h-[58.933%]">
        <Image
          src={event.imageUrl}
          alt={event.imageAlt}
          fill
          sizes="(min-width: 1536px) 750px, (min-width: 768px) 48vw, calc(100vw - 40px)"
          unoptimized
          className="object-cover transition duration-500 group-hover:scale-[1.02] group-focus-within:scale-[1.02]"
        />
        <div className="absolute inset-0 bg-black/35 transition duration-300 md:bg-black/0 md:group-hover:bg-black/35 md:group-focus-within:bg-black/35" />
        <div className="absolute left-[6.5%] top-[32.5%] translate-y-0 opacity-30 transition duration-300 md:translate-y-3 md:opacity-0 md:group-hover:translate-y-0 md:group-hover:opacity-30 md:group-focus-within:translate-y-0 md:group-focus-within:opacity-30">
          <p className="text-[clamp(4rem,21.55cqw,10.125rem)] font-bold leading-[1.1] tracking-normal text-white">
            {event.dayLabel}
          </p>
          <p className="text-[clamp(2.625rem,13.867cqw,6.5rem)] font-bold leading-[0.79] tracking-normal text-white">
            {event.monthLabel}
          </p>
        </div>
      </div>

      <div className="absolute inset-x-0 bottom-0 h-[41.067%] overflow-hidden bg-[#a08769] px-[6.5%] pb-[5%] pt-[4.4%] transition-[height] duration-300 md:h-[24%] md:group-hover:h-[41.067%] md:group-focus-within:h-[41.067%]">
        <h3 className="line-clamp-1 text-[clamp(1.25rem,5.333cqw,2.5rem)] font-bold leading-none text-white">
          {event.title}
        </h3>
        <p className="mt-[1.1%] line-clamp-1 text-[clamp(1.0625rem,4.533cqw,2.125rem)] font-normal  text-white">
          {event.timeLabel}
        </p>

        <p className="mt-[3.6%] line-clamp-2 max-h-20 text-[clamp(1rem,4cqw,1.875rem)] font-normal leading-none text-white opacity-100 transition-all duration-300 md:mt-0 md:max-h-0 md:opacity-0 md:group-hover:mt-[3.6%] md:group-hover:max-h-20 md:group-hover:opacity-100 md:group-focus-within:mt-[3.6%] md:group-focus-within:max-h-20 md:group-focus-within:opacity-100">
          {event.description}
        </p>

        <Link
          href={event.ctaUrl}
          className="mt-[2.2%] inline-flex max-h-16 items-center overflow-hidden rounded-full border border-white px-[4%] py-[1.35%] text-[clamp(1rem,4cqw,1.875rem)] font-normal leading-none text-white opacity-100 transition-all duration-300 hover:bg-white hover:text-[#a08769] focus-visible:bg-white focus-visible:text-[#a08769] focus-visible:outline-none md:pointer-events-none md:mt-0 md:max-h-0 md:py-0 md:opacity-0 md:group-hover:pointer-events-auto md:group-hover:mt-[2.2%] md:group-hover:max-h-16 md:group-hover:py-[1.35%] md:group-hover:opacity-100 md:group-focus-within:pointer-events-auto md:group-focus-within:mt-[2.2%] md:group-focus-within:max-h-16 md:group-focus-within:py-[1.35%] md:group-focus-within:opacity-100"
        >
          {event.ctaLabel}
        </Link>
      </div>
    </article>
  )
}

export function HomeEventsSection({ events, text }: HomeEventsSectionProps) {
  if (!events.length) {
    return null
  }

  const hasOddEventsCount = events.length % 2 === 1

  return (
    <section className=" px-5 py-12 text-[#212322] sm:py-16 lg:py-20">
      <div className="mx-auto w-full max-w-[1530px]">
        <div className="mb-8 text-center flex flex-col items-center">
          <p className="mx-auto inline-flex rounded-full border-[0.585px] border-black px-4 py-1.5 text-xl font-light leading-none text-[#212322]">
            eventos
          </p>
          <h2 className="mt-4 text-6xl font-bold leading-none tracking-normal text-[#212322]">
            Agenda
          </h2>
          <p className="mt-2 text-4xl font-extralight leading-none text-[#212322]">
            Confira nossos próximos eventos
          </p>

          {text && <RichText data={text} className='max-w-175 text-[#212322] text-xl mt-6'/>}
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:gap-6">
          {events.map((event, index) => (
            <div
              key={event.id}
              className={cn(
                hasOddEventsCount &&
                  index === events.length - 1 &&
                  'md:col-span-2 md:mx-auto md:w-[calc((100%-1rem)/2)] lg:w-[calc((100%-1.5rem)/2)]',
              )}
            >
              <EventCard event={event} />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
