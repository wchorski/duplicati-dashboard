'use client'
import { ReactNode } from 'react'
import styles from '@styles/list.module.scss'
  
type Props = {
  delay?:number;
  duration?:number,
  isAnimated?:boolean,
  children:ReactNode[]|ReactNode
}

export function List ({ isAnimated = false, delay = 0.2,  duration = 0.2, children }:Props) {

  if(!children) return <p> no children </p>

  const stylesArr = [styles.linklist]
  isAnimated ? stylesArr.push(styles.animated) : ''

  return (
    <ul className={stylesArr.join(' ')}>
      {Array.isArray(children) ? children.map((child, i) => (
        <li
          key={i}
          style={{
            animationDuration: duration + 's',
            animationDelay: i * delay + 's'
          }}
        >
          {child}
        </li>
      )) : (
        <li
          style={{
            animationDuration: duration + 's',
            animationDelay: 0.1 * delay + 's'
          }}
        >
          {children}
        </li>
      )}
    </ul>
  )
}