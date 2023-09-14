import { ReactNode } from 'react'
import { MainContainer } from './MainContainer'
  
type Props = {
  children:ReactNode
}

export function PageMainAside ({ children }:Props) {
  return (
    <div>

      {children}

    </div>
  )
}