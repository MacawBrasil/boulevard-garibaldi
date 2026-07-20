import React from 'react'
import { Work_Sans } from 'next/font/google'

import './styles.css'

const workSans = Work_Sans({
  display: 'swap',
  subsets: ['latin'],
  variable: '--font-sans',
})

export const metadata = {
  description: 'A blank template using Payload in a Next.js app.',
  title: 'Payload Blank Template',
}

export default async function RootLayout(props: { children: React.ReactNode }) {
  const { children } = props

  return (
    <html lang="en" className="bg-[#F4F4F4]">
      <body className={`${workSans.variable} ${workSans.className}`}>
        <main>{children}</main>
      </body>
    </html>
  )
}
