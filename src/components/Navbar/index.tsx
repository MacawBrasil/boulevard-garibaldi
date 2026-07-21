'use client'

import { Menu, X } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'

import { cn } from '@/lib/utils'

const navItems = [
  { href: '/', label: 'Home' },
  { href: '/lojas-e-servicos', label: 'Lojas e Serviços' },
  { href: '/gastronomia', label: 'Gastronomia' },
  { href: '/eventos', label: 'Eventos' },
  { href: '/como-chegar', label: 'Como chegar' },
]

type NavbarProps = {
  className?: string
  hasBackgroundImage?: boolean
  logoAlt?: string
  logoUrl?: string | null
}

export function Navbar({
  className,
  hasBackgroundImage = false,
  logoAlt = 'Boulevard Garibaldi',
  logoUrl,
}: NavbarProps) {
  const pathname = usePathname()
  const navRef = useRef<HTMLElement>(null)
  const mobileNavigationRef = useRef<HTMLDivElement>(null)
  const [isOpen, setIsOpen] = useState(false)
  const [hasScrolled, setHasScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setHasScrolled(window.scrollY > 8)
    }

    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  useEffect(() => {
    if (!isOpen) {
      return
    }

    const handlePointerDown = (event: PointerEvent) => {
      const target = event.target as Node

      if (navRef.current?.contains(target) || mobileNavigationRef.current?.contains(target)) {
        return
      }

      setIsOpen(false)
    }

    document.addEventListener('pointerdown', handlePointerDown)

    return () => {
      document.removeEventListener('pointerdown', handlePointerDown)
    }
  }, [isOpen])

  const shouldUseSolidBackground = !hasBackgroundImage || hasScrolled || isOpen

  return (
    <>
      <header
        className={cn('fixed left-0 top-0 z-50 w-full px-5 py-6 sm:px-8 lg:px-12', className)}
      >
        <nav
          ref={navRef}
          className={cn(
            'mx-auto flex layout-container items-center justify-between rounded-md px-5 py-4 text-white transition-colors duration-200 sm:px-8 lg:px-[50px]',
            shouldUseSolidBackground
              ? 'bg-[#151817] shadow-[0_10px_28px_rgba(0,0,0,0.2)]'
              : 'bg-transparent',
          )}
          aria-label="Principal"
        >
          <Link href="/" className="shrink-0" aria-label={logoAlt}>
            {logoUrl ? (
              <Image
                src={logoUrl}
                alt={logoAlt}
                width={237}
                height={72}
                priority
                unoptimized
                className="h-auto w-[134px] sm:w-[152px]"
              />
            ) : (
              <span className="block max-w-36 text-base font-extrabold leading-tight text-white">
                {logoAlt}
              </span>
            )}
          </Link>

          <div className="hidden items-center gap-8 md:flex">
            {navItems.map((item) => {
              const isActive = pathname === item.href

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    'text-[13px] font-bold leading-none text-white/90 transition hover:text-white',
                    isActive && 'text-white',
                  )}
                >
                  {item.label}
                </Link>
              )
            })}
          </div>

          <button
            type="button"
            className="inline-flex size-10 items-center justify-center rounded-md text-white transition hover:bg-white/10 md:hidden"
            aria-label={isOpen ? 'Fechar menu' : 'Abrir menu'}
            aria-expanded={isOpen}
            aria-controls="mobile-navigation"
            onClick={() => setIsOpen((current) => !current)}
          >
            {isOpen ? <X size={22} aria-hidden="true" /> : <Menu size={22} aria-hidden="true" />}
          </button>
        </nav>

        <div
          ref={mobileNavigationRef}
          id="mobile-navigation"
          className={cn(
            'mx-auto grid max-w-[1080px] overflow-hidden px-5 transition-[grid-template-rows,opacity] duration-200 md:hidden',
            isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0',
          )}
        >
          <div className="min-h-0">
            <div className="mt-2 rounded-md bg-[#151817] p-2 shadow-[0_10px_28px_rgba(0,0,0,0.2)]">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="block rounded-sm px-4 py-3 text-sm font-bold text-white/90 transition hover:bg-white/10 hover:text-white"
                  onClick={() => setIsOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </header>

      {!hasBackgroundImage ? <div className="h-[121px] sm:h-[126px]" aria-hidden="true" /> : null}
    </>
  )
}
