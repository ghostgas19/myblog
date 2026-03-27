import type { Metadata } from 'next'
import { Playfair_Display, Lora, Special_Elite } from 'next/font/google'
import { Analytics } from '@vercel/analytics/react'
import { Toaster } from '@/components/ui/sonner'
import './globals.css'

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap',
})
const lora = Lora({
  subsets: ['latin'],
  variable: '--font-lora',
  display: 'swap',
})
const specialElite = Special_Elite({
  subsets: ['latin'],
  weight: '400',
  variable: '--font-special-elite',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Movies For Two — Personal Blog',
  description: 'Personal Blog by Ghostgas',
  generator: 'v0.app',
  themeColor: '#3B0A0A',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${playfair.variable} ${lora.variable} ${specialElite.variable} font-sans antialiased`}
      >
        {children}
        <Toaster richColors position="bottom-right" />
        <Analytics />
      </body>
    </html>
  )
}
