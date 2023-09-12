import styles from '@styles/footer.module.scss'


export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className='siteWrapper'>
          <a
            href="https://www.tawtaw.site"
            target="_blank"
            rel="noopener noreferrer"
          > 
            powered by; 
            <span> {`There's a Will There's a Web.site`} </span>
          </a>
        </div>
    </footer>
  )
}
