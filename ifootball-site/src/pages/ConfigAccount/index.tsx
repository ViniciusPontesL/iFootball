import { useEffect, useState } from 'react'
import { Redirect } from 'react-router-dom'
import { Button } from '../../components/common/button'
import { UsersRepository } from '../../repository/Users'

import styles from './styles.module.scss'

export default function ConfigAccount() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [cpf, setCpf] = useState('')
  const [password, setPassword] = useState('')
  
  const userId = localStorage.getItem('userId')
  const [changedData, setChangedData] = useState(false)

  useEffect(() => {
    const getCurrentUser = async () => {
      const user = new UsersRepository()
      const getUser = await user.getById(userId)

      setName(getUser.name)
      setEmail(getUser.email)
      setCpf(getUser.cpf)
      setPassword(getUser.password)
    }
    getCurrentUser()
  }, [userId])

  function updateUserdata() {
    const user = new UsersRepository()
    user.put({ name, email, cpf, password }, userId).then(userId => {
      setChangedData(userId ? true : false)
    });
    (window as any).location.href = '/'
  }

  function logout() {
    localStorage.clear();
    (window as any).location.href = '/'
  }

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <h2>Informações da sua conta</h2>
        <input
          value={name}
          className={styles.customInput}
          type='text'
          name='name'
          onChange={e => setName(e.target.value)}
          placeholder='Name'
        />
        <input
          value={email}
          className={styles.customInput}
          type='email'
          name='email'
          onChange={e => setEmail(e.target.value)}
          placeholder='Email'
        />
        <input
          value={cpf}
          className={styles.customInput}
          type='text'
          name='cpf'
          onChange={e => setCpf(e.target.value)}
          placeholder='CPF'
        />
        <input
          value={password}
          className={styles.customInput}
          type='password'
          name='password'
          onChange={e => setPassword(e.target.value)}
          placeholder='Nova password'
        />
        <br />
        <Button
          type='button'
          btnName='Salvar'
          onClick={updateUserdata}
        />
        <br />
        <Button
          type='button'
          className={styles.logoutbtn}
          btnName='Logout'
          onClick={logout}
        />
        {changedData && <Redirect to='/' />}
      </div>
    </div>
  )
}