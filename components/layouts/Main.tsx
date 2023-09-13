import { ReactNode } from "react"

type Props = {
  columns?:number,
  children:ReactNode
}

export function Main ({ columns, children }:Props) {

  if(columns) return (
    <main 
      className={['sitegrid'].join(' ')}
      // style={{backgroundColor: bgColor, background: `url(${bgImg})`}}
    >
      <div className={`col-${columns}`}>
        {children}
      </div>
    </main>
  )

  return (
    <main 
      // className={['sitegrid'].join(' ')}
    >
      {children}
    </main>
  )
}