import { useEffect, useState, ChangeEvent, FormEvent } from 'react'
import EditableRow from './editableRow'
import ReadOnlyRow from './readOnlyRow'
import { IUser } from '../../../global/interfaces'
import { UsersRepository } from '../../../repository/Users'
import styles from './styles.module.scss'

export default function UserTable() {
  const [usersRepository] = useState<UsersRepository>(new UsersRepository())

  const [users, setUsers] = useState<IUser[]>()
  const [addFormData, setAddFormData] = useState({
    name: '',
    email: '',
    cpf: '',
    password: ''
  })
  const [editFormData, setEditFormData] = useState({
    name: '',
    email: '',
    cpf: '',
    password: ''
  })
  const [editUserId, setUserId] = useState<string>()

  function handleAddFormChange(event: ChangeEvent<HTMLInputElement>) {
    event.preventDefault()

    const fieldName: 'name' | 'email' | 'cpf' | 'password'  = (event as any).target.getAttribute('name')
    const fieldValue = event.target.value

    const newFormData = { ...addFormData }
    newFormData[fieldName] = fieldValue

    setAddFormData(newFormData)
  }

  function handleEditFormChange(event: ChangeEvent<HTMLInputElement>) {
    event.preventDefault()

    const fieldName: 'name' | 'email' | 'cpf' | 'password'  = (event as any).target.getAttribute('name')
    const fieldValue = event.target.value

    const newFormData = { ...editFormData }
    newFormData[fieldName] = fieldValue

    setEditFormData(newFormData)
  }

  function handleAddFormSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const newUser = {
      name: addFormData.name,
      email: addFormData.email,
      cpf: addFormData.cpf,
      password: addFormData.password,
      _id: users ? String(users.length + 1) : String(0)
    }

    const newUsers = users && [...users, newUser]
    setUsers(newUsers)

    usersRepository.post(newUser.name, newUser.email, newUser.cpf, newUser.password)
  }

  function handleEditFormSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const editedUser = {
      _id: editUserId,
      name: editFormData.name,
      email: editFormData.email,
      cpf: editFormData.cpf,
      password: editFormData.password
    }

    const newUsers = users && [...users]
    const index = users?.findIndex((user: IUser) => user._id === editUserId)

    // @ts-ignore
    newUsers[index] = editedUser
    setUsers(newUsers)
    setUserId(undefined)

    const { _id, ...payload } = editedUser

    usersRepository.put(payload, _id)
  }

  function handleEditClick(event: any, user: IUser) {
    event.preventDefault()
    setUserId(user._id)

    const formValues = {
      name: user.name,
      email: user.email,
      cpf: user.cpf,
      password: user.password,
    }

    setEditFormData(formValues)
  }

  function handleCancelClick() {
    setUserId(undefined)
  }

  function handleDeleteClick(userId: string) {
    const newUsers = users && [...users]

    const index = users?.findIndex(user => user._id === userId)

    index && newUsers?.splice(index, 1)
    setUsers(newUsers)

    usersRepository.delete(userId)
  }

  useEffect(() => {
    const getData = async () => {
      const data = await usersRepository.getAll()
      setUsers(data)
    }

    getData()
  }, [usersRepository])

  return (
    <>
      <div className={styles.container}>
        <form onSubmit={handleEditFormSubmit}>
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>CPF</th>
                <th>Password</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {users?.map((user: IUser) => (
                <>
                  {editUserId === user._id ? (
                    <EditableRow
                      editFormData={editFormData}
                      handleEditFormChange={handleEditFormChange}
                      handleCancelClick={handleCancelClick}
                    />
                  ) : (
                    <ReadOnlyRow
                      user={user}
                      handleEditClick={handleEditClick}
                      handleDeleteClick={handleDeleteClick}
                    />
                  )}
                </>
              ))}
            </tbody>
          </table>
        </form>

        <h2>Adicionar usuário</h2>
        <form onSubmit={handleAddFormSubmit}>
          <input
            type='text'
            name='name'
            required
            placeholder='name'
            onChange={handleAddFormChange}
          /> 
          <input
            type='text'
            name='email'
            required
            placeholder='Email'
            onChange={handleAddFormChange}
          /> 
          <input
            type='text'
            name='cpf'
            required
            placeholder='CPF'
            onChange={handleAddFormChange}
          /> 
          <input
            type='password'
            name='password'
            required
            placeholder='Password'
            onChange={handleAddFormChange}
          />
          <button type='submit'>Adicionar</button>
        </form>
      </div>
    </>
  )
}