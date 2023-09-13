'use client'
import Link from "next/link"
import { useSelectedLayoutSegment } from "next/navigation"
import { ReactNode } from "react"
import styles from '@styles/nav.module.scss'

type Props = {
  href:string,
  children:ReactNode
}

export function NavLink ({ href, children }:Props) {

  let segment = useSelectedLayoutSegment()
  console.log(segment);
  
  let isActive = href === `/${segment}`

  return (
    <Link 
      href={href}
      className={isActive ? styles.active : ''}
    >
      {children}
    </Link>
  )
}