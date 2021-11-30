import styles from './styles.module.scss'
import InputSearch from '../../common/inputSearch'

export function Header() {
  const path = window.location.pathname

  return (
    <header id={styles.header}>
      <div id={styles.logo}>
        <img src='https://i.ibb.co/jVKjhq9/logo192.png' alt=''></img>
      </div>
      {path === '/' && <InputSearch />}
    </header>
  )
}