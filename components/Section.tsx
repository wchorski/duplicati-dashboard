import { ReactNode } from "react"

type Props = {
  pad?:number,
  children:ReactNode
}

export function Section({pad = 1, children}:Props) {
  return (
    <section>
      <div className="siteWrapper" style={{paddingInline: pad + 'rem'}}>
        {children}
      </div>
    </section>
  )
}
