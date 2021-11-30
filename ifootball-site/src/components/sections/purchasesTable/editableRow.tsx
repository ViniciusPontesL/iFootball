interface EditFormDataProps {
  endereco: string,
  telefone: string,
  userId: string,
  selectedProductIds: string,
  selectedProductQtds: string
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
          name='endereco'
          required
          placeholder='Endereco'
          value={editFormData.endereco}
          onChange={handleEditFormChange}
        />
      </td>
      <td>
        <input
          type='text'
          name='telefone'
          required
          placeholder='Telefone'
          value={editFormData.telefone}
          onChange={handleEditFormChange}
        />
      </td>
      <td>
        <input
          type='text'
          name='userId'
          required
          placeholder='User ID'
          value={editFormData.userId}
          onChange={handleEditFormChange}
        />
      </td>
      <td>
        <input
          type='text'
          name='selectedProductIds'
          required
          placeholder='Selected product IDs'
          value={editFormData.selectedProductIds}
          onChange={handleEditFormChange}
        />
      </td>
      <td>
        <input
          type='text'
          name='selectedProductQtds'
          required
          placeholder='Selected product qtds'
          value={editFormData.selectedProductQtds}
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