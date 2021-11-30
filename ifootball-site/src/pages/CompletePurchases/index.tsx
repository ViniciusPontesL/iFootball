import { useState } from 'react'
import { Button } from '../../components/common/button'
import { ProductsRepository } from '../../repository/Products'

import styles from './styles.module.scss'

export default function CompletePurchases() {
  const [endereco, setEndereco] = useState('')
  const [telefone, setTelefone] = useState('')

  function registerPurchases() {
    fetch('https://localhost:3003/purchases', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        endereco,
        telefone,
        userId: localStorage.getItem('userId'),
        selectedProductIds: localStorage.getItem('selectedProductIds'),
        selectedProductQtds: localStorage.getItem('selectedProductQtds')
      })
    });

    console.log({
      endereco,
      telefone,
      userId: localStorage.getItem('userId'),
      selectedProductIds: localStorage.getItem('selectedProductIds'),
      selectedProductQtds: localStorage.getItem('selectedProductQtds')
    })

    withdrawFromStock()
  }

  function withdrawFromStock() {
    const productsIds = localStorage.getItem('selectedProductIds')?.split(',')
    const selectedProductQtds = localStorage.getItem('selectedProductQtds')?.split(',')

    const repositoryProduct = new ProductsRepository()
  
    productsIds?.forEach(async (id, i) => {
      const product = await repositoryProduct.getById(id)
      const updatedProduct = { ...product }
      updatedProduct.quantidade = Number(product.quantidade) - Number(selectedProductQtds?.[i])
      delete updatedProduct.id

      repositoryProduct.put(updatedProduct, id)
    });

    (window as any).location.href = '/'
    localStorage.clear()
  }

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <h2>Informações da sua conta</h2>
        <input
          value={endereco}
          className={styles.customInput}
          type='text'
          name='name'
          onChange={e => setEndereco(e.target.value)}
          placeholder='Endereço'
          required
        />
        <input
          value={telefone}
          className={styles.customInput}
          type='text'
          name='email'
          onChange={e => setTelefone((e.target.value as string).replace(/(\d{2})(\d{5})(\d{4})/, "$1 $2-$3"))}
          maxLength={13}
          placeholder='Telefone'
          required
        />
        <br />
        <Button
          type='submit'
          btnName='Finalizar compra'
          onClick={() => {
            registerPurchases()
            localStorage.setItem('comprou', 'true');
          }}
        />
      </div>
    </div>
  )
}