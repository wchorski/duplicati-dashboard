import './globals.scss'
import type { Metadata } from 'next'
import { Inter, Barlow } from 'next/font/google'
import layoutStyles from '@styles/layout.module.scss'

import { Nav } from '@/components/Nav'
import { envars } from '@/lib/envars'
import Footer from '@/components/Footer'

const header = Inter({ subsets: ['latin'], variable: '--font-header' })
const paragraph = Barlow({ weight: '200', subsets: ['latin'], variable: '--font-paragraph' })

export const metadata: Metadata = {
  title: 'Duplicati-Dashboard',
  description: "Monitor and query all your duplicati clients in one location",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={[header.variable, paragraph.variable,].join(' ')}>

        <Nav />

        <main className={[layoutStyles.main].join(' ')}>
          {children}
        </main>

        <Footer />
        
      </body>
    </html>
  )
}
