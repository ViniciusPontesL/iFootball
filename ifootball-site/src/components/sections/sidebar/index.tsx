import styles from './styles.module.scss'

import { AiOutlineLogin, AiOutlineMenu } from "react-icons/ai"
import { FiUserPlus, FiShoppingCart, FiCodesandbox } from 'react-icons/fi'
import { FaRegUserCircle } from 'react-icons/fa'
import { BiCoinStack } from 'react-icons/bi'

import { useEffect, useState } from "react"
import { Link } from 'react-router-dom';

export function Sidebar() {
  const [sidebarState, setsidebarState] = useState(false)
  const [userId, setUser] = useState<string | null>('')
  const isLogged = userId ? true : false

  useEffect(() => {
    const id = localStorage.getItem('userId')
    setUser(id)
  }, [])

  return (
    <div className={sidebarState ? styles.sidebarOpened : styles.sidebar}>
      <div className={styles.item} id={styles.burger} onClick={() => setsidebarState(!sidebarState)}>
        <AiOutlineMenu />
      </div>
      <Link to="/">
        <div className={styles.item}>
          <FiCodesandbox />
            <span>Produtos</span>
        </div>
      </Link>
      <Link to="/signup">
        <div className={styles.item}>
          {isLogged ? <BiCoinStack /> : <FiUserPlus />}
          <span>{isLogged ? 'Compras' : 'Cadastrar-se'}</span>
        </div>
      </Link>
      <Link to="/carrinho">
        <div className={styles.item}>
          <FiShoppingCart />
          <span>Carrinho</span>
        </div>
      </Link>

      <Link to={isLogged ? `/configaccount/${userId}` : '/login'}>
        <div className={styles.item} id={styles.userRegistration}>
          {isLogged ? <div className={styles.userProfile}>
            <FaRegUserCircle />
          </div>
          : <AiOutlineLogin />}
            <span>{isLogged ? 'Meu perfil' : 'Entrar'}</span>
        </div>
      </Link>
    </div>
  )
}