import { useEffect, useState, ChangeEvent, FormEvent } from 'react'
import EditableRow from './editableRow'
import ReadOnlyRow from './readOnlyRow'
import { IPurchases } from '../../../global/interfaces'
import { PurchasesRepository } from '../../../repository/Purchases'
import styles from './styles.module.scss'

export default function PurchasesTable() {
  const [purchasesRepository] = useState<PurchasesRepository>(new PurchasesRepository())

  const [purchases, setPurchases] = useState<IPurchases[]>()
  const [addFormData, setAddFormData] = useState({
    endereco: '',
    telefone: '',
    userId: '',
    selectedProductIds: '',
    selectedProductQtds: ''
  })
    const [editFormData, setEditFormData] = useState({
    endereco: '',
    telefone: '',
    userId: '',
    selectedProductIds: '',
    selectedProductQtds: ''
  })
  const [editPurchasesId, setPurchasesId] = useState<string>()

  function handleAddFormChange(event: ChangeEvent<HTMLInputElement>) {
    event.preventDefault()

    const fieldName: 'endereco' | 'telefone' | 'userId' | 'selectedProductIds' | 'selectedProductQtds'  = (event as any).target.getAttribute('name')
    const fieldValue = event.target.value

    const newFormData = { ...addFormData }
    newFormData[fieldName] = fieldValue

    setAddFormData(newFormData)
  }

  function handleEditFormChange(event: ChangeEvent<HTMLInputElement>) {
    event.preventDefault()

    const fieldName: 'endereco' | 'telefone' | 'userId' | 'selectedProductIds' | 'selectedProductQtds'  = (event as any).target.getAttribute('name')
    const fieldValue = event.target.value

    const newFormData = { ...editFormData }
    newFormData[fieldName] = fieldValue

    setEditFormData(newFormData)
  }

  function handleAddFormSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const newPurchases = {
      endereco: addFormData.endereco,
      telefone: addFormData.telefone,
      userId: addFormData.userId,
      selectedProductIds: addFormData.selectedProductIds,
      selectedProductQtds: addFormData.selectedProductQtds,
      _id: purchases ? String(purchases.length + 1) : String(0)
    }

    const newPurchase = purchases && [...purchases, newPurchases]
    setPurchases(newPurchase)

    purchasesRepository.post(newPurchases.endereco, newPurchases.telefone, newPurchases.userId, newPurchases.selectedProductIds, newPurchases.selectedProductQtds)
  }

  function handleEditFormSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const editedPurchases = {
      _id: editPurchasesId,
      endereco: editFormData.endereco,
      telefone: editFormData.telefone,
      userId: editFormData.userId,
      selectedProductIds: editFormData.selectedProductIds,
      selectedProductQtds: editFormData.selectedProductQtds
    }

    const newPurchases = purchases && [...purchases]
    const index = purchases?.findIndex((purchases: IPurchases) => purchases._id === editPurchasesId)

    // @ts-ignore
    newPurchases[index] = editedPurchases
    setPurchases(newPurchases)
    setPurchasesId(undefined)

    const { _id, ...payload } = editedPurchases

    purchasesRepository.put(payload, _id)
  }

  function handleEditClick(event: any, purchases: IPurchases) {
    event.preventDefault()
    setPurchasesId(purchases._id)

    const formValues = {
      endereco: purchases.endereco,
      telefone: purchases.telefone,
      userId: purchases.userId,
      selectedProductIds: purchases.selectedProductIds,
      selectedProductQtds: purchases.selectedProductQtds
    }
    setEditFormData(formValues)
  }

  function handleCancelClick() {
    setPurchasesId(undefined)
  }

  function handleDeleteClick(purchasesId: string) {
    const newPurchases = purchases && [...purchases]

    const index = purchases?.findIndex(purchases => purchases._id === purchasesId)

    index && newPurchases?.splice(index, 1)
    setPurchases(newPurchases)

    purchasesRepository.delete(purchasesId)
  }

  useEffect(() => {
    const getData = async () => {
      const data = await purchasesRepository.getAll()
      console.log(data)
      setPurchases(data)
    }

    getData()
  }, [purchasesRepository])

  return (
    <>
      <div className={styles.container}>
        <form onSubmit={handleEditFormSubmit}>
          <table>
            <thead>
              <tr>
                <th>Endereco</th>
                <th>Telefone</th>
                <th>userId</th>
                <th>selectedProductIds</th>
                <th>selectedProductQtds</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {purchases?.map((purchases: IPurchases) => (
                <>
                  {editPurchasesId === purchases._id ? (
                    <EditableRow
                      editFormData={editFormData}
                      handleEditFormChange={handleEditFormChange}
                      handleCancelClick={handleCancelClick}
                    />
                  ) : (
                    <ReadOnlyRow
                      purchases={purchases}
                      handleEditClick={handleEditClick}
                      handleDeleteClick={handleDeleteClick}
                    />
                  )}
                </>
              ))}
            </tbody>
          </table>
        </form>

        <h2>Adicionar pedido</h2>
        <form onSubmit={handleAddFormSubmit}>
          <input
            type='text'
            name='endereco'
            required
            placeholder='Endereco'
            onChange={handleAddFormChange}
          /> 
          <input
            type='text'
            name='telefone'
            required
            placeholder='Telefone'
            onChange={handleAddFormChange}
          /> 
          <input
            type='text'
            name='userId'
            required
            placeholder='User ID'
            onChange={handleAddFormChange}
          /> 
          <input
            type='text'
            name='selectedProductIds'
            required
            placeholder='Selected product IDs'
            onChange={handleAddFormChange}
          />
          <input
            type='text'
            name='selectedProductQtds'
            required
            placeholder='Selected product qtds'
            onChange={handleAddFormChange}
          />
          <button type='submit'>Adicionar</button>
        </form>
      </div>
    </>
  )
}