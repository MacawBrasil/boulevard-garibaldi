import Image from 'next/image'
import Link from 'next/link'
import { getPayload } from 'payload'

import { Footer } from '@/components/Footer'
import { HomeLocationCta } from '@/components/HomeLocationCta'
import { InternalPageBackground } from '@/components/InternalPageBackground'
import { Navbar } from '@/components/Navbar'
import configPromise from '@payload-config'

import type { Media, ShopsAndService } from '@/payload-types'
import { RichText } from '@/components/RichText'

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

function normalizePhoneHref(phone: string) {
  const digits = phone.replace(/\D/g, '')

  if (!digits) {
    return ''
  }

  return `tel:${digits}`
}

function getWhatsappUrl(phone: string, message?: string | null) {
  const params = message ? `?text=${encodeURIComponent(message)}` : ''

  return `https://wa.me/${phone}${params}`
}

function InstagramIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 40 40" fill="none">
      <path
        d="M12.86 3H27.14C32.58 3 37 7.42 37 12.86V27.14C37 29.755 35.9612 32.263 34.1121 34.1121C32.263 35.9612 29.755 37 27.14 37H12.86C7.42 37 3 32.58 3 27.14V12.86C3 10.245 4.03882 7.73704 5.88793 5.88793C7.73704 4.03882 10.245 3 12.86 3ZM12.52 6.4C10.8969 6.4 9.34023 7.04478 8.19251 8.19251C7.04478 9.34023 6.4 10.8969 6.4 12.52V27.48C6.4 30.863 9.137 33.6 12.52 33.6H27.48C29.1031 33.6 30.6598 32.9552 31.8075 31.8075C32.9552 30.6598 33.6 29.1031 33.6 27.48V12.52C33.6 9.137 30.863 6.4 27.48 6.4H12.52ZM28.925 8.95C29.4886 8.95 30.0291 9.17388 30.4276 9.5724C30.8261 9.97091 31.05 10.5114 31.05 11.075C31.05 11.6386 30.8261 12.1791 30.4276 12.5776C30.0291 12.9761 29.4886 13.2 28.925 13.2C28.3614 13.2 27.8209 12.9761 27.4224 12.5776C27.0239 12.1791 26.8 11.6386 26.8 11.075C26.8 10.5114 27.0239 9.97091 27.4224 9.5724C27.8209 9.17388 28.3614 8.95 28.925 8.95ZM20 11.5C22.2543 11.5 24.4163 12.3955 26.0104 13.9896C27.6045 15.5837 28.5 17.7457 28.5 20C28.5 22.2543 27.6045 24.4163 26.0104 26.0104C24.4163 27.6045 22.2543 28.5 20 28.5C17.7457 28.5 15.5837 27.6045 13.9896 26.0104C12.3955 24.4163 11.5 22.2543 11.5 20C11.5 17.7457 12.3955 15.5837 13.9896 13.9896C15.5837 12.3955 17.7457 11.5 20 11.5ZM20 14.9C18.6474 14.9 17.3502 15.4373 16.3938 16.3938C15.4373 17.3502 14.9 18.6474 14.9 20C14.9 21.3526 15.4373 22.6498 16.3938 23.6062C17.3502 24.5627 18.6474 25.1 20 25.1C21.3526 25.1 22.6498 24.5627 23.6062 23.6062C24.5627 22.6498 25.1 21.3526 25.1 20C25.1 18.6474 24.5627 17.3502 23.6062 16.3938C22.6498 15.4373 21.3526 14.9 20 14.9Z"
        fill="#212322"
      />
    </svg>
  )
}

function FacebookIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 40 40" fill="none">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M20.5 5.62872C17.0009 5.62432 13.6202 6.90198 10.9909 9.22246C8.36159 11.543 6.66395 14.7471 6.21584 18.2351C5.76773 21.723 6.5999 25.2556 8.55651 28.1712C10.5131 31.0869 13.46 33.1858 16.8454 34.0749V26.0013H14.8543C14.2999 26.0008 13.7685 25.7793 13.3765 25.3853C12.9846 24.9914 12.7642 24.4572 12.7637 23.9V20.9191C12.7642 20.3619 12.9846 19.8278 13.3765 19.4338C13.7685 19.0398 14.2999 18.8183 14.8543 18.8179H16.7966C16.7739 18.2097 16.7286 17.5981 16.7286 16.99C16.7286 15.4321 16.9902 12.3319 19.4364 10.5725C20.1949 10.0292 20.908 9.66818 21.6926 9.45613C22.4615 9.25109 23.2322 9.20552 24.0552 9.20552C25.5093 9.20552 26.5154 9.35098 27.1553 9.44386L27.443 9.48416C27.8316 9.53671 28.1881 9.729 28.4464 10.0254C28.7048 10.3219 28.8476 10.7023 28.8483 11.0964V14.3964C28.8485 14.6164 28.8044 14.8342 28.7186 15.0367C28.6327 15.2391 28.507 15.422 28.349 15.5743C28.1909 15.7266 28.0039 15.8452 27.799 15.9228C27.5941 16.0005 27.3758 16.0356 27.157 16.0262C26.8903 16.0367 25.9801 16.0717 25.1937 16.0717C24.6532 16.0717 24.4928 16.1962 24.437 16.2575C24.3586 16.3416 24.1546 16.65 24.1546 17.5964V18.8179H26.3742C26.6768 18.8181 26.9758 18.8843 27.2506 19.0119C27.5253 19.1396 27.7692 19.3256 27.9654 19.5572C28.1617 19.7887 28.3056 20.0604 28.3873 20.3533C28.469 20.6462 28.4865 20.9534 28.4386 21.2538L27.987 24.2453C27.9054 24.7356 27.6536 25.181 27.2763 25.5024C26.899 25.8239 26.4207 26.0006 25.9261 26.0013H24.1546V34.0749C27.54 33.1858 30.4869 31.0869 32.4435 28.1712C34.4001 25.2556 35.2323 21.723 34.7842 18.2351C34.3361 14.7471 32.6384 11.543 30.0091 9.22246C27.3798 6.90198 23.9991 5.62432 20.5 5.62872ZM3.5 20.0867C3.5 10.6496 11.1108 3 20.5 3C29.8892 3 37.5 10.6496 37.5 20.0867C37.5 28.6563 31.2248 35.7503 23.0404 36.984C22.8545 37.0117 22.6648 36.9988 22.4843 36.9462C22.3038 36.8936 22.1367 36.8025 21.9944 36.679C21.8521 36.5556 21.7379 36.4028 21.6596 36.2311C21.5814 36.0593 21.5409 35.8726 21.5409 35.6837V24.6869C21.5409 24.3383 21.6787 24.004 21.9239 23.7575C22.1692 23.511 22.5018 23.3725 22.8486 23.3725H25.4745L25.7639 21.4466H22.8469C22.5 21.4466 22.1674 21.3081 21.9222 21.0616C21.677 20.8151 21.5392 20.4808 21.5392 20.1322V17.5981C21.5392 16.3626 21.792 15.2516 22.5278 14.4612C23.2863 13.648 24.301 13.4448 25.1955 13.4448C25.5372 13.4448 25.9086 13.4378 26.2329 13.4272V11.9727C25.5106 11.8815 24.7832 11.8358 24.0552 11.836C23.3107 11.836 22.8085 11.8798 22.3691 11.999C21.9454 12.1111 21.5148 12.3127 20.9586 12.7122C19.6561 13.6498 19.3475 15.4811 19.344 16.9672L19.4591 20.0867C19.4654 20.2632 19.4363 20.4392 19.3734 20.6042C19.3105 20.7691 19.2152 20.9197 19.0931 21.0468C18.971 21.1739 18.8247 21.275 18.6629 21.3439C18.5011 21.4129 18.3271 21.4484 18.1514 21.4483H15.3791V23.3743H18.1514C18.4982 23.3743 18.8308 23.5128 19.0761 23.7593C19.3213 24.0058 19.4591 24.3401 19.4591 24.6887V35.6854C19.4591 35.8744 19.4186 36.0611 19.3404 36.2328C19.2621 36.4046 19.1479 36.5574 19.0056 36.6808C18.8633 36.8042 18.6962 36.8953 18.5157 36.948C18.3352 37.0006 18.1455 37.0135 17.9596 36.9858C9.77518 35.7503 3.5 28.6563 3.5 20.0867Z"
        fill="#212322"
      />
    </svg>
  )
}

function WhatsappIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 40 40" fill="none">
      <path
        d="M32.5452 7.94708C30.9786 6.37306 29.1128 5.12503 27.0565 4.2757C25.0003 3.42638 22.7947 2.99275 20.5683 3.00009C11.2397 3.00009 3.63668 10.5651 3.63668 19.847C3.63668 22.822 4.42261 25.712 5.89196 28.262L3.5 37L12.4698 34.654C14.9472 35.997 17.7322 36.711 20.5683 36.711C29.897 36.711 37.5 29.146 37.5 19.864C37.5 15.3591 35.7402 11.1261 32.5452 7.94708ZM20.5683 33.855C18.0397 33.855 15.5623 33.175 13.3925 31.9L12.8799 31.594L7.54925 32.988L8.96734 27.82L8.62563 27.293C7.22043 25.061 6.47444 22.4808 6.47286 19.847C6.47286 12.1291 12.7945 5.83908 20.5513 5.83908C24.31 5.83908 27.8467 7.30108 30.495 9.95307C31.8065 11.2516 32.8458 12.7964 33.5526 14.4977C34.2595 16.1991 34.6197 18.0231 34.6126 19.864C34.6467 27.582 28.3251 33.855 20.5683 33.855ZM28.291 23.383C27.8638 23.179 25.7794 22.159 25.4035 22.006C25.0106 21.87 24.7372 21.802 24.4467 22.21C24.1563 22.635 23.3533 23.587 23.1141 23.859C22.8749 24.148 22.6186 24.182 22.1915 23.961C21.7643 23.757 20.3975 23.298 18.7915 21.87C17.5271 20.748 16.6899 19.371 16.4337 18.9461C16.1945 18.5211 16.3995 18.3001 16.6216 18.0791C16.8095 17.8921 17.0487 17.5861 17.2538 17.3481C17.4588 17.1101 17.5442 16.9231 17.6809 16.6511C17.8176 16.3621 17.7492 16.1241 17.6467 15.9201C17.5442 15.7161 16.6899 13.6421 16.3482 12.7921C16.0065 11.9761 15.6477 12.0781 15.3915 12.0611H14.5714C14.2809 12.0611 13.8367 12.1631 13.4437 12.5881C13.0678 13.0131 11.9744 14.0331 11.9744 16.1071C11.9744 18.1811 13.495 20.187 13.7 20.459C13.905 20.748 16.6899 24.998 20.9271 26.817C21.9352 27.259 22.7211 27.514 23.3362 27.701C24.3442 28.024 25.2668 27.973 26.0015 27.871C26.8216 27.752 28.5131 26.851 28.8548 25.865C29.2136 24.879 29.2136 24.046 29.094 23.859C28.9744 23.672 28.7181 23.587 28.291 23.383Z"
        fill="#212322"
      />
    </svg>
  )
}

function SocialIcon({ network }: { network: ShopsAndService['socialLinks'][number]['network'] }) {
  if (network === 'facebook') {
    return <FacebookIcon />
  }

  if (network === 'whatsapp') {
    return <WhatsappIcon />
  }

  return <InstagramIcon />
}

function SocialLinkBadge({ link }: { link: ShopsAndService['socialLinks'][number] }) {
  const names = {
    facebook: 'Facebook',
    instagram: 'Instagram',
    whatsapp: 'WhatsApp',
  }

  return (
    <Link
      href={link.url}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex size-10 items-center justify-center text-[#212322] transition hover:text-[#874230]"
      aria-label={names[link.network]}
    >
      <SocialIcon network={link.network} />
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
      className="absolute bottom-[26px] right-5 z-20 inline-flex  items-center justify-center rounded-full bg-white shadow-[0_8px_22px_rgba(0,0,0,0.28)] transition hover:scale-105 lg:right-12"
      aria-label="Abrir WhatsApp"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="78"
        height="78"
        viewBox="0 0 78 78"
        fill="none"
      >
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
  const payload = await getPayload({ config: configPromise })
  const [page, home, footer, generalSettings, shopsResult] = await Promise.all([
    payload.findGlobal({ slug: 'shops-and-services-page', depth: 1 }),
    payload.findGlobal({ slug: 'home', depth: 1 }),
    payload.findGlobal({ slug: 'footer', depth: 1 }),
    payload.findGlobal({ slug: 'general-settings', depth: 1 }),
    payload.find({
      collection: 'shops-and-services',
      depth: 1,
      limit: 100,
      sort: 'name',
    }),
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
      <section className="relative h-[522px] overflow-hidden bg-[#212322] text-white">
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

        <div className="layout-container relative z-10 flex h-full flex-col pt-[203px]">
          <nav className="flex items-center gap-1 text-sm uppercase leading-none text-white">
            <Link href="/" className="font-normal transition hover:opacity-75">
              Home
            </Link>
            <span>|</span>
            <span className="font-bold">Lojas e Serviços</span>
          </nav>

          <div className="mt-[72px] text-center">
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

      <section className='bg-white py-10'>
        <div className='max-w-[740px] mx-auto'>

          <p className='text-center text-3xl text-[#212322] font-bold leading-9'>
            {page.group.title}
          </p>
          <RichText data={page.group.description} className='mt-5 leading-tight text-xl tracking-tight text-[#212322]   '/>
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
        legalLinks={footer.legalLinks}
      />
    </>
  )
}
