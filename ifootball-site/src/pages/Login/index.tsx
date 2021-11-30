import { Button } from '../../components/common/button'
import { Input } from '../../components/common/input'
import { Range } from '../../components/common/range'

import styles from './styles.module.scss'

import { Link } from 'react-router-dom'
import React, { useEffect, useState } from 'react'
import { useForm } from "react-hook-form"
import { Form } from '@unform/web'
import { ILogin } from '../../global/interfaces'
import { Message } from '../../components/common/message'
import { UsersRepository } from '../../repository/Users'

const Login: React.FC = () => {
  const { register, handleSubmit } = useForm()
  const [invalidUser, setInvalidUser] = useState(false)

  useEffect(() => {
    if (localStorage.getItem('userId')) {
      (window as any).location.href = '/';
    }
  }, [])

  const onSubmit = async (data: ILogin) => {
    const user = new UsersRepository()
    const [isValid] = await user.verifyLogin(data.email, data.password)

    console.log(isValid)

    setInvalidUser(isValid ? false : true)

    isValid && localStorage.setItem('userId', isValid._id?.toString());

    const redirect = data.email === 'admin@admin.com' ? '/admin' : '/';

    if (isValid) {
      (window as any).location.href = redirect
    }
  }

  return (
    <>
      <div id={styles.loginContainer}>
        <div id={styles.logoContainer}>
          <span>M</span>
        </div>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Input
            type="email"
            name="email"
            register={register("email")}
            placeholder="Email"
            required
          />
          <Input
            type="password"
            name="password"
            register={register("password")}
            placeholder="Senha"
            required
          />

          <Link to="/signup">Cadastrar-se</Link>
          <Button type="submit" btnName="Entrar"/>
          
          {invalidUser && <Message type='error'>Usuário invalido</Message>}
        </Form>
      </div>
      <Range />
    </>
  )
}

export default Login