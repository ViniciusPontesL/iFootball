interface EditFormDataProps {
  name: string
  email: string
  cpf: string
  password: string
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
          name='name'
          required
          placeholder='Nome'
          value={editFormData.name}
          onChange={handleEditFormChange}
        />
      </td>
      <td>
        <input
          type='text'
          name='email'
          required
          placeholder='Email'
          value={editFormData.email}
          onChange={handleEditFormChange}
        />
      </td>
      <td>
        <input
          type='text'
          name='cpf'
          required
          placeholder='CPF'
          value={editFormData.cpf}
          onChange={handleEditFormChange}
        />
      </td>
      <td>
        <input
          type='password'
          name='password'
          required
          placeholder='Nova password'
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