'use client'
import styles from '@styles/loading.module.scss'

type Props = {
  prop?:string
}

export function LoadingAnim ({ prop }:Props) {

  const dots = ['1', '2', '3']
  const duration = 1
  const delay = 0.3

  return (
    <div className={styles.loading}>
      <ul>
        {dots.map((dot, i) => (
          <li
            key={i}
            style={{
              animationDuration: duration + 's',
              animationDelay: i * delay + 's'
            }}
          >
            
          </li>
        ))}
      </ul>
    </div>
  )
}