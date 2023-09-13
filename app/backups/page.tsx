import { ReactNode } from "react"

type Props = {
  children:ReactNode
}

export default function BackupsPage ({ children }:Props) {
  return (<>
      {children}
  </>)
}