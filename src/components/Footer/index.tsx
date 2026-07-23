import Image from 'next/image'
import Link from 'next/link'

import { Macaw } from '@/components/Macaw'
import { normalizePhoneHref } from '@/lib/utils'
import type { Media } from '@/payload-types'

type OpeningHourItem = {
  id?: string | null
  title: string
  description: string
}

type ContactItem = {
  id?: string | null
  name: string
  phone: string
  email: string
}

type SocialLink = {
  id?: string | null
  title?: string | null
  icon?: string | Media | null
  url: string
}

type LegalDocumentItem = {
  id?: string | null
  title: string
  file: string | Media
}

type FooterProps = {
  logoUrl: string | null
  logoAlt: string
  address: string
  openingHoursTitle: string
  openingHours: OpeningHourItem[] | null | undefined
  contactsTitle: string
  contacts: ContactItem[] | null | undefined
  socialTitle: string
  socialLinks: SocialLink[] | null | undefined
  legalDocuments: LegalDocumentItem[] | null | undefined
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

function getMediaURL(media: Media | string) {
  if (typeof media === 'string') {
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

export function Footer({
  logoUrl,
  logoAlt,
  address,
  openingHoursTitle,
  openingHours,
  contactsTitle,
  contacts,
  socialTitle,
  socialLinks,
  legalDocuments,
}: FooterProps) {
  return (
    <footer className="bg-[#212322] text-white">
      <div className="relative overflow-hidden">
        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(100deg,#212322_17%,rgba(33,35,34,0)_75%)]" />

        <div className="layout-container relative flex min-h-[462px] flex-col py-14 lg:pb-14 lg:pt-[71px]">
          <div className="grid gap-10 lg:grid-cols-[237px_237px_237px_237px] lg:gap-[148px]">
            <div>
              {logoUrl ? (
                <Link href="/" aria-label="Ir para a página inicial" className="inline-block">
                  <Image
                    src={logoUrl}
                    alt={logoAlt}
                    width={237}
                    height={72}
                    unoptimized
                    className="h-auto w-[190px] object-contain sm:w-[237px]"
                  />
                </Link>
              ) : null}

              <address className="mt-7 text-[1.125rem] not-italic leading-[1.18] text-white">
                <TextLines text={address} />
              </address>
            </div>

            <div>
              <h2 className="text-[1.25rem] font-bold leading-none text-white">{openingHoursTitle}</h2>

              <div className="mt-7 space-y-9">
                {openingHours?.map((item) => (
                  <div key={item.id || item.title}>
                    <h3 className="text-[1.25rem] font-bold leading-none text-white">{item.title}</h3>
                    <p className="mt-3 text-[1.125rem] font-normal leading-[1.18] text-white">
                      <TextLines text={item.description} />
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h2 className="text-[1.25rem] font-bold leading-none text-white">{contactsTitle}</h2>

              <div className="mt-7 space-y-9">
                {contacts?.map((item) => {
                  const phoneHref = normalizePhoneHref(item.phone)

                  return (
                    <div key={item.id || item.email}>
                      <h3 className="text-[1.25rem] font-bold leading-none text-white">{item.name}</h3>
                      <div className="mt-3 text-[1.125rem] font-normal leading-[1.18] text-white">
                        {phoneHref ? (
                          <a className="block transition hover:opacity-75" href={phoneHref}>
                            {item.phone}
                          </a>
                        ) : (
                          <p>{item.phone}</p>
                        )}
                        <a
                          className="block transition hover:opacity-75"
                          href={`mailto:${item.email}`}
                        >
                          {item.email}
                        </a>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>

            <div>
              <h2 className="text-[1.25rem] font-bold leading-none text-white">{socialTitle}</h2>

              <div className="mt-4 flex items-center gap-2">
                {socialLinks?.map((link) => {
                  const iconUrl = link.icon ? getMediaURL(link.icon) : null

                  if (!iconUrl) {
                    return null
                  }

                  return (
                    <Link
                      key={link.id || link.url}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex size-[30px] items-center justify-center"
                      aria-label={link.title || 'Rede social'}
                    >
                      <Image
                        src={iconUrl}
                        alt=""
                        width={30}
                        height={30}
                        unoptimized
                        className="size-[30px] object-contain"
                      />
                    </Link>
                  )
                })}
              </div>

              {legalDocuments?.length ? (
                <nav
                  aria-label="Links legais"
                  className="mt-8 flex flex-col items-start gap-[17px]"
                >
                  {legalDocuments.map((document) => {
                    const fileUrl = getMediaURL(document.file)

                    if (!fileUrl) {
                      return null
                    }

                    return (
                      <Link
                        key={document.id || fileUrl}
                        href={fileUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[1rem] font-normal leading-none text-white transition hover:opacity-75"
                      >
                        {document.title}
                      </Link>
                    )
                  })}
                </nav>
              ) : null}
            </div>
          </div>

          <div className="mt-12 flex flex-col gap-8 text-[1rem] font-normal leading-none text-white lg:mt-auto lg:flex-row lg:items-end lg:justify-between">
            <p>BOULEVARD GARIBALDI - TODOS OS DIREITOS RESERVADOS</p>
            <Macaw className="footer-macaw-offset w-[108px]" />
          </div>
        </div>
      </div>
    </footer>
  )
}
