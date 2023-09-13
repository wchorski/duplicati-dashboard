import './globals.scss'
import type { Metadata } from 'next'
import { Inter, Barlow } from 'next/font/google'
import layoutStyles from '@styles/layout.module.scss'

import { Nav } from '@/components/Nav'
import { envars } from '@/lib/envars'
import Footer from '@components/Footer'
import { Main } from '@components/layouts/Main'
import LayoutExample from '@/components/LayoutExample'
import { Card } from '@/components/layouts/Card'
import { AsideBar } from '@/components/layouts/AsideBar'

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
      <body className={[
        header.variable, 
        paragraph.variable, 
        'layout--fullwidth',
        // 'layout--main-aside',
      ].join(' ')}>

        <Nav />

        {/* <Main> */}
      
        {children}

    
        {/* </Main> */}

        {/* <AsideBar>
          <Card> 
            <h3> one </h3>
            <p> Lorem, ipsum dolor sit amet consectetur adipisicing elit. Laborum deleniti perferendis nesciunt suscipit inventore id, eos, est debitis cum fugit dolores aliquid, magnam ad veritatis quidem quia expedita! Provident, quas.</p>
          </Card>
          <Card> 
            <h3> one </h3>
            <p> Lorem, ipsum dolor sit amet consectetur adipisicing elit. Laborum deleniti perferendis nesciunt suscipit inventore id, eos, est debitis cum fugit dolores aliquid, magnam ad veritatis quidem quia expedita! Provident, quas.</p>
          </Card>
          <Card> 
            <h3> one </h3>
            <p> Lorem, ipsum dolor sit amet consectetur adipisicing elit. Laborum deleniti perferendis nesciunt suscipit inventore id, eos, est debitis cum fugit dolores aliquid, magnam ad veritatis quidem quia expedita! Provident, quas.</p>
          </Card>
        </AsideBar> */}



        <Footer />
        
      </body>
    </html>
  )
}
