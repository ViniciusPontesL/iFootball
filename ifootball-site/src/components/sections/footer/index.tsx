import styles from './styles.module.scss'


export function Footer() {
  return (
    <footer id={styles.footer}>
     
        <div className={styles.copyright}>
          COPYRIGHT © 2021 iFootbal, Your football delivery store.<br/>
        </div>
    </footer>
  )
}