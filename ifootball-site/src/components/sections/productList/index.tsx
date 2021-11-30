import styles from './styles.module.scss'

import { useEffect, useContext } from 'react'
import { ProductsContext } from '../../../providers/products'
import { Spinner } from '../../common/spinner'
import { Card } from '../../common/card'
import { SearchContext } from '../../../providers/saerch'
import { IProduct } from '../../../global/interfaces'

export function ProductList() {
  useEffect(() => {
    if (Boolean(localStorage.getItem('comprou'))) {
      localStorage.removeItem('selectedProductQtds')
      localStorage.removeItem('selectedProductIds')
    }
  }, [])

  const { products, isLoaded } = useContext(ProductsContext)
  const { search } = useContext(SearchContext)
  
  const getContainerHeight = !isLoaded ? {height: '80vh'} : {}

  const searchedProducts = (
    products?.filter((product: IProduct) => {
      const researched = product.title.toLowerCase().includes(search)
      return researched && product
    })
  )
  
  return (
    <>
      <h1 id={styles.advertising}>
        {searchedProducts.length === products.length
          ? 'Confira os nossos produtos'
          : searchedProducts.length === 0
            ? 'Nenhum produto encontrado'
            : `Produtos encontrados: ${searchedProducts.length}`}
      </h1>
      <div id={styles.productList} style={getContainerHeight}>
        {!isLoaded && <Spinner />}
        {searchedProducts
          .map((product: IProduct, i: number) => (
            <div className={styles.cardContainer} key={i}>
              <Card
                image={product.image}
                title={product.title}
                price={product.price}
                id={product._id}
              />
            </div>
          ))}
      </div>
    </>
  )
}