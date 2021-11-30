import { useEffect, useState } from 'react'
import { IProduct } from '../../global/interfaces'
import { ProductsRepository } from '../../repository/Products'
import styles from './styles.module.scss'
import { Button } from '../../components/common/button'
import { Link } from 'react-router-dom'

export default function Carrinho() {
  const [selectedProducts, setSelectedProducts] = useState<IProduct[]>()
  const [productsId] = useState<string[] | undefined>(localStorage.getItem('selectedProductIds')?.split(','))

  useEffect(() => {
    async function getProduct() {
      const productsRepository = new ProductsRepository()
      const products = await productsRepository.getAll()

      console.log(productsId)

      const selectedProducts = productsId?.map(id => {
        const [product] = products.filter(product => product._id === id)
        return product
      })

      setSelectedProducts(selectedProducts)
    }

    getProduct()
  }, [productsId])

  return (
    <div className={styles.container}>
      {productsId?.[0] ? <div className={styles.tableContainer}>
        <table>
          <thead>
            <tr>
              <th></th>
              <th>Produto</th>
              <th>Preço</th>
            </tr>
          </thead>
          <tbody>
            {selectedProducts?.map(product => (
              <tr key={product._id}>
                <td className={styles.tableimg}><img className={styles.productimg} src={product.image} alt=""></img></td>
                <td>{product.title}</td>
                <td>R$ {product.price},00</td>
              </tr>
            ))}
          </tbody>
        </table>
        <Link to={localStorage.getItem('userId') ? '/carrinho/finalizar-compra' : '/login'}>
          <Button type='button' btnName='Confirmar compra' />
        </Link>
      </div> : <h1>Nenhum produto adicionado ao carrinho</h1>}
    </div>
  )
}