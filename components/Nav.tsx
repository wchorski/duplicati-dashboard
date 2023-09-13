import styles from '@styles/nav.module.scss'
import Link from 'next/link'
import { SiGithub } from 'react-icons/si'
import { NavLink } from './NavLink'

export function Nav() {
  return (
    <nav 
      className={styles.nav}
    >

      <div className="siteWrapper">
        <ul className='main'>
          <li> <NavLink href={`/`}> Home </NavLink> </li>
          <li> <NavLink href={`/backups`}> Logs </NavLink> </li>
          {/* <li> <Link href={`https://github.com/wchorski/duplicati-dashboard`}> API </Link> </li> */}
          {/* <li> <Link href={`/`}> Settings </Link> </li> */}
        </ul>

        <ul className='links utility'>
          <li>
            <Link
              href="https://github.com/wchorski/duplicati-dashboard"
              target="_blank"
              rel="noopener noreferrer"
            >
              <SiGithub />
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  )
}
