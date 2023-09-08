import './globals.scss'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import layoutStyles from '@styles/layout.module.scss'
import { Nav } from '@/components/Nav'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={[inter.className, layoutStyles.wide].join(' ')}>

        <Nav />

        <main className={[layoutStyles.wrapper, 'siteWrapper'].join(' ')}>
          {children}
        </main>
        
      </body>
    </html>
  )
}
