import './global.css'
import type { Metadata } from 'next'
import { GeistSans } from 'geist/font/sans'
import { GeistMono } from 'geist/font/mono'
import { Navbar } from './components/nav'
import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from '@vercel/speed-insights/next'
import Footer from './components/footer'
import { baseUrl } from './sitemap'
import { useEffect } from 'react'
import { supabase } from './components/CommentSection'

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    default: 'Udeet Mittal | udeet.in',
    template: '%s | Udeet Mittal Portfolio',
  },
  description: 'Udeet Mittal Portfolio, personal site',
  icons:{
    icon: 'favicon-arc.jpg',
  },
  openGraph: {
    title: 'Udeet Mittal Portfolio',
    description: 'udeet.in',
    url: baseUrl,
    siteName: 'Udeet\'s Portfolio',
    locale: 'en_US',
    type: 'website',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
}

const cx = (...classes) => classes.filter(Boolean).join(' ')

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html
      lang="en"
      className={cx(
        'text-[#070707] bg-[#FFFAF1] dark:text-[#FFFAF1] dark:bg-[#070707]',
        GeistSans.variable,
        GeistMono.variable
      )}
    >
      <body className="antialiased max-w-xl mx-4 mt-8 lg:mx-auto">
        <main className="flex-auto min-w-0 mt-6 flex flex-col px-2 md:px-0">
          <Navbar />
          {children}
          <Analytics />
          <SpeedInsights />
        </main>
      </body>
    </html>
  )
}
