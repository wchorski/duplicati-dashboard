import { ReactNode } from "react"
import styles from "@styles/page.module.scss";

type Props = {
  pad?:number,
  bgColor?:string,
  bgImg?:string,
  col?:number,
  children:ReactNode
}

export function Section({
  pad = 1, 
  bgColor = 'transparent', 
  bgImg = '', 
  col,
  children}:Props
) {

  const styleArr = [styles.section, styles.sectiongrid]

  if(col) return (
    <section 
      className={styleArr.join(' ')} 
      // style={{backgroundColor: bgColor, background: `url(${bgImg})`}}
    >
      <div className={styles[`col-${col}`]}>
        {children}
      </div>
    </section>
  )

  return (
    <section 
      className={styleArr.join(' ')} 
      style={{backgroundColor: bgColor, background: `url(${bgImg})`}}
    >
      {/* <div className="siteWrapper" style={{paddingInline: pad + 'rem'}}> */}
        {children}
      {/* </div> */}
    </section>
  )
}
