import { useEffect, useState, ChangeEvent, FormEvent } from 'react'
import EditableRow from './editableRow'
import ReadOnlyRow from './readOnlyRow'
import { IProduct } from '../../../global/interfaces'
import { ProductsRepository } from '../../../repository/Products'
import styles from './styles.module.scss'

export default function ProductTable() {
  const [productRepository] = useState<ProductsRepository>(new ProductsRepository())

  const [products, setProducts] = useState<IProduct[]>()
  const [addFormData, setAddFormData] = useState({
    image: '',
    title: '',
    price: '',
    quantity: ''
  })
  const [editFormData, setEditFormData] = useState({
    image: '',
    title: '',
    price: '',
    quantity: ''
  })
  const [editIProductId, setIProductId] = useState<string>()

  function handleAddFormChange(event: ChangeEvent<HTMLInputElement>) {
    event.preventDefault()

    const fieldName: 'image' | 'title' | 'price' | 'quantity' = (event as any).target.getAttribute('name')
    const fieldValue = event.target.value

    const newFormData = { ...addFormData }
    newFormData[fieldName] = fieldValue

    setAddFormData(newFormData)
  }

  function handleEditFormChange(event: ChangeEvent<HTMLInputElement>) {
    event.preventDefault()

    const fieldName: 'image' | 'title' | 'price' | 'quantity'  = (event as any).target.getAttribute('name')
    const fieldValue = event.target.value

    const newFormData = { ...editFormData }
    newFormData[fieldName] = fieldValue

    setEditFormData(newFormData)
  }

  function handleAddFormSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const newProduct: IProduct = {
      image: addFormData.image,
      title: addFormData.title,
      price: addFormData.price,
      quantity: Number(addFormData.quantity),
      _id: products ? String(products.length + 1) : String(0)
    }

    const newProducts = products && [...products, newProduct]
    setProducts(newProducts)
    
    productRepository.post(newProduct.image, newProduct.title, newProduct.price, newProduct.quantity)
  }

  function handleEditFormSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const editedIProduct = {
      _id: editIProductId,
      image: editFormData.image,
      title: editFormData.title,
      price: Number(editFormData.price),
      quantity: Number(editFormData.quantity)
    }

    const newProducts = products && [...products]
    const index = products?.findIndex((product: IProduct) => product._id === editIProductId)

    // @ts-ignore
    newProducts[index] = editedIProduct
    setProducts(newProducts)
    setIProductId(undefined)

    const { _id, ...payload } = editedIProduct
    productRepository.put(payload, _id)
  }

  function handleEditClick(event: any, product: IProduct) {
    event.preventDefault()
    setIProductId(product._id)

    const formValues = {
      image: product.image,
      title: product.title,
      price: product.price,
      quantity: String(product.quantity)
    }
    setEditFormData(formValues)
  }

  function handleCancelClick() {
    setIProductId(undefined)
  }

  function handleDeleteClick(productId: string) {
    const newProducts = products && [...products]

    const index = products?.findIndex(product => product._id === productId)

    index && newProducts?.splice(index, 1)
    setProducts(newProducts)

    productRepository.delete(productId)
  }

  useEffect(() => {
    const getData = async () => {
      const data = await productRepository.getAll()
      setProducts(data)
    }

    getData()
  }, [productRepository])

  return (
    <>
      <div className={styles.container}>
        <form onSubmit={handleEditFormSubmit}>
          <table>
            <thead>
              <tr>
                <th>Imagem</th>
                <th>Titulo</th>
                <th>Preço</th>
                <th>Tamanho</th>
                <th>Quantidade</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {products?.map((product: IProduct) => (
                <>
                  {editIProductId === product._id ? (
                    <EditableRow
                      editFormData={editFormData}
                      handleEditFormChange={handleEditFormChange}
                      handleCancelClick={handleCancelClick}
                    />
                  ) : (
                    <ReadOnlyRow
                      product={product}
                      handleEditClick={handleEditClick}
                      handleDeleteClick={handleDeleteClick}
                    />
                  )}
                </>
              ))}
            </tbody>
          </table>
        </form>

        <h2>Adicionar produto</h2>
        <form onSubmit={handleAddFormSubmit}>
          <input
            type='text'
            name='image'
            required
            placeholder='Image'
            onChange={handleAddFormChange}
          /> 
          <input
            type='text'
            name='title'
            required
            placeholder='Title'
            onChange={handleAddFormChange}
          /> 
          <input
            type='text'
            name='price'
            required
            placeholder='price'
            onChange={handleAddFormChange}
          /> 
          <input
            type='text'
            name='quantity'
            required
            placeholder='quantity'
            onChange={handleAddFormChange}
          />
          <button type='submit'>Adicionar</button>
        </form>
      </div>
    </>
  )
}