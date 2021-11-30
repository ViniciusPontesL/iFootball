import { useState } from 'react'
import { formatCpf } from '../../../global/formatters'
import styles from './styles.module.scss'

interface PropsInput {
  type: string
  name: string
  register?: object
  placeholder: string
  maxLength?: number
  required?: boolean
  mask?: boolean
}

export function Input(props: PropsInput) {
  const [data, setData] = useState('')

  const formatData = (event: React.ChangeEvent<HTMLInputElement>) => {
     (props.name === 'cpf') && setData(formatCpf(event.target.value))
  }

  return (
    <>
      <input
        type={props.type}
        {...props.register}
        placeholder={props.placeholder}
        maxLength={props.maxLength}
        className={styles.customInput}
        value={props.mask ? data : undefined}
        required={props.required}
        onChange={props.mask ? formatData : undefined}
      />
    </>
  )
}