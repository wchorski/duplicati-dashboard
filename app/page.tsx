import Image from 'next/image'
import styles from '@styles/pagevercel.module.scss'
import { Section } from '@/components/Section'
import LayoutExample from '@/components/LayoutExample'
import { MainContainer } from '@components/layouts/MainContainer'
import { PageTMain } from '@components/layouts/PageTemplates'

export default function Home() {
  return (

    <PageTMain 
      main={Main()}
    />

  )
}

function Main(){

  return <>
    <Section col={1}>
      <div 
        className={styles.center}
      >
        <Image src={`/assets/logo.png`} width={200} height={200} alt='site logo'/>
        <h1 className='siteTitle'> Duplicati-Dashboard </h1>
        <p> Monitor and query all your duplicati clients in one location </p>
      </div>
    </Section>

    <Section col={3} bgColor='var(--c-primary)'>
      <a
        href="https://github.com/wchorski/duplicati-dashboard"
        className={styles.card}
        target="_blank"
        rel="noopener noreferrer"
      >
        <h2>
          Setup <span>-&gt;</span>
        </h2>
        <p>Learn how to point duplicati clients to this app for persistant data</p>
      </a>

      <a
        href="backups"
        className={styles.card}
        rel="noopener noreferrer"
      >
        <h2>
          View Logs <span>-&gt;</span>
        </h2>
        <p>After you setup this app, view all logs saved to the database</p>
      </a>

      <a
        href="https://github.com/wchorski/duplicati-dashboard"
        className={styles.card}
        target="_blank"
        rel="noopener noreferrer"
      >
        <h2>
          API <span>-&gt;</span>
        </h2>
        <p> Learn how to manipulate the URL string to fetch filtered data </p>
      </a>
    </Section>
  </>
}
