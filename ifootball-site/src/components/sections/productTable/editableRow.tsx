interface EditFormDataProps {
  image: string
  title: string
  price: string
  quantity: string
}

interface EditableRowProps {
  editFormData: EditFormDataProps
  handleEditFormChange(event: React.ChangeEvent<HTMLInputElement>): void
  handleCancelClick(): void
}

export default function EditableRow({ editFormData, handleEditFormChange, handleCancelClick }: EditableRowProps) {
  return (
    <tr>
      <td>
        <input
          type='text'
          name='image'
          required
          placeholder='Imagem'
          value={editFormData.image}
          onChange={handleEditFormChange}
        />
      </td>
      <td>
        <input
          type='text'
          name='title'
          required
          placeholder='Titulo'
          value={editFormData.title}
          onChange={handleEditFormChange}
        />
      </td>
      <td>
        <input
          type='text'
          name='price'
          required
          placeholder='Preço'
          value={editFormData.price}
          onChange={handleEditFormChange}
        />
      </td>
      <td>
        <input
          type='text'
          name='quantity'
          required
          placeholder='quantity'
          value={editFormData.quantity}
          onChange={handleEditFormChange}
        />
      </td>
      <td>
        <button type='submit'>Salvar</button>
        <button type="button" onClick={handleCancelClick}>
          Cancel
        </button>
      </td>
    </tr>
  )
}