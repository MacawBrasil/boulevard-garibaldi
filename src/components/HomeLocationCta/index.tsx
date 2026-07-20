import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

type HomeLocationCtaProps = {
  title: string
  ctaLabel: string
  ctaUrl: string
  imageUrl: string
  imageAlt: string
}

function getTitleParts(title: string) {
  const lines = title
    .split('\n')
    .map((line) => line.trim())
    .filter(Boolean)

  if (lines.length >= 2) {
    return {
      firstLine: lines[0],
      secondLine: lines.slice(1).join(' '),
    }
  }

  const match = title.match(/^(.*?)(onde\s+estamos\??)$/i)

  return {
    firstLine: match?.[1]?.trim() || title,
    secondLine: match?.[2]?.trim() || '',
  }
}

export function HomeLocationCta({
  title,
  ctaLabel,
  ctaUrl,
  imageUrl,
  imageAlt,
}: HomeLocationCtaProps) {
  const { firstLine, secondLine } = getTitleParts(title)

  return (
    <section className="relative h-[320px] overflow-hidden bg-[#874230] text-white sm:h-[350px] lg:h-[373px]">
      <div className="absolute inset-y-0 left-0 w-full lg:w-[56.35%]">
        <Image
          src={imageUrl}
          alt={imageAlt}
          fill
          sizes="(min-width: 1024px) 56vw, 100vw"
          unoptimized
          className="object-cover object-[center_34%] opacity-40"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#874230]/0 via-[#874230]/50 to-[#874230]" />
      </div>

      <div className="relative z-10 mx-auto flex h-full w-full max-w-[1920px] items-center px-5 sm:px-8 lg:px-0">
        <div className="ml-auto w-full max-w-[470px] lg:mr-[20.9%]">
          <h2 className="text-[clamp(2.5rem,6vw,3.875rem)] font-bold leading-none tracking-normal text-white lg:text-[62px]">
            {firstLine}
            {secondLine ? <span className="block font-black italic">{secondLine}</span> : null}
          </h2>

          <Link
            href={ctaUrl}
            className="mt-5 inline-flex items-center gap-3 text-[clamp(1rem,2.5vw,1.553rem)] font-normal leading-none text-white transition hover:opacity-75 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/80 focus-visible:ring-offset-4 focus-visible:ring-offset-[#874230]"
            aria-label={ctaLabel}
          >
            {ctaLabel}
            <ArrowRight className="h-[1em] w-[1.6em] stroke-[1.4]" aria-hidden="true" />
          </Link>
        </div>
      </div>
    </section>
  )
}
