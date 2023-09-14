import { ReactNode } from 'react'
import { MainContainer } from './MainContainer'
import styles from '@styles/page.module.scss'
import { AsideBar } from './AsideBar'
  
type PageTHeaderMainAside = {
  // template:'header-main-aside'|'fullwidth',
  header:ReactNode,
  main:ReactNode,
  aside:ReactNode,
}

export function PageTHeaderMainAside ({ header, main, aside }:PageTHeaderMainAside) {


  return (
    <div className={[
      `page-wrapper`, 
      styles['page--header-main-aside'],
    ].join(' ')} >

      <header>
        {header}
      </header>

      <MainContainer>
        {main}
      </MainContainer>

      <AsideBar>
        {aside}
      </AsideBar>
    </div>
  )
}


type PageTHeaderMain = {
  // template:'header-main-aside'|'HeaderMain',
  header:ReactNode,
  main:ReactNode,
}
export function PageTHeaderMain ({ header, main }:PageTHeaderMain) {


  return (
    <div className={[
      `page-wrapper`, 
      styles['page--header-main'],
    ].join(' ')} >

      <header>
        {header}
      </header>

      <MainContainer>
        {main}
      </MainContainer>

    </div>
  )
}

type PageTMain = {
  main:ReactNode,
}
export function PageTMain ({ main }:PageTMain) {


  return (
    <div className={[
      `page-wrapper`, 
      styles['page--header-main'],
    ].join(' ')} >

      <MainContainer>
        {main}
      </MainContainer>

    </div>
  )
}