import React from 'react'
import { Work_Sans } from 'next/font/google'
import type { Metadata } from 'next'

import './styles.css'
import { getSiteURL } from '@/lib/seo'

const workSans = Work_Sans({
  display: 'swap',
  subsets: ['latin'],
  variable: '--font-sans',
})

export const metadata: Metadata = {
  description: 'Boulevard Garibaldi',
  metadataBase: new URL(getSiteURL()),
  title: 'Boulevard Garibaldi',
}

export default async function RootLayout(props: { children: React.ReactNode }) {
  const { children } = props

  return (
    <html lang="pt-BR" className="bg-[#F4F4F4]">
      <body className={`${workSans.variable} ${workSans.className}`}>
        <main>{children}</main>
      </body>
    </html>
  )
}
