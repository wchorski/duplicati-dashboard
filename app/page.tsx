import Image from 'next/image'
import styles from '@/styles/page.module.scss'
import { SiGithub } from "react-icons/si";
import { FaMagnifyingGlassChart } from "react-icons/fa6";
import { MdMonitorHeart } from "react-icons/md";

export default function Home() {
  return (
    <main className={styles.main}>

      <div className={styles.center}>
        <h2 className='siteTitle'> Duplicati-Dashboard <MdMonitorHeart /> </h2>
        <p> Monitor and query all your duplicati clients in one location </p>
      </div>

      <div className={styles.grid}>
        <a
          href="https://github.com/wchorski/duplicati-dashboard"
          className={styles.card}
          target="_blank"
          rel="noopener noreferrer"
        >
          <h2>
            Setup <span>-&gt;</span>
          </h2>
          <p>Learn how to point duplicati clients to this app to star saving data</p>
        </a>

        <a
          href="backups"
          className={styles.card}
          rel="noopener noreferrer"
        >
          <h2>
            View Logs <span>-&gt;</span>
          </h2>
          <p>After you have pointed the duplicati clients to this app, view all logs saved to the database</p>
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

      </div>

      <div className={styles.description}>
        <div>
          <a
            href="https://www.tawtaw.site"
            target="_blank"
            rel="noopener noreferrer"
          > 
            powered by; 
            <span> {`There's a Will There's a Web.site`} </span>
          </a>
        </div>
      </div>
    </main>
  )
}
