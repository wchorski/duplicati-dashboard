import { ReactNode } from 'react'
  
type Props = {
  children:ReactNode
}

export function AsideBar ({ children }:Props) {
  return (
    <aside>
      {children}
    </aside>
  )
}