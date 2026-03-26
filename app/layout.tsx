import type { Metadata } from 'next'
import { Playfair_Display, Lora, Special_Elite } from 'next/font/google'
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
  title: 'Ruang Cerita — Blog Pribadi',
  description: 'Catatan dari balik lensa — pribadi, jujur, apa adanya.',
  generator: 'v0.app',
  themeColor: '#3B0A0A',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="id" className="dark">
      <body
        className={`${playfair.variable} ${lora.variable} ${specialElite.variable} font-sans antialiased`}
      >
        {children}
      </body>
    </html>
  )
}
