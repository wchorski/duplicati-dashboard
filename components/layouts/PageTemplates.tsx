import { ReactNode } from 'react'
import { MainContainer } from './MainContainer'
import styles from '@styles/page.module.scss'
import { AsideBar } from './AsideBar'
  
type PageTHeaderMainAside = {
  // template:'header_main_aside'|'fullwidth',
  header:ReactNode,
  main:ReactNode,
  aside:ReactNode,
}

export function PageTHeaderMainAside ({ header, main, aside }:PageTHeaderMainAside) {


  return (
    <div className={[
      `page-wrapper`, 
      styles['page'],
      styles['header_main_aside'],
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
  // template:'header_main_aside'|'HeaderMain',
  header:ReactNode,
  main:ReactNode,
}
export function PageTHeaderMain ({ header, main }:PageTHeaderMain) {


  return (
    <div className={[
      `page-wrapper`, 
      styles['page'],
      styles['header_main'],
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
    <MainContainer>
      {main}
    </MainContainer>
  )
}