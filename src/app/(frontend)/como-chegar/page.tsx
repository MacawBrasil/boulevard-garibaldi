import Link from 'next/link'
import { getPayload } from 'payload'

import { ContactFormSection } from '@/components/ContactFormSection'
import { Footer } from '@/components/Footer'
import { InternalPageBackground } from '@/components/InternalPageBackground'
import { Navbar } from '@/components/Navbar'
import configPromise from '@payload-config'

import type { Media } from '@/payload-types'

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

function getMapsEmbedUrl(mapUrl: string, fallbackAddress: string) {
  try {
    const url = new URL(mapUrl)
    const hostname = url.hostname.replace(/^www\./, '')

    if (url.pathname.includes('/embed')) {
      return mapUrl
    }

    if (
      (hostname === 'google.com' || hostname.endsWith('.google.com')) &&
      url.pathname.startsWith('/maps')
    ) {
      url.searchParams.set('output', 'embed')

      return url.toString()
    }
  } catch {
    const query = mapUrl || fallbackAddress

    return `https://www.google.com/maps?q=${encodeURIComponent(query)}&output=embed`
  }

  return `https://www.google.com/maps?q=${encodeURIComponent(fallbackAddress)}&output=embed`
}

function TextLines({ text }: { text: string }) {
  return (
    <>
      {text.split('\n').map((line, index) => (
        <span key={`${line}-${index}`} className="block">
          {line}
        </span>
      ))}
    </>
  )
}

function FloatingWhatsapp({ phone, message }: { phone: string; message?: string | null }) {
  return (
    <Link
      href={getWhatsappUrl(phone, message)}
      target="_blank"
      rel="noopener noreferrer"
      className="absolute bottom-[26px] right-5 z-20 inline-flex items-center justify-center rounded-full bg-white shadow-[0_8px_22px_rgba(0,0,0,0.28)] transition hover:scale-105 lg:right-12"
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

export default async function ContactPage() {
  const payload = await getPayload({ config: configPromise })
  const [contact, footer, generalSettings] = await Promise.all([
    payload.findGlobal({ slug: 'contact', depth: 1 }),
    payload.findGlobal({ slug: 'footer', depth: 1 }),
    payload.findGlobal({ slug: 'general-settings', depth: 1 }),
  ])

  const logo = typeof footer.brand?.logo === 'string' ? null : footer.brand?.logo
  const logoUrl = getMediaURL(logo)
  const logoAlt = logo?.alt || 'Boulevard Garibaldi'
  const mapEmbedUrl = getMapsEmbedUrl(contact.arrival.mapUrl, footer.brand.address)
  const formBackground =
    typeof contact.contactForm.backgroundImage === 'string'
      ? null
      : contact.contactForm.backgroundImage
  const formBackgroundUrl = getMediaURL(formBackground)
  const contacts = footer.contacts.items?.slice(0, 2) || []

  return (
    <>
      <Navbar logoAlt={logoAlt} logoUrl={logoUrl} />

      <main className="relative overflow-hidden bg-[#f4f4f4] text-[#212322]">
        <section className="relative overflow-hidden pb-16 pt-6 lg:pb-11">
          <InternalPageBackground />

          <div className="layout-container relative">
            <nav className="flex items-center gap-1 text-sm uppercase leading-none text-[#212322]">
              <Link href="/" className="font-normal transition hover:opacity-75">
                Home
              </Link>
              <span>|</span>
              <span className="font-bold">{contact.arrival.breadcrumbLabel}</span>
            </nav>

            <div className="mt-8 lg:ml-32">
              <h1 className="text-[clamp(3.75rem,7vw,4.625rem)] font-bold leading-normal tracking-normal">
                {contact.arrival.title}
              </h1>
              <p className="max-w-[1264px] text-[clamp(1.25rem,2.4vw,1.75rem)] font-normal leading-normal">
                {contact.arrival.description}
              </p>
            </div>

            <div className="mt-14 grid items-start gap-10 lg:ml-32 lg:grid-cols-[450px_minmax(0,749px)] lg:gap-16 xl:gap-[64px]">
              <div className="space-y-10">
                <section>
                  <h2 className="text-[clamp(2rem,4vw,2.375rem)] font-bold leading-[1.1]">
                    Endereço
                  </h2>
                  <address className="mt-5 text-[clamp(1.25rem,2.5vw,1.625rem)] not-italic leading-normal">
                    <TextLines text={footer.brand.address} />
                  </address>
                </section>

                {contacts.length ? (
                  <section>
                    <h2 className="text-[clamp(2rem,4vw,2.375rem)] font-bold leading-[1.1]">
                      {footer.contacts.title}
                    </h2>
                    <div className="mt-5 space-y-8">
                      {contacts.map((item) => {
                        const phoneHref = normalizePhoneHref(item.phone)

                        return (
                          <div key={item.id || item.email}>
                            <h3 className="text-[clamp(1.5rem,3vw,1.75rem)] font-bold leading-none text-[#874230]">
                              {item.name}
                            </h3>
                            <div className="mt-4 text-[clamp(1.375rem,3vw,1.75rem)] font-normal leading-[1.41]">
                              {phoneHref ? (
                                <a
                                  className="block transition hover:text-[#874230]"
                                  href={phoneHref}
                                >
                                  {item.phone}
                                </a>
                              ) : (
                                <p>{item.phone}</p>
                              )}
                              <a
                                className="block italic transition hover:text-[#874230]"
                                href={`mailto:${item.email}`}
                              >
                                {item.email}
                              </a>
                            </div>
                          </div>
                        )
                      })}
                    </div>
                  </section>
                ) : null}
              </div>

              <div className="relative">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="567"
                  height="795"
                  viewBox="0 0 567 795"
                  fill="none"
                  className="pointer-events-none absolute -right-[310px] -top-[38px] z-0 hidden h-[795px] w-[567px] lg:block"
                  aria-hidden="true"
                >
                  <path
                    d="M627.264 37.6218C564.095 -59.1867 132.271 55.263 42.7508 108.078C14.6455 123.922 32.2318 160.892 51.5165 190.838C70.8013 220.785 86.6344 257.755 142.79 210.222C160.486 195.249 208.753 167.644 266.936 138.95C211.93 243.599 34.5876 581.23 9.44081 634.644C-11.5971 680.435 5.9345 703.303 28.7255 720.944C52.941 738.313 70.363 765.809 94.3593 729.492C111.288 763.685 153.912 818.188 246.336 784.321C676.407 625.823 583.325 470.864 571.053 416.253C558.781 359.899 528.923 340.516 353.388 384.564C353.388 384.564 446.415 358.157 560.534 273.599C674.654 189.042 690.432 134.485 627.209 37.6218H627.264ZM448.223 495.529C342.321 584.334 208.807 661.704 137.531 654.082C168.868 597.728 212.423 518.18 253.568 442.279C408.229 400.79 573.409 392.187 448.223 495.475V495.529ZM340.897 279.371C351.635 258.953 360.236 242.401 365.715 231.348C406.092 150.329 385 130.946 349.936 102.796C349.279 102.306 348.731 101.87 348.074 101.38C457.043 54.0107 568.697 18.7284 576.367 55.263C588.804 114.448 480.327 209.46 340.897 279.371Z"
                    fill="white"
                    fillOpacity="0.74"
                  />
                </svg>

                <div className="relative z-10 aspect-[749/670] min-h-[360px] overflow-hidden bg-white shadow-[-21px_18px_23px_rgba(0,0,0,0.25)]">
                  <iframe
                    src={mapEmbedUrl}
                    title="Mapa com localização do Boulevard Garibaldi"
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    className="absolute inset-0 size-full border-0"
                    allowFullScreen
                  />
                  <Link
                    href={contact.arrival.mapUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="absolute bottom-4 right-4 rounded-full bg-white px-4 py-2 text-sm font-bold text-[#212322] shadow-[0_8px_20px_rgba(0,0,0,0.18)] transition hover:bg-[#874230] hover:text-white"
                  >
                    Abrir no Maps
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        <ContactFormSection
          title={contact.contactForm.title}
          description={contact.contactForm.description}
          backgroundImageUrl={formBackgroundUrl}
          backgroundImageAlt={formBackground?.alt || ''}
        />

        {generalSettings.whatsapp.enabled ? (
          <FloatingWhatsapp
            phone={generalSettings.whatsapp.phone}
            message={generalSettings.whatsapp.message}
          />
        ) : null}
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
        legalLinks={footer.legalLinks}
      />
    </>
  )
}
