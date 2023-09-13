import { ReactNode } from "react"
import styles from '@styles/card.module.scss'

type Props = {
  children:ReactNode
}

export function Card ({ children }:Props) {
  return (
    <div className={styles.card} >
      {children}
    </div>
  )
}